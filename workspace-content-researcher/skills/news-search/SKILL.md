---
name: news-search
description: >
  Searches and reads content across 12+ platforms (Twitter/X, Reddit, YouTube,
  Bilibili, GitHub, LinkedIn, XiaoHongShu, Douyin, Boss直聘, RSS, Web) using
  upstream CLI tools. Use for multi-platform data collection, news gathering,
  and content research. Never for platform setup or configuration — use
  news-search-setup instead. Never for writing or publishing content.
user-invocable: true
metadata:
  openclaw:
    emoji: "📰"
    requires:
      bins: ["bun"]
    os: ["darwin", "linux"]
---

# News Search

Search and read content across 12+ platforms via upstream CLI tools (bird, yt-dlp, mcporter, gh, curl).

**Runtime**: [Bun](https://bun.sh) — install via `curl -fsSL https://bun.sh/install | bash`

**Scripts are located at**: `news-search/scripts/` (relative to skills directory)

---

## Data Freshness Protocol (STRICT)

**All search results default to 24-hour freshness.** This is non-negotiable for report timeliness.

| Scenario                 | Freshness    | Command                                    |
| ------------------------ | ------------ | ------------------------------------------ |
| Primary data (default)   | Last 24h     | `bun search.ts twitter "AI" 20`            |
| Breaking news            | Custom       | `bun search.ts twitter "AI" 20 --since 2h` |
| Background research only | Unrestricted | `bun search.ts web "paper" --no-freshness` |

**Rules**:

1. **Always use default (24h)** for primary data collection — this is automatic
2. **`--no-freshness` is ONLY for** following up on references found in fresh results
3. **Label older data** as `[Background]` or `[Reference]` — never present as current findings

See `references/freshness-protocol.md` for per-platform filtering details and decision tree.

---

## Workflow

### Step 1: Environment Gate

Run: `bun news-search/scripts/doctor.ts --json`

Parse the JSON output and decide:

- **All channels missing** → STOP. Tell user: "No search tools found. Run `/topic-research:news-search-setup` to install." Load `news-search-setup` skill.
- **Some channels missing** → Warn which platforms are unavailable. Suggest: "Run `/topic-research:news-search-setup` to enable more channels." Continue with available channels.
- **All OK** → Proceed.

### Step 2: Dispatch

Determine action based on user input:

**If URL provided** → Read mode:

1. Run `bun news-search/scripts/read.ts <url>`
2. If exit code 127 → tool not installed → suggest setup
3. If exit code 0 → output content

**If query provided** → Search mode:

1. If specific platform requested → `bun news-search/scripts/search.ts <platform> <query> [count]`
   - Exit 127 → tool missing → tell user install command
   - Exit 2 → unconfigured → tell user config steps
2. If no platform specified → search all available platforms in parallel (skip unavailable)

### Step 3: Collect and Merge

Gather results from all dispatched searches. Deduplicate by URL where possible.

### Step 4: Format Output

Use template from `news-search/assets/search-template.md` to format results.

---

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

---

## Configuration

Config stored at `~/.config/news-search/config.json`.

```bash
bun news-search/scripts/config.ts list                              # show all
bun news-search/scripts/config.ts set reddit_proxy "http://..."     # set proxy
bun news-search/scripts/config.ts parse-cookies '<cookie-string>'   # import Twitter cookies
```

---

## Quick Examples

```bash
# Search Twitter for today's AI news (24h freshness is automatic)
bun news-search/scripts/search.ts twitter "AI agents" 20

# Breaking news — last 2 hours only
bun news-search/scripts/search.ts twitter "Claude" 20 --since 2h

# Background research on a reference found in fresh results (no date limit)
bun news-search/scripts/search.ts web "transformer architecture paper" --no-freshness

# Read a specific URL
bun news-search/scripts/read.ts "https://x.com/user/status/123"

# Check what's available
bun news-search/scripts/doctor.ts --json
```
