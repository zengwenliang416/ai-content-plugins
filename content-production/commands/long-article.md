---
description: Write a comprehensive long-form article
argument-hint: "[topic, outline, or deep-research directory path]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `article-builder` skill and write a long-form article for the specified topic or outline.

## Artifact Handoff

**Input**: The argument can be:

1. A deep-research directory path (e.g., `ai-content-output/deep-research/llm-agents/`) — loads all research documents as source material
2. A single file path — uses it as reference input
3. A topic name — starts from scratch

If no argument is provided, check `ai-content-output/deep-research/` for recent research directories. If multiple exist, use AskUserQuestion to let the user choose which topic to write about (or start fresh).

**Output**: Article saved to:

- `ai-content-output/deep-research/<slug>/article.md` (if using deep-research input)
- `ai-content-output/articles/YYYY-MM-DD-<slug>.md` (if standalone)

**Next step**: Suggest running `/visual-content:cover-image` to generate a cover, then `/content-utilities:markdown-to-html` to convert for publishing.
