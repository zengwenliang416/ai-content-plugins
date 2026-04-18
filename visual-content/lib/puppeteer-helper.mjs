/**
 * puppeteer-helper.mjs — Shared Puppeteer bootstrapping for all visual-content
 * scripts that need headless browser rendering (chart, infographic-dsl,
 * narrative-text-viz, xhs-card-style flows).
 *
 * Resolution order (first hit wins):
 *   1. `puppeteer` package (ships bundled Chromium — easiest)
 *   2. `puppeteer-core` package + system Chrome / Chromium
 *   3. Explicit `VIS_CHROME_PATH` / `XHS_CARD_CHROME_PATH` + `puppeteer-core`
 *
 * Exported API:
 *   launchBrowser(opts?)   → Promise<Browser>  (throws InstallHintError on fail)
 *   detect()               → Promise<{ ok, mode, puppeteerPkg, chromePath, hint }>
 *   InstallHintError       → error class with a `hint` field containing copy-paste install commands
 */

import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

// ---------------------------------------------------------------------------
// Known Chrome / Chromium paths per platform
// ---------------------------------------------------------------------------

const SYSTEM_CHROME_PATHS = {
  darwin: [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  ],
  linux: [
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/snap/bin/chromium",
    "/usr/bin/microsoft-edge",
  ],
  win32: [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    path.join(process.env.LOCALAPPDATA || "", "Google\\Chrome\\Application\\chrome.exe"),
  ],
};

function findSystemChrome() {
  // Explicit env override wins
  const envPath =
    process.env.VIS_CHROME_PATH ||
    process.env.XHS_CARD_CHROME_PATH ||
    process.env.PUPPETEER_EXECUTABLE_PATH;
  if (envPath && existsSync(envPath)) return envPath;

  const candidates = SYSTEM_CHROME_PATHS[process.platform] || [];
  for (const p of candidates) {
    if (p && existsSync(p)) return p;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Detection
// ---------------------------------------------------------------------------

async function tryImport(pkg) {
  try {
    const mod = await import(pkg);
    return mod.default || mod;
  } catch {
    return null;
  }
}

export async function detect() {
  const puppeteer = await tryImport("puppeteer");
  if (puppeteer) {
    return { ok: true, mode: "puppeteer-bundled", puppeteerPkg: "puppeteer", chromePath: null };
  }

  const core = await tryImport("puppeteer-core");
  const chromePath = findSystemChrome();
  if (core && chromePath) {
    return {
      ok: true,
      mode: "puppeteer-core-system-chrome",
      puppeteerPkg: "puppeteer-core",
      chromePath,
    };
  }

  // Not ready — build a helpful hint
  const hint = buildInstallHint({ hasCore: !!core, hasChrome: !!chromePath });
  return { ok: false, mode: null, puppeteerPkg: null, chromePath, hint };
}

function buildInstallHint({ hasCore, hasChrome }) {
  const lines = [];
  lines.push("Puppeteer is required for local rendering. Pick one of:");
  lines.push("");
  lines.push("Option A — bundled Chromium (simplest, ~150MB download):");
  lines.push("  npm install puppeteer");
  lines.push("");
  lines.push("Option B — use your system Chrome (no extra download):");
  if (!hasCore) {
    lines.push("  npm install puppeteer-core");
  }
  if (!hasChrome) {
    lines.push("  # Also install Chrome / Chromium / Edge, OR set:");
    lines.push("  export VIS_CHROME_PATH=/absolute/path/to/chrome");
  } else {
    lines.push(`  # System Chrome was found at: ${findSystemChrome()}`);
    lines.push("  # Just run: npm install puppeteer-core");
  }
  lines.push("");
  lines.push("Option C — skip rendering and open the HTML manually:");
  lines.push("  Use `--html-only` flag (where supported) to get HTML without PNG/SVG.");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Launch
// ---------------------------------------------------------------------------

export class InstallHintError extends Error {
  constructor(hint) {
    super("Puppeteer runtime not available");
    this.name = "InstallHintError";
    this.hint = hint;
  }
}

export async function launchBrowser(opts = {}) {
  const detected = await detect();
  if (!detected.ok) throw new InstallHintError(detected.hint);

  const launchOpts = {
    headless: opts.headless === undefined ? "new" : opts.headless,
    args: opts.args || [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-web-security",
    ],
    ...(opts.extra || {}),
  };

  if (detected.mode === "puppeteer-core-system-chrome") {
    launchOpts.executablePath = detected.chromePath;
  }

  const pp = await tryImport(detected.puppeteerPkg);
  if (!pp) throw new InstallHintError(detected.hint || "puppeteer vanished between detect and launch");
  const browser = await pp.launch(launchOpts);
  browser.__visMode = detected.mode;
  browser.__visChromePath = detected.chromePath;
  return browser;
}

// ---------------------------------------------------------------------------
// CLI utility: `node puppeteer-helper.mjs detect`
// ---------------------------------------------------------------------------

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const cmd = process.argv[2] || "detect";
  if (cmd === "detect") {
    const result = await detect();
    if (result.ok) {
      console.log(JSON.stringify(
        { ok: true, mode: result.mode, pkg: result.puppeteerPkg, chromePath: result.chromePath },
        null,
        2
      ));
      process.exit(0);
    } else {
      console.error(result.hint);
      process.exit(1);
    }
  } else {
    console.error(`Unknown command: ${cmd}. Try: detect`);
    process.exit(2);
  }
}
