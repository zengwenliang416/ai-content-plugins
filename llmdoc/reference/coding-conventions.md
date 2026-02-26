# Coding Conventions

File-structure, schema, and formatting conventions for the financial-services-plugins marketplace. Covers both the intended standard and known deviations.

---

## 1. Plugin Directory Layout

Every plugin (first-party and partner-built) follows this skeleton:

```
plugin-name/
  .claude-plugin/plugin.json   # manifest (required)
  commands/                     # slash-command markdown files
  skills/                       # skill directories, each with SKILL.md
  hooks/hooks.json              # automation hooks
  .mcp.json                     # MCP server config (if any)
  .claude/                      # user-local config (gitignored)
```

Partner plugins live under `partner-built/<name>/` and use the same layout.

---

## 2. plugin.json Manifest

**Minimum required fields:** `name`, `version`, `description`, `author.name`.

```json
{
  "name": "plugin-slug",
  "version": "0.1.0",
  "description": "One-line description",
  "author": { "name": "Anthropic FSI" }
}
```

**Extended fields** (used by S&P Global only): `homepage`, `repository`, `license`, `keywords`, `mcpServers`.

### Known inconsistencies

| Issue | Detail |
|---|---|
| Version drift | `financial-analysis` 0.1.0, `investment-banking` 0.2.0, partner plugins 1.0.0 |
| Author name variance | `"Anthropic"` vs `"Anthropic FSI"` vs partner names |
| `mcpServers` placement | S&P Global embeds in both `plugin.json` AND `.mcp.json` (duplication) |
| No discovery fields | No plugin declares `commands` or `skills` arrays; relies on path convention |

---

## 3. Command Files (`commands/*.md`)

### Frontmatter (YAML)

```yaml
---
description: One-line summary of what the command does
argument-hint: "[placeholder text]"
---
```

Optional field: `allowed-tools` (array of tool names). Only `ppt-template` uses this.

### Body patterns

Two accepted patterns:

1. **Thin delegation** (preferred for most commands): Load a named skill, handle missing argument. Body is 2-5 lines.
2. **Inline workflow** (acceptable for complex orchestration): Multi-step numbered workflow embedded directly. Used by `comps`, `dcf`, `one-pager`, `earnings`.

LSEG commands add a `> See [CONNECTORS.md]` blockquote linking to their tool reference. This is partner-specific and not required for first-party plugins.

### Known inconsistencies

- `datapack-builder` skill has no corresponding command (orphaned skill).
- `screen` command loads `idea-generation` skill (name mismatch).
- Inline-workflow commands partially duplicate their skill's content.

---

## 4. SKILL.md Format

### Frontmatter variants

**Standard (YAML frontmatter):**

```yaml
---
name: skill-name
description: Trigger description text
---
```

Used by: `financial-analysis`, `investment-banking`, `equity-research`, LSEG, S&P Global.

**Inline prose (no YAML fences):**

```markdown
# Skill Title

description: Trigger description text...

## Workflow
```

Used by: `private-equity`, `wealth-management`, `check-model`.

**Hybrid (YAML name only, description as body prose):**

```yaml
---
name: check-model
---

# Model Checker

description: Trigger text...
```

Used by: `check-model` in `financial-analysis`.

### Intended standard

Use YAML frontmatter with both `name` and `description`. The `name` field drives skill loading; the `description` field drives automatic trigger matching. Body content loads only after trigger.

### Known inconsistencies

| Issue | Detail |
|---|---|
| PE/WM use inline prose | No YAML fences; `description:` is a bare line in the body |
| `check-model` hybrid | YAML has `name` only; `description` appears as body text |
| `comps-analysis` name mismatch | Directory `comps-analysis/` but frontmatter `name: fsi-comps-analysis` |
| S&P Global trigger length | `description` field is multi-paragraph (100+ words) vs typical 1-2 sentences |

---

## 5. Skill Resource Directories

Skills may contain subdirectories for supporting content:

```
skill-name/
  SKILL.md
  references/       # domain reference files (plural)
  scripts/           # Python helper scripts
  assets/            # templates, checklists
  examples/          # example output files
```

### `reference` vs `references` naming

| Directory name | Where used |
|---|---|
| `references/` (plural) | `3-statements`, `check-deck`, `competitive-analysis`, `skill-creator`, `earnings-analysis`, `initiating-coverage`, S&P Global skills |
| `reference/` (singular) | `pitch-deck` only |

**Intended standard:** `references/` (plural). The singular `reference/` in `pitch-deck` is an outlier.

---

## 6. hooks.json Schema

All current hooks files are empty. Two schemas exist:

