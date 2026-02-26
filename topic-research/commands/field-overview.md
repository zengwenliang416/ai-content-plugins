---
description: Create an overview of an AI sub-field
argument-hint: "[AI field like NLP, CV, agents]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `field-overview` skill and create a comprehensive overview of the specified AI sub-field.

If a field is provided, use it. Otherwise ask the user which AI sub-field to cover (e.g., NLP, computer vision, reinforcement learning, agents, robotics).
