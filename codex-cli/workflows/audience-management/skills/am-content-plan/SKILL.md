---
name: am-content-plan
description: >
  Build a weekly/monthly editorial calendar with content pillars, topic
  themes, format mix, and resource estimates — optionally based on
  performance reports or rebalance recommendations. Triggers on "content
  plan", "editorial calendar", "content calendar", "plan my content",
  "content schedule", "what should I post", "内容计划", "排期".
arguments:
  - name: input
    description: "Time period, rebalance/performance report path, or pipeline.openspec.json"
---

# Content Plan

## Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: Complete this step BEFORE any planning and BEFORE asking the user for details.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.content_rebalance_md`, then `outputs.performance_report_md`, then `inputs.period`.
   - If `$ARGUMENTS` is a time period or file path, use it directly.
   - Then skip to the Workflow section.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.content_rebalance_md`, `outputs.performance_report_md`, and `inputs.period`.

3. **Auto-scan legacy upstream assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/content-rebalance/*.md 2>/dev/null | head -3
ls -t openspec/runtime/ops-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下规划素材，请选择要用于内容规划的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for planning period, primary goals, and target platforms.

## Language Selection (MANDATORY — after upstream detection)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Workflow

### Step 1: Define Objectives

Clarify what this content plan is meant to achieve:
- **Primary goal**: Grow followers, increase engagement, launch a new topic, build an email list, generate revenue
- **Secondary goals**: Establish credibility in a niche, attract brand deals, build community
- **Time horizon**: 1 month, 1 quarter, or longer
- **Platforms**: Which platforms to plan for
- **Current baseline**: Posting frequency, engagement rate, follower count

### Step 2: Content Calendar

Build a weekly/monthly schedule with topics, formats, and platforms:

**Weekly template** (adapt to actual posting frequency):

| Day | Platform | Format | Topic/Theme | Notes |
|-----|----------|--------|-------------|-------|
| Monday | | | | |
| Wednesday | | | | |
| Friday | | | | |

**Monthly overview:**

| Week | Theme | Pillar 1 | Pillar 2 | Pillar 3 | Special |
|------|-------|----------|----------|----------|---------|
| Week 1 | | | | | |
| Week 2 | | | | | |
| Week 3 | | | | | |
| Week 4 | | | | | |

Content pillars: 3-5 recurring topic areas that define the creator's niche. Each piece of content should map to a pillar.

### Step 3: Theme Planning

**Trend research for themes** (via news-search CLI, 24h freshness enforced):

> **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "[niche] trending" 10` — what's hot in your space
- Reddit: `${TS_RUNNER} news-search/scripts/search.ts reddit "[niche]" 10` — community discussion themes
- Web: `${TS_RUNNER} news-search/scripts/search.ts web "[niche] content trends 2026" 10` — industry trends
- See `news-search` skill for full platform reference.

**Monthly themes**: Anchor each month to a central topic or campaign to create coherence:
- Define 1 primary theme per month
- Plan 1-2 content series or recurring formats per quarter
- Schedule any special events (product launches, collaborations, seasonal content)

**Series planning**: Recurring content formats that build audience habits:
- Weekly Q&A, regular roundup, monthly retrospective, ongoing tutorial series
- Series should be sustainable — can they be maintained for 6+ weeks?

**Repurposing plan**: How will content be repurposed across formats and platforms?
- Long-form -> Short clips
- Newsletter -> Social posts
- Video -> Blog post

### Step 4: Resource Allocation

Estimate time and resources per content piece:

| Format | Avg. Production Time | Frequency | Total Monthly Hours |
|--------|---------------------|-----------|---------------------|
| | | | |
| **Total** | | | |

**Constraints to flag:**
- Time bottlenecks (which formats take the most time relative to results?)
- Skills gaps (formats that require tools or skills not yet developed)
- Collaboration dependencies (content that requires external input)

### Step 5: Output

- **Editorial calendar** (weekly/monthly view with topics, formats, platforms)
- **Content pillars** and theme map
- **Series schedule** for recurring formats
- **Resource estimate** (hours per week)
- **Key dates** (launches, collabs, seasonal hooks)
- **Flexibility buffer**: Note which slots are flexible vs. fixed

## Artifact Handoff

**Output**: Content plan saved to:

- `openspec/runtime/content-plan/YYYY-MM-DD-<period>-content-plan.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/content-plan.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.
- Update with:
  - `stage`: `audience-management`
  - `outputs.content_plan_md`: content plan path
  - `next.command`: `content-production:content-tracker`
  - `next.input`: content plan path or contract path

**Next step**: Suggest running `content-production:content-tracker` to operationalize the plan into execution tracking.

## Important Notes

- A plan that isn't achievable will be abandoned — be realistic about time
- Leave 20-30% of slots flexible for trending topics and reactive content
- Content pillars provide structure; don't let them prevent timely, relevant content
- The calendar is a guide, not a contract — adjust based on performance and life
- Plan batch production sessions — creating content in batches is more efficient than daily creation
- Set a review checkpoint at mid-month to adjust the second half if needed
