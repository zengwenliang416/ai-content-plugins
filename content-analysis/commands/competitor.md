---
description: Analyze a competitor's content account and strategy
argument-hint: "[account/URL, analysis input path, or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for competitor details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `inputs.competitor`, then `outputs.audience_review_md`, then `outputs.ops_report_md`.
   - If argument is an account/URL or input path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `inputs.competitor`, `outputs.audience_review_md`, and `outputs.ops_report_md`.

3. **Auto-scan legacy competitor assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/audience-review/*.md 2>/dev/null | head -3
ls -t ai-content-output/ops-report/*.md 2>/dev/null | head -3
ls -t ai-content-output/competitor/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下竞品分析素材，请选择要用于竞品复盘的输入：" with files as options.

4. **No upstream found**: Only in this case, ask which account to analyze.

## Step 2: Load Skill and Execute

Load the `competitor-analysis` skill and build a competitor content account analysis for the specified account.

## Artifact Handoff

**Output**: Competitor analysis saved to:

- `ai-content-output/competitor/YYYY-MM-DD-<account>-competitor-analysis.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/competitor.md` (if contract/deep-research mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-analysis`
  - `outputs.competitor_md`: competitor analysis path
  - `next.command`: `/content-analysis:benchmark`
  - `next.input`: competitor analysis path or contract path

**Next step**: Suggest running `/content-analysis:benchmark` to compare your content with competitor baselines.
