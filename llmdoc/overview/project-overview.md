# Project Overview: AI Content Plugins

## Purpose

A marketplace of Claude Cowork plugins for AI content creators and account operators. All plugins are file-based (markdown + JSON) with no compiled code. Plugins extend Claude's capabilities with domain-specific slash commands, skills (knowledge files), and MCP data connectors.

## Architecture

```
marketplace (repo root)
  └── plugin/
       ├── .claude-plugin/plugin.json   # manifest: name, version, description
       ├── commands/*.md                # slash commands (thin wrappers -> skill delegation)
       ├── skills/*/SKILL.md            # knowledge + workflows (auto-triggered by name/description match)
       │    └── references/             # supplementary knowledge files
       ├── hooks/hooks.json             # event-driven automation (currently empty across all plugins)
       ├── .mcp.json                    # MCP server connections (HTTP remote)
       └── .claude/*.local.md           # user-specific config (gitignored)
```

**Key flow:** User invokes `/plugin:command` -> command.md loads named skill -> SKILL.md provides full workflow + references.

## Plugin Inventory

| Plugin | Path | Commands | Skills | MCP Servers | Focus |
|--------|------|----------|--------|-------------|-------|
| content-analysis | `content-analysis/` | 7 | 7 | 0 | Competitor analysis, benchmarking, quality checks, trend analysis, template creation, draft debugging |
| topic-research | `topic-research/` | 11 | 11 | 2 | Deep research pipeline, daily briefs, brainstorming, trend preview, field overview, event calendar |
| content-production | `content-production/` | 9 | 9 | 0 | Long articles, short posts, infographics, A/B testing, collaboration letters |
| growth-ops | `growth-ops/` | 9 | 9 | 0 | Source discovery, topic screening, review checklists, growth planning, performance analysis |
| audience-management | `audience-management/` | 6 | 6 | 0 | Operations reports, audience reviews, content planning, business proposals |
| visual-content | `visual-content/` | 6 | 7 | 0 | Article illustrations, comics, cover images, infographics, slide decks, Xiaohongshu cards |
| publishing | `publishing/` | 2 | 2 | 0 | WeChat Official Account and X/Twitter publishing |
| content-utilities | `content-utilities/` | 5 | 5 | 0 | Markdown/HTML conversion, clipping, image compression |
| **Totals** | | **55** | **56** | **2** | |

## Key Architectural Patterns

### 1. Command-to-Skill Delegation
All commands are thin wrappers: parse argument -> load named skill -> skill provides full workflow. No commands embed inline workflows.

### 2. MCP Integrations
Only `topic-research` currently uses MCP servers in-repo (`hacker-news`, `arxiv`). Other plugins currently rely on implicit web search or file handoffs.

### 3. SKILL.md Format
Skills use a consistent structure: trigger phrases, numbered workflow steps, output specifications. Auto-activate via `name` + `description` frontmatter.

### 4. WRITE/MONITOR/SKIP Decision Framework
`topic-research` defines a shared decision vocabulary (WRITE/MONITOR/SKIP) for topic evaluation. Partially adopted by other plugins.

### 5. Two Tool Tiers
- Implicit: web search (always available, no configuration)
- Explicit: MCP servers (declared in `.mcp.json`, requires endpoint setup)

### 6. Chinese Platform Support
`content-production` includes skills targeting Chinese social platforms (Xiaohongshu, WeChat, Weibo) with platform-specific formatting and conventions.

### 7. OpenSpec Workflow Governance
OpenSpec lifecycle governance is workflow-centric and centered on `openspec/changes/<change_id>`.
All **55 commands** are contract-aware with a mandatory `**OpenSpec contract (MANDATORY)**:` section, using `pipeline.openspec.json` for stage transitions, canonical output paths, and next-step routing, with standalone fallback when no upstream contract exists.

## Cross-Cutting Conventions

### Output Formats
Markdown is the universal output format. `topic-research` also produces xlsx and zip artifacts for structured deliverables.

### Data Integrity
- `topic-research`: prohibits fabrication entirely
- `content-analysis`: allows labeled estimates marked with `[E]`

### Trigger-Only Skills
Two skills in `content-production` (asset-pack, presentation) have no corresponding commands and activate only via skill trigger matching.

### Meta-Skill
`content-analysis` includes a skill-creator meta-skill for generating new skills within the plugin framework.

## Known Gaps

### Structural
- **Cross-plugin handoffs depend on artifact quality** — downstream planning quality degrades when upstream outputs are missing or stale
- **WRITE/MONITOR/SKIP vocabulary inconsistent** — fully adopted in `topic-research`, partially elsewhere
- **Trigger phrase ambiguity** — "editorial calendar" matches skills in both `content-production` and `audience-management`

### Automation
- **No event-driven automation** — all plugins have empty `hooks.json`; everything is user-triggered

### Migration
- **Contract governance needs sync discipline** — keep `openspec/changes/<change_id>` lifecycle notes and command contract fields aligned during updates

### Flagship Workflow
`topic-research` includes a deep-research command that orchestrates a 5-task pipeline, the most complex workflow in the marketplace.
