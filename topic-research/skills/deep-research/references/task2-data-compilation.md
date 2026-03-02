# Task 2: Data Compilation - Detailed Workflow

This document provides step-by-step instructions for executing Task 2 (Data Compilation) of the deep-research skill.

## Task Overview

**Purpose**: Collect and organize quantitative data — adoption metrics, benchmark results, market size estimates, player comparison tables, and timeline data — into a structured Excel workbook.

**Prerequisites**: Access to data sources (news-search CLI, arXiv MCP, company reports)

**Output**: Data Workbook (.xlsx) with 6 tabs

---

## Data Sources

### Benchmark Data

- **Papers With Code**: Leaderboards for NLP, CV, RL, and other benchmarks
- **arXiv papers**: Results tables in method papers and survey papers
- **Official benchmark sites**: HELM, BIG-Bench, MMLU leaderboard, etc.
- **Company technical reports**: Model cards, evaluation reports

### Market & Adoption Data

- **Industry analyst reports**: Gartner, IDC, Forrester (check for free summaries)
- **VC firm reports**: a16z State of AI, Sequoia AI, Bessemer Cloud Index AI
- **Job posting data**: LinkedIn, Indeed trends for AI roles
- **GitHub stars and forks**: Proxy for open-source adoption
- **HuggingFace model downloads**: Proxy for model adoption

### Product & Feature Data

- **Company websites**: Feature pages, documentation, pricing pages
- **G2 / Capterra reviews**: User-reported features and comparisons
- **Product launch announcements**: Press releases, blog posts
- **Technical documentation**: API capabilities, rate limits, modalities

---

## Step-by-Step Workflow

### Step 1: Define Data Requirements

Before collecting, identify:

1. Which players/approaches need comparison data?
2. Which benchmarks are canonical for this field?
3. What market size estimates exist?
4. What adoption metrics are publicly available?
5. What time range should the timeline cover?

### Step 2: Collect Market Data (Tab 1)

Collect for the **Market Data** tab:

- Market size estimates (total addressable market) — include source and year
- Year-over-year growth rates (historical, 3-5 years)
- Projected market size (3-5 year forecast) — include source and methodology
- Adoption rate data (% of companies using, surveys)
- Investment/funding data (VC investment in the space by year)
- Key growth drivers and market tailwinds

**For each data point:**

- Value with units
- Source name and URL
- Date of data
- Notes on methodology or caveats

### Step 3: Build Player Comparison (Tab 2)

Build a comparison matrix for **Player Comparison** tab:

**Rows**: Each major player (5-10)
**Columns** (adapt to topic, examples):

- Company/Project name
- Type (commercial/open-source/research)
- Key product(s) in this space
- Pricing model (if commercial)
- Modalities supported
- Key technical approach
- Notable strengths
- Known weaknesses
- Community size (GitHub stars, users, etc.)
- Funding/valuation (if applicable)
- Key differentiator (one-liner)

### Step 4: Collect Technical Benchmarks (Tab 3)

For the **Technical Benchmarks** tab:

1. **Identify canonical benchmarks** for the field
   - What benchmarks are used in papers?
   - What leaderboards exist on Papers With Code?

2. **Collect results for each major player**
   - Best published score
   - Date of result
   - Paper/source citation

3. **Build comparison table**:
   - Rows: Players/models
   - Columns: Benchmarks
   - Cells: Score + date

4. **Add context**:
   - Human-level performance (where applicable)
   - Prior SOTA at time of player's release
   - Improvement over baseline

### Step 5: Collect Adoption Metrics (Tab 4)

For the **Adoption Metrics** tab:

- Monthly active users or API calls (if disclosed)
- Enterprise customers or deployments (if disclosed)
- GitHub stars and forks (for open-source)
- HuggingFace downloads (for models)
- Job posting trends for related roles
- Survey data on usage (cite source)
- Geographic adoption patterns (where available)

### Step 6: Build Timeline (Tab 5)

For the **Timeline** tab, create a chronological record:

**Columns**:

- Date (YYYY-MM or YYYY-MM-DD)
- Event type (Paper / Product Launch / Benchmark Record / Funding / Acquisition / Regulatory)
- Description (one-line)
- Source URL
- Significance (High / Medium / Low)

**Cover**:

- Foundational papers
- Key model or product releases
- Benchmark breakthroughs
- Major funding rounds
- Acquisitions
- Regulatory actions or policy statements
- Conference presentations of major results

### Step 7: Build Scenarios (Tab 6)

For the **Scenarios** tab, project 3 trajectories:

**Optimistic scenario**: Assumes accelerating progress, high adoption, favorable regulation
**Base scenario**: Assumes current trends continue at a moderate pace
**Pessimistic scenario**: Assumes slowdowns — technical plateaus, regulation, or competition from alternatives

For each scenario, project:

- Technology capability trajectory (qualitative: breakthrough / incremental / stalled)
- Adoption curve (S-curve position: early adopter / crossing chasm / mainstream)
- Market size in 2-3 years
- Key assumptions driving the scenario

---

## Quality Standards

### Data Integrity

- Every data point must have a source citation
- No fabricated numbers — if data is unavailable, mark as "N/A - not publicly disclosed"
- Distinguish between measured data and estimates
- Note dates — AI data goes stale quickly

### Completeness

- All 6 tabs must be filled
- Player comparison: minimum 5 players
- Benchmarks: minimum 3 canonical benchmarks
- Timeline: minimum 20 milestones
- Scenarios: all 3 must be substantively different

### Formatting

- Clear column headers with units
- Source column for every tab
- Consistent date formatting (YYYY-MM-DD)
- Color-code to distinguish leaders from challengers (optional)

---

## Output Path

Save to: `openspec/runtime/deep-research/<slug>/data-workbook.md`

Example: `openspec/runtime/deep-research/llm-agents/data-workbook.md`
