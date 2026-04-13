---
name: daily-brief
description: "Generate a daily AI news briefing by gathering from Grok multi-agent deep search, Hacker News, arXiv, RSS feeds, and news-search, then filtering, categorizing, summarizing, and identifying top stories"
allowed-tools:
  - Bash
  - Read
  - Glob
  - AskUserQuestion
---

# Daily AI Briefing

Generate a concise, high-signal daily briefing covering the most important AI developments across research, products, industry, tools, and policy.

## Overview

The daily brief aggregates AI news from multiple sources, filters for relevance, categorizes by theme, summarizes each item, and surfaces the top stories worth deeper investigation.

**Output**: Markdown briefing document

---

## Workflow

### Step 0: Pre-flight — Resolve Paths and Check Environment

**MANDATORY** before any data collection.

1. Locate the news-search scripts directory. It lives at `news-search/scripts/` relative to the skills directory. Resolve the absolute path:

```bash
# Find the absolute path (run once, reuse for all subsequent commands)
NS_SCRIPTS="$(cd "$(dirname "$0")/../topic-research/skills/news-search/scripts" 2>/dev/null && pwd)" \
  || NS_SCRIPTS="$(find . -path '*/news-search/scripts/search.ts' -exec dirname {} \; | head -1)"
```

> If running from the project root, the path is: `topic-research/skills/news-search/scripts/`

2. **Check runtime availability** — detect `bun` or `npx tsx`:

```bash
if command -v bun &>/dev/null; then
  TS_RUNNER="bun"
elif command -v npx &>/dev/null; then
  TS_RUNNER="npx tsx"
else
  echo "ERROR: No TypeScript runtime found."
  echo "Install bun (recommended): curl -fsSL https://bun.sh/install | bash"
  echo "Or install Node.js: https://nodejs.org/"
  exit 1
fi
```

