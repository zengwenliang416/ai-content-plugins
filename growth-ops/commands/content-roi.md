---
description: Calculate ROI for content pieces or campaigns
argument-hint: "[content piece/campaign, performance report path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for ROI inputs. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.performance_report_md`, then `outputs.ops_report_md`, then `inputs.period`.
   - If argument is a campaign scope or file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.performance_report_md`, `outputs.ops_report_md`, and `inputs.period`.

3. **Auto-scan legacy ROI assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/performance-analysis/*.md 2>/dev/null | head -3
ls -t ai-content-output/performance-report/*.md 2>/dev/null | head -3
ls -t ai-content-output/ops-report/*.md 2>/dev/null | head -3
ls -t ai-content-output/ab-test/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下 ROI 分析素材，请选择要用于 ROI 计算的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for the content/campaign scope and available metrics.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `content-roi` skill and calculate return on investment for content — time invested vs. results, compared across content types and platforms.

## Artifact Handoff

**Output**: ROI report saved to:

- `ai-content-output/content-roi/YYYY-MM-DD-<scope>-content-roi.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/content-roi.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `ai-content-output/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `growth-ops`
  - `outputs.content_roi_md`: ROI report path
  - `next.command`: `/audience-management:content-rebalance`
  - `next.input`: ROI report path or contract path

**Next step**: Suggest running `/audience-management:content-rebalance` to turn ROI insight into allocation changes.
