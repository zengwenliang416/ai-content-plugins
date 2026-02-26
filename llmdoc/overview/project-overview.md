# Project Overview: Financial Services Plugins

## Purpose

A marketplace of Claude Cowork/Claude Code plugins for financial services professionals. Targets investment bankers, equity researchers, PE investors, wealth managers, and data vendors. All plugins are file-based (markdown + JSON) — no compiled code infrastructure. Plugins extend Claude's capabilities with domain-specific slash commands, skills (knowledge files), hooks, and MCP data connectors.

## Architecture

```
marketplace (repo root)
  └── plugin/
       ├── .claude-plugin/plugin.json   # manifest: name, version, description, author
       ├── commands/*.md                # slash commands (thin wrappers → skill delegation)
       ├── skills/*/SKILL.md            # knowledge + workflows (auto-triggered by name/description match)
       │    ├── references/             # supplementary knowledge files
       │    ├── scripts/                # validation/helper scripts (Python)
       │    └── assets/                 # templates, checklists
       ├── hooks/hooks.json             # event-driven automation (currently empty across all plugins)
       ├── .mcp.json                    # MCP server connections (HTTP remote)
       └── .claude/*.local.md           # user-specific config (gitignored)
```

**Key architectural flow:** User invokes `/plugin:command` → command.md loads named skill → SKILL.md provides full workflow + references. Some commands embed inline workflows (anti-pattern; creates maintenance burden with skill duplication).

## Plugin Inventory

| Plugin | Path | Version | Type | Commands | Skills | MCP Servers | Notes |
|--------|------|---------|------|----------|--------|-------------|-------|
| financial-analysis | `financial-analysis/` | 0.1.0 | Core (1st-party) | 8 | 9 | 11 | Sole MCP data hub for marketplace |
| investment-banking | `investment-banking/` | 0.2.0 | Add-on (1st-party) | 7 | 8 | 0 | 1 orphaned skill (datapack-builder) |
| equity-research | `equity-research/` | 0.1.0 | Add-on (1st-party) | 9 | 9 | 0 | No .mcp.json, no .local.md.example |
| private-equity | `private-equity/` | 0.1.0 | Add-on (1st-party) | 9 | 9 | 0 | Empty .mcp.json |
| wealth-management | `wealth-management/` | 0.1.0 | Add-on (1st-party) | 6 | 6 | 0 | No .mcp.json |
| LSEG | `partner-built/lseg/` | 1.0.0 | Partner | 8 | 8 | 1 | 1:1 command-skill mapping; CONNECTORS.md tool catalog |
| S&P Global | `partner-built/spglobal/` | 0.1.0 | Partner | 0 | 3 | 1 | No commands; trigger-only; binary outputs (DOCX/HTML/PPTX) |
| **Totals** | | | | **47** | **52** | **13** | |

## Key Architectural Patterns

### 1. Command-to-Skill Delegation
Most commands are thin wrappers: parse argument → load named skill → skill provides full workflow. Exceptions: `dcf`, `earnings`, `one-pager` embed multi-step workflows inline (duplication risk).

### 2. MCP Hub Architecture
`financial-analysis` is the sole MCP data hub with 11 connectors (Daloopa, Morningstar, S&P Kensho, FactSet, Moody's, MT Newswires, Aiera, LSEG, PitchBook, Chronograph, Egnyte). Add-on plugins have zero MCP servers — they implicitly rely on core's data connectors. Partner plugins bring their own single MCP endpoint each.

### 3. Skill Trigger Mechanism
Skills auto-activate via `name` + `description` frontmatter in SKILL.md. The SKILL.md body only loads after trigger match. S&P Global skills use extensive multi-paragraph trigger specifications (no commands at all). LSEG skills mirror commands 1:1.

### 4. Progressive Disclosure
Plugin metadata (plugin.json) → command (lightweight) → skill (full workflow) → references/scripts (deep knowledge). Only the minimum context is loaded at each stage.

### 5. Data Source Hierarchy
Cross-cutting constraint across core skills: MCP providers first (S&P Kensho, FactSet, Daloopa) → Bloomberg/SEC filings → never web search as primary source.

## Cross-Cutting Conventions

### Excel Color Coding
Shared across multiple skills (LBO, check-model, datapack-builder, comps):
- **Blue** = hardcoded inputs
- **Black** = formulas
- **Purple** = same-tab links
- **Green** = cross-tab links

### Formula-Only Calculations
All financial models must use Excel formulas exclusively — no hardcoded computed values. Skills enforce formula-driven outputs for auditability.

### Compliance Spectrum
All skills include compliance reminders (fiduciary standards, disclaimers, compliance review) but enforcement is advisory only — no hard guardrails. Partner plugins (S&P Global) go further with mandatory AI disclaimers in 3 locations and 10+ data integrity rules.

### Output Formats
- First-party plugins: primarily Excel (.xlsx) + Word (.docx) + Markdown
- LSEG: Markdown tables with structured analysis
- S&P Global: Binary outputs (DOCX via docx-js, HTML with Chart.js, PPTX via pptxgenjs) with intermediate file pipelines to `/tmp/`

## Known Gaps and Risks

### High Severity
- **`validate_dcf.py` wrong path**: `lbo-model` SKILL.md references `/mnt/skills/public/xlsx/recalc.py` — path does not exist; actual file is in `dcf-model/scripts/`
- **S&P Global undeclared npm dependencies**: Skills require `docx`, `pptxgenjs`, `simple-icons`, `sharp` — no `package.json` or dependency manifest

### Medium Severity
- **LSEG MCP key collision**: Both `financial-analysis/.mcp.json` and `partner-built/lseg/.mcp.json` define an `lseg` key pointing to the same endpoint — conflict if both active
- **S&P Global MCP config duplication**: `mcpServers` defined in both `plugin.json` and `.mcp.json` — version drift risk
- **Missing example files**: 3 core skills reference absent example files (`comps_example.xlsx`, `LBO_Model.xlsx`, `Toast...pptx`)
- **S&P Global hardcoded `/tmp/` paths**: No configurability; assumes specific runtime environment
- **Hooks empty everywhere**: All 7 plugins have empty hooks.json — no automation triggers exist despite documented potential
- **hooks.json schema inconsistency**: IB uses `{"hooks": {}}`, ER/PE/WM use `[]` — format divergence

### Low Severity
- **Orphaned skill**: `datapack-builder` (IB) has no corresponding command — discoverable only via direct skill invocation
- **Command-skill name mismatches**: `screen` command loads `idea-generation` skill; `comps-analysis` directory vs. `fsi-comps-analysis` frontmatter name
- **Version inconsistency**: Core at 0.1.0, IB at 0.2.0, LSEG at 1.0.0 — no synchronized versioning
- **No marketplace.json**: Referenced in CLAUDE.md but does not exist in the repository
- **Missing .mcp.json in some add-ons**: ER and WM lack the file entirely; PE and IB have empty ones
- **Command inline workflow duplication**: `earnings.md`, `one-pager.md` duplicate skill workflow content
