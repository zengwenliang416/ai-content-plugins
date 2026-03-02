---
description: Analyze content performance and trends
argument-hint: "[time period, report path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.performance_report_md` (fallback `outputs.ops_report_md`, then `inputs.period`).
   - If argument is a period, report path, or platform scope, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.performance_report_md`, `outputs.ops_report_md`, and `inputs.period`.

3. **Auto-scan legacy performance assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/ops-report/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下历史分析报告，请选择要复用的报告或继续新周期分析：" with files as options.

4. **No upstream found**: Only in this case, ask the user for both reporting period and target platform(s).

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `performance-analysis` skill and analyze content performance over the resolved period — top performers, underperformers, period-over-period changes, and actionable patterns.

## Artifact Handoff

**Output**:

- Performance summary MUST be displayed in the conversation.
- Performance report SHOULD be saved to:
  - `openspec/runtime/performance-analysis/YYYY-MM-DD-<period-slug>-performance-report.md` (standalone mode)
  - `openspec/runtime/deep-research/<slug>/performance-report.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `growth-ops`
  - `inputs.period`: resolved reporting period
  - `outputs.performance_report_md`: performance report path
  - `next.command`: `/growth-ops:content-roi`
  - `next.input`: selected report path, period, or contract path

**Next step**: Suggest `/growth-ops:content-roi` as the immediate deterministic next step; use `/growth-ops:growth-plan` after ROI review.
