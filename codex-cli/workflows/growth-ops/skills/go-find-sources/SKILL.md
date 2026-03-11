---
name: go-find-sources
description: "Discover content sources and references for a topic — blogs, newsletters, research papers, experts, and communities"
arguments:
  - name: input
    description: "Topic/niche, source list path, or pipeline.openspec.json"
---

# Source Discovery

## Step 1: Upstream Artifact Detection

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `inputs.topic`, then `outputs.brainstorm_md`, then `outputs.daily_brief_md`.
   - If `$ARGUMENTS` is a topic/niche or source file path, use it directly.
   - Then skip to Step 3.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `inputs.topic`, `outputs.brainstorm_md`, and `outputs.daily_brief_md`.

3. **Auto-scan legacy source assets**:

```bash
ls -t openspec/runtime/brainstorm/*.md 2>/dev/null | head -3
ls -t openspec/runtime/daily-brief/*.md 2>/dev/null | head -3
ls -t openspec/runtime/source-discovery/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下选题与信源素材，请选择要用于信源发现的输入："

4. **No upstream found**: Only in this case, ask for topic, content goal, and preferred source types.

## Step 2: Language Selection

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 3: Discover Sources

Research and identify potential sources based on the user's topic or niche:

- **Topic focus**: Ask the user what topic or niche they're researching
- **Content goal**: What will these sources be used for? (background research, expert quotes, data, inspiration)
- **Source types needed**: Primary research, expert opinion, data/statistics, community discussion, news
- **Sources to search**: Use web search to find blogs, newsletters, Substack writers, LinkedIn voices, subreddits, YouTube channels, podcasts, academic papers, and industry reports matching the topic
  - **Platform sources** (via news-search CLI, 24h freshness enforced):

    > **CONSTRAINT**: Execute all `news-search` commands via Bash. Do NOT substitute with WebSearch. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

    - Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "[topic] expert" 20`
    - Reddit: `${TS_RUNNER} news-search/scripts/search.ts reddit "[topic]" 10`
    - YouTube: `${TS_RUNNER} news-search/scripts/search.ts youtube "[topic]" 10`
    - GitHub: `${TS_RUNNER} news-search/scripts/search.ts github "[topic]" 10`
    - LinkedIn: `${TS_RUNNER} news-search/scripts/search.ts linkedin "[topic] expert" 10`
    - Web/Exa: `${TS_RUNNER} news-search/scripts/search.ts web "[topic] newsletter blog" 10`
    - Read any source: `${TS_RUNNER} news-search/scripts/read.ts <url>`
- **Output**: A shortlist of sources with: name, type, URL, brief description, and why it's relevant

## Step 4: Quality Check

Before adding to the source library, verify each source:

- **Credibility**: Is the author/publisher credible? What are their credentials or track record?
- **Recency**: Is the content up-to-date? When was it last active?
- **Prior usage**: Has this source been cited or used before? Check conversation history or notes
- **Audience fit**: Does the source's tone and depth match your content's audience?
- **Bias check**: Is there a known ideological or commercial bias to be aware of?
- **Output**: For each source, note: "New" (not used before), "Familiar" (previously referenced), or "Caution" (bias or quality concerns noted)

## Step 5: Organize & Bookmark

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

## Artifact Handoff

**Output**: Source discovery result saved to:
- `openspec/runtime/source-discovery/YYYY-MM-DD-<topic>-sources.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/sources.md` (if contract/deep-research mode)

## Important Notes

- Quality over quantity — 8 well-vetted sources beat 30 random ones
- Always note the date of last activity for each source
- Primary research and data sources carry more weight than opinion pieces
- Flag sources that are frequently cited by others — they're often the most authoritative
- Ask the user if they have any preferred sources to include or exclude
