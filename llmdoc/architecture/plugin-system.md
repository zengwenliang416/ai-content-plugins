# Plugin System Architecture

## Directory Layout

Every plugin follows this filesystem structure:

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest (required)
├── .mcp.json                # MCP server connections (optional)
├── commands/                # Slash commands (.md files)
│   └── command-name.md
├── skills/                  # Domain knowledge + workflows
│   └── skill-name/
│       ├── SKILL.md         # Skill definition (required)
│       ├── scripts/         # Executable code (optional)
│       ├── references/      # Contextual documentation (optional)
│       └── assets/          # Output resources (optional)
├── hooks/
│   └── hooks.json           # Event-driven automation (optional)
└── .claude/
    └── *.local.md           # User-specific config (gitignored)
```

## Marketplace Hierarchy

```
.claude-plugin/marketplace.json (root)   # Registers all plugins
  └── plugin-name/
       ├── .claude-plugin/plugin.json    # Per-plugin metadata
       ├── .mcp.json                     # MCP server config
       ├── commands/*.md                 # User-invocable slash commands
       ├── skills/*/SKILL.md             # Auto-triggered domain knowledge
       └── hooks/hooks.json              # Event automation
```

Discovery is convention-based: the runtime scans `commands/`, `skills/`, and `hooks/` directories. No explicit component registration in `plugin.json` is required.

## Marketplace Manifest

Located at `.claude-plugin/marketplace.json` in the project root. Registers all 5 plugins:

```json
{
  "name": "ai-content-plugins",
  "owner": { "name": "AI Content Studio" },
  "plugins": [
    { "name": "content-analysis", "source": "./content-analysis", "description": "..." },
    { "name": "topic-research", "source": "./topic-research", "description": "..." },
    { "name": "content-production", "source": "./content-production", "description": "..." },
    { "name": "growth-ops", "source": "./growth-ops", "description": "..." },
    { "name": "audience-management", "source": "./audience-management", "description": "..." }
  ]
}
```

Each entry maps a plugin name to its directory via `source`. The `description` field is informational.

## Plugin Manifest (`plugin.json`)

All plugins use the same minimal format:

```json
{
  "name": "content-analysis",
  "version": "0.1.0",
  "description": "Content analysis tools: competitor analysis, content benchmarking, quality checks, trend analysis, and template creation",
  "author": { "name": "AI Content Studio" }
}
```

All 5 plugins are at version `0.1.0` with `AI Content Studio` as author. The `description` field summarizes the plugin's capabilities.

## Plugin Inventory

| Plugin | Commands | Skills | MCP Servers |
|--------|----------|--------|-------------|
| `content-analysis` | 6 (benchmark, check-quality, competitor, debug-draft, template, trend-analysis) | 7 (includes skill-creator meta-skill) | None |
| `topic-research` | 9 (brainstorm, daily-brief, deep-research, events, field-overview, narrative, release-analysis, trend-preview, update-research) | Varies | 3 (hacker-news, arxiv, rss-reader) |
| `content-production` | 7 (ab-test, audience, collab-letter, content-tracker, infographic, long-article, short-post) | Varies | None |
| `growth-ops` | 9 (account-portfolio, collab-prep, content-roi, find-sources, growth-plan, performance, review-checklist, screen-topic, strategy-memo) | Varies | 2 (hacker-news, rss-reader) |
| `audience-management` | 6 (audience-review, biz-proposal, cleanup, content-plan, content-rebalance, ops-report) | Varies | None |

## Command System

Commands are markdown files in `commands/` with YAML frontmatter:

```yaml
---
description: Short description of what the command does
argument-hint: "[expected argument]"
---
```

Invoked as `/plugin-name:command-name` (e.g., `/content-analysis:benchmark`).

### Thin Delegation (preferred)

Command loads a named skill and handles argument gathering. Most commands follow this pattern:

```markdown
---
description: Benchmark content against top performers in a niche
argument-hint: "[niche or topic]"
---

