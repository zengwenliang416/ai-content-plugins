---
description: Create a growth strategy for your content account
argument-hint: "[platform/account, ROI report path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for strategy details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.content_roi_md`, then `outputs.performance_report_md`, then `outputs.content_plan_md`.
   - If argument is an account/platform or strategy file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.content_roi_md`, `outputs.performance_report_md`, and `outputs.content_plan_md`.

3. **Auto-scan legacy growth assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/content-roi/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/content-plan/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下增长规划素材，请选择要用于增长策略的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for account details and growth goals.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `growth-plan` skill and build a structured growth strategy: current state assessment, growth levers, 90-day action plan, and measurement framework.

## Artifact Handoff

**Output**: Growth plan saved to:

- `openspec/runtime/growth-plan/YYYY-MM-DD-<account>-growth-plan.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/growth-plan.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `growth-ops`
  - `outputs.growth_plan_md`: growth plan path
  - `next.command`: `/growth-ops:strategy-memo`
  - `next.input`: growth plan path or contract path

**Next step**: Suggest running `/growth-ops:strategy-memo` to convert the plan into an executive decision memo.
