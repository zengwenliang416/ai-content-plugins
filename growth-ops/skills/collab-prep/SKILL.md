---
name: collab-prep
description: "Prepare for a content collaboration meeting — research the collaborator, identify mutual benefits, and draft talking points"
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebFetch
  - WebSearch
  - AskUserQuestion
---

# Collaboration Prep

## Workflow

### Step 1: Meeting Context

Ask the user for:
- **Collaborator**: Who they're meeting with (creator name, brand, or podcast)
- **Collaboration type**: Guest post, podcast swap, co-created series, sponsored content, joint giveaway, community crossover
- **What you already know**: Prior interactions, mutual connections, content they've done before
- **Your goals**: Audience growth, credibility, revenue, content variety
- **Key concerns**: Audience fit, content alignment, exclusivity, compensation

### Step 2: Research the Collaborator

Gather context on the collaborator:

- **Content overview**: What topics do they cover? What formats do they use?
- **Audience size and demographics**: Platform followers, engagement rates, audience type
- **Tone and style**: Professional, casual, educational, entertainment — how do they communicate?
- **Recent work**: Noteworthy recent posts, collaborations, or projects
  - **Platform sources** (via news-search CLI, 24h freshness enforced):

    > **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

    - Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "from:[collaborator]" 20` — recent posts and engagement
    - YouTube: `${TS_RUNNER} news-search/scripts/search.ts youtube "[collaborator name]" 5` — video content and collabs
    - LinkedIn: `${TS_RUNNER} news-search/scripts/search.ts linkedin "[collaborator name]"` — professional profile
    - Web: `${TS_RUNNER} news-search/scripts/search.ts web "[collaborator name]" 10` — press and mentions
    - Read profile/posts: `${TS_RUNNER} news-search/scripts/read.ts <profile-url>` — extract details
    - See `news-search` skill for full platform reference.
- **Reputation**: How are they perceived in the community? Any controversies?
- **Prior collaborations**: Who else have they worked with? What did those look like?

### Step 3: Identify Mutual Benefits

Map out the value exchange:

| | Your Account | Collaborator |
|---|---|---|
| Audience exposure | Their audience sees you | Your audience sees them |
| Content value | New perspective/format | Access to your expertise |
| Credibility | Association with their brand | Association with your brand |
| Growth opportunity | | |

**Audience fit assessment**: How much overlap exists between your audiences? Are there complementary but non-competing segments?

**Talking points on value**:
- What you bring to them (audience, expertise, format, distribution)
- What they bring to you
- Why this collaboration makes sense now

### Step 4: Prepare Questions and Proposal Outline

**Questions to ask in the meeting**:
- What's your current content focus for this quarter?
- What collaborations have worked well for you in the past?
- What format are you most interested in exploring?
- How do you typically structure collaborations — revenue split, cross-promotion, or flat fee?
- What does your audience respond to most strongly?

**Proposal outline** (to present or adapt):
1. Why I'm reaching out — shared audience and complementary content
2. Proposed collaboration format — [specific idea]
3. What each party contributes
4. Expected outcomes (reach, engagement, content pieces produced)
5. Timeline and logistics
6. Next steps

### Step 5: Output

Preparation brief:
1. **Collaborator profile**: Who they are, their content, their audience
2. **Mutual benefit map**: What each party gains
3. **Talking points**: Top 3-5 points to make about the collaboration opportunity
4. **Question list**: 5-8 questions to ask
5. **Proposal outline**: Draft structure for presenting the collaboration idea
6. **Red flags to watch**: Audience mismatch, unclear compensation expectations, content conflicts

## Important Notes

- Research the collaborator thoroughly before the meeting — know their recent content
- Lead with what's in it for them, not just what you want
- Align on audience fit first — a mismatch makes the collaboration low-value for both sides
- Be specific about the collaboration format — vague ideas rarely get executed
- Always discuss content ownership, posting rights, and attribution upfront
- Never agree to exclusivity without understanding the full implications
