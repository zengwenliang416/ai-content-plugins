# Task 3: Analysis & Synthesis - Detailed Workflow

This document provides step-by-step instructions for executing Task 3 (Analysis & Synthesis) of the deep-research skill.

## Task Overview

**Purpose**: Perform comparative analysis of the topic's landscape, assess competitive dynamics, evaluate future trajectory, and produce a content recommendation with narrative hooks.

**Prerequisites**: Data workbook from Task 2

**Output**: Analysis document (.md) + 4 tabs added to Task 2 workbook

---

## Analysis Frameworks

### Comparative Framework: Player Analysis

For each major player identified in Task 2:

**Dimension 1: Technical Capability**

- Performance on canonical benchmarks (from Task 2 Tab 3)
- Technical innovation vs. incremental improvement
- Multimodality, scale, efficiency trade-offs

**Dimension 2: Ecosystem & Access**

- Open-source vs. proprietary
- API availability and pricing
- Community size and contributor activity
- Documentation and developer experience

**Dimension 3: Commercial Position**

- Enterprise adoption and named customers
- Integration partnerships
- Distribution channels
- Revenue model sustainability

**Dimension 4: Research Pipeline**

- Paper output volume and quality
- Lab talent density
- Compute resources
- Research velocity

### Advantage/Disadvantage Assessment

For each player, produce a structured assessment:

```
[Player Name]
Strengths:
- [Specific strength with evidence]
- [Specific strength with evidence]
Weaknesses:
- [Specific weakness with evidence]
- [Specific weakness with evidence]
Moat: [What makes them hard to displace?]
Threat: [What could unseat them?]
```

### Trajectory Forecast

Assess the overall field and each major player's trajectory:

**Field Trajectory**:

- Current phase: Research / Early Product / Crossing Chasm / Mainstream / Mature
- Pace of change: Accelerating / Steady / Plateauing
- Key variable: What factor will determine the field's trajectory?
- Timing: When do key inflection points occur?

**Player Trajectories**:
For each player: Rising / Stable / Declining — and why

**Confidence Levels**:

- High: Based on observable data and trends
- Medium: Reasonable inference from current signals
- Low: Speculative, dependent on uncertain variables

---

## Content Recommendation

### WRITE Criteria (all three should be met)

- Audience interest is high and demonstrable (search volume, community buzz)
- A unique angle exists that is not saturated in existing content
- Timing is good (topic is rising but not yet peaked)

### MONITOR Criteria (one or more applies)

- Topic has high potential but is too early or too nascent
- Needs one more data point (product launch, paper, funding round) before the angle is compelling
- Audience interest is present but the "so what" isn't clear yet

### SKIP Criteria (one or more applies)

- Topic is already saturated with high-quality coverage
- Audience interest is declining (fading trend)
- The angle available is weak or derivative
- Timing is off (too early or too late)

### How to Document the Recommendation

```
CONTENT RECOMMENDATION: [WRITE / MONITOR / SKIP]

Rationale:
- [Primary reason — 2-3 sentences]
- [Supporting evidence — cite specific data points]

If WRITE:
  Best angle: [Specific narrative hook]
  Target audience: [Who cares most]
  Best timing: [Now / Next X weeks / After Y event]

If MONITOR:
  Trigger to revisit: [What event or signal to watch for]
  Expected timeline: [When to check back]

If SKIP:
  Why saturated/low-value: [Brief explanation]
  Alternative angle (if any): [Is there a sub-angle worth considering?]
```

---

## Narrative Hooks Identification

Identify 3-5 narrative hooks — angles that make the article compelling:

**Tension hooks**: "Everyone thinks X but actually Y"
**Stakes hooks**: "Why this matters more than you think"
**Timing hooks**: "Why now is the key moment to understand this"
**Underdog hooks**: "The approach no one is talking about"
**Consequences hooks**: "What happens if X wins"

For each hook:

- One-line hook title
- Why this angle is compelling (audience insight)
- Key evidence or data point that powers the hook
- Risk (why this angle might not land)

---

## Step-by-Step Execution

### Step 1: Load and Review Task 2 Data

1. Open the data workbook from Task 2
2. Review all 6 tabs for completeness
3. Note any data gaps that affect analysis
4. Identify the strongest data points (most recent, most reliable)

### Step 2: Build Comparative Analysis

1. Create comparative matrix from player comparison tab
2. Apply the four-dimension framework to each player
3. Write advantage/disadvantage assessment for each
4. Identify clear leaders, challengers, and laggards

### Step 3: Assess Field Trajectory

1. Review timeline tab for pace of progress
2. Assess benchmark improvements over time (Technical Benchmarks tab)
3. Cross-reference with market data trends (Market Data tab)
4. Project trajectory for each scenario (Scenarios tab)
5. Assign confidence levels

### Step 4: Make Content Recommendation

1. Apply WRITE/MONITOR/SKIP criteria
2. If WRITE, identify the best angle
3. Generate 3-5 narrative hooks
4. Document rationale with data citations

### Step 5: Write Analysis Document

Structure:

1. **Executive Summary** (200-300 words) — key findings and recommendation
2. **Comparative Analysis** (1,000-1,500 words) — player-by-player assessment
3. **Field Trajectory** (600-800 words) — where this is heading and why
4. **Content Recommendation** (300-500 words) — WRITE/MONITOR/SKIP with full rationale
5. **Narrative Hooks** (300-400 words) — 3-5 angles with rationale

### Step 6: Add Excel Tabs

Add to the Task 2 workbook:

- **Tab: Comparative Analysis** — structured player comparison matrix with ratings
- **Tab: Trajectory Forecast** — field and player trajectory table with confidence levels
- **Tab: Recommendation Summary** — WRITE/MONITOR/SKIP decision with rationale bullets
- **Tab: Talking Points** — 3-5 narrative hooks with evidence bullets

---

## Quality Standards

- Every claim backed by data from Task 2 workbook
- Recommendation rationale is specific (not "interesting topic" — cite actual data)
- Trajectory forecast distinguishes high/medium/low confidence
- Narrative hooks are genuinely compelling — test each against "would a reader click this?"
- Analysis document: 4-6 pages, full paragraphs (not bullet lists)

---

## Output Path

Save to: `ai-content-output/deep-research/<slug>/analysis.md`

Example: `ai-content-output/deep-research/llm-agents/analysis.md`
