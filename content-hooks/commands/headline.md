---
description: Generate CTR-optimized headlines with A/B variants
argument-hint: "[topic, article file, .openspec.json, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, `outputs.short_post_md`, then `inputs.topic`.
   - If argument is a topic string or file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/short-post/*.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md`, `outputs.short_post_md`, then `inputs.topic`.

3. **Auto-scan legacy content inputs**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/*.md 2>/dev/null | head -3
ls -t openspec/runtime/short-post/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下内容素材，请选择要用于标题优化的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for the topic.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Headline Configuration

Use AskUserQuestion to ask the user:

"请选择标题风格 / Select headline style:

1. 📊 数据驱动 / Data-Driven (numbers, stats, specifics)
2. ❓ 好奇心 / Curiosity Gap (questions, teasers)
3. 🎯 实用价值 / How-To/Value (actionable, benefit-focused)
4. 💥 争议性 / Contrarian (challenges assumptions)
5. 📋 清单体 / Listicle (N things, N ways, N reasons)
6. 🔥 全风格 / All Styles (generate one of each)"

## Step 3: Load Skill and Execute

Load the `headline-optimizer` skill and generate scored headlines for the specified topic/content using the selected style.

## Artifact Handoff

**Output**: Headline variants saved to:

- `openspec/runtime/headlines/<slug>/headlines.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/headlines.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-hooks`
  - `outputs.headlines_md`: headlines file path
  - `next.command`: apply headline to article or post
  - `next.input`: headlines file path or contract path

**Next step**: Suggest applying the top-ranked headline to the target article or post.
