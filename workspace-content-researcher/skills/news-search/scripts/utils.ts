import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const CONFIG_DIR = join(homedir(), ".config", "news-search");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");

export function loadConfig(): Record<string, string> {
  mkdirSync(CONFIG_DIR, { recursive: true });
  if (!existsSync(CONFIG_FILE)) writeFileSync(CONFIG_FILE, "{}");
  try {
    return JSON.parse(readFileSync(CONFIG_FILE, "utf-8"));
  } catch {
    return {};
  }
}

export function saveConfig(config: Record<string, string>): void {
  mkdirSync(CONFIG_DIR, { recursive: true });
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

export function requireTool(name: string, installHint: string): void {
  const result = Bun.spawnSync(["which", name]);
  if (result.exitCode !== 0) {
    console.error(`ERROR: '${name}' not found. Install: ${installHint}`);
    process.exit(127);
  }
}

export async function toolExists(name: string): Promise<boolean> {
  const result = Bun.spawnSync(["which", name]);
  return result.exitCode === 0;
}

export async function runCmd(
  cmd: string[],
  env?: Record<string, string>,
): Promise<{ ok: boolean; stdout: string; stderr: string }> {
  try {
    const proc = Bun.spawn(cmd, {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, ...env },
    });
    const [stdout, stderr] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
    ]);
    const exitCode = await proc.exited;
    return { ok: exitCode === 0, stdout: stdout.trim(), stderr: stderr.trim() };
  } catch (e: any) {
    return { ok: false, stdout: "", stderr: e.message ?? String(e) };
  }
}

/**
 * Build bird CLI args with auth from config.
 * Returns base args: ["bird", ...extraArgs, "--auth-token", token, "--ct0", ct0]
 */
export function birdArgs(config: Record<string, string>, extra: string[]): string[] {
  const args = ["bird", ...extra];
  if (config.twitter_auth_token) args.push("--auth-token", config.twitter_auth_token);
  if (config.twitter_ct0) args.push("--ct0", config.twitter_ct0);
  return args;
}

/**
 * Build env for Node.js CLI tools that need proxy support.
 * Uses undici ProxyAgent via NODE_OPTIONS --require preload.
 */
export function proxyEnv(config: Record<string, string>): Record<string, string> {
  const env: Record<string, string> = {};
  const proxy = config.proxy || process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
  if (proxy) {
    env.HTTPS_PROXY = proxy;
    env.HTTP_PROXY = proxy;
    // Preload undici ProxyAgent for Node.js tools (bird, etc.)
    const undiciPath = resolveUndiciBootstrap();
    if (undiciPath) env.NODE_OPTIONS = `--require ${undiciPath}`;
  }
  return env;
}

function resolveUndiciBootstrap(): string | null {
  const r = Bun.spawnSync(["node", "-e", "console.log(require.resolve('undici'))"], {
    stdout: "pipe",
    env: { ...process.env, NODE_PATH: npmGlobalRoot() },
  });
  if (r.exitCode !== 0) return null;
  const undiciIndex = new TextDecoder().decode(r.stdout).trim();
  // Write a one-time bootstrap script next to config
  const bootstrapPath = join(homedir(), ".config", "news-search", "proxy-bootstrap.cjs");
  const undiciDir = undiciIndex.replace(/\/index\.js$/, "");
  const script = `const{setGlobalDispatcher,ProxyAgent}=require('${undiciDir}');const p=process.env.HTTPS_PROXY||process.env.HTTP_PROXY;if(p)setGlobalDispatcher(new ProxyAgent(p));`;
  mkdirSync(join(homedir(), ".config", "news-search"), { recursive: true });
  writeFileSync(bootstrapPath, script);
  return bootstrapPath;
}

function npmGlobalRoot(): string {
  const r = Bun.spawnSync(["npm", "root", "-g"], { stdout: "pipe" });
  return r.exitCode === 0 ? new TextDecoder().decode(r.stdout).trim() : "";
}

// --- Freshness filtering ---

export function parseSince(since: string): Date {
  const match = since.match(/^(\d+)(h|d|m)$/);
  if (!match) return new Date(Date.now() - 24 * 3600_000);
  const [, num, unit] = match;
  const ms: Record<string, number> = { h: 3600_000, d: 86400_000, m: 60_000 };
  return new Date(Date.now() - parseInt(num) * ms[unit]);
}

export function fmtDate(d: Date, fmt: "iso" | "ymd" | "compact"): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  if (fmt === "compact") return `${y}${m}${day}`;
  if (fmt === "ymd") return `${y}-${m}-${day}`;
  return d.toISOString();
}

export function parseSearchArgs(argv: string[]): {
  positional: string[];
  since: Date;
  noFreshness: boolean;
} {
  const args = [...argv.slice(2)];
  let sinceVal = "24h";
  let noFreshness = false;
  const si = args.indexOf("--since");
  if (si >= 0) { sinceVal = args[si + 1] || "24h"; args.splice(si, 2); }
  const nf = args.indexOf("--no-freshness");
  if (nf >= 0) { noFreshness = true; args.splice(nf, 1); }
  return { positional: args, since: parseSince(sinceVal), noFreshness };
}

export function filterJsonLines(stdout: string, since: Date, dateField: string): string {
  const threshold = fmtDate(since, "compact");
  const lines = stdout.split("\n").filter(line => {
    if (!line.trim()) return false;
    try {
      const obj = JSON.parse(line);
      const val = obj[dateField];
      if (!val) return true;
      const ds = String(val).replace(/[-T:Z]/g, "").slice(0, 8);
      return ds >= threshold;
    } catch { return true; }
  });
  if (lines.length === 0) console.error("[freshness] All results filtered out — try --since 7d or --no-freshness");
  return lines.join("\n");
}
