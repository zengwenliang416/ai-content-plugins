---
name: trend-preview
description: Preview upcoming AI trends by identifying trend signals from conferences, paper clusters, funding, and job postings, then analyzing momentum and assessing content opportunity with confidence levels.
---

# Trend Preview

Generate a forward-looking trend forecast identifying emerging AI trends, assessing their momentum and trajectory, and evaluating content opportunities.

## Overview

The trend preview identifies early signals of emerging AI trends before they peak, assesses how fast each is moving, and recommends content opportunities with timing guidance.

**Output**: Trend preview report (Markdown)

---

## Workflow

### Step 1: Identify Trend Signals

Scan for early indicators of emerging or accelerating trends:

**Conference signals**:
- Recent NeurIPS / ICML / ICLR / CVPR accepted papers — what topics are clustering?
- Keynote and invited talk themes at major AI conferences
- Workshop topics and titles at upcoming conferences

**Paper cluster signals**:
- Search arXiv for topic clusters with high recent submission rates
- Look for sub-fields with sudden increase in paper volume
- Identify topics where multiple major labs published simultaneously

**Funding signals**:
- Recent large funding rounds in specific AI sub-fields
- VCs' stated thesis areas (a16z, Sequoia AI, Bessemer, etc.)
- Government AI funding announcements

**Job posting signals**:
- Rapidly growing AI job categories (LinkedIn/Indeed trends)
- New role titles emerging at major tech companies
- University AI lab hiring spikes in specific areas

**Community signals**:
- GitHub repos gaining rapid star velocity
- HuggingFace models/datasets with surging downloads
- Twitter/X discourse clusters
- Reddit and Discord communities growing fast

**Platform sources** (via news-search CLI, 24h freshness enforced):

> **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "<trend-keyword>" 20`
- Reddit: `${TS_RUNNER} news-search/scripts/search.ts reddit "<trend-keyword>" 10`
- GitHub: `${TS_RUNNER} news-search/scripts/search.ts github "<trend-keyword>" 10`
- YouTube: `${TS_RUNNER} news-search/scripts/search.ts youtube "<trend-keyword>" 10`
- See `news-search` skill for full platform reference.

### Step 2: Analyze Momentum and Trajectory

For each identified trend, assess:

**Momentum score** (1-5):
- 1: Very early signal, minimal evidence
- 2: Early indicators from 1-2 sources
- 3: Consistent signals across multiple independent sources
- 4: Strong signals with measurable growth data
- 5: High confidence, data-backed growth across all signal types

**Trajectory**:
- Accelerating: Signal strength increasing week-over-week
- Steady: Consistent growth at current pace
- Plateauing: Growth slowing, approaching peak
- Declining: Past peak, trend fading

**Phase**:
- Emerging: First signals, few practitioners aware
- Rising: Growing awareness, early adopters active
- Mainstream: Widespread awareness, crossing the chasm
- Saturated: Everyone knows about it, difficult to differentiate content

### Step 3: Assess Content Opportunity

For each trend, evaluate the content opportunity window:

**Audience interest**:
- Who cares about this trend? (researchers, practitioners, executives, general tech audience)
- How large is the addressable audience?
- Evidence: search trends, community activity, newsletter engagement signals

**Competition**:
- How much quality content already exists on this trend?
- Are major publications already covering this?
- Is there a unique angle that hasn't been taken?

**Timing window**:
- Too early: Topic is interesting but audience isn't ready — wait
- Optimal: Topic is rising, audience is primed, limited saturation — act now
- Too late: Topic is saturated, hard to differentiate — skip or find niche angle

### Step 4: Generate Trend Forecast

Produce ranked list of trends with:
- Trend name and description
- Momentum score + trajectory
- Phase assessment
- Content opportunity rating (High / Medium / Low)
- Recommended timing (Now / 1-3 months / 3-6 months / Skip)
- Suggested angle for content

---

## Output Format

```markdown
# AI Trend Preview — [Date]
[Focus area if specified, or "Broad AI Landscape"]

---

## Executive Summary

[3-5 sentence overview of the biggest trend clusters and opportunities]

---

## Trend Rankings

### Tier 1: Act Now (High opportunity, optimal timing)

#### [Trend Name]
**Category**: [Models / Products / Infrastructure / Applications / Policy]
**Momentum**: [X/5] | **Trajectory**: [Accelerating / Steady / Plateauing]
**Phase**: [Emerging / Rising / Mainstream / Saturated]

**What's happening**: [2-3 sentences describing the trend]

**Key signals**:
- [Signal 1 — source]
- [Signal 2 — source]
- [Signal 3 — source]

**Content opportunity**: HIGH
**Recommended timing**: Now
**Suggested angle**: [Specific article hook or angle]

---

[Repeat for each Tier 1 trend]

---

### Tier 2: Monitor (Good potential, needs more signal or better timing)

#### [Trend Name]
[Same format, briefer]
**Recommended timing**: [1-3 months / 3-6 months]
**Trigger to act**: [What signal to watch for]

---

### Tier 3: Watch List (Early signal, not ready for content)

- **[Trend]**: [1-2 sentence description + why it's on watch list]
- **[Trend]**: [Same]

---

## Signal Sources

[List all sources checked with dates]
```

---

## Quality Standards

- Minimum 5 trends assessed (3+ Tier 1, 2+ Tier 2)
- Every trend must have at least 2 independent signal sources
- Momentum scores must be justified by specific data points
- Timing recommendations must distinguish between early/optimal/late
- Suggested angles must be specific — not "write an overview"
