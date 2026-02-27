---
name: content-rebalance
description: Analyze current content mix, compare to target allocation, identify imbalances, and recommend adjustments to align content with audience preferences and strategic goals. Use when content feels scattered, a pivot is needed, or quarterly strategy calls for a reset. Triggers on "content rebalance", "rebalance my content", "content mix review", "fix my content mix", "too much of one topic", or "realign content strategy".
---

# Content Rebalance

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
  - **Platform signals** (24h freshness enforced | `bun news-search/scripts/doctor.ts` for status):
    - Twitter/X: `bun news-search/scripts/search.ts twitter "[your niche]" 10` — what resonates with audience
    - Reddit: `bun news-search/scripts/search.ts reddit "[your niche]" 10` — community demand signals
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

## Important Notes

- Rebalancing content is a gradual process — don't pivot everything at once
- Performance data should drive targets, not assumptions — let the data tell you what the audience wants
- Some overweight topics may be overweight because they're working — distinguish strategic excess from default behavior
- Platform-specific algorithms may constrain format rebalancing — test before committing to major changes
- After rebalancing, review performance in 4-6 weeks to validate that the new mix is working
- Document the rationale for target allocations so the logic can be revisited and updated
