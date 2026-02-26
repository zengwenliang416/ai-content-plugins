---
description: Identify and clean up underperforming content
argument-hint: ""
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `content-cleanup` skill to identify underperforming content, categorize action items (update, merge, archive, delete), and produce a prioritized cleanup plan.

If content data is provided, use it. Otherwise ask the user for their content inventory and performance metrics.
