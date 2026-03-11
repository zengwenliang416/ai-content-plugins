---
name: ca-competitor
description: "Analyze a competitor's content account and strategy"
arguments:
  - name: input
    description: "Account/URL, analysis input path, or pipeline.openspec.json"
---

# Competitor Content Account Analysis

## Step 1: Upstream Artifact Detection (MANDATORY)

Complete this step BEFORE any other interaction.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `pipeline.openspec.json`, read it first and prioritize `inputs.competitor`, then `outputs.audience_review_md`, then `outputs.ops_report_md`.
   - If `$ARGUMENTS` is an account/URL or input path, use it directly.
   - Then skip to Step 3.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `inputs.competitor`, `outputs.audience_review_md`, and `outputs.ops_report_md`.

3. **Auto-scan legacy competitor assets**:

```bash
ls -t openspec/runtime/audience-review/*.md 2>/dev/null | head -3
ls -t openspec/runtime/ops-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/competitor/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下竞品分析素材，请选择要用于竞品复盘的输入：" with files as options.

4. **No upstream found**: Only in this case, ask which account to analyze.

## Step 2: Language Selection (MANDATORY)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## CRITICAL STANDARDS

### Source Data Primacy

When platform analytics or exported data files are provided:
* **Extract values DIRECTLY** — Do not recalculate; use numbers as they appear
* **Maintain consistency** — Same metric must show identical value throughout
* **Round only as shown** — Match decimal precision of source data
* **Flag gaps** — Use "-" for missing data; "N/A" for unavailable metrics; "[E]" for estimates

### Prompt Fidelity

When the prompt specifies exact requirements, follow them verbatim:

**Section names:** Use exactly what's specified, not paraphrases
**Tables vs narrative:** Use exactly what's requested; they are not interchangeable
**Complete data:** If prompt lists 6 accounts, include all 6 — not 4 or 5
**Exact values:** If prompt says "2.3M followers (+15% MoM)" — use that exact format

### Reference Files

This skill includes reference files in `references/`:
* **`references/frameworks.md`** — 2x2 matrix axis pairs for content account positioning. Reference when choosing visualization dimensions.
* **`references/schemas.md`** — Table templates for content metrics, platform comparisons, and audience overlap. Reference when building analysis tables.

### Source Quality Hierarchy

When sources conflict, prioritize:
1. **Platform analytics (first-party)** — Native data from YouTube Studio, TikTok Analytics, Instagram Insights
2. **Account public stats** — Publicly visible follower counts, view counts, engagement
3. **Third-party analytics tools** — Social Blade, HypeAuditor, Similarweb, Sprout Social
4. **Industry reports** — Influencer Marketing Hub, Reuters Institute, industry benchmarks
5. **News articles** — Use only for recent developments; verify against primary sources

### Data Comparability
* **Time periods must match** — All account metrics from same period (e.g., "last 30 days"). Flag exceptions
* **Platform normalization** — Compare within-platform where possible; flag cross-platform comparisons
* **Metric definitions must match** — "Engagement rate" definition varies; specify methodology
* **Use "-" for missing data** — Never leave cells blank
* **Cite every number** — Format: "[Account] [Platform] Analytics ([Date])"

### Design & Formatting
* **Section headers = insights** — "Short-form video drives 3x engagement vs long-form" not "Video Analysis"
* **Signposts = quantified** — "engagement rate below 2%" not "low engagement"
* **Ratings include actuals** — "### 4.2M followers" not just "###"

### What's STRICT vs FLEXIBLE

| STRICT (Every Time) | FLEXIBLE (Case-by-Case) |
|---------------------|------------------------|
| Exact section names when prompt specifies | Creative headers when prompt doesn't specify |
| All accounts listed in prompt | Number of accounts when not specified |
| Exact metric values when prompt specifies | Rounding when precision not specified |
| Same metric across all accounts | Which dimensions to compare |

## Step 3: Clarify Requirements

Before starting, confirm:
* **Scope**: Single account deep-dive or multi-account landscape?
* **Output**: Report, slide deck, or memo?
* **Focus areas**: Specific competitors, platforms, content types, or strategic questions?
* **Your account**: Are you comparing against a specific account you operate?
* **Source data**: What analytics exports or platform data are available?

## Step 4: Content Landscape Context

**Platform research** (via news-search CLI, 24h freshness enforced):

> **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "[competitor] OR [niche]" 20` — track competitor activity
- YouTube: `${TS_RUNNER} news-search/scripts/search.ts youtube "[competitor name]" 10` — content and engagement data
- Reddit: `${TS_RUNNER} news-search/scripts/search.ts reddit "[niche]" 10` — community sentiment on competitors
- Web: `${TS_RUNNER} news-search/scripts/search.ts web "[competitor] content strategy" 10` — coverage and analysis
- Read competitor pages: `${TS_RUNNER} news-search/scripts/read.ts <competitor-url>` — extract content details

Collect:
- Niche size and estimated audience (total addressable viewers/readers)
- Platform growth trends for this content category
- Key trends reshaping how content is consumed in this niche
- Monetization dynamics (ad revenue rates, sponsorship rates, course/product potential)

## Step 5: Content Economics

Map how value flows in this content category:
* **Creator-to-audience** — What drives loyalty: education, entertainment, community, exclusivity
* **Monetization models** — AdSense CPM ranges, sponsorship rates by niche, paid community pricing, merchandise
* **Platform algorithm dynamics** — How the platform distributes content; what behaviors it rewards
* **Content production economics** — Estimated production cost per video/post; cost efficiency of top accounts

