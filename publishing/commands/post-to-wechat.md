---
description: Publish content to WeChat Official Account
argument-hint: "[article file path (.html or .md)]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `wechat-publisher` skill and publish the content to WeChat Official Account.

## Artifact Handoff

**Input**: If a file path is provided, use it directly. HTML files skip conversion; markdown files are converted first.

If no argument is provided, check for publishable content:

- `ai-content-output/deep-research/` — look for `article.html` files first, then `article.md`
- `ai-content-output/articles/` — look for `.html` files first, then `.md`

If multiple files exist, use AskUserQuestion to let the user choose which article to publish.

If only `.md` files found (no `.html`), suggest running `/content-utilities:markdown-to-html` first.

**Output**: Draft published to WeChat Official Account. Completion report with draft media_id.

**This is the final step in the pipeline.** No further commands needed.
