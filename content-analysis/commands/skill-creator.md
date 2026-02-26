---
description: Create or update a reusable skill for content workflows
argument-hint: "[skill name or description]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `skill-creator` skill and guide the user through creating or updating a skill.

If a skill name or description is provided, use it. Otherwise ask the user what content workflow they want to package into a reusable skill.
