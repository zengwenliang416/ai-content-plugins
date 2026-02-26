# Skill Patterns Guide

Practical patterns for authoring, structuring, and maintaining skills in the financial services plugin system.

## Anatomy of a SKILL.md

A well-structured skill follows this section order:

```
1. Frontmatter (name + description with trigger phrases)
2. Title heading
3. Persona declaration (optional -- "You are an expert X")
4. Core principles or data source priority (optional)
5. Workflow steps (numbered phases)
6. Output format specification
7. Important Notes (compliance, behavioral guidelines)
```

### Frontmatter

Two accepted formats exist (see `architecture/skill-system.md` for details). Prefer YAML frontmatter for new skills:

```yaml
---
name: my-skill
description: One-paragraph description ending with trigger phrases. Use when user requests "phrase 1", "phrase 2", or "phrase 3".
---
```

Rules:
- `name` must match the skill directory name (avoid mismatches like `comps-analysis/` vs `fsi-comps-analysis`)
- `description` should be a single paragraph; put detailed workflow in the body, not here
- End description with trigger phrases quoted in double quotes
- Include both natural language triggers ("can I retire") and technical terms ("retirement plan")

### Persona Declaration

Optional but used by LSEG and some first-party skills. Sets domain expertise context:

```markdown
You are an expert fixed income analyst specializing in relative value.
```

Keep to one sentence. Avoid generic personas ("You are a helpful assistant").

### Workflow Steps

Number all steps. Each step should have:
- Clear action verb (Gather, Analyze, Build, Generate, Verify)
- Input specification (what data is needed)
- Output specification (what this step produces)

### Output Format

Specify the artifact type, filename convention, and structure:

```markdown
## Output
- **Format**: Excel workbook (.xlsx)
- **Filename**: `[Company]_Buyer_List_YYYY-MM-DD.xlsx`
- **Tabs**: Strategic Buyers, Financial Sponsors, Contact Map, Summary
```

### Important Notes

Place compliance, behavioral, and scope boundaries at the end:

```markdown
## Important Notes
- All projections are illustrative; verify with client's legal and tax advisors
- Never fabricate financial data -- use MCP sources or ask the user
- This skill does not replace professional [legal/tax/investment] advice
```

This pattern appears in 30 of 52 skills across PE, WM, ER, and IB plugins.

## Command-to-Skill Delegation

### Thin Delegation (Preferred)

Most commands are thin wrappers that load a named skill and handle argument gathering:

```markdown
---
description: Build a buyer universe for a sell-side process
argument-hint: [company name or deal context]
---

Load the `buyer-list` skill.
If no company or deal context was provided, ask the user.
```

Advantages: single source of truth (the skill), easy to maintain, no workflow duplication.

### Inline Workflow (Use Sparingly)

Two commands embed significant workflow logic alongside skill delegation: `one-pager` (IB) and `earnings` (ER). This creates a maintenance burden -- changes must be synchronized between the command and the skill.

Use inline workflow only when the command needs orchestration logic that spans multiple skills or requires pre-flight checks (e.g., `one-pager` checks for user-created PPT template skills before invoking `strip-profile`).

### No-Command Pattern (Partner)

S&P Global skills have no commands at all. They activate purely via description-based trigger matching. This works when trigger phrases are comprehensive but reduces discoverability -- users cannot browse available commands.

LSEG maintains 1:1 command-to-skill mapping with explicit MCP tool calls in commands.

## Reference File Organization

### Standard: `references/` (plural)

```
skill-name/
├── SKILL.md
└── references/
    ├── workflow.md
    ├── report-structure.md
    └── best-practices.md
```

Used by: `3-statements`, `check-deck`, `competitive-analysis`, `skill-creator`, `earnings-analysis`, `initiating-coverage`, `tear-sheet`, `funding-digest`.

### Exception: `reference/` (singular)

```
pitch-deck/
├── SKILL.md
└── reference/
    ├── formatting-standards.md
    ├── slide-templates.md
    ├── xml-reference.md
    └── calculation-standards.md
```

Only `pitch-deck` uses singular form. New skills should use `references/` (plural).

### Audience-Specific References

The `tear-sheet` skill (S&P Global) organizes references by audience type:
```
references/
├── equity-research.md
├── ib-ma.md
├── corp-dev.md
└── sales-bd.md
```

This pattern suits skills that produce variant outputs for different user personas.

## Writing Effective Trigger Phrases

### Coverage Rules

