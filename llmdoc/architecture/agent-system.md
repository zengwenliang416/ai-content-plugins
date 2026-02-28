# Agent System Architecture

## Overview

AI Content Agents is a system of three autonomous OpenClaw agents for AI content creators. Each agent is a self-contained workspace with identity, personality, instructions, memory, and skills (56 total).

## Agent Registration (`openclaw.json`)

```json
{
  "name": "ai-content-agents",
  "version": "1.0.0",
  "agents": [
    {
      "name": "content-researcher",
      "workspace": "./workspace-content-researcher"
    },
    { "name": "content-writer", "workspace": "./workspace-content-writer" },
    { "name": "content-operator", "workspace": "./workspace-content-operator" }
  ]
}
```

The OpenClaw gateway reads this manifest to discover agents. Each entry maps a slug name to a workspace directory. Agent behavior is defined entirely by files inside the workspace.

## Workspace-per-Agent Pattern

Every agent workspace follows this layout:

```
workspace-*/
├── IDENTITY.md    # Name + emoji (YAML frontmatter)
├── SOUL.md        # Personality traits, communication style
├── AGENTS.md      # Operating instructions, protocols, tool rules
├── USER.md        # User preferences (gitignored)
├── TOOLS.md       # Required + optional tools, health checks
├── MEMORY.md      # Persistent memory (auto-loaded, truncated at 200 lines)
├── memory/        # Detailed topic memory files (linked from MEMORY.md)
└── skills/        # SKILL.md-based workflows
```

### Identity Layer

`IDENTITY.md` uses YAML frontmatter with `name` and `emoji` fields. This is how OpenClaw renders the agent in its UI.

`SOUL.md` defines personality traits and communication style in free-form markdown. Controls tone, not behavior.

### Instruction Layer

`AGENTS.md` contains operating rules: language matching, data freshness protocols, tool usage, output standards. This is where behavioral constraints live.

`TOOLS.md` inventories required and optional tools with install instructions. Includes a health check command (`doctor.ts --json`).

### Memory Layer

`MEMORY.md` is auto-loaded into agent context (truncated at 200 lines). Detailed notes go in `memory/*.md` files linked from `MEMORY.md`. Memory persists across sessions.

`USER.md` stores user-specific preferences (writing style, brand voice, output directory). Gitignored per workspace.

## Installation Process (`install.sh`)

| Step                | Action                                                                                                               |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 1. Validate deps    | Check `bun`; install Python `feedparser`                                                                             |
| 2. Register agents  | `openclaw agents add <id> --workspace <path>` for each workspace; configure `subagents.allowAgents`; restart gateway |
| 3. Create symlinks  | Symlink `news-search` from researcher to writer and operator                                                         |
| 4. Install bun deps | Run `bun install --frozen-lockfile` in each `skills/*/scripts/` with a `package.json`                                |

## The Three Agents

| Agent              | Emoji | Skills | Domain                                                              |
| ------------------ | ----- | ------ | ------------------------------------------------------------------- |
| content-researcher | 🔍    | 18     | Research, news monitoring, trend analysis, competitive intelligence |
| content-writer     | ✍️    | 16     | Articles, social posts, visual generation, creative formats         |
| content-operator   | ⚡    | 22     | Publishing, analytics, growth, strategy, content utilities          |

### content-researcher (18 skills)

Core research (deep-research, field-overview, topic-brainstorm, research-updater), news & monitoring (daily-brief, news-search, news-search-setup), trend analysis (trend-analysis, trend-preview, narrative-tracker), competitive intelligence (competitor-analysis, content-benchmark, release-analysis, event-calendar), content quality (quality-check, draft-debugger, template-creator), meta (skill-creator).

### content-writer (16 skills)

Long-form writing (article-builder, short-post), visual generation (ai-image-gen, cover-generator, infographic-gen, article-illustrator, xhs-card, slide-generator), structured visuals (infographic, presentation), creative formats (knowledge-comic), content ops (asset-pack, audience-targeting, content-experiment, content-tracker, collab-letter), shared (news-search via symlink).

### content-operator (22 skills)

Publishing (wechat-publisher, x-publisher, review-checklist), analytics (account-monitor, performance-analysis, ops-report, content-roi), audience & growth (audience-review, growth-plan, content-rebalance), strategy (content-plan, strategy-memo, content-cleanup, topic-screening), business dev (biz-proposal, collab-prep), utilities (md-to-html, md-formatter, image-compressor, web-clipper, tweet-clipper), shared (news-search via symlink).

## Agent Inter-Relationships

```
openclaw.json ─── registers 3 agents
  │
  ├── content-researcher (canonical skill owner)
  │     └── news-search/  ← canonical source
  │
  ├── content-writer
  │     └── news-search → symlink to researcher
  │
  └── content-operator
        └── news-search → symlink to researcher

Main Agent (OpenClaw gateway)
  └── spawns any of the 3 via subagents.allowAgents
```

Agents share three things:

1. The `news-search` skill (via filesystem symlinks)
2. The OpenClaw gateway (managed by `install.sh`)
3. Platform configuration (`config/mcporter.json`)

## Key Architectural Patterns

| Pattern             | Description                                                                |
| ------------------- | -------------------------------------------------------------------------- |
| Workspace-per-agent | Self-contained directory with identity, soul, instructions, memory, skills |
| SKILL.md workflow   | Markdown with OpenClaw frontmatter + step-by-step workflow prose           |
| Symlink sharing     | Common skills have one canonical source; consumers get symlinks            |
| Memory hierarchy    | `MEMORY.md` (short, auto-loaded) + `memory/*.md` (detailed, linked)        |
| Tool gating         | `doctor.ts` checks availability; skills degrade gracefully                 |
| Data freshness      | 24h default for search data; enforced via `--since 24h`                    |
| Language matching   | All agents auto-detect Chinese/English from user input                     |
