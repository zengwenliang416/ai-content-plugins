---
description: Generate a daily AI news briefing
argument-hint: ""
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `daily-brief` skill and generate a concise daily briefing covering the latest AI developments, research papers, product launches, and industry news.

## Artifact Handoff

**Output**: After generation, the briefing MUST be saved to `ai-content-output/daily-brief/YYYY-MM-DD-ai-daily-brief.md`.

**Next step**: Suggest running `/topic-research:brainstorm` to select content topics from this briefing.
