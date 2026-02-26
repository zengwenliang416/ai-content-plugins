# Output Format Reference

## Format Taxonomy

| Format | Skills | Plugin |
|--------|--------|--------|
| Markdown/text | All LSEG skills (8), morning-note, earnings-preview, thesis-tracker, catalyst-calendar, idea-generation, sector-overview, deal-sourcing, deal-screening, dd-meeting-prep, portfolio-monitoring, client-review | LSEG, ER, PE, WM |
| Excel (.xlsx) | comps, dcf, lbo, 3-statements, dd-checklist, returns-analysis, unit-economics, datapack-builder, deal-tracker, portfolio-rebalance | FA, PE, IB, WM |
| Word (.docx) | cim-builder, process-letter, teaser, ic-memo, client-report, initiating-coverage, model-update, value-creation-plan, tear-sheet (S&P) | IB, PE, ER, WM, S&P |
| PowerPoint (.pptx) | pitch-deck, investment-proposal, funding-digest (S&P) | IB, WM, S&P |
| HTML | earnings-preview-beta (S&P) | S&P |
| PDF | Generated alongside Word/PPT outputs (not standalone) | IB, PE, WM, S&P |

**Abbreviations:** FA = financial-analysis, IB = investment-banking, ER = equity-research, PE = private-equity, WM = wealth-management, S&P = partner-built/spglobal.

## Skills by Output Format

### Markdown/Text

Default output for most skills. No binary generation pipeline. Skills produce structured markdown with tables, headers, and bullet lists rendered directly in conversation.

LSEG skills output markdown tables with specific column layouts (e.g., spread decomposition, Greeks tables, carry profiles). Output format is specified within each SKILL.md body.

### Excel (.xlsx)

Skills that produce Excel typically generate workbooks with multiple tabs:

- `comps`: Company data + statistical summary (Max/75th/Median/25th/Min)
- `dcf`: Assumptions, FCF projections, sensitivity tables (75-cell grids)
- `lbo`: Sources & uses, operating model, debt schedule, returns waterfall
- `3-statements`: IS, BS, CF tabs with cross-tab linking
- `returns-analysis`: Sensitivity matrices (entry x exit, growth x exit, leverage x exit, hold x exit)
- `unit-economics`: ARR bridge, cohort matrix, benchmarks
- `dd-checklist`: Multi-workstream tracker with RAG status
- `datapack-builder`: Multi-tab data compilation
- `deal-tracker`: Pipeline tracking
- `portfolio-rebalance`: Drift table + trade list

Color conventions (LBO/check-model): Blue = hardcoded, Black = formula, Purple = same-tab link, Green = cross-tab link.

### Word (.docx)

Two generation approaches:

**First-party (prose-based):** Skills describe document structure in SKILL.md (sections, page counts, content requirements). The LLM generates the document directly. No helper libraries.

**S&P Global (component-library):** `tear-sheet` embeds canonical docx-js component functions in SKILL.md:
- `createHeaderBanner()` — navy header with company name and descriptor
- `createSectionHeader()` — section dividers with consistent styling
- `createTable()` — data tables with alternating row shading
- `createBulletList()` — formatted bullet lists
- `createFooter()` — standardized disclaimer footer

Style config: US Letter portrait, 0.75" margins, Arial font, navy `#1F3864` primary color. Numbers use commas without dollar signs in cells; units in column headers.

Dependencies: `docx` npm package (undeclared in any manifest).

### PowerPoint (.pptx)

**First-party:** Skills describe slide structure in prose. No helper library.

**S&P Global `funding-digest`:** Uses pptxgenjs to generate a single-slide PPTX. Design philosophy: monochrome-first executive dashboard. Includes logo pipeline (simple-icons npm at ~43% coverage, initial-based fallback via sharp).

Dependencies: `pptxgenjs`, `simple-icons`, `sharp` npm packages (undeclared).

### HTML

**S&P Global `earnings-preview-beta` only.** Self-contained HTML file with:
- Embedded CSS styling
- Chart.js charts (6 pre-built helper functions in `report-template.md`)
- Clickable hyperlinked appendix (`<a href="#ref-N">` anchors)
- AI disclaimer banners in 3 locations

Template file: `report-template.md` (51KB+), the largest single file in the partner-built section.

## Intermediate File Pipeline

S&P Global skills write MCP data to disk before document generation:

| Skill | Directory | File Count | Purpose |
|-------|-----------|------------|---------|
| `tear-sheet` | `/tmp/tear-sheet/` | 10 files | CSV + text data files (profile, financials, segments, valuation, consensus, earnings, relationships, peers, M&A, calculations) |
| `earnings-preview-beta` | `/tmp/earnings-preview/` | 11 files | company-info, transcript-extracts, financials, segments, prices, peer-eps, peer-market-caps, consensus-eps, kensho-findings, earnings-dates, calculations |
| `funding-digest` | `/home/claude/` | Deal data files | Sector-specific deal data |

Write-after-query mandate: each MCP call result is written immediately, not batched. Intermediate files are the single source of truth for document generation, guarding against context window compression.

Paths are hardcoded; no configuration mechanism exists.

## File Naming Convention

S&P Global outputs: `CompanyName_Type_YYYY-MM-DD.ext` (e.g., `Apple_TearSheet_2026-02-25.docx`).

First-party plugins do not enforce a naming convention.

## Multi-Format Output Skills

Several skills produce multiple formats from a single invocation:

| Skill | Primary | Secondary |
|-------|---------|-----------|
| `teaser` | Word (.docx) | PDF + optional PPT (single slide) |
| `ic-memo` | Word (.docx) | Markdown alternative |
| `client-report` | PDF (branded) | Word + optional Excel appendix |
| `financial-plan` | Word/PDF (15-25 pages) | Excel cash flow model |
| `investment-proposal` | PPT (12-15 slides) | PDF leave-behind + one-page summary |
| `value-creation-plan` | Word/PPT | Excel EBITDA bridge model |
| `unit-economics` | Excel workbook | Summary slide |
| `returns-analysis` | Excel workbook | IC deck returns summary |
