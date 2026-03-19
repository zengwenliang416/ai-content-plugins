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
├── agents/                  # Plugin-local agent profiles (.md files, optional)
│   └── agent-name.md
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
       ├── agents/*.md                   # Plugin-local role profiles
       ├── commands/*.md                 # User-invocable slash commands
       ├── skills/*/SKILL.md             # Auto-triggered domain knowledge
       └── hooks/hooks.json              # Event automation
```

Discovery is convention-based: the runtime scans `commands/`, `skills/`, and `hooks/` directories. No explicit component registration in `plugin.json` is required. Optional `agents/*.md` files are co-located role profiles and likewise require no `plugin.json` registration.

## Marketplace Manifest

Located at `.claude-plugin/marketplace.json` in the project root. Registers all 10 plugins:

```json
{
  "name": "ai-content-plugins",
  "owner": { "name": "AI Content Studio" },
  "plugins": [
    { "name": "content-analysis", "source": "./content-analysis", "description": "..." },
    { "name": "topic-research", "source": "./topic-research", "description": "..." },
    { "name": "content-production", "source": "./content-production", "description": "..." },
    { "name": "growth-ops", "source": "./growth-ops", "description": "..." },
    { "name": "audience-management", "source": "./audience-management", "description": "..." },
    { "name": "visual-content", "source": "./visual-content", "description": "..." },
    { "name": "publishing", "source": "./publishing", "description": "..." },
    { "name": "content-utilities", "source": "./content-utilities", "description": "..." },
    { "name": "content-repurpose", "source": "./content-repurpose", "description": "..." },
    { "name": "content-hooks", "source": "./content-hooks", "description": "..." }
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

All 10 plugins are at version `0.1.0` with `AI Content Studio` as author. The `description` field summarizes the plugin's capabilities.

## Plugin Inventory

| Plugin | Commands | Skills | MCP Servers |
|--------|----------|--------|-------------|
| `content-analysis` | 7 | 7 | 0 |
| `topic-research` | 12 | 12 | 2 |
| `content-production` | 9 | 9 | 0 |
| `growth-ops` | 9 | 9 | 0 |
| `audience-management` | 6 | 6 | 0 |
| `visual-content` | 6 | 7 | 0 |
| `publishing` | 2 | 2 | 0 |
| `content-utilities` | 6 | 6 | 0 |
| `content-repurpose` | 1 | 1 | 0 |
| `content-hooks` | 2 | 2 | 0 |

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

Only `name` and `description` are read for trigger matching. The markdown body loads post-trigger. Many runtime-facing skills also declare `allowed-tools` to constrain the tool surface available during execution. The `description` field should include 5-7 natural-language trigger phrases covering synonyms and use-case contexts.

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

Example: `visual-content/skills/xhs-card/` now pairs `scripts/md-to-xhs.mjs` with `references/themes/*.css` to render Markdown into Xiaohongshu card images.

## Agent Profiles

Optional plugin-local agent specs live in `agents/*.md`. They use YAML frontmatter for fields such as `name`, `description`, `tools`, `memory`, `model`, `effort`, `maxTurns`, and `disallowedTools`, followed by role, services, invocation, and practice sections.

The current repo includes 14 agent profiles across 10 plugins. These profiles are auxiliary runtime assets rather than slash commands or skills.

### Meta-Skills

`content-analysis` contains the `skill-creator` meta-skill -- a canonical guide for authoring new skills. It defines the extensibility contract: directory structure, frontmatter requirements, progressive disclosure principles, degrees-of-freedom framework, and a 6-step creation process.

## MCP Integration

### Configuration (`.mcp.json`)

Located at the plugin root. Uses local process-based servers (npx/uvx), not remote HTTP endpoints:

**topic-research** (2 servers):
```json
{
  "mcpServers": {
    "hacker-news": { "command": "npx", "args": ["-y", "mcp-hacker-news"] },
    "arxiv": { "command": "uvx", "args": ["arxiv-mcp-server"] }
  }
}
```

All other plugins currently use empty `{ "mcpServers": {} }`.

All servers are free, community-maintained packages requiring no API keys.

### Available MCP Servers

| Server | Package | Runner | Purpose |
|--------|---------|--------|---------|
| `hacker-news` | `mcp-hacker-news` | npx | Hacker News content access |
| `arxiv` | `arxiv-mcp-server` | uvx | Academic paper search |

## Hooks

Defined in `hooks/hooks.json`. Eight plugins currently register `Stop` hooks that append stop timestamps and reasons to `logs/stop-failures.log`:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo \"[...] STOP <plugin>: reason=$STOP_REASON\" >> \"${PROJECT_DIR:-.}/logs/stop-failures.log\""
          }
        ]
      }
    ]
  }
}
```

This automation is intentionally narrow: it records failure diagnostics, but there is still no broader event-driven orchestration layer.

## User Configuration

Optional `.claude/*.local.md` files (gitignored) store user-specific settings such as content niche, target platforms, posting schedules, and style preferences.
