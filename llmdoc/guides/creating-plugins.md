# Guide: Creating Plugins

## Quick Start

1. Create the plugin directory structure
2. Write `plugin.json` manifest
3. Add commands
4. Write skills (SKILL.md + resources)
5. Configure MCP servers (optional)
6. Register in marketplace.json

## Step 1: Directory Structure

```bash
mkdir -p my-plugin/.claude-plugin
mkdir -p my-plugin/commands
mkdir -p my-plugin/skills
mkdir -p my-plugin/hooks
touch my-plugin/.mcp.json
touch my-plugin/hooks/hooks.json
```

Initialize `.mcp.json` with `{ "mcpServers": {} }` and `hooks.json` with `{ "hooks": {} }`.

## Step 2: Plugin Manifest

Create `.claude-plugin/plugin.json`:

```json
{
  "name": "my-plugin",
  "version": "0.1.0",
  "description": "What this plugin does in one sentence",
  "author": { "name": "Your Name" }
}
```

Fields: `name` (kebab-case), `version` (semver), `description` (capabilities summary), `author`.

## Step 3: Commands

Create markdown files in `commands/`. Each file becomes a slash command invoked as `/plugin-name:command-name`.

### Command Frontmatter

```yaml
---
description: What the command does (shown in command list)
argument-hint: "[expected argument placeholder]"
---
```

Both fields are required. `description` is displayed when listing available commands. `argument-hint` shows the expected input format.

### Thin Delegation Pattern (preferred)

Most commands should load a skill and pass through the argument:

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

### Inline Workflow Pattern

Use when the command orchestrates multiple skills or adds multi-step logic:

```markdown
---
description: Run a multi-task deep research pipeline on an AI topic
argument-hint: "[AI topic or technology]"
---

Load the `deep-research` skill and begin the 5-task pipeline to create
a comprehensive AI topic research article.

If a topic is provided, use it. Otherwise ask the user which AI topic
or technology to research.

This is a 5-task pipeline that must be executed one task at a time:
1. Topic Research - Background, players, history, current state
2. Data Compilation - Statistics, benchmarks, market data
3. Analysis & Synthesis - Comparative analysis and content recommendation
4. Visual Asset Generation - Charts, diagrams, infographics
5. Article Assembly - Final publication-ready article
```

## Step 4: Skills

### SKILL.md Format

Create `skills/skill-name/SKILL.md`:

```yaml
---
name: skill-name
description: >
  Describes what the skill does AND when to trigger it.
  Include 5-7 trigger phrases: "benchmark content", "compare against
  top performers", "identify quality gaps", "analyze what makes top
  content succeed", "evaluate content performance".
  Include contexts: when users want to compare their content output
  against niche leaders on any platform or format.
---
```

**Frontmatter rules:**

- Only `name` and `description` fields. No other YAML fields.
- `name`: kebab-case, must match the directory name.
- `description`: the sole trigger mechanism. All "when to use" information must be here, not in the body. Include 5-7 natural language trigger phrases covering synonyms and use-case contexts.

**Body structure:**

```markdown
# Skill Title

## Workflow

### Step 1: Define Inputs
Confirm required parameters with the user.

### Step 2: Gather Data
Describe data collection approach.

### Step 3: Analyze
Core analysis logic.

### Step 4: Deliver Output
Output format and quality standards.
```

- Lead with the workflow, not background theory.
- Use numbered steps with clear action verbs.
- Reference bundled files explicitly: "See `references/scoring-criteria.md` for details."
- Keep SKILL.md under 500 lines; move detailed content to reference files.

### Adding References

Create `references/` for detailed sub-workflows, criteria, or schemas:

```
skills/skill-name/
├── SKILL.md
├── references/
│   ├── scoring-criteria.md
│   ├── platform-guidelines.md
│   └── output-templates.md
├── scripts/
│   └── validate.py
└── assets/
    └── report-template.md
```

| Directory | Purpose | When Loaded |
|-----------|---------|-------------|
| `references/` | Domain docs, detailed criteria, examples | On demand when Claude determines relevance |
| `scripts/` | Executable code for deterministic tasks | Executed without reading into context |
| `assets/` | Templates, images used in output | Used in output, not loaded into context |

