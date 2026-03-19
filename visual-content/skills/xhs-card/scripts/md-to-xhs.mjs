#!/usr/bin/env node

/**
 * md-to-xhs.mjs — Convert Markdown to XHS (Xiaohongshu) card image series.
 *
 * Usage:
 *   node md-to-xhs.mjs <markdown-file> [--style bold|notion|minimal|cute] [--output <dir>]
 *
 * Renders the markdown as a single continuous HTML page (1242px wide),
 * then slices it into 3:4 portrait pages (~1660px each) with smart
 * boundary detection that avoids cutting through block-level elements.
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const THEMES_DIR = path.resolve(SCRIPT_DIR, "../references/themes");

const PAGE_WIDTH = 1242;
const PAGE_HEIGHT = 1660;
const DEVICE_SCALE = 2;
const SNAP_RANGE = 200;          // ±px to search for a clean break
const MIN_LAST_PAGE_RATIO = 0.5; // merge last page if < 50%

// Auto-detect valid styles from themes directory
const VALID_STYLES = fs.readdirSync(THEMES_DIR)
  .filter((f) => f.endsWith(".css"))
  .map((f) => f.replace(".css", ""));

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  let inputPath = "";
  let style = "bold";
  let output = "";

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === "--style") {
      style = argv[++i] || "bold";
      continue;
    }
    if (arg.startsWith("--style=")) {
      style = arg.slice("--style=".length);
      continue;
    }

    if (arg === "--output") {
      output = argv[++i] || "";
      continue;
    }
    if (arg.startsWith("--output=")) {
      output = arg.slice("--output=".length);
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }

    if (!arg.startsWith("-") && !inputPath) {
      inputPath = arg;
      continue;
    }
  }

  if (!inputPath) {
    printUsage();
    process.exit(1);
  }

  if (!VALID_STYLES.includes(style)) {
    console.error(`Unknown style: "${style}". Valid styles: ${VALID_STYLES.join(", ")}`);
    process.exit(1);
  }

  return { inputPath, style, output };
}

function printUsage() {
  console.error(
    [
      "Usage: node md-to-xhs.mjs <markdown-file> [options]",
      "",
      "Options:",
      `  --style <name>   Visual style (${VALID_STYLES.join(", ")}) [default: bold]`,
      "  --output <dir>   Output directory",
      "  -h, --help       Show this help",
    ].join("\n")
  );
}

function getGlobalNodeModuleRoot() {
  const result = spawnSync("npm", ["root", "-g"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });

  if (result.status !== 0) {
    return "";
  }

  return result.stdout.trim();
}

function getPuppeteerCandidates() {
  const candidates = [];
  const override = process.env.XHS_CARD_PUPPETEER_PATH?.trim();

  if (override) {
    candidates.push(override);
  }

  const globalRoot = getGlobalNodeModuleRoot();
  if (globalRoot) {
    candidates.push(
      path.join(globalRoot, "puppeteer-core/lib/esm/puppeteer/puppeteer-core.js"),
      path.join(globalRoot, "puppeteer/lib/esm/puppeteer/puppeteer.js"),
      path.join(
        globalRoot,
        "@mermaid-js/mermaid-cli/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js"
      )
    );
  }

  return candidates.filter(Boolean);
}

async function loadPuppeteer() {
  // 优先使用标准包名，其次回退到显式路径，避免把个人机器路径写入仓库。
  const specifiers = ["puppeteer", "puppeteer-core"];
  const errors = [];

  for (const specifier of specifiers) {
    try {
      return await import(specifier);
    } catch (error) {
      errors.push(`${specifier}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  for (const candidate of getPuppeteerCandidates()) {
    if (!fs.existsSync(candidate)) {
      continue;
    }

    try {
      return await import(pathToFileURL(candidate).href);
    } catch (error) {
      errors.push(`${candidate}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  throw new Error(
    [
      "Puppeteer runtime not found.",
      "Install `puppeteer`/`puppeteer-core`, or set XHS_CARD_PUPPETEER_PATH to a resolvable module entry.",
      `Tried: ${errors.join(" | ") || "no candidates"}`,
    ].join(" ")
  );
}

function findChromeExecutable() {
  const override = process.env.XHS_CARD_CHROME_PATH?.trim();
  if (override && fs.existsSync(override)) {
    return override;
  }

  const candidates = [];
  switch (process.platform) {
    case "darwin":
      candidates.push(
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
        "/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
      );
      break;
    case "win32":
      candidates.push(
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
        "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
      );
      break;
    default:
      candidates.push(
        "/usr/bin/google-chrome",
        "/usr/bin/google-chrome-stable",
        "/usr/bin/chromium",
        "/usr/bin/chromium-browser",
        "/snap/bin/chromium",
        "/usr/bin/microsoft-edge"
      );
      break;
  }

  return candidates.find((candidate) => fs.existsSync(candidate)) || "";
}

// ---------------------------------------------------------------------------
// Resolve output directory
// ---------------------------------------------------------------------------

function resolveOutputDir(inputPath, explicitOutput) {
  if (explicitOutput) {
    return path.resolve(process.cwd(), explicitOutput);
  }

  const absInput = path.resolve(process.cwd(), inputPath);
  const slug = path.basename(absInput, path.extname(absInput));

  // Detect deep-research pipeline path
  const deepResearchPattern = /openspec\/runtime\/deep-research\/([^/]+)\//;
  const match = absInput.match(deepResearchPattern);
  if (match) {
    const pipelineRoot = absInput.slice(0, absInput.indexOf(match[0]) + match[0].length);
    return path.join(pipelineRoot, "visuals", "xhs");
  }

  return path.join(path.dirname(absInput), `xhs-${slug}`);
}

// ---------------------------------------------------------------------------
// Hand-rolled Markdown → HTML parser
// ---------------------------------------------------------------------------

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Parse inline markdown: bold, italic, code, links, etc.
 * Processes from the inside out — code spans first (they suppress further
 * inline parsing of their contents).
 */
