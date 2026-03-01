---
description: Analyze a new AI product release or paper
argument-hint: "[product/paper, upstream .openspec.json, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user what to analyze. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `inputs.topic`, then `outputs.trend_preview_md`, then `outputs.daily_brief_md`.
   - If argument is a product or paper name/path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/trend-preview/*.openspec.json 2>/dev/null | head -3
ls -t ai-content-output/daily-brief/*.openspec.json 2>/dev/null | head -3
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `inputs.topic`, `outputs.trend_preview_md`, and `outputs.daily_brief_md`.

3. **Auto-scan legacy release inputs**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/trend-preview/*.md 2>/dev/null | head -3
ls -t ai-content-output/daily-brief/*.md 2>/dev/null | head -3
ls -t ai-content-output/release-analysis/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下发布分析素材，请选择要用于本次分析的输入：" with files as options.

4. **No upstream found**: Only in this case, ask what product/paper to analyze.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `release-analysis` skill and produce a structured analysis of the specified AI product release, model launch, or research paper.

## Artifact Handoff

**Output**: Release analysis saved to:

- `ai-content-output/release-analysis/YYYY-MM-DD-<target>-release-analysis.md`

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Create or update `ai-content-output/release-analysis/YYYY-MM-DD-<target>-release-analysis.openspec.json`.
- Minimum fields:
  - `pipeline`: `release-analysis->check-quality`
  - `stage`: `release-analysis`
  - `outputs.release_analysis_md`: release analysis path
  - `next.command`: `/content-analysis:check-quality`
  - `next.input`: release analysis path or contract path

**Next step**: Suggest running `/content-analysis:check-quality` before publication-oriented reuse.
