import { loadConfig, requireTool, runCmd, birdArgs, proxyEnv } from "./utils.ts";

const url = Bun.argv[2];
if (!url) {
  console.error("Usage: bun read.ts <url>");
  process.exit(1);
}

const config = loadConfig();

if (/x\.com|twitter\.com/.test(url)) {
  requireTool("bird", "npm install -g @steipete/bird");
  const r = await runCmd(birdArgs(config, ["read", url, "--json"]), proxyEnv(config));
  if (r.ok) console.log(r.stdout);
  else {
    console.error(r.stderr);
    process.exit(1);
  }
} else if (/youtube\.com|youtu\.be/.test(url)) {
  requireTool("yt-dlp", "pip install yt-dlp");
  const r = await runCmd(["yt-dlp", "--dump-json", url]);
  if (r.ok) console.log(r.stdout);
  else {
    console.error(r.stderr);
    process.exit(1);
  }
} else if (url.includes("bilibili.com")) {
  requireTool("yt-dlp", "pip install yt-dlp");
  const r = await runCmd(["yt-dlp", "--dump-json", url]);
  if (r.ok) console.log(r.stdout);
  else {
    console.error(r.stderr);
    process.exit(1);
  }
} else if (url.includes("reddit.com")) {
  const jsonUrl = url.endsWith(".json") ? url : `${url}.json`;
  try {
    const resp = await fetch(jsonUrl, { headers: { "User-Agent": "news-search/1.0" } });
    if (!resp.ok) {
      console.error(`ERROR: Reddit returned ${resp.status}`);
      process.exit(1);
    }
    console.log(JSON.stringify(await resp.json()));
  } catch (e: any) {
    console.error(`ERROR: ${e.message}`);
    process.exit(1);
  }
} else if (url.includes("github.com")) {
  requireTool("gh", "brew install gh");
  const slug = url.replace(/.*github\.com\//, "").replace(/\/$/, "");
  const r = await runCmd(["gh", "repo", "view", slug]);
  if (r.ok) console.log(r.stdout);
  else {
    console.error(r.stderr);
    process.exit(1);
  }
} else if (url.includes("xiaohongshu.com")) {
  requireTool("mcporter", "npm install -g mcporter");
  const r = await runCmd(["mcporter", "call", `xiaohongshu.get_note_detail(url: "${url}")`]);
  if (r.ok) console.log(r.stdout);
  else {
    console.error("WARN: XHS MCP failed, trying Jina Reader fallback");
    const resp = await fetch(`https://r.jina.ai/${url}`, { headers: { Accept: "text/markdown" } });
    console.log(await resp.text());
  }
} else {
  const resp = await fetch(`https://r.jina.ai/${url}`, { headers: { Accept: "text/markdown" } });
  if (!resp.ok) {
    console.error(`ERROR: Jina Reader returned ${resp.status}`);
    process.exit(1);
  }
  console.log(await resp.text());
}
