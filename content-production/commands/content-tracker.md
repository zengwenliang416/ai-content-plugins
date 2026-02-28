---
description: Track and manage content pipeline and publishing schedule
argument-hint: "[tracker scope, planning path, or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for tracking scope. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.content_plan_md`, then `outputs.short_post_md`, then `outputs.article_md`.
   - If argument is tracker scope or planning path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.content_plan_md`, `outputs.short_post_md`, and `outputs.article_md`.

3. **Auto-scan legacy tracking assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/content-plan/*.md 2>/dev/null | head -3
ls -t ai-content-output/articles/*.md 2>/dev/null | head -3
ls -t ai-content-output/short-post/*.md 2>/dev/null | head -3
ls -t ai-content-output/content-tracker/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下排期追踪素材，请选择要用于内容追踪的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for active projects and deadline context.

## Step 2: Load Skill and Execute

Load the `content-tracker` skill to review content pipeline status, update milestones, and manage publishing deadlines across active content projects.

## Artifact Handoff

**Output**: Content tracker report saved to:

- `ai-content-output/content-tracker/YYYY-MM-DD-content-tracker.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/content-tracker.md` (if contract/deep-research mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-production`
  - `outputs.content_tracker_md`: content tracker report path
  - `next.command`: `/growth-ops:performance`
  - `next.input`: content tracker report path or contract path

**Next step**: Suggest running `/growth-ops:performance` for period performance review.
