---
name: narrative-tracker
description: Define and track a content narrative or angle by collecting supporting and opposing evidence, documenting narrative evolution over time, and identifying content opportunities.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebSearch
  - WebFetch
  - AskUserQuestion
---

# Narrative Tracker

Build a structured tracking document for a specific content narrative or angle — accumulating evidence, tracking how the narrative evolves, and identifying content opportunities within it.

## Overview

A narrative is a recurring theme or argument in AI discourse (e.g., "open-source is catching up to closed models", "AI agents will replace SaaS"). This skill helps you track the evidence for and against a narrative, monitor its evolution, and plan content around it.

**Output**: Narrative tracking document (Markdown)

---

## Workflow

### Step 1: Define the Narrative

Precisely define the narrative being tracked:
- **Narrative statement**: A single declarative sentence (e.g., "Open-source LLMs will reach parity with proprietary models by 2026")
- **Why it matters**: Who cares about this narrative and why
- **Key players**: Who is making or refuting this argument
- **Content opportunity**: What articles or angles does this narrative enable

Establish:
- **Thesis version**: The strong form of this narrative
- **Anti-thesis version**: The strongest counter-argument
- **Current consensus**: Where does mainstream opinion sit today?

### Step 2: Collect Supporting Evidence

Search for evidence that supports the narrative:
- Data points, statistics, benchmarks (with dates and sources)
- Expert quotes or statements (attributed, dated)
- Case studies or examples (company, product, deployment)
- Research papers (arXiv, conference papers)
- Product announcements
- Market trends

For each piece of evidence:
- Source and date
- Strength (Strong / Moderate / Weak — how directly it supports the narrative)
- Quote or data point
- Context (why this matters for the narrative)

**Platform evidence sources** (via news-search CLI, 24h freshness enforced):

> **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "<narrative-keyword>" 20`
- Reddit: `${TS_RUNNER} news-search/scripts/search.ts reddit "<narrative-keyword>" 10`
- GitHub: `${TS_RUNNER} news-search/scripts/search.ts github "<narrative-keyword>" 10`
- Read specific URLs: `${TS_RUNNER} news-search/scripts/read.ts <url>`
- See `news-search` skill for full platform reference.

### Step 3: Collect Opposing Evidence

Search for evidence that challenges or complicates the narrative:
- Data that contradicts the thesis
- Expert counter-arguments
- Failed predictions or evidence the narrative is wrong
- Complicating factors that make the narrative more nuanced

For each counter-evidence item:
- Same format as supporting evidence
- Note: Does this disprove the narrative, or just complicate it?

### Step 4: Track Narrative Evolution

Document how the narrative has evolved:
- When did this narrative emerge?
- How has the evidence balance shifted over time?
- Has the narrative strengthened, weakened, or evolved?
- What events moved the needle (in either direction)?

Build a timeline:
- Date | Event | Effect on narrative (Strengthened / Weakened / Complicated)

### Step 5: Identify Content Opportunities

Based on the narrative and evidence:
- What article angles does this narrative enable?
- What is the most compelling moment to publish (what event would make this narrative timely)?
- What unique angle hasn't been written yet?
- What would change the narrative and what content should follow that change?

---

## Output Format

```markdown
# Narrative Tracker: [Narrative Name]

**Narrative Statement**: [One sentence]
**Started tracking**: [Date]
**Last updated**: [Date]

---

## Narrative Definition

### Thesis
[Strong form of the narrative — 2-3 sentences]

### Anti-thesis
[Strongest counter-argument — 2-3 sentences]

### Current Consensus
[Where mainstream opinion sits today — 1-2 sentences]

---

## Evidence Log

### Supporting Evidence

| Date | Source | Evidence | Strength | Notes |
|------|--------|----------|----------|-------|
| [Date] | [Source + URL] | [Data point or quote] | Strong / Moderate / Weak | [Context] |

### Opposing Evidence

| Date | Source | Evidence | Strength | Notes |
|------|--------|----------|----------|-------|

---

## Narrative Evolution Timeline

| Date | Event | Effect | Commentary |
|------|-------|--------|------------|
| [Date] | [Event] | Strengthened / Weakened / Complicated | [1-2 sentences] |

---

## Current Assessment

**Narrative strength**: Strong / Mixed / Weak (as of [date])
**Trend**: Strengthening / Stable / Weakening
**Evidence balance**: [Summary of how supporting vs. opposing evidence compares]

---

## Content Opportunities

### Active angles (ready to write)
1. **[Angle title]**: [Why now, suggested approach]
2. **[Angle title]**: [Why now, suggested approach]

### Waiting for trigger
1. **[Angle]**: Publish when [trigger event]

### Evergreen angles
1. **[Angle]**: [Works at any time — why]

---

## Sources

[All sources with dates and URLs]
```

---

## Quality Standards

- Supporting and opposing evidence must both be gathered — no one-sided tracking
- All evidence must be cited with dates
- Narrative evolution timeline must be chronological and event-driven
- Content opportunities must be specific (title + timing + angle), not vague
- Update the document when new evidence emerges
