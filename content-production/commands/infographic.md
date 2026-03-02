---
description: Create a visual summary card or infographic layout
argument-hint: "[topic/data, content path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for infographic details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.analysis_md`, then `outputs.article_md`, then `inputs.topic`.
   - If argument is topic/data or content path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.analysis_md`, `outputs.article_md`, and `inputs.topic`.

3. **Auto-scan legacy infographic inputs**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/analysis.md 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/article.md 2>/dev/null | head -3
ls -t openspec/runtime/infographic/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下图解素材，请选择要用于信息图生成的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for subject, key data points, and intended platform.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `infographic` skill and create a visual summary card or infographic layout for the specified topic or data.

## Artifact Handoff

**Output**: Infographic assets saved to:

- `openspec/runtime/infographic/YYYY-MM-DD-<topic>/` (standalone mode)
- `openspec/runtime/deep-research/<slug>/images/infographic/` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-production`
  - `outputs.production_infographic_dir`: infographic output directory
  - `next.command`: `/content-utilities:compress-image`
  - `next.input`: infographic output directory path

**Next step**: Suggest running `/content-utilities:compress-image` before publishing infographic assets.
