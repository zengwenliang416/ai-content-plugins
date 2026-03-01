---
description: Draft a business proposal for sponsorship or collaboration
argument-hint: "[brand/partner, supporting brief path, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for proposal details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.audience_review_md`, then `outputs.ops_report_md`, then `inputs.partner`.
   - If argument is a partner name or brief path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.audience_review_md`, `outputs.ops_report_md`, and `inputs.partner`.

3. **Auto-scan legacy proposal assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/audience-review/*.md 2>/dev/null | head -3
ls -t ai-content-output/ops-report/*.md 2>/dev/null | head -3
ls -t ai-content-output/collab-prep/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下合作提案素材，请选择要用于商务方案的输入：" with files as options.

4. **No upstream found**: Only in this case, ask who the proposal is for and what type of collaboration is being proposed.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `biz-proposal` skill to create a professional business proposal covering collaboration format, audience metrics, pricing, deliverables, and timeline.

## Artifact Handoff

**Output**: Business proposal saved to:

- `ai-content-output/biz-proposal/YYYY-MM-DD-<partner>-biz-proposal.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/biz-proposal.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `ai-content-output/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `audience-management`
  - `outputs.biz_proposal_md`: business proposal path
  - `next.command`: `none`
  - `next.input`: `none`

**Next step**: This is a terminal stage (`next.command=none`); suggest sharing the proposal with the partner for execution.
