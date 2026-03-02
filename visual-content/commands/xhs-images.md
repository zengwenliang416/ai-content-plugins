---
description: Generate Xiaohongshu infographic series for social media
argument-hint: "[content file, topic, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.article_md` (fallback `outputs.analysis_md`).
   - If argument is a content file or topic, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md` and `outputs.analysis_md`.

3. **Auto-scan legacy content assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/article.md 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/analysis.md 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下小红书卡片素材，请选择要用于生成图文系列的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for content or topic for the Xiaohongshu series.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `xhs-card` skill and create Xiaohongshu infographic images.

## Artifact Handoff

**Output**: Xiaohongshu image series saved to:

- `openspec/runtime/deep-research/<slug>/images/xhs/` (if contract/deep-research mode)
- `xhs-images/<topic-slug>/` (standalone mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `visual-content`
  - `outputs.xhs_images_dir`: xhs images directory path
  - `next.command`: `/content-utilities:compress-image`
  - `next.input`: xhs images directory path

**Next step**: Suggest running `/content-utilities:compress-image` to optimize images for publishing platforms.
