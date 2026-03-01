---
description: Create a knowledge comic from article content
argument-hint: "[article file path or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.article_md` (fallback `outputs.analysis_md`).
   - If argument is an article path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md` and `outputs.analysis_md`.

3. **Auto-scan legacy article assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/deep-research/*/article.md 2>/dev/null | head -3
ls -t ai-content-output/articles/*.md 2>/dev/null | head -3
ls -t ai-content-output/deep-research/*/analysis.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下文章素材，请选择要生成知识漫画的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for article content or file path.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `knowledge-comic` skill and create a knowledge comic.

## Artifact Handoff

**Output**: Knowledge comic assets saved to:

- `ai-content-output/deep-research/<slug>/images/comic/` (if contract/deep-research mode)
- `comic/<topic-slug>/` (standalone mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `ai-content-output/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `visual-content`
  - `outputs.comic_dir`: knowledge comic directory path
  - `next.command`: `/content-utilities:markdown-to-html`
  - `next.input`: existing article markdown path

**Next step**: Suggest running `/content-utilities:markdown-to-html` to assemble the article with comic assets for downstream publishing.
