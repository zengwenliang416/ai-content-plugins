---
description: Create a content plan and editorial calendar
argument-hint: "[time period, rebalance/performance report path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for planning details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.content_rebalance_md`, then `outputs.performance_report_md`, then `inputs.period`.
   - If argument is a time period or file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.content_rebalance_md`, `outputs.performance_report_md`, and `inputs.period`.

3. **Auto-scan legacy upstream assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/content-rebalance/*.md 2>/dev/null | head -3
ls -t openspec/runtime/ops-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下规划素材，请选择要用于内容规划的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for planning period, primary goals, and target platforms.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `content-plan` skill and build a content plan with objectives, weekly/monthly calendar, theme planning, and resource allocation.

## Artifact Handoff

**Output**: Content plan saved to:

- `openspec/runtime/content-plan/YYYY-MM-DD-<period>-content-plan.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/content-plan.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `audience-management`
  - `outputs.content_plan_md`: content plan path
  - `next.command`: `/content-production:content-tracker`
  - `next.input`: content plan path or contract path

**Next step**: Suggest running `/content-production:content-tracker` to operationalize the plan into execution tracking.
