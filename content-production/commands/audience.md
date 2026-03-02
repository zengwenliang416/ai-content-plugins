---
description: Define and analyze target audience for content
argument-hint: "[niche/topic, research path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for targeting details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.trend_preview_md`, then `outputs.narrative_md`, then `inputs.topic`.
   - If argument is a niche/topic or research path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/trend-preview/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/narrative/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.trend_preview_md`, `outputs.narrative_md`, and `inputs.topic`.

3. **Auto-scan legacy audience inputs**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/trend-preview/*.md 2>/dev/null | head -3
ls -t openspec/runtime/narrative/*.md 2>/dev/null | head -3
ls -t openspec/runtime/audience-targeting/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下受众定位素材，请选择要用于受众分析的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for content focus and intended platform.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `audience-targeting` skill and build an audience analysis for the specified niche or topic.

## Artifact Handoff

**Output**: Audience targeting report saved to:

- `openspec/runtime/audience-targeting/YYYY-MM-DD-<topic>-audience-targeting.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/audience-targeting.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-production`
  - `outputs.audience_targeting_md`: audience targeting report path
  - `next.command`: `/content-production:short-post`
  - `next.input`: audience targeting report path or contract path

**Next step**: Suggest running `/content-production:short-post` to produce platform-targeted messaging.
