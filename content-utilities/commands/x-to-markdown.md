---
description: Convert X (Twitter) tweets or articles to Markdown
argument-hint: "[tweet/article URL or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `inputs.url`, then `outputs.x_post_url`.
   - If argument is a tweet/article URL, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `inputs.url` and `outputs.x_post_url`.

3. **Auto-scan legacy X clipping assets**: Run this Bash command immediately:

```bash
ls -t ai-content-output/x-clips/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下历史 X 摘录，是否复用或继续抓取新链接？" with files as options.

4. **No upstream found**: Only in this case, ask the user for the X (Twitter) URL to convert.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `tweet-clipper` skill and convert the X content to markdown.

## Artifact Handoff

**Output**: X markdown saved to:

- `ai-content-output/x-clips/YYYY-MM-DD-<tweet-id>.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/x-clips/<tweet-id>.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-utilities`
  - `outputs.x_markdown_md`: x markdown path
  - `next.command`: `/content-production:short-post`
  - `next.input`: x markdown path or contract path

**Next step**: Suggest running `/content-production:short-post` to turn clipped X content into a platform-ready post draft.
