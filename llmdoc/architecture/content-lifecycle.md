# Content Lifecycle Architecture

The content lifecycle is the end-to-end workflow chain across eight plugins. The core production path flows through research, production, utilities, and publishing; handoffs now use a mixed model: OpenSpec contract handoff for the P0 chain plus implicit/manual handoff for other chains.

## Pipeline Overview

```
topic-research          content-analysis        content-production      growth-ops              audience-management
(discover & research)   (analyze & benchmark)   (create & produce)      (review & publish gate)  (track & rebalance)
       |                       |                       |                       |                       |
  trend-preview ──────> trend-analysis           article-builder <──── source-discovery        audience-review
  deep-research ──────> benchmark / check-quality long-article           screen-topic            content-plan
  topic-brainstorm ───> competitor               short-post              review-checklist         content-rebalance
  release-analysis ───> check-quality            content-tracker ──────> performance-analysis    biz-proposal
  daily-brief           template-creator ──────> article structure       content-roi              ops-report
                                                 collab-letter ────────> collab-prep ───────────> biz-proposal
                                                 content-experiment ───> content-roi              content-rebalance
                                                 audience-targeting                               audience-review
```

## OpenSpec Contract Handoff (P0)

P0 chain commands use `pipeline.openspec.json` as the canonical runtime handoff contract:

```text
topic-research -> content-production -> content-utilities -> publishing
```

Contract path pattern:

```text
ai-content-output/deep-research/<slug>/pipeline.openspec.json
```

Minimum handoff fields:

- `pipeline`: fixed chain id
- `stage`: current stage (`topic-research`, `content-production`, `content-utilities`, `content-analysis`, `publishing`)
- `outputs.*`: canonical artifact paths (`research_md`, `analysis_md`, `article_md`, `article_html`, `quality_report_md`, `wechat_media_id`)
- `next.command` + `next.input`: downstream routing

This contract layer is additive: legacy file names and directories remain unchanged for backward compatibility.

## Cross-Plugin Data Flows

### 1. topic-research --> content-analysis

Research outputs feed directly into analysis skills as input material.

| Source (topic-research) | Target (content-analysis) | Relationship |
|---|---|---|
| `trend-preview` | `trend-analysis` | Complementary: trend-preview scans for emerging signals; trend-analysis performs historical pattern analysis on the same topic. The preview's momentum scores and signal sources serve as starting data for the deeper timeline and pattern work in trend-analysis. |
| `deep-research` Task 1 output | `benchmark` / `check-quality` | The 6-8K word research document provides the factual claims and technical content that benchmark evaluates against niche top performers, and that check-quality audits for accuracy. |
| `topic-brainstorm` top-3 briefs | `competitor` | The top-3 topic briefs identify specific angles and comparable content. The competitor analysis skill takes those angles and maps the competitive landscape -- who covers this topic, how, and where gaps exist. |
| `release-analysis` | `check-quality` | Before publishing release-analysis content, the quality check validates factual accuracy of claims, benchmark citations, and significance ratings. |

### 2. content-analysis --> content-production

Analysis results shape what gets produced and how it is structured.

| Source (content-analysis) | Target (content-production) | Relationship |
|---|---|---|
| `benchmark` results | `article-builder` topic selection | Benchmark gap analysis reveals which topics have the highest upside. The benchmark summary table (top performer avg vs. your content) directly informs which topics the article-builder should prioritize. |
| `template-creator` output | Article structure in `article-builder` / `long-article` | Templates created from analyzing top-performing content become reusable scaffolding for the article-builder. The section structure, hook patterns, and length targets carry forward. |

### 3. growth-ops --> content-production

Growth operations provide gatekeeping and sourcing inputs to the production pipeline.

| Source (growth-ops) | Target (content-production) | Relationship |
|---|---|---|
| `source-discovery` (HN + RSS via MCP) | `article-builder` research input | Curated, credibility-rated source lists feed directly into article-builder Step 1 (Gather Source Materials). High-credibility primary sources and expert opinions become the research foundation. |
| `screen-topic` verdict (HIGH/MEDIUM/LOW) | Pipeline entry gate | The screening verdict determines whether a topic enters the production pipeline at all. HIGH = proceed to article-builder. MEDIUM = monitor, defer production. LOW = skip. |
| `collab-prep` brief | `collab-letter` outreach draft | The collaboration preparation brief (collaborator profile, mutual benefit map, talking points) provides the context that collab-letter uses to draft specific, personalized outreach messages. |
| `review-checklist` | Pre-publish gate for all content | Every content piece passes through the review-checklist before publication. The checklist covers accuracy, readability, SEO, formatting, legal, and platform compliance. This is the final quality gate. |

### 4. content-production --> growth-ops

Production outputs flow back to growth operations for performance tracking and ROI analysis.

