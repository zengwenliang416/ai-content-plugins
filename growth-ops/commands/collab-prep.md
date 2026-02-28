---
description: Prepare for a content collaboration meeting
argument-hint: "[collaborator name, collab brief path, or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for meeting details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.collab_letter_md`, then `outputs.audience_review_md`, then `inputs.collaborator`.
   - If argument is a collaborator name or brief path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.collab_letter_md`, `outputs.audience_review_md`, and `inputs.collaborator`.

3. **Auto-scan legacy collaboration assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/collab-letter/*.md 2>/dev/null | head -3
ls -t ai-content-output/audience-review/*.md 2>/dev/null | head -3
ls -t ai-content-output/biz-proposal/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下合作准备素材，请选择要用于会前准备的输入：" with files as options.

4. **No upstream found**: Only in this case, ask who the meeting is with and the collaboration format being considered.

## Step 2: Load Skill and Execute

Load the `collab-prep` skill and prepare a collaboration brief: research the collaborator, identify mutual benefits, and draft talking points.

## Artifact Handoff

**Output**: Collaboration prep brief saved to:

- `ai-content-output/collab-prep/YYYY-MM-DD-<collaborator>-collab-prep.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/collab-prep.md` (if contract/deep-research mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `growth-ops`
  - `outputs.collab_prep_md`: collaboration prep brief path
  - `next.command`: `/audience-management:biz-proposal`
  - `next.input`: collaboration prep brief path or contract path

**Next step**: Suggest running `/audience-management:biz-proposal` to produce the formal proposal.
