---
description: Convert Markdown to styled HTML with WeChat-compatible themes
argument-hint: "[markdown file path]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**: If the user passed a markdown file path as argument, use it directly. Skip to Step 2.

2. **Auto-scan articles**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/deep-research/*/article.md 2>/dev/null | head -3
ls -t ai-content-output/articles/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下 Markdown 文件，请选择要转换的文件：" with the files as options.

3. **No upstream found**: Only in this case, ask the user for a markdown file path.

## Step 2: Load Skill and Execute

Load the `md-to-html` skill and convert the selected markdown file to styled HTML.

## Artifact Handoff

**Output**: HTML saved alongside the source markdown:

- `article.md` → `article.html` (same directory)

**Next step**: Suggest running `/content-analysis:check-quality` to review before publishing, then `/publishing:post-to-wechat` to publish.
