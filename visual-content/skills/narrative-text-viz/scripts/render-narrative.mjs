#!/usr/bin/env node

/**
 * render-narrative.mjs — Render T8 Syntax narrative to HTML/React/Vue + optional PNG.
 *
 * Usage:
 *   node render-narrative.mjs --content <file.t8> --framework html|react|vue --output <dir> [--export png]
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { launchBrowser, InstallHintError } from "../../../lib/puppeteer-helper.mjs";

function parseArgs(argv) {
  const opts = { content: "", framework: "html", output: "", export: "" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--content") opts.content = argv[++i];
    else if (a === "--framework") opts.framework = argv[++i];
    else if (a === "--output") opts.output = argv[++i];
    else if (a === "--export") opts.export = argv[++i];
  }
  if (!opts.content || !opts.output) {
    console.error("ERROR: --content and --output are required");
    process.exit(2);
  }
  return opts;
}

const opts = parseArgs(process.argv.slice(2));
if (!fs.existsSync(opts.content)) {
  console.error(`ERROR: content file not found: ${opts.content}`);
  process.exit(2);
}
const t8 = fs.readFileSync(opts.content, "utf-8");
fs.mkdirSync(opts.output, { recursive: true });
fs.writeFileSync(path.join(opts.output, "narrative.t8"), t8);

const safeContent = JSON.stringify(t8);

// ---------------------------------------------------------------------------
// Framework output
// ---------------------------------------------------------------------------

function buildHtml() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Narrative</title>
<style>
  body { margin: 0; font-family: -apple-system, 'PingFang SC', 'Segoe UI', sans-serif;
         line-height: 1.7; color: #222; background: #fafafa; }
  #root { max-width: 820px; margin: 40px auto; padding: 40px 48px;
          background: #fff; border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
</style>
</head>
<body>
<div id="root"></div>
<script src="https://cdn.jsdelivr.net/npm/@antv/t8@latest/dist/t8.min.js"
        onerror="this.onerror=null;this.src='https://unpkg.com/@antv/t8@latest/dist/t8.min.js'"></script>
<script>
(function () {
  var content = ${safeContent};
  if (window.T8 && window.T8.render) {
    window.T8.render(document.getElementById('root'), content);
    window.__t8Ready = true;
  } else {
    document.getElementById('root').innerHTML = '<pre>T8 library failed to load. Raw content:\\n\\n' +
      content.replace(/[<>&]/g, function (c) { return { '<':'&lt;', '>':'&gt;', '&':'&amp;' }[c]; }) + '</pre>';
    window.__t8Ready = true;
  }
})();
</script>
</body>
</html>`;
}

function buildReact() {
  return `import React from 'react';
import { T8 } from '@antv/t8';

const content = ${safeContent};

export default function Narrative() {
  return <T8 content={content} />;
}
`;
}

function buildVue() {
  return `<template>
  <T8 :content="content" />
</template>

<script setup>
import { T8 } from '@antv/t8';
const content = ${safeContent};
</script>
`;
}

let outFile, outContents;
switch (opts.framework) {
  case "html":
    outFile = path.join(opts.output, "narrative.html");
    outContents = buildHtml();
    break;
  case "react":
    outFile = path.join(opts.output, "Narrative.jsx");
    outContents = buildReact();
    break;
  case "vue":
    outFile = path.join(opts.output, "Narrative.vue");
    outContents = buildVue();
    break;
  default:
    console.error(`ERROR: unknown framework: ${opts.framework}`);
    process.exit(2);
}
fs.writeFileSync(outFile, outContents);

// ---------------------------------------------------------------------------
// Optional export (PNG)
// ---------------------------------------------------------------------------

async function exportPng() {
  if (opts.framework !== "html") {
    return { skipped: `png export only for html framework` };
  }
  let browser;
  try {
    browser = await launchBrowser();
  } catch (e) {
    if (e instanceof InstallHintError) return { skipped: "puppeteer not installed", installHint: e.hint };
    throw e;
  }
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 1200, deviceScaleFactor: 2 });
    await page.goto("file://" + path.resolve(outFile), { waitUntil: "networkidle0", timeout: 45000 });
    await page.waitForFunction(() => window.__t8Ready === true, { timeout: 20000 });
    const pngPath = path.join(opts.output, "narrative.png");
    await page.screenshot({ path: pngPath, fullPage: true });
    return { png: pngPath };
  } finally {
    await browser.close();
  }
}

(async () => {
  const meta = {
    framework: opts.framework,
    source: opts.content,
    wordCount: (t8.match(/\S+/g) || []).length,
    ts: new Date().toISOString(),
  };

  let exportResult = {};
  if (opts.export === "png") {
    try {
      exportResult = await exportPng();
    } catch (e) {
      exportResult = { error: e.message };
    }
  }

  fs.writeFileSync(path.join(opts.output, "narrative.meta.json"), JSON.stringify(meta, null, 2));

  console.log(JSON.stringify({
    ok: true,
    output: opts.output,
    file: outFile,
    ...exportResult,
    meta,
  }, null, 2));
})();