### Progressive Disclosure

Design skills so context consumption scales with need:

1. **Metadata** (~100 words) -- always loaded for trigger matching
2. **SKILL.md body** (<500 lines) -- loaded only when triggered
3. **Resources** (unlimited) -- loaded only when Claude determines they are needed

Avoid duplicating information between SKILL.md and reference files. The body should contain workflow steps and essential constraints; move detailed specs, schemas, and examples to references.

## Step 5: MCP Integration

Create `.mcp.json` at plugin root to connect external data sources:

```json
{
  "mcpServers": {
    "hacker-news": {
      "command": "npx",
      "args": ["-y", "mcp-hacker-news"]
    },
    "arxiv": {
      "command": "uvx",
      "args": ["arxiv-mcp-server"]
    },
    "rss-reader": {
      "command": "npx",
      "args": ["-y", "@kwp-lab/rss-reader-mcp"]
    }
  }
}
```

Available free MCP servers (no API keys needed):

| Server | Package | Runner | Purpose |
|--------|---------|--------|---------|
| `hacker-news` | `mcp-hacker-news` | npx | Hacker News content access |
| `arxiv` | `arxiv-mcp-server` | uvx | Academic paper search |
| `rss-reader` | `@kwp-lab/rss-reader-mcp` | npx | RSS feed reading |

If the plugin needs no external data, leave the config empty: `{ "mcpServers": {} }`.

## Step 6: Register in Marketplace

Add an entry to `.claude-plugin/marketplace.json` at the project root:

```json
{
  "name": "my-plugin",
  "source": "./my-plugin",
  "description": "Summary of plugin capabilities"
}
```

The `source` field is a relative path from project root to the plugin directory.

## The Skill Creator Meta-Skill

The `content-analysis` plugin includes a `skill-creator` meta-skill that defines the canonical extensibility contract for authoring new skills.

### Directory Structure

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter: name, description
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/       -- Executable code
    ├── references/    -- Documentation to load as needed
    └── assets/        -- Files used in output (templates, etc.)
```

### Frontmatter Requirements

- `name`: kebab-case skill name
- `description`: what the skill does AND when to trigger it. This is the primary triggering mechanism. Include content domain examples and trigger phrases.

### Progressive Disclosure Principle

- SKILL.md body: core workflow only (<500 lines)
- `references/`: detailed criteria, examples, schemas
- `assets/`: templates and output files

### Degrees-of-Freedom Framework

Match the level of specificity to the task's fragility and variability:

- **High freedom**: multiple approaches are valid or decisions depend on context
- **Medium freedom**: a preferred pattern exists but some variation is acceptable
- **Low freedom**: operations are fragile, consistency is critical, or a specific sequence must be followed

### 6-Step Creation Process

1. **Understand** -- clarify the skill's usage patterns with 2-3 concrete examples
2. **Plan** -- identify repeated work and map to reusable resources (references, assets, scripts)
3. **Initialize** -- create the directory structure with `mkdir -p skill-name/{scripts,references,assets}`
4. **Edit** -- write SKILL.md with frontmatter + workflow body
5. **Package** -- validate: frontmatter has `name` and `description`, no extraneous files, all referenced files exist
6. **Iterate** -- after real usage, tighten guidance on failure points and add reference files for recurring patterns

### Prohibitions

- No `README.md`, `CHANGELOG.md`, or any user-facing documentation
- No background context about how the skill was created
- No information Claude already knows (general writing advice, basic platform facts)
- No duplicate content across SKILL.md and reference files

## Naming Conventions

- Plugin directory: kebab-case (`content-analysis`)
- Command files: kebab-case (`check-quality.md`)
- Skill directories: kebab-case (`content-benchmark/`)
- Skill `name` in frontmatter: must match directory name

## Testing

Test commands via `/plugin-name:command-name` syntax. Skills trigger automatically when their `description` matches user intent. Changes to markdown files take effect immediately.
