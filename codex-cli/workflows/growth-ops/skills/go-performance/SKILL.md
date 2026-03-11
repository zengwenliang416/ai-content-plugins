---
name: go-performance
description: "Analyze content performance over a defined period — views, engagement, follower growth, top performers, underperformers, and actionable patterns"
arguments:
  - name: input
    description: "Time period, report path, or pipeline.openspec.json"
---

# Performance Analysis

## Step 1: Upstream Artifact Detection

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.performance_report_md` (fallback `outputs.ops_report_md`, then `inputs.period`).
   - If `$ARGUMENTS` is a period, report path, or platform scope, use it directly.
   - Then skip to Step 3.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.performance_report_md`, `outputs.ops_report_md`, and `inputs.period`.

3. **Auto-scan legacy performance assets**:

```bash
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/ops-report/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下历史分析报告，请选择要复用的报告或继续新周期分析："

4. **No upstream found**: Only in this case, ask the user for both reporting period and target platform(s).

## Step 2: Language Selection

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 3: Gather Performance Inputs

Ask for (or extract from prior data in the session):

**Period:**
- Start and end dates
- Platform(s) to analyze
- Prior period for comparison (prior month, prior quarter)

**Available metrics (will vary by platform):**
- Views / impressions per post
- Engagement (likes, comments, shares, saves)
- Engagement rate (engagement / impressions)
- Follower growth during the period
- Click-through rate (if applicable)
- Watch time or read time (for long-form content)

## Step 4: Performance Summary

Aggregate metrics for the period:

| Metric | This Period | Prior Period | Change | Change % |
|--------|-------------|--------------|--------|----------|
| Total views/impressions | | | | |
| Total engagement | | | | |
| Avg. engagement rate | | | | |
| Follower growth | | | | |
| Posts published | | | | |
| Avg. views per post | | | | |

## Step 5: Top and Bottom Performers

**Top 5 performing pieces** (by views or engagement):

| Rank | Title/Description | Views | Engagement | Engagement Rate | Format | Topic |
|------|-----------------|-------|------------|-----------------|--------|-------|
| 1 | | | | | | |

**Bottom 5 performing pieces**:

| Rank | Title/Description | Views | Engagement | Engagement Rate | Format | Topic |
|------|-----------------|-------|------------|-----------------|--------|-------|
| | | | | | | |

## Step 6: Pattern Analysis

Identify what's driving results:

**By topic**: Which topics generated the most engagement?
**By format**: Which formats (list post, opinion piece, tutorial, short video, carousel) performed best?
**By timing**: Which days/times saw the most reach or engagement?
**By length**: Short-form vs. long-form performance comparison

Look for:
- Topics consistently outperforming (signal to create more)
- Formats with above-average engagement rates
- Time patterns (morning vs. evening, weekday vs. weekend)
- Correlation between effort invested and results

## Step 7: Follower Growth Analysis

- Net followers gained
- Posts that drove the most follows
- Platforms showing strongest organic growth
- Audience quality signals (are new followers engaging?)

## Step 8: Output

Performance report with actionable insights:
1. **Executive summary**: How did content perform this period? (2-3 sentences)
2. **Metrics table**: Period-over-period comparison
3. **Top performers**: Best content with analysis of why it worked
4. **Underperformers**: What didn't land and why (if identifiable)
5. **Patterns identified**: Topics, formats, timing insights
6. **Recommendations**: What to do more of, less of, or differently next period

## Artifact Handoff

**Output**:
- Performance summary MUST be displayed in the conversation.
- Performance report saved to:
  - `openspec/runtime/performance-analysis/YYYY-MM-DD-<period-slug>-performance-report.md` (standalone mode)
  - `openspec/runtime/deep-research/<slug>/performance-report.md` (if contract/deep-research mode)

## Important Notes

- Always contextualize results — a slow month in the niche is different from underperformance
- Engagement rate matters more than raw views for audience quality
- Outlier posts (viral or very poor) can skew averages — note them separately
- Look at multi-period trends, not just one period in isolation
- Platform algorithm changes can cause unexplained swings — note if relevant
- Actionable insights are the goal — avoid data for data's sake
