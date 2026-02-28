---
name: strategy-memo
description: Draft a structured content strategy memo synthesizing situation analysis, strategic options, a clear recommendation, key risks, and next steps. Use when making a major content decision, pivoting strategy, or communicating direction to collaborators or team. Triggers on "strategy memo", "write a strategy memo", "strategic recommendation", "content strategy brief", "decision memo", or "strategy write-up".
user-invocable: true
metadata:
  openclaw:
    emoji: "📋"
    requires: {}
    os: ["darwin", "linux"]
---

# Strategy Memo

## Workflow

### Step 1: Gather Inputs

Collect from the user (or from prior analysis in the session):

- Strategic question or decision to address
- Relevant context (current account state, recent performance, market observations)
- Available options or approaches being considered
- Constraints (time, budget, audience sensitivity, platform rules)
- Stakeholders who will read or act on this memo
- Any prior decisions or commitments that constrain options

**Market and platform data** (24h freshness enforced | `bun skills/news-search/scripts/doctor.ts` for status):
- Twitter/X: `bun skills/news-search/scripts/search.ts twitter "[topic] trend" 10` — audience sentiment signals
- Reddit: `bun skills/news-search/scripts/search.ts reddit "[niche]" 10` — community discussion themes
- Web: `bun skills/news-search/scripts/search.ts web "[market topic]" 10` — industry reports and data
- See `news-search` skill for full platform reference.

### Step 2: Draft Memo Structure

Standard strategy memo format:

**I. Executive Summary** (half page)
- The strategic question
- Recommendation in one sentence
- Top 3 reasons for the recommendation
- Key risks and how they're addressed

**II. Situation Summary** (half to 1 page)
- What's happening and why this decision needs to be made now
- Relevant data or observations (account performance, audience signals, market trends)
- What happens if no decision is made

**III. Strategic Options** (1 page)
- 2-4 options considered
- For each option:
  - Description
  - Pros and cons
  - Estimated impact (audience growth, content quality, revenue, effort)
  - Key assumptions

**IV. Recommendation** (half page)
- Which option to pursue and why
- What specifically needs to happen
- Timeline and milestones

**V. Risks & Mitigants** (half page)
- Key risks ranked by severity and likelihood
- Mitigant or contingency for each
- Any dealbreaker risks that could change the recommendation

**VI. Next Steps**
- Concrete actions with owners and due dates
- What to review and when to reassess

### Step 3: Output Format

- Default: Structured document (Word or Markdown)
- 1-2 pages for most decisions; up to 3 pages for complex strategy pivots
- Include tables for option comparison and risk assessment, not just prose

## Important Notes

- Strategy memos should be balanced — present real tradeoffs, not just advocacy
- Be direct about the recommendation — vague memos produce vague decisions
- Risks must be honest — downplaying risks undermines trust
- Tailor the level of detail to the decision's stakes and audience
- Ask for missing context rather than making assumptions about goals or constraints
- A good memo creates alignment and clarity, not just a record of thinking
