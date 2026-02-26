# Content Workflow Guide

Practical workflows for common content creation scenarios using the plugin ecosystem. Each workflow lists the commands in execution order with the data that flows between them.

## Workflow 1: Daily Content Routine

A full-cycle daily workflow from news scanning to publication-ready content with quality gates.

```
daily-brief --> brainstorm --> screen-topic --> deep-research --> long-article --> check-quality --> review-checklist
```

### Steps

**1. `/topic-research:daily-brief`**
Scan HN, arXiv, RSS feeds, and web search for the day's AI developments. Output: categorized briefing with top-3 deep dive candidates.

**2. `/topic-research:brainstorm`**
Take the top deep dive candidates from the daily brief as seed topics. Generate 20+ topic ideas, score across audience interest / uniqueness / feasibility / timeliness, and produce briefs for the top 3.

**3. `/growth-ops:screen-topic`**
Screen each top-3 candidate against search volume, competition, audience interest, expertise fit, and timeliness. Only topics scoring HIGH (total >= 20, no criterion below 3) proceed to production.

**4. `/topic-research:deep-research` (Task 1)**
For the topic that passed screening, execute Task 1 (Topic Research) to produce the 6-8K word research document covering background, key players, technical deep dive, and risk assessment.

**5. `/content-production:long-article`**
Use the research document as source material for the article-builder. Follow the standard article structure: hook, background, main analysis (3-5 sections), practical implications, future outlook, conclusion.

**6. `/content-analysis:check-quality`**
Run the quality scorecard against the draft: fact accuracy, logical coherence, readability, SEO, and originality. Address any Flag or Fail scores before proceeding.

**7. `/growth-ops:review-checklist`**
Generate the pre-publish checklist tailored to the content type and target platform. Verify accuracy & sourcing, readability, SEO, formatting, legal, and platform guidelines. All items must pass before publication.

### When to Use
- Daily content operations for AI-focused publications
- Building a regular publishing cadence with quality control

### Tips
- The daily brief is best run in the morning to catch overnight developments
- Not every brainstorm topic needs screening -- only topics being considered for deep investment
- If screening returns MEDIUM, the topic can be held for a `trend-preview` check before committing

---

## Workflow 2: Quick Post Workflow

A lightweight workflow for fast-turnaround short-form content on trending topics.

```
trend-preview --> short-post --> check-quality
```

### Steps

**1. `/topic-research:trend-preview`**
Identify emerging AI trends with momentum scoring and content opportunity assessment. Focus on Tier 1 trends (Act Now -- high opportunity, optimal timing).

**2. `/content-production:short-post`**
Draft a short-form post for the target platform (Twitter/X, LinkedIn, WeChat, etc.) using a Tier 1 trend as the topic. Apply platform-specific structure and hook techniques.

**3. `/content-analysis:check-quality`**
Run a focused quality check on the short post. For short-form content, prioritize fact accuracy and logical coherence over SEO.

### When to Use
- Reacting quickly to emerging trends before the content window closes
- Maintaining social presence between long-form publication cycles
- Testing audience interest in a topic before committing to a deep dive

### Tips
- Trend-preview Tier 1 items with "Recommended timing: Now" are the best candidates
- Short posts can serve as validation -- high engagement signals a topic worth expanding into long-form
- For platforms like Twitter/X, the hook must appear in the first line before the fold

---

## Workflow 3: Collaboration Pipeline

A 3-stage cross-plugin workflow for creator and brand partnerships, from cold outreach to formal proposal.

```
collab-letter --> collab-prep --> biz-proposal
```

### Steps

**1. `/content-production:collab-letter`**
Draft the initial outreach message. Requires: target name/handle, collaboration type, what the sender brings. The skill researches the target's recent content and drafts a specific, personalized message under 150 words with a clear CTA.

**2. `/growth-ops:collab-prep`**
Once the collaborator responds positively, prepare for the meeting. Research their content, audience, and reputation. Map mutual benefits, draft talking points, prepare 5-8 questions, and outline the collaboration proposal. Output: preparation brief with red flags to watch.

**3. `/audience-management:biz-proposal`**
After the meeting, formalize the partnership into a professional proposal. Includes: creator profile, brand/partner goals, proposed deliverables, audience metrics, pricing tiers, usage rights, timeline, and legal terms.

### When to Use
- Cold outreach to creators or brands for content partnerships
- Responding to inbound collaboration inquiries
- Formalizing sponsorship or co-creation terms

### Tips
- collab-letter research step is critical -- generic outreach gets ignored
- The collab-prep mutual benefit map should lead with what the collaborator gains
- biz-proposal pricing should include tiered packages (standard/premium) rather than a single price point
- Track all outreach in a log: who, when sent, response status

