---
name: topic-screening
description: Quickly screen a topic for content potential against key criteria — search volume, competition, audience interest, expertise fit, and timeliness. Outputs a one-page screening assessment with a HIGH / MEDIUM / LOW rating. Use when deciding whether to invest time in a topic. Triggers on "screen this topic", "is this topic worth covering", "topic potential", "should I write about", "topic screening", or "evaluate this idea".
---

# Topic Screening

## Workflow

### Step 1: Extract Topic Facts

From the provided topic or description, identify:

- **Topic**: The specific subject or angle
- **Content angle**: Informational, opinion, data-driven, tutorial, trend commentary
- **Target audience**: Who is this for?
- **Niche relevance**: Does it fit the creator's existing content niche?
- **Obvious red flags**: Overcrowded niche, evergreen vs. time-sensitive, overly broad

### Step 2: Screen Against Criteria

Evaluate the topic across five dimensions:

| Criterion | Description | Score (1-5) | Notes |
|-----------|-------------|-------------|-------|
| Search volume | Is there existing demand (SEO or discovery)? | | |
| Competition level | How saturated is this topic? | | Lower competition = higher score |
| Audience interest | Will your specific audience care? | | |
| Expertise fit | Can you credibly cover this well? | | |
| Timeliness | Is this trending now or evergreen? | | |

**Platform signal check** (24h freshness enforced | `bun news-search/scripts/doctor.ts` for status):
- Twitter/X: `bun news-search/scripts/search.ts twitter "[topic]" 10` — gauge current discourse volume
- Reddit: `bun news-search/scripts/search.ts reddit "[topic]" 5` — check community interest
- YouTube: `bun news-search/scripts/search.ts youtube "[topic]" 5` — assess existing video coverage
- Web: `bun news-search/scripts/search.ts web "[topic]" 10` — evaluate competition and demand
- See `news-search` skill for full platform reference.

**Scoring guide**:
- 5 = Strong advantage (high demand + low competition, clear expertise, strong audience fit)
- 3 = Moderate — worth considering with the right angle
- 1 = Weak — significant headwinds (saturated, out of niche, low interest)

### Step 3: Quick Assessment

Provide a 3-part assessment:

1. **Verdict**: HIGH / MEDIUM / LOW potential
2. **Bull case** (2-3 bullets): Why this topic could perform well
3. **Bear case** (2-3 bullets): Why it might not be worth the investment
4. **Recommended angle**: If proceeding, what specific angle or hook would differentiate

**Verdict criteria**:
- HIGH: Total score ≥ 20, no criterion below 3
- MEDIUM: Total score 13-19, or one criterion below 3
- LOW: Total score ≤ 12, or two or more criteria below 3

### Step 4: Output

One-page screening assessment:
- Topic summary (2-3 sentences)
- Criterion scores table
- Verdict: HIGH / MEDIUM / LOW
- Bull and bear case
- Recommended angle if pursuing
- Estimated effort (low / medium / high) to create good content on this topic

## Important Notes

- Speed matters — screening should take minutes, not hours
- Be direct about weak topics — a LOW verdict saves significant creative investment
- If a topic scores LOW on expertise fit, it may still work with external sources or interviews
- Timeliness can override low search volume — trending topics can spike traffic quickly
- Always consider the creator's unique angle — even saturated topics can work with a distinct POV
- Save common topic criteria (niche, audience type) for reuse across screenings
