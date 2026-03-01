---
description: Identify and clean up underperforming content
argument-hint: "[content inventory path, performance data, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for cleanup scope. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.performance_report_md`, then `outputs.content_plan_md`, then `outputs.content_rebalance_md`.
   - If argument is a file path or cleanup scope, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.performance_report_md`, `outputs.content_plan_md`, and `outputs.content_rebalance_md`.

3. **Auto-scan legacy cleanup assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/performance-analysis/*.md 2>/dev/null | head -3
ls -t ai-content-output/performance-report/*.md 2>/dev/null | head -3
ls -t ai-content-output/content-plan/*.md 2>/dev/null | head -3
ls -t ai-content-output/content-rebalance/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下内容治理素材，请选择要用于清理分析的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for content inventory and performance metrics.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `content-cleanup` skill to identify underperforming content, categorize action items (update, merge, archive, delete), and produce a prioritized cleanup plan.

## Artifact Handoff

**Output**: Cleanup plan saved to:

- `ai-content-output/content-cleanup/YYYY-MM-DD-content-cleanup.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/content-cleanup.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `ai-content-output/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `audience-management`
  - `outputs.content_cleanup_md`: cleanup plan path
  - `next.command`: `/audience-management:content-plan`
  - `next.input`: cleanup plan path or contract path

**Next step**: Suggest running `/audience-management:content-plan` to apply cleanup decisions into the next cycle.
