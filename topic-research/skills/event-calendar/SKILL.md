---
name: event-calendar
description: Build an AI event calendar by gathering known conferences and launches, estimating likely events from cadences, mapping content opportunities around each, and producing a planning calendar.
---

# Event Calendar

Build a comprehensive AI event calendar with content planning hooks — mapping known conferences, product launch windows, and publication deadlines to content opportunities.

## Overview

The event calendar aggregates upcoming AI events, estimates likely events based on historical cadences, and identifies the content opportunities each event creates.

**Output**: Event calendar document (Markdown)

---

## Workflow

### Step 1: Gather Known Events

**Major AI Conferences** (check current year's schedule):
- NeurIPS (December)
- ICML (July)
- ICLR (May)
- CVPR (June)
- ACL (August)
- EMNLP (November)
- ECCV (even years, September/October)
- AAAI (February)
- ICCV (odd years, October)
- RSS (Robotics: July)

For each: Look up the current year's dates, location, paper submission deadline, and acceptance notification.

**AI Company Event Cadences**:
- OpenAI: No fixed schedule but historically announces in spring/fall
- Google DeepMind: Google I/O (May), Google Cloud Next (April)
- Meta AI: Connect (September/October), SIGGRAPH (August)
- Apple: WWDC (June), September hardware event
- Microsoft: Build (May), Ignite (November)
- Anthropic: No fixed schedule, track announcements
- Hugging Face: Community events, dataset/model releases

**Model Release Windows** (estimated from historical cadence):
- Research labs typically cluster releases around major conference deadlines
- Q1 and Q3 are historically active for model releases (pre-conference submission season)

**Earnings and Business Events**:
- Quarterly earnings calls for public AI companies (NVIDIA, Google, Microsoft, Meta, Amazon)
- Key dates: January, April, July, October (approximately)

**Platform sources** (via news-search CLI, 24h freshness enforced):

> **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X: `bun news-search/scripts/search.ts twitter "AI conference 2026" 20` — track announcements and CFPs
- GitHub: `bun news-search/scripts/search.ts github "awesome-ai-conferences" 5` — curated event lists
- Web: `bun news-search/scripts/search.ts web "AI events calendar 2026" 10` — aggregator sites
- Read event pages: `bun news-search/scripts/read.ts <event-url>` — extract dates, deadlines, speakers
- See `news-search` skill for full platform reference.

### Step 2: Estimate Likely Events

Based on historical patterns, estimate:
- Which major model releases are likely in the next 3-6 months? (based on lab release cadences)
- When are next-generation hardware announcements likely? (GPU roadmaps, etc.)
- When do paper submission deadlines create "quiet periods" before new releases?
- What regulatory actions are expected? (EU AI Act milestones, US executive orders)

Mark estimated events as [ESTIMATED] vs. confirmed events.

### Step 3: Map Content Opportunities

For each event, identify:
- **Preview content** (1-4 weeks before): What to write to build anticipation
- **Live coverage** (during/immediately after): Breaking analysis
- **Follow-up content** (1-2 weeks after): Deeper analysis after initial reactions settle
- **Evergreen content** (triggered by event): Topics the event makes newly relevant

### Step 4: Build the Calendar

Organize events chronologically with content hooks for each.

---

## Output Format

```markdown
# AI Event Calendar — [Start Date] to [End Date]

*Generated: [Date]*

---

## Calendar Overview

[Table: Month-by-month summary of key events]

| Month | Key Events | Content Opportunities |
|-------|-----------|----------------------|
| [Month] | [Event 1, Event 2] | [Opportunity 1, Opportunity 2] |

---

## Detailed Event Listing

### [Month Year]

#### [Date Range] — [Event Name]
**Type**: Conference / Product Launch / Earnings / Regulatory / [Estimated]
**Organizer**: [Organization]
**Location / Format**: [Location or Virtual]
**URL**: [Official URL if available]

**Why it matters for AI content**:
[2-3 sentences on significance]

**Content opportunities**:

- **Preview** (publish [date]): [Suggested angle]
- **Live coverage** (publish [date]): [Suggested angle]
- **Follow-up** (publish [date]): [Suggested angle]
- **Evergreen trigger**: [What deeper topic this event makes timely]

---

[Repeat for each event]

---

## Content Planning Grid

| Event | Preview | Live Coverage | Follow-up | Evergreen |
|-------|---------|--------------|-----------|-----------|
| [Event] | [Date + angle] | [Date + angle] | [Date + angle] | [Topic] |

---

## High-Priority Windows

[Top 5 content opportunities ranked by potential impact]

1. **[Event]** — [Why this is the highest priority window]
2. [Same format]

---

## Sources

[All sources used to build the calendar, with URLs]
```

---

## Quality Standards

- Minimum 15 events listed (confirmed + estimated)
- All confirmed events have source URLs
- All estimated events clearly marked [ESTIMATED]
- Each event has at least 2 specific content angle suggestions
- Content planning grid covers all major events
- High-priority windows ranked by audience interest, not just event size
