---
description: Run a pre-publish review checklist
argument-hint: "[article file path, platform, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.article_md` (fallback `outputs.article_html`).
   - If argument is an article path or content/platform descriptor, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md`, then `outputs.article_html`.

3. **Auto-scan legacy article assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/deep-research/*/article.md 2>/dev/null | head -3
ls -t ai-content-output/deep-research/*/article.html 2>/dev/null | head -3
ls -t ai-content-output/articles/*.md 2>/dev/null | head -3
ls -t ai-content-output/articles/*.html 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下文章，请选择要执行发布前检查的文章：" with files as options.

4. **No upstream found**: Only in this case, ask the user for content type and target platform (and article path if available).

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `review-checklist` skill and generate a comprehensive pre-publish checklist tailored to the selected content piece and platform.

## Artifact Handoff

**Output**:

- Checklist results MUST be displayed in the conversation.
- Review checklist report SHOULD be saved to:
  - `ai-content-output/review-checklist/YYYY-MM-DD-<content-slug>-review-checklist.md` (standalone mode)
  - `ai-content-output/deep-research/<slug>/review-checklist.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `ai-content-output/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `growth-ops`
  - `outputs.review_checklist_md`: review checklist report path
  - `next.command`: `/content-utilities:markdown-to-html`
  - `next.input`: selected article path or contract path

**Next step**: Use `/content-utilities:markdown-to-html` as the deterministic next step, then run `/publishing:post-to-wechat` after conversion and final pass.
