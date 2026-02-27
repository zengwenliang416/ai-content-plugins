---
description: Format and beautify Markdown files with proper structure
argument-hint: "[markdown file path]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `md-formatter` skill and format the markdown file.

If a markdown file path is provided, use it. Otherwise ask the user for the markdown file path to format.
