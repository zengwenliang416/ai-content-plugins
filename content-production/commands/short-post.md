---
description: Draft a short social media post or thread
argument-hint: "[topic, trend/narrative path, .openspec.json, or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for post details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.trend_preview_md`, then `outputs.narrative_md`, then `outputs.x_markdown_md`, then `inputs.topic`.
   - If argument is a topic or source path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/trend-preview/*.openspec.json 2>/dev/null | head -3
ls -t ai-content-output/narrative/*.openspec.json 2>/dev/null | head -3
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.trend_preview_md`, `outputs.narrative_md`, and `inputs.topic`.

3. **Auto-scan legacy short-post inputs**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/trend-preview/*.md 2>/dev/null | head -3
ls -t ai-content-output/narrative/*.md 2>/dev/null | head -3
ls -t ai-content-output/x-clips/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下短帖素材，请选择要用于短帖生成的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for topic, target platform, and key message.

## Step 2: Load Skill and Execute

Load the `short-post` skill and create a compelling short-form social post for the specified topic.

## Artifact Handoff

**Output**: Short post draft saved to:

- `ai-content-output/short-post/YYYY-MM-DD-<topic>-short-post.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/short-post.md` (if contract/deep-research mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-production`
  - `outputs.short_post_md`: short post path
  - `next.command`: `/publishing:post-to-x`
  - `next.input`: short post path or contract path

**Next step**: Suggest running `/publishing:post-to-x` for publication.
