---
description: Convert Markdown to styled HTML with WeChat-compatible themes
argument-hint: "[markdown file path]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `md-to-html` skill and convert the markdown file to HTML.

## Artifact Handoff

**Input**: If a markdown file path is provided, use it directly.

If no argument is provided, check for recent articles:

- `ai-content-output/deep-research/` — look for `article.md` files
- `ai-content-output/articles/` — look for `.md` files

If multiple markdown files exist, use AskUserQuestion to let the user choose which file to convert.

**Output**: HTML saved alongside the source markdown:

- `article.md` → `article.html` (same directory)

**Next step**: Suggest running `/content-analysis:check-quality` to review before publishing, then `/publishing:post-to-wechat` to publish.
