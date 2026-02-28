---
name: source-discovery
description: Content source discovery workflow — find relevant blogs, newsletters, research papers, experts, and communities for a topic, check for prior usage, and organize into a curated source list. Use when researching a new topic, building a reference library, or expanding content inputs. Triggers on "find sources", "discover sources", "research references", "find experts on", "where to get info about", or "source discovery".
---

# Source Discovery

## Workflow

This skill follows a 3-step sourcing pipeline:

### Step 1: Discover Sources

Research and identify potential sources based on the user's topic or niche:

- **Topic focus**: Ask the user what topic or niche they're researching (e.g., "AI productivity tools", "personal finance for freelancers", "climate tech startups")
- **Content goal**: What will these sources be used for? (background research, expert quotes, data, inspiration)
- **Source types needed**: Primary research, expert opinion, data/statistics, community discussion, news
- **Sources to search**: Use web search to find blogs, newsletters, Substack writers, LinkedIn voices, subreddits, YouTube channels, podcasts, academic papers, and industry reports matching the topic
  - **Platform sources** (via news-search CLI, 24h freshness enforced):

    > **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

    - Twitter/X: `bun news-search/scripts/search.ts twitter "[topic] expert" 20` — find thought leaders
    - Reddit: `bun news-search/scripts/search.ts reddit "[topic]" 10` — discover active subreddits and communities
    - YouTube: `bun news-search/scripts/search.ts youtube "[topic]" 10` — find content creators and channels
    - GitHub: `bun news-search/scripts/search.ts github "[topic]" 10` — find open-source projects and contributors
    - LinkedIn: `bun news-search/scripts/search.ts linkedin "[topic] expert" 10` — professional voices
    - Web/Exa: `bun news-search/scripts/search.ts web "[topic] newsletter blog" 10` — discover publications
    - Read any source: `bun news-search/scripts/read.ts <url>` — extract content from discovered URLs
    - See `news-search` skill for full platform reference.
- **Output**: A shortlist of sources with: name, type, URL, brief description, and why it's relevant

### Step 2: Quality Check

Before adding to the source library, verify each source:

- **Credibility**: Is the author/publisher credible? What are their credentials or track record?
- **Recency**: Is the content up-to-date? When was it last active?
- **Prior usage**: Has this source been cited or used before? Check conversation history or notes
- **Audience fit**: Does the source's tone and depth match your content's audience?
- **Bias check**: Is there a known ideological or commercial bias to be aware of?
- **Output**: For each source, note: "New" (not used before), "Familiar" (previously referenced — summarize what's been used), or "Caution" (bias or quality concerns noted)

### Step 3: Organize & Bookmark

Categorize sources by type for easy retrieval:

| Source | Type | URL | Credibility | Notes |
|--------|------|-----|-------------|-------|
| | Primary Research | | | |
| | Expert Opinion | | | |
| | Data Source | | | |
| | Community Discussion | | | |
| | News/Current Events | | | |

**Credibility rating**: High / Medium / Low with brief rationale

**Output**: Curated source list with credibility ratings, ready to reference in content creation

## Example Interaction

**User**: "Find me sources on AI productivity tools for knowledge workers"

**Assistant**:
1. Searches for newsletters, blogs, researchers, and communities covering AI productivity
2. Presents a shortlist of 8-12 sources with types and descriptions
3. Notes which are new vs. previously used
4. Organizes into a categorized source list with credibility notes
5. Highlights the top 3 most authoritative sources to prioritize

## Important Notes

- Quality over quantity — 8 well-vetted sources beat 30 random ones
- Always note the date of last activity for each source
- Primary research and data sources carry more weight than opinion pieces
- Flag sources that are frequently cited by others — they're often the most authoritative
- Ask the user if they have any preferred sources to include or exclude
