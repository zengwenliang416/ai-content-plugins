# Guide: Creating Plugins

## Quick Start

1. Create the plugin directory structure
2. Write `plugin.json` manifest
3. Add commands
4. Add skills
5. (Optional) Add hooks, MCP config, user config template

## Step 1: Directory Structure

```bash
mkdir -p my-plugin/.claude-plugin
mkdir -p my-plugin/commands
mkdir -p my-plugin/skills
mkdir -p my-plugin/hooks
```

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

Optional fields for partner/public plugins: `homepage`, `repository`, `license`, `keywords`, `email` (in author object), `mcpServers` (can also live in `.mcp.json`).

## Step 3: Commands

Create markdown files in `commands/`. Each file becomes a slash command invoked as `/plugin-name:command-name`.

### Command Frontmatter

```yaml
---
description: What the command does (shown in command list)
argument-hint: "[expected argument placeholder]"
---
```

### Thin Delegation Pattern (preferred)

Most commands should be thin wrappers that load a skill:

```markdown
---
description: Build an LBO model for a PE acquisition
argument-hint: "[company name or deal details]"
---

Load the `lbo-model` skill and build a leveraged buyout model for the specified company.

If a company name is provided as an argument, use it. Otherwise ask the user for the target company and deal parameters.
```

### Inline Workflow Pattern

Use only when the command orchestrates multiple skills or adds pre/post-processing logic that does not belong in any single skill:

```markdown
---
description: Build a DCF valuation with comps-informed terminal multiples
argument-hint: "[company name or ticker]"
---

## Workflow

### Step 1: Gather Company Information
Parse input or ask the user.

### Step 2: Run Comparable Company Analysis
Load `comps-analysis` skill to build trading comps.
Capture median EV/EBITDA, growth rates, margins.

### Step 3: Build DCF Model
Load `dcf-model` skill using comps output to inform assumptions.

### Step 4: Cross-Check Valuation
Validate implied multiples against peer medians.

### Step 5: Deliver Output
Provide comps spreadsheet, DCF model, and summary.
```

Examples of inline workflow commands: `dcf` (skill chaining), `one-pager` (template detection + skill loading), `earnings` (timeliness check + skill loading).

## Step 4: Skills

### Using the Skill Creator

The canonical way to create skills is via the `skill-creator` meta-skill in the core plugin. It provides:

- `scripts/init_skill.py <skill-name> --path <output-dir>` -- scaffolds the directory with SKILL.md template and example resource directories
- `scripts/package_skill.py <path/to/skill>` -- validates and packages into a distributable `.skill` file

### Manual SKILL.md Authoring

Create `skills/skill-name/SKILL.md`:

```yaml
---
name: skill-name
description: >
  Describes what the skill does AND when to trigger it.
  Include trigger phrases: "buyer list", "buyer universe", "potential acquirers".
  Include contexts: when users want to identify strategic buyers for a sell-side process.
---
```

**Frontmatter rules:**
- Only `name` and `description` fields. No other YAML fields (except optional `license`).
- `description` is the sole trigger mechanism. All "when to use" information must be here, not in the body.
- Be comprehensive: list trigger phrases, synonyms, and use-case contexts.

**Body structure:**

```markdown
## Core Principles
Key constraints and non-obvious rules Claude must follow.

## Workflow
### Step 1: ...
### Step 2: ...

## Output Format
What the skill produces (file types, structure, quality standards).

## Important Notes
Guardrails, anti-patterns, edge cases.
```

Keep the body under 500 lines. Move detailed reference material to `references/` files and link from SKILL.md.

### Bundled Resources

#### `scripts/`
Executable code for deterministic or repetitive operations.

```
scripts/validate_dcf.py    # Validation logic
scripts/extract_numbers.py # Data extraction
scripts/init_skill.py      # Scaffolding tool
```

Test scripts by running them before packaging.

#### `references/`
Documentation loaded on demand to inform Claude's process.

```
references/formulas.md      # Financial formula reference
references/formatting.md    # Output formatting standards
references/equity-research.md  # Audience-specific variant
```

For large reference files (>100 lines), include a table of contents. For files >10k words, include grep search patterns in SKILL.md.

Organize by domain or variant when a skill supports multiple modes:

```
references/
├── equity-research.md   # Audience: ER analysts
├── ib-ma.md             # Audience: IB/M&A bankers
├── corp-dev.md          # Audience: Corporate development
└── sales-bd.md          # Audience: Sales/BD teams
```

#### `assets/`
Files used in output, not loaded into context (templates, images, fonts).

```
assets/report-template.md   # Document template
assets/logo.png              # Brand asset
```

### Progressive Disclosure

Design skills so context consumption scales with need:

1. **Metadata** (~100 words) -- always loaded for trigger matching
2. **SKILL.md body** (<500 lines) -- loaded only when triggered
3. **Resources** (unlimited) -- loaded only when Claude determines they are needed

Avoid duplicating information between SKILL.md and reference files. The body should contain workflow steps and essential constraints; move schemas, examples, and detailed specs to references.

## Step 5: Optional Components

### MCP Configuration

Create `.mcp.json` at plugin root:

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

For most add-on plugins, leave this empty or omit -- they rely on the core `financial-analysis` plugin for MCP data access.

### Hooks

Create `hooks/hooks.json`:

```json
[]
```

Currently unused across all plugins. Reserve for future event-driven automation.

### User Configuration

Create `.claude/plugin-name.local.md.example` with configurable parameters:

```markdown
# User Configuration
- Firm: [Your firm name]
- Role: [Your role]
- Coverage sectors: [Your sectors]
- Default valuation assumptions: [...]
```

Actual `.local.md` files are gitignored.

## Testing

Test commands via `/plugin-name:command-name` syntax in Claude. Skills trigger automatically when their `description` matches user intent.

## Naming Conventions

- Plugin directory: kebab-case (`investment-banking`)
- Command files: kebab-case (`buyer-list.md`)
- Skill directories: kebab-case (`comps-analysis/`)
- Skill `name` in frontmatter: should match directory name (note: `fsi-comps-analysis` vs `comps-analysis/` is a known inconsistency to avoid)

## Partner Plugin Considerations

Partner plugins under `partner-built/` may include:
- `LICENSE` file (e.g., Apache-2.0)
- `README.md` with setup instructions
- `CONNECTORS.md` for MCP tool reference (LSEG pattern)
- Richer `plugin.json` with homepage, repository, keywords
- Self-contained MCP endpoints (not dependent on core plugin)
- Skills that generate binary output (DOCX, HTML, PPTX) with npm dependencies (`docx`, `pptxgenjs`)
- Intermediate file pipelines (`/tmp/` writes between MCP calls)
- AI disclaimer requirements in output
- Data integrity rule sections in SKILL.md
