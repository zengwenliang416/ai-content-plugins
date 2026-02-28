---
description: Check article quality for accuracy, readability, and SEO
argument-hint: "[article file path]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `quality-check` skill and review the provided article for accuracy, readability, logical coherence, and SEO quality.

## Artifact Handoff

**Input**: If an article file path is provided, use it directly.

If no argument is provided, check for recent articles:

- `ai-content-output/deep-research/` — look for `article.md` files
- `ai-content-output/articles/` — look for `.md` files

If multiple articles exist, use AskUserQuestion to let the user choose which article to review.

**Output**: Quality scorecard displayed in conversation (not saved to file).

**Next step**: If quality passes, suggest running `/publishing:post-to-wechat` to publish. If issues found, suggest fixing them first.
