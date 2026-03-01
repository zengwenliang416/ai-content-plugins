---
description: Install and configure platform access tools
argument-hint: "[platform-name, .openspec.json, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for setup scope. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `inputs.platform`.
   - If argument is a platform name, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/news-search/setup/*.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `inputs.platform`.

3. **No upstream found**: Ask the user which platform(s) to configure first.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `news-search-setup` skill and guide the user through installing and configuring upstream tools for multi-platform news search.

## Artifact Handoff

**Output**: Setup record saved to:

- `ai-content-output/news-search/setup/YYYY-MM-DD-<platform>-setup.md`

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Create or update `ai-content-output/news-search/setup/YYYY-MM-DD-<platform>-setup.openspec.json`.
- Minimum fields:
  - `pipeline`: `news-search-setup->news-search`
  - `stage`: `news-search-setup`
  - `outputs.setup_record_md`: setup record path
  - `next.command`: `/topic-research:news-search`
  - `next.input`: configured platform name or contract path

**Next step**: Suggest running `/topic-research:news-search` to validate the platform setup with a real query.
