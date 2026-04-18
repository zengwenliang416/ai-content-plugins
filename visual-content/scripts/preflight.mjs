#!/usr/bin/env node

/**
 * preflight.mjs — One-shot readiness check for visual-content AntV skills.
 *
 * Checks:
 *   1. Node version >= 18 (for native fetch)
 *   2. Puppeteer runtime (via shared helper)
 *   3. Network reachability to critical endpoints
 *       - antv-studio.alipay.com (chart remote API)
 *       - lab.weavefox.cn (icon API)
 *       - cdn.jsdelivr.net (CDN primary)
 *       - unpkg.com (CDN fallback)
 *
 * Exit code:
 *   0 — all green
 *   1 — at least one required check failed
 *   2 — at least one optional check failed (warnings only)
 *
 * Usage:
 *   node visual-content/scripts/preflight.mjs
 *   node visual-content/scripts/preflight.mjs --json
 */

import process from "node:process";
import { detect as detectPuppeteer } from "../lib/puppeteer-helper.mjs";

const jsonMode = process.argv.includes("--json");
const results = [];

function record(name, ok, level, detail) {
  results.push({ name, ok, level, detail });
}

async function checkNode() {
  const major = Number(process.versions.node.split(".")[0]);
  const ok = major >= 18;
  record("node>=18", ok, "required",
    ok ? `v${process.versions.node}` : `found v${process.versions.node} — upgrade to 18+ for native fetch`);
}

async function checkPuppeteer() {
  const d = await detectPuppeteer();
  if (d.ok) {
    record("puppeteer", true, "required", `${d.mode} (${d.puppeteerPkg}${d.chromePath ? `, ${d.chromePath}` : ""})`);
  } else {
    record("puppeteer", false, "required", d.hint);
  }
}

async function ping(name, url, level = "optional") {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 8000);
  try {
    const resp = await fetch(url, { method: "HEAD", signal: controller.signal }).catch(async () => {
      // HEAD may be rejected; try GET with no-read
      return await fetch(url, { method: "GET", signal: controller.signal });
    });
    const ok = resp.ok || (resp.status >= 200 && resp.status < 500);
    record(name, ok, level, `HTTP ${resp.status}`);
  } catch (e) {
    record(name, false, level, e.message);
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  await checkNode();
  await checkPuppeteer();
  await Promise.all([
    ping("chart-api (antv-studio)", "https://antv-studio.alipay.com/api/gpt-vis", "optional"),
    ping("icon-api (weavefox)", "https://lab.weavefox.cn/api/v1/infographic/icon?text=test&topK=1", "optional"),
    ping("cdn-primary (jsdelivr)", "https://cdn.jsdelivr.net/npm/@antv/g2@5/dist/g2.min.js", "optional"),
    ping("cdn-fallback (unpkg)", "https://unpkg.com/@antv/g2@5/dist/g2.min.js", "optional"),
  ]);

  const requiredFailed = results.filter((r) => r.level === "required" && !r.ok);
  const optionalFailed = results.filter((r) => r.level === "optional" && !r.ok);

  if (jsonMode) {
    console.log(JSON.stringify({
      ok: requiredFailed.length === 0,
      required_failed: requiredFailed.length,
      optional_failed: optionalFailed.length,
      results,
    }, null, 2));
  } else {
    console.log("\n  visual-content preflight\n  " + "─".repeat(60));
    for (const r of results) {
      const icon = r.ok ? "✓" : (r.level === "required" ? "✗" : "!");
      const badge = r.level === "required" ? "[REQUIRED]" : "[optional]";
      console.log(`  ${icon} ${badge} ${r.name}`);
      if (!r.ok || process.argv.includes("--verbose")) {
        for (const line of String(r.detail).split("\n")) console.log(`      ${line}`);
      }
    }
    console.log("  " + "─".repeat(60));
    if (requiredFailed.length === 0 && optionalFailed.length === 0) {
      console.log("  All green. Ready to render.\n");
    } else if (requiredFailed.length === 0) {
      console.log(`  Ready, with ${optionalFailed.length} optional warning(s).`);
      console.log("  Skills will fall back gracefully (local render / cached icons / etc).\n");
    } else {
      console.log(`  ${requiredFailed.length} required check(s) failed. See hints above.\n`);
    }
  }

  if (requiredFailed.length > 0) process.exit(1);
  if (optionalFailed.length > 0) process.exit(2);
  process.exit(0);
}

main().catch((e) => {
  console.error("preflight crashed:", e);
  process.exit(3);
});
