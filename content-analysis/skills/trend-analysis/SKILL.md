---
name: trend-analysis
description: >
  Build a data-backed trend analysis for an AI or tech topic — constructing an
  event timeline, identifying acceleration and disruption patterns, and
  forecasting near-term and mid-term scenarios. Triggers on "trend analysis",
  "analyze trends", "what's happening in [topic]", "trend report", "forecast",
  "趋势分析", "行业趋势".
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebFetch
  - AskUserQuestion
---

# AI Topic Trend Analysis

## Workflow

### Step 1: Gather Data

Use web search to collect recent information on the topic:
- Search for "[topic] trends [current year]" and "[topic] developments [last 6 months]"
- Look for: research paper releases, product launches, company announcements, benchmark results, adoption metrics, investment activity
- Target 10-15 distinct data points or events across the time range
- Prioritize primary sources: official announcements, research papers, earnings calls, regulatory filings

For each data point record: date, source, event/metric, significance.

### Step 2: Timeline Construction

Organize collected data chronologically:

```
| Date | Event | Source | Significance |
|------|-------|--------|-------------|
| [YYYY-MM] | [What happened] | [Source] | High / Medium / Low |
```

Group into phases if a natural periodization emerges (e.g., "Pre-GPT-4 Era", "Post-OpenAI API era").

### Step 3: Pattern Identification

Analyze the timeline for:

- **Acceleration signals**: Is the pace of development speeding up or slowing?
- **Convergence signals**: Are previously separate threads merging?
- **Disruption signals**: Did a single event change the trajectory significantly?
- **Adoption curve position**: Early adopter / early majority / mainstream?
- **Competitive dynamics**: Are fewer or more players competing? Is it concentrating?
- **Regulatory signals**: Are governance or compliance trends emerging?

Name each pattern clearly: "Compute cost halving every 18 months" not "costs are falling."

### Step 4: Visualization

Produce data-oriented visuals in markdown:

**Timeline chart** (ASCII or descriptive):
```
2022 ─── [Event A] ─── [Event B]
2023 ─── [Event C] ─────────────── [Event D] ─── [Event E]
2024 ─── [Event F] ─── [Event G] ─────────────────────────── [Event H]
2025 ─── [Event I] ─── [Event J]
```

**Trend metrics table** (where data exists):
```
| Period | Metric | Value | Change |
|--------|--------|-------|--------|
| Q1 2024 | GitHub AI repos created | XXK | +XX% YoY |
| Q2 2024 | GitHub AI repos created | XXK | +XX% YoY |
```

**Hype vs. reality table** (optional, for topics with inflated coverage):
```
| Claim | Evidence Level | Verdict |
|-------|---------------|---------|
| "X will replace Y" | Low — no deployment data | Premature |
| "Adoption growing 3x" | High — vendor survey, n=1000 | Supported |
```

**Real chart rendering (optional, preferred when numeric data available)**:

Instead of stopping at ASCII / Markdown tables, upgrade to rendered images:

| Pattern | Command |
|---|---|
| Timeline with dated events | `/visual-content:infographic-dsl --template sequence-timeline-simple` |
| Trend metrics over time | `/visual-content:chart --type line` (or `area` for cumulative) |
| Category comparison | `/visual-content:chart --type column` |
| Adoption S-curve | `/visual-content:chart --type area` |
| Data report with embedded mini-charts + prose | `/visual-content:narrative-viz` |

Pass the data file (JSON or Markdown table) as input. The skill auto-saves to `openspec/runtime/visuals/charts/<topic-slug>/` and returns a Markdown image reference you can paste into the final report.

### Step 5: Trend Forecast

Based on patterns identified, project 3 scenarios:

**Near-term (6-12 months)**: What's most likely to happen next given current trajectory?
**Mid-term (1-3 years)**: What structural outcomes does the trend point toward?
**Wild card**: What single development could significantly accelerate or reverse the trend?

For each scenario, specify:
- The key assumption it rests on
- 1-2 signals to watch that would confirm or refute the scenario

## Output

Trend analysis report with:
1. Executive summary (3-5 bullets)
2. Timeline table with events
3. Pattern analysis with evidence
4. Visualizations (timeline + metrics table)
5. Forecast with scenarios and watch signals
6. Source list with dates

## Important Notes

- Never report trends without citing specific data points — "AI is growing fast" adds no value
- Distinguish between hype cycles and structural shifts
- Flag when coverage volume ≠ actual adoption (e.g., high media coverage but low deployment data)
- Specify confidence level for forecasts: High (multiple converging signals) / Medium (single trend line) / Low (speculative)
