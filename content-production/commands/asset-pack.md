---
description: Bundle content assets into an organized package
argument-hint: "[project brief, asset paths, or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for asset package scope. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, then `outputs.cover_image`, then `outputs.illustrations_dir`.
   - If argument is a project brief or asset path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md`, `outputs.cover_image`, and `outputs.illustrations_dir`.

3. **Auto-scan legacy asset inputs**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/deep-research/*/article.md 2>/dev/null | head -3
ls -t ai-content-output/deep-research/*/images/cover.png 2>/dev/null | head -3
ls -dt ai-content-output/deep-research/*/images 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下素材，请选择要打包的输入：" with files/directories as options.

4. **No upstream found**: Only in this case, ask for project details, deadline, and needed asset types.

## Step 2: Load Skill and Execute

Load the `asset-pack` skill and assemble an organized asset package for the specified content project.

## Artifact Handoff

**Output**: Asset package saved to:

- `ai-content-output/asset-pack/YYYY-MM-DD-<project>-asset-pack.zip` (standalone mode)
- `ai-content-output/deep-research/<slug>/asset-pack.zip` (if contract/deep-research mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-production`
  - `outputs.asset_pack_zip`: asset package path
  - `next.command`: `/publishing:post-to-wechat`
  - `next.input`: asset package path or contract path

**Next step**: Suggest running `/publishing:post-to-wechat` (or `/publishing:post-to-x`) with packaged assets.
