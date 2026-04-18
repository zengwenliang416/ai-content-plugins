#!/usr/bin/env node

/**
 * render-infographic.mjs — Render AntV Infographic DSL to HTML + PNG + SVG.
 *
 * Usage:
 *   node render-infographic.mjs --dsl <file.dsl> --output <dir> [--format png|svg|both] [--offline]
 *
 * Output files:
 *   <dir>/infographic.dsl
 *   <dir>/infographic.html
 *   <dir>/infographic.png   (if format includes png)
 *   <dir>/infographic.svg   (if format includes svg)
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { launchBrowser, InstallHintError, detect } from "../../../lib/puppeteer-helper.mjs";

function parseArgs(argv) {
  const opts = { dsl: "", output: "", format: "both", offline: false, verbose: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dsl") opts.dsl = argv[++i];
    else if (a === "--output") opts.output = argv[++i];
    else if (a === "--format") opts.format = argv[++i];
    else if (a === "--offline") opts.offline = true;
    else if (a === "--verbose") opts.verbose = true;
  }
  if (!opts.dsl || !opts.output) {
    console.error("ERROR: --dsl and --output are required");
    process.exit(2);
  }
  return opts;
}

const opts = parseArgs(process.argv.slice(2));
const log = (...a) => opts.verbose && console.error("[render-infographic]", ...a);

if (!fs.existsSync(opts.dsl)) {
  console.error(`ERROR: DSL file not found: ${opts.dsl}`);
  process.exit(2);
}
const dsl = fs.readFileSync(opts.dsl, "utf-8");
fs.mkdirSync(opts.output, { recursive: true });

// Copy the DSL into the output dir for reproducibility
fs.writeFileSync(path.join(opts.output, "infographic.dsl"), dsl);

// ---------------------------------------------------------------------------
// Build HTML
// ---------------------------------------------------------------------------

const safeDsl = dsl.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Infographic</title>
<style>
  html, body { margin: 0; padding: 0; background: #fff; }
  #container { width: 100vw; height: 100vh; min-height: 800px; }
</style>
</head>
<body>
<div id="container"></div>
<script src="https://cdn.jsdelivr.net/npm/@antv/infographic@latest/dist/infographic.min.js"
        onerror="this.onerror=null;this.src='https://unpkg.com/@antv/infographic@latest/dist/infographic.min.js'"></script>
<script>
(function () {
  var dslText = \`${safeDsl}\`;
  var ig = new AntVInfographic.Infographic({
    container: '#container',
    width: '100%',
    height: '100%',
  });
  function doRender() {
    ig.render(dslText).then(function () {
      window.__igReady = true;
    }).catch(function (e) {
      window.__igError = String(e);
    });
  }
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve())
    .then(doRender, doRender);
  window.__ig = ig;
})();
</script>
</body>
</html>`;

const htmlPath = path.join(opts.output, "infographic.html");
fs.writeFileSync(htmlPath, html);
log(`wrote ${htmlPath}`);

// ---------------------------------------------------------------------------
// Puppeteer render (optional)
// ---------------------------------------------------------------------------

const wantPng = opts.format === "png" || opts.format === "both";
const wantSvg = opts.format === "svg" || opts.format === "both";

async function tryPuppeteer() {
  const browser = await launchBrowser();
  const results = {};
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1000, deviceScaleFactor: 2 });
    await page.goto("file://" + path.resolve(htmlPath), { waitUntil: "networkidle0", timeout: 45000 });
    await page.waitForFunction(
      () => window.__igReady === true || window.__igError,
      { timeout: 30000 }
    );
    const err = await page.evaluate(() => window.__igError || null);
    if (err) throw new Error(`DSL render error: ${err}`);

    if (wantPng) {
      const pngPath = path.join(opts.output, "infographic.png");
      await page.screenshot({ path: pngPath, fullPage: true });
      results.png = pngPath;
    }
    if (wantSvg) {
      const svgData = await page.evaluate(async () => {
        if (!window.__ig || !window.__ig.toDataURL) return null;
        const url = await window.__ig.toDataURL({ type: "svg" });
        const prefix = "data:image/svg+xml;base64,";
        if (url.startsWith(prefix)) return atob(url.slice(prefix.length));
        const commaIdx = url.indexOf(",");
        return commaIdx >= 0 ? decodeURIComponent(url.slice(commaIdx + 1)) : null;
      });
      if (svgData) {
        const svgPath = path.join(opts.output, "infographic.svg");
        fs.writeFileSync(svgPath, svgData);
        results.svg = svgPath;
      }
    }
  } finally {
    await browser.close();
  }
  return results;
}

(async () => {
  try {
    const rendered = await tryPuppeteer();
    console.log(JSON.stringify({ ok: true, output: opts.output, html: htmlPath, ...rendered }, null, 2));
  } catch (e) {
    // HTML file is always produced; raster/vector export is best-effort
    const payload = {
      ok: true,
      output: opts.output,
      html: htmlPath,
      warning: `Image export skipped: ${e.message}. Open the HTML in a browser to view/export manually.`,
    };
    if (e instanceof InstallHintError) payload.installHint = e.hint;
    console.log(JSON.stringify(payload, null, 2));
  }
})();