function parseInline(text) {
  // Inline code (backtick) — must be first to prevent inner parsing
  text = text.replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`);

  // Images  ![alt](url)
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%"/>');

  // Links  [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Bold + italic  ***text*** or ___text___
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  text = text.replace(/___(.+?)___/g, "<strong><em>$1</em></strong>");

  // Bold  **text** or __text__
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic  *text* or _text_  (only if not part of a word for underscores)
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
  text = text.replace(/(?<![a-zA-Z0-9])_(.+?)_(?![a-zA-Z0-9])/g, "<em>$1</em>");

  return text;
}

/**
 * Strip YAML front matter (--- ... ---) from the top of the markdown text.
 */
function stripFrontMatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  return m ? md.slice(m[0].length) : md;
}

/**
 * Convert a full markdown string to HTML.
 */
function markdownToHtml(md) {
  md = stripFrontMatter(md);
  const lines = md.split(/\r?\n/);
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // --- Blank line ---
    if (line.trim() === "") {
      i++;
      continue;
    }

    // --- Fenced code block ---
    const fenceMatch = line.match(/^(`{3,}|~{3,})\s*(.*)/);
    if (fenceMatch) {
      const fence = fenceMatch[1];
      const lang = fenceMatch[2] || "";
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith(fence)) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      const langAttr = lang ? ` class="language-${escapeHtml(lang)}"` : "";
      out.push(`<pre><code${langAttr}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      continue;
    }

    // --- Heading ---
    const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      out.push(`<h${level}>${parseInline(headingMatch[2])}</h${level}>`);
      i++;
      continue;
    }

    // --- Horizontal rule ---
    if (/^(\*{3,}|-{3,}|_{3,})\s*$/.test(line)) {
      out.push("<hr/>");
      i++;
      continue;
    }

    // --- Table ---
    if (line.includes("|") && i + 1 < lines.length && /^\|?\s*[-:]+[-| :]*$/.test(lines[i + 1])) {
      const tableLines = [];
      let ti = i;
      while (ti < lines.length && lines[ti].includes("|")) {
        tableLines.push(lines[ti]);
        ti++;
      }
      out.push(parseTable(tableLines));
      i = ti;
      continue;
    }

    // --- Blockquote ---
    if (line.startsWith(">")) {
      const bqLines = [];
      while (i < lines.length && (lines[i].startsWith(">") || (lines[i].trim() !== "" && bqLines.length > 0 && !lines[i].match(/^[#\-*|`>]/)))) {
        bqLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote>${markdownToHtml(bqLines.join("\n"))}</blockquote>`);
      continue;
    }

    // --- Unordered list ---
    if (/^[\t ]*[-*+]\s/.test(line)) {
      const result = parseList(lines, i, "ul");
      out.push(result.html);
      i = result.nextIndex;
      continue;
    }

    // --- Ordered list ---
    if (/^[\t ]*\d+\.\s/.test(line)) {
      const result = parseList(lines, i, "ol");
      out.push(result.html);
      i = result.nextIndex;
      continue;
    }

    // --- Paragraph (collect consecutive non-blank non-block lines) ---
    const pLines = [];
    while (i < lines.length && lines[i].trim() !== "" && !isBlockStart(lines, i)) {
      pLines.push(lines[i]);
      i++;
    }
    if (pLines.length > 0) {
      out.push(`<p>${parseInline(pLines.join(" "))}</p>`);
    }
  }

  return out.join("\n");
}

/**
 * Detect whether a line starts a new block element.
 */
function isBlockStart(lines, i) {
  const line = lines[i];
  if (/^#{1,4}\s/.test(line)) return true;
  if (/^(`{3,}|~{3,})/.test(line)) return true;
  if (/^(\*{3,}|-{3,}|_{3,})\s*$/.test(line)) return true;
  if (/^>\s/.test(line)) return true;
  if (/^[\t ]*[-*+]\s/.test(line)) return true;
  if (/^[\t ]*\d+\.\s/.test(line)) return true;
  // table detection: current line has pipes and next line is separator
  if (line.includes("|") && i + 1 < lines.length && /^\|?\s*[-:]+[-| :]*$/.test(lines[i + 1])) return true;
  return false;
}

