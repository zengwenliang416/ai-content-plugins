---
description: Analyze trends and data patterns in an AI topic
argument-hint: "[topic/keyword, trend input path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for trend scope. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.trend_preview_md`, then `outputs.daily_brief_md`, then `inputs.topic`.
   - If argument is a topic/keyword or input path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/trend-preview/*.openspec.json 2>/dev/null | head -3
ls -t ai-content-output/daily-brief/*.openspec.json 2>/dev/null | head -3
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.trend_preview_md`, `outputs.daily_brief_md`, and `inputs.topic`.

3. **Auto-scan legacy trend assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/trend-preview/*.md 2>/dev/null | head -3
ls -t ai-content-output/daily-brief/*.md 2>/dev/null | head -3
ls -t ai-content-output/trend-analysis/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下趋势分析素材，请选择要用于趋势分析的输入：" with files as options.

4. **No upstream found**: Only in this case, ask what AI topic or trend to analyze.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `trend-analysis` skill and analyze trends and patterns for the specified AI topic or keyword.

## Artifact Handoff

**Output**: Trend analysis saved to:

- `ai-content-output/trend-analysis/YYYY-MM-DD-<topic>-trend-analysis.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/trend-analysis.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-analysis`
  - `outputs.trend_analysis_md`: trend analysis path
  - `next.command`: `/topic-research:brainstorm`
  - `next.input`: trend analysis path or contract path

**Next step**: Suggest running `/topic-research:brainstorm` to convert trend findings into actionable topic candidates.
