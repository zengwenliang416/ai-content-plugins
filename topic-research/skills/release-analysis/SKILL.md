---
name: release-analysis
description: Analyze a new AI product release, model launch, or research paper by gathering release information, analyzing key claims and capabilities, comparing to prior state and competitors, assessing significance, and recommending a content angle.
---

# Release Analysis

Produce a fast-turnaround structured analysis of a new AI model launch, product release, or research paper — suitable for editorial decision-making and content planning.

## Overview

The release analysis is a focused, rapid-response document. Where deep-research takes days, release analysis should be completable in hours. It covers what was released, what the claims are, how it compares, and what it means.

**Output**: Release analysis document (Markdown, 1,500-3,000 words)

---

## Workflow

### Step 1: Gather Release Information

Collect all primary source materials:

**For a model release**:
- Official announcement (blog post, press release)
- Technical report or model card (if available)
- Demo or playground (test it if access is available)
- API documentation (what capabilities, pricing)
- Safety report or evaluation results (if published)
- Company's claimed benchmarks and comparisons

**For a product launch**:
- Product announcement page
- Feature list and documentation
- Pricing and availability details
- Any video demos
- Customer/partner quotes (if in press release)
- Company's positioning claims

**For a research paper**:
- The paper itself (arXiv or conference proceedings)
- Author affiliations and lab context
- Any accompanying code release (GitHub)
- Reproduction or commentary from the community (Twitter/X, HN)
- Prior work the paper builds on (cited foundations)

**Platform sources** (via news-search CLI, 24h freshness enforced):

> **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "[product/model name]" 20` — community reactions and expert commentary
- Reddit: `${TS_RUNNER} news-search/scripts/search.ts reddit "[product/model name]" 10` — technical discussions
- GitHub: `${TS_RUNNER} news-search/scripts/search.ts github "[product/model name]" 10` — code releases and repos
- Read release page: `${TS_RUNNER} news-search/scripts/read.ts <announcement-url>` — extract details from blog posts
- See `news-search` skill for full platform reference.

### Step 2: Analyze Key Claims and Capabilities

Extract and evaluate:

**Stated claims**:
- List all specific capability or performance claims
- Note: Are these claims qualified or absolute?
- Note: What caveats or limitations does the source acknowledge?

**Benchmark results**:
- What benchmarks are cited?
- Are these standard canonical benchmarks or cherry-picked?
- Do the benchmark results actually support the claims?
- What benchmarks are conspicuously missing?

**Capability demonstrations**:
- What does the demo show? What does it not show?
- Are the demo examples representative or cherry-picked?
- What failure modes are visible?

**Technical approach** (for papers and technical releases):
- What is the core technical innovation?
- Is this incremental or a paradigm shift?
- What is the compute/data requirement?
- Is the method reproducible?

### Step 3: Compare to Prior State and Competitors

**Comparison to previous version/model**:
- What is new vs. the previous version?
- How much improvement on shared benchmarks?
- What capabilities are added, changed, or removed?

**Comparison to competitors**:
- How does it compare on canonical benchmarks vs. top competitors?
- What is competitive differentiation (better, cheaper, faster, more open)?
- What does it not do that competitors do?

**Comparison to prior SOTA** (for papers):
- What was the previous best result on the paper's benchmarks?
- By how much does this paper improve?
- Is the improvement statistically significant?

### Step 4: Assess Significance and Implications

**Significance rating**: Major / Noteworthy / Incremental / Overhyped

**Assessment dimensions**:

*Technical significance*: Is this a genuine technical breakthrough, or incremental progress?

*Commercial significance*: Does this change the competitive dynamics? Does it open new use cases?

*Ecosystem significance*: Does this affect open-source options, pricing, or access?

*Research significance* (for papers): Does this open new directions, or primarily validate existing approaches?

**Implications**:
- What does this mean for users and developers?
- What does this mean for competitors?
- What does this mean for the field's trajectory?
- What questions does this raise?

### Step 5: Write Analysis with Content Angle Recommendation

Structure the document and conclude with a content recommendation.

---

## Output Format

```markdown
# Release Analysis: [Product/Model/Paper Name]

**Release type**: Model Launch / Product Launch / Research Paper
**Releasing organization**: [Organization]
**Date**: [Release date]
**Analyzed**: [Analysis date]

---

## What Was Released

[200-300 words: What is this, what does it do, who is it for, how can it be accessed]

---

## Key Claims

| Claim | Supported by | Caveat |
|-------|-------------|--------|
| [Claim] | [Benchmark / demo / statement] | [Qualification or missing context] |

[100-200 words of commentary on the overall credibility of claims]

---

## Capability Analysis

[300-500 words: What it can and cannot do, based on benchmarks and demos]

---

## Competitive Comparison

| Dimension | [This release] | [Competitor A] | [Competitor B] |
|-----------|---------------|----------------|----------------|
| [Benchmark] | [Score] | [Score] | [Score] |
| [Feature] | Yes/No | Yes/No | Yes/No |
| [Price/access] | [Detail] | [Detail] | [Detail] |

[200-300 words of competitive analysis]

---

## Technical Assessment (if applicable)

[200-300 words: Core technical approach, innovation level, reproducibility]

---

## Significance Assessment

**Rating**: Major / Noteworthy / Incremental / Overhyped

**Rationale**: [3-5 sentences explaining the rating with specific evidence]

**Implications**:
- For users: [1-2 sentences]
- For competitors: [1-2 sentences]
- For the field: [1-2 sentences]

---

## What's Missing or Unknown

[100-200 words: What the release doesn't tell us, what to watch for]

---

## Content Angle Recommendation

**Recommendation**: WRITE / MONITOR / SKIP

**Best angle**: [Specific article hook — one sentence]
**Why now**: [Why the timing is right for this angle]
**Target audience**: [Who would find this most valuable]
**Key questions the article should answer**:
- [Question 1]
- [Question 2]
- [Question 3]

---

## Sources

[All primary sources with URLs and dates]
```

---

## Reference Files

For additional context on evaluation methodology:
- **references/evaluation-framework.md**: How to assess benchmark claims and capability comparisons

---

## Quality Standards

- **Anti-AI writing rules** — load `content-utilities/skills/humanizer/references/writing-rules.md` during writing. Avoid AI vocabulary, significance inflation, filler phrases, generic conclusions. Write like a person.
- All claims must be sourced from primary materials (not secondary coverage)
- Benchmark comparisons must use numbers from official sources
- Significance rating must be justified with specific evidence
- Missing/unknown section is mandatory — every release has gaps
- Content angle must be specific, not "write about the release"
- Turnaround: Aim to complete within same day as release for maximum relevance
