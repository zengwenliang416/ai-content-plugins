#!/usr/bin/env node

/**
 * fetch-icons.mjs — Search and download SVG icons via AntV WeaveFox API,
 * with local content-addressed cache.
 *
 * Usage:
 *   node fetch-icons.mjs --query "<keyword>" [--topk N] [--no-cache] [--cache-dir <dir>]
 *
 * Output: JSON on stdout with `{ query, topK, items: [{remote, local}], cached }`.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

function parseArgs(argv) {
  const opts = {
    query: "",
    topK: 5,
    noCache: false,
    cacheDir: "openspec/runtime/visuals/icons/_cache",
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--query") opts.query = argv[++i];
    else if (a === "--topk") opts.topK = Number(argv[++i]);
    else if (a === "--no-cache") opts.noCache = true;
    else if (a === "--cache-dir") opts.cacheDir = argv[++i];
  }
  if (!opts.query) {
    console.error("ERROR: --query is required");
    process.exit(2);
  }
  opts.topK = Math.max(1, Math.min(20, opts.topK || 5));
  return opts;
}

const opts = parseArgs(process.argv.slice(2));
fs.mkdirSync(opts.cacheDir, { recursive: true });

function sha16(s) {
  return crypto.createHash("sha1").update(s).digest("hex").slice(0, 16);
}

const cacheKey = sha16(`${opts.query}:${opts.topK}`);
const cacheFile = path.join(opts.cacheDir, `${cacheKey}.json`);
const TTL_MS = 30 * 24 * 3600 * 1000;

async function loadFromCache() {
  if (opts.noCache || !fs.existsSync(cacheFile)) return null;
  const stat = fs.statSync(cacheFile);
  if (Date.now() - stat.mtimeMs > TTL_MS) return null;
  try {
    return JSON.parse(fs.readFileSync(cacheFile, "utf-8"));
  } catch {
    return null;
  }
}

async function fetchSearchResults() {
  const url = `https://lab.weavefox.cn/api/v1/infographic/icon?text=${encodeURIComponent(opts.query)}&topK=${opts.topK}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);
  let body;
  try {
    const resp = await fetch(url, { signal: controller.signal });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    body = await resp.json();
  } finally {
    clearTimeout(timeoutId);
  }
  if (!body.success || !Array.isArray(body.data)) {
    throw new Error(`api returned failure: ${JSON.stringify(body).slice(0, 200)}`);
  }
  return body.data;
}

async function downloadSvg(url) {
  const hash = sha16(url);
  const local = path.join(opts.cacheDir, `${hash}.svg`);
  if (fs.existsSync(local) && fs.statSync(local).size > 0) {
    return { remote: url, local, cached: true };
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);
  try {
    const resp = await fetch(url, { signal: controller.signal });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const text = await resp.text();
    if (!text.trim().startsWith("<svg") && !text.trim().startsWith("<?xml")) {
      throw new Error("not a valid SVG");
    }
    fs.writeFileSync(local, text);
    return { remote: url, local, cached: false };
  } finally {
    clearTimeout(timeoutId);
  }
}

(async () => {
  try {
    let urls;
    const cached = await loadFromCache();
    if (cached) {
      urls = cached.urls;
    } else {
      urls = await fetchSearchResults();
      fs.writeFileSync(cacheFile, JSON.stringify({ query: opts.query, topK: opts.topK, urls, ts: Date.now() }, null, 2));
    }

    const items = [];
    for (const url of urls) {
      try {
        items.push(await downloadSvg(url));
      } catch (e) {
        items.push({ remote: url, local: null, error: e.message });
      }
    }

    console.log(JSON.stringify({
      ok: true,
      query: opts.query,
      topK: opts.topK,
      cached: !!cached,
      cacheKey,
      items,
    }, null, 2));
  } catch (e) {
    console.error(JSON.stringify({ ok: false, error: e.message }, null, 2));
    process.exit(1);
  }
})();
