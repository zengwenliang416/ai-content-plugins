---
name: cp-audience
description: "Define and analyze target audience segments for content planning and distribution"
arguments:
  - name: input
    description: "Niche/topic, research path, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY)

Complete this step BEFORE any other interaction.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `pipeline.openspec.json`, read it first and prioritize `outputs.trend_preview_md`, then `outputs.narrative_md`, then `inputs.topic`.
   - If `$ARGUMENTS` is a niche/topic or research path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/trend-preview/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/narrative/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.trend_preview_md`, `outputs.narrative_md`, and `inputs.topic`.

3. **Auto-scan legacy audience inputs**:

```bash
ls -t openspec/runtime/trend-preview/*.md 2>/dev/null | head -3
ls -t openspec/runtime/narrative/*.md 2>/dev/null | head -3
ls -t openspec/runtime/audience-targeting/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下受众定位素材，请选择要用于受众分析的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for content focus and intended platform.

## Language Selection (MANDATORY)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Core Workflow

### Understand Content Focus

- Topic or niche of the content
- Platform(s) where content will be published
- Content format (articles, short posts, videos, infographics)
- Current follower size and demographics (if known)
- Content goals (awareness, engagement, conversions, community)

### Audience Segments

Map the potential audience into four standard segments:

**Practitioners**
- Who: Engineers, researchers, operators actively working in the field
- Motivation: Solve specific problems, stay current, share with peers
- Content they love: Technical depth, case studies, tool comparisons, tutorials

**Decision Makers**
- Who: CTOs, VPs, managers evaluating tools, vendors, or strategies
- Motivation: Make better decisions, reduce risk, justify choices
- Content they love: Comparisons, ROI analysis, frameworks, trend summaries

**Enthusiasts**
- Who: Tech-curious generalists, students, curious professionals adjacent to the field
- Motivation: Understand the space, sound informed, explore career options
- Content they love: Explainers, "what is X", trend pieces, accessible overviews

**Students / Learners**
- Who: Actively studying the topic, building skills, career changers
- Motivation: Learn concepts, get practical guidance, build portfolio
- Content they love: Step-by-step guides, foundational explainers, project ideas

### Per-Segment Profile

For each relevant segment, define:

| Attribute | Details |
|-----------|---------|
| Demographics | Age range, geography, professional background |
| Core interests | What else they follow, adjacent topics |
| Pain points | What frustrates them in this space |
| Content preferences | Depth, tone, format, length |
| Platform usage | Where they spend time and engage |
| Engagement triggers | What makes them share, comment, or save |

### Prioritization

Tier segments by engagement and growth potential:

- **Tier 1 (Primary)**: Largest addressable group with highest engagement likelihood — build all cornerstone content for these readers
- **Tier 2 (Secondary)**: Valuable but smaller or harder to reach — create occasional specialized content
- **Tier 3 (Aspirational)**: Worth targeting long-term but not the focus now

### Content Strategy per Segment

| Content Type | Best Segment | Example |
|-------------|-------------|---------|
| Deep technical tutorial | Practitioners | "How to implement X in production" |
| Framework / decision guide | Decision Makers | "5 questions to ask before buying X" |
| Trend overview | Enthusiasts | "What's happening in X in 2025" |
| Beginner explainer | Students | "X explained from scratch" |
| Case study | All (different angles) | "[Company] increased Y by Z% using X" |

### Output

- Audience analysis document with:
  - Segment definitions and profiles
  - Tier prioritization with rationale
  - Content strategy matrix (segment x content type)
  - Persona cards (1 per Tier 1 segment): name, role, quote, goals, frustrations

## Artifact Handoff

**Output path**:

- `openspec/runtime/audience-targeting/YYYY-MM-DD-<topic>-audience-targeting.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/audience-targeting.md` (pipeline mode)

**OpenSpec contract (MANDATORY)**:

- Standalone: create or update a stage-local `*.openspec.json` contract.
- Pipeline: update `pipeline.openspec.json` in-place with `stage: content-production`, `outputs.audience_targeting_md`, `next.command: /content-production:short-post`.

## Important Notes

- Knowing your Tier 1 audience changes every content decision — write for them by default
- Practitioners and Decision Makers share overlap but want different depths; don't conflate them
- Platform shapes audience more than topic — the same piece lands differently on LinkedIn vs 小红书
- Update the audience analysis every 3-6 months as the account grows and the niche evolves
- Ask the account owner if there are audience types to prioritize or avoid
