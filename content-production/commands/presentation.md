---
description: Create a content presentation or slide deck
argument-hint: "[topic/title, source path, or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for presentation details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.analysis_md`, then `outputs.article_md`, then `inputs.topic`.
   - If argument is topic/title or source path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.analysis_md`, `outputs.article_md`, and `inputs.topic`.

3. **Auto-scan legacy presentation inputs**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/deep-research/*/analysis.md 2>/dev/null | head -3
ls -t ai-content-output/deep-research/*/article.md 2>/dev/null | head -3
ls -t ai-content-output/presentation/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下演讲素材，请选择要用于演示文稿生成的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for subject, audience, format, and desired length.

## Step 2: Load Skill and Execute

Load the `presentation` skill and create a presentation for the specified topic.

## Artifact Handoff

**Output**: Presentation saved to:

- `ai-content-output/presentation/YYYY-MM-DD-<topic>-presentation.pptx` (standalone mode)
- `ai-content-output/deep-research/<slug>/presentation/presentation.pptx` (if contract/deep-research mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-production`
  - `outputs.presentation_path`: presentation path
  - `next.command`: `none`
  - `next.input`: `none`

**Next step**: Suggest reviewing the deck and optionally generating supporting visuals via `/visual-content:infographic`.
