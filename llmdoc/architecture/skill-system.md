# Skill System Architecture

Skills are the primary knowledge units in the plugin system. Each skill is a self-contained expertise module that Claude auto-triggers based on metadata matching, then loads the full workflow body on demand.

## Trigger Mechanism

Skills activate via a two-field contract in `SKILL.md`:

1. **`name`** -- unique identifier used for programmatic skill loading (e.g., `skill: "buyer-list"`)
2. **`description`** -- natural language text that Claude matches against user intent; the description typically ends with trigger phrase enumeration

Claude reads only `name` + `description` during skill discovery. The SKILL.md body (workflow, output format, references) loads **only after** a trigger match. This is progressive disclosure -- metadata is cheap, body is expensive.

### Trigger Phrase Embedding

Most first-party skills embed trigger phrases directly in the description field. Two conventions exist:

**Inline trailing format** (PE, WM, some core): Description ends with a sentence like:
```
Triggers on "find companies", "source deals", "draft founder email", ...
```

**Contextual phrases in prose** (ER, IB): The description weaves trigger-worthy phrases into the prose:
```
Use when user requests "earnings update", "quarterly update", "Q1/Q2/Q3/Q4 results", ...
```

**S&P Global extended format**: Multi-paragraph description enumerating all trigger conditions, audience types, and scope boundaries. The `tear-sheet` skill description is ~80 words covering 6+ trigger scenarios.

## SKILL.md Format Variants

### Variant A: YAML Frontmatter (Standard)

Used by: LSEG (all 8), S&P Global (all 3), core (`comps-analysis`, `dcf-model`, `3-statements`, `check-deck`, `check-model`, `lbo-model`, `ppt-template-creator`, `skill-creator`), ER (all 9), IB (`strip-profile`).

```yaml
---
name: bond-relative-value
description: Perform relative value analysis on bonds...
---
# Bond Relative Value Analysis
[body]
```

### Variant B: Inline Prose Description

Used by: PE (all 9), WM (all 6), IB (7 of 8 -- all except `strip-profile`), core (`competitive-analysis`).

```markdown
# Deal Sourcing

description: PE deal sourcing workflow -- discover target companies...
Triggers on "find companies", "source deals", ...

## Workflow
[body]
```

No `---` delimiters. The `description:` field appears as plain text below the heading. Claude's skill loader must handle both formats.

## Progressive Disclosure Layers

Skills load information in stages to minimize context consumption:

```
Layer 0: name + description (frontmatter)     -- always loaded during discovery
Layer 1: SKILL.md body                         -- loaded on trigger match
Layer 2: references/ directory                 -- loaded on demand by skill instructions
Layer 3: scripts/ directory                    -- executed when skill workflow requires
Layer 4: assets/ directory                     -- templates and checklists loaded as needed
```

### Resource Subdirectories

| Directory | Purpose | Examples |
|-----------|---------|----------|
| `references/` | Domain knowledge, formatting rules, workflow details | `formulas.md`, `report-structure.md`, `equity-research.md` |
| `scripts/` | Python/JS helper scripts for validation or generation | `validate_dcf.py`, `extract_numbers.py`, `init_skill.py` |
| `assets/` | Templates, checklists, quality gates | `report-template.md`, `quality-checklist.md` |

**Naming exception**: `pitch-deck` uses `reference/` (singular). All other skills use `references/` (plural).

## Skill Inventory

52 skills across 7 plugins:

### financial-analysis (9 skills)

| Directory | Frontmatter `name` | Trigger Context | Resources |
|-----------|-------------------|-----------------|-----------|
| `3-statements/` | `3-statements` | 3-statement model template filling | references: 3 files |
| `check-deck/` | `check-deck` | Presentation QC (4 dimensions) | scripts: 1, references: 2 |
| `check-model/` | `check-model` | Excel model debugging and audit | -- |
| `competitive-analysis/` | `competitive-analysis` | Competitive landscape mapping | references: 2 |
| `comps-analysis/` | `fsi-comps-analysis` | Comparable company analysis | -- |
| `dcf-model/` | `dcf-model` | DCF equity valuation | scripts: 1 |
| `lbo-model/` | `lbo-model` | LBO model template filling | -- |
| `ppt-template-creator/` | `ppt-template-creator` | Meta-skill: create PPT template skills | -- |
| `skill-creator/` | `skill-creator` | Meta-skill: author new skills | scripts: 3, references: 2 |

