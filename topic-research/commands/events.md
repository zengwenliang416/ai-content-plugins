---
description: Build an AI event calendar for content planning
argument-hint: "[time period]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `event-calendar` skill and build a calendar of upcoming AI events with content planning hooks.

If a time period is provided, focus on that window. Otherwise default to the next 3 months.
