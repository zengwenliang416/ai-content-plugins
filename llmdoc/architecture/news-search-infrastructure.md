# news-search Infrastructure

The `news-search` skill is the shared data-gathering layer across all three agents. It provides unified search and read access to 12+ platforms through a TypeScript CLI built on Bun.

## Architecture

```
workspace-content-researcher/skills/news-search/   (canonical source)
    |
    +-- symlink --> workspace-content-writer/skills/news-search
    +-- symlink --> workspace-content-operator/skills/news-search
```

The researcher owns the canonical copy; writer and operator consume it via relative symlinks (`../../workspace-content-researcher/skills/news-search`) created by `install.sh`. Stale symlinks are removed and recreated on each install run.

## Platform Support

| Platform    | Tool        | Tier | Search | Read |
| ----------- | ----------- | ---- | ------ | ---- |
| Twitter/X   | bird        | 1    | yes    | yes  |
| YouTube     | yt-dlp      | 0    | yes    | yes  |
| Bilibili    | yt-dlp      | 0    | yes    | yes  |
| GitHub      | gh          | 0    | yes    | yes  |
| Reddit      | fetch       | 1    | yes    | yes  |
| Exa         | mcporter    | 1    | yes    | --   |
| XiaoHongShu | mcporter    | 2    | yes    | yes  |
| Douyin      | mcporter    | 2    | yes    | --   |
| LinkedIn    | mcporter    | 2    | yes    | yes  |
| Boss直聘    | mcporter    | 2    | yes    | --   |
| Web (any)   | Jina Reader | 0    | yes    | yes  |
| RSS         | feedparser  | 0    | yes    | --   |

**Tier legend**: 0 = zero-config, 1 = free API key or service account, 2 = requires Docker or extended setup.

## CLI Interface

Five TypeScript scripts under `news-search/scripts/`:

| Script      | Purpose                                                                                             |
| ----------- | --------------------------------------------------------------------------------------------------- |
| `search.ts` | Search a platform: `bun search.ts <platform> <query> [count] [--since <duration>] [--no-freshness]` |
| `read.ts`   | Read a URL: `bun read.ts <url>`                                                                     |
| `doctor.ts` | Health check: `bun doctor.ts --json` -- reports installed tools and available platforms             |
| `config.ts` | Manage config: `list`, `set`, `parse-cookies` -- stored at `~/.config/news-search/config.json`      |
| `utils.ts`  | Internal shared utilities (not user-facing)                                                         |

`doctor.ts` is the environment gate -- every skill that depends on news-search runs it first to determine available platforms and degrade gracefully when tools are missing.

## Data Freshness Protocol

All search results default to **24-hour freshness**. This is enforced automatically.

| Scenario            | Freshness    | Flag             |
| ------------------- | ------------ | ---------------- |
| Primary data        | Last 24h     | (default)        |
| Breaking news       | Custom       | `--since 2h`     |
| Background research | Unrestricted | `--no-freshness` |

Rules:

1. Default 24h applies to all primary data collection -- non-negotiable.
2. `--no-freshness` is only for following up on references found in fresh results.
3. Older data must be labeled `[Background]` or `[Reference]`.

Per-platform filtering details are in `references/freshness-protocol.md`.

## MCP and External Tool Integration

The researcher agent declares three MCP servers that complement news-search CLI:

| MCP Server    | Purpose                        | Priority |
| ------------- | ------------------------------ | -------- |
| `hacker-news` | HN stories, comments, profiles | 1        |
| `arxiv`       | Paper search and full-text     | 1        |
| `rss-reader`  | RSS feed aggregation           | 2        |

MCP sources are prioritized over CLI platforms for reliable data (HN, arXiv). CLI platforms cover social and professional networks that MCPs cannot reach.

Platforms backed by `mcporter` (Exa, XiaoHongShu, Douyin, LinkedIn, Boss直聘) use the config at `config/mcporter.json`, which currently registers the Exa MCP server at `https://mcp.exa.ai/mcp`.

## Reference Files

Platform-specific guides live in `news-search/references/`:

| File                    | Covers                                   |
| ----------------------- | ---------------------------------------- |
| `twitter.md`            | Twitter/X via bird                       |
| `video.md`              | YouTube and Bilibili via yt-dlp          |
| `social.md`             | Reddit, XiaoHongShu, Douyin              |
| `professional.md`       | GitHub, LinkedIn, Boss直聘               |
| `web-rss.md`            | Web (Jina Reader), RSS, Exa              |
| `freshness-protocol.md` | Per-platform freshness filtering details |
