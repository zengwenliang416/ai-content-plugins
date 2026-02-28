# Project Overview: AI Content Agents

## Purpose

Three autonomous OpenClaw agents for AI content creators. Each agent is a self-contained workspace with its own identity, personality, tools, memory, and skills. Together they cover the full content lifecycle: research, writing, and operations.

## Architecture

The system uses a **workspace-per-agent** pattern. Each agent workspace is a directory containing markdown files that define the agent's behavior and a `skills/` directory with SKILL.md-based workflows.

```
workspace-*/
├── IDENTITY.md    # Agent name + emoji (YAML frontmatter)
├── SOUL.md        # Personality traits and communication style
├── AGENTS.md      # Operating instructions (language, tools, protocols)
├── TOOLS.md       # Required and optional tool inventory
├── MEMORY.md      # Persistent cross-session memory (auto-loaded, 200-line cap)
├── memory/        # Detailed topic memory files (linked from MEMORY.md)
├── USER.md        # User-specific preferences (gitignored)
└── skills/        # SKILL.md workflows with optional scripts/ and references/
```

Registration manifest: `openclaw.json` declares all three agents with workspace paths. The OpenClaw gateway reads this to discover agents.

## Agent Inventory

| Agent              | Workspace                       | Emoji | Skills | Focus Areas                                                                                                   |
| ------------------ | ------------------------------- | ----- | ------ | ------------------------------------------------------------------------------------------------------------- |
| Content Researcher | `workspace-content-researcher/` | 🔍    | 18     | Deep research, daily briefs, trend analysis, competitor intelligence, news monitoring, content quality review |
| Content Writer     | `workspace-content-writer/`     | ✍️    | 16     | Long-form articles, social posts, image generation (4 providers), infographics, slide decks, knowledge comics |
| Content Operator   | `workspace-content-operator/`   | ⚡    | 22     | Publishing (WeChat, X/Twitter), analytics, growth planning, content strategy, formatting utilities            |

**Total: 56 skills** across 3 agents.

## Key Architectural Patterns

### SKILL.md Workflow Format

Skills are defined as markdown files with OpenClaw YAML frontmatter (`name`, `description`, `user-invocable`, `metadata.openclaw`) followed by a step-by-step workflow body. Supporting data lives in `references/` subdirectories.

### Symlink Sharing

The `news-search` skill is the shared data-gathering infrastructure. It lives canonically in the researcher workspace and is symlinked into writer and operator workspaces:

```
workspace-content-writer/skills/news-search   -> ../../workspace-content-researcher/skills/news-search
workspace-content-operator/skills/news-search -> ../../workspace-content-researcher/skills/news-search
```

### EXTEND.md Configuration

Visual skills support two-level persistent config: project-level (`.content-skills/<skill>/EXTEND.md`) then user-level (`~/.content-skills/<skill>/EXTEND.md`). Controls default provider, quality, aspect ratio, style, and language.

### Memory Hierarchy

`MEMORY.md` is auto-loaded into context (truncated at 200 lines). Detailed notes go in `memory/*.md` files linked from `MEMORY.md`.

### Data Freshness Protocol

24-hour default window for all search data. Enforced via `--since 24h` flag. Breaking news can use `--since 2h`; background research allows `--no-freshness`.

### Language Matching

All three agents auto-detect Chinese or English from user input and respond in the same language.

## Technology Stack

| Component             | Technology                                  | Purpose                                                             |
| --------------------- | ------------------------------------------- | ------------------------------------------------------------------- |
| Agent framework       | OpenClaw                                    | Agent registration, gateway, lifecycle                              |
| Script runtime        | Bun                                         | TypeScript execution for skill scripts                              |
| Browser automation    | Chrome CDP                                  | Publishing (WeChat, X/Twitter), web clipping                        |
| MCP servers           | hacker-news, arxiv, rss-reader              | Structured data access for researcher                               |
| Multi-platform search | news-search CLI                             | 12+ platforms (Twitter, Reddit, YouTube, GitHub, XiaoHongShu, etc.) |
| Image generation      | Google Gemini, OpenAI, DashScope, Replicate | 4-provider support with fallback                                    |
| Platform config       | mcporter (Exa MCP)                          | Multi-platform scraping coordination                                |

## Installation

`install.sh` performs four steps:

1. Validates runtime dependencies (bun, Python feedparser)
2. Registers agents in OpenClaw via `openclaw agents add`
3. Creates `news-search` symlinks across workspaces
4. Installs npm/bun dependencies in skill `scripts/` directories

## Skill Distribution by Category

### Researcher (18 skills)

| Category          | Skills                                                                   | Count |
| ----------------- | ------------------------------------------------------------------------ | ----- |
| Core Research     | deep-research, field-overview, topic-brainstorm, research-updater        | 4     |
| News & Monitoring | daily-brief, news-search, news-search-setup                              | 3     |
| Trend Analysis    | trend-analysis, trend-preview, narrative-tracker                         | 3     |
| Competitive Intel | competitor-analysis, content-benchmark, release-analysis, event-calendar | 4     |
| Content Quality   | quality-check, draft-debugger, template-creator                          | 3     |
| Meta              | skill-creator                                                            | 1     |

### Writer (16 skills)

| Category           | Skills                                                                                         | Count |
| ------------------ | ---------------------------------------------------------------------------------------------- | ----- |
| Long-Form Writing  | article-builder, short-post                                                                    | 2     |
| Visual Generation  | ai-image-gen, cover-generator, infographic-gen, article-illustrator, xhs-card, slide-generator | 6     |
| Structured Visual  | infographic, presentation                                                                      | 2     |
| Creative Formats   | knowledge-comic                                                                                | 1     |
| Content Operations | asset-pack, audience-targeting, content-experiment, content-tracker, collab-letter             | 5     |

### Operator (22 skills)

| Category            | Skills                                                                                   | Count |
| ------------------- | ---------------------------------------------------------------------------------------- | ----- |
| Publishing          | wechat-publisher, x-publisher, review-checklist                                          | 3     |
| Analytics           | account-monitor, performance-analysis, ops-report, content-roi                           | 4     |
| Audience & Growth   | audience-review, growth-plan, content-rebalance                                          | 3     |
| Strategy & Planning | content-plan, strategy-memo, content-cleanup, topic-screening                            | 4     |
| Business Dev        | biz-proposal, collab-prep                                                                | 2     |
| Utilities           | md-to-html, md-formatter, image-compressor, web-clipper, tweet-clipper, source-discovery | 6     |

## Known Gaps and Risks

| Risk                          | Severity | Description                                                                                                                    |
| ----------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| No inter-agent messaging      | Medium   | Agents share data only via filesystem (symlinks, output files). No runtime protocol for task handoff or coordination.          |
| news-search symlink coupling  | Low      | Writer and operator depend on researcher's news-search directory structure. Breaking changes in researcher propagate silently. |
| Empty memories                | Low      | All three agents have empty `MEMORY.md` and `memory/` directories. No accumulated operational knowledge yet.                   |
| Stale llmdoc                  | Medium   | Legacy documentation in `llmdoc/` still references the old plugin marketplace architecture (being updated).                    |
| MEMORY.md gitignore ambiguity | Low      | Root `.gitignore` has `MEMORY.md` which may conflict with workspace-specific memory files.                                     |
| HEARTBEAT.md undocumented     | Low      | Each workspace has a `HEARTBEAT.md` file with unclear purpose (possibly OpenClaw liveness signaling).                          |