---

## Workflow 4: Content Optimization Cycle

A feedback-driven cycle that uses performance data to rebalance the content strategy and update the editorial plan.

```
performance --> content-roi --> content-rebalance --> content-plan
```

### Steps

**1. `/growth-ops:performance`**
Analyze content performance for a defined period. Aggregate views, engagement, follower growth. Identify top 5 and bottom 5 performers. Extract patterns by topic, format, timing, and length.

**2. `/growth-ops:content-roi`**
Calculate ROI across content types using time-invested versus results-achieved. Compute views/hour, engagement/hour, followers/hour, and revenue/hour (if monetized). Rank formats by primary ROI metric and identify double-down vs. reduce candidates.

**3. `/audience-management:content-rebalance`**
Compare current content mix (topic distribution, format distribution) against target allocation. Flag categories with >10% drift. Recommend specific adjustments with a 4-8 week phased transition plan.

**4. `/audience-management:content-plan`**
Update the editorial calendar based on rebalancing recommendations. Set monthly themes, adjust content pillar weights, reallocate production time, and schedule flexibility buffers for trending topics.

### When to Use
- Monthly or quarterly content strategy reviews
- When engagement or growth metrics plateau
- After experimenting with new formats or topics (use `content-experiment` results as additional input)

### Tips
- Performance analysis needs at least one full period of data -- avoid drawing conclusions from a single week
- ROI calculations require honest time tracking; estimates are acceptable but must be consistent
- Rebalancing should be gradual -- abrupt pivots confuse the existing audience
- Content-plan should leave 20-30% of slots flexible for reactive content

### Feeding Experiment Data

When A/B tests are running via `/content-production:ab-test`, their results flow into this cycle:

```
content-experiment results --> content-roi (as efficiency data)
content-experiment results --> content-rebalance (as format performance data)
```

---

## Workflow 5: New Topic Evaluation

A structured evaluation workflow to determine whether a topic is worth investing production time in.

```
topic-brainstorm --> competitor --> benchmark --> screen-topic
```

### Steps

**1. `/topic-research:brainstorm`**
Generate 20+ topic ideas in the target niche. Score each on audience interest, uniqueness, feasibility, and timeliness. Produce briefs for the top 3 with core angles, data requirements, and comparable content.

**2. `/content-analysis:competitor`**
For each top-3 candidate, map the competitive landscape. Identify who covers this topic, their audience size, engagement rates, content formats, and positioning. Assess content moats (unique voice, audience loyalty, topic authority) and find gaps.

**3. `/content-analysis:benchmark`**
Benchmark existing top-performing content in the niche. Find 5-8 top performers, extract patterns (headline, structure, hook, length, format), and build the benchmark summary table showing top performer avg vs. niche avg vs. your content.

**4. `/growth-ops:screen-topic`**
Apply the final screening gate. Score against search volume, competition level, audience interest, expertise fit, and timeliness. Produce the verdict: HIGH / MEDIUM / LOW with bull case, bear case, and recommended angle.

### When to Use
- Entering a new content niche or sub-topic
- Quarterly topic strategy planning
- Deciding between multiple competing topic ideas

### Tips
- The brainstorm step should produce specific topics, not broad categories ("How Anthropic's tool use changes enterprise automation" not "AI agents")
- Competitor analysis should include both large and mid-tier accounts to capture different success patterns
- The benchmark step reveals what the audience already responds to -- use it to calibrate expectations
- A topic can score HIGH on screening but still fail if the competitor analysis shows strong moats from incumbents; use both signals together

---

## Workflow Selection Guide

| Situation | Workflow | Time Investment |
|---|---|---|
| Daily publishing with full quality gates | Daily Content Routine | 3-5 hours |
| Quick reaction to a trending topic | Quick Post Workflow | 30-60 minutes |
| Partnering with another creator or brand | Collaboration Pipeline | Spread over 1-2 weeks |
| Reviewing and optimizing content strategy | Content Optimization Cycle | 2-3 hours per review |
| Evaluating whether to enter a new topic area | New Topic Evaluation | 2-4 hours |

## Cross-Workflow Integration

These workflows are not isolated. Common integration points:

- **Daily Routine feeds Optimization**: content-tracker data from daily publishing flows into the monthly performance analysis
- **Topic Evaluation feeds Daily Routine**: topics that pass evaluation enter the daily routine pipeline at the deep-research step
- **Quick Post validates Topic Evaluation**: a high-performing short post on a candidate topic provides evidence for the screening verdict
- **Optimization feeds Topic Evaluation**: ROI analysis revealing underperforming topic areas triggers new topic evaluation to find replacements
