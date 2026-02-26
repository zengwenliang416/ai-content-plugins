# Workflow Catalog

Complete reference of all workflows organized by role. Quick lookup: "I need to do X -> use Y."

---

## Master Workflow Table

| Command | Plugin | Skill | Input | Output Format | Complexity |
|---------|--------|-------|-------|---------------|------------|
| `/ib:teaser` | investment-banking | `teaser` | Company details | Word + PDF + optional PPT | Simple |
| `/ib:one-pager` | investment-banking | `strip-profile` | Company name | PPTX (4:3) | Multi-step |
| `/ib:buyer-list` | investment-banking | `buyer-list` | Target company | Excel (3 tabs) + summary | Multi-step (6) |
| `/ib:cim` | investment-banking | `cim-builder` | Source materials | Word (40-60pp) + Excel | Multi-step |
| `/ib:process-letter` | investment-banking | `process-letter` | Deal context | Word | Simple |
| `/ib:deal-tracker` | investment-banking | `deal-tracker` | Deal details | Excel + optional markdown | Multi-step (5) |
| `/ib:merger-model` | investment-banking | `merger-model` | Acquirer + target data | Excel (6 tabs) + summary | Multi-step (7) |
| — (no command) | investment-banking | `datapack-builder` | Due diligence data | Excel (8 tabs) | Multi-step (6) |
| — (no command) | investment-banking | `pitch-deck` | PPTX template + data | Populated PPTX | Multi-step (5) |
| `/er:initiate` | equity-research | `initiating-coverage` | Company name/ticker | 30-50pp Word + Excel model | Pipeline (5 tasks) |
| `/er:earnings` | equity-research | `earnings-analysis` | Company + quarter | 8-12pp Word + charts | Multi-step (5) |
| `/er:earnings-preview` | equity-research | `earnings-preview` | Company + quarter | 1-page preview | Multi-step (5) |
| `/er:model-update` | equity-research | `model-update` | Company + new data | Updated Excel + summary | Multi-step (6) |
| `/er:thesis` | equity-research | `thesis-tracker` | Company name | Markdown/Word scorecard | Multi-step (5) |
| `/er:catalysts` | equity-research | `catalyst-calendar` | Coverage universe | Excel calendar + weekly email | Multi-step (5) |
| `/er:morning-note` | equity-research | `morning-note` | Overnight developments | 1-page markdown | Simple (4) |
| `/er:screen` | equity-research | `idea-generation` | Screening criteria | 5-10 idea shortlist | Multi-step (5) |
| `/er:sector` | equity-research | `sector-overview` | Sector/industry | Word/PPT + Excel | Multi-step (6) |
| `/pe:source` | private-equity | `deal-sourcing` | Sector or criteria | Shortlist + outreach drafts | Multi-step (3) |
| `/pe:screen-deal` | private-equity | `deal-screening` | CIM/teaser file path | 1-page screening memo | Multi-step |
| `/pe:dd-prep` | private-equity | `dd-meeting-prep` | Company + meeting type | Meeting prep doc | Multi-step |
| `/pe:dd-checklist` | private-equity | `dd-checklist` | Company name | Excel workbook | Multi-step (5) |
| `/pe:ic-memo` | private-equity | `ic-memo` | Company name | Word (9 sections) | Multi-step |
| `/pe:returns` | private-equity | `returns-analysis` | Deal parameters | Excel sensitivity tables | Multi-step |
| `/pe:unit-economics` | private-equity | `unit-economics` | Company data | Excel + summary slide | Multi-step |
| `/pe:portfolio` | private-equity | `portfolio-monitoring` | Financial package | Board-ready summary + RAG flags | Multi-step |
| `/pe:value-creation` | private-equity | `value-creation-plan` | Company name | Word/PPT + Excel EBITDA bridge | Multi-step |
| `/wm:proposal` | wealth-management | `investment-proposal` | Prospect details | 12-15 slide PPT + PDF | Multi-step |
| `/wm:financial-plan` | wealth-management | `financial-plan` | Client name | 15-25pp Word/PDF + Excel | Multi-step (6) |
| `/wm:client-review` | wealth-management | `client-review` | Client name | 1-page summary + agenda | Multi-step (5) |
| `/wm:rebalance` | wealth-management | `portfolio-rebalance` | Client/account | Drift table + trade list (Excel) | Multi-step (5) |
| `/wm:client-report` | wealth-management | `client-report` | Client + period | 8-12pp branded PDF + Word | Multi-step (7) |
| `/wm:tlh` | wealth-management | `tax-loss-harvesting` | Client/account | Execution plan + tax savings | Multi-step (6) |
| `/fa:dcf` | financial-analysis | `dcf-model` | Company/ticker | Excel model + valuation summary | Multi-step (chains comps) |
| `/fa:comps` | financial-analysis | `comps-analysis` | Company/ticker | Excel comps table | Multi-step |
| `/fa:lbo` | financial-analysis | `lbo-model` | Company/deal details | Excel LBO model | Multi-step |
| `/fa:3-statements` | financial-analysis | `3-statements` | Template file path | Completed Excel model | Multi-step |
| `/fa:competitive-analysis` | financial-analysis | `competitive-analysis` | Company/industry | Word/PPT + Excel | Multi-step |
| `/fa:check-deck` | financial-analysis | `check-deck` | PPTX file path | QC report (4 dimensions) | Multi-step |
| `/fa:debug-model` | financial-analysis | `check-model` | XLSX file path | Audit report | Multi-step |
| `/fa:ppt-template` | financial-analysis | `ppt-template-creator` | PPTX/POTX file path | Reusable PPT template skill | Meta-skill |

