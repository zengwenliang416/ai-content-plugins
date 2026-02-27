---
name: quality-check
description: Review article or content quality across accuracy, readability, logical coherence, SEO, and originality dimensions. Use when checking a draft or published piece before publication, auditing existing content for quality issues, or evaluating whether content meets publishing standards. Triggers include requests to review an article, check content quality, audit a draft, or assess whether a piece is ready to publish.
user-invocable: true
metadata:
  openclaw:
    emoji: "✅"
    requires: {}
    os: ["darwin", "linux"]
---

# Article Quality Check

## Workflow

### Step 1: Fact Accuracy Check

Review all factual claims in the content:

- Identify every specific claim, statistic, or data point
- Flag claims that are unverified, outdated, or appear incorrect
- Note claims with missing citations that should have them
- Check dates, version numbers, and named references for accuracy

Score: Pass (all claims verifiable) / Flag (some claims need verification) / Fail (contains demonstrably incorrect claims)

### Step 2: Logical Coherence Check

Evaluate argument structure and evidence quality:

- Does the introduction promise what the body delivers?
- Is each claim supported by evidence or sound reasoning?
- Are there logical leaps, non-sequiturs, or unsupported conclusions?
- Do sections connect logically, or do transitions feel abrupt?
- Is the conclusion consistent with the evidence presented?

Score: Pass / Flag / Fail with specific line-level callouts

### Step 3: Readability Analysis

Assess how easy the content is to read and understand:

- Average sentence length (target: under 20 words for general audiences)
- Paragraph length (target: 3-5 sentences for digital content)
- Jargon density — is technical language defined or assumed?
- Heading structure — are sections clearly labeled and scannable?
- Active vs. passive voice ratio
- Reading level estimate (Flesch-Kincaid or equivalent heuristic)

Score: Pass / Flag / Fail with specific suggestions

### Step 4: SEO Check

Evaluate search optimization signals:

- Title: Does it contain the primary keyword? Is it under 60 characters?
- Meta description: Present? Compelling? Under 155 characters?
- H1/H2/H3 structure: Logical hierarchy? Keywords in headers?
- Keyword density: Primary keyword present but not over-stuffed (1-3%)
- Internal and external links: Appropriate count and relevance?
- Image alt text: Present on all images?
- URL slug: Short, keyword-rich, no stop words?

See `references/seo-checklist.md` for complete SEO criteria.

Score: Pass / Flag / Fail per sub-dimension

### Step 5: Originality Assessment

Evaluate whether the content offers genuine value:

- Does it add original analysis, perspective, or synthesis beyond what's widely available?
- Are examples and case studies specific and non-generic?
- Is the voice distinct, or does it read like a template?
- Does it surface non-obvious insights, or only repeat common knowledge?

Score: High / Medium / Low originality with specific callouts

## Output

Quality scorecard in this format:

```
## Quality Scorecard: [Article Title]
Reviewed: [Date]

| Dimension | Score | Key Issues |
|-----------|-------|-----------|
| Fact Accuracy | ✅ Pass / ⚠️ Flag / ❌ Fail | [Issue 1], [Issue 2] |
| Logical Coherence | ✅ / ⚠️ / ❌ | [Issue] |
| Readability | ✅ / ⚠️ / ❌ | [Issue] |
| SEO | ✅ / ⚠️ / ❌ | [Issue] |
| Originality | High / Medium / Low | [Assessment] |

**Overall: Ready to Publish / Needs Revision / Major Rework Required**

### Priority Fixes
1. [Most critical fix — what and where]
2. [Second priority fix]
3. [Third priority fix]

### Detailed Notes
[Expanded commentary per dimension]
```

## Important Notes

- Be specific: cite the exact sentence or section with the issue
- Distinguish between blocking issues (must fix before publish) and nice-to-have improvements
- For SEO: platform matters — blog SEO differs from YouTube SEO differs from newsletter
- See `references/quality-criteria.md` for detailed scoring rubrics per dimension
