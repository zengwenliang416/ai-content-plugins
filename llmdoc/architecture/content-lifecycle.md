# Content Lifecycle Architecture

Three OpenClaw agents form a pipeline: Researcher discovers and validates topics, Writer produces content, Operator publishes and analyzes performance. Content flows through implicit handoffs — no orchestration layer exists.

## Pipeline: Research → Write → Publish

```
Researcher (18 skills)          Writer (16 skills)           Operator (22 skills)
───────────────────────         ──────────────────           ──────────────────────
daily-brief                     article-builder              review-checklist
deep-research          ──→      short-post                   wechat-publisher
topic-brainstorm       ──→      knowledge-comic              x-publisher
trend-preview                   slide-generator              performance-analysis
competitor-analysis             infographic-gen              content-rebalance
release-analysis                cover-generator              ops-report
```

**Researcher** — Owns discovery and validation. `daily-brief` aggregates HN/arXiv/RSS/news-search into 5-category briefings. `deep-research` runs a 5-task pipeline producing 6-8K word documents. `topic-brainstorm` scores 20+ ideas on 4 dimensions. `trend-preview` produces Act Now/Monitor/Watch List forecasts. `competitor-analysis` maps content landscapes; `release-analysis` rates launches.

**Writer** — Transforms research into publishable formats. `article-builder` (2K-5K word articles), `short-post` (platform-specific social), `knowledge-comic` (5 art × 7 tone × 6 layout), `slide-generator` (16 presets), `infographic-gen` (21 layouts × 20 styles). `ai-image-gen` provides the shared generation backend (4 providers: Google, OpenAI, DashScope, Replicate).

**Operator** — Quality gates, publishing, and analytics. `review-checklist` blocks publication on failure (accuracy, SEO, legal, compliance). `wechat-publisher` and `x-publisher` require explicit user confirmation. `performance-analysis` → `content-roi` → `ops-report` chain handles analytics. `topic-screening` applies 5-criteria scoring; `content-rebalance` adjusts content mix.

## Cross-Agent Data Flows

### news-search: Shared Infrastructure

`news-search` lives in the researcher workspace and is symlinked to writer and operator. Supports 12+ platforms. All agents invoke it identically:

```bash
bun skills/news-search/scripts/search.ts <platform> "<query>" <count> --since 24h
```

### Implicit Handoffs

No runtime messaging protocol connects agents. Data flows via:

1. **File-based**: upstream skill writes Markdown output; downstream skill reads it as input
2. **Session context**: within a Claude session, prior outputs remain in conversation context
3. **User-mediated**: across sessions, users reference outputs by file path

### Key Cross-Agent Chains

| Chain              | Flow                                                                                                                                                                       | Purpose              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Daily pipeline     | Researcher `daily-brief` → `topic-brainstorm` → Operator `topic-screening` → Researcher `deep-research` → Writer `article-builder` → Operator `review-checklist` → publish | Full daily cycle     |
| Analytics feedback | Operator `performance-analysis` → `content-roi` → `content-rebalance` → `content-plan` → back to production                                                                | Optimization loop    |
| Quality gate       | Writer output → Operator `review-checklist` → pass/fail → publish or revise                                                                                                | Pre-publish QC       |
| Collaboration      | Writer `collab-letter` → Operator `collab-prep` → `biz-proposal`                                                                                                           | Partnership pipeline |

## Content Lifecycle Stages

Seven stages across all three agents:

```
Plan → Screen → Create → Publish → Analyze → Cleanup → Rebalance
 │        │        │         │          │         │          │
 │        │        │         │          │         │          └─ content-rebalance (Operator)
 │        │        │         │          │         └─ content-cleanup (Operator)
 │        │        │         │          └─ performance-analysis, content-roi (Operator)
 │        │        │         └─ review-checklist, wechat/x-publisher (Operator)
 │        │        └─ article-builder, short-post, knowledge-comic (Writer)
 │        └─ topic-screening (Operator)
 └─ content-plan, topic-brainstorm (Operator, Researcher)
```

## WRITE/MONITOR/SKIP Decision Framework

The researcher's `trend-preview` and operator's `topic-screening` together implement a three-tier decision:

| Decision    | Criteria                                                | Action                                             |
| ----------- | ------------------------------------------------------- | -------------------------------------------------- |
| **WRITE**   | trend-preview Tier 1 (Act Now) + screening HIGH (>= 20) | Proceed to deep-research and production            |
| **MONITOR** | trend-preview Tier 2 or screening MEDIUM                | Track with `narrative-tracker`; revisit next cycle |
| **SKIP**    | trend-preview Tier 3 or screening LOW                   | No production investment                           |

## Feedback Loops

- **Optimization loop**: performance data → ROI analysis → content mix rebalancing → updated editorial plan → shapes next production cycle
- **Quality loop**: review-checklist failure → content returns to writer for revision before re-entering the publish gate
