# Project Overview: AI Content Plugins

## Purpose

A marketplace of Claude Cowork plugins for AI content creators and account operators. Plugins are convention-based directories built from markdown, JSON, and optional executable scripts. They extend Claude's capabilities with domain-specific slash commands, skills, plugin-local agent profiles, and MCP data connectors.

## Architecture

```
marketplace (repo root)
  └── plugin/
       ├── .claude-plugin/plugin.json   # manifest: name, version, description
       ├── commands/*.md                # slash commands (thin wrappers -> skill delegation)
       ├── skills/*/SKILL.md            # knowledge + workflows (auto-triggered by name/description match)
       │    ├── scripts/                # optional executable helpers
       │    ├── references/             # supplementary knowledge files
       │    └── assets/                 # templates or output resources
       ├── agents/*.md                  # plugin-local agent profiles
       ├── hooks/hooks.json             # event automation (8 plugins log Stop failures)
       ├── .mcp.json                    # MCP server connections (local process runners)
       └── .claude/*.local.md           # user-specific config (gitignored)
```

**Key flow:** User invokes `/plugin:command` -> command.md loads named skill -> SKILL.md provides full workflow, optional scripts/resources, and may delegate execution to a plugin-local agent profile.

## Plugin Inventory

| Plugin | Path | Commands | Skills | MCP Servers | Focus |
|--------|------|----------|--------|-------------|-------|
| content-analysis | `content-analysis/` | 7 | 7 | 0 | Competitor analysis, benchmarking, quality checks, trend analysis, template creation, draft debugging |
| topic-research | `topic-research/` | 12 | 12 | 2 | Deep research pipeline, daily briefs, brainstorming, trend preview, field overview, event calendar, multi-platform news search |
| content-production | `content-production/` | 9 | 9 | 0 | Long articles, short posts, infographics, A/B testing, collaboration letters |
| growth-ops | `growth-ops/` | 9 | 9 | 0 | Source discovery, topic screening, review checklists, growth planning, performance analysis |
| audience-management | `audience-management/` | 6 | 6 | 0 | Operations reports, audience reviews, content planning, business proposals |
| visual-content | `visual-content/` | 6 | 7 | 0 | Article illustrations, comics, cover images, infographics, slide decks, script-backed Xiaohongshu cards |
| publishing | `publishing/` | 2 | 2 | 0 | WeChat Official Account and X/Twitter publishing |
| content-utilities | `content-utilities/` | 6 | 6 | 0 | Markdown/HTML conversion, clipping, image compression, humanization |
| content-repurpose | `content-repurpose/` | 1 | 1 | 0 | Cross-platform content repurposing |
| content-hooks | `content-hooks/` | 2 | 2 | 0 | Hook and headline generation |
| **Totals** | | **60** | **61** | **2** | |

## Key Architectural Patterns

### 1. Command-to-Skill Delegation
All commands are thin wrappers: parse argument -> load named skill -> skill provides full workflow. No commands embed inline workflows.

### 2. MCP Integrations
Only `topic-research` currently uses MCP servers in-repo (`hacker-news`, `arxiv`). Other plugins currently rely on implicit web search or file handoffs.

### 3. SKILL.md Frontmatter Contract
Skills use a consistent structure: trigger phrases, numbered workflow steps, output specifications. Auto-activate via `name` + `description` frontmatter, while many runtime-facing skills now also declare `allowed-tools`.

### 4. Plugin-Local Agents
Ten plugins now ship optional `agents/*.md` profiles that declare tool access, model tier, role, and service scope for plugin-specific execution.

### 5. WRITE/MONITOR/SKIP Decision Framework
`topic-research` defines a shared decision vocabulary (WRITE/MONITOR/SKIP) for topic evaluation. Partially adopted by other plugins.

### 6. Two Tool Tiers
- Implicit: web search (always available, no configuration)
- Explicit: MCP servers (declared in `.mcp.json`, requires endpoint setup)

### 7. Limited Hook Automation
Eight plugins currently wire `Stop` hooks that append failure reasons to `logs/stop-failures.log`. Broader event orchestration is still absent.

### 8. Chinese Platform Support
`content-production` and `visual-content` include skills targeting Chinese social platforms (Xiaohongshu, WeChat, Weibo), including a script-backed `xhs-card` renderer.

### 9. OpenSpec Workflow Governance
OpenSpec lifecycle governance is workflow-centric and centered on `openspec/changes/<change_id>`.
All **60 commands** are contract-aware with a mandatory `**OpenSpec contract (MANDATORY)**:` section, using `pipeline.openspec.json` for stage transitions, canonical output paths, and next-step routing, with standalone fallback when no upstream contract exists.

## Cross-Cutting Conventions

### Output Formats
Markdown is the universal output format. `topic-research` also produces xlsx and zip artifacts for structured deliverables.

### Data Integrity
- `topic-research`: prohibits fabrication entirely
- `content-analysis`: allows labeled estimates marked with `[E]`

### Trigger-Only Skills
Two skills in `content-production` (asset-pack, presentation) have no corresponding commands and activate only via skill trigger matching.

### Runtime Metadata
`allowed-tools` is now a cross-plugin frontmatter convention used to document the tool surface available to a skill at runtime.

### Meta-Skill
`content-analysis` includes a skill-creator meta-skill for generating new skills within the plugin framework.

## Known Gaps

### Structural
- **Cross-plugin handoffs depend on artifact quality** — downstream planning quality degrades when upstream outputs are missing or stale
- **WRITE/MONITOR/SKIP vocabulary inconsistent** — fully adopted in `topic-research`, partially elsewhere
- **Trigger phrase ambiguity** — "editorial calendar" matches skills in both `content-production` and `audience-management`

### Automation
- **Automation remains shallow** — 8 plugins record `Stop` events, but there is still no cross-stage orchestration or recovery workflow

### Migration
- **Contract governance needs sync discipline** — keep `openspec/changes/<change_id>` lifecycle notes and command contract fields aligned during updates

### Flagship Workflow
`topic-research` includes a deep-research command that orchestrates a 5-task pipeline, the most complex workflow in the marketplace.
