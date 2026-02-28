# news-search Guide

How to use `news-search` for multi-platform data collection across all three agents.

## Quick Start

```bash
# Check available platforms
bun news-search/scripts/doctor.ts --json

# Search Twitter for AI news (24h freshness is automatic)
bun news-search/scripts/search.ts twitter "AI agents" 20

# Read a specific URL
bun news-search/scripts/read.ts "https://x.com/user/status/123"
```

## Setting Up Tools

Run `doctor.ts --json` to see what is installed. If platforms are missing:

1. **Tier 0 (zero-config)**: YouTube, Bilibili, GitHub, Web, RSS -- work out of the box.
2. **Tier 1 (free key)**: Twitter/X needs `bird` with cookies. Reddit needs a proxy. Exa needs an API key.
3. **Tier 2 (Docker/setup)**: XiaoHongShu, Douyin, LinkedIn, Boss直聘 need `mcporter` with Docker.

For detailed setup, invoke the `news-search-setup` skill.

## Data Freshness

All searches default to 24-hour freshness. Override only when needed:

```bash
# Breaking news -- last 2 hours
bun news-search/scripts/search.ts twitter "Claude" 20 --since 2h

# Background research on a reference (no date limit)
bun news-search/scripts/search.ts web "transformer paper" --no-freshness
```

Label older data as `[Background]` or `[Reference]` -- never present it as current findings.

## Configuration

User config stored at `~/.config/news-search/config.json`:

```bash
bun news-search/scripts/config.ts list                            # show all settings
bun news-search/scripts/config.ts set reddit_proxy "http://..."   # set a proxy
bun news-search/scripts/config.ts parse-cookies '<cookie-string>' # import Twitter cookies
```

## Integration with Other Skills

`news-search` is the data layer for many skills across all three agents:

| Agent      | Consuming skills                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Researcher | `daily-brief`, `deep-research`, `topic-brainstorm`, `trend-preview`, `competitor-analysis`, `release-analysis`, `narrative-tracker`, `research-updater` |
| Writer     | `article-builder`                                                                                                                                       |
| Operator   | `source-discovery`, `collab-prep`, `biz-proposal`, `strategy-memo`, `content-plan`, `topic-screening`                                                   |

The researcher also has MCP servers (`hacker-news`, `arxiv`, `rss-reader`) as complementary data sources. `daily-brief` prioritizes MCPs over CLI platforms for the sources they cover.

## Troubleshooting

| Problem               | Solution                                                        |
| --------------------- | --------------------------------------------------------------- |
| Exit code 127         | Tool not installed -- run `doctor.ts` to identify which         |
| Exit code 2           | Tool installed but not configured -- check config               |
| All channels missing  | Run `news-search-setup` skill for guided installation           |
| Stale data in results | Check `references/freshness-protocol.md` for per-platform rules |
