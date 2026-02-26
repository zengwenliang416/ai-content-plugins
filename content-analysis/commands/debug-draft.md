---
description: Diagnose and fix issues in a draft article
argument-hint: ""
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `draft-debugger` skill and diagnose issues in the provided draft article, then provide specific fix suggestions.

If a draft is provided, use it. Otherwise ask the user to share the draft they want reviewed and fixed.
