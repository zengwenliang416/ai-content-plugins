---
description: Repurpose content across platforms and formats
argument-hint: "[source file/URL, .openspec.json, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, then `outputs.short_post_md`, then `inputs.topic`.
   - If argument is `.openspec.json`, read and extract source content path.
   - If argument is a URL, use it directly (will be fetched via WebFetch in the skill).
   - If argument is a file path, use it directly.
   - Then skip to Language Selection.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/short-post/*.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md`, `outputs.short_post_md`, and `inputs.topic`.

3. **Auto-scan legacy content**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/*.md 2>/dev/null | head -5
ls -t openspec/runtime/short-post/*.md 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下内容素材，请选择要改编的输入：" with files as options (plus "自定义输入" option).

4. **No upstream found**: Only in this case, ask for source file path or URL.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Target Format Selection

After getting the source content, use AskUserQuestion to ask the user:

"请选择目标格式 / Select target format(s):

1. 🐦 推文串 / Tweet Thread (280-char segments, hooks, hashtags)
2. 📕 小红书笔记 / XHS Note (emoji-rich, casual, list-style)
3. 💬 微信公众号摘要 / WeChat Summary (structured, professional)
4. 📝 LinkedIn Post (professional, insight-driven)
5. 🎬 短视频脚本 / Short Video Script (visual + narration)
6. 🔄 全部 / All of the above"

## Step 3: Load Skill and Execute

Load the `content-repurposer` skill and generate the repurposed content for each selected target format.

## Artifact Handoff

**Output**: Repurposed content saved to:

- `openspec/runtime/repurpose/<slug>/` (standalone mode)
- `openspec/runtime/deep-research/<slug>/repurpose/` (if contract/deep-research mode)

Files per format:
- `tweet-thread.md`
- `xhs-note.md`
- `wechat-summary.md`
- `linkedin-post.md`
- `video-script.md`

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.

- Update contract with:
  - `stage`: `content-repurpose`
  - `outputs.repurpose_dir`: repurpose output directory path
  - `next.command`: `/publishing:post-to-x` or `/publishing:post-to-wechat`
  - `next.input`: repurpose directory path or contract path

**Next step**: Suggest running `/publishing:post-to-x` or `/publishing:post-to-wechat` for publication.
