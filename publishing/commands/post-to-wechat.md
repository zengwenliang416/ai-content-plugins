---
description: Publish content to WeChat Official Account
argument-hint: "[article file path (.html or .md)]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**: If the user passed a file path as argument, use it directly. HTML files skip conversion; markdown files are converted first. Skip to Step 2.

2. **Auto-scan publishable content**: Run these Bash commands immediately:

```bash
# Prefer HTML (ready to publish), fallback to Markdown
ls -t ai-content-output/deep-research/*/article.html 2>/dev/null | head -3
ls -t ai-content-output/deep-research/*/article.md 2>/dev/null | head -3
ls -t ai-content-output/articles/*.html 2>/dev/null | head -3
ls -t ai-content-output/articles/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下可发布内容，请选择要发布的文件：" with the files as options. If only `.md` files found (no `.html`), note: "建议先运行 `/content-utilities:markdown-to-html` 转换格式".

3. **No upstream found**: Only in this case, ask the user for an article file path.

## Step 2: Load Skill and Execute

Load the `wechat-publisher` skill and publish the selected content to WeChat Official Account.

## Artifact Handoff

**Output**: Draft published to WeChat Official Account. Completion report with draft media_id.

**This is the final step in the pipeline.** No further commands needed.
