---
description: Analyze article and generate illustrations at key positions
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

If files found → present them to the user via AskUserQuestion.

4. **No upstream found**: Only in this case, ask the user for article content or file path.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `article-illustrator` skill and generate illustrations for the selected article.

## Artifact Handoff

**Output**: Illustration assets saved to:

- `openspec/runtime/deep-research/<slug>/images/` (when article is from deep-research)
- `illustrations/<topic-slug>/` (standalone mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `visual-content`
  - `outputs.illustrations_dir`: illustrations directory path
  - `next.command`: `/content-utilities:markdown-to-html`
  - `next.input`: existing article markdown path

**Next step**: Suggest running `/content-utilities:markdown-to-html` for final publishing format.
