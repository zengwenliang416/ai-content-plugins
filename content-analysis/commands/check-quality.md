---
description: Check article quality for accuracy, readability, and SEO
argument-hint: "[article file path]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**: If the user passed an article file path as argument, use it directly. Skip to Step 2.

2. **Auto-scan articles**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/deep-research/*/article.md 2>/dev/null | head -3
ls -t ai-content-output/articles/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下文章，请选择要检查质量的文章：" with the files as options.

3. **No upstream found**: Only in this case, ask the user for an article file path.

## Step 2: Load Skill and Execute

Load the `quality-check` skill and review the selected article for accuracy, readability, logical coherence, and SEO quality.

## Artifact Handoff

**Output**: Quality scorecard displayed in conversation (not saved to file).

**Next step**: If quality passes, suggest running `/publishing:post-to-wechat` to publish. If issues found, suggest fixing them first.
