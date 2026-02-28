---
name: topic-brainstorm
description: Generate and score 20+ content topic ideas, rank to top 10, and create briefs for the top 3 with suggested angles and audience insights.
---

# Topic Brainstorm

Generate, score, and prioritize content topic ideas — surfacing the best candidates with audience insights and suggested angles.

## Overview

A structured topic brainstorming session that generates 20+ ideas, applies a scoring framework, filters to the top 10, and produces detailed briefs for the top 3.

**Output**: Scored topic list with top-3 briefs (Markdown)

---

## Input Handling

This skill accepts an optional input file path pointing to upstream data (typically a daily-brief).

**When input file is provided** (e.g., `/topic-research:brainstorm path/to/daily-brief.md`):

1. Read the file content
2. Extract news items, top stories, and trend signals as seed material
3. Skip redundant web searches for data already present in the input file
4. Use the input's categories and items as the basis for Step 1 trend analysis

**When no input file is provided**:

1. Check `ai-content-output/daily-brief/` for today's brief (YYYY-MM-DD pattern)
2. If found, read and use as seed material (same as above)
3. If not found, proceed with fresh data gathering (existing Step 1 workflow)

---

## Workflow

### Step 1: Analyze Current Trends and Gaps

Before brainstorming, survey:

- What are the top trends in AI right now? (use news-search CLI + HN MCP + arXiv MCP)
  - **Platform sources** (via news-search CLI, 24h freshness enforced):

    > **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

    - Twitter/X: `bun news-search/scripts/search.ts twitter "AI trending" 20` — hot topics and discourse
    - Reddit: `bun news-search/scripts/search.ts reddit "artificial intelligence" 10` — community buzz
    - YouTube: `bun news-search/scripts/search.ts youtube "AI news this week" 5` — trending video topics
    - See `news-search` skill for full platform reference.
- What topics are over-covered (hard to differentiate)?
- What topics are under-covered (gaps in existing content)?
- What is the target audience interested in? (research, application, business implications)
- What is the seed topic or niche (if provided)?

### Step 2: Generate 20+ Topic Ideas

Use divergent thinking — generate across multiple dimensions:

**Dimension 1: Technology-led**

- Specific model or technique deep dives
- Technical comparison articles
- "How X works" explainers
- Benchmark and evaluation deep dives

**Dimension 2: Application-led**

- Industry-specific AI adoption stories
- Use-case deep dives
- Workflow transformation stories
- ROI and business case analysis

**Dimension 3: Narrative-led**

- "The case for/against X"
- "Why everyone is wrong about X"
- "The hidden story behind X"
- Historical perspective pieces

**Dimension 4: Event-led**

- "What [conference/launch/paper] tells us about..."
- "The implications of [recent event]"
- "What comes next after [milestone]"

**Dimension 5: Format experiments**

- Comparison: "X vs Y vs Z"
- Lists: "The N most important..."
- Timelines: "History of X"
- Predictions: "What will happen with X in [year]"

For each idea, note in 1-2 lines: what it covers and what makes it interesting.

### Step 3: Score Each Topic

Score each idea on 4 dimensions (1-5 scale):

**Audience Interest (1-5)**

- 1: Niche interest, small audience
- 5: High interest, broad tech audience
- Evidence: Search trends, community discussion, newsletter engagement signals

**Uniqueness (1-5)**

- 1: Heavily covered, hard to differentiate
- 5: Underexplored, clear gap in existing content
- Evidence: Quick search for existing coverage

**Feasibility (1-5)**

- 1: Requires extensive data/access not readily available
- 5: Fully researchable with public sources
- Consider: Data availability, source access, research complexity

**Timeliness (1-5)**

- 1: Evergreen or timing-irrelevant
- 3: Somewhat timely
- 5: Highly timely — optimal window open now
- Consider: Recent events, upcoming catalysts

**Total Score**: Sum of four dimensions (max 20)

### Step 4: Rank and Filter to Top 10

- Sort all ideas by total score
- Flag the top 10 for review
- Note: High timeliness scores decay — reprioritize if timing window closes

### Step 5: Create Briefs for Top 3

For each of the top 3 topics, write a 200-300 word brief covering:

- **Core angle**: The specific hook that makes this article compelling
- **Target audience**: Who cares most and why
- **Key questions to answer**: What the article needs to address
- **Data requirements**: What research or data is needed
- **Potential sources**: Where to find the information
- **Comparable content**: What similar content exists (and how this is different)
- **Estimated research time**: Quick / Medium / Deep (1 / 3 / 5 days)

---

## Output Format

```markdown
# Topic Brainstorm — [Date]

[Seed topic/niche if provided, or "General AI Content"]

---

## Trend & Gap Analysis

[3-5 sentences on current content landscape — what's hot, what's missing]

---

## Full Topic List (Scored)

| #   | Topic         | Audience | Uniqueness | Feasibility | Timeliness | Total |
| --- | ------------- | -------- | ---------- | ----------- | ---------- | ----- |
| 1   | [Topic title] | 4        | 3          | 5           | 4          | 16    |
| 2   | [Topic title] | 3        | 5          | 4           | 3          | 15    |

...

---

## Top 10 Topics (Ranked)

1. [Topic] — Score: [N/20] — [1-line description]
2. [Topic] — Score: [N/20] — [1-line description]
   ...

---

## Top 3 Briefs

### #1: [Topic Title]

**Score**: [N/20] | **Research depth**: Quick / Medium / Deep

**Core angle**: [The specific hook — 2-3 sentences]

**Target audience**: [Who cares, and why they care now]

**Key questions to answer**:

- [Question 1]
- [Question 2]
- [Question 3]

**Data requirements**: [What data or research is needed]

**Potential sources**: [Where to find the information]

**Comparable content**: [Existing coverage and how this is different]

---

[Repeat for #2 and #3]

---

## Scoring Notes

[Any caveats on scoring or time-sensitive considerations]
```

---

## Output Persistence

**MANDATORY**: Save the brainstorm results to file immediately after generation. Do NOT only display in conversation.

**Output path**: `ai-content-output/brainstorm/YYYY-MM-DD-topic-brainstorm.md`

**YAML frontmatter** (prepend to output):

```yaml
---
title: "Topic Brainstorm"
date: YYYY-MM-DD
type: topic-brainstorm
language: <user-selected-language>
input_source: <path-to-input-file-or-"fresh">
top3_topics:
  - title: "<topic 1 title>"
    score: <N>
  - title: "<topic 2 title>"
    score: <N>
  - title: "<topic 3 title>"
    score: <N>
---
```

**Steps**:

1. Create directory: `ai-content-output/brainstorm/` (if not exists)
2. Write the complete brainstorm with frontmatter to the file
3. Confirm save path to user

**Downstream consumers**: `deep-research` Task 1 reads this file for topic context and brief.

---

## Quality Standards

- Minimum 20 ideas generated (not 10 with padding)
- Ideas must be specific — "AI agents" is too vague, "How Anthropic's tool use changes enterprise automation" is specific
- Scores must be justified by real evidence (search data, community discussion) — not gut feeling
- Top 3 briefs must be actionable — someone should be able to start researching immediately
- Comparable content section must cite specific articles, not just "a lot of content exists"
