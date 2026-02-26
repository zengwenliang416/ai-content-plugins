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
marketplace.json (root)      # Registers all plugins with source paths
  └── plugin.json            # Per-plugin metadata (name, version, author)
       ├── commands/*.md     # User-invocable slash commands
       ├── skills/*/SKILL.md # Auto-triggered domain knowledge
       └── hooks/hooks.json  # Event automation
```

Discovery is convention-based: the runtime scans `commands/`, `skills/`, and `hooks/` directories. No explicit component registration in `plugin.json` is required.

## Plugin Types

### Core Plugin (`financial-analysis`)

The foundational data layer. All 11 MCP data provider connections (Daloopa, Morningstar, S&P Global, FactSet, Moody's, MT Newswires, Aiera, LSEG, PitchBook, Chronograph, Egnyte) live here. Add-on plugins contain no MCP connections of their own and rely on the core plugin for data access.

Skills: DCF, comps, LBO, 3-statement models, competitive analysis, deck QC, plus two meta-skills (skill-creator, ppt-template-creator).

### Add-On Plugins

Domain-specific extensions that depend implicitly on the core plugin for MCP data:

| Plugin | Domain | Commands | Skills |
|--------|--------|----------|--------|
| `investment-banking` | IB workflows | 7 | 8 |
| `equity-research` | ER workflows | 9 | 9 |
| `private-equity` | PE workflows | has own `.mcp.json` | varies |
| `wealth-management` | WM workflows | — | varies |

Dependency on `financial-analysis` is implicit -- no manifest field declares it.

### Partner-Built Plugins (`partner-built/`)

External vendor plugins under `partner-built/`:

| Plugin | Author | MCP | Commands | Skills |
|--------|--------|-----|----------|--------|
| `lseg` | LSEG | Own endpoint (LFA MCP) | 8 | 8 (1:1 mapping) |
| `spglobal` | Kensho Technologies | Own endpoint (Kensho MCP) | 0 | 3 (trigger-only) |

Partner plugins are self-contained with their own MCP connections and do not depend on the core plugin.

## Plugin Manifest (`plugin.json`)

Two manifest styles exist:

**Minimal (first-party):**
```json
{
  "name": "financial-analysis",
  "version": "0.1.0",
  "description": "Core financial modeling and analysis tools",
  "author": { "name": "Anthropic FSI" }
}
```

**Full (partner, npm-style):**
```json
{
  "name": "sp-global",
  "version": "1.0.0",
  "description": "S&P Global - Financial data and analytics skills",
  "author": { "name": "Kensho Technologies", "email": "..." },
  "homepage": "https://...",
  "repository": "https://...",
  "license": "Apache-2.0",
  "keywords": ["sp-global", "finance"],
  "mcpServers": { ... }
}
```

S&P Global embeds `mcpServers` directly in `plugin.json` (also duplicated in `.mcp.json`). LSEG and first-party plugins keep MCP config only in `.mcp.json`.

## Command System

Commands are markdown files in `commands/` with YAML frontmatter:

```yaml
---
description: Short description of what the command does
argument-hint: "[expected argument]"
---
```

Invoked as `/plugin-name:command-name`. Two structural patterns exist:

### Thin Delegation (preferred)

Command loads a named skill and handles argument gathering. Most commands follow this pattern.

```markdown
---
description: Build an LBO model for a PE acquisition
argument-hint: "[company name or deal details]"
---
Load the `lbo-model` skill and build a leveraged buyout model.
If a company name is provided, use it. Otherwise ask the user.
```

Examples: `lbo`, `check-deck`, `debug-model`, `3-statements`, `buyer-list`, `cim`, `teaser`.

### Inline Workflow

Command embeds multi-step workflow logic directly, often chaining multiple skills or adding pre/post-processing steps.

```markdown
---
description: Build a DCF valuation model with comps-informed terminal multiples
argument-hint: "[company name or ticker]"
---
## Workflow
### Step 1: Gather Company Information
### Step 2: Run Comparable Company Analysis (loads comps-analysis skill)
### Step 3: Build DCF Model (loads dcf-model skill)
### Step 4: Cross-Check Valuation
### Step 5: Deliver Output
```

Examples: `dcf` (chains comps into DCF), `one-pager` (checks for PPT template skills first), `earnings` (timeliness verification + data collection checklist).

### LSEG Command Pattern

LSEG commands include explicit MCP tool call sequences and reference `CONNECTORS.md` for tool documentation:

```markdown
---
description: Analyze bond relative value
argument-hint: "[bond identifier]"
---
Reference: ../CONNECTORS.md
Steps with explicit MCP tool calls: bond_price → interest_rate_curve → credit_curve → yieldbook_scenario
```

## Skill System

### Trigger Mechanism

Skills trigger automatically based on YAML frontmatter:

```yaml
---
name: skill-name
description: Describes what the skill does AND when to trigger it.
  Include trigger phrases and contexts here -- the body only loads
  after triggering, so trigger conditions must be in this field.
