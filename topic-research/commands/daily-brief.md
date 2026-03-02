---
description: Generate a daily AI news briefing
argument-hint: "[daily-brief .openspec.json, topic focus, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user any questions. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `inputs.topic` and `inputs.period`.
   - If argument is a topic focus, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/daily-brief/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `inputs.topic`, `inputs.period`, and recent briefing metadata.

3. **Auto-scan legacy brief files**: Run these Bash commands immediately:

```bash
TODAY=$(date +%Y-%m-%d) && ls openspec/runtime/daily-brief/${TODAY}*.md 2>/dev/null
ls -t openspec/runtime/daily-brief/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到历史每日简报，是否沿用同主题继续生成？" with files as options.

4. **No upstream found**: Only in this case, proceed with broad daily AI landscape scan.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `daily-brief` skill and generate a concise daily briefing covering the latest AI developments, research papers, product launches, and industry news.

## Artifact Handoff

**Output**: After generation, the briefing MUST be saved to `openspec/runtime/daily-brief/YYYY-MM-DD-ai-daily-brief.md`.

**OpenSpec contract (MANDATORY)**:

- Create or update `openspec/runtime/daily-brief/YYYY-MM-DD-ai-daily-brief.openspec.json`.
- Minimum fields:
  - `pipeline`: `daily-brief->brainstorm->deep-research`
  - `stage`: `daily-brief`
  - `outputs.daily_brief_md`: briefing file path
  - `next.command`: `/topic-research:brainstorm`
  - `next.input`: contract file path

**Next step**: Suggest running `/topic-research:brainstorm` to select content topics from this briefing.
