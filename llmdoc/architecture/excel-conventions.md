# Excel Output Standards and Color Coding

## Font Color Conventions

Two distinct color systems exist. Each skill declares which system it follows.

### 3-Color System (Broad Standard)

| Color | Hex | Meaning |
|-------|-----|---------|
| Blue (0,0,255) | `#0000FF` | Hard-coded inputs (typed values, not referencing other cells) |
| Black (0,0,0) | `#000000` | Formulas and calculations |
| Green (0,128,0) | `#008000` | Links to other sheets |

**Used by:** comps-analysis, check-model, 3-statements, datapack-builder, dcf-model

### 4-Color System (LBO-Specific)

| Color | Hex | Meaning |
|-------|-----|---------|
| Blue | `#0000FF` | Hard-coded inputs |
| Black | `#000000` | Formulas with calculations (`=B4*B5`, `=SUM()`) |
| Purple | `#800080` | Same-tab cell links with no calculation (`=B9`) |
| Green | `#008000` | Cross-tab cell links (`=Assumptions!B5`) |

**Used by:** lbo-model (and verified by check-model during LBO audits)

The 4-color system splits the 3-color "formula" category into pure formulas (Black) vs. direct same-tab references (Purple), giving reviewers finer granularity on cell provenance.

## Fill Color Layer (datapack-builder Only)

datapack-builder defines an optional second layer on top of the mandatory font colors:

| Element | Fill Color | RGB |
|---------|-----------|-----|
| Section headers | Dark blue | (68,114,196) |
| Sub-headers / column headers | Light blue | (217,225,242) |
| Input cells | Light green/cream | (226,239,218) |
| Calculated cells | White | (255,255,255) |

Font color indicates WHAT the cell is. Fill color indicates WHERE it sits in the layout. Fill colors are optional and only applied when the user requests enhanced formatting.

## comps-analysis Visual Conventions (Optional Defaults)

comps-analysis defines its own optional fill scheme, applied only when no user template is provided:

| Element | Fill | Text |
|---------|------|------|
| Section headers (e.g., "OPERATING METRICS") | Dark blue `#17365D` | White, bold |
| Column headers | Light blue `#D9E2F3` | Black, bold |
| Data rows | White | Black |
| Statistics rows | Light gray `#F2F2F2` | Black |

User-provided templates and explicit preferences always override these defaults.

## Formula-Only Calculation Rule

Every calculation must be an Excel formula referencing source cells. Computed values must never be hardcoded. This constraint is cross-cutting across all modeling skills (dcf-model, lbo-model, comps-analysis, 3-statements, datapack-builder, merger-model).

Rationale: models must be dynamic and update when inputs change. Formula audit trails enable verification.

## Cell Comment Requirement

Every hard-coded input (blue-font cell) must have a comment documenting provenance:
- Format: `"Source: [System/Document], [Date], [Reference], [URL if applicable]"`
- Comments must be added as each value is written, not deferred to the end
- comps-analysis additionally requires hyperlinks to SEC filings or data sources where available

## Number Formatting Standards

### Currency
- Millions: `$#,##0.0` (one decimal)
- Thousands: `$#,##0` (no decimal)
- Per-share: `$#,##0.00` (two decimals)
- Negatives: parentheses `$(123.0)`, never minus sign

### Percentages
- Standard: `0.0%` (one decimal)
- Display as `15.0%`, never `0.15`

### Multiples
- Standard: `0.0"x"` (one decimal)
- Precise (MOIC etc.): `0.00"x"` (two decimals)

### Years
- Text format to prevent comma insertion (display `2024`, not `2,024`)
- Historical vs. projected: `FY2024A`, `FY2025E`

### Alignment
- All numeric cells: right-aligned
- Headers and labels: left-aligned
- comps-analysis: center-aligned metrics (optional convention)

## Sensitivity Table Conventions

### DCF Sensitivity Tables
- Three 5x5 grids (75 cells total):
  1. WACC vs. Terminal Growth Rate
  2. Revenue Growth vs. EBIT Margin
  3. Beta vs. Risk-Free Rate