---

## By Role

### IB Analyst / Associate

**"I need to..."**

| Task | Command | Notes |
|------|---------|-------|
| Draft a blind teaser for a sell-side process | `/ib:teaser` | Strict anonymization enforced |
| Build a buyer universe | `/ib:buyer-list` | Tiered (1/2/3) with contact mapping for Tier 1 |
| Draft a CIM | `/ib:cim` | 40-60pp with 8-section structure |
| Write bid instructions | `/ib:process-letter` | 4 types: initial, IOI, final bid, mgmt meeting invite |
| Create a company profile slide | `/ib:one-pager` | 4:3 format, one slide at a time with visual review |
| Track deal pipeline | `/ib:deal-tracker` | 17 milestones per deal, weekly review format |
| Build merger consequences | `/ib:merger-model` | Accretion/dilution + 2-way sensitivity |
| Build a DCF or comps | `/fa:dcf`, `/fa:comps` | Core plugin; DCF chains into comps |
| Build an LBO model | `/fa:lbo` | Core plugin |
| QC a pitch deck | `/fa:check-deck` | 4-dimension QC |
| Populate a pitch template | Load `pitch-deck` skill | No command; template-fill only |

### ER Analyst

**"I need to..."**

| Task | Command | Notes |
|------|---------|-------|
| Write an initiation report | `/er:initiate` | 5-task pipeline with gates; 30-50pp output |
| Publish an earnings update | `/er:earnings` | 24-48h turnaround; timeliness check first |
| Prep for upcoming earnings | `/er:earnings-preview` | Bull/base/bear scenarios + implied move |
| Update my model after new data | `/er:model-update` | 5 trigger types; old-vs-new estimates |
| Track my investment thesis | `/er:thesis` | Falsifiable pillar scorecard with conviction |
| Maintain catalyst calendar | `/er:catalysts` | 4 catalyst types; weekly forward preview |
| Write morning note | `/er:morning-note` | 2-minute read; lead with top call |
| Screen for new ideas | `/er:screen` | 5 screen types + thematic sweep |
| Write a sector report | `/er:sector` | TAM + Porter's Five Forces + valuation context |
| Build a DCF or comps | `/fa:dcf`, `/fa:comps` | Core plugin |

### PE Associate / VP

**"I need to..."**

