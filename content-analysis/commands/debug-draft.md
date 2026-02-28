---
description: Diagnose and fix issues in a draft article
argument-hint: "[draft path or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for draft input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, then `outputs.short_post_md`.
   - If argument is a draft path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md` and `outputs.short_post_md`.

3. **Auto-scan legacy draft assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/deep-research/*/article.md 2>/dev/null | head -3
ls -t ai-content-output/articles/*.md 2>/dev/null | head -3
ls -t ai-content-output/short-post/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下草稿，请选择要执行问题诊断的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user to share the draft path/content.

## Step 2: Load Skill and Execute

Load the `draft-debugger` skill and diagnose issues in the provided draft article, then provide specific fix suggestions.

## Artifact Handoff

**Output**:

- Debug findings MUST be displayed in conversation.
- Debug report SHOULD be saved to:
  - `ai-content-output/debug-draft/YYYY-MM-DD-<draft-slug>-debug.md` (standalone mode)
  - `ai-content-output/deep-research/<slug>/debug-draft.md` (if contract/deep-research mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-analysis`
  - `outputs.debug_report_md`: debug report path
  - `next.command`: `/content-production:long-article`
  - `next.input`: draft path or contract path

**Next step**: Suggest revising the draft, then rerun `/content-analysis:check-quality`.
