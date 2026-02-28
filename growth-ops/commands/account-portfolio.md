---
description: Review and monitor your content account portfolio
argument-hint: "[account/platform, performance data path, or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for portfolio scope. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.performance_report_md`, then `outputs.content_roi_md`, then `inputs.platform`.
   - If argument is account/platform info or a report path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.performance_report_md`, `outputs.content_roi_md`, and `inputs.platform`.

3. **Auto-scan legacy monitoring assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/performance-analysis/*.md 2>/dev/null | head -3
ls -t ai-content-output/performance-report/*.md 2>/dev/null | head -3
ls -t ai-content-output/content-roi/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下账号监控素材，请选择要用于账号组合复盘的输入：" with files as options.

4. **No upstream found**: Only in this case, ask which platforms and accounts to include in the review.

## Step 2: Load Skill and Execute

Load the `account-monitor` skill and analyze content account performance across platforms — metrics, trends, and action items.

## Artifact Handoff

**Output**: Account portfolio report saved to:

- `ai-content-output/account-portfolio/YYYY-MM-DD-account-portfolio.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/account-portfolio.md` (if contract/deep-research mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `growth-ops`
  - `outputs.account_portfolio_md`: account portfolio report path
  - `next.command`: `/growth-ops:growth-plan`
  - `next.input`: account portfolio report path or contract path

**Next step**: Suggest running `/growth-ops:growth-plan` to convert monitoring findings into a 90-day execution plan.
