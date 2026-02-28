---
description: Create a reusable content template
argument-hint: "[content type, reference path, or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for template scope. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.benchmark_md`, then `outputs.competitor_md`, then `inputs.content_type`.
   - If argument is content type or a reference path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.benchmark_md`, `outputs.competitor_md`, and `inputs.content_type`.

3. **Auto-scan legacy template inputs**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/benchmark/*.md 2>/dev/null | head -3
ls -t ai-content-output/competitor/*.md 2>/dev/null | head -3
ls -t ai-content-output/templates/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下模板设计素材，请选择要用于模板生成的输入：" with files as options.

4. **No upstream found**: Only in this case, ask what content type needs a template.

## Step 2: Load Skill and Execute

Load the `template-creator` skill and create a reusable content template for the specified content type.

## Artifact Handoff

**Output**: Template saved to:

- `ai-content-output/templates/YYYY-MM-DD-<content-type>-template.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/template.md` (if contract/deep-research mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-analysis`
  - `outputs.template_md`: template path
  - `next.command`: `/content-production:long-article`
  - `next.input`: template path or contract path

**Next step**: Suggest running `/content-production:long-article` using the generated template as structural guidance.