| Source (content-production) | Target (growth-ops) | Relationship |
|---|---|---|
| `content-tracker` performance data | `performance-analysis` + `account-monitor` | The content-tracker captures per-piece metrics (views, engagement, follower attribution) at 7-day and 30-day marks. Performance-analysis aggregates this into period-over-period reports. Account-monitor uses it for cross-platform health dashboards. |
| `content-experiment` results | `content-roi` | A/B test results (primary metric lift, engagement efficiency scores) feed into the content-roi calculation. The experiment's hours-invested and results-achieved data enables the views/hour and engagement/hour ROI ratios. |

### 5. content-production --> audience-management

Production data informs strategic audience planning and content mix decisions.

| Source (content-production) | Target (audience-management) | Relationship |
|---|---|---|
| `content-tracker` schedule | `content-plan` editorial calendar | Both maintain scheduling views. Content-tracker manages operational status (Idea > Research > Draft > Review > Scheduled > Published). Content-plan sets the strategic calendar (monthly themes, content pillars, resource allocation). They run in parallel -- the tracker reflects what is happening; the plan defines what should happen. |
| `content-experiment` results | `content-rebalance` | Experiment outcomes reveal which formats and topics perform best. Content-rebalance uses this data to calculate current vs. target allocation drift and recommend adjustments to the content mix. |

### 6. Collaboration Pipeline (3-Stage)

A dedicated cross-plugin chain handles creator and brand collaboration from outreach to formal proposal.

```
content-production          growth-ops              audience-management
collab-letter        --->   collab-prep      --->   biz-proposal
(outreach draft)            (meeting brief)         (formal proposal)
```

**Stage 1 -- collab-letter** (content-production): Drafts personalized outreach messages. Requires target identification, content research, and a specific collaboration pitch. Output is a ready-to-send message under 150 words.

**Stage 2 -- collab-prep** (growth-ops): Prepares for the collaboration meeting. Researches the collaborator's content, audience, and reputation. Maps mutual benefits and drafts talking points and a proposal outline. Output is a preparation brief.

**Stage 3 -- biz-proposal** (audience-management): Creates the formal business proposal with audience metrics, value proposition, pricing tiers, deliverables, timeline, and legal terms. Output is a professional proposal document.

### 7. Audience Analysis Overlap

Two skills analyze audiences at different levels of abstraction.

| Skill | Plugin | Scope | Segments |
|---|---|---|---|
| `audience-targeting` | content-production | Tactical, per-content | 4 segments: Practitioners, Decision Makers, Enthusiasts, Students |
| `audience-review` | audience-management | Strategic, account-level | 4 engagement tiers: Core fans, Engaged followers, Passive followers, Dormant |

**audience-targeting** answers: "Who should this specific piece of content be written for?" It maps content types to audience segments (tutorials for Practitioners, trend overviews for Enthusiasts).

**audience-review** answers: "Who is my audience overall, and how healthy is the engagement distribution?" It segments by behavior (engagement frequency) rather than by role, and produces persona cards for strategic planning.

These are complementary views. Tactical targeting decisions draw on strategic audience data, and strategic reviews incorporate per-content engagement signals.

### 8. Editorial Calendar Trigger Ambiguity

The phrase "editorial calendar" maps to two different skills depending on context:

| Trigger Context | Resolves To | Plugin |
|---|---|---|
| Operational: "What's the status of my content pipeline?" | `content-tracker` | content-production |
| Strategic: "Plan my content for next quarter" | `content-plan` | audience-management |

When the active plugin context is content-production, "editorial calendar" fires content-tracker (pipeline management). When the context is audience-management, it fires content-plan (strategic planning). If both plugins are active, the trigger is ambiguous and depends on conversational context.

## Design Characteristics

### Implicit + Contracted Handoffs

Cross-plugin data flows currently use two patterns:

1. **Contracted handoff (P0):** commands read/write `pipeline.openspec.json`.
2. **Implicit handoff (non-P0):** user/session passes files manually.

For implicit paths, each handoff requires the user (or Claude session) to:

1. Complete the upstream skill and capture its output
2. Invoke the downstream skill with the upstream output as input
3. Maintain data continuity across the handoff

This mixed model preserves plugin independence (any plugin can be used standalone), enables flexible workflow composition (skip steps, reorder, branch), and allows incremental migration without breaking existing file-based workflows.

### Data Continuity

Within a single Claude session, outputs from one skill are available as conversation context for the next. Across sessions, users must explicitly reference prior outputs by file path or content.

### Plugin Independence

Each plugin operates as a standalone unit. The cross-plugin flows documented here represent recommended usage patterns, not required sequences. A user can run `check-quality` without first running `deep-research`, or use `content-plan` without `content-tracker`.

### Feedback Loops

The lifecycle is not strictly linear. Two feedback loops create cycles:

**Content optimization loop**: `content-tracker` --> `performance-analysis` --> `content-roi` --> `content-rebalance` --> `content-plan` --> back to production. Performance data drives ROI analysis, which drives content mix rebalancing, which updates the editorial plan, which shapes what gets produced next.

**Quality feedback loop**: `check-quality` / `review-checklist` findings feed back into the current content piece for revision before it proceeds to publication. A failing quality check blocks the publish gate.
