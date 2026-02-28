---
description: Review and analyze audience demographics and behavior
argument-hint: "[platform, audience report path, or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for analysis details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.ops_report_md`, then `outputs.performance_report_md`, then `inputs.platform`.
   - If argument is a platform or report path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.ops_report_md`, `outputs.performance_report_md`, and `inputs.platform`.

3. **Auto-scan legacy audience assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/ops-report/*.md 2>/dev/null | head -3
ls -t ai-content-output/performance-analysis/*.md 2>/dev/null | head -3
ls -t ai-content-output/performance-report/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下受众分析素材，请选择要用于受众复盘的输入：" with files as options.

4. **No upstream found**: Only in this case, ask which platforms to analyze and what audience data is available.

## Step 2: Load Skill and Execute

Load the `audience-review` skill and prepare an audience analysis with demographics, engagement patterns, segment breakdown, and persona cards.

## Artifact Handoff

**Output**: Audience review saved to:

- `ai-content-output/audience-review/YYYY-MM-DD-<platform>-audience-review.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/audience-review.md` (if contract/deep-research mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `audience-management`
  - `outputs.audience_review_md`: audience review path
  - `next.command`: `/audience-management:content-plan`
  - `next.input`: audience review path or contract path

**Next step**: Suggest running `/audience-management:content-plan` to turn audience findings into an executable calendar.
