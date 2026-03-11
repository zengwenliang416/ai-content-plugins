---
name: go-content-roi
description: "Calculate and compare return on investment for content pieces, formats, or campaigns — time invested versus results generated"
arguments:
  - name: input
    description: "Content piece/campaign, performance report path, or pipeline.openspec.json"
---

# Content ROI Analysis

## Step 1: Upstream Artifact Detection

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.performance_report_md`, then `outputs.ops_report_md`, then `inputs.period`.
   - If `$ARGUMENTS` is a campaign scope or file path, use it directly.
   - Then skip to Step 3.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.performance_report_md`, `outputs.ops_report_md`, and `inputs.period`.

3. **Auto-scan legacy ROI assets**:

```bash
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/ops-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/ab-test/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下 ROI 分析素材，请选择要用于 ROI 计算的输入："

4. **No upstream found**: Only in this case, ask the user for the content/campaign scope and available metrics.

## Step 2: Language Selection

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 3: Identify the Business Model

Determine how the creator measures value to tailor the analysis:
- **Audience growth model**: Value = followers gained, reach expanded
- **Engagement model**: Value = community depth, comments, DMs, shares
- **Traffic model**: Value = clicks to website, newsletter sign-ups
- **Revenue model**: Value = direct income (sponsorships, products, tips, subscriptions)
- **Hybrid**: Break down by objective

## Step 4: Define Inputs and Outputs

For each content piece or format being evaluated:

**Inputs (cost side):**
- Time invested: ideation, research, writing/recording, editing, publishing (hours)
- Tool costs: software, equipment, freelance help allocated to this piece ($ if applicable)
- Opportunity cost: what else could have been done with this time

**Outputs (value side):**
- Views / impressions
- Engagement (likes, comments, shares)
- Followers gained (attributable to this piece)
- Revenue generated (if tracked: sponsor rate per post, affiliate clicks, product sales)
- Estimated audience lifetime value (if monetized)

## Step 5: ROI Calculation

Calculate ROI across content types:

**Time-to-reach ratio**: Views / Hours invested (higher = more efficient)

**Engagement efficiency**: Total engagement / Hours invested

**Follower ROI**: Followers gained / Hours invested

**Revenue ROI** (if monetized):
- Revenue per hour: Total revenue / Hours invested
- Revenue per view: Total revenue / Total views

| Content Type | Avg. Hours | Avg. Views | Views/Hour | Avg. Engagement | Followers Gained | Revenue (if any) | Revenue/Hour |
|-------------|-----------|-----------|------------|-----------------|-----------------|------------------|--------------|
| Long-form blog | | | | | | | |
| Short-form thread | | | | | | | |
| Video (YouTube) | | | | | | | |
| Short video (Reels/Shorts) | | | | | | | |
| Newsletter issue | | | | | | | |
| Podcast episode | | | | | | | |

## Step 6: Cross-Format Comparison

Compare ROI across content types:

- Which format delivers the most reach per hour?
- Which format generates the most followers per hour?
- Which format drives the most engagement per hour?
- Which format generates the most revenue per hour (if monetized)?

Identify the top-ROI format for each objective. Note: the highest-ROI format for reach may differ from the highest-ROI format for monetization.

## Step 7: Content Strategy Implications

Based on ROI analysis:
- **Double down**: Formats with highest ROI on primary objective
- **Maintain**: Formats with moderate ROI that serve secondary goals
- **Reduce**: Formats with consistently low ROI that drain time
- **Test**: New formats not yet evaluated

## Step 8: Output

ROI analysis table with:
1. **Summary table**: All content types ranked by primary ROI metric
2. **Efficiency scores**: Views/hour, followers/hour, revenue/hour by format
3. **Investment recommendation**: Where to allocate time based on ROI data
4. **Highest-ROI strategies**: Top 2-3 content approaches to prioritize

## Artifact Handoff

**Output**: ROI report saved to:
- `openspec/runtime/content-roi/YYYY-MM-DD-<scope>-content-roi.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/content-roi.md` (if contract/deep-research mode)

## Important Notes

- Time tracking is essential — estimate if exact hours aren't known, but be consistent
- Not all ROI is captured in metrics — some content builds credibility or brand that pays off later
- Short-form content often shows higher reach-per-hour; long-form shows higher engagement quality
- Compare formats over multiple pieces, not single outliers
- Factor in repurposing: one long-form piece repurposed into 5 short-form pieces changes the ROI math significantly
- If monetized, track revenue attribution to content as accurately as possible — it drives the most important decisions
