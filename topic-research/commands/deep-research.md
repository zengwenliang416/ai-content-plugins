---
description: Run a multi-task deep research pipeline on an AI topic
argument-hint: "[AI topic or technology]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `deep-research` skill and begin the 5-task pipeline to create a comprehensive AI topic research article.

If a topic is provided, use it. Otherwise ask the user which AI topic or technology to research.

This is a 5-task pipeline that must be executed one task at a time:

1. Topic Research - Background, players, history, current state
2. Data Compilation - Statistics, benchmarks, market data
3. Analysis & Synthesis - Comparative analysis and content recommendation
4. Visual Asset Generation - Charts, diagrams, infographics
5. Article Assembly - Final publication-ready article
