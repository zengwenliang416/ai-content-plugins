---
description: Build an AI event calendar for content planning
argument-hint: "[time period, upstream .openspec.json, or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for period details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `inputs.period`, then `outputs.trend_preview_md`.
   - If argument is a time period, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/trend-preview/*.openspec.json 2>/dev/null | head -3
ls -t ai-content-output/daily-brief/*.openspec.json 2>/dev/null | head -3
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `inputs.period` and `outputs.trend_preview_md`.

3. **Auto-scan legacy event inputs**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/trend-preview/*.md 2>/dev/null | head -3
ls -t ai-content-output/daily-brief/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下活动规划素材，请选择要用于事件日历的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for the target period (default next 3 months).

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Load Skill and Execute

Load the `event-calendar` skill and build a calendar of upcoming AI events with content planning hooks.

## Artifact Handoff

**Output**: Event calendar saved to:

- `ai-content-output/events/YYYY-MM-DD-<period>-event-calendar.md`

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.


- Create or update `ai-content-output/events/YYYY-MM-DD-<period>-event-calendar.openspec.json`.
- Minimum fields:
  - `pipeline`: `event-calendar->content-plan`
  - `stage`: `event-calendar`
  - `outputs.event_calendar_md`: event calendar path
  - `next.command`: `/audience-management:content-plan`
  - `next.input`: event calendar path or contract path

**Next step**: Suggest running `/audience-management:content-plan` to fold event windows into the editorial schedule.
