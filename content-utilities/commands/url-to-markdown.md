---
description: Fetch a URL and convert its content to clean Markdown
argument-hint: "[URL or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `inputs.url`, then `outputs.source_discovery_md`.
   - If argument is a URL, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `inputs.url` and `outputs.source_discovery_md`.

3. **Auto-scan legacy clipping assets**: Run this Bash command immediately:

```bash
ls -t ai-content-output/clips/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下历史网页摘录，是否复用或继续抓取新 URL？" with files as options.

4. **No upstream found**: Only in this case, ask the user for the URL to fetch and convert.

## Step 2: Load Skill and Execute

Load the `web-clipper` skill and fetch the URL and convert to markdown.

## Artifact Handoff

**Output**: Clipped markdown saved to:

- `ai-content-output/clips/YYYY-MM-DD-<source-slug>.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/clips/<source-slug>.md` (if contract/deep-research mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-utilities`
  - `outputs.url_markdown_md`: clipped markdown path
  - `next.command`: `/growth-ops:find-sources`
  - `next.input`: clipped markdown path or contract path

**Next step**: Suggest running `/growth-ops:find-sources` to integrate the clipped source into a broader source set.
