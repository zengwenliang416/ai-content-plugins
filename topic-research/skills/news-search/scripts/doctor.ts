import { loadConfig, toolExists, runCmd, birdArgs, proxyEnv } from "./utils.ts";

type Status = "ok" | "missing" | "unconfigured" | "error";
interface ChannelResult {
  status: Status;
  hint?: string;
}

const config = loadConfig();
const jsonMode = process.argv.includes("--json");

async function checkChannel(
  name: string,
  tool: string,
  installHint: string,
  testFn?: () => Promise<ChannelResult>,
): Promise<ChannelResult> {
  if (!(await toolExists(tool))) {
    return { status: "missing", hint: `Install: ${installHint}` };
  }
  if (testFn) return testFn();
  return { status: "ok" };
}

const channels: Record<string, () => Promise<ChannelResult>> = {
  twitter: () =>
    checkChannel(
      "twitter",
      "bird",
      "npm install -g @steipete/bird",
      async () => {
        if (!config.twitter_auth_token) {
          return {
            status: "unconfigured",
            hint: "Run: bun config.ts parse-cookies '<cookie-string>'",
          };
        }
        const r = await runCmd(birdArgs(config, ["whoami"]), proxyEnv(config));
        return r.ok
          ? { status: "ok" }
          : { status: "error", hint: "Auth failed — cookies may be expired" };
      },
    ),

  youtube: () => checkChannel("youtube", "yt-dlp", "pip install yt-dlp"),

  bilibili: () => checkChannel("bilibili", "yt-dlp", "pip install yt-dlp"),

  github: () =>
    checkChannel("github", "gh", "brew install gh", async () => {
      const r = await runCmd(["gh", "auth", "status"]);
      return r.ok
        ? { status: "ok" }
        : { status: "unconfigured", hint: "Run: gh auth login" };
    }),

  reddit: async () => {
    if (config.reddit_proxy) return { status: "ok" };
    return {
      status: "ok",
      hint: "No proxy — may be blocked from some IPs. Consider configuring a proxy.",
    };
  },

  exa: () =>
    checkChannel("exa", "mcporter", "npm install -g mcporter", async () => {
      const r = await runCmd(["mcporter", "list"]);
      if (!r.ok || !r.stdout.includes("exa")) {
        return {
          status: "unconfigured",
          hint: "Run: mcporter config add exa https://mcp.exa.ai/mcp",
        };
      }
      return { status: "ok" };
    }),

  xhs: () =>
    checkChannel("xhs", "mcporter", "npm install -g mcporter", async () => {
      const r = await runCmd(["mcporter", "list"]);
      if (!r.ok || !r.stdout.includes("xiaohongshu")) {
        return {
          status: "unconfigured",
          hint: "Need xiaohongshu-mcp Docker service. See news-search-setup.",
        };
      }
      return { status: "ok" };
    }),

  douyin: () =>
    checkChannel("douyin", "mcporter", "npm install -g mcporter", async () => {
      const r = await runCmd(["mcporter", "list"]);
      if (!r.ok || !r.stdout.includes("douyin")) {
        return {
          status: "unconfigured",
          hint: "Need douyin MCP service. See news-search-setup.",
        };
      }
      return { status: "ok" };
    }),

  linkedin: () =>
    checkChannel(
      "linkedin",
      "mcporter",
      "npm install -g mcporter",
      async () => {
        const r = await runCmd(["mcporter", "list"]);
        if (!r.ok || !r.stdout.includes("linkedin")) {
          return {
            status: "ok",
            hint: "MCP not configured — fallback to Jina Reader",
          };
        }
        return { status: "ok" };
      },
    ),

  bosszhipin: () =>
    checkChannel(
      "bosszhipin",
      "mcporter",
      "npm install -g mcporter",
      async () => {
        const r = await runCmd(["mcporter", "list"]);
        if (!r.ok || !r.stdout.includes("bosszp")) {
          return {
            status: "ok",
            hint: "MCP not configured — fallback to Jina Reader",
          };
        }
        return { status: "ok" };
      },
    ),

  web: async () => ({ status: "ok" }),

  rss: async () => {
    const r = await runCmd(["python3", "-c", "import feedparser"]);
    if (!r.ok)
      return { status: "missing", hint: "Install: pip install feedparser" };
    return { status: "ok" };
  },
};

const results: Record<string, ChannelResult> = {};
for (const [name, check] of Object.entries(channels)) {
  results[name] = await check();
}

if (jsonMode) {
  const simple: Record<string, string> = {};
  for (const [k, v] of Object.entries(results)) simple[k] = v.status;
  console.log(JSON.stringify(simple, null, 2));
} else {
  const tiers: Record<string, string[]> = {
    "Tier 0 (zero-config)": ["web", "github", "youtube", "bilibili", "rss"],
    "Tier 1 (free key/service)": ["twitter", "reddit", "exa"],
    "Tier 2 (needs setup)": ["xhs", "douyin", "linkedin", "bosszhipin"],
  };
  const icon: Record<Status, string> = {
    ok: "+",
    missing: "x",
    unconfigured: "?",
    error: "!",
  };

  for (const [tier, names] of Object.entries(tiers)) {
    console.error(`\n${tier}:`);
    for (const name of names) {
      const r = results[name];
      const mark = icon[r.status] ?? "?";
      const hint = r.hint ? ` — ${r.hint}` : "";
      console.error(`  [${mark}] ${name}: ${r.status}${hint}`);
    }
  }
}
