---
description: Generate an operations and analytics report
argument-hint: "[time period, performance/rebalance report path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for reporting details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.performance_report_md`, then `outputs.content_rebalance_md`, then `inputs.period`.
   - If argument is a time period or file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.performance_report_md`, `outputs.content_rebalance_md`, and `inputs.period`.

3. **Auto-scan legacy upstream assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/performance-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/content-rebalance/*.md 2>/dev/null | head -3
ls -t openspec/runtime/ops-report/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下运营素材，请选择要用于报告的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for reporting period and platforms to include.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `ops-report` skill and generate a professional operations and analytics report covering performance, content mix, audience growth, and recommendations.

## Artifact Handoff

**Output**: Operations report saved to:

- `openspec/runtime/ops-report/YYYY-MM-DD-<period>-ops-report.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/ops-report.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `audience-management`
  - `outputs.ops_report_md`: ops report path
  - `next.command`: `/audience-management:content-rebalance`
  - `next.input`: ops report path or contract path

**Next step**: Suggest running `/audience-management:content-rebalance` to translate report findings into allocation changes.
