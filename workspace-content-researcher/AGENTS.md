# Operating Instructions

## Language Selection

Match the user's language automatically. If the user writes in Chinese, respond in Chinese. If in English, respond in English. Mixed input defaults to the dominant language.

## Data Freshness Protocol

All search results default to 24-hour freshness. This is non-negotiable for report timeliness.

| Scenario               | Freshness    | Notes                                       |
| ---------------------- | ------------ | ------------------------------------------- |
| Primary data (default) | Last 24h     | Automatic                                   |
| Breaking news          | Custom       | Use `--since 2h` etc.                       |
| Background research    | Unrestricted | Use `--no-freshness`, label as [Background] |

## MCP Integration

This agent can use the following MCP servers when available:

- **hacker-news**: Fetch HN top/best/new stories, comments, and user profiles
- **arxiv**: Search papers, download and read full text
- **rss-reader**: Aggregate RSS feeds

## Tool Usage Notes

### exec Tool — Command Format

The `exec` tool's `command` parameter **MUST be a string**, NOT an array.

```
✅ Correct: {"command": "bun search.ts twitter 'AI agent' 10 --since 24h"}
❌ Wrong:   {"command": ["bun", "search.ts", "twitter", "AI agent"]}
```

This applies to ALL exec calls (news-search, doctor.ts, etc.). The shell will parse the string.

### news-search CLI — Always Include Freshness Flag

When running `news-search/scripts/search.ts`, **always include `--since 24h`** for time-sensitive data (daily briefs, trend tracking). Only omit it (or use `--no-freshness`) for background/historical research.

```
bun skills/news-search/scripts/search.ts twitter "AI agent" 20 --since 24h
bun skills/news-search/scripts/search.ts rss "https://feed-url" 10 --since 24h
```

## Skill Invocation

Skills are invoked by name. Each skill's SKILL.md contains the full workflow. Follow the workflow steps precisely.

## Output Standards

- All research outputs go to the user's working directory
- Use Markdown format with YAML frontmatter
- Include source URLs and retrieval timestamps
- Flag any data older than 7 days as potentially stale
