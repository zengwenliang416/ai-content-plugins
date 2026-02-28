---
description: Run a multi-task deep research pipeline on an AI topic
argument-hint: "[AI topic or technology]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for a topic. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**: If the user passed a topic or file path as argument, use it directly. Skip to Step 2.

2. **Auto-scan brainstorm output**: Run this Bash command immediately:

```bash
TODAY=$(date +%Y-%m-%d) && ls -t ai-content-output/brainstorm/${TODAY}*.md ai-content-output/brainstorm/*.md 2>/dev/null | head -3
```

If files found → Read the most recent one, extract the top-3 topic briefs. Present them to the user via AskUserQuestion: "检测到最近的选题报告，请选择一个话题进入深度研究：" with the top-3 topics as options (plus a "自定义话题" option).

3. **Auto-scan daily brief**: If no brainstorm output, check:

```bash
ls -t ai-content-output/daily-brief/*.md 2>/dev/null | head -1
```

If found → Read the file, extract top stories as potential topics. Present them to the user via AskUserQuestion.

4. **No upstream found**: Only in this case, ask the user which AI topic or technology to research.

## Step 2: Load Skill and Execute

Load the `deep-research` skill. Pass the selected topic and any upstream context.

This is a 5-task pipeline that must be executed one task at a time:

1. Topic Research - Background, players, history, current state
2. Data Compilation - Statistics, benchmarks, market data
3. Analysis & Synthesis - Comparative analysis and content recommendation
4. Visual Asset Generation - Charts, diagrams, infographics
5. Article Assembly - Final publication-ready article

## Artifact Handoff

**Output**: All task outputs are saved to `ai-content-output/deep-research/<slug>/`:

- Task 1 → `research.md`
- Task 2 → `data-workbook.md`
- Task 3 → `analysis.md`
- Task 4 → `images/` + `images/chart_index.txt`
- Task 5 → `article.md`

**Next step**: After Task 5, suggest running `/content-production:long-article` (to refine) or `/visual-content:cover-image` (to generate cover).
