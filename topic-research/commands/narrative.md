---
description: Track and develop a content narrative or angle
argument-hint: "[narrative theme, upstream .openspec.json, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for narrative details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `inputs.topic`, then `outputs.release_analysis_md`, then `outputs.trend_preview_md`.
   - If argument is a narrative theme/path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/release-analysis/*.openspec.json 2>/dev/null | head -3
ls -t ai-content-output/trend-preview/*.openspec.json 2>/dev/null | head -3
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `inputs.topic`, `outputs.release_analysis_md`, and `outputs.trend_preview_md`.

3. **Auto-scan legacy narrative assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/release-analysis/*.md 2>/dev/null | head -3
ls -t ai-content-output/trend-preview/*.md 2>/dev/null | head -3
ls -t ai-content-output/narrative/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下叙事追踪素材，请选择要用于叙事分析的输入：" with files as options.

4. **No upstream found**: Only in this case, ask what narrative or angle to track.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `narrative-tracker` skill and build an evidence-based tracking document for the given narrative or content angle.

## Artifact Handoff

**Output**: Narrative tracker saved to:

- `ai-content-output/narrative/YYYY-MM-DD-<theme>-narrative.md`

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Create or update `ai-content-output/narrative/YYYY-MM-DD-<theme>-narrative.openspec.json`.
- Minimum fields:
  - `pipeline`: `narrative->short-post`
  - `stage`: `narrative`
  - `outputs.narrative_md`: narrative tracker path
  - `next.command`: `/content-production:short-post`
  - `next.input`: narrative tracker path or contract path

**Next step**: Suggest running `/content-production:short-post` to quickly test the narrative with audience feedback.
