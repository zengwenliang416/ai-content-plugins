# AI Content Plugins

English | [中文](./README.zh-CN.md)

A marketplace of Claude Cowork plugins for AI content account operators. Covers the full content lifecycle: topic research, content production, visual generation, publishing, competitor analysis, growth operations, and audience management.

## Plugins

| Plugin | Description |
|--------|-------------|
| [content-analysis](./content-analysis) | Competitor analysis, content benchmarking, quality checks, trend analysis, and template creation |
| [topic-research](./topic-research) | Deep research pipelines, daily AI briefings, trend previews, field overviews, and event tracking |
| [content-production](./content-production) | Long articles, short posts, infographics, audience targeting, content tracking, and collaboration |
| [visual-content](./visual-content) | Article illustrations, knowledge comics, cover images, infographics, slide decks, and Xiaohongshu cards |
| [publishing](./publishing) | WeChat Official Account and X/Twitter publishing automation |
| [content-utilities](./content-utilities) | Image compression, Markdown formatting, HTML conversion, web/tweet clipping |
| [growth-ops](./growth-ops) | Source discovery, review checklists, topic screening, account monitoring, and growth planning |
| [audience-management](./audience-management) | Operations reports, audience reviews, content planning, business proposals, and content optimization |

## Getting Started

### Prerequisites

