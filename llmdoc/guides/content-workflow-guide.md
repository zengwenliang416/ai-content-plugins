# Content Workflow Guide

Practical workflows combining skills across three agents (Researcher, Writer, Operator). Each workflow lists skills in execution order with data flow between them.

## Daily Workflow

Full cycle from news scanning to publication. Typical time: 3-5 hours.

```
daily-brief → topic-screening → article-builder → review-checklist → wechat-publisher/x-publisher
```

1. **Researcher: `daily-brief`** — Aggregates HN, arXiv, RSS, news-search into 5-category AI briefing. Outputs top-3 deep dive candidates.
2. **Operator: `topic-screening`** — Scores candidates against 5 criteria (search volume, competition, audience interest, expertise fit, timeliness). Only HIGH (>= 20, no criterion below 3) proceeds.
3. **Writer: `article-builder`** — Produces 2,000-5,000 word article from research. Structure: hook → context → body → conclusion → CTA. Integrates news-search for fresh data.
4. **Operator: `review-checklist`** — Pre-publish gate checking accuracy, SEO, legal, platform compliance. All items must pass before publication.
5. **Operator: `wechat-publisher` or `x-publisher`** — Publishes to target platform. Both require explicit user confirmation before posting.

**Tip**: Run daily-brief in the morning to catch overnight developments. If screening returns MEDIUM, defer to `trend-preview` for a second opinion.

## Research Workflow

Deep investigation for high-value content. Typical time: 2-4 hours.

```
topic-brainstorm → deep-research → field-overview
```

1. **Researcher: `topic-brainstorm`** — Generates 20+ topic ideas, scores on 4 dimensions (Audience, Uniqueness, Feasibility, Timeliness), produces top-3 briefs with core angles.
2. **Researcher: `deep-research`** — 5-task pipeline (research → data → analysis → visuals → assembly) producing a 6-8K word publication-ready document. Each task runs separately.
3. **Researcher: `field-overview`** — 3,000-5,000 word comprehensive overview of an AI sub-field covering history, current state, key players, open problems, future directions.

**Variant**: For competitive topics, insert `competitor-analysis` between brainstorm and deep-research to map the landscape before committing production time.

## Visual Content Workflow

Image and visual asset creation. Skills can be used standalone or chained.

```
article-illustrator ─┐
cover-generator     ─┤→ article-builder output
xhs-card            ─┘
```

- **Writer: `article-illustrator`** — Analyzes articles to identify illustration positions, generates images with type × style approach (6 types, 6+ styles)
- **Writer: `cover-generator`** — Article cover images using 5-dimension system (type × palette × rendering × text × mood). Supports `--quick` mode.
- **Writer: `xhs-card`** — XiaoHongShu image series (1-10 images, 10 styles × 8 layouts). Uses reference image chain for visual consistency across cards.
- **Writer: `infographic-gen`** — Professional infographics (21 layouts × 20 styles = 420 combinations)
- **Writer: `slide-generator`** — Slide deck images (16 presets × 4 dimensions). Merges to PPTX/PDF via bun scripts.
- **Writer: `knowledge-comic`** — Educational comics (5 art × 7 tone × 6 layout). Full pipeline: storyboard → character sheet → pages → PDF.

**Tip**: All image skills support EXTEND.md for persistent defaults (provider, quality, style). Skills with `--ref` flag (xhs-card, knowledge-comic) use reference image chains to maintain visual consistency.

## Analytics Workflow

Performance review and strategy optimization. Typical time: 2-3 hours per review cycle.

```
performance-analysis → content-roi → ops-report → content-rebalance
```

1. **Operator: `performance-analysis`** — Analyzes content over a period. Identifies top/bottom 5 performers, extracts patterns by topic, format, timing, length.
2. **Operator: `content-roi`** — Calculates ROI across content types (views/hour, engagement/hour, followers/hour). Ranks formats and identifies double-down vs. reduce candidates.
3. **Operator: `ops-report`** — Generates monthly/quarterly operations report consolidating performance, growth, and audience data.
4. **Operator: `content-rebalance`** — Compares current content mix against targets, flags categories with >10% drift, recommends 4-8 week phased transition plan.

**Feeding back**: Rebalancing output feeds into `content-plan` to update the editorial calendar. This closes the optimization loop.

## Workflow Selection

| Situation                           | Workflow                | Time                |
| ----------------------------------- | ----------------------- | ------------------- |
| Daily publishing with quality gates | Daily Workflow          | 3-5 hours           |
| Investigating a new topic area      | Research Workflow       | 2-4 hours           |
| Adding visuals to existing content  | Visual Content Workflow | 30-90 min per asset |
| Monthly/quarterly strategy review   | Analytics Workflow      | 2-3 hours           |

## Cross-Workflow Integration

- **Daily feeds Analytics**: content published through the daily workflow accumulates performance data for the analytics cycle
- **Research feeds Daily**: topics passing research evaluation enter the daily pipeline at the article-builder step
- **Analytics feeds Research**: ROI analysis revealing underperforming areas triggers new topic-brainstorm to find replacements
- **Visual enhances all**: cover-generator and article-illustrator apply to any content produced by daily or research workflows
