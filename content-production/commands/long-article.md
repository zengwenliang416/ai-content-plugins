---
description: Write a comprehensive long-form article
argument-hint: "[topic, outline, deep-research path, or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for a topic. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read `outputs.article_md` and related context first.
   - Otherwise use the provided path/topic directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion and prefer contract-driven continuation.

3. **Auto-scan deep-research output**: Run this Bash command immediately:

```bash
ls -dt ai-content-output/deep-research/*/ 2>/dev/null | head -3
```

If directories found → list them and present to the user via AskUserQuestion: "检测到以下深度研究产物，请选择一个作为文章素材：" with the directories as options (plus "自定义话题" option).

4. **No upstream found**: Only in this case, ask the user for a topic or outline.

## Step 2: Load Skill and Execute

Load the `article-builder` skill. Pass the selected input.

- Deep-research directory → loads all research documents as source material
- Single file → uses as reference input
- Topic name → starts from scratch

## Artifact Handoff

**Output**: Article saved to:

- `ai-content-output/deep-research/<slug>/article.md` (if using deep-research input)
- `ai-content-output/articles/YYYY-MM-DD-<slug>.md` (if standalone)

**OpenSpec contract update (MANDATORY when contract exists or deep-research path is used)**:

- Update or create `ai-content-output/deep-research/<slug>/pipeline.openspec.json`.
- Minimum update fields:
  - `stage`: `content-production`
  - `outputs.article_md`: final article path
  - `next.command`: `/content-utilities:markdown-to-html`
  - `next.input`: contract file path

**Next step**: Suggest running `/visual-content:cover-image` to generate a cover, then `/content-utilities:markdown-to-html` to convert for publishing.
