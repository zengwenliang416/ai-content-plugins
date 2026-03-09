---
description: Generate attention-grabbing hooks and opening lines
argument-hint: "[topic, article file, .openspec.json, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, then `inputs.topic`.
   - If argument is a topic string or file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md`, then `inputs.topic`.

3. **Auto-scan legacy content inputs**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/*.md 2>/dev/null | head -3
ls -t openspec/runtime/short-post/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下内容素材，请选择要用于 Hook 生成的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for the topic.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Hook Configuration

Use AskUserQuestion to ask the user:

"请选择 Hook 类型 / Select hook type:

1. 🎯 开篇金句 / Opening Hook (article/post first line)
2. 🧵 推文开头 / Tweet Opener (scroll-stopping first tweet)
3. 📕 小红书标题 / XHS Title (curiosity-driven, emoji-rich)
4. 🎬 视频开场白 / Video Intro (3-second attention grab)
5. 🔄 全平台套装 / All-Platform Pack"

## Step 3: Load Skill and Execute

Load the `hook-generator` skill and generate hooks for the specified topic/content using the selected type.

## Artifact Handoff

**Output**: Hook variants saved to:

- `openspec/runtime/hooks/<slug>/hooks.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/hooks.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-hooks`
  - `outputs.hooks_md`: hooks file path
  - `next.command`: `/content-production:short-post` or `/content-production:long-article`
  - `next.input`: hooks file path or contract path

**Next step**: Suggest running `/content-production:short-post` or `/content-production:long-article` to apply hooks.
