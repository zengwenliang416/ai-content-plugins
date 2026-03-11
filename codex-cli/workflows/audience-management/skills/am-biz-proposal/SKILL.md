---
name: am-biz-proposal
description: "Draft a business proposal for sponsorship or collaboration"
arguments:
  - name: input
    description: "Brand/partner name, supporting brief path, or pipeline.openspec.json"
---

# Business Proposal

## Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: Complete this step BEFORE any drafting and BEFORE asking the user for proposal details.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.audience_review_md`, then `outputs.ops_report_md`, then `inputs.partner`.
   - If `$ARGUMENTS` is a partner name or brief path, use it directly.
   - Then skip to the Workflow section.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.audience_review_md`, `outputs.ops_report_md`, and `inputs.partner`.

3. **Auto-scan legacy proposal assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/audience-review/*.md 2>/dev/null | head -3
ls -t openspec/runtime/ops-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/collab-prep/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下合作提案素材，请选择要用于商务方案的输入：" with files as options.

4. **No upstream found**: Only in this case, ask who the proposal is for and what type of collaboration is being proposed.

## Language Selection (MANDATORY — after upstream detection)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

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

## Artifact Handoff

**Output**: Business proposal saved to:

- `openspec/runtime/biz-proposal/YYYY-MM-DD-<partner>-biz-proposal.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/biz-proposal.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.
- Update with:
  - `stage`: `audience-management`
  - `outputs.biz_proposal_md`: business proposal path
  - `next.command`: `none`
  - `next.input`: `none`

**Next step**: This is a terminal stage; suggest sharing the proposal with the partner for execution.

## Important Notes

- The proposal should feel tailored, not templated — reference the brand's specific goals
- Don't undersell — know your audience's value and price accordingly
- Always include FTC disclosure requirements upfront — brands appreciate compliance awareness
- Delivery timeline must be realistic — missing deadlines damages the relationship
- Agree on content approval process before signing — avoid endless revision loops
- Follow up within 48 hours of sending with a brief check-in
