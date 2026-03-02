---
description: Brainstorm and screen content topics
argument-hint: "[daily-brief path, .openspec.json or pipeline.openspec.json, or seed topic]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill, BEFORE asking any questions about topics, and BEFORE presenting any options to the user. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read `outputs.daily_brief_md` (fallback `inputs.topic`) and continue with contract context.
   - If argument is a file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan daily-brief OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/daily-brief/*.openspec.json 2>/dev/null | head -3
```

If contracts found → read latest `outputs.daily_brief_md` and ask user whether to continue from it.

3. **Auto-scan daily brief**: Run these Bash commands immediately:

```bash
TODAY=$(date +%Y-%m-%d) && ls openspec/runtime/daily-brief/${TODAY}*.md 2>/dev/null
ls -t openspec/runtime/daily-brief/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下每日简报，请选择要用作素材的文件：" with the files as options (plus a "自定义话题" option for starting fresh).

4. **No upstream found**: Only in this case, ask the user if they have a seed topic or niche to focus on.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `topic-brainstorm` skill. Pass the detected upstream artifact (if any) as input context. The skill's Step 0 can be skipped since artifact detection was already completed here.

Generate a scored list of content topic ideas with briefs for the top candidates.

## Artifact Handoff

**Output**: Results MUST be saved to `openspec/runtime/brainstorm/YYYY-MM-DD-topic-brainstorm.md`.

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Create or update `openspec/runtime/brainstorm/YYYY-MM-DD-topic-brainstorm.openspec.json`.
- Minimum fields:
  - `pipeline`: `brainstorm->deep-research`
  - `stage`: `brainstorm`
  - `outputs.brainstorm_md`: brainstorm file path
  - `next.command`: `/topic-research:deep-research`
  - `next.input`: top-ranked topic or brainstorm file path

**Next step**: Suggest running `/topic-research:deep-research` with one of the top-ranked topics.
