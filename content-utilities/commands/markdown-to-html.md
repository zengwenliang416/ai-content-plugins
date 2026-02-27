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

If a markdown file path is provided, use it. Otherwise ask the user for the markdown file path to convert.
