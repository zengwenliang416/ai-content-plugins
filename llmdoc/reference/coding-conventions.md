# Coding Conventions

File-structure, schema, and formatting conventions for the ai-content-plugins marketplace. Covers file formats, naming rules, skill/command patterns, and output standards.

---

## 1. Plugin Directory Layout

Every plugin follows this skeleton:

```
plugin-name/
  .claude-plugin/plugin.json   # manifest (required)
  commands/                     # slash-command markdown files
  skills/                       # skill directories, each with SKILL.md
  hooks/hooks.json              # automation hooks (currently all empty)
  .mcp.json                     # MCP server config (if any)
  .claude/                      # user-local config (gitignored)
```

Five plugins exist: `content-analysis`, `topic-research`, `content-production`, `growth-ops`, `audience-management`.

The root-level `.claude-plugin/marketplace.json` registers all plugins with their source paths.

---

## 2. File Formats

| File type | Format | Location |
|---|---|---|
| Commands | Markdown (.md) | `commands/` |
| Skills | `SKILL.md` | `skills/<skill-name>/` |
| Plugin manifest | JSON | `.claude-plugin/plugin.json` |
| MCP config | JSON | `.mcp.json` (root of each plugin) |
| Hooks | JSON | `hooks/hooks.json` |
| Marketplace manifest | JSON | `.claude-plugin/marketplace.json` (repo root) |
| Skill references | Markdown (.md) | `skills/<skill-name>/references/` |
| Skill assets | Markdown (.md) | `skills/<skill-name>/assets/` |

---

## 3. Naming Rules

- **Plugin directories**: kebab-case (`content-analysis`, `topic-research`, `growth-ops`)
- **Skill directories**: kebab-case (`deep-research`, `quality-check`, `content-benchmark`)
- **Command files**: kebab-case `.md`, typically matching the skill they delegate to (`benchmark.md` -> `content-benchmark` skill, `check-quality.md` -> `quality-check` skill)
- **Reference files**: kebab-case `.md` describing content (`frameworks.md`, `schemas.md`, `quality-criteria.md`)
- **Asset files**: kebab-case `.md` (`article-template.md`, `quality-checklist.md`)

---

## 4. plugin.json Manifest

Required fields: `name`, `version`, `description`, `author.name`.

```json
{
  "name": "plugin-slug",
  "version": "0.1.0",
  "description": "One-line description",
  "author": { "name": "AI Content Studio" }
}
```

All five plugins use version `0.1.0` and author `"AI Content Studio"`. No plugin declares `commands` or `skills` arrays; discovery relies on directory conventions.

---

## 5. Command Files (`commands/*.md`)

### Frontmatter (YAML)

```yaml
---
description: One-line summary of what the command does
argument-hint: "[placeholder text]"
---
```

Both fields are standard. No other frontmatter fields are used.

### Body pattern

Thin delegation: load a named skill, handle missing argument. Body is 2-5 lines.

```markdown
Load the `skill-name` skill and [action description].

If [argument] is provided, use it. Otherwise ask the user [what to provide].
```

Some commands (e.g., `deep-research`) add a brief pipeline summary after the delegation line.

---

## 6. SKILL.md Format

Two format variants exist:

### Variant A: YAML frontmatter (preferred)

```yaml
---
name: skill-name
description: Trigger description with 5-7 trigger phrases...
---

# Skill Title

## Workflow
...
```

Used by most skills across all plugins.

### Variant B: Inline prose (no YAML fences)

```markdown
# Skill Title

description: Trigger description text...

## Workflow
...
```

Used by: `presentation`, `asset-pack`, `content-tracker` in content-production, and some growth-ops skills.

### Common structure

Regardless of variant, all SKILL.md files follow this structure:

1. **Description line** with 5-7 trigger phrases
2. **Numbered workflow steps** with clear action verbs
3. **Output section** specifying format and deliverables
4. **Important Notes** section with constraints and best practices

### Size guideline

SKILL.md should stay under 500 lines. Detailed content offloads to `references/` or `assets/` subdirectories (progressive disclosure principle).

---

## 7. Skill Resource Directories

```
skill-name/
  SKILL.md
  references/       # domain reference files (plural form)
  assets/            # templates, checklists
```

Standard directory name is `references/` (plural). Used by: `competitor-analysis`, `quality-check`, `deep-research`, `skill-creator`.

Assets are used by `deep-research` (`article-template.md`, `quality-checklist.md`).

---

## 8. hooks.json

All five plugins have `hooks/hooks.json`. All are currently empty with the schema:

```json
{
  "hooks": {}
}
```

No event-driven automation is implemented.

---

## 9. .mcp.json

MCP configs define external tool servers. Only two plugins use active MCP servers:

| Plugin | MCP Servers |
|---|---|
| `topic-research` | `hacker-news`, `arxiv`, `rss-reader` (3 servers) |
| `growth-ops` | `hacker-news`, `rss-reader` (2 servers) |
| Others | Empty `{"mcpServers": {}}` |

Server types used:
- `npx` command: `mcp-hacker-news`, `@kwp-lab/rss-reader-mcp`
- `uvx` command: `arxiv-mcp-server`

---

## 10. Command-to-Skill Mapping

The standard pattern is 1:1 command-to-skill mapping. Each command loads exactly one skill.

Exceptions in `content-production`:
- `presentation` and `asset-pack` are trigger-only skills with no corresponding command file
- These skills activate only through automatic trigger matching on their description phrases

The `skill-creator` in `content-analysis` is a cross-plugin meta-skill that defines the extensibility contract for building new skills.

---

## 11. Output Conventions

### Primary format

Markdown tables are the standard deliverable format across all plugins.

### Source citation

All data claims require source citation. Rules by plugin:

| Plugin | Citation rule |
|---|---|
| `topic-research` | No fabricated data; mark missing data as "N/A - not publicly disclosed" |
| `content-analysis` | Estimates labeled with `[E]` suffix |
| All plugins | Source and date required for each referenced data point |

### Decision frameworks

- **WRITE / MONITOR / SKIP**: Used by `topic-research` and partially by `growth-ops` for topic evaluation
- **Priority labels**: `P0` / `P1` / `P2` (used by `content-tracker`)
- **Significance ratings**: `High` / `Medium` / `Low` (shared across plugins)
- **HIGH / MEDIUM / LOW screening**: Used by `topic-screening` in `growth-ops`

### Platform support

`content-production` includes Chinese social platform support: Xiaohongshu, WeChat, Weibo.

---

## 12. Cross-Cutting Rules

1. **Skill trigger mechanism**: `name` + `description` in SKILL.md drive automatic activation. The description field is the primary trigger; include 5-7 trigger phrases.
2. **Command-to-skill delegation**: Command files load a skill by name and handle argument gathering. Do not duplicate skill workflow in the command body.
3. **Progressive disclosure**: Plugin manifest loads first, then command frontmatter, then skill frontmatter, then skill body + references. Design content for this loading order.
4. **Context efficiency**: Only add context Claude does not already have. Keep SKILL.md under 500 lines; move detailed content to reference files.
5. **No partner plugins**: Unlike some plugin marketplaces, this project has no partner-built plugins. All five plugins are first-party.
