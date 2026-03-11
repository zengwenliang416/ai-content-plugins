---
name: go-account-portfolio
description: "Track and analyze content account performance across platforms — follower growth, engagement, views, posting activity, trends, and action items"
arguments:
  - name: input
    description: "Account/platform, performance data path, or pipeline.openspec.json"
---

# Account Portfolio Monitoring

## Step 1: Upstream Artifact Detection

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.performance_report_md`, then `outputs.content_roi_md`, then `inputs.platform`.
   - If `$ARGUMENTS` is account/platform info or a report path, use it directly.
   - Then skip to Step 3.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.performance_report_md`, `outputs.content_roi_md`, and `inputs.platform`.

3. **Auto-scan legacy monitoring assets**:

```bash
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/content-roi/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下账号监控素材，请选择要用于账号组合复盘的输入："

4. **No upstream found**: Only in this case, ask which platforms and accounts to include in the review.

## Step 2: Language Selection

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 3: Identify Accounts

- **Platforms**: Which platforms to include (Twitter/X, LinkedIn, YouTube, Substack, Instagram, TikTok, podcast, blog)
- **Reporting period**: Monthly, quarterly, or custom range
- **Benchmarks**: Prior period performance, growth targets, or platform averages
- **Key concerns**: Any platform-specific issues (algorithm changes, engagement drops, content violations) to flag

## Step 4: Metrics Extraction & Variance Analysis

Key metrics to track per platform (adapt to what's available):

**Growth KPIs:**
- Follower/subscriber count (end of period vs. start)
- Net follower growth (gained minus lost)
- Follower growth rate (%)

**Content Performance KPIs:**
- Total views / impressions
- Average views per post
- Engagement rate (likes + comments + shares / impressions)
- Top-performing piece (views, engagement)
- Worst-performing piece

**Activity KPIs:**
- Posts published this period
- Posting frequency (posts per week)
- Consistency score (did posting schedule hold?)

## Step 5: Flag & Summarize

- **Green**: Metrics on track or above target
- **Yellow**: 10-20% below target or prior period — flag for review
- **Red**: >20% below target, significant drop, or platform issue — immediate attention

Output a concise summary per platform:
1. One-paragraph status ("Platform X is tracking [ahead/behind/on] target...")
2. KPI table with actual vs. prior period vs. target
3. Yellow/red flags with context
4. Any platform-level events (algorithm update, feature launch, outage) that affected results

## Step 6: Cross-Platform Trend Analysis

If multiple platforms are tracked:
- Which platform is growing fastest?
- Where is engagement strongest relative to audience size?
- Are there content formats performing consistently across platforms?
- Is there an audience migration pattern (e.g., short-form declining, long-form growing)?

## Step 7: Action Items

Flag specific actions to take:
- Platforms where posting consistency needs to improve
- Content types to double down on based on performance
- Platform-specific features to test (new format, distribution tool, monetization feature)
- Competitor or algorithm changes to respond to

## Step 8: Output

Dashboard-style monitoring report:
1. **Executive summary**: One paragraph on overall account health
2. **Platform KPI table**: All platforms side-by-side with period-over-period changes
3. **Flags**: Yellow and red items with recommended actions
4. **Top content**: Best-performing pieces this period with metrics
5. **Action items**: Prioritized list of what to do before next review

## Artifact Handoff

**Output**: Account portfolio report saved to:
- `openspec/runtime/account-portfolio/YYYY-MM-DD-account-portfolio.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/account-portfolio.md` (if contract/deep-research mode)

## Important Notes

- Always compare to prior period AND stated targets — both matter
- Engagement rate is more meaningful than raw follower count
- A single viral post can skew averages — note outliers separately
- Platform algorithms change frequently — distinguish algorithmic effects from content quality shifts
- Don't optimize for vanity metrics; follower growth without engagement is low value
- Output should be shareable with team members or collaborators if needed
