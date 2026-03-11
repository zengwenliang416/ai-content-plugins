---
name: am-ops-report
description: "Generate an operations and analytics report"
arguments:
  - name: input
    description: "Time period, performance/rebalance report path, or pipeline.openspec.json"
---

# Operations Report

## Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: Complete this step BEFORE any reporting and BEFORE asking the user for details.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.performance_report_md`, then `outputs.content_rebalance_md`, then `inputs.period`.
   - If `$ARGUMENTS` is a time period or file path, use it directly.
   - Then skip to the Workflow section.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.performance_report_md`, `outputs.content_rebalance_md`, and `inputs.period`.

3. **Auto-scan legacy upstream assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/performance-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/content-rebalance/*.md 2>/dev/null | head -3
ls -t openspec/runtime/ops-report/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下运营素材，请选择要用于报告的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for reporting period and platforms to include.

## Language Selection (MANDATORY — after upstream detection)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Workflow

### Step 1: Report Parameters

- **Account**: Which creator account or platform group
- **Reporting period**: Month, quarter, custom range
- **Platforms**: Which platforms to include
- **Benchmarks**: Prior period, stated targets, or platform averages
- **Branding**: Creator name, brand, or team name for the report header

### Step 2: Performance Summary

**Platform Summary Table:**

| | Followers (EOD) | Followers (SOD) | Net Growth | Views | Engagement | Avg. Eng. Rate |
|---|---|---|---|---|---|---|
| Platform A | | | | | | |
| Platform B | | | | | | |
| Platform C | | | | | | |
| **Total** | | | | | | |

**Period-over-period comparison:**

| Metric | This Period | Prior Period | Change % |
|--------|-------------|--------------|----------|
| Total followers | | | |
| Total views | | | |
| Avg. engagement rate | | | |
| Posts published | | | |

### Step 3: Content Mix Overview

Breakdown of content published this period:

| Topic/Category | Posts | % of Total | Avg. Views | Avg. Eng. Rate |
|---------------|-------|-----------|-----------|----------------|
| | | | | |

| Format | Posts | % of Total | Avg. Views | Avg. Eng. Rate |
|--------|-------|-----------|-----------|----------------|
| | | | | |

Visual note: Recommend a pie chart for topic distribution and a bar chart for format performance.

### Step 4: Top Performers

Best content pieces this period:

| Rank | Title/Description | Platform | Format | Views | Engagement | Eng. Rate | Why It Worked |
|------|-----------------|----------|--------|-------|------------|-----------|---------------|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |

### Step 5: Audience Growth

- Net followers gained by platform
- Any significant audience demographic shifts (if data available)
- Follower sources: organic content, collaboration, paid, search
- Most-followed content pieces (what drove the most profile visits or follows)

### Step 6: Activity Summary

- Total posts published by platform
- Collaborations executed
- Campaigns or series launched
- Sponsorships or brand deals active
- Any platform changes or tests initiated (new format, new posting time)

### Step 7: Recommendations

Based on the data, what to prioritize next period:
- Top 3 actions to take
- What to do more of (high-performing topics or formats)
- What to reduce or stop
- Experiments to run next period

### Step 8: Output

- 4-8 page report (Markdown, Word, or PDF)
- Structure:
  1. Cover / header (account name, period, date generated)
  2. Executive summary (1 paragraph)
  3. Performance summary table
  4. Content mix overview
  5. Top performers
  6. Audience growth
  7. Activity summary
  8. Recommendations and next steps

## Artifact Handoff

**Output**: Operations report saved to:

- `openspec/runtime/ops-report/YYYY-MM-DD-<period>-ops-report.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/ops-report.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.
- Update with:
  - `stage`: `audience-management`
  - `outputs.ops_report_md`: ops report path
  - `next.command`: `am-content-rebalance`
  - `next.input`: ops report path or contract path

**Next step**: Suggest running `am-content-rebalance` to translate report findings into allocation changes.

## Important Notes

- Performance must be net of any paid boosting unless specifically noted otherwise
- Reports should be consistent period over period — use the same template and metrics
- Match the level of detail to the audience — team members may want full data; brand partners want headline numbers
- Benchmark against prior period AND stated targets — both perspectives matter
- Flag any external factors (platform outages, algorithm changes, viral moments) that skewed results
- Review for accuracy before sharing externally
