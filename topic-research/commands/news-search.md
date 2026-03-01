---
description: Search and read content across 12+ platforms
argument-hint: "[query/URL, upstream .openspec.json, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for a query. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `inputs.query`, then `inputs.url`, then `inputs.topic`.
   - If argument is a query or URL, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/daily-brief/*.openspec.json 2>/dev/null | head -3
ls -t ai-content-output/trend-preview/*.openspec.json 2>/dev/null | head -3
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `inputs.query`, `inputs.url`, and `inputs.topic`.

3. **Auto-scan legacy search outputs**: Run this Bash command immediately:

```bash
ls -t ai-content-output/news-search/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下历史检索结果，是否复用或继续新检索？" with files as options.

4. **No upstream found**: Only in this case, ask the user for query, URL, and preferred platforms.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `news-search` skill and execute multi-platform search or content reading based on user input (query string or URL).

## Artifact Handoff

**Output**: Search result saved to:

- `ai-content-output/news-search/YYYY-MM-DD-<query-slug>.md`

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Create or update `ai-content-output/news-search/YYYY-MM-DD-<query-slug>.openspec.json`.
- Minimum fields:
  - `pipeline`: `news-search->brainstorm`
  - `stage`: `news-search`
  - `outputs.news_search_md`: search result path
  - `next.command`: `/topic-research:brainstorm`
  - `next.input`: search result path or contract path

**Next step**: Suggest running `/topic-research:brainstorm` to convert findings into candidate topics.
