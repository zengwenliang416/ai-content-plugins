---
description: Generate an article cover image with 5-dimension customization
argument-hint: "[article file path or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and use `outputs.article_md` as primary input.
   - If argument is an article path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md` candidates.

3. **Auto-scan articles**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/article.md 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下文章，请选择要生成封面的文章：" with the files as options.

4. **No upstream found**: Only in this case, ask the user for an article file path.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `cover-generator` skill and generate a cover image for the selected article.

## Artifact Handoff

**Output**: Cover image saved to:

- `openspec/runtime/deep-research/<slug>/images/cover.png` (if article is from deep-research)
- `cover-image/<topic-slug>/cover.png` (if standalone)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `visual-content`
  - `outputs.cover_image`: cover image path
  - `next.command`: `/content-utilities:markdown-to-html`
  - `next.input`: existing article markdown path

**Next step**: Suggest running `/content-utilities:markdown-to-html` to convert the article (with cover) for WeChat publishing.
