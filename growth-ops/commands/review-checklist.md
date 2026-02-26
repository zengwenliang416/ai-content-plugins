---
description: Run a pre-publish review checklist
argument-hint: ""
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `review-checklist` skill and generate a comprehensive pre-publish checklist tailored to the content piece and platform.

If a piece or platform is specified, use it. Otherwise ask the user for the content type and target platform.
