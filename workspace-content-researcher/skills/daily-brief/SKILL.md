---
name: daily-brief
description: Generate a daily AI news briefing by gathering from Hacker News, arXiv, RSS feeds, and news-search, then filtering, categorizing, summarizing, and identifying top stories for potential deep dives.
user-invocable: true
metadata:
  openclaw:
    emoji: "📋"
    requires: {}
    os: ["darwin", "linux"]
---

# Daily AI Briefing

Generate a concise, high-signal daily briefing covering the most important AI developments across research, products, industry, tools, and policy.

## Overview

The daily brief aggregates AI news from multiple sources, filters for relevance, categorizes by theme, summarizes each item, and surfaces the top stories worth deeper investigation.

**Output**: Markdown briefing document

---

## Path Convention

All `news-search` commands use paths relative to the workspace root. The news-search scripts live at:

```
skills/news-search/scripts/search.ts   ← main search CLI
skills/news-search/scripts/doctor.ts   ← platform availability checker
```

When running from this skill's directory, use: `bun skills/news-search/scripts/search.ts ...`

**⚠️ Do NOT use `{baseDir}/../news-search/` — it resolves incorrectly. Always use `skills/news-search/scripts/` from the workspace root.**

---

## Workflow

### ⛔ NEVER Skip Data Gathering

**ALWAYS execute the full workflow from Step 1, even if an existing briefing file exists in the workspace.** The user is asking for fresh data — never return a cached/stale file. If you find an existing `daily-brief-*.md` file, ignore it and regenerate from scratch.

### Step 1: Gather Sources

Pull from all available sources. **Follow priority order** — higher-priority sources are more reliable and should be fetched first. If a source fails, log the error and continue (never silently skip).

**⚠️ Important: All news-search commands MUST include `--since 24h` for freshness filtering.**

**Run platform check first:**

```
bun skills/news-search/scripts/doctor.ts
```

This tells you which platforms are available. Skip unavailable platforms gracefully.

**Priority 1 — MCP (most reliable, no external deps):**

**Hacker News** (via hacker-news MCP):

- Check HN for AI-tagged stories (top 50)
- Focus on: Show HN posts about AI tools, papers posted to HN, AI company announcements

**arXiv** (via arxiv MCP):

- Pull recent submissions in: cs.AI, cs.LG, cs.CL, cs.CV, cs.RO
- Filter for: high-engagement papers, papers from major labs, papers with unusual titles/claims
- Time window: Last 24-48 hours

**Priority 2 — RSS feeds (reliable if feedparser installed):**

- `bun skills/news-search/scripts/search.ts rss "https://importai.substack.com/feed" 10 --since 24h` — Import AI
- `bun skills/news-search/scripts/search.ts rss "https://deeplearning.ai/the-batch/feed" 10 --since 24h` — The Batch
- `bun skills/news-search/scripts/search.ts rss "https://www.technologyreview.com/feed/" 10 --since 24h` — MIT Tech Review
- `bun skills/news-search/scripts/search.ts rss "https://venturebeat.com/category/ai/feed/" 10 --since 24h` — VentureBeat AI
- `bun skills/news-search/scripts/search.ts rss "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml" 10 --since 24h` — The Verge AI

**Priority 3 — Platform sources (24h freshness enforced):**

- Twitter/X: `bun skills/news-search/scripts/search.ts twitter "AI news" 20 --since 24h`
- Reddit: `bun skills/news-search/scripts/search.ts reddit "artificial intelligence" 10 --since 24h`
- GitHub trending: `bun skills/news-search/scripts/search.ts github "AI" 10 --since 24h`

**Priority 4 — Web search (supplementary, may return lower-quality results):**

- `bun skills/news-search/scripts/search.ts web "AI news today" 10 --since 24h`
- `bun skills/news-search/scripts/search.ts exa "AI model launch" 10 --since 24h`

Web search results often include older content despite freshness filters. **Cross-check dates** and discard any result older than 48h.

**Error handling**: If a source fails, log `[WARN] <platform> failed: <error>` and continue. Include failed sources in the final `_Sources_` footer.

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

## Quality Standards

- Minimum 10 items total across all categories
- Each summary must include the "why it matters" — not just "what happened"
- Top 3 picks must be genuinely significant, not just interesting
- All items must have source attribution
- No fabricated news — if something cannot be verified from a source, do not include it
