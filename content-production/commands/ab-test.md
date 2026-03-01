---
description: Design a content A/B test or experiment
argument-hint: "[test variable, content path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for experiment inputs. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, then `outputs.short_post_md`, then `inputs.test_variable`.
   - If argument is a test variable or content path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md`, `outputs.short_post_md`, and `inputs.test_variable`.

3. **Auto-scan legacy experiment assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/deep-research/*/article.md 2>/dev/null | head -3
ls -t ai-content-output/short-post/*.md 2>/dev/null | head -3
ls -t ai-content-output/ab-test/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下实验素材，请选择要用于 A/B 测试设计的输入：" with files as options.

4. **No upstream found**: Only in this case, ask what to test and what success looks like.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `content-experiment` skill and design a content A/B test for the specified variable.

## Artifact Handoff

**Output**: A/B test plan saved to:

- `ai-content-output/ab-test/YYYY-MM-DD-<variable>-ab-test.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/ab-test.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-production`
  - `outputs.ab_test_plan_md`: A/B test plan path
  - `next.command`: `/growth-ops:content-roi`
  - `next.input`: A/B test plan path or contract path

**Next step**: Suggest running `/growth-ops:content-roi` after data collection to quantify experiment impact.
