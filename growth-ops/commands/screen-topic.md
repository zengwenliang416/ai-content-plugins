---
description: Quickly screen a topic for content potential
argument-hint: "[topic, brainstorm path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.brainstorm_md` (fallback `outputs.daily_brief_md` or `inputs.topic`).
   - If argument is a topic/path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.brainstorm_md`, `outputs.daily_brief_md`, and `inputs.topic`.

3. **Auto-scan upstream brainstorming assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/brainstorm/*.md 2>/dev/null | head -3
ls -t openspec/runtime/daily-brief/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下选题素材，请选择要评估的话题来源：" with files as options.

4. **No upstream found**: Only in this case, ask the user for the topic and content niche.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `topic-screening` skill and quickly evaluate the selected topic against key content criteria: search volume, competition, audience fit, expertise match, and timeliness.

## Artifact Handoff

**Output**: Screening result saved to:

- `openspec/runtime/topic-screening/YYYY-MM-DD-<topic-slug>-screening.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/screen-topic.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `growth-ops`
  - `outputs.topic_screening_md`: screening report path
  - `outputs.topic_screening_verdict`: `HIGH`, `MEDIUM`, or `LOW`
  - `next.command`: `/topic-research:deep-research`
  - `next.input`: selected topic or contract path

**Next step**: Use `/topic-research:deep-research` as the single routed next command; downstream workflow interprets `outputs.topic_screening_verdict` for go/no-go decisions.
