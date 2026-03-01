---
description: Post content to X (Twitter)
argument-hint: "[text/article file or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for publish input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.short_post_md`, then `outputs.article_md`, then `outputs.article_html`.
   - If argument is text or an article file, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.short_post_md`, `outputs.article_md`, and `outputs.article_html`.

3. **Auto-scan legacy publish assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/articles/*.md 2>/dev/null | head -3
ls -t ai-content-output/articles/*.html 2>/dev/null | head -3
ls -t ai-content-output/short-post/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下待发布内容，请选择要发布到 X 的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for content text or article path.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `x-publisher` skill and post the content to X (Twitter).

## Artifact Handoff

**Output**:

- Post result MUST be shown in conversation.
- Publish record SHOULD be saved to `ai-content-output/publishing/x/YYYY-MM-DD-<slug>.md`.

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `publishing`
  - `outputs.x_post_id`: published post id (if available)
  - `outputs.x_post_url`: published post URL (if available)
  - `next.command`: `none`
  - `next.input`: `none`

**Next step**: Suggest reviewing engagement later with `/growth-ops:performance`.
