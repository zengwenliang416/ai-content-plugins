---
name: daily-brief
description: Generate a daily AI news briefing by gathering from Hacker News, arXiv, RSS feeds, and news-search, then filtering, categorizing, summarizing, and identifying top stories for potential deep dives.
---

# Daily AI Briefing

Generate a concise, high-signal daily briefing covering the most important AI developments across research, products, industry, tools, and policy.

## Overview

The daily brief aggregates AI news from multiple sources, filters for relevance, categorizes by theme, summarizes each item, and surfaces the top stories worth deeper investigation.

**Output**: Markdown briefing document

---

## Workflow

### Step 1: Gather Sources

Pull from all available sources in parallel:

**HuggingFace** (via hacker-news MCP):

- Check Hacker News for AI-tagged stories (top 50)
- Focus on: Show HN posts about AI tools, papers posted to HN, AI company announcements

**arXiv** (via arxiv MCP):

- Pull recent submissions in: cs.AI, cs.LG, cs.CL, cs.CV, cs.RO
- Filter for: high-engagement papers, papers from major labs, papers with unusual titles/claims
- Time window: Last 24-48 hours

**RSS feeds** (via news-search):

- `bun news-search/scripts/search.ts rss "https://importai.substack.com/feed" 10` — Import AI (Jack Clark)
- `bun news-search/scripts/search.ts rss "https://deeplearning.ai/the-batch/feed" 10` — The Batch (Andrew Ng)
- `bun news-search/scripts/search.ts rss "https://www.technologyreview.com/feed/" 10` — MIT Technology Review
- `bun news-search/scripts/search.ts rss "https://venturebeat.com/category/ai/feed/" 10` — VentureBeat AI
- `bun news-search/scripts/search.ts rss "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml" 10` — The Verge AI

**Web search** (via news-search | `bun news-search/scripts/doctor.ts` for status):

- `bun news-search/scripts/search.ts web "AI news today" 10`
- `bun news-search/scripts/search.ts exa "AI model launch" 10`
- `bun news-search/scripts/search.ts web "AI research paper" 10`
- `bun news-search/scripts/search.ts web "AI company announcement" 10`

**Platform sources** (24h freshness enforced | `bun news-search/scripts/doctor.ts` for status):

- Twitter/X: `bun news-search/scripts/search.ts twitter "AI news" 20`
- Reddit: `bun news-search/scripts/search.ts reddit "artificial intelligence" 10`
- GitHub trending: `bun news-search/scripts/search.ts github "AI" 10`
- See `news-search` skill for full platform reference.

### Step 2: Filter for AI/ML Relevance

From all gathered items, keep only items that:

- Directly involve AI, ML, or related technology (NLP, CV, RL, robotics, agents)
- Come from credible sources (avoid pure opinion/speculation without facts)
- Represent new information (not re-hashing old news)
- Have clear significance (not trivial product updates)

Remove:

- Duplicate stories from multiple sources (keep the best source)
- Paywalled content with no extractable summary
- Opinion pieces without factual news hooks
- AI-adjacent topics with no direct AI relevance

### Step 3: Categorize

Sort filtered items into these 5 categories:

**1. Models & Research**

- New model releases (open or proprietary)
- Research papers with significant results
- Benchmark breakthroughs
- Technical methodology innovations

**2. Products & Launches**

- New AI product launches
- Feature updates to existing AI products
- API releases or significant capability additions
- Hardware announcements with AI implications

**3. Industry & Business**

- Funding rounds and valuations
- Acquisitions and partnerships
- Executive moves at AI companies
- Market analysis and revenue reports
- Enterprise adoption stories

**4. Tools & Infrastructure**

- Developer tools and frameworks
- Open-source releases
- MLOps and infrastructure updates
- Data and compute resources

**5. Policy & Ethics**

- Regulation and government action
- Safety and alignment research
- Bias, fairness, and accountability
- Labor and economic impact studies

### Step 4: Summarize Each Item

For each item, write a 3-5 sentence summary covering:

- What happened (the news)
- Why it matters (significance, implications)
- Who is involved (key players)
- Source and date

**Format per item**:

```
### [Title] — [Source] | [Date]

[3-5 sentence summary]

[URL or citation]
```

### Step 5: Identify Top Stories

From all items, identify the **top 3 stories** most worthy of deeper investigation. For each, note:

- Why this is the most important story
- What angle a deeper article could take
- What additional research would be needed

---

## Output Format

```markdown
# Daily AI Briefing — [Date]

> [1-2 sentence overview of today's biggest theme or trend]

---

## Models & Research

### [Title] — [Source] | [Date]

[Summary]
[URL]

[Repeat for each item in category]

---

## Products & Launches

[Same format]

---

## Industry & Business

[Same format]

---

## Tools & Infrastructure

[Same format]

---

## Policy & Ethics

[Same format]

---

## Top 3 Deep Dive Candidates

### 1. [Story Title]

**Why it matters**: [2-3 sentences]
**Potential angle**: [Suggested article hook]
**Next step**: [What to research further]

### 2. [Story Title]

[Same format]

### 3. [Story Title]

[Same format]

---

_Sources: [list all sources checked with dates]_
```

---

## Output Persistence

**MANDATORY**: Save the briefing to file immediately after generation. Do NOT only display in conversation.

**Output path**: `ai-content-output/daily-brief/YYYY-MM-DD-ai-daily-brief.md`

**YAML frontmatter** (prepend to output):

```yaml
---
title: "AI Daily Brief"
date: YYYY-MM-DD
type: daily-brief
language: <user-selected-language>
sources:
  - hacker-news
  - arxiv
  - web-search
  - news-search
---
```

**Steps**:

1. Create directory: `ai-content-output/daily-brief/` (if not exists)
2. Write the complete briefing with frontmatter to the file
3. Confirm save path to user

**Downstream consumers**: `topic-brainstorm` skill reads this file as input context.

---

## Quality Standards

- Minimum 10 items total across all categories
- Each summary must include the "why it matters" — not just "what happened"
- Top 3 picks must be genuinely significant, not just interesting
- All items must have source attribution
- No fabricated news — if something cannot be verified from a source, do not include it
