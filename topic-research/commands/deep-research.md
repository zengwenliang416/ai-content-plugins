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

## Artifact Handoff

**Input**: Before starting Task 1, check for upstream artifacts:

- `ai-content-output/brainstorm/` — for a matching topic brief
- `ai-content-output/daily-brief/` — for relevant news data

If multiple brainstorm files exist, use AskUserQuestion to let the user choose which one to use (or skip).

**Output**: All task outputs are saved to `ai-content-output/deep-research/<slug>/`:

- Task 1 → `research.md`
- Task 2 → `data-workbook.md`
- Task 3 → `analysis.md`
- Task 4 → `images/` + `images/chart_index.txt`
- Task 5 → `article.md`

**Next step**: After Task 5, suggest running `/content-production:long-article` (to refine) or `/visual-content:cover-image` (to generate cover).
