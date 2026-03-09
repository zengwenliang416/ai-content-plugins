---
description: Analyze a GitHub repository with community sentiment collection
argument-hint: "[GitHub repo URL, owner/repo, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for a repo. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `inputs.repo_url`, then `inputs.url`, then `inputs.topic`.
   - If argument is a GitHub URL (`https://github.com/owner/repo`) or shorthand (`owner/repo`), use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/daily-brief/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/news-search/*.openspec.json 2>/dev/null | head -3
```

If contracts found → read and look for GitHub URLs in `outputs` or `inputs` fields.

3. **Auto-scan legacy outputs**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/news-search/*.md 2>/dev/null | head -3
ls -t openspec/runtime/repo-analysis/*/repo-analysis.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下已有素材，是否复用或开始新分析？/ Found existing artifacts — reuse or start fresh?" with files as options.

4. **No upstream found**: Only in this case, ask the user for a GitHub repo URL or `owner/repo`.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Analysis Depth Selection

Use AskUserQuestion to ask:

"请选择分析深度 / Select analysis depth:

1. ⚡ 快速概览 / Quick Overview (repo info + README, ~2 min)
2. 🔍 标准分析 / Standard Analysis (+ community sentiment from 3 platforms, ~5 min)
3. 🔬 深度分析 / Deep Analysis (+ full multi-platform sentiment + competitor comparison, ~10 min)"

## Step 3: Load Skill and Execute

Load the `repo-analysis` skill and produce a structured analysis of the specified GitHub repository at the chosen depth.

## Artifact Handoff

**Output**: Analysis saved to:

- `openspec/runtime/repo-analysis/<owner>-<repo>/repo-analysis.md`
- `openspec/runtime/repo-analysis/<owner>-<repo>/community-sentiment.md` (standard/deep only)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.

- Create or update `openspec/runtime/repo-analysis/<owner>-<repo>/repo-analysis.openspec.json`.
- Minimum fields:
  - `pipeline`: `repo-analysis->content-hooks`
  - `stage`: `repo-analysis`
  - `outputs.repo_analysis_md`: repo analysis path
  - `outputs.community_sentiment_md`: community sentiment path (if applicable)
  - `next.command`: `/content-hooks:hook` and `/content-production:short-post`
  - `next.input`: repo analysis path or contract path

**Next step**: Suggest running `/content-hooks:hook` to generate hooks or `/content-production:short-post` for quick content.