/**
 * Parse a markdown table (array of raw lines including header + separator).
 */
function parseTable(tableLines) {
  const parseCells = (row) =>
    row
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());

  const headers = parseCells(tableLines[0]);
  // tableLines[1] is the separator — skip it
  const rows = tableLines.slice(2).map(parseCells);

  let html = "<table><thead><tr>";
  for (const h of headers) {
    html += `<th>${parseInline(h)}</th>`;
  }
  html += "</tr></thead><tbody>";
  for (const row of rows) {
    html += "<tr>";
    for (let ci = 0; ci < headers.length; ci++) {
      html += `<td>${parseInline(row[ci] || "")}</td>`;
    }
    html += "</tr>";
  }
  html += "</tbody></table>";
  return html;
}

/**
 * Parse an ordered or unordered list starting at line index `start`.
 * Returns { html, nextIndex }.
 */
function parseList(lines, start, type) {
  const items = [];
  let i = start;
  const baseIndent = getIndent(lines[start]);
  const pattern = type === "ul" ? /^([\t ]*)[-*+]\s(.*)/ : /^([\t ]*)\d+\.\s(.*)/;

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      // blank line — peek ahead to see if list continues
      if (i + 1 < lines.length && getIndent(lines[i + 1]) >= baseIndent && pattern.test(lines[i + 1].trimStart() ? lines[i + 1] : "")) {
        i++;
        continue;
      }
      break;
    }

    const indent = getIndent(line);
    if (indent < baseIndent && items.length > 0) break;

    const match = line.match(pattern);
    if (match && indent === baseIndent) {
      items.push(match[2]);
      i++;

      // Collect continuation lines (indented further, not a new item)
      while (i < lines.length && lines[i].trim() !== "" && getIndent(lines[i]) > baseIndent && !pattern.test(lines[i])) {
        items[items.length - 1] += " " + lines[i].trim();
        i++;
      }
    } else if (indent > baseIndent && items.length > 0) {
      // Nested list — collect and recurse
      const nestedStart = i;
      const nestedType = /^[\t ]*\d+\.\s/.test(line) ? "ol" : "ul";
      const nestedResult = parseList(lines, nestedStart, nestedType);
      items[items.length - 1] += nestedResult.html;
      i = nestedResult.nextIndex;
    } else {
      break;
    }
  }

  const tag = type;
  let html = `<${tag}>`;
  for (const item of items) {
    html += `<li>${parseInline(item)}</li>`;
  }
  html += `</${tag}>`;

  return { html, nextIndex: i };
}

