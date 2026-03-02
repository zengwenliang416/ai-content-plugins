---
description: Compress images to WebP or PNG format
argument-hint: "[image file/dir or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.xhs_images_dir`, then `outputs.comic_dir`, then `outputs.illustrations_dir`.
   - If argument is an image file or directory, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.xhs_images_dir`, `outputs.comic_dir`, and `outputs.illustrations_dir`.

3. **Auto-scan legacy image assets**: Run these Bash commands immediately:

```bash
ls -dt openspec/runtime/deep-research/*/images 2>/dev/null | head -3
ls -dt xhs-images/* 2>/dev/null | head -3
ls -dt illustrations/* 2>/dev/null | head -3
```

If folders found → present them to the user via AskUserQuestion: "检测到以下图片目录，请选择要压缩的输入：" with folders as options.

4. **No upstream found**: Only in this case, ask for the image file path or directory.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `image-compressor` skill and compress the specified image(s).

## Artifact Handoff

**Output**: Compressed images saved to:

- `openspec/runtime/deep-research/<slug>/images/compressed/` (if contract/deep-research mode)
- `<input-dir>/compressed/` (standalone mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-utilities`
  - `outputs.compressed_images_dir`: compressed image directory path
  - `next.command`: `/publishing:post-to-x`
  - `next.input`: compressed image directory path

**Next step**: Suggest running `/publishing:post-to-x` to publish optimized image assets.
