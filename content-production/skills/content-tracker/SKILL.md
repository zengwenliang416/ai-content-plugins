---
name: content-tracker
description: "Track the content pipeline from idea to publication with statuses, deadlines, and performance metrics"
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - AskUserQuestion
---

# Content Tracker

## Workflow

### Step 1: Content Setup

For each content item, capture:
- **Title / working title**: Draft name for the piece
- **Topic / niche**: Subject matter and angle
- **Format**: Article, short post, thread, infographic, video script, newsletter
- **Platform**: Target publication channel
- **Status**: Idea → Research → Draft → Review → Scheduled → Published
- **Publish date**: Target or confirmed date
- **Owner**: Who is responsible (writer, editor, designer)
- **Notes**: Key angle, sources needed, dependencies

### Step 2: Milestone Tracking

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

### Step 3: Action Items

Maintain a running action list across all content:

| Action | Content Item | Owner | Due Date | Priority | Status |
|--------|-------------|-------|----------|----------|--------|
| | | | | P0/P1/P2 | Open/Done/Blocked |

### Step 4: Weekly Content Review

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

### Step 5: Output

- Pipeline status table (all items, one row each)
- Upcoming publishing schedule (next 14 days)
- Action item list with owners
- Optional: Weekly summary for team Slack or email

## Important Notes

- Update the tracker weekly at minimum — stale trackers mislead instead of help
- Flag items where drafts are more than 7 days past deadline — early warning prevents missed publishing windows
- Action items without owners and due dates don't get done — be specific
- Track performance metrics (views, engagement, shares) at 7 and 30 days after publishing
- Archive published content separately — keep the active pipeline view focused on in-flight work
- The pipeline view should show publishing frequency — useful for identifying gaps in the calendar