## Step 6: Target Account Profile

```
| Metric | Value |
|--------|-------|
| Followers/Subscribers | X.XM |
| Avg Views per Post | XXK |
| Posting Frequency | X/week |
| Engagement Rate | X.X% |
| Follower Growth (MoM) | +X.X% |
| Primary Content Format | Long-form / Short-form / Newsletter |
| Estimated Monthly Reach | X.XM |
| Top Content Topics | Topic A, Topic B, Topic C |
```

**For multi-platform accounts, add platform breakdown:**
```
| Platform | Followers | Avg Views | Engagement | Primary Format |
|----------|-----------|-----------|------------|----------------|
| YouTube  | X.XM      | XXK       | X.X%       | Long-form      |
| TikTok   | X.XM      | X.XM      | X.X%       | Short-form     |
| Newsletter | XXK subs | XX% open  | X.X% click | Written        |
```

## Step 7: Competitor Account Mapping

Group competitors using the framework that fits:
* **By content style** — Educational vs. entertainment vs. opinion vs. news
* **By audience size** — Mega (1M+) vs. macro (100K-1M) vs. mid-tier (10K-100K)
* **By platform focus** — YouTube-first vs. TikTok-first vs. multi-platform
* **By topic depth** — Deep technical vs. accessible overview vs. pop-science
* **By origin/background** — Researcher/academic vs. practitioner vs. journalist vs. enthusiast

## Step 8: Positioning Visualization

| Visualization | Best For |
|--------------|----------|
| 2x2 Matrix | Two dominant positioning factors (e.g., Depth vs. Reach) |
| Tier Diagram | Natural clustering by audience size or influence level |
| Radar/Spider | Multi-factor comparison across 5-6 dimensions |
| Platform Map | Multi-platform presence comparison |
| Content Mix Chart | Format distribution (short vs. long, video vs. text) |

See `references/frameworks.md` for specific axis pair options.

## Step 9: Competitor Account Deep Dives

**Table 1 — Content Metrics:**
```
| Metric | Value |
|--------|-------|
| Followers/Subscribers | X.XM |
| Avg Views per Post | XXK |
| Engagement Rate | X.X% |
| Posting Frequency | X/week |
| Follower Growth (MoM) | +X.X% |
| Estimated Monthly Reach | X.XM |
| Primary Platform | YouTube / TikTok / Instagram |
| Top Content Format | Long-form / Short-form / Mixed |
```

**Table 2 — Qualitative:**
```
| Category | Assessment |
|----------|------------|
| Content Style | What they create and how (1-2 sentences) |
| Strengths | 2-3 bullets |
| Weaknesses | 2-3 bullets |
| Monetization | Primary revenue model |
| Content Strategy | Current focus and priorities |
```

See `references/schemas.md` for additional table templates.

## Step 10: Comparative Analysis

```
| Dimension | Account A | Account B | Account C |
|-----------|-----------|-----------|-----------|
| Reach | ### 4.2M | ##- 890K | #-- 120K |
| Engagement | ##- 2.1% | ### 4.8% | ##- 3.2% |
| Post Frequency | #-- 1/wk | ##- 3/wk | ### 7/wk |
| Content Depth | ### High | ##- Med | #-- Low |
| Audience Loyalty | ### Strong | ##- Med | #-- Weak |
```

## Step 11: Content Strategy Context

- Platform algorithm changes affecting this content type
- Trending formats in the niche (e.g., "deep dive" videos vs. shorts, AI-generated explainers)
- Viral pattern analysis — what triggers breakout content in this space
- Collaboration and cross-promotion patterns among key accounts
- Sponsorship and brand partnership trends in the niche

## Step 12: Synthesis

**Content Moat Assessment:**

| Moat Type | What to Assess |
|-----------|----------------|
| Unique Voice | Distinctive personality, format, or perspective competitors cannot replicate |
| Audience Loyalty | Community depth, direct relationships, subscriber retention |
| Platform Advantage | First-mover on a platform, algorithm favorability, platform partnerships |
| Content Quality | Production value, research depth, accuracy reputation |
| Topic Authority | Recognized expertise, citations, mainstream media crossover |
| Distribution Network | Cross-platform presence, email list, community ownership |

Rate each as Strong / Moderate / Weak with supporting evidence.

**Required Synthesis Elements:**
- Durable advantages (hard to replicate) — map to moat categories above
- Structural vulnerabilities (hard to fix)
- Content gaps — topics or formats no competitor owns well
- Opportunity identification — underserved audience segments or formats

## Quality Checklist

Before finalizing, verify:

**Data Consistency:**
- All metrics from same time period (flag exceptions)
- Same metric definition used across all accounts
- Same metric shows identical value in every table it appears

**Content Quality:**
- Section headers state insights, not topics
- Every number has a source citation
- Ratings include actual metric values alongside symbols
- Missing data marked "-" or "N/A", not left blank

**Completeness:**
- Target account profile before competitor profiles
- Positioning visualization included
- Comparative table covers all key dimensions
- Synthesis includes moat assessment and opportunity identification

## Artifact Handoff

**Output**: Competitor analysis saved to:
- `openspec/runtime/competitor/YYYY-MM-DD-<account>-competitor-analysis.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/competitor.md` (if contract/deep-research mode)

**Next step**: Suggest running benchmark to compare your content with competitor baselines.
