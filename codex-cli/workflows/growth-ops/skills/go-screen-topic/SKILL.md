---
name: go-screen-topic
description: "Quickly screen a topic for content potential against key criteria — search volume, competition, audience interest, expertise fit, and timeliness"
arguments:
  - name: input
    description: "Topic, brainstorm path, or pipeline.openspec.json"
---

# Topic Screening

## Step 1: Upstream Artifact Detection

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.brainstorm_md` (fallback `outputs.daily_brief_md` or `inputs.topic`).
   - If `$ARGUMENTS` is a topic/path, use it directly.
   - Then skip to Step 3.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.brainstorm_md`, `outputs.daily_brief_md`, and `inputs.topic`.

3. **Auto-scan upstream brainstorming assets**:

```bash
ls -t openspec/runtime/brainstorm/*.md 2>/dev/null | head -3
ls -t openspec/runtime/daily-brief/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下选题素材，请选择要评估的话题来源："

4. **No upstream found**: Only in this case, ask the user for the topic and content niche.

## Step 2: Language Selection

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 3: Extract Topic Facts

From the provided topic or description, identify:

- **Topic**: The specific subject or angle
- **Content angle**: Informational, opinion, data-driven, tutorial, trend commentary
- **Target audience**: Who is this for?
- **Niche relevance**: Does it fit the creator's existing content niche?
- **Obvious red flags**: Overcrowded niche, evergreen vs. time-sensitive, overly broad

## Step 4: Screen Against Criteria

Evaluate the topic across five dimensions:

| Criterion | Description | Score (1-5) | Notes |
|-----------|-------------|-------------|-------|
| Search volume | Is there existing demand (SEO or discovery)? | | |
| Competition level | How saturated is this topic? | | Lower competition = higher score |
| Audience interest | Will your specific audience care? | | |
| Expertise fit | Can you credibly cover this well? | | |
| Timeliness | Is this trending now or evergreen? | | |

**Platform signal check** (via news-search CLI, 24h freshness enforced):

> **CONSTRAINT**: Execute all `news-search` commands via Bash. Do NOT substitute with WebSearch. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "[topic]" 10`
- Reddit: `${TS_RUNNER} news-search/scripts/search.ts reddit "[topic]" 5`
- YouTube: `${TS_RUNNER} news-search/scripts/search.ts youtube "[topic]" 5`
- Web: `${TS_RUNNER} news-search/scripts/search.ts web "[topic]" 10`

**Scoring guide**:
- 5 = Strong advantage (high demand + low competition, clear expertise, strong audience fit)
- 3 = Moderate — worth considering with the right angle
- 1 = Weak — significant headwinds (saturated, out of niche, low interest)

## Step 5: Quick Assessment

Provide a 3-part assessment:

1. **Verdict**: HIGH / MEDIUM / LOW potential
2. **Bull case** (2-3 bullets): Why this topic could perform well
3. **Bear case** (2-3 bullets): Why it might not be worth the investment
4. **Recommended angle**: If proceeding, what specific angle or hook would differentiate

**Verdict criteria**:
- HIGH: Total score >= 20, no criterion below 3
- MEDIUM: Total score 13-19, or one criterion below 3
- LOW: Total score <= 12, or two or more criteria below 3

## Step 6: Output

One-page screening assessment:
- Topic summary (2-3 sentences)
- Criterion scores table
- Verdict: HIGH / MEDIUM / LOW
- Bull and bear case
- Recommended angle if pursuing
- Estimated effort (low / medium / high) to create good content on this topic

## Artifact Handoff

**Output**: Screening result saved to:
- `openspec/runtime/topic-screening/YYYY-MM-DD-<topic-slug>-screening.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/screen-topic.md` (if contract/deep-research mode)

## Important Notes

- Speed matters — screening should take minutes, not hours
- Be direct about weak topics — a LOW verdict saves significant creative investment
- If a topic scores LOW on expertise fit, it may still work with external sources or interviews
- Timeliness can override low search volume — trending topics can spike traffic quickly
- Always consider the creator's unique angle — even saturated topics can work with a distinct POV