---
```

Only `name` and `description` are read for trigger matching. The markdown body loads post-trigger.

S&P Global skills use extensive multi-paragraph `description` fields as trigger specifications (no commands, trigger-only activation).

### Progressive Disclosure

Three-level context loading:

1. **Metadata** (`name` + `description`) -- always in context (~100 words)
2. **SKILL.md body** -- loaded when skill triggers (<5k words target, <500 lines)
3. **Bundled resources** -- loaded on demand by Claude as needed

### Bundled Resources

| Directory | Purpose | Context loading |
|-----------|---------|-----------------|
| `scripts/` | Executable code (Python, Bash) | Executed without reading; read only for patching |
| `references/` | Domain docs, schemas, guidelines | Read on demand when relevant |
| `assets/` | Output resources (templates, images) | Used in output, not loaded into context |

### Cross-Skill Invocation

Skills can invoke other skills:
- `dcf` command loads `comps-analysis` skill first, then `dcf-model` skill
- `one-pager` command checks for user-created PPT template skills before loading `strip-profile`

### Meta-Skills

Two skills generate new skills:

- **`skill-creator`**: Canonical guide for authoring new skills. Includes `init_skill.py` (scaffolds directory), `package_skill.py` (validates + packages `.skill` file), `quick_validate.py`.
- **`ppt-template-creator`**: Creates reusable PPT template skills from `.pptx`/`.potx` files. Only command with explicit `allowed-tools` declaration.

## MCP Integration

### Configuration (`.mcp.json`)

```json
{
  "mcpServers": {
    "provider-key": {
      "type": "http",
      "url": "https://mcp.provider.com/endpoint"
    }
  }
}
```

All connectors are `type: http` (remote MCP servers).

### Data Access Pattern

Skills enforce a data source hierarchy: MCP providers first (S&P Kensho, FactSet, Daloopa, etc.) > Bloomberg/SEC filings > never web search as primary source.

The core plugin holds all 11 MCP connections. Add-on plugins issue data requests through the same runtime context -- there is no explicit delegation protocol, just shared MCP availability.

### Partner MCP Isolation

Partner plugins bring their own MCP endpoints:
- LSEG: `api.analytics.lseg.com/lfa/mcp/server-cl` (18 tools documented in `CONNECTORS.md`)
- S&P Global: `kfinance.kensho.com/integrations/mcp`

Note: The core plugin also has an `lseg` key pointing to the same LSEG endpoint, creating a potential key collision if both plugins are active.

## Hooks

Defined in `hooks/hooks.json`. All current plugins have empty hook configurations (either `[]` or `{"hooks": {}}`). The schema is not yet standardized across plugins.

## User Configuration

Optional `.claude/*.local.md` files (gitignored) store user-specific settings: firm name, role, coverage sectors, deal parameters, active mandates, valuation defaults. `investment-banking` provides a `.local.md.example` template; other plugins do not.
