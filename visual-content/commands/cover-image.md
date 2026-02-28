---
description: Generate an article cover image with 5-dimension customization
argument-hint: "[article file path]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `cover-generator` skill and generate a cover image.

## Artifact Handoff

**Input**: If an article file path is provided, use it directly.

If no argument is provided, check for recent articles:

- `ai-content-output/deep-research/` — look for `article.md` files
- `ai-content-output/articles/` — look for `.md` files

If multiple articles exist, use AskUserQuestion to let the user choose which article to generate a cover for.

**Output**: Cover image saved to:

- `ai-content-output/deep-research/<slug>/images/cover.png` (if article is from deep-research)
- `cover-image/<topic-slug>/cover.png` (if standalone)

**Next step**: Suggest running `/content-utilities:markdown-to-html` to convert the article (with cover) for WeChat publishing.