function getIndent(line) {
  const match = line.match(/^([\t ]*)/);
  if (!match) return 0;
  // Count tabs as 4 spaces
  return match[1].replace(/\t/g, "    ").length;
}

// ---------------------------------------------------------------------------
// Build full HTML document
// ---------------------------------------------------------------------------

function buildFullHtml(contentHtml, css) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=${PAGE_WIDTH}, initial-scale=1"/>
<style>
*, *::before, *::after { box-sizing: border-box; }
${css}
</style>
</head>
<body>
${contentHtml}
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Puppeteer rendering & slicing
// ---------------------------------------------------------------------------

async function renderAndSlice(htmlPath, outputDir, slug) {
  const puppeteer = await loadPuppeteer();
  const chromePath = findChromeExecutable();
  const browser = await puppeteer.launch({
    ...(chromePath ? { executablePath: chromePath } : {}),
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      `--window-size=${PAGE_WIDTH},${PAGE_HEIGHT}`,
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      deviceScaleFactor: DEVICE_SCALE,
    });

    await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0", timeout: 30000 });

    // Measure content height
    const contentHeight = await page.evaluate(() => document.body.scrollHeight);

    if (contentHeight <= 0) {
      throw new Error("Content height is 0 — rendering may have failed");
    }

    // Collect y-positions of block-level elements for smart slicing
    const blockPositions = await page.evaluate(() => {
      const selectors = "h1, h2, h3, h4, p, pre, blockquote, table, ul, ol, hr, figure";
      const elements = document.querySelectorAll(selectors);
      const positions = [];
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        positions.push({
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
          tag: el.tagName.toLowerCase(),
        });
      }
      // Sort by top position
      positions.sort((a, b) => a.top - b.top);
      return positions;
    });

    // Compute page boundaries using smart slicing
    const pageBounds = computePageBounds(contentHeight, blockPositions);

    // Screenshot each page
    const pages = [];
    for (let pi = 0; pi < pageBounds.length; pi++) {
      const { y, height } = pageBounds[pi];
      const filename = String(pi + 1).padStart(2, "0") + ".png";
      const filepath = path.join(outputDir, filename);

      await page.screenshot({
        path: filepath,
        type: "png",
        clip: {
          x: 0,
          y,
          width: PAGE_WIDTH,
          height,
        },
      });

      pages.push({ filename, y, height });
    }

    return { contentHeight, pages };
  } finally {
    await browser.close();
  }
}

/**
 * Compute page boundaries for slicing.
 *
 * Strategy: start at y=0, attempt to place each cut at PAGE_HEIGHT intervals.
 * For each cut, search ±SNAP_RANGE for the nearest gap between block elements.
 * If the last page is less than MIN_LAST_PAGE_RATIO * PAGE_HEIGHT, merge it
 * with the previous page.
 */
function computePageBounds(totalHeight, blockPositions) {
  if (totalHeight <= PAGE_HEIGHT) {
    return [{ y: 0, height: totalHeight }];
  }

  const cuts = [0]; // y-coordinates of page starts
  let currentY = 0;

  while (currentY + PAGE_HEIGHT < totalHeight) {
    const idealCut = currentY + PAGE_HEIGHT;

    // Find the best gap near idealCut
    const bestGap = findBestGap(idealCut, blockPositions, currentY, totalHeight);
    cuts.push(bestGap);
    currentY = bestGap;
  }

  // Build page bounds from cuts
  const pages = [];
  for (let i = 0; i < cuts.length; i++) {
    const y = cuts[i];
    const nextY = i + 1 < cuts.length ? cuts[i + 1] : totalHeight;
    pages.push({ y, height: nextY - y });
  }

  // Merge last page if too short
  if (pages.length > 1) {
    const lastPage = pages[pages.length - 1];
    if (lastPage.height < PAGE_HEIGHT * MIN_LAST_PAGE_RATIO) {
      const prev = pages[pages.length - 2];
      prev.height += lastPage.height;
      pages.pop();
    }
  }

  return pages;
}

