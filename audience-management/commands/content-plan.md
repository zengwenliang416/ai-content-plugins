---
description: Create a content plan and editorial calendar
argument-hint: "[time period, rebalance/performance report path, or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for planning details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.content_rebalance_md`, then `outputs.performance_report_md`, then `inputs.period`.
   - If argument is a time period or file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.content_rebalance_md`, `outputs.performance_report_md`, and `inputs.period`.

3. **Auto-scan legacy upstream assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/content-rebalance/*.md 2>/dev/null | head -3
ls -t ai-content-output/ops-report/*.md 2>/dev/null | head -3
ls -t ai-content-output/performance-report/*.md 2>/dev/null | head -3
ls -t ai-content-output/performance-analysis/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下规划素材，请选择要用于内容规划的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for planning period, primary goals, and target platforms.

## Step 2: Load Skill and Execute

Load the `content-plan` skill and build a content plan with objectives, weekly/monthly calendar, theme planning, and resource allocation.

## Artifact Handoff

**Output**: Content plan saved to:

- `ai-content-output/content-plan/YYYY-MM-DD-<period>-content-plan.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/content-plan.md` (if contract/deep-research mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `audience-management`
  - `outputs.content_plan_md`: content plan path
  - `next.command`: `/content-production:content-tracker`
  - `next.input`: content plan path or contract path

**Next step**: Suggest running `/content-production:content-tracker` to operationalize the plan into execution tracking.
