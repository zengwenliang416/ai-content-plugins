#!/usr/bin/env node

/**
 * gen-chart.mjs — Generate a chart image via AntV GPT-Vis API with three-tier
 * local fallback (G2 / G6 / custom HTML+SVG).
 *
 * Usage:
 *   node gen-chart.mjs --spec <spec.json> --output <out.png> [--offline] [--verbose]
 *
 * Strategy:
 *   1. If --offline is set, skip to local.
 *   2. POST spec to https://antv-studio.alipay.com/api/gpt-vis (timeout 20s).
 *   3. On any failure, fall back to local Puppeteer rendering.
 *
 * Local coverage by renderer:
 *   G2 (17): line, area, bar, column, pie, scatter, histogram, radar, funnel,
 *            treemap, word-cloud, dual-axes, waterfall, boxplot, violin,
 *            liquid, sankey
 *   G6 (5):  mind-map, organization-chart, network-graph, flow-diagram,
 *            fishbone-diagram
 *   Custom (2): venn (SVG), spreadsheet (HTML table)
 *   Total: 24/26 (remaining 2 are spec variants delegated to remote).
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { launchBrowser, InstallHintError } from "../../../lib/puppeteer-helper.mjs";

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const opts = { spec: "", output: "", offline: false, verbose: false, htmlOnly: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--spec") opts.spec = argv[++i];
    else if (a === "--output") opts.output = argv[++i];
    else if (a === "--offline") opts.offline = true;
    else if (a === "--verbose") opts.verbose = true;
    else if (a === "--html-only") opts.htmlOnly = true;
    else if (a === "-h" || a === "--help") {
      console.log(
        "Usage: gen-chart.mjs --spec <spec.json> --output <out.png> [--offline] [--html-only] [--verbose]"
      );
      process.exit(0);
    }
  }
  if (!opts.spec || !opts.output) {
    console.error("ERROR: --spec and --output are required");
    process.exit(2);
  }
  return opts;
}

const opts = parseArgs(process.argv.slice(2));
const log = (...args) => opts.verbose && console.error("[gen-chart]", ...args);

// ---------------------------------------------------------------------------
// Load + validate spec
// ---------------------------------------------------------------------------

if (!fs.existsSync(opts.spec)) {
  console.error(`ERROR: spec file not found: ${opts.spec}`);
  process.exit(2);
}

const specRaw = fs.readFileSync(opts.spec, "utf-8");
let spec;
try {
  spec = JSON.parse(specRaw);
} catch (e) {
  console.error(`ERROR: spec is not valid JSON: ${e.message}`);
  process.exit(2);
}
if (!spec.type) {
  console.error("ERROR: spec.type is required");
  process.exit(2);
}
spec.source = spec.source || "chart-visualization-skills";
spec.width = spec.width || 600;
spec.height = spec.height || 400;

fs.mkdirSync(path.dirname(opts.output), { recursive: true });

// ---------------------------------------------------------------------------
// Path 1: Remote API
// ---------------------------------------------------------------------------

async function tryRemote() {
  const endpoint = "https://antv-studio.alipay.com/api/gpt-vis";
  log(`POST ${endpoint} (type=${spec.type})`);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);
  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spec),
      signal: controller.signal,
    });
  } catch (e) {
    clearTimeout(timeoutId);
    throw new Error(`network error: ${e.message}`);
  }
  clearTimeout(timeoutId);

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const body = await response.json();
  if (!body.success || !body.resultObj) {
    throw new Error(`api returned failure: ${JSON.stringify(body).slice(0, 200)}`);
  }
  const imgResp = await fetch(body.resultObj);
  if (!imgResp.ok) throw new Error(`image download HTTP ${imgResp.status}`);
  const buf = Buffer.from(await imgResp.arrayBuffer());
  fs.writeFileSync(opts.output, buf);
  return { mode: "remote", url: body.resultObj, bytes: buf.length };
}

// ---------------------------------------------------------------------------
// Path 2: Local renderers (G2 / G6 / custom)
// ---------------------------------------------------------------------------

const G2_TYPES = new Set([
  "line", "area", "bar", "column", "pie", "scatter", "histogram", "radar",
  "funnel", "treemap", "word-cloud", "dual-axes", "waterfall", "boxplot",
  "violin", "liquid", "sankey",
]);
const G6_TYPES = new Set([
  "mind-map", "organization-chart", "network-graph", "flow-diagram",
  "fishbone-diagram",
]);
const CUSTOM_TYPES = new Set(["venn", "spreadsheet"]);

function safeJson(o) {
  return JSON.stringify(o).replace(/</g, "\\u003c");
}

function pageShell({ width, height, title, scripts, bodyHtml, initScript }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<style>
  html, body { margin: 0; padding: 0; background: #fff; font-family: -apple-system, 'PingFang SC', 'Segoe UI', sans-serif; }
  #chart, #container { width: ${width}px; height: ${height}px; }
  .vis-err { padding: 24px; color: #c00; font-size: 14px; }
</style>
${scripts.map(s => `<script src="${s.primary}" onerror="this.onerror=null;this.src='${s.fallback}'"></script>`).join("\n")}
</head>
<body>
${bodyHtml}
<script>
window.addEventListener('error', function (e) { window.__chartError = String(e.message || e); });
try {
${initScript}
} catch (e) {
  window.__chartError = String(e && e.stack || e);
  document.body.innerHTML = '<div class="vis-err">' + (e && e.message || e) + '</div>';
  window.__chartReady = true;
}
</script>
</body>
</html>`;
}

// ----------------- G2 mapper -----------------

function g2Options(s) {
  const t = s.type;
  const data = s.data;
  const hasGroup = Array.isArray(data) && data[0] && "group" in data[0];
  const base = { title: s.title || undefined };

  switch (t) {
    case "line":
      return { ...base, type: "line", data, encode: { x: "time", y: "value", color: hasGroup ? "group" : undefined } };
    case "area":
      return {
        ...base, type: "area", data,
        encode: { x: "time", y: "value", color: hasGroup ? "group" : undefined },
        transform: s.stack ? [{ type: "stackY" }] : [],
      };
    case "bar":
      return {
        ...base, type: "interval", data,
        encode: { x: "category", y: "value", color: hasGroup ? "group" : "category" },
        coordinate: { transform: [{ type: "transpose" }] },
        transform: s.group ? [{ type: "dodgeX" }] : [{ type: "stackY" }],
      };
    case "column":
      return {
        ...base, type: "interval", data,
        encode: { x: "category", y: "value", color: hasGroup ? "group" : "category" },
        transform: s.stack ? [{ type: "stackY" }] : (hasGroup ? [{ type: "dodgeX" }] : []),
      };
    case "pie":
      return {
        ...base, type: "interval", data,
        coordinate: { type: "theta", innerRadius: s.innerRadius || 0, outerRadius: 0.9 },
        encode: { y: "value", color: "category" },
        transform: [{ type: "stackY" }],
        labels: [{ text: "category", position: "outside" }],
      };
    case "scatter":
      return { ...base, type: "point", data, encode: { x: "x", y: "y", color: hasGroup ? "group" : undefined } };
    case "histogram": {
      const mapped = (data || []).map((v) => ({ v }));
      return {
        ...base, type: "rect", data: mapped,
        encode: { x: "v" },
        transform: [{ type: "binX", y: "count", thresholds: s.binNumber || 10 }],
      };
    }
    case "radar":
      return {
        ...base, type: "view", coordinate: { type: "polar" },
        scale: { x: { padding: 0.5, align: 0 } },
        children: [
          { type: "line", data, encode: { x: "name", y: "value", color: hasGroup ? "group" : undefined }, style: { lineWidth: 2 } },
          { type: "area", data, encode: { x: "name", y: "value", color: hasGroup ? "group" : undefined }, style: { fillOpacity: 0.2 } },
        ],
      };
    case "funnel":
      return {
        ...base, type: "interval", data,
        coordinate: { transform: [{ type: "transpose" }] },
        encode: { x: "category", y: "value", color: "category" },
        transform: [{ type: "symmetryY" }],
      };
    case "treemap":
      return {
        ...base, type: "rect",
        data: { value: { root: { children: data }, getChildren: (d) => d.children } },
        encode: { value: "value" },
        transform: [{ type: "treemap" }],
      };
    case "word-cloud":
      return {
        ...base, type: "wordCloud", data,
        layout: { fontSize: [20, 80] },
        encode: { color: "text", text: "text" },
      };
    case "dual-axes":
      return {
        ...base, type: "view",
        children: (s.series || []).map((ser, i) => ({
          type: ser.type === "line" ? "line" : "interval",
          data: (s.categories || []).map((c, j) => ({ category: c, value: ser.data[j], series: ser.axisYTitle || `Series ${i + 1}` })),
          encode: { x: "category", y: "value", color: "series" },
          scale: { y: { key: `y-${i}`, independent: true } },
          axis: { y: { position: i === 0 ? "left" : "right", title: ser.axisYTitle } },
        })),
      };
    case "waterfall":
      return {
        ...base, type: "interval", data,
        encode: { x: "category", y: "value" },
        transform: [{ type: "diffY" }],
        style: { fill: (d) => (d.isTotal ? "#5B8FF9" : d.value >= 0 ? "#61DDAA" : "#F6BD16") },
      };
    case "boxplot":
      return { ...base, type: "boxplot", data, encode: { x: "category", y: "value", color: hasGroup ? "group" : "category" } };
    case "violin":
      return {
        ...base, type: "density", data,
        encode: { x: "category", y: "value", color: hasGroup ? "group" : "category" },
        style: { fillOpacity: 0.7 },
      };
    case "liquid":
      return {
        ...base, type: "liquid",
        style: { percent: s.percent || 0.5, shape: s.shape || "circle" },
      };
    case "sankey":
      return {
        ...base, type: "sankey",
        data: { value: { links: data } },
        layout: { nodeAlign: s.nodeAlign || "justify" },
        style: { labelSpacing: 3, labelFontWeight: "bold" },
      };
    default:
      return { type: "text", data: [{ text: `unsupported G2 type: ${t}` }], encode: { text: "text" } };
  }
}

function buildG2Html() {
  const title = spec.title || "Chart";
  const options = g2Options(spec);
  const init = `
    var opts = ${safeJson(options)};
    var chart = new G2.Chart({ container: 'chart', autoFit: false, width: ${spec.width}, height: ${spec.height}, theme: ${safeJson(spec.theme === "dark" ? "classicDark" : "classic")} });
    chart.options(opts);
    chart.render().then(function () { window.__chartReady = true; });
  `;
  return pageShell({
    width: spec.width, height: spec.height, title,
    scripts: [{ primary: "https://cdn.jsdelivr.net/npm/@antv/g2@5/dist/g2.min.js", fallback: "https://unpkg.com/@antv/g2@5/dist/g2.min.js" }],
    bodyHtml: '<div id="chart"></div>',
    initScript: init,
  });
}

// ----------------- G6 mapper -----------------

function g6Options(s) {
  const t = s.type;
  const d = s.data;
  switch (t) {
    case "mind-map":
    case "organization-chart": {
      // Tree data expected: { name, description?, children? }
      return {
        layout: { type: "compact-box", direction: t === "mind-map" ? "H" : "V", getHGap: () => 60, getVGap: () => 20 },
        node: { type: "rect", style: { radius: 8, fill: "#E8F4FF", stroke: "#5B8FF9", labelText: (d) => d.data && d.data.name, labelFill: "#222", labelFontSize: 13 } },
        edge: { type: "cubic-horizontal", style: { stroke: "#AAB7C4" } },
        data: d,
        treeData: true,
      };
    }
    case "network-graph":
    case "flow-diagram": {
      return {
        layout: t === "flow-diagram" ? { type: "dagre", rankdir: "TB", nodesep: 40, ranksep: 60 } : { type: "force", preventOverlap: true, linkDistance: 100 },
        node: { type: "circle", style: { size: 36, fill: "#5B8FF9", labelText: (d) => d.data && d.data.name, labelFill: "#222", labelPosition: "bottom" } },
        edge: { type: "line", style: { stroke: "#AAB7C4", endArrow: true, labelText: (d) => d.data && d.data.name, labelFill: "#666", labelFontSize: 11 } },
        data: {
          nodes: (d.nodes || []).map((n) => ({ id: n.name, data: n })),
          edges: (d.edges || []).map((e, i) => ({ id: `e${i}`, source: e.source, target: e.target, data: e })),
        },
      };
    }
    case "fishbone-diagram": {
      // Custom layout — render the tree as branches
      return {
        layout: { type: "mindmap", direction: "H", getHGap: () => 80, getVGap: () => 16 },
        node: { type: "rect", style: { radius: 4, fill: "#FFF6E6", stroke: "#F6BD16", labelText: (d) => d.data && d.data.name, labelFill: "#222" } },
        edge: { type: "polyline", style: { stroke: "#F6BD16" } },
        data: d,
        treeData: true,
      };
    }
  }
}

function buildG6Html() {
  const options = g6Options(spec);
  const init = `
    var opts = ${safeJson(options)};
    var graph = new G6.Graph({ container: 'chart', width: ${spec.width}, height: ${spec.height}, ...opts, autoFit: 'view' });
    graph.render().then(function () { window.__chartReady = true; });
  `;
  return pageShell({
    width: spec.width, height: spec.height, title: spec.title || "Graph",
    scripts: [{ primary: "https://cdn.jsdelivr.net/npm/@antv/g6@5/dist/g6.min.js", fallback: "https://unpkg.com/@antv/g6@5/dist/g6.min.js" }],
    bodyHtml: '<div id="chart"></div>',
    initScript: init,
  });
}

// ----------------- Custom renderers -----------------

function buildVennHtml() {
  // Simple 2–3 set Venn with SVG circles.
  const sets = spec.data || [];
  const w = spec.width, h = spec.height, cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.22;
  const items = sets.slice(0, 3);
  const positions = items.length <= 2
    ? [{ cx: cx - r * 0.6, cy, fill: "#5B8FF9" }, { cx: cx + r * 0.6, cy, fill: "#F6BD16" }]
    : [{ cx: cx - r * 0.5, cy: cy - r * 0.3, fill: "#5B8FF9" }, { cx: cx + r * 0.5, cy: cy - r * 0.3, fill: "#F6BD16" }, { cx, cy: cy + r * 0.5, fill: "#E8684A" }];

  const circles = items.map((it, i) => {
    const p = positions[i] || positions[0];
    const names = (it.sets || []).join(" ∩ ");
    return `<circle cx="${p.cx}" cy="${p.cy}" r="${r}" fill="${p.fill}" fill-opacity="0.45" stroke="${p.fill}" stroke-width="2" />
<text x="${p.cx}" y="${p.cy + (p.cy < cy ? -r - 10 : r + 20)}" text-anchor="middle" font-size="14" fill="#222">${names} · ${it.value}</text>`;
  }).join("\n");

  const title = spec.title ? `<text x="${cx}" y="30" text-anchor="middle" font-size="18" font-weight="bold">${spec.title}</text>` : "";

  const body = `<svg id="chart" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${title}${circles}</svg>`;
  return pageShell({
    width: w, height: h, title: spec.title || "Venn",
    scripts: [], bodyHtml: body, initScript: "window.__chartReady = true;",
  });
}

function buildSpreadsheetHtml() {
  const rows = spec.data || [];
  const cols = rows.length ? Object.keys(rows[0]) : [];
  const head = `<tr>${cols.map((c) => `<th>${c}</th>`).join("")}</tr>`;
  const body = rows.map((r) => `<tr>${cols.map((c) => `<td>${r[c] ?? ""}</td>`).join("")}</tr>`).join("");
  const title = spec.title ? `<h2 style="margin:16px 0;">${spec.title}</h2>` : "";
  return pageShell({
    width: spec.width, height: spec.height, title: spec.title || "Table",
    scripts: [],
    bodyHtml: `<div id="chart" style="padding:20px;">${title}<table style="border-collapse:collapse;width:100%;font-size:13px;"><style>th,td{border:1px solid #ddd;padding:6px 10px;text-align:left}th{background:#f5f5f5;font-weight:600}</style><thead>${head}</thead><tbody>${body}</tbody></table></div>`,
    initScript: "window.__chartReady = true;",
  });
}

// ---------------------------------------------------------------------------
// Local render dispatch
// ---------------------------------------------------------------------------

function buildLocalHtml() {
  if (G2_TYPES.has(spec.type)) return buildG2Html();
  if (G6_TYPES.has(spec.type)) return buildG6Html();
  if (spec.type === "venn") return buildVennHtml();
  if (spec.type === "spreadsheet") return buildSpreadsheetHtml();
  // Fallback placeholder
  const msg = `Local fallback does not support "${spec.type}". Try remote or use a supported type.`;
  return pageShell({
    width: spec.width, height: spec.height, title: "Unsupported",
    scripts: [], bodyHtml: `<div id="chart" class="vis-err">${msg}</div>`,
    initScript: "window.__chartReady = true;",
  });
}

async function tryLocal() {
  const html = buildLocalHtml();

  if (opts.htmlOnly) {
    const htmlPath = opts.output.replace(/\.(png|jpg|jpeg)$/i, ".html");
    fs.writeFileSync(htmlPath, html);
    return { mode: "local-html-only", htmlPath };
  }

  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: spec.width + 40,
      height: spec.height + 40,
      deviceScaleFactor: 2,
    });
    await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });
    await page.waitForFunction(
      () => window.__chartReady === true || window.__chartError,
      { timeout: 20000 }
    );
    const err = await page.evaluate(() => window.__chartError || null);
    if (err) throw new Error(`local render error: ${err}`);
    const el = await page.$("#chart");
    await el.screenshot({ path: opts.output });
  } finally {
    await browser.close();
  }
  return { mode: `local-${G2_TYPES.has(spec.type) ? "g2" : G6_TYPES.has(spec.type) ? "g6" : "custom"}`, bytes: fs.statSync(opts.output).size };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

(async () => {
  const results = {};
  if (!opts.offline) {
    try {
      results.remote = await tryRemote();
      console.log(JSON.stringify({ ok: true, mode: "remote", output: opts.output, ...results.remote }, null, 2));
      return;
    } catch (e) {
      log(`remote failed: ${e.message} — falling back to local`);
      results.remoteError = e.message;
    }
  }

  try {
    results.local = await tryLocal();
    console.log(JSON.stringify({
      ok: true, output: opts.output, ...results.local, remoteError: results.remoteError
    }, null, 2));
  } catch (e) {
    const specCopy = opts.output.replace(/\.(png|jpg|jpeg)$/i, ".spec.json");
    const htmlCopy = opts.output.replace(/\.(png|jpg|jpeg)$/i, ".html");
    fs.writeFileSync(specCopy, JSON.stringify(spec, null, 2));
    try { fs.writeFileSync(htmlCopy, buildLocalHtml()); } catch {}
    const payload = {
      ok: false,
      error: "both paths failed",
      remoteError: results.remoteError,
      localError: e.message,
      specSavedTo: specCopy,
      htmlSavedTo: htmlCopy,
    };
    if (e instanceof InstallHintError) payload.installHint = e.hint;
    console.error(JSON.stringify(payload, null, 2));
    process.exit(1);
  }
})();
