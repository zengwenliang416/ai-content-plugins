---
name: tr-news-search
description: "Search and read content across 12+ platforms (Twitter/X, Reddit, YouTube, Bilibili, GitHub, LinkedIn, XiaoHongShu, Douyin, RSS, Web) using upstream CLI tools"
arguments:
  - name: input
    description: "Search query, URL to read, upstream .openspec.json, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE any other interaction and BEFORE asking the user for a query. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `inputs.query`, then `inputs.url`, then `inputs.topic`.
   - If argument is a query or URL, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/daily-brief/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/trend-preview/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `inputs.query`, `inputs.url`, and `inputs.topic`.

3. **Auto-scan legacy search outputs**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/news-search/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下历史检索结果，是否复用或继续新检索？" with files as options.

4. **No upstream found**: Only in this case, ask the user for query, URL, and preferred platforms.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Execute News Search

Search and read content across 12+ platforms via upstream CLI tools (bird, yt-dlp, mcporter, gh, curl).

**Scripts are located at**: `news-search/scripts/` (relative to skills directory)

### Runtime Prerequisite

Scripts require a TypeScript runtime. Detect and set `TS_RUNNER` before any command:

```bash
if command -v bun &>/dev/null; then
  TS_RUNNER="bun"
elif command -v npx &>/dev/null; then
  TS_RUNNER="npx tsx"
else
  echo "ERROR: No TypeScript runtime found."
  echo "Install bun (recommended): curl -fsSL https://bun.sh/install | bash"
  echo "Or install Node.js >=18: https://nodejs.org/"
  exit 1
fi
```

> **If neither runtime is available**: STOP execution and instruct the user to install bun.
> Do NOT silently skip news-search or fall back to MCP-only data sources.

### Data Freshness Protocol (STRICT)

**All search results default to 24-hour freshness.** This is non-negotiable for report timeliness.

| Scenario                 | Freshness    | Command                                             |
| ------------------------ | ------------ | --------------------------------------------------- |
| Primary data (default)   | Last 24h     | `${TS_RUNNER} search.ts twitter "AI" 20`            |
| Breaking news            | Custom       | `${TS_RUNNER} search.ts twitter "AI" 20 --since 2h` |
| Background research only | Unrestricted | `${TS_RUNNER} search.ts web "paper" --no-freshness` |

**Rules**:

1. **Always use default (24h)** for primary data collection — this is automatic
2. **`--no-freshness` is ONLY for** following up on references found in fresh results
3. **Label older data** as `[Background]` or `[Reference]` — never present as current findings

See `references/freshness-protocol.md` for per-platform filtering details and decision tree.

### Step 2.1: Environment Gate

Run: `${TS_RUNNER} news-search/scripts/doctor.ts --json`

Parse the JSON output and decide:

- **All channels missing** -> STOP. Tell user: "No search tools found. Run `tr-news-search-setup` to install."
- **Some channels missing** -> Warn which platforms are unavailable. Suggest: "Run `tr-news-search-setup` to enable more channels." Continue with available channels.
- **All OK** -> Proceed.

### Step 2.2: Dispatch

Determine action based on user input:

**If URL provided** -> Read mode:

1. Run `${TS_RUNNER} news-search/scripts/read.ts <url>`
2. If exit code 127 -> tool not installed -> suggest setup
3. If exit code 0 -> output content

**If query provided** -> Search mode:

1. If specific platform requested -> `${TS_RUNNER} news-search/scripts/search.ts <platform> <query> [count]`
   - Exit 127 -> tool missing -> tell user install command
   - Exit 2 -> unconfigured -> tell user config steps
2. If no platform specified -> search all available platforms in parallel (skip unavailable)

### Step 2.3: Collect and Merge

Gather results from all dispatched searches. Deduplicate by URL where possible.

### Step 2.4: Format Output

Use template from `news-search/assets/search-template.md` to format results.

## Platform Reference

| Platform    | Tool        | Tier | Search                     | Read                   | Reference                    |
| ----------- | ----------- | ---- | -------------------------- | ---------------------- | ---------------------------- |
| Twitter/X   | bird        | 1    | `search.ts twitter <q>`    | `read.ts <tweet-url>`  | `references/twitter.md`      |
| YouTube     | yt-dlp      | 0    | `search.ts youtube <q>`    | `read.ts <yt-url>`     | `references/video.md`        |
| Bilibili    | yt-dlp      | 0    | `search.ts bilibili <q>`   | `read.ts <bili-url>`   | `references/video.md`        |
| GitHub      | gh          | 0    | `search.ts github <q>`     | `read.ts <gh-url>`     | `references/professional.md` |
| Reddit      | fetch       | 1    | `search.ts reddit <q>`     | `read.ts <reddit-url>` | `references/social.md`       |
| Exa         | mcporter    | 1    | `search.ts exa <q>`        | —                      | `references/web-rss.md`      |
| XiaoHongShu | mcporter    | 2    | `search.ts xhs <q>`        | `read.ts <xhs-url>`    | `references/social.md`       |
| Douyin      | mcporter    | 2    | `search.ts douyin <q>`     | —                      | `references/social.md`       |
| LinkedIn    | mcporter    | 2    | `search.ts linkedin <q>`   | `read.ts <li-url>`     | `references/professional.md` |
| Boss直聘    | mcporter    | 2    | `search.ts bosszhipin <q>` | —                      | `references/professional.md` |
| Web (any)   | Jina Reader | 0    | `search.ts web <q>`        | `read.ts <url>`        | `references/web-rss.md`      |
| RSS         | feedparser  | 0    | `search.ts rss <feed-url>` | —                      | `references/web-rss.md`      |

**Tier legend**: 0 = zero-config, 1 = free key/service, 2 = needs Docker/setup

## Configuration

Config stored at `~/.config/news-search/config.json`.

```bash
${TS_RUNNER} news-search/scripts/config.ts list                              # show all
${TS_RUNNER} news-search/scripts/config.ts set reddit_proxy "http://..."     # set proxy
${TS_RUNNER} news-search/scripts/config.ts parse-cookies '<cookie-string>'   # import Twitter cookies
```

## Quick Examples

```bash
# Search Twitter for today's AI news (24h freshness is automatic)
${TS_RUNNER} news-search/scripts/search.ts twitter "AI agents" 20

# Breaking news — last 2 hours only
${TS_RUNNER} news-search/scripts/search.ts twitter "Claude" 20 --since 2h

# Background research on a reference found in fresh results (no date limit)
${TS_RUNNER} news-search/scripts/search.ts web "transformer architecture paper" --no-freshness

# Read a specific URL
${TS_RUNNER} news-search/scripts/read.ts "https://x.com/user/status/123"

# Check what's available
${TS_RUNNER} news-search/scripts/doctor.ts --json
```

## Artifact Handoff

**Output**: Search result saved to `openspec/runtime/news-search/YYYY-MM-DD-<query-slug>.md`

**OpenSpec contract (MANDATORY)**:

- Create or update `openspec/runtime/news-search/YYYY-MM-DD-<query-slug>.openspec.json`.
- Minimum fields:
  - `pipeline`: `news-search->brainstorm`
  - `stage`: `news-search`
  - `outputs.news_search_md`: search result path
  - `next.command`: `tr-brainstorm`
  - `next.input`: search result path or contract path

**Next step**: Suggest running `tr-brainstorm` to convert findings into candidate topics.
