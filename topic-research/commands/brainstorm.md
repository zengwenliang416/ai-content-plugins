---
description: Brainstorm and screen content topics
argument-hint: "[daily-brief file path OR seed topic]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill, BEFORE asking any questions about topics, and BEFORE presenting any options to the user. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**: If the user passed a file path as argument (e.g., `/topic-research:brainstorm ai-content-output/daily-brief/2026-02-28.md`), use that file directly. Skip to Step 2.

2. **Auto-scan today's daily brief**: Run this Bash command immediately:

```bash
TODAY=$(date +%Y-%m-%d) && ls ai-content-output/daily-brief/${TODAY}*.md 2>/dev/null
```

If a file is found → Read the file, inform the user "已自动加载今日简报: [filename]", and skip to Step 2 with this file as input. Do NOT ask the user whether to use it — just use it.

3. **Auto-scan recent daily brief** (within 3 days): Run:

```bash
ls -t ai-content-output/daily-brief/*.md 2>/dev/null | head -3
```

If files found → use the most recent one. Inform the user which file was loaded and its date.

4. **No upstream found**: Only in this case, ask the user if they have a seed topic or niche to focus on.

## Step 2: Load Skill and Execute

Load the `topic-brainstorm` skill. Pass the detected upstream artifact (if any) as input context. The skill's Step 0 can be skipped since artifact detection was already completed here.

Generate a scored list of content topic ideas with briefs for the top candidates.

## Artifact Handoff

**Output**: Results MUST be saved to `ai-content-output/brainstorm/YYYY-MM-DD-topic-brainstorm.md`.

**Next step**: Suggest running `/topic-research:deep-research` with one of the top-ranked topics.