1. Include the **canonical term** ("earnings preview")
2. Include **natural language variants** ("what to watch for [company] earnings")
3. Include **abbreviations** ("TLH" for tax-loss harvesting, "CIM" for confidential information memorandum)
4. Include **action-oriented phrases** ("draft founder email", "screen this deal")
5. Include **question forms** ("can I retire", "is my thesis still intact")

### S&P Global Extended Triggers

For skills with complex activation conditions, the description can enumerate:
- Primary trigger scenarios
- Audience types supported
- Scope boundaries (what the skill handles vs. does not)
- Fallback behavior (e.g., "If the user doesn't specify an audience, ask")

## Multi-Task Pipeline Pattern

For complex deliverables requiring sequential phases with dependencies, use the `initiating-coverage` pattern:

### Structure

```markdown
## Task Overview
| Task | Deliverable | Prerequisites | Format |
|------|------------|---------------|--------|
| 1 | Company Research | None | Markdown |
| 2 | Financial Modeling | None | Excel |
| 3 | Valuation Analysis | Task 2 | Markdown + Excel |
| 4 | Chart Generation | Tasks 1-3 | PNG/JPG |
| 5 | Report Assembly | Tasks 1-4 | Word |
```

### Rules
- Execute one task at a time
- Verify completion before starting the next
- Independent tasks (1, 2) can be presented in either order but still execute sequentially
- Each task has its own reference file (`references/task1-*.md`, etc.)
- Define explicit quality gates between tasks

### When to Use
- Deliverable requires 3+ distinct artifact types
- Later phases depend on earlier phase outputs
- Total output exceeds 10,000 words or 20+ pages

## Output Artifact Conventions

| Type | Extension | Generation Method | Typical Skills |
|------|-----------|-------------------|---------------|
| Excel | `.xlsx` | Direct file creation | comps, LBO, merger-model, returns-analysis, buyer-list |
| Word | `.docx` | Direct or docx-js (partner) | CIM, IC memo, earnings update, tear-sheet |
| PowerPoint | `.pptx` | PptxGenJS | strip-profile, funding-digest, investment-proposal |
| HTML | `.html` | Template with embedded Chart.js | earnings-preview-beta |
| Markdown | `.md` | Direct text output | morning-note, thesis-tracker, company research |
| PDF | `.pdf` | Derived from Word/HTML | teaser (secondary), client-report |

### Filename Conventions
```
[Company]_[ArtifactType]_YYYY-MM-DD.ext
```
Examples: `Acme_DataPack_2026-02-25.xlsx`, `Tesla_Q4_2025_Earnings_Update.docx`

### Partner Binary Output Pattern

S&P Global skills generate binary files (DOCX, HTML, PPTX) using npm libraries (`docx`, `pptxgenjs`, `chart.js`). These skills embed component function libraries directly in SKILL.md to enforce consistent styling:

```markdown
## Component Functions
- `createHeaderBanner(doc, companyName, ticker)` -- navy banner with white text
- `createSectionHeader(doc, title)` -- primary color, 11pt bold
- `createTable(doc, headers, rows)` -- alternating row fills
```

### Intermediate File Pipeline

S&P Global skills write MCP data to intermediate files (`/tmp/tear-sheet/`, `/tmp/earnings-preview/`) before document generation. This guards against context compression losing data mid-workflow.

## Anti-Patterns

### Identified from cross-plugin analysis

| Anti-Pattern | Where Found | Recommendation |
|--------------|-------------|----------------|
| Command duplicates skill workflow | `earnings.md`, `one-pager.md` | Keep workflow in SKILL.md only; command should be thin delegation |
| Skill name != directory name | `comps-analysis/` -> `fsi-comps-analysis`, `strip-profile/` -> `fsi-strip-profile` | Match frontmatter `name` to directory name |
| Orphaned skill (no command) | `datapack-builder` | Add a command or document the intended invocation path |
| Missing example files referenced in SKILL.md | `comps-analysis`, `lbo-model`, `competitive-analysis` | Either add the files or remove the references |
| Wrong cross-skill path | `lbo-model` references `/mnt/skills/public/xlsx/recalc.py` | Use relative paths or document the actual script location |
| Singular `reference/` directory | `pitch-deck` | Standardize to `references/` (plural) |
| Hooks format inconsistency | IB uses `{"hooks": {}}`, ER uses `[]` | Pick one schema |
| Hardcoded `/tmp/` paths | S&P Global skills | Use configurable output directory |
