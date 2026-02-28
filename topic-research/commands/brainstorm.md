---
description: Brainstorm and screen content topics
argument-hint: "[daily-brief file path OR seed topic]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `topic-brainstorm` skill and generate a scored list of content topic ideas with briefs for the top candidates.

## Artifact Handoff

**Input**: If the argument is a file path (e.g., `ai-content-output/daily-brief/2026-02-28-ai-daily-brief.md`), pass it to the skill as upstream input context.

If no argument is provided and no file path is given, check `ai-content-output/daily-brief/` for today's brief. If multiple briefs exist, use AskUserQuestion to let the user choose which one to use (or start fresh).

If a seed topic or niche is provided as plain text (not a file path), use it to anchor the brainstorm.

**Output**: Results MUST be saved to `ai-content-output/brainstorm/YYYY-MM-DD-topic-brainstorm.md`.

**Next step**: Suggest running `/topic-research:deep-research` with one of the top-ranked topics.
