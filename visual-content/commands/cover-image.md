---
description: Generate an article cover image with 5-dimension customization
argument-hint: "[article file path]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `cover-generator` skill and generate a cover image.

If an article file path is provided, use it. Otherwise ask the user for the article content or file path.
