import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import { spawnSync as nodeSpawnSync, spawn as nodeSpawn } from "child_process";

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
  const result = nodeSpawnSync("which", [name]);
  if (result.status !== 0) {
    console.error(`ERROR: '${name}' not found. Install: ${installHint}`);
    process.exit(127);
  }
}

export async function toolExists(name: string): Promise<boolean> {
  const result = nodeSpawnSync("which", [name]);
  return result.status === 0;
}

export async function runCmd(
  cmd: string[],
  env?: Record<string, string>,
): Promise<{ ok: boolean; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    try {
      const proc = nodeSpawn(cmd[0], cmd.slice(1), {
        env: { ...process.env, ...env },
      });
      const stdoutChunks: Buffer[] = [];
      const stderrChunks: Buffer[] = [];
      proc.stdout.on("data", (chunk: Buffer) => stdoutChunks.push(chunk));
      proc.stderr.on("data", (chunk: Buffer) => stderrChunks.push(chunk));
      proc.on("close", (code) => {
        resolve({
          ok: code === 0,
          stdout: Buffer.concat(stdoutChunks).toString().trim(),
          stderr: Buffer.concat(stderrChunks).toString().trim(),
        });
      });
      proc.on("error", (e: Error) => {
        resolve({ ok: false, stdout: "", stderr: e.message });
      });
    } catch (e: any) {
      resolve({ ok: false, stdout: "", stderr: e.message ?? String(e) });
    }
  });
}

/**
 * Build bird CLI args with auth from config.
 * Returns base args: ["bird", ...extraArgs, "--auth-token", token, "--ct0", ct0]
 */
export function birdArgs(
  config: Record<string, string>,
  extra: string[],
): string[] {
  const args = ["bird", ...extra];
  if (config.twitter_auth_token)
    args.push("--auth-token", config.twitter_auth_token);
  if (config.twitter_ct0) args.push("--ct0", config.twitter_ct0);
  return args;
}

/**
 * Build env for Node.js CLI tools that need proxy support.
 * Uses undici ProxyAgent via NODE_OPTIONS --require preload.
 */
export function proxyEnv(
  config: Record<string, string>,
): Record<string, string> {
  const env: Record<string, string> = {};
  const proxy =
    config.proxy || process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
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
  const r = nodeSpawnSync(
    "node",
    ["-e", "console.log(require.resolve('undici'))"],
    { env: { ...process.env, NODE_PATH: npmGlobalRoot() } },
  );
  if (r.status !== 0) return null;
  const undiciIndex = r.stdout.toString().trim();
  // Write a one-time bootstrap script next to config
  const bootstrapPath = join(
    homedir(),
    ".config",
    "news-search",
    "proxy-bootstrap.cjs",
  );
  const undiciDir = undiciIndex.replace(/\/index\.js$/, "");
  const script = `const{setGlobalDispatcher,ProxyAgent}=require('${undiciDir}');const p=process.env.HTTPS_PROXY||process.env.HTTP_PROXY;if(p)setGlobalDispatcher(new ProxyAgent(p));`;
  mkdirSync(join(homedir(), ".config", "news-search"), { recursive: true });
  writeFileSync(bootstrapPath, script);
  return bootstrapPath;
}

function npmGlobalRoot(): string {
  const r = nodeSpawnSync("npm", ["root", "-g"]);
  return r.status === 0 ? r.stdout.toString().trim() : "";
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
  if (si >= 0) {
    sinceVal = args[si + 1] || "24h";
    args.splice(si, 2);
  }
  const nf = args.indexOf("--no-freshness");
  if (nf >= 0) {
    noFreshness = true;
    args.splice(nf, 1);
  }
  return { positional: args, since: parseSince(sinceVal), noFreshness };
}

export function filterJsonLines(
  stdout: string,
  since: Date,
  dateField: string,
): string {
  const threshold = fmtDate(since, "compact");
  const lines = stdout.split("\n").filter((line) => {
    if (!line.trim()) return false;
    try {
      const obj = JSON.parse(line);
      const val = obj[dateField];
      if (!val) return true;
      const ds = String(val)
        .replace(/[-T:Z]/g, "")
        .slice(0, 8);
      return ds >= threshold;
    } catch {
      return true;
    }
  });
  if (lines.length === 0)
    console.error(
      "[freshness] All results filtered out — try --since 7d or --no-freshness",
    );
  return lines.join("\n");
}
