---
description: Create an overview of an AI sub-field
argument-hint: "[AI field, upstream .openspec.json, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for field details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `inputs.field`, then `inputs.topic`, then `outputs.trend_preview_md`.
   - If argument is a field, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/trend-preview/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/daily-brief/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `inputs.field`, `inputs.topic`, and `outputs.trend_preview_md`.

3. **Auto-scan legacy overview inputs**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/trend-preview/*.md 2>/dev/null | head -3
ls -t openspec/runtime/daily-brief/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下领域综述素材，请选择要用于子领域概览的输入：" with files as options.

4. **No upstream found**: Only in this case, ask which AI sub-field to cover.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `field-overview` skill and create a comprehensive overview of the specified AI sub-field.

## Artifact Handoff

**Output**: Field overview saved to:

- `openspec/runtime/field-overview/YYYY-MM-DD-<field>-overview.md`

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Create or update `openspec/runtime/field-overview/YYYY-MM-DD-<field>-overview.openspec.json`.
- Minimum fields:
  - `pipeline`: `field-overview->long-article`
  - `stage`: `field-overview`
  - `outputs.field_overview_md`: overview path
  - `next.command`: `/content-production:long-article`
  - `next.input`: field overview path or contract path

**Next step**: Suggest running `/content-production:long-article` to turn the overview into a publishable long-form piece.
