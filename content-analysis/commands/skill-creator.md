---
description: Create or update a reusable skill for content workflows
argument-hint: "[skill name/description, reference path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for packaging details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `inputs.workflow`, then `outputs.template_md`, then `outputs.strategy_memo_md`.
   - If argument is skill name/description or reference path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `inputs.workflow`, `outputs.template_md`, and `outputs.strategy_memo_md`.

3. **Auto-scan legacy skill-design assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/templates/*.md 2>/dev/null | head -3
ls -t openspec/runtime/strategy-memo/*.md 2>/dev/null | head -3
ls -t openspec/runtime/skill-creator/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下技能设计素材，请选择要用于技能封装的输入：" with files as options.

4. **No upstream found**: Only in this case, ask what workflow should be packaged into a reusable skill.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `skill-creator` skill and guide the user through creating or updating a skill.

## Artifact Handoff

**Output**:

- Skill design result SHOULD be saved to `openspec/runtime/skill-creator/YYYY-MM-DD-<skill-slug>-spec.md`.

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-analysis`
  - `outputs.skill_spec_md`: skill design spec path
  - `next.command`: `none`
  - `next.input`: `none`

**Next step**: Suggest implementing the generated skill design in the target plugin.