Load the `content-benchmark` skill and benchmark content performance
against top performers in the specified niche.

If a niche or topic is provided, use it. Otherwise ask the user what
niche or topic they want to benchmark against.
```

### Inline Workflow

Command embeds multi-step workflow logic directly, used when chaining multiple skills or adding orchestration logic:

```markdown
---
description: Run a multi-task deep research pipeline on an AI topic
argument-hint: "[AI topic or technology]"
---

Load the `deep-research` skill and begin the 5-task pipeline...

This is a 5-task pipeline that must be executed one task at a time:
1. Topic Research
2. Data Compilation
3. Analysis & Synthesis
4. Visual Asset Generation
5. Article Assembly
```

## Skill System

### Trigger Mechanism

Skills trigger automatically based on YAML frontmatter `description`:

```yaml
---
name: content-benchmark
description: Benchmark content performance against top performers in a niche.
  Use when evaluating how a piece of content compares to the best-performing
  content in the same topic area. Triggers include requests to benchmark an
  article, identify gaps in content quality, or understand what makes top
  content succeed.
---
```

Only `name` and `description` are read for trigger matching. The markdown body loads post-trigger. The `description` field should include 5-7 natural-language trigger phrases covering synonyms and use-case contexts.

### Progressive Disclosure

Three-level context loading:

1. **Metadata** (`name` + `description`) -- always in context (~100 words)
2. **SKILL.md body** -- loaded when skill triggers (<500 lines)
3. **Bundled resources** -- loaded on demand by Claude as needed

### Bundled Resources

| Directory | Purpose | Context Loading |
|-----------|---------|-----------------|
| `scripts/` | Executable code (Python, Bash) | Executed without reading; read only for patching |
| `references/` | Domain docs, detailed criteria | Read on demand when relevant |
| `assets/` | Output templates, images | Used in output, not loaded into context |

### Meta-Skills

`content-analysis` contains the `skill-creator` meta-skill -- a canonical guide for authoring new skills. It defines the extensibility contract: directory structure, frontmatter requirements, progressive disclosure principles, degrees-of-freedom framework, and a 6-step creation process.

## MCP Integration

### Configuration (`.mcp.json`)

Located at the plugin root. Uses local process-based servers (npx/uvx), not remote HTTP endpoints:

**topic-research** (3 servers):
```json
{
  "mcpServers": {
    "hacker-news": { "command": "npx", "args": ["-y", "mcp-hacker-news"] },
    "arxiv": { "command": "uvx", "args": ["arxiv-mcp-server"] },
    "rss-reader": { "command": "npx", "args": ["-y", "@kwp-lab/rss-reader-mcp"] }
  }
}
```

**growth-ops** (2 servers):
```json
{
  "mcpServers": {
    "hacker-news": { "command": "npx", "args": ["-y", "mcp-hacker-news"] },
    "rss-reader": { "command": "npx", "args": ["-y", "@kwp-lab/rss-reader-mcp"] }
  }
}
```

**content-analysis, content-production, audience-management**: Empty `{ "mcpServers": {} }`.

All servers are free, community-maintained packages requiring no API keys.

### Available MCP Servers

| Server | Package | Runner | Purpose |
|--------|---------|--------|---------|
| `hacker-news` | `mcp-hacker-news` | npx | Hacker News content access |
| `arxiv` | `arxiv-mcp-server` | uvx | Academic paper search |
| `rss-reader` | `@kwp-lab/rss-reader-mcp` | npx | RSS feed reading |

## Hooks

Defined in `hooks/hooks.json`. All 5 plugins have empty hook configurations:

```json
{ "hooks": {} }
```

No event-driven automation exists in the current version. The schema is reserved for future use.

## User Configuration

Optional `.claude/*.local.md` files (gitignored) store user-specific settings such as content niche, target platforms, posting schedules, and style preferences.
