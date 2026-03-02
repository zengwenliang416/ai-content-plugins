---
description: Update an existing research document with new data
argument-hint: "[topic, research path, .openspec.json, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for update scope. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.research_md`, then `outputs.release_analysis_md`, then `inputs.topic`.
   - If argument is a research path or topic, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/release-analysis/*.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.research_md`, `outputs.release_analysis_md`, and `inputs.topic`.

3. **Auto-scan legacy research assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/research.md 2>/dev/null | head -3
ls -t openspec/runtime/release-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/research-updates/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下研究文档，请选择要更新的输入：" with files as options.

4. **No upstream found**: Only in this case, ask which research document to update and where to find it.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `research-updater` skill and update an existing research document with the latest developments, papers, and data.

## Artifact Handoff

**Output**:

- Updated research file saved to the original path when possible.
- If generated as a new version, save to `openspec/runtime/research-updates/YYYY-MM-DD-<topic>-research-update.md`.

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `topic-research`
  - `outputs.research_md`: updated research path
  - `outputs.research_update_md`: new update summary path (if generated)
  - `next.command`: `/content-production:long-article`
  - `next.input`: updated research path or contract path

**Next step**: Suggest running `/content-production:long-article` to regenerate the draft with the latest research.
