---
description: Convert X (Twitter) tweets or articles to Markdown
argument-hint: "[tweet or article URL]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `tweet-clipper` skill and convert the X content to markdown.

If a tweet or article URL is provided, use it. Otherwise ask the user for the X (Twitter) URL to convert.
