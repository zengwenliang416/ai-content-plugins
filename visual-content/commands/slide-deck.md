---
description: Generate a slide deck with professional visual styles
argument-hint: "[content file path]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `slide-generator` skill and create a slide deck.

If a content file path is provided, use it. Otherwise ask the user for the content or topic for the slide deck.