/**
 * Find the best y-coordinate to cut near `idealY`.
 * Looks for the largest gap between consecutive block elements within
 * [idealY - SNAP_RANGE, idealY + SNAP_RANGE].
 */
function findBestGap(idealY, blockPositions, pageStartY, totalHeight) {
  const lo = Math.max(idealY - SNAP_RANGE, pageStartY + PAGE_HEIGHT * 0.3);
  const hi = Math.min(idealY + SNAP_RANGE, totalHeight);

  // Collect all element boundaries (bottom of one element, top of next)
  // that fall within the search range.
  const gaps = [];

  for (let i = 0; i < blockPositions.length - 1; i++) {
    const gapTop = blockPositions[i].bottom;
    const gapBottom = blockPositions[i + 1].top;

    // The gap midpoint should be within range
    const gapMid = (gapTop + gapBottom) / 2;
    if (gapMid >= lo && gapMid <= hi) {
      gaps.push({
        y: gapMid,
        size: gapBottom - gapTop,
        distFromIdeal: Math.abs(gapMid - idealY),
      });
    }
  }

  if (gaps.length === 0) {
    // No clean gap found — fall back to the ideal cut point
    return idealY;
  }

  // Prefer gaps closer to idealY; break ties with larger gap size
  gaps.sort((a, b) => {
    const distDiff = a.distFromIdeal - b.distFromIdeal;
    if (Math.abs(distDiff) < 30) {
      // Within 30px, prefer larger gap
      return b.size - a.size;
    }
    return distDiff;
  });

  return Math.round(gaps[0].y);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { inputPath, style, output } = parseArgs(process.argv.slice(2));

  const absInput = path.resolve(process.cwd(), inputPath);
  if (!fs.existsSync(absInput)) {
    console.error(`File not found: ${absInput}`);
    process.exit(1);
  }

  const slug = path.basename(absInput, path.extname(absInput));
  const outputDir = resolveOutputDir(absInput, output);

  // Load CSS theme
  const cssPath = path.join(THEMES_DIR, `${style}.css`);
  if (!fs.existsSync(cssPath)) {
    console.error(`Theme CSS not found: ${cssPath}`);
    process.exit(1);
  }
  const css = fs.readFileSync(cssPath, "utf-8");

  // Read markdown & convert
  const markdown = fs.readFileSync(absInput, "utf-8");
  const contentHtml = markdownToHtml(markdown);
  const fullHtml = buildFullHtml(contentHtml, css);

  // Write output
  fs.mkdirSync(outputDir, { recursive: true });

  const htmlPath = path.join(outputDir, "full.html");
  fs.writeFileSync(htmlPath, fullHtml, "utf-8");
  console.log(`HTML saved: ${htmlPath}`);

  // Render with Puppeteer
  console.log(`Rendering with style "${style}" at ${PAGE_WIDTH}x (2x scale)...`);
  const { contentHeight, pages } = await renderAndSlice(htmlPath, outputDir, slug);

  // Summary
  console.log("");
  console.log("=== XHS Card Generation Summary ===");
  console.log(`Source:  ${absInput}`);
  console.log(`Style:   ${style}`);
  console.log(`Output:  ${outputDir}`);
  console.log(`Content: ${contentHeight}px total height`);
  console.log(`Pages:   ${pages.length}`);
  console.log("");
  for (const p of pages) {
    console.log(`  ${p.filename}  y=${p.y} h=${p.height}`);
  }
  console.log("");
  console.log(`Done. ${pages.length} page(s) generated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