- Each cell contains a full DCF recalculation formula (not Excel Data Tables)
- Populated programmatically via openpyxl loops

### LBO Sensitivity Tables
- Entry multiple vs. exit multiple grids for PE returns (MOIC, IRR)
- Each cell must show a different value; mixed references (`$A5`, `B$4`) required

### Merger Model Sensitivity Tables
- Accretion/dilution vs. synergies and offer premium (5x5)
- Accretion/dilution vs. cash/stock mix (5x2+)

## Comps Statistical Framework

Statistics rows follow every data section (operating metrics and valuation multiples):

| Statistic | Excel Formula |
|-----------|---------------|
| Maximum | `=MAX(range)` |
| 75th Percentile | `=QUARTILE(range,3)` |
| Median | `=MEDIAN(range)` |
| 25th Percentile | `=QUARTILE(range,1)` |
| Minimum | `=MIN(range)` |

**Apply statistics to:** ratio and rate columns only (growth %, margins %, multiples, yields).

**Never apply statistics to:** absolute size metrics (Revenue, EBITDA, Market Cap, Enterprise Value). These vary by company scale and are not comparable.

One blank separator row between company data and statistics rows. No separate "SECTOR STATISTICS" or "VALUATION STATISTICS" header row.

## Tab Structure Patterns

### 8-Tab Datapack (datapack-builder)
1. Executive Summary
2. Historical Financials (IS)
3. Balance Sheet
4. Cash Flow Statement
5. Operating Metrics
6. Property/Segment Performance (if applicable)
7. Market Analysis
8. Investment Highlights

### 6-Tab Financial Model (initiating-coverage Task 2)
Financial model tabs + 4 valuation tabs added in Task 3.

### Standard 3-Statement Model
Tab names vary; common patterns: IS/P&L, BS, CF/CFS, WC, DA, Debt, NOL/Tax, Assumptions/Inputs, Checks/Audit.

### Per-Deal Milestone Tabs (deal-tracker)
Pipeline overview + one tab per deal (milestone tracking) + action items + weekly review summary.

## Sign Conventions (3-Statement Models)

### Cash Flow Statement
| Item | Sign | Rationale |
|------|------|-----------|
| D&A, SBC | Positive | Non-cash add-back |
| Increase in AR | Negative | Use of cash |
| Increase in AP | Positive | Source of cash |
| CapEx | Negative | Cash outflow |
| Debt issuance | Positive | Cash inflow |
| Debt repayment | Negative | Cash outflow |
| Dividends | Negative | Cash outflow |

### LBO Returns
- Investment cash flow: negative
- Proceeds cash flow: positive
- MOIC = Total Proceeds / Total Investment

## Circular Reference Handling

Interest expense creates circularity: Interest -> Net Income -> Cash -> Debt Balance -> Interest.

Resolution: use beginning-of-period balance for interest calculation (breaks the loop), or enable iterative calculation (File -> Options -> Formulas -> max iterations 100, max change 0.001) with a circuit breaker toggle on the Assumptions tab.

## Professional Presentation Standards

- Bold headers, left-aligned
- 2-space indentation for sub-items
- Single underline above subtotals
- Double underline below final totals
- Freeze panes on row/column headers
- Minimal borders (only structurally needed)
- Consistent font: Calibri/Arial 11pt (data), 12pt (headers); Times New Roman for comps-analysis
- Thin vertical border between historical and projected columns
- Balance sheet check row: red font if non-zero, black if balanced
- Total and subtotal rows: bold font for numerical values

## Formatting Validation Checklist

- [ ] Font colors applied per skill's declared color system
- [ ] Every hard-coded input has a source comment
- [ ] All calculations are formula-based (no hardcoded computed values)
- [ ] Number formats match data type (currency/percentage/multiple/year)
- [ ] Negative values use parentheses
- [ ] No formula errors (#REF!, #DIV/0!, #VALUE!, #NAME?)
- [ ] Statistics applied to ratio columns only (comps)
- [ ] Sensitivity tables fully populated with distinct formula values
- [ ] Sign conventions consistent within each statement
