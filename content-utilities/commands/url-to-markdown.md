---
description: Fetch a URL and convert its content to clean Markdown
argument-hint: "[URL]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `web-clipper` skill and fetch the URL and convert to markdown.

If a URL is provided, use it. Otherwise ask the user for the URL to fetch and convert.
