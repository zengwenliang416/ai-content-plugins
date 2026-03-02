---
description: Generate a slide deck with professional visual styles
argument-hint: "[content file path or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.analysis_md`, then `outputs.article_md`.
   - If argument is a content path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.analysis_md` and `outputs.article_md`.

3. **Auto-scan legacy presentation assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/analysis.md 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/article.md 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下演示素材，请选择要用于生成幻灯片的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for content or topic for the slide deck.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `slide-generator` skill and create a slide deck.

## Artifact Handoff

**Output**: Slide deck saved to:

- `openspec/runtime/deep-research/<slug>/slides/slide-deck.pptx` (if contract/deep-research mode)
- `slide-deck/<topic-slug>/slide-deck.pptx` (standalone mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `visual-content`
  - `outputs.slide_deck_path`: slide deck path
  - `next.command`: `none`
  - `next.input`: `none`

**Next step**: This is a terminal stage (`next.command=none`); suggest sharing the slide deck for stakeholder review.
