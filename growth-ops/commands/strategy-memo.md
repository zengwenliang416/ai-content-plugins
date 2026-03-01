---
description: Write a content strategy memo
argument-hint: "[strategy topic, planning report path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for memo details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.growth_plan_md`, then `outputs.content_roi_md`, then `outputs.ops_report_md`.
   - If argument is a strategy topic or report path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.growth_plan_md`, `outputs.content_roi_md`, and `outputs.ops_report_md`.

3. **Auto-scan legacy strategy assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/growth-plan/*.md 2>/dev/null | head -3
ls -t ai-content-output/content-roi/*.md 2>/dev/null | head -3
ls -t ai-content-output/ops-report/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下策略素材，请选择要用于策略备忘录的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for the strategic question or decision to address.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `strategy-memo` skill and draft a structured strategy memo with situation summary, options, recommendation, risks, and next steps.

## Artifact Handoff

**Output**: Strategy memo saved to:

- `ai-content-output/strategy-memo/YYYY-MM-DD-<topic>-strategy-memo.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/strategy-memo.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `ai-content-output/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `growth-ops`
  - `outputs.strategy_memo_md`: strategy memo path
  - `next.command`: `/audience-management:ops-report`
  - `next.input`: strategy memo path or contract path

**Next step**: Suggest running `/audience-management:ops-report` to turn strategy recommendations into an operational review baseline.
