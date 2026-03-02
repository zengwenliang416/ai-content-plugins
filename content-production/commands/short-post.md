---
description: Draft a short social media post or thread
argument-hint: "[topic, trend/narrative path, .openspec.json, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for post details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.trend_preview_md`, then `outputs.narrative_md`, then `outputs.x_markdown_md`, then `inputs.topic`.
   - If argument is a topic or source path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/trend-preview/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/narrative/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.trend_preview_md`, `outputs.narrative_md`, and `inputs.topic`.

3. **Auto-scan legacy short-post inputs**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/trend-preview/*.md 2>/dev/null | head -3
ls -t openspec/runtime/narrative/*.md 2>/dev/null | head -3
ls -t openspec/runtime/x-clips/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下短帖素材，请选择要用于短帖生成的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for topic, target platform, and key message.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `short-post` skill and create a compelling short-form social post for the specified topic.

## Artifact Handoff

**Output**: Short post draft saved to:

- `openspec/runtime/short-post/YYYY-MM-DD-<topic>-short-post.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/short-post.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-production`
  - `outputs.short_post_md`: short post path
  - `next.command`: `/publishing:post-to-x`
  - `next.input`: short post path or contract path

**Next step**: Suggest running `/publishing:post-to-x` for publication.
