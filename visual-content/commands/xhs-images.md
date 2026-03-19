---
description: Render Markdown into styled Xiaohongshu card images via HTML/CSS + Puppeteer screenshot
argument-hint: "[markdown file, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and use `outputs.article_md`.
   - If argument is a `.md` file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and use `outputs.article_md`.

3. **Auto-scan recent articles**:

```bash
find openspec/runtime/deep-research/ -name "article.md" -mtime -3 2>/dev/null
find openspec/runtime/articles/ -name "*.md" -mtime -3 2>/dev/null
```

If files found → present them to the user via AskUserQuestion: "检测到以下文章，请选择要渲染为小红书卡片的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for a markdown file or pasted content.

## Step 2: Load Skill and Execute

Load the `xhs-card` skill from `visual-content/skills/xhs-card/SKILL.md`.

The skill renders Markdown → HTML (CSS theme) → Puppeteer screenshot → auto-sliced PNG pages.

**Key**: The rendering is done by the `md-to-xhs.mjs` script, NOT by AI image generation. The script path is `visual-content/skills/xhs-card/scripts/md-to-xhs.mjs`.

## Artifact Handoff

**Output**: XHS card PNG pages saved to:

- `openspec/runtime/deep-research/<slug>/visuals/xhs/` (pipeline mode)
- `openspec/runtime/visuals/xhs/{topic-slug}/` (standalone mode)

**OpenSpec contract (MANDATORY)**:

- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place:
  - `stage`: `visual-content`
  - `outputs.xhs_images_dir`: xhs images directory path
  - `next.command`: `/content-utilities:compress-image`
  - `next.input`: xhs images directory path

**Next step**: Suggest running `/content-utilities:compress-image` to optimize images for publishing platforms.
