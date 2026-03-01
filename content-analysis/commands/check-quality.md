---
description: Check article quality for accuracy, readability, and SEO
argument-hint: "[article file path or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read `outputs.article_md` as primary input (fallback `outputs.article_html`).
   - If argument is an article path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md`.

3. **Auto-scan articles**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/deep-research/*/article.md 2>/dev/null | head -3
ls -t ai-content-output/articles/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下文章，请选择要检查质量的文章：" with the files as options.

4. **No upstream found**: Only in this case, ask the user for an article file path.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `quality-check` skill and review the selected article for accuracy, readability, logical coherence, and SEO quality.

## Artifact Handoff

**Output**:

- Quality scorecard MUST be displayed in conversation.
- Quality report SHOULD be saved as `quality-report.md` alongside the article file for traceability.

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `ai-content-output/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-analysis`
  - `outputs.quality_report_md`: report path
  - `outputs.quality_gate_status`: `pass` or `fail`
  - `next.command`: `/publishing:post-to-wechat`
  - `next.input`: selected article path

**Next step**: Suggest `/publishing:post-to-wechat` as the single routed next command; publishing readiness is interpreted from `outputs.quality_gate_status`.
