# Domain Workflows Architecture

Cross-domain workflow patterns for the four financial services verticals.

## Domain Overview

| Domain | Plugin | Commands | Skills | Focus |
|--------|--------|----------|--------|-------|
| Investment Banking (IB) | `investment-banking` | 7 | 8 | Deal execution artifacts |
| Equity Research (ER) | `equity-research` | 9 | 9 | Research production pipeline |
| Private Equity (PE) | `private-equity` | 9 | 9 | Deal funnel + portfolio ops |
| Wealth Management (WM) | `wealth-management` | 6 | 6 | Client lifecycle management |

All four domains share `financial-analysis` as the core modeling layer (DCF, comps, LBO, 3-statement models, deck QC) with 11 MCP data connectors.

---

## Investment Banking: Deal Lifecycle

### Stage Progression

```
Pre-mandate → Engaged → Marketing → IOI → Diligence → Final Bids → Signing → Close
```

17 milestones tracked per deal via `deal-tracker` skill.

### Artifact Progression

Each stage produces specific deliverables, built by dedicated skills:

| Stage | Artifact | Skill | Output Format |
|-------|----------|-------|---------------|
| Pre-mandate | Teaser | `teaser` | Word + PDF |
| Pre-mandate | One-pager / Strip profile | `strip-profile` | PPTX (4:3, 4-quadrant) |
| Engaged | Buyer list | `buyer-list` | Excel (3 tabs) + summary |
| Marketing | CIM | `cim-builder` | Word (40-60pp) + Excel appendix |
| Marketing | Process letter | `process-letter` | Word (4 letter types) |
| IOI → Close | Deal tracker | `deal-tracker` | Excel (pipeline + per-deal tabs) |
| Diligence+ | Merger model | `merger-model` | Excel (6 tabs) + summary |
| Any | Pitch deck population | `pitch-deck` | PPTX (template fill only) |
| Any | Data pack | `datapack-builder` | Excel (8-tab standard) |

**Artifact dependency chain**: teaser → buyer list → CIM → process letter → deal tracker → merger model. Each artifact builds on information gathered for the previous one.

### Orphaned Skill

`datapack-builder` has no corresponding command. Invocation requires direct skill reference or loading from another command.

---

## Equity Research: Research Pipeline

### Two Operating Modes

**1. Initiating Coverage** (one-time, sequential pipeline):

```
Task 1: Company Research (6-8K words .md)
  → Task 2: Financial Modeling (6-tab Excel)
    → Task 3: Valuation Analysis (4-6pp .md + 4 Excel tabs)
      → Task 4: Chart Generation (25-35 charts)
        → Task 5: Report Assembly (30-50pp .docx)
```

Strict prerequisite gates between tasks. Single-task-at-a-time discipline. Target quality: JPMorgan/Goldman/MS institutional standard.

**2. Ongoing Coverage** (recurring, independent workflows):

| Workflow | Skill | Cadence | Output |
|----------|-------|---------|--------|
| Earnings update | `earnings-analysis` | Quarterly (24-48h turnaround) | 8-12pp Word + charts |
| Earnings preview | `earnings-preview` | Pre-earnings | 1-page with scenarios |
| Model update | `model-update` | Event-driven (5 trigger types) | Updated Excel + summary |
| Thesis tracking | `thesis-tracker` | Ongoing | Scorecard + conviction level |
| Catalyst calendar | `catalyst-calendar` | Weekly | Excel calendar + preview |
| Morning note | `morning-note` | Daily | 1-page markdown (2-min read) |
| Stock screening | `idea-generation` | Ad-hoc | 5-10 idea shortlist |
| Sector overview | `sector-overview` | Ad-hoc | Word/PPT + Excel appendix |

Ongoing workflows are independent of each other and can run in any order.

---

## Private Equity: Deal Funnel

### Funnel Stages

```
Sourcing → Screening → Due Diligence → IC Memo → Returns Analysis → Portfolio Monitoring → Value Creation
```

