---
name: tr-trend-preview
description: "Preview upcoming AI trends by identifying signals from conferences, paper clusters, funding, and job postings, then analyzing momentum and assessing content opportunity"
arguments:
  - name: input
    description: "Topic or field to analyze, upstream .openspec.json, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE any other interaction and BEFORE asking the user for trend scope. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `inputs.topic`, then `outputs.daily_brief_md`.
   - If argument is a topic/field, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/daily-brief/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/brainstorm/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `inputs.topic` and `outputs.daily_brief_md`.

3. **Auto-scan legacy trend inputs**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/daily-brief/*.md 2>/dev/null | head -3
ls -t openspec/runtime/brainstorm/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下趋势预览素材，请选择要用于趋势分析的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for topic/field and desired time horizon.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Execute Trend Preview

Generate a forward-looking trend forecast identifying emerging AI trends, assessing their momentum and trajectory, and evaluating content opportunities.

### Step 2.1: Identify Trend Signals

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

> **CONSTRAINT**: Execute all `news-search` commands via Bash tool. Do NOT substitute with Claude's built-in WebSearch. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "<trend-keyword>" 20`
- Reddit: `${TS_RUNNER} news-search/scripts/search.ts reddit "<trend-keyword>" 10`
- GitHub: `${TS_RUNNER} news-search/scripts/search.ts github "<trend-keyword>" 10`
- YouTube: `${TS_RUNNER} news-search/scripts/search.ts youtube "<trend-keyword>" 10`

### Step 2.2: Analyze Momentum and Trajectory

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

### Step 2.3: Assess Content Opportunity

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

### Step 2.4: Generate Trend Forecast

Produce ranked list of trends with:
- Trend name and description
- Momentum score + trajectory
- Phase assessment
- Content opportunity rating (High / Medium / Low)
- Recommended timing (Now / 1-3 months / 3-6 months / Skip)
- Suggested angle for content

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

## Artifact Handoff

**Output**: Trend preview saved to `openspec/runtime/trend-preview/YYYY-MM-DD-<topic>-trend-preview.md`

**OpenSpec contract (MANDATORY)**:

- Create or update `openspec/runtime/trend-preview/YYYY-MM-DD-<topic>-trend-preview.openspec.json`.
- Minimum fields:
  - `pipeline`: `trend-preview->short-post`
  - `stage`: `trend-preview`
  - `outputs.trend_preview_md`: trend preview path
  - `next.command`: `short-post`
  - `next.input`: trend preview path or contract path

**Next step**: Suggest running a short-post skill to quickly publish on high-momentum trends.

## Quality Standards

- Minimum 5 trends assessed (3+ Tier 1, 2+ Tier 2)
- Every trend must have at least 2 independent signal sources
- Momentum scores must be justified by specific data points
- Timing recommendations must distinguish between early/optimal/late
- Suggested angles must be specific — not "write an overview"
