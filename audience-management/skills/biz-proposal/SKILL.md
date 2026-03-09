---
name: biz-proposal
description: Create professional business proposals for sponsorships, brand deals, and content collaborations. Covers collaboration format, audience metrics, value proposition, pricing, deliverables, and timeline. Use when pitching brands, responding to inbound inquiries, or formalizing partnership terms. Triggers on "business proposal", "sponsorship proposal", "brand deal proposal", "pitch a brand", "collaboration proposal", or "proposal for [brand]".
---

# Business Proposal

## Workflow

### Step 1: Prospect Context

Gather:
- **Brand or partner name**: Who the proposal is for
- **Collaboration type**: Sponsored post, product review, content series, ambassador program, co-created content, event coverage
- **How this came about**: Inbound inquiry, cold outreach, warm introduction
- **Creator's audience metrics**: Followers, views, engagement rate, audience demographics
- **Brand's product/service**: What they sell and who their target customer is
- **Competition**: Are there other creators being considered?
- **Budget signals**: Any indication of budget range shared?

**Research the brand** (via news-search CLI, 24h freshness enforced):

> **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "[brand name]" 10` — brand presence and engagement
- Web: `${TS_RUNNER} news-search/scripts/search.ts web "[brand name] marketing" 10` — campaigns and press
- LinkedIn: `${TS_RUNNER} news-search/scripts/search.ts linkedin "[brand name]"` — company profile
- Read brand pages: `${TS_RUNNER} news-search/scripts/read.ts <brand-url>` — extract product and positioning info
- See `news-search` skill for full platform reference.

### Step 2: Proposal Structure

**I. About the Creator** (1 page)
- Creator name and platform overview
- Content focus and niche
- Audience snapshot: total reach, key demographics, engagement rate
- Credibility markers: notable collaborations, media mentions, community size

**II. Understanding the Brand's Goals** (half page)
- Restate what the brand is trying to achieve — show you listened
- Key marketing objective: brand awareness, product launch, lead generation, community building
- What success looks like for them

**III. Proposed Collaboration** (1-2 pages)
- Collaboration format and rationale
- Why this creator's audience is a strong fit for the brand
- Proposed content pieces with descriptions

Proposed deliverables:

| Deliverable | Platform | Format | Estimated Reach | Timeline |
|-------------|----------|--------|-----------------|---------|
| | | | | |

**IV. Audience Value Proposition** (1 page)
- Audience demographics aligned with the brand's target customer
- Engagement metrics (engagement rate, avg. comments, shares)
- Audience trust signals: how long followers have been engaged, community quality
- Comparison to platform average benchmarks (if favorable)

Key audience metrics:

| Metric | Your Account | Platform Average |
|--------|-------------|-----------------|
| Followers | | |
| Avg. views | | |
| Engagement rate | | |
| Top audience age | | |
| Top audience location | | |

**V. Pricing & Deliverables** (1 page)
- Itemized pricing for each deliverable
- Package options (if applicable: standard, premium, custom)
- Usage rights: what the brand can do with the content (repurpose, paid ads, white-label)
- Exclusivity: category or platform exclusivity terms and duration

| Package | Deliverables | Price | Usage Rights |
|---------|-------------|-------|-------------|
| Standard | | | |
| Premium | | | |

**VI. Timeline & Terms** (half page)
- Proposal submission date
- Campaign timeline (start, content delivery, go-live)
- Revision rounds included
- Payment terms (deposit, milestone, net-30)
- Content approval process
- Required disclosures (#ad, #sponsored, FTC compliance)

### Step 3: Customization

- Match the tone to the brand (startup vs. enterprise, casual vs. corporate)
- If the brand has a specific campaign or product launch, tie the proposal directly to it
- Lead with audience alignment — the brand cares most about reaching the right people
- If price-sensitive, offer tiered packages rather than a single price point

### Step 4: Output

- Professional proposal document (PDF or Word)
- Summary slide or email version for initial outreach
- One-page leave-behind with headline metrics and proposed collaboration

## Important Notes

- **Anti-AI writing rules** — load `content-utilities/skills/humanizer/references/writing-rules.md` during writing. Avoid AI vocabulary, significance inflation, filler phrases, generic conclusions. Write like a person.
- The proposal should feel tailored, not templated — reference the brand's specific goals
- Don't undersell — know your audience's value and price accordingly
- Always include FTC disclosure requirements upfront — brands appreciate compliance awareness
- Delivery timeline must be realistic — missing deadlines damages the relationship
- Agree on content approval process before signing — avoid endless revision loops
- Follow up within 48 hours of sending with a brief check-in
