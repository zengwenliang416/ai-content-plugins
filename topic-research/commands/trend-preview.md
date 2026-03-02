---
description: Preview upcoming AI trends and developments
argument-hint: "[topic/field, upstream .openspec.json, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for trend scope. Do NOT skip this step.

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

If contracts found → read and prioritize `inputs.topic` and `outputs.daily_brief_md`.

3. **Auto-scan legacy trend inputs**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/daily-brief/*.md 2>/dev/null | head -3
ls -t openspec/runtime/brainstorm/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下趋势预览素材，请选择要用于趋势分析的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for topic/field and desired time horizon.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `trend-preview` skill and generate a trend forecast with momentum analysis and content opportunity assessment.

## Artifact Handoff

**Output**: Trend preview saved to:

- `openspec/runtime/trend-preview/YYYY-MM-DD-<topic>-trend-preview.md`

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Create or update `openspec/runtime/trend-preview/YYYY-MM-DD-<topic>-trend-preview.openspec.json`.
- Minimum fields:
  - `pipeline`: `trend-preview->short-post`
  - `stage`: `trend-preview`
  - `outputs.trend_preview_md`: trend preview path
  - `next.command`: `/content-production:short-post`
  - `next.input`: trend preview path or contract path

**Next step**: Suggest running `/content-production:short-post` to quickly publish on high-momentum trends.
