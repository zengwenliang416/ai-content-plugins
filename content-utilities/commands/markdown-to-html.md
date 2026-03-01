---
description: Convert Markdown to styled HTML with WeChat-compatible themes
argument-hint: "[markdown file path or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read `outputs.article_md` as conversion input.
   - If argument is markdown path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If files found → read contract and extract `outputs.article_md` candidates first.

3. **Auto-scan articles**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/deep-research/*/article.md 2>/dev/null | head -3
ls -t ai-content-output/articles/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下 Markdown 文件，请选择要转换的文件：" with the files as options.

4. **No upstream found**: Only in this case, ask the user for a markdown file path.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `md-to-html` skill and convert the selected markdown file to styled HTML.

## Artifact Handoff

**Output**: HTML saved alongside the source markdown:

- `article.md` → `article.html` (same directory)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-utilities`
  - `outputs.article_html`: generated html path
  - `next.command`: `/publishing:post-to-wechat`
  - `next.input`: html path

**Next step**: Suggest running `/content-analysis:check-quality` to review before publishing, then `/publishing:post-to-wechat` to publish.
