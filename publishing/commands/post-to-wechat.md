---
description: Publish content to WeChat Official Account
argument-hint: "[article file path (.html/.md) or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prefer `outputs.article_html`, fallback to `outputs.article_md`.
   - If argument is a file path, use it directly.
   - HTML files skip conversion; markdown files are converted first.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_html` candidates.

3. **Auto-scan publishable content**: Run these Bash commands immediately:

```bash
# Prefer HTML (ready to publish), fallback to Markdown
ls -t ai-content-output/deep-research/*/article.html 2>/dev/null | head -3
ls -t ai-content-output/deep-research/*/article.md 2>/dev/null | head -3
ls -t ai-content-output/articles/*.html 2>/dev/null | head -3
ls -t ai-content-output/articles/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下可发布内容，请选择要发布的文件：" with the files as options. If only `.md` files found (no `.html`), note: "建议先运行 `/content-utilities:markdown-to-html` 转换格式".

4. **No upstream found**: Only in this case, ask the user for an article file path.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `wechat-publisher` skill and publish the selected content to WeChat Official Account.

## Artifact Handoff

**Output**: Draft published to WeChat Official Account. Completion report with draft media_id.

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `publishing`
  - `outputs.wechat_media_id`: published draft media id
  - `next.command`: `none`
  - `next.input`: `none`

**Next step**: `none` (final pipeline stage).