### investment-banking (8 skills)

| Directory | Frontmatter `name` | Trigger Context | Resources |
|-----------|-------------------|-----------------|-----------|
| `buyer-list/` | `buyer-list` | Build buyer universe for sell-side | -- |
| `cim-builder/` | `cim-builder` | Draft Confidential Information Memorandum | -- |
| `datapack-builder/` | `datapack-builder` | Build M&A data pack (orphaned -- no command) | -- |
| `deal-tracker/` | `deal-tracker` | Track deal pipeline and milestones | -- |
| `merger-model/` | `merger-model` | Accretion/dilution merger model | -- |
| `pitch-deck/` | `pitch-deck` | Populate PPT template (not from scratch) | reference: 4 files |
| `process-letter/` | `process-letter` | Draft process/bid instruction letters | -- |
| `strip-profile/` | `fsi-strip-profile` | Company one-pager for pitch books | -- |
| `teaser/` | `teaser` | Anonymous sell-side teaser | -- |

### equity-research (9 skills)

| Directory | Frontmatter `name` | Trigger Context | Resources |
|-----------|-------------------|-----------------|-----------|
| `catalyst-calendar/` | `catalyst-calendar` | Event/catalyst calendar tracking | -- |
| `earnings-analysis/` | `earnings-analysis` | Post-earnings update report (24-48h turnaround) | references: 3 files |
| `earnings-preview/` | `earnings-preview` | Pre-earnings scenario analysis | -- |
| `idea-generation/` | `idea-generation` | Stock screening and idea generation | -- |
| `initiating-coverage/` | `initiating-coverage` | 5-task initiating coverage pipeline | references: 6, assets: 2 |
| `model-update/` | `model-update` | Refresh estimates with new data | -- |
| `morning-note/` | `morning-note` | Daily morning meeting note | -- |
| `sector-overview/` | `sector-overview` | Sector/industry deep dive | -- |
| `thesis-tracker/` | `thesis-tracker` | Investment thesis tracking and scoring | -- |

### private-equity (9 skills)

| Directory | Frontmatter `name` | Trigger Context | Resources |
|-----------|-------------------|-----------------|-----------|
| `deal-sourcing/` | `deal-sourcing` | Company discovery + founder outreach | -- |
| `deal-screening/` | `deal-screening` | CIM/teaser triage with pass/fail criteria | -- |
| `dd-meeting-prep/` | `dd-meeting-prep` | Diligence meeting question generation | -- |
| `dd-checklist/` | `dd-checklist` | Multi-workstream DD tracker | -- |
| `ic-memo/` | `ic-memo` | Investment committee memo (9 sections) | -- |
| `portfolio-monitoring/` | `portfolio-monitoring` | Portfolio company KPI tracking with RAG flags | -- |
| `returns-analysis/` | `returns-analysis` | IRR/MOIC sensitivity tables | -- |
| `unit-economics/` | `unit-economics` | ARR bridge, cohort analysis, LTV/CAC | -- |
| `value-creation-plan/` | `value-creation-plan` | Post-acquisition 100-day plan + EBITDA bridge | -- |

### wealth-management (6 skills)

| Directory | Frontmatter `name` | Trigger Context | Resources |
|-----------|-------------------|-----------------|-----------|
| `client-review/` | `client-review` | Quarterly client review meeting prep | -- |
| `financial-plan/` | `financial-plan` | Full financial plan (Monte Carlo, goals) | -- |
| `portfolio-rebalance/` | `portfolio-rebalance` | Drift analysis + tax-aware rebalancing | -- |
| `client-report/` | `client-report` | Branded performance report generation | -- |
| `tax-loss-harvesting/` | `tax-loss-harvesting` | TLH opportunity scanning + wash sale tracking | -- |
| `investment-proposal/` | `investment-proposal` | Prospect pitch presentation | -- |

### partner-built/lseg (8 skills)