| Schema | Plugins using it |
|---|---|
| `[]` (empty array) | `financial-analysis`, `equity-research`, `private-equity`, `wealth-management` |
| `{"hooks": {}}` (object wrapper) | `investment-banking` |

No standard has been established. Both schemas coexist.

---

## 7. .mcp.json Format

```json
{
  "mcpServers": {
    "provider-key": {
      "type": "http",
      "url": "https://..."
    }
  }
}
```

`financial-analysis` is the sole MCP data hub (11 connectors). Add-on plugins have empty or absent `.mcp.json` files. Partner plugins define their own MCP endpoints.

### MCP data source hierarchy (enforced by core skills)

1. MCP tools first (S&P Kensho, FactSet, Daloopa, etc.)
2. Bloomberg terminal / SEC filings as fallback
3. Web search is never the primary data source

This hierarchy is explicit in core `financial-analysis` skills but not enforced by add-on plugin skills.

### Known inconsistencies

| Issue | Detail |
|---|---|
| LSEG key collision | Both `financial-analysis/.mcp.json` and `partner-built/lseg/.mcp.json` define an `lseg` key pointing to the same endpoint |
| S&P Global duplication | MCP config in both `plugin.json` and `.mcp.json` |
| Missing `.mcp.json` | `equity-research` and `wealth-management` have no `.mcp.json` at all |

---

## 8. Excel Output Conventions

### Formula-only calculations

All Excel outputs must use formulas for every calculated cell. Never hardcode a computed value. This is cross-cutting but not formally documented in a single location; each skill enforces it independently.

### Cell font color coding

**3-color system** (used by most skills):

| Color | Hex | Meaning |
|---|---|---|
| Blue | `#0000FF` | Hardcoded inputs |
| Black | `#000000` | Formulas / calculations |
| Green | `#008000` | Links to other sheets |

Skills using 3-color: `check-model`, `datapack-builder`, `comps-analysis`, `3-statements`, `dcf-model`.

**4-color system** (LBO-specific):

| Color | Hex | Meaning |
|---|---|---|
| Blue | `#0000FF` | Hardcoded inputs |
| Black | `#000000` | Formulas with operators/functions |
| Purple | `#800080` | Same-tab cell references (no calculation) |
| Green | `#008000` | Cross-tab references |

Skills using 4-color: `lbo-model` only. The 4-color system splits "formula" into "calculated formula" (black) and "direct reference" (purple/green by tab scope).

### Additional formatting rules

- Input cells: blue text + light green fill (used by `dcf-model`)
- Every blue input should have a cell comment documenting the assumption
- Comps: statistics rows (Max/75th/Median/25th/Min) apply to ratio columns only, never to absolute size metrics

---

## 9. Output File Naming

Skills that produce files follow this pattern:

```
[Company]_[ArtifactType]_[YYYY-MM-DD].[ext]
```

Examples from skills:
- `CompanyName_DataPack_YYYY-MM-DD.xlsx`
- `[Company]_Q[Quarter]_[Year]_Earnings_Update.docx`

---

## 10. Partner Plugin Differences

Partner plugins (LSEG, S&P Global) diverge from first-party conventions in several ways:

| Aspect | First-party | LSEG | S&P Global |
|---|---|---|---|
| Output format | Markdown / Excel | Markdown tables | Binary (DOCX, HTML, PPTX) |
| npm dependencies | None | None | `docx`, `pptxgenjs`, `simple-icons`, `sharp` |
| Intermediate files | None | None | Mandatory (`/tmp/` pipeline) |
| AI disclaimer | Not required | Not required | Mandatory (3 locations) |
| Data integrity rules | Implicit | Implicit | Explicit numbered section (10+ rules) |
| CONNECTORS.md | Not used | Yes (tool catalog) | Not used |
| Commands | Yes | Yes (1:1 with skills) | None (trigger-only) |
| Licensing | Unspecified | Unspecified | Apache-2.0 |

---

## 11. Cross-Cutting Rules

1. **Skill trigger mechanism**: `name` + `description` in SKILL.md frontmatter drive automatic activation. Body loads post-trigger.
2. **Command-to-skill delegation**: Thin command files should load a skill by name and handle argument gathering. Avoid duplicating skill workflow in the command body.
3. **No web search as primary source**: Core skills enforce MCP-first data retrieval. Add-on and partner skills should follow the same hierarchy.
4. **Formula-only Excel**: Every calculated cell must be a formula. No hardcoded computed values.
5. **Progressive disclosure**: Plugin metadata (manifest) loads first, then command frontmatter, then skill frontmatter, then skill body + references. Design content for this loading order.
