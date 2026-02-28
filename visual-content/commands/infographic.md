---
description: Generate a professional infographic with layout and style options
argument-hint: "[content file, topic, or pipeline.openspec.json]"
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
   - If argument is `pipeline.openspec.json`, read it first and prefer `outputs.analysis_md` or `outputs.article_md`.
   - If argument is a content path or topic, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.analysis_md` and `outputs.article_md`.

3. **No upstream found**: Only in this case, ask the user for subject, key data points, and target format.

## Step 2: Load Skill and Execute

Load the `infographic-gen` skill and create an infographic.

## Artifact Handoff

**Output**: Infographic assets saved to:

- `ai-content-output/deep-research/<slug>/images/` (if contract/deep-research mode)
- `infographic/<topic-slug>/` (standalone mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `visual-content`
  - `outputs.infographic_dir`: infographic output directory
  - `next.command`: `/content-utilities:markdown-to-html`
  - `next.input`: `outputs.article_md` if available

**Next step**: Suggest running `/content-utilities:markdown-to-html` or `/publishing:post-to-wechat` based on readiness.
