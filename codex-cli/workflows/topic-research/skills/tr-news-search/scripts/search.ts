import {
  loadConfig,
  requireTool,
  runCmd,
  birdArgs,
  proxyEnv,
  parseSearchArgs,
  fmtDate,
  filterJsonLines,
} from "./utils.ts";

const { positional, since, noFreshness } = parseSearchArgs(process.argv);
const [platform, query, countStr] = positional;
const count = parseInt(countStr || "10");

// Sanitize query for safe interpolation into mcporter call strings
const safeQuery = query?.replace(/"/g, '\\"') ?? "";

if (!platform || !query) {
  console.error(
    "Usage: bun search.ts <platform> <query> [count] [--since 24h] [--no-freshness]",
  );
  console.error(
    "Platforms: twitter|reddit|github|youtube|bilibili|xhs|douyin|exa|web|rss|linkedin|bosszhipin",
  );
  process.exit(1);
}

if (!noFreshness) {
  console.error(
    `[freshness] Filtering to results since ${fmtDate(since, "ymd")} (use --no-freshness for background research)`,
  );
}

const config = loadConfig();

switch (platform) {
  case "twitter": {
    requireTool("bird", "npm install -g @steipete/bird");
    if (!config.twitter_auth_token) {
      console.error(
        "ERROR: Twitter not configured. Run: bun config.ts parse-cookies '<cookie-string>'",
      );
      process.exit(2);
    }
    const q = noFreshness ? query : `${query} since:${fmtDate(since, "ymd")}`;
    const r = await runCmd(
      birdArgs(config, ["search", q, "-n", String(count), "--json"]),
      proxyEnv(config),
    );
    if (r.ok) console.log(r.stdout);
    else {
      console.error(r.stderr);
      process.exit(1);
    }
    break;
  }

  case "reddit": {
    const timeFilter = noFreshness ? "" : "&t=day&sort=new";
    const headers: Record<string, string> = { "User-Agent": "news-search/1.0" };
    const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&limit=${count}${timeFilter}`;
    try {
      const resp = await fetch(url, { headers });
      if (!resp.ok) {
        console.error(`ERROR: Reddit API returned ${resp.status}`);
        process.exit(1);
      }
      console.log(JSON.stringify(await resp.json()));
    } catch (e: any) {
      console.error(`ERROR: Reddit request failed — ${e.message}`);
      process.exit(1);
    }
    break;
  }

  case "github": {
    requireTool("gh", "brew install gh");
    const dateArgs = noFreshness
      ? ["--sort", "stars"]
      : ["--sort", "updated", "--updated", `>=${fmtDate(since, "ymd")}`];
    const r = await runCmd([
      "gh",
      "search",
      "repos",
      query,
      ...dateArgs,
      "--limit",
      String(count),
    ]);
    if (r.ok) console.log(r.stdout);
    else {
      console.error(r.stderr);
      process.exit(1);
    }
    break;
  }

  case "youtube": {
    requireTool("yt-dlp", "pip install yt-dlp");
    const r = await runCmd([
      "yt-dlp",
      "--dump-json",
      "--flat-playlist",
      `ytsearch${count}:${query}`,
    ]);
    if (r.ok) {
      console.log(
        noFreshness
          ? r.stdout
          : filterJsonLines(r.stdout, since, "upload_date"),
      );
    } else {
      console.error(r.stderr);
      process.exit(1);
    }
    break;
  }

  case "bilibili": {
    requireTool("yt-dlp", "pip install yt-dlp");
    const r = await runCmd([
      "yt-dlp",
      "--dump-json",
      "--flat-playlist",
      `bilisearch${count}:${query}`,
    ]);
    if (r.ok) {
      console.log(
        noFreshness
          ? r.stdout
          : filterJsonLines(r.stdout, since, "upload_date"),
      );
    } else {
      console.error(r.stderr);
      process.exit(1);
    }
    break;
  }

  case "xhs": {
    requireTool("mcporter", "npm install -g mcporter");
    const r = await runCmd([
      "mcporter",
      "call",
      `xiaohongshu.search_feeds(keyword: "${safeQuery}")`,
    ]);
    if (r.ok) {
      if (!noFreshness)
        console.error(
          "[freshness] XHS: no native date filter — manually verify recency",
        );
      console.log(r.stdout);
    } else {
      console.error(r.stderr);
      process.exit(1);
    }
    break;
  }

  case "douyin": {
    requireTool("mcporter", "npm install -g mcporter");
    const r = await runCmd([
      "mcporter",
      "call",
      `douyin.search_videos(keyword: "${safeQuery}", count: ${count})`,
    ]);
    if (r.ok) {
      if (!noFreshness)
        console.error(
          "[freshness] Douyin: no native date filter — manually verify recency",
        );
      console.log(r.stdout);
    } else {
      console.error(r.stderr);
      process.exit(1);
    }
    break;
  }

  case "exa":
  case "web": {
    requireTool("mcporter", "npm install -g mcporter");
    const dateParam = noFreshness
      ? ""
      : `, startPublishedDate: "${since.toISOString()}"`;
    const r = await runCmd([
      "mcporter",
      "call",
      `exa.web_search_exa(query: "${safeQuery}", numResults: ${count}${dateParam})`,
    ]);
    if (r.ok) console.log(r.stdout);
    else {
      console.error(r.stderr);
      process.exit(1);
    }
    break;
  }

  case "linkedin": {
    requireTool("mcporter", "npm install -g mcporter");
    const r = await runCmd([
      "mcporter",
      "call",
      `linkedin.search_people(query: "${safeQuery}")`,
    ]);
    if (r.ok) console.log(r.stdout);
    else {
      console.error(`WARN: LinkedIn MCP failed, trying Jina Reader fallback`);
      const resp = await fetch(
        `https://r.jina.ai/https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(query)}`,
        {
          headers: { Accept: "text/markdown" },
        },
      );
      console.log(await resp.text());
    }
    break;
  }

  case "bosszhipin": {
    requireTool("mcporter", "npm install -g mcporter");
    const r = await runCmd([
      "mcporter",
      "call",
      `bosszp.search_jobs(query: "${safeQuery}")`,
    ]);
    if (r.ok) console.log(r.stdout);
    else {
      console.error(`WARN: Boss MCP failed, trying Jina Reader fallback`);
      const resp = await fetch(
        `https://r.jina.ai/https://www.zhipin.com/web/geek/job?query=${encodeURIComponent(query)}`,
        {
          headers: { Accept: "text/markdown" },
        },
      );
      console.log(await resp.text());
    }
    break;
  }

  case "rss": {
    const feedUrl = query;
    const sinceTs = Math.floor(since.getTime() / 1000);
    const filterExpr = noFreshness
      ? `f.entries[:${count}]`
      : `[e for e in f.entries if not e.get("published_parsed") or calendar.timegm(e.published_parsed)>=${sinceTs}][:${count}]`;
    const imports = noFreshness
      ? "import feedparser,json"
      : "import feedparser,json,calendar";
    const r = await runCmd([
      "python3",
      "-c",
      `${imports};import sys;f=feedparser.parse(sys.argv[1]);print(json.dumps([{"title":e.get("title",""),"link":e.get("link",""),"published":e.get("published","")} for e in ${filterExpr}]))`,
      feedUrl,
    ]);
    if (r.ok) console.log(r.stdout);
    else {
      console.error(r.stderr);
      process.exit(1);
    }
    break;
  }

  default:
    console.error(`ERROR: Unknown platform '${platform}'.`);
    console.error(
      "Supported: twitter|reddit|github|youtube|bilibili|xhs|douyin|exa|web|rss|linkedin|bosszhipin",
    );
    process.exit(1);
}
