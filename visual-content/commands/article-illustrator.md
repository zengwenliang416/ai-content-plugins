---
description: Analyze article and generate illustrations at key positions
argument-hint: "[article file path or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and use `outputs.article_md` as primary input.
   - If argument is an article path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md` candidates.

3. **Auto-scan articles**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/deep-research/*/article.md 2>/dev/null | head -3
ls -t ai-content-output/articles/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion.

4. **No upstream found**: Only in this case, ask the user for article content or file path.

## Step 2: Load Skill and Execute

Load the `article-illustrator` skill and generate illustrations for the selected article.

## Artifact Handoff

**Output**: Illustration assets saved to:

- `ai-content-output/deep-research/<slug>/images/` (when article is from deep-research)
- `illustrations/<topic-slug>/` (standalone mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `visual-content`
  - `outputs.illustrations_dir`: illustrations directory path
  - `next.command`: `/content-utilities:markdown-to-html`
  - `next.input`: existing article markdown path

**Next step**: Suggest running `/content-utilities:markdown-to-html` for final publishing format.