> **Recommended runtime**: [bun](https://bun.sh) — faster startup, native TypeScript support.
> Install: `curl -fsSL https://bun.sh/install | bash`
>
> **Fallback runtime**: `npx tsx` — works if Node.js 18+ is installed.
>
> If neither is available, **STOP and ask the user to install bun** before proceeding. Do NOT skip news-search or silently degrade.

3. Run the environment diagnostic:

```bash
${TS_RUNNER} ${NS_SCRIPTS}/doctor.ts
```

4. Record which platforms are available. Skip unavailable platforms gracefully but **never skip news-search entirely**.

5. **Check Grok research availability**:

```bash
GROK_SCRIPTS="$HOME/.claude/skills/grok-research/scripts"
if [[ -f "${GROK_SCRIPTS}/grok-research.ts" ]] && [[ -n "${OPENAI_API_KEY:-}" ]]; then
  echo "GROK_AVAILABLE=true"
else
  echo "GROK_AVAILABLE=false (grok-research scripts not found or OPENAI_API_KEY not set — Layer 0 will be skipped)"
fi
```

> If Grok is available, it serves as the **primary intelligence sweep** (Layer 0) providing cross-validated, multi-source results from 16 parallel agents. If unavailable, the remaining layers still produce a complete briefing.

### Step 1: Gather Sources

Pull from **all available layers** in parallel. Layers 1 and 2 are MANDATORY — Layer 0 is conditional on Grok availability but strongly recommended for comprehensive coverage.

> **CONSTRAINT**: Do NOT substitute Claude's built-in WebSearch for `news-search` commands. WebSearch may be used as a **supplement** for follow-up queries on specific stories, but the primary data collection MUST go through news-search and/or Grok. news-search provides structured, freshness-controlled, multi-platform results that WebSearch cannot replicate.

#### Layer 0: Grok Deep Search (multi-agent, cross-validated)

**Skip this layer if `GROK_AVAILABLE=false` from Step 0.**

Grok multi-agent research launches **16 parallel agents** that independently search the web and X/Twitter, then a leader agent cross-validates and synthesizes all findings. This produces the highest-quality, most comprehensive single-source intelligence sweep.

**Run this FIRST** — its output provides a baseline that helps evaluate and deduplicate results from subsequent layers.

```bash
GROK_SCRIPTS="$HOME/.claude/skills/grok-research/scripts"
TODAY=$(date +%Y-%m-%d)
YESTERDAY=$(date -v-1d +%Y-%m-%d 2>/dev/null || date -d "yesterday" +%Y-%m-%d)

${TS_RUNNER} ${GROK_SCRIPTS}/grok-research.ts \
  "AI artificial intelligence news breakthroughs and announcements from ${YESTERDAY} to ${TODAY} (last 24 hours). Cover: new model releases, major research papers, product launches, funding rounds, partnerships, acquisitions, policy and regulation updates, open-source releases, and developer tool announcements. Focus on verified facts with sources." \
  --agents 16 --x --json
```

> **What Grok covers that other layers don't**:
> - Real-time X/Twitter signals (trending AI discussions, researcher announcements, company reveals)
> - Cross-validation across 16 independent search agents — reduces hallucination risk
> - Automatic source citation with URLs
>
> **What Grok does NOT replace**:
> - Hacker News community signals and engagement data (Layer 1)
> - arXiv structured paper metadata and abstracts (Layer 1)
> - RSS feeds from curated AI newsletters (Layer 2)
> - Platform-specific freshness-controlled search (Layer 2)

**Processing Grok output**: Parse the JSON output. Extract items from the `output` field. Each item should map to a category in Step 3. Use Grok's source URLs as primary citations. Flag any items that lack source URLs for verification in Layer 3.

#### Layer 1: MCP Tools (structured API data)

**Hacker News** (via hacker-news MCP):

- `getTopStories(50)` — AI-tagged stories
- `getBestStories(30)` — algorithmically ranked
- Focus on: Show HN posts about AI tools, papers posted to HN, AI company announcements

**arXiv** (via arxiv MCP):

- `search_papers()` in categories: cs.AI, cs.LG, cs.CL, cs.CV, cs.RO
- Time window: last 24-48 hours
- Filter for: high-engagement papers, papers from major labs, papers with unusual titles/claims

#### Layer 2: news-search (multi-platform, freshness-controlled)

**All commands below use Bash tool.** Run in parallel where possible.

**RSS feeds** (5 sources):

```bash
${TS_RUNNER} ${NS_SCRIPTS}/search.ts rss "https://importai.substack.com/feed" 10
${TS_RUNNER} ${NS_SCRIPTS}/search.ts rss "https://deeplearning.ai/the-batch/feed" 10
${TS_RUNNER} ${NS_SCRIPTS}/search.ts rss "https://www.technologyreview.com/feed/" 10
${TS_RUNNER} ${NS_SCRIPTS}/search.ts rss "https://venturebeat.com/category/ai/feed/" 10
${TS_RUNNER} ${NS_SCRIPTS}/search.ts rss "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml" 10
```

**Web + Exa search** (4 queries):

```bash
${TS_RUNNER} ${NS_SCRIPTS}/search.ts web "AI news today" 10
${TS_RUNNER} ${NS_SCRIPTS}/search.ts exa "AI model launch" 10
${TS_RUNNER} ${NS_SCRIPTS}/search.ts web "AI research paper" 10
${TS_RUNNER} ${NS_SCRIPTS}/search.ts web "AI company announcement" 10
```

**Platform sources** (24h freshness auto-enforced):

```bash
${TS_RUNNER} ${NS_SCRIPTS}/search.ts twitter "AI news" 20
${TS_RUNNER} ${NS_SCRIPTS}/search.ts reddit "artificial intelligence" 10
${TS_RUNNER} ${NS_SCRIPTS}/search.ts github "AI" 10
```

> See `news-search` skill for full platform reference and additional platforms (YouTube, XiaoHongShu, etc.)

#### Layer 3: WebSearch (supplementary only)

Use Claude's built-in WebSearch **only** for:

- Following up on specific stories discovered in Layers 0, 1, or 2
- Filling gaps if a specific topic is underrepresented across all other layers
- Verifying claims or finding additional context for top stories
- Cross-checking Grok items that lack source URLs (if Layer 0 was used)

Do NOT use WebSearch as a primary data source.

### Step 2: Filter and Deduplicate

From all gathered items (across all layers), keep only items that:

- Directly involve AI, ML, or related technology (NLP, CV, RL, robotics, agents)
- Come from credible sources (avoid pure opinion/speculation without facts)
- Represent new information (not re-hashing old news)
- Have clear significance (not trivial product updates)

Remove:

- **Cross-layer duplicates** — the same story will often appear in Grok output AND news-search/MCP results. When deduplicating, prefer the version with the best source URL and most detail. If Grok provided a richer summary but news-search has a more authoritative source link, merge them.
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

**Output path**: `openspec/runtime/daily-brief/YYYY-MM-DD-ai-daily-brief.md`

**YAML frontmatter** (prepend to output):

```yaml
---
title: "AI Daily Brief"
date: YYYY-MM-DD
type: daily-brief
language: <user-selected-language>
sources:
  - grok-deep-search
  - hacker-news
  - arxiv
  - web-search
  - news-search
---
```

**Steps**:

1. Create directory: `openspec/runtime/daily-brief/` (if not exists)
2. Write the complete briefing with frontmatter to the file
3. Confirm save path to user

**Downstream consumers**: `topic-brainstorm` skill reads this file as input context.

---

## Quality Standards

- **Anti-AI writing rules** — load `content-utilities/skills/humanizer/references/writing-rules.md` during writing. Avoid AI vocabulary, significance inflation, filler phrases, generic conclusions. Write like a person.
- Minimum 10 items total across all categories
- Each summary must include the "why it matters" — not just "what happened"
- Top 3 picks must be genuinely significant, not just interesting
- All items must have source attribution
- No fabricated news — if something cannot be verified from a source, do not include it