| Task | Command | Notes |
|------|---------|-------|
| Find target companies | `/pe:source` | Web search + CRM check + outreach drafts |
| Triage an inbound deal | `/pe:screen-deal` | Pass/fail against fund criteria |
| Prep for a diligence meeting | `/pe:dd-prep` | 4 meeting types: mgmt, expert, customer, site visit |
| Create DD checklist | `/pe:dd-checklist` | 7 workstreams + sector-specific additions |
| Write an IC memo | `/pe:ic-memo` | 9-section structure |
| Build returns sensitivity | `/pe:returns` | IRR/MOIC 2-way tables + bull/base/bear |
| Analyze unit economics | `/pe:unit-economics` | ARR bridge, cohorts, LTV/CAC, Rule of 40 |
| Review portfolio company | `/pe:portfolio` | RAG-flagged KPI variance analysis |
| Build value creation plan | `/pe:value-creation` | EBITDA bridge + 100-day plan |
| Build an LBO model | `/fa:lbo` | Core plugin |

### WM Advisor / Planner

**"I need to..."**

| Task | Command | Notes |
|------|---------|-------|
| Pitch a new prospect | `/wm:proposal` | 12-15 slide PPT; customized by prospect type |
| Build a financial plan | `/wm:financial-plan` | 15-25pp; Monte Carlo retirement projections |
| Prep for client meeting | `/wm:client-review` | Performance + drift + proactive recommendations |
| Rebalance a portfolio | `/wm:rebalance` | Tax-aware trades; asset location optimization |
| Generate client report | `/wm:client-report` | 8-12pp branded PDF; tone-matched to client |
| Harvest tax losses | `/wm:tlh` | Wash sale verification across household |

---

## Output Format Reference

| Format | Workflows Using It |
|--------|--------------------|
| Excel (.xlsx) | buyer-list, deal-tracker, merger-model, datapack-builder, comps, dcf, lbo, 3-statements, earnings-analysis (optional), model-update, catalyst-calendar, dd-checklist, returns-analysis, unit-economics, value-creation-plan, portfolio-rebalance, financial-plan, client-report (optional) |
| Word (.docx) | teaser, cim-builder, process-letter, earnings-analysis, initiating-coverage, sector-overview, thesis-tracker, ic-memo, financial-plan, client-report |
| PPTX | strip-profile, pitch-deck, competitive-analysis, sector-overview (optional), investment-proposal, value-creation-plan (optional), unit-economics (optional) |
| PDF | teaser (optional), client-report, investment-proposal |
| Markdown | morning-note, deal-tracker (optional), thesis-tracker, client-review |
| Charts (PNG/JPG) | initiating-coverage Task 4 (25-35 charts), earnings-analysis (8-12 charts) |

---

## End-to-End Workflow Chains

### IB Sell-Side M&A Process

```
/ib:teaser → /ib:buyer-list → /ib:cim → /ib:process-letter → /ib:deal-tracker → /ib:merger-model
```

Each artifact feeds information into the next. Deal tracker runs in parallel throughout.

### ER Full Coverage Cycle

```
/er:initiate (5-task pipeline)
  then recurring:
    /er:earnings-preview → /er:earnings → /er:model-update → /er:thesis
  daily: /er:morning-note
  weekly: /er:catalysts
  ad-hoc: /er:screen, /er:sector
```

### PE Deal Lifecycle

```
/pe:source → /pe:screen-deal → /pe:dd-prep + /pe:dd-checklist → /pe:unit-economics → /pe:ic-memo + /pe:returns → /pe:value-creation → /pe:portfolio
```

### WM Client Lifecycle

```
/wm:proposal → /wm:financial-plan → /wm:client-review → /wm:rebalance → /wm:client-report
  periodic: /wm:tlh (year-end or opportunistic)
  recurring: /wm:client-review + /wm:client-report (quarterly)
```

### Cross-Domain: Valuation Stack

```
/fa:comps → /fa:dcf (chains comps automatically) → /fa:lbo
```

Used by IB (deal valuation), ER (target prices), PE (entry/exit analysis).
