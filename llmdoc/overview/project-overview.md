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
| content-analysis | `content-analysis/` | 6 | 7 | 0 | Competitor analysis, benchmarking, quality checks, trend analysis, template creation, draft debugging |
| topic-research | `topic-research/` | 9 | 8 | 3 | Deep research pipeline, daily briefs, brainstorming, trend preview, field overview, event calendar |
| content-production | `content-production/` | 7 | 9 | 0 | Long articles, short posts, infographics, A/B testing, collaboration letters |
| growth-ops | `growth-ops/` | 9 | 9 | 2 | Source discovery, topic screening, review checklists, growth planning, performance analysis |
| audience-management | `audience-management/` | 6 | 6 | 0 | Operations reports, audience reviews, content planning, business proposals |
| **Totals** | | **37** | **39** | **5** | |

## Key Architectural Patterns

### 1. Command-to-Skill Delegation
All commands are thin wrappers: parse argument -> load named skill -> skill provides full workflow. No commands embed inline workflows.

### 2. MCP Integrations
Two plugins use MCP servers. `topic-research` connects to hacker-news, arxiv, and rss-reader (3 servers). `growth-ops` connects to hacker-news and rss-reader (2 servers). Other plugins rely on implicit web search only.

### 3. SKILL.md Format
Skills use a consistent structure: trigger phrases, numbered workflow steps, output specifications. Auto-activate via `name` + `description` frontmatter.

### 4. WRITE/MONITOR/SKIP Decision Framework
`topic-research` defines a shared decision vocabulary (WRITE/MONITOR/SKIP) for topic evaluation. Partially adopted by other plugins.

### 5. Two Tool Tiers
- Implicit: web search (always available, no configuration)
- Explicit: MCP servers (declared in `.mcp.json`, requires endpoint setup)

### 6. Chinese Platform Support
`content-production` includes skills targeting Chinese social platforms (Xiaohongshu, WeChat, Weibo) with platform-specific formatting and conventions.

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
- **Cross-plugin handoffs are implicit** — no orchestration layer connects plugin outputs to downstream plugin inputs
- **WRITE/MONITOR/SKIP vocabulary inconsistent** — fully adopted in `topic-research`, partially elsewhere
- **Trigger phrase ambiguity** — "editorial calendar" matches skills in both `content-production` and `audience-management`

### Automation
- **No event-driven automation** — all plugins have empty `hooks.json`; everything is user-triggered

### Flagship Workflow
`topic-research` includes a deep-research command that orchestrates a 5-task pipeline, the most complex workflow in the marketplace.