| Stage | Skill | Key Output |
|-------|-------|------------|
| Sourcing | `deal-sourcing` | Company shortlist + outreach drafts |
| Screening | `deal-screening` | 1-page screening memo (pass/fail) |
| DD prep | `dd-meeting-prep` | Meeting prep doc (4 meeting types) |
| DD tracking | `dd-checklist` | Excel workbook (7 workstreams + sector additions) |
| IC decision | `ic-memo` | 9-section Word memo |
| Returns | `returns-analysis` | Excel with IRR/MOIC sensitivity tables |
| Unit economics | `unit-economics` | Excel + summary (ARR, LTV/CAC, cohorts) |
| Portfolio ops | `portfolio-monitoring` | Board-ready KPI summary with RAG flags |
| Value creation | `value-creation-plan` | EBITDA bridge + 100-day plan |

### Deal Sourcing Pipeline

3-step pipeline within `deal-sourcing`: company discovery via web search → CRM check (Gmail/Slack) → personalized founder outreach drafting. References integrations not wired via MCP.

### DD Checklist Workstreams

Financial, Commercial, Legal, Operational, HR, IT/Tech, ESG. Sector-specific additions for: SaaS, Healthcare, Industrial, Financial Services, Consumer.

---

## Wealth Management: Client Lifecycle

### Lifecycle Flow

```
Proposal → Financial Plan → Client Review → Portfolio Rebalance → Client Report → Tax-Loss Harvesting
```

| Stage | Skill | Output |
|-------|-------|--------|
| Prospect conversion | `investment-proposal` | 12-15 slide PPT + PDF + 1-page summary |
| Planning | `financial-plan` | 15-25pp plan + Excel cash flow + charts |
| Review meetings | `client-review` | 1-page summary + performance table + agenda |
| Portfolio maintenance | `portfolio-rebalance` | Drift table + trade list (Excel) + tax impact |
| Reporting | `client-report` | 8-12pp branded PDF + Word |
| Tax optimization | `tax-loss-harvesting` | Execution plan with tax savings estimate |

### Financial Plan Components

Full lifecycle: cash flow projections → retirement Monte Carlo (accumulation + distribution) → goal-specific analysis (education/529, estate, risk management) → scenario modeling → prioritized recommendations.

### Tax-Aware Operations

Both `portfolio-rebalance` and `tax-loss-harvesting` enforce tax awareness: prefer tax-advantaged accounts, harvest losses, avoid short-term gains, wash sale verification across household (30-day lookback + forward).

---

## Cross-Domain Patterns

### Workflow Complexity Spectrum

| Level | Pattern | Example |
|-------|---------|---------|
| Simple | Single-step skill invocation | `morning-note` (4 steps, 1-page output) |
| Multi-step | Sequenced steps within one skill | `buyer-list` (6 steps), `ic-memo` (9 sections) |
| Multi-task pipeline | Sequential tasks with prerequisite gates | `initiating-coverage` (5 tasks, verification gates) |
| Chained commands | One command invokes another skill | `dcf` invokes `comps-analysis` first |

### Cross-Domain Overlaps

| Pattern | Domain A | Domain B | Difference |
|---------|----------|----------|------------|
| Portfolio analysis | PE `portfolio-monitoring` | WM `client-review` | PE: board-ready KPIs for portfolio companies; WM: client meeting prep with drift + recommendations |
| Returns/projections | PE `returns-analysis` | WM `financial-plan` | PE: IRR/MOIC sensitivity for deals; WM: Monte Carlo retirement projections |
| Scenario modeling | ER `earnings-preview` | PE `returns-analysis` | ER: bull/base/bear for single stock; PE: entry/exit multiple sensitivity matrices |
| Document generation | IB `cim-builder` (40-60pp) | ER `initiating-coverage` (30-50pp) | IB: sell-side marketing document; ER: institutional research report |

### Shared Conventions

- **Excel color coding**: Blue = inputs/hardcoded, Black = formulas, Green = cross-tab links (enforced in IB `datapack-builder`, core `lbo-model`)
- **Data source priority**: MCP providers first → Bloomberg/SEC → never web search as primary (core plugin constraint)
- **Output format defaults**: Excel for models/data, Word for narratives/memos, PPTX for presentations, Markdown for quick-read notes
- **Compliance**: All domains include prose-level compliance reminders (fiduciary standards, disclaimers) but no hard enforcement guardrails
