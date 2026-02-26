---
description: Create a reusable content template
argument-hint: "[content type]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `template-creator` skill and create a reusable content template for the specified content type.

If a content type is provided, use it. Otherwise ask the user what type of content they want a template for.
