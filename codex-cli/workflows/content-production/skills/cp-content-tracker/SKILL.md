---
name: cp-content-tracker
description: "Track the content pipeline from idea to publication with statuses, deadlines, and performance metrics"
arguments:
  - name: input
    description: "Tracker scope, planning path, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY)

Complete this step BEFORE any other interaction.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `pipeline.openspec.json`, read it first and prioritize `outputs.content_plan_md`, then `outputs.short_post_md`, then `outputs.article_md`.
   - If `$ARGUMENTS` is tracker scope or planning path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.content_plan_md`, `outputs.short_post_md`, and `outputs.article_md`.

3. **Auto-scan legacy tracking assets**:

```bash
ls -t openspec/runtime/content-plan/*.md 2>/dev/null | head -3
ls -t openspec/runtime/articles/*.md 2>/dev/null | head -3
ls -t openspec/runtime/short-post/*.md 2>/dev/null | head -3
ls -t openspec/runtime/content-tracker/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下排期追踪素材，请选择要用于内容追踪的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for active projects and deadline context.

## Language Selection (MANDATORY)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Core Workflow

### Content Setup

For each content item, capture:
- **Title / working title**: Draft name for the piece
- **Topic / niche**: Subject matter and angle
- **Format**: Article, short post, thread, infographic, video script, newsletter
- **Platform**: Target publication channel
- **Status**: Idea -> Research -> Draft -> Review -> Scheduled -> Published
- **Publish date**: Target or confirmed date
- **Owner**: Who is responsible (writer, editor, designer)
- **Notes**: Key angle, sources needed, dependencies

### Milestone Tracking

Track key milestones per content item:

| Milestone | Target Date | Actual Date | Status | Notes |
|-----------|------------|-------------|--------|-------|
| Idea approved | | | | |
| Research complete | | | | |
| Outline drafted | | | | |
| First draft complete | | | | |
| Review / edits done | | | | |
| Assets ready (images, data) | | | | |
| Scheduled in platform | | | | |
| Published | | | | |
| Performance reviewed | | | | |

Status: On Track / At Risk / Delayed / Complete

### Action Items

Maintain a running action list across all content:

| Action | Content Item | Owner | Due Date | Priority | Status |
|--------|-------------|-------|----------|----------|--------|
| | | | | P0/P1/P2 | Open/Done/Blocked |

### Weekly Content Review

Generate a summary for weekly planning:

**For each active item:**
1. One-line status update
2. Key progress this week
3. Upcoming milestone (next 7 days)
4. Blockers or risks
5. Next action needed

**Pipeline summary:**
- Total items by status
- Items publishing this week
- Items at risk (missed milestones, no progress)
- Ideas backlog count
- Published this month and performance highlights

### Output

- Pipeline status table (all items, one row each)
- Upcoming publishing schedule (next 14 days)
- Action item list with owners
- Optional: Weekly summary for team Slack or email

## Artifact Handoff

**Output path**:

- `openspec/runtime/content-tracker/YYYY-MM-DD-content-tracker.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/content-tracker.md` (pipeline mode)

**OpenSpec contract (MANDATORY)**:

- Standalone: create or update a stage-local `*.openspec.json` contract.
- Pipeline: update `pipeline.openspec.json` in-place with `stage: content-production`, `outputs.content_tracker_md`, `next.command: /growth-ops:performance`.

## Important Notes

- Update the tracker weekly at minimum — stale trackers mislead instead of help
- Flag items where drafts are more than 7 days past deadline — early warning prevents missed publishing windows
- Action items without owners and due dates don't get done — be specific
- Track performance metrics (views, engagement, shares) at 7 and 30 days after publishing
- Archive published content separately — keep the active pipeline view focused on in-flight work
- The pipeline view should show publishing frequency — useful for identifying gaps in the calendar
