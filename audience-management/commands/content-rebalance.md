---
description: Rebalance content mix across topics and formats
argument-hint: "[performance/content-plan path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for rebalance details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.performance_report_md`, then `outputs.content_plan_md`.
   - If argument is a file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.performance_report_md` and `outputs.content_plan_md`.

3. **Auto-scan legacy upstream assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/performance-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/content-plan/*.md 2>/dev/null | head -3
ls -t openspec/runtime/ops-report/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下内容结构素材，请选择要用于再平衡分析的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for current content mix and target allocation.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `content-rebalance` skill to analyze current content mix, compare to target allocation, identify imbalances, and recommend adjustments.

## Artifact Handoff

**Output**: Rebalance plan saved to:

- `openspec/runtime/content-rebalance/YYYY-MM-DD-content-rebalance.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/content-rebalance.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `audience-management`
  - `outputs.content_rebalance_md`: rebalance plan path
  - `next.command`: `/audience-management:content-plan`
  - `next.input`: rebalance plan path or contract path

**Next step**: Suggest running `/audience-management:content-plan` to apply rebalance decisions in the editorial calendar.
