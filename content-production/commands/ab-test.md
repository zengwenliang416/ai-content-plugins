---
description: Design a content A/B test or experiment
argument-hint: "[variable to test]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `content-experiment` skill and design a content A/B test for the specified variable.

If a variable is provided (e.g., headline, format, posting time), use it. Otherwise ask the user what they want to test and what success looks like.
