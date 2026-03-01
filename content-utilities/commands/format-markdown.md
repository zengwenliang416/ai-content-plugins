---
description: Format and beautify Markdown files with proper structure
argument-hint: "[markdown path or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, then `outputs.research_md`, then `outputs.analysis_md`.
   - If argument is a markdown path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md`, `outputs.research_md`, and `outputs.analysis_md`.

3. **Auto-scan legacy markdown assets**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/deep-research/*/*.md 2>/dev/null | head -5
ls -t ai-content-output/articles/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下 Markdown 文件，请选择要格式化的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for the markdown file path.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `md-formatter` skill and format the markdown file.

## Artifact Handoff

**Output**: Formatted markdown saved to:

- Original file overwritten (default), or
- `ai-content-output/deep-research/<slug>/formatted.md` (if preserved output is requested)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-utilities`
  - `outputs.formatted_md`: formatted markdown path
  - `next.command`: `/content-analysis:check-quality`
  - `next.input`: formatted markdown path

**Next step**: Suggest running `/content-analysis:check-quality` to verify quality after formatting.
