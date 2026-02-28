---
name: competitor-analysis
description: Framework for competitor content account analysis across any AI/content niche. Use when analyzing competing accounts, mapping content landscape, assessing content positioning, building competitive strategy, or evaluating content creator performance. Triggers include requests for competitor breakdowns, account comparisons, content landscape maps, platform positioning assessments, and content strategy recommendations.
---

# Competitor Content Account Analysis

---

## CRITICAL STANDARDS - APPLY TO EVERY ANALYSIS

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

**When in doubt:** Re-read the prompt. If something is specified explicitly, it's a requirement, not a suggestion.

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
* **Ratings include actuals** — "●●● 4.2M followers" not just "●●●"

### What's STRICT vs FLEXIBLE

| STRICT (Every Time) | FLEXIBLE (Case-by-Case) |
|---------------------|------------------------|
| Exact section names when prompt specifies | Creative headers when prompt doesn't specify |
| All accounts listed in prompt | Number of accounts when not specified |
| Exact metric values when prompt specifies | Rounding when precision not specified |
| Same metric across all accounts | Which dimensions to compare |

---

## WORKFLOW PHASES

### Phase 1: Clarify Requirements
Before starting, confirm:
* **Scope**: Single account deep-dive or multi-account landscape?
* **Output**: Report, slide deck, or memo?
* **Focus areas**: Specific competitors, platforms, content types, or strategic questions?
* **Your account**: Are you comparing against a specific account you operate?
* **Source data**: What analytics exports or platform data are available?

### Phase 2: Research → Outline → Review → Create
**Do NOT create final output until outline is reviewed.**

Complete the 10-step workflow below before producing final deliverables.

---

## ANALYSIS WORKFLOW

### Step 0: Identify Content-Defining Metrics

Before analysis, identify the 3-5 metrics most meaningful for this niche and platform:

| Platform / Niche | Key Metrics |
|------------------|-------------|
| YouTube | Subscribers, Avg views/video, Watch time, CTR, Sub growth rate |
| TikTok | Followers, Avg views, Like rate, Share rate, Follower growth rate |
| Instagram | Followers, Avg reach, Engagement rate, Story views, Reel plays |
| Newsletter | Subscribers, Open rate, Click rate, Growth rate, Churn rate |
| Podcast | Downloads/episode, Listener count, Episode frequency, Reviews |
| AI/Tech niche | Technical depth score, Citation frequency, Topic authority signals |

Use these metrics consistently across all competitor comparisons.

### Step 1: Content Landscape Context

**Platform research** (via news-search CLI, 24h freshness enforced):

> **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X: `bun news-search/scripts/search.ts twitter "[competitor] OR [niche]" 20` — track competitor activity
- YouTube: `bun news-search/scripts/search.ts youtube "[competitor name]" 10` — content and engagement data
- Reddit: `bun news-search/scripts/search.ts reddit "[niche]" 10` — community sentiment on competitors
- Web: `bun news-search/scripts/search.ts web "[competitor] content strategy" 10` — coverage and analysis
- Read competitor pages: `bun news-search/scripts/read.ts <competitor-url>` — extract content details
- See `news-search` skill for full platform reference.

- Niche size and estimated audience (total addressable viewers/readers)
- Platform growth trends for this content category
- Key trends reshaping how content is consumed in this niche
- Monetization dynamics (ad revenue rates, sponsorship rates, course/product potential)

**CORRECT:** "The AI explainer niche on YouTube has ~50M monthly searches, growing 40% YoY (Google Trends, Jan 2025)"
**WRONG:** "The AI content space is large and growing"

### Step 2: Content Economics

Map how value flows in this content category:

* **Creator-to-audience** — What drives loyalty: education, entertainment, community, exclusivity
* **Monetization models** — AdSense CPM ranges, sponsorship rates by niche, paid community pricing, merchandise
* **Platform algorithm dynamics** — How the platform distributes content; what behaviors it rewards
* **Content production economics** — Estimated production cost per video/post; cost efficiency of top accounts

### Step 3: Target Account Profile

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

### Step 4: Competitor Account Mapping

Group competitors using the framework that fits:

* **By content style** — Educational vs. entertainment vs. opinion vs. news
* **By audience size** — Mega (1M+) vs. macro (100K-1M) vs. mid-tier (10K-100K)
* **By platform focus** — YouTube-first vs. TikTok-first vs. multi-platform
* **By topic depth** — Deep technical vs. accessible overview vs. pop-science
* **By origin/background** — Researcher/academic vs. practitioner vs. journalist vs. enthusiast

### Step 5: Positioning Visualization

| Visualization | Best For |
|--------------|----------|
| 2x2 Matrix | Two dominant positioning factors (e.g., Depth vs. Reach) |
| Tier Diagram | Natural clustering by audience size or influence level |
| Radar/Spider | Multi-factor comparison across 5-6 dimensions |
| Platform Map | Multi-platform presence comparison |
| Content Mix Chart | Format distribution (short vs. long, video vs. text) |

See `references/frameworks.md` for specific axis pair options.

### Step 6: Competitor Account Deep Dives

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

### Step 7: Comparative Analysis

```
| Dimension | Account A | Account B | Account C |
|-----------|-----------|-----------|-----------|
| Reach | ●●● 4.2M | ●●○ 890K | ●○○ 120K |
| Engagement | ●●○ 2.1% | ●●● 4.8% | ●●○ 3.2% |
| Post Frequency | ●○○ 1/wk | ●●○ 3/wk | ●●● 7/wk |
| Content Depth | ●●● High | ●●○ Med | ●○○ Low |
| Audience Loyalty | ●●● Strong | ●●○ Med | ●○○ Weak |
```

### Step 8: Content Strategy Context

- Platform algorithm changes affecting this content type
- Trending formats in the niche (e.g., "deep dive" videos vs. shorts, AI-generated explainers)
- Viral pattern analysis — what triggers breakout content in this space
- Collaboration and cross-promotion patterns among key accounts
- Sponsorship and brand partnership trends in the niche

### Step 9: Synthesis

**Content Moat Assessment:**
Evaluate each competitor's durable advantages:

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

**For strategic planning contexts:**
```
| Scenario | Probability | Key Driver |
|----------|-------------|------------|
| Growth | 40% | Viral breakout + algorithm boost |
| Steady | 45% | Consistent posting, moderate growth |
| Decline | 15% | Platform algorithm shift, audience churn |
```

---

## QUALITY CHECKLIST

Before finalizing, verify:

**Prompt Fidelity:**
- ✅ Section names match prompt exactly (not paraphrased)
- ✅ All accounts listed in prompt are included
- ✅ All time periods specified are covered
- ✅ Exact metric values used as specified

**Data Consistency:**
- ✅ All metrics from same time period (flag exceptions)
- ✅ Same metric definition used across all accounts
- ✅ Same metric shows identical value in every table it appears

**Content Quality:**
- ✅ Section headers state insights, not topics
- ✅ Every number has a source citation
- ✅ Ratings include actual metric values alongside symbols
- ✅ Missing data marked "-" or "N/A", not left blank

**Completeness:**
- ✅ Target account profile before competitor profiles
- ✅ Positioning visualization included
- ✅ Comparative table covers all key dimensions
- ✅ Synthesis includes moat assessment and opportunity identification
