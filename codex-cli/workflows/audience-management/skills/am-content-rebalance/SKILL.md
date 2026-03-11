---
name: am-content-rebalance
description: "Rebalance content mix across topics and formats"
arguments:
  - name: input
    description: "Performance/content-plan path, or pipeline.openspec.json"
---

# Content Rebalance

## Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: Complete this step BEFORE any analysis and BEFORE asking the user for details.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.performance_report_md`, then `outputs.content_plan_md`.
   - If `$ARGUMENTS` is a file path, use it directly.
   - Then skip to the Workflow section.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.performance_report_md` and `outputs.content_plan_md`.

3. **Auto-scan legacy upstream assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/performance-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/content-plan/*.md 2>/dev/null | head -3
ls -t openspec/runtime/ops-report/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下内容结构素材，请选择要用于再平衡分析的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for current content mix and target allocation.

## Language Selection (MANDATORY — after upstream detection)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Workflow

### Step 1: Current State

Capture the current content breakdown:
- **Topics covered**: List all topics published in the past period (3 months recommended)
- **Formats used**: Blog, short-form, video, newsletter, podcast, etc.
- **Platforms**: Where content is being published
- **Posting frequency**: How often per week/month per platform

Current topic distribution (estimate from recent posts):

| Topic/Category | Posts Published | % of Total | Avg. Performance |
|---------------|-----------------|-----------|-----------------|
| | | | |
| **Total** | | 100% | |

Current format distribution:

| Format | Posts Published | % of Total | Avg. Performance |
|--------|-----------------|-----------|-----------------|
| | | | |

### Step 2: Target Allocation

Define where the content mix should be:
- **Based on audience data**: Which topics and formats generate the strongest engagement?
  - **Platform signals** (via news-search CLI, 24h freshness enforced):

    > **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

    - Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "[your niche]" 10` — what resonates with audience
    - Reddit: `${TS_RUNNER} news-search/scripts/search.ts reddit "[your niche]" 10` — community demand signals
    - See `news-search` skill for full platform reference.
- **Based on strategy**: What topics need more coverage to build authority or attract a new segment?
- **Based on platform requirements**: Each platform favors certain formats (short video on TikTok/Reels, long-form on YouTube/Substack)

Target allocation:

| Topic/Category | Current % | Target % | Direction |
|---------------|-----------|----------|-----------|
| | | | More / Same / Less |

| Format | Current % | Target % | Direction |
|--------|-----------|----------|-----------|
| | | | More / Same / Less |

### Step 3: Identify Imbalances

Flag any categories significantly over or under the target:

| Category | Current | Target | Drift | Action |
|----------|---------|--------|-------|--------|
| Topic A | 40% | 25% | +15% | Reduce |
| Topic B | 5% | 20% | -15% | Increase |
| Format X | 80% | 50% | +30% | Diversify |

**Rebalancing threshold**: Flag when any category is more than 10% off from target — material imbalances worth addressing.

### Step 4: Recommend Adjustments

For each imbalance, recommend specific actions:

**Overweight topics/formats**: Don't eliminate — reduce frequency and replace with underweight categories
**Underweight topics/formats**: Add dedicated slots in the content calendar; repurpose existing long-form if possible
**Missing formats**: Plan 2-4 test pieces in the underused format before committing to regular production

**Transition plan** — avoid abrupt shifts that confuse existing audience:
- Phase rebalancing over 4-8 weeks
- Keep 1-2 popular formats/topics consistent even while introducing new ones
- Communicate format changes to the audience if significant

### Step 5: Output

Rebalancing plan:
1. **Current vs. target allocation tables** (topic and format)
2. **Drift analysis**: Which categories are most out of balance?
3. **Adjustment recommendations**: Specific changes to the content calendar
4. **Transition timeline**: 4-8 week phased rebalancing plan
5. **Success criteria**: How to measure if the rebalance is working (engagement change per topic/format)

## Artifact Handoff

**Output**: Rebalance plan saved to:

- `openspec/runtime/content-rebalance/YYYY-MM-DD-content-rebalance.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/content-rebalance.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.
- Update with:
  - `stage`: `audience-management`
  - `outputs.content_rebalance_md`: rebalance plan path
  - `next.command`: `am-content-plan`
  - `next.input`: rebalance plan path or contract path

**Next step**: Suggest running `am-content-plan` to apply rebalance decisions in the editorial calendar.

## Important Notes

- Rebalancing content is a gradual process — don't pivot everything at once
- Performance data should drive targets, not assumptions — let the data tell you what the audience wants
- Some overweight topics may be overweight because they're working — distinguish strategic excess from default behavior
- Platform-specific algorithms may constrain format rebalancing — test before committing to major changes
- After rebalancing, review performance in 4-6 weeks to validate that the new mix is working
- Document the rationale for target allocations so the logic can be revisited and updated
