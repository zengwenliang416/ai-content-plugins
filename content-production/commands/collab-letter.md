---
description: Draft a collaboration or outreach message
argument-hint: "[target person/brand, support brief path, or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for outreach details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.audience_review_md`, then `outputs.ops_report_md`, then `inputs.partner`.
   - If argument is a target person/brand or source path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.audience_review_md`, `outputs.ops_report_md`, and `inputs.partner`.

3. **Auto-scan legacy outreach assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/audience-review/*.md 2>/dev/null | head -3
ls -t ai-content-output/ops-report/*.md 2>/dev/null | head -3
ls -t ai-content-output/collab-letter/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下合作外联素材，请选择要用于合作信的输入：" with files as options.

4. **No upstream found**: Only in this case, ask who they want to reach out to and what collaboration they are proposing.

## Step 2: Load Skill and Execute

Load the `collab-letter` skill and draft a personalized collaboration or outreach message.

## Artifact Handoff

**Output**: Collaboration letter saved to:

- `ai-content-output/collab-letter/YYYY-MM-DD-<target>-collab-letter.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/collab-letter.md` (if contract/deep-research mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-production`
  - `outputs.collab_letter_md`: collaboration letter path
  - `next.command`: `/growth-ops:collab-prep`
  - `next.input`: collaboration letter path or contract path

**Next step**: Suggest running `/growth-ops:collab-prep` for meeting preparation.
