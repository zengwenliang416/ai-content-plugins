---
description: Discover content sources and references for a topic
argument-hint: "[topic/niche, source list path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for sourcing inputs. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `inputs.topic`, then `outputs.brainstorm_md`, then `outputs.daily_brief_md`.
   - If argument is a topic/niche or source file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `inputs.topic`, `outputs.brainstorm_md`, and `outputs.daily_brief_md`.

3. **Auto-scan legacy source assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/brainstorm/*.md 2>/dev/null | head -3
ls -t ai-content-output/daily-brief/*.md 2>/dev/null | head -3
ls -t ai-content-output/source-discovery/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下选题与信源素材，请选择要用于信源发现的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for topic, content goal, and preferred source types.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `source-discovery` skill and run the sourcing pipeline: discover relevant sources, check for prior usage, and organize them by type.

## Artifact Handoff

**Output**: Source discovery result saved to:

- `ai-content-output/source-discovery/YYYY-MM-DD-<topic>-sources.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/sources.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `ai-content-output/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `growth-ops`
  - `outputs.source_discovery_md`: source discovery report path
  - `next.command`: `/topic-research:deep-research`
  - `next.input`: source discovery report path or contract path

**Next step**: Suggest running `/topic-research:deep-research` to convert curated sources into a full research package.
