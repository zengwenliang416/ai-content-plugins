# AI Content Agents

English | [中文](./README.zh-CN.md)

Three OpenClaw agents for AI content creators. Covers the full content lifecycle: research, writing, visual generation, publishing, and growth operations.

## Agents

| Agent                                                | Skills | Description                                                                     |
| ---------------------------------------------------- | ------ | ------------------------------------------------------------------------------- |
| [content-researcher](./workspace-content-researcher) | 18     | Multi-platform news search, deep research, trend analysis, content benchmarking |
| [content-writer](./workspace-content-writer)         | 16     | Long-form articles, short posts, visual content, slide decks, infographics      |
| [content-operator](./workspace-content-operator)     | 22     | Growth planning, audience management, publishing, content utilities             |

## Getting Started

### Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) with OpenClaw support
- [Bun](https://bun.sh) runtime (`curl -fsSL https://bun.sh/install | bash`)

### Install

```bash
git clone https://github.com/user/ai-content-agents.git
cd ai-content-agents
./install.sh
```

The installer sets up shared skill symlinks (news-search) and installs npm dependencies. Point Claude Code or OpenClaw to any `workspace-*` directory to activate an agent.

### MCP Servers (Optional)

Some skills integrate with free MCP servers:

| MCP Server                                                        | Used By            | What It Does                            |
| ----------------------------------------------------------------- | ------------------ | --------------------------------------- |
| [mcp-hacker-news](https://github.com/paabloLC/mcp-hacker-news)    | content-researcher | Fetch Hacker News posts and discussions |
| [arxiv-mcp-server](https://github.com/blazickjp/arxiv-mcp-server) | content-researcher | Search and read arXiv papers            |
| [rss-reader-mcp](https://github.com/kwp-lab/rss-reader-mcp)       | content-researcher | Aggregate RSS feeds                     |

## Article Production Pipeline

```
Research ─── Planning ─── Writing ─── QA ─── Visuals ─── Formatting ─── Publishing
```

### Stage 1: Research (content-researcher)

```
/daily-brief                          # Daily AI news briefing
/deep-research "LLM Agents"          # 5-task deep research pipeline
/field-overview "RAG"                 # Field overview (3000-5000 words)
```

### Stage 2: Planning (content-researcher + content-operator)

```
/brainstorm                           # Generate 20+ topics, score top 10
/screen-topic "AI Agents"            # Quick potential check
/audience                            # Define target audience segments
/content-plan                        # Build editorial calendar
```

### Stage 3: Writing (content-writer)

```
/long-article                        # Write long-form article
/short-post                          # Short post / thread
```

### Stage 4: Quality Check (content-researcher)

```
/debug-draft                         # Diagnose structure/clarity issues
/check-quality                       # 5-dimension quality audit
```

### Stage 5: Visual Enhancement (content-writer)

```
/cover-image article.md              # Cover image (9 palettes x 6 styles)
/article-illustrator article.md      # Auto-detect illustration spots
/infographic article.md              # Infographic (21 layouts x 17 styles)
/xhs-images article.md              # Xiaohongshu card series
```

### Stage 6: Formatting & Publishing (content-operator)

```
/format-markdown                     # Normalize Markdown structure
/markdown-to-html                    # Convert to WeChat-compatible HTML
/post-to-wechat                      # Publish to WeChat Official Account
/post-to-x                          # Publish to X / Twitter
```

## All Skills

### content-researcher (18 skills)

| Skill                 | Description                                  |
| --------------------- | -------------------------------------------- |
| `news-search`         | Multi-platform search across 12+ platforms   |
| `news-search-setup`   | Platform tool installation and configuration |
| `daily-brief`         | Daily AI news briefing                       |
| `deep-research`       | 5-task deep research pipeline                |
| `field-overview`      | AI sub-field overview                        |
| `trend-preview`       | Upcoming trend preview                       |
| `release-analysis`    | New AI release analysis                      |
| `research-updater`    | Update existing research                     |
| `narrative-tracker`   | Content narrative tracking                   |
| `event-calendar`      | AI event calendar                            |
| `topic-brainstorm`    | Topic brainstorming and screening            |
| `competitor-analysis` | Competitor content strategy analysis         |
| `content-benchmark`   | Content performance benchmarking             |
| `quality-check`       | Article quality audit                        |
| `trend-analysis`      | Data trend analysis                          |
| `draft-debugger`      | Draft structure diagnosis                    |
| `template-creator`    | Reusable template creation                   |
| `skill-creator`       | Skill authoring guide                        |

### content-writer (16 skills)

| Skill                 | Description                          |
| --------------------- | ------------------------------------ |
| `article-builder`     | Long-form article writing            |
| `short-post`          | Social media posts and threads       |
| `infographic`         | Visual summary cards                 |
| `presentation`        | Slide deck creation                  |
| `audience-targeting`  | Target audience definition           |
| `content-experiment`  | Content A/B testing                  |
| `content-tracker`     | Content pipeline tracking            |
| `collab-letter`       | Collaboration outreach               |
| `asset-pack`          | Content asset bundling               |
| `ai-image-gen`        | AI image generation (multi-provider) |
| `article-illustrator` | Article illustration generation      |
| `cover-generator`     | Cover image generation               |
| `infographic-gen`     | Professional infographic generation  |
| `knowledge-comic`     | Knowledge comic creation             |
| `slide-generator`     | Slide deck image generation          |
| `xhs-card`            | Xiaohongshu card series              |

### content-operator (22 skills)

| Skill                  | Description                        |
| ---------------------- | ---------------------------------- |
| `growth-plan`          | Growth strategy planning           |
| `performance-analysis` | Content performance analysis       |
| `topic-screening`      | Topic potential screening          |
| `source-discovery`     | Content source discovery           |
| `review-checklist`     | Pre-publish checklist              |
| `strategy-memo`        | Strategy memo writing              |
| `account-monitor`      | Account portfolio monitoring       |
| `collab-prep`          | Collaboration meeting prep         |
| `content-roi`          | Content ROI calculation            |
| `audience-review`      | Audience demographics analysis     |
| `content-plan`         | Editorial calendar planning        |
| `ops-report`           | Operations report generation       |
| `content-rebalance`    | Content mix rebalancing            |
| `content-cleanup`      | Underperforming content cleanup    |
| `biz-proposal`         | Business proposal drafting         |
| `x-publisher`          | X/Twitter publishing               |
| `wechat-publisher`     | WeChat Official Account publishing |
| `web-clipper`          | Web page to Markdown               |
| `tweet-clipper`        | Tweet to Markdown                  |
| `md-to-html`           | Markdown to HTML conversion        |
| `md-formatter`         | Markdown formatting                |
| `image-compressor`     | Image compression                  |

## Project Structure

```
ai-content-agents/
├── openclaw.json                     # Agent registration
├── install.sh                        # Installation script
├── workspace-content-researcher/
│   ├── AGENTS.md                     # Operating instructions
│   ├── SOUL.md                       # Personality definition
│   ├── IDENTITY.md                   # Agent identity
│   ├── USER.md                       # User preferences
│   ├── TOOLS.md                      # Tool inventory
│   ├── MEMORY.md                     # Persistent memory
│   ├── memory/                       # Memory storage
│   └── skills/                       # 18 skills
├── workspace-content-writer/
│   └── (same structure, 16 skills)
└── workspace-content-operator/
    └── (same structure, 22 skills)
```

## License

[Apache License 2.0](./LICENSE)