| Directory | Frontmatter `name` | Trigger Context | Resources |
|-----------|-------------------|-----------------|-----------|
| `bond-relative-value/` | `bond-relative-value` | Bond rich/cheap analysis with spread decomposition | -- |
| `bond-futures-basis/` | `bond-futures-basis` | Bond futures CTD and basis analytics | -- |
| `fx-carry-trade/` | `fx-carry-trade` | FX carry trade analysis | -- |
| `option-vol-analysis/` | `option-vol-analysis` | Options vol surface and Greeks | -- |
| `swap-curve-strategy/` | `swap-curve-strategy` | Swap curve analysis and trade recs | -- |
| `macro-rates-monitor/` | `macro-rates-monitor` | Macro dashboard with yield curve snapshot | -- |
| `equity-research/` | `equity-research` | Consensus + fundamentals equity analysis | -- |
| `fixed-income-portfolio/` | `fixed-income-portfolio` | FI portfolio review with scenario P&L | -- |

### partner-built/spglobal (3 skills)

| Directory | Frontmatter `name` | Trigger Context | Resources |
|-----------|-------------------|-----------------|-----------|
| `tear-sheet/` | `tear-sheet` | Company profile (4 audience types) | references: 4 files |
| `earnings-preview-beta/` | `earnings-preview-beta` | Earnings preview (HTML + Chart.js) | `report-template.md` |
| `funding-digest/` | `funding-digest` | Funding activity dashboard (PPTX) | references: 1 file |

## Complexity Spectrum

Skills range from single-step notes to multi-task pipelines:

### Simple (single output, 3-4 steps)
`morning-note` -- 4-step workflow producing a 1-page markdown note (2-minute read target).

### Medium (structured output, 5-6 steps)
`buyer-list` -- 6-step workflow producing a multi-tab Excel workbook with tiered buyer scoring.

### Complex Pipeline (multi-task with verification gates)
`initiating-coverage` -- 5 sequential tasks with dependency constraints:
```
Task 1: Company Research (independent)        -> 6-8K word .md
Task 2: Financial Modeling (independent)      -> 6-tab Excel
Task 3: Valuation (requires Task 2)           -> 4-6 page .md + 4 Excel tabs
Task 4: Chart Generation (requires 1+2+3)     -> 25-35 PNG/JPG charts
Task 5: Report Assembly (requires all)        -> 30-50 page .docx
```
Each task completes with a verification gate before the next begins.

## Meta-Skills

Two skills exist to create other skills:

### skill-creator
Authoring guide for new skills. Contains `init_skill.py` (scaffold directory), `package_skill.py` (bundle), and `quick_validate.py` (lint). Also provides `references/output-patterns.md` and `references/workflows.md` as pattern libraries.

### ppt-template-creator
Generates PPT template skills from `.pptx` files. The generated skills can then be referenced by other commands -- notably, the `one-pager` command checks for user-created PPT template skills before invoking `strip-profile`.

## Cross-Plugin Skill Invocation

Skills can be referenced across plugin boundaries:

- `dcf` command (core) explicitly chains into `comps-analysis` skill as a prerequisite step
- `one-pager` command (IB) checks for PPT template skills that may have been created via `ppt-template-creator` (core)

## Known Inconsistencies

| Issue | Detail |
|-------|--------|
| Name mismatch: `comps-analysis` | Directory is `comps-analysis/`, frontmatter `name` is `fsi-comps-analysis` |
| Name mismatch: `strip-profile` | Directory is `strip-profile/`, frontmatter `name` is `fsi-strip-profile` |
| Command-skill name mismatch | `screen` command loads `idea-generation` skill |
| Orphaned skill | `datapack-builder` has no corresponding command; only invokable via direct skill reference |
| Reference dir naming | `pitch-deck` uses singular `reference/`; all others use plural `references/` |

## Important Notes Pattern

30 of 52 skills include a trailing `## Important Notes` section. This is a consistent structural pattern across PE, WM, ER, and IB skills (absent from LSEG and S&P Global partner skills). The section contains:

- Compliance and regulatory reminders (fiduciary duty, disclosure requirements)
- Behavioral guidelines (always verify with user, never fabricate data)
- Output quality constraints (formatting standards, review before delivery)
- Scope boundaries (what the skill should NOT attempt)

This section functions as a soft guardrail -- advisory, not enforced programmatically.
