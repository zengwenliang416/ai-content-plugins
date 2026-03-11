---
name: go-growth-plan
description: "Build a structured content account growth strategy with current state assessment, growth levers, 90-day action plan, and measurement framework"
arguments:
  - name: input
    description: "Platform/account, ROI report path, or pipeline.openspec.json"
---

# Growth Plan

## Step 1: Upstream Artifact Detection

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.content_roi_md`, then `outputs.performance_report_md`, then `outputs.content_plan_md`.
   - If `$ARGUMENTS` is an account/platform or strategy file path, use it directly.
   - Then skip to Step 3.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.content_roi_md`, `outputs.performance_report_md`, and `outputs.content_plan_md`.

3. **Auto-scan legacy growth assets**:

```bash
ls -t openspec/runtime/content-roi/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/content-plan/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下增长规划素材，请选择要用于增长策略的输入："

4. **No upstream found**: Only in this case, ask the user for account details and growth goals.

## Step 2: Language Selection

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 3: Current State Assessment

Understand the starting point:
- Current follower/subscriber counts per platform
- Average views and engagement rate per post
- Content mix (topics, formats, posting frequency)
- Audience demographics and top-performing content to date
- Creator's available time, resources, and skills
- Biggest bottlenecks (content production speed, distribution, monetization)

## Step 4: Growth Levers

Map all available levers to potential impact:

### Audience Growth Levers
- **Content frequency**: Increase posting cadence on high-performing platforms
- **New formats**: Test formats with better native distribution (Reels, Shorts, Threads)
- **New platforms**: Expand to adjacent platforms where the audience already exists
- **SEO / discoverability**: Optimize for search on YouTube, Google, or podcast directories
- **Collaborations**: Cross-promotions, guest appearances, co-created content
- **Paid distribution**: Boost top-performing posts or run targeted growth campaigns
- **Community building**: Engage in comments, DMs, and relevant communities to build awareness

For each lever:
- Current state -> Target state
- Estimated follower/view impact
- Timeline to see results
- Effort required (low / medium / high)
- Confidence level (high / medium / low)

### Engagement & Retention Levers
- **Format optimization**: Improve hooks, thumbnails, titles, or open lines
- **Content series**: Build recurring formats audiences come back for
- **Audience interaction**: Polls, Q&As, community posts, reply threads
- **Email/newsletter**: Convert followers to owned audience for higher retention
- **Consistency**: Predictable posting schedule builds habitual consumption

### Monetization Levers (if applicable)
- **Brand deals and sponsorships**: Pitch or list on creator marketplaces
- **Digital products**: Guides, templates, courses, memberships
- **Platform monetization**: YouTube Partner Program, Substack paid, LinkedIn newsletters

## Step 5: 90-Day Action Plan

Prioritize the first 90 days with specific actions:

**Days 1-30: Stabilize & Establish**
- Audit current content and identify top performers to replicate
- Set clear posting schedule and stick to it
- Fix obvious gaps (bio, profile optimization, link-in-bio)
- Identify 2-3 growth levers to test this quarter

**Days 31-60: Test & Learn**
- Launch chosen growth lever experiments (new format, new platform, collab)
- Track results weekly — what's working, what's not
- Optimize top-performing content series
- Begin outreach for first collaboration if not done

**Days 61-90: Optimize & Scale**
- Double down on what's working, cut what isn't
- Publish first results-driven retrospective internally
- Set targets for next quarter based on data
- Establish repeatable systems (content calendar, repurposing workflow)

## Step 6: Measurement Framework

Define the metrics that will track growth:

| KPI | Current | 30-Day Target | 90-Day Target | Platform | Reporting Frequency |
|-----|---------|---------------|---------------|----------|-------------------|
| Total followers | | | | | Weekly |
| Avg. views per post | | | | | Weekly |
| Engagement rate | | | | | Monthly |
| Posts per week | | | | | Weekly |
| Collabs completed | | | | | Monthly |

## Step 7: Output

- Growth strategy document with:
  - Current state snapshot
  - Growth lever analysis and prioritization
  - 90-day action plan (week-by-week for first month)
  - KPI dashboard template
  - Accountability check-in format (what to review weekly)

## Artifact Handoff

**Output**: Growth plan saved to:
- `openspec/runtime/growth-plan/YYYY-MM-DD-<account>-growth-plan.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/growth-plan.md` (if contract/deep-research mode)

## Important Notes

- Pick 2-3 growth levers to focus on — spreading across 10 tactics produces no results
- Consistency beats volume — a sustainable cadence outperforms a sprint
- Audience trust is the real asset — don't sacrifice quality for frequency
- Distribution is as important as creation — good content with poor distribution underperforms
- Track leading indicators (posting frequency, outreach sent) not just lagging ones (follower count)
- Revisit and adjust the plan at 30 and 60 days — data beats assumptions