- [Claude Desktop](https://claude.ai/download) or [Claude Code](https://docs.anthropic.com/en/docs/claude-code) with Cowork plugin support
- Node.js 18+ (for MCP servers)
- Python 3.10+ with `uvx` (optional, for arXiv MCP)

### Install a Plugin

Point Claude to a plugin directory. Each plugin activates automatically -- skills fire when their trigger conditions match, and slash commands become available in your session.

### MCP Servers (Optional)

Some plugins integrate with free, open-source MCP servers for external data:

| MCP Server | Used By | What It Does | Install |
|------------|---------|--------------|---------|
| [mcp-hacker-news](https://github.com/paabloLC/mcp-hacker-news) | topic-research, growth-ops | Fetch Hacker News posts and discussions | `npx -y mcp-hacker-news` |
| [arxiv-mcp-server](https://github.com/blazickjp/arxiv-mcp-server) | topic-research | Search and read arXiv papers | `uvx arxiv-mcp-server` |
| [rss-reader-mcp](https://github.com/kwp-lab/rss-reader-mcp) | topic-research, growth-ops | Aggregate RSS feeds and extract articles | `npx -y @kwp-lab/rss-reader-mcp` |

MCP configs are in each plugin's `.mcp.json`. All MCP servers are free and require no API keys.

## Article Production Pipeline

The full end-to-end workflow for producing and publishing an article:

```
Research ─── Planning ─── Writing ─── QA ─── Visuals ─── Formatting ─── Publishing
```

### Stage 1: Research

Gather raw material and build domain understanding.

```
/topic-research:daily-brief                 # Daily AI news briefing
/topic-research:deep-research "LLM Agents"  # 5-task deep research pipeline
/content-utilities:url-to-markdown          # Clip web pages as Markdown
/content-utilities:x-to-markdown            # Clip tweets as Markdown
/topic-research:field-overview "RAG"        # Field overview (3000-5000 words)
```

### Stage 2: Planning

Select a topic and define the content angle.

```
/topic-research:brainstorm                  # Generate 20+ topics, score top 10
/growth-ops:screen-topic "AI Agents"        # Quick potential check
/content-production:audience                # Define target audience segments
/audience-management:content-plan           # Build editorial calendar
```

### Stage 3: Writing

Draft the article.

```
/content-production:long-article            # Write long-form article
/content-production:short-post              # Or: short post / thread
```

### Stage 4: Quality Check

Review and refine before visual production.

```
/content-analysis:debug-draft               # Diagnose structure/clarity issues
/content-analysis:check-quality             # 5-dimension quality audit
/growth-ops:review-checklist                # Pre-publish checklist
```

### Stage 5: Visual Enhancement

Generate cover, illustrations, and infographics.

```
/visual-content:cover-image article.md      # Cover image (9 palettes × 6 rendering styles)
/visual-content:article-illustrator article.md  # Auto-detect illustration spots
/visual-content:infographic article.md      # Infographic (21 layouts × 17 styles)
/visual-content:xhs-images article.md       # Xiaohongshu card series
/content-utilities:compress-image           # Compress images for web
```

### Stage 6: Formatting & Publishing

Convert to platform format and publish.

```
/content-utilities:format-markdown          # Normalize Markdown structure
/content-utilities:markdown-to-html         # Convert to WeChat-compatible HTML
/publishing:post-to-wechat                  # Publish to WeChat Official Account
/publishing:post-to-x                       # Publish to X / Twitter
```

### Quick Path (Minimum Viable Pipeline)

For a single WeChat article, the shortest path:

```
/topic-research:deep-research "topic"       # Research
/content-production:long-article            # Write
/content-analysis:check-quality             # QA
/visual-content:cover-image article.md      # Cover
/content-utilities:markdown-to-html         # Format
/publishing:post-to-wechat                  # Publish
```

## Usage

### Typical Daily Workflow

```
/topic-research:daily-brief              # Morning: get today's AI news briefing
/topic-research:brainstorm               # Pick a topic from the briefing
/topic-research:deep-research "LLM Agents"  # Deep research (5-task pipeline)
/content-production:long-article         # Write the article
/visual-content:cover-image article.md   # Generate cover image
/content-utilities:markdown-to-html      # Convert to WeChat HTML
/content-analysis:check-quality          # Quality check before publishing
/publishing:post-to-wechat               # Publish to WeChat
```

### All Commands

**content-analysis** -- Analyze and benchmark content

| Command | Description |
|---------|-------------|
| `/content-analysis:competitor [account]` | Analyze a competitor's content strategy |
| `/content-analysis:benchmark [niche]` | Benchmark content against top performers |
| `/content-analysis:check-quality` | Check article quality (accuracy, readability, SEO) |
| `/content-analysis:trend-analysis [topic]` | Analyze data trends in an AI topic |
| `/content-analysis:template [type]` | Create a reusable content template |
| `/content-analysis:debug-draft` | Diagnose and fix issues in a draft |

**topic-research** -- Research topics and track trends

| Command | Description |
|---------|-------------|
| `/topic-research:deep-research [topic]` | 5-task deep research pipeline |
| `/topic-research:daily-brief` | Generate daily AI news briefing |
| `/topic-research:brainstorm [seed]` | Brainstorm and screen content topics |
| `/topic-research:field-overview [field]` | Overview of an AI sub-field |
| `/topic-research:trend-preview [topic]` | Preview upcoming trends |
| `/topic-research:events [period]` | Build AI event calendar |
| `/topic-research:narrative [theme]` | Track a content narrative |
| `/topic-research:release-analysis [name]` | Analyze a new AI release |
| `/topic-research:update-research [topic]` | Update existing research |

**content-production** -- Produce content

| Command | Description |
|---------|-------------|
| `/content-production:long-article [topic]` | Write a long-form article |
| `/content-production:short-post [topic]` | Draft a social media post or thread |
| `/content-production:infographic [topic]` | Create a visual summary card |
| `/content-production:audience [niche]` | Define target audience segments |
| `/content-production:content-tracker` | Track content pipeline and schedule |
| `/content-production:collab-letter [target]` | Draft a collaboration outreach message |
| `/content-production:ab-test [variable]` | Design a content A/B test |

**growth-ops** -- Grow and optimize

| Command | Description |
|---------|-------------|
| `/growth-ops:find-sources [topic]` | Discover content sources and references |
| `/growth-ops:screen-topic [topic]` | Quickly screen a topic for potential |
| `/growth-ops:review-checklist` | Run pre-publish review checklist |
| `/growth-ops:growth-plan [platform]` | Create a growth strategy |
| `/growth-ops:performance [period]` | Analyze content performance |
| `/growth-ops:content-roi [piece]` | Calculate content ROI |
| `/growth-ops:strategy-memo [topic]` | Write a strategy memo |
| `/growth-ops:account-portfolio` | Monitor your content accounts |
| `/growth-ops:collab-prep [name]` | Prepare for a collaboration meeting |

**visual-content** -- Generate visual assets

| Command | Description |
|---------|-------------|
| `/visual-content:article-illustrator [article]` | Auto-detect illustration spots and generate images |
| `/visual-content:comic [topic]` | Create a knowledge comic strip |
| `/visual-content:cover-image [article]` | Generate article cover image |
| `/visual-content:infographic [content]` | Generate infographic (21 layouts × 17 styles) |
| `/visual-content:slide-deck [content]` | Generate presentation slide images |
| `/visual-content:xhs-images [content]` | Generate Xiaohongshu card series |

**publishing** -- Publish to platforms

| Command | Description |
|---------|-------------|
| `/publishing:post-to-wechat [article]` | Publish to WeChat Official Account |
| `/publishing:post-to-x [content]` | Publish to X / Twitter |

**content-utilities** -- Content tools

| Command | Description |
|---------|-------------|
| `/content-utilities:compress-image [path]` | Compress images to WebP/PNG |
| `/content-utilities:format-markdown [file]` | Normalize Markdown formatting |
| `/content-utilities:markdown-to-html [file]` | Convert Markdown to WeChat-compatible HTML |
| `/content-utilities:url-to-markdown [url]` | Clip web page to Markdown |
| `/content-utilities:x-to-markdown [url]` | Clip tweet/thread to Markdown |

**audience-management** -- Manage audience and planning

| Command | Description |
|---------|-------------|
| `/audience-management:ops-report [period]` | Generate operations report |
| `/audience-management:audience-review [platform]` | Analyze audience demographics |
| `/audience-management:content-plan [period]` | Create editorial calendar |
| `/audience-management:biz-proposal [brand]` | Draft a business proposal |
| `/audience-management:content-rebalance` | Rebalance content mix |
| `/audience-management:cleanup` | Clean up underperforming content |

### Deep Research Pipeline

The most powerful feature is the 5-task deep research pipeline (`/topic-research:deep-research`). It runs one task at a time for quality control:

```
Task 1: Topic Research       -> 6,000-8,000 word research document
Task 2: Data Compilation     -> Excel workbook with 6 data tabs
Task 3: Analysis & Synthesis -> Comparative analysis + WRITE/MONITOR/SKIP recommendation
Task 4: Visual Assets        -> 15-25 charts and infographics
Task 5: Article Assembly     -> Final publication-ready article
```

Each task verifies prerequisites before starting. Tasks 1 and 2 can run independently; Tasks 3-5 have dependencies on earlier tasks.

## Project Structure

```
plugin-name/
├── .claude-plugin/plugin.json   # Plugin manifest
├── .mcp.json                    # MCP server configuration (optional)
├── commands/                    # Slash commands (.md files)
├── skills/                      # Knowledge and workflow files
│   └── skill-name/
│       ├── SKILL.md             # Main skill definition
│       ├── references/          # Supporting reference docs
│       └── scripts/             # TypeScript automation (optional)
└── hooks/
    └── hooks.json               # Event-driven automation
```

Visual-content and publishing plugins include TypeScript scripts (run via `npx -y bun`) for image generation API calls, PDF/PPTX assembly, and platform API integration. No build step required.

## License

[Apache License 2.0](./LICENSE)
