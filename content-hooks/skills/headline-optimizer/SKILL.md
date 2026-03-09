---
name: headline-optimizer
description: Generate CTR-optimized headlines with scoring and A/B variants. Use when user asks to "write a headline", "optimize title", "title ideas", "headline test", or wants better titles for articles/posts.
---

# Headline Optimizer

Generate and score headlines for maximum click-through rate.

## Preferences (EXTEND.md)

Use Bash to check EXTEND.md existence (priority order):

```bash
# Check project-level first
test -f .content-skills/headline-optimizer/EXTEND.md && echo "project"

# Then user-level (cross-platform: $HOME works on macOS/Linux/WSL)
test -f "$HOME/.content-skills/headline-optimizer/EXTEND.md" && echo "user"
```

| Path | Location |
|------|----------|
| `.content-skills/headline-optimizer/EXTEND.md` | Project directory |
| `$HOME/.content-skills/headline-optimizer/EXTEND.md` | User home |

| Result | Action |
|--------|--------|
| Found | Read, parse, apply settings |
| Not found | Use defaults |

**EXTEND.md Supports**: Brand constraints | Character limits | SEO keywords | Platform preferences

## Headline Generation Process

### Step 1: Content Analysis

Extract from input:
- Core topic/theme
- Target audience
- Key value proposition
- Emotional angle (inspiration, fear, curiosity, urgency)
- SEO keywords (if applicable)

### Step 2: Generate Headlines by Style

For each selected style, generate **3 variants**:

**Data-Driven:**
- Include specific number in first 3 words
- Pattern: "[Number] [Noun] That [Verb] [Outcome]"
- Example: "5 AI Tools That Cut My Writing Time in Half"

**Curiosity Gap:**
- Create information gap that demands closing
- Pattern: "[Unexpected Setup] — [Partial Reveal]"
- Example: "I Asked GPT-5 to Review My Code. The Response Changed How I Program."

**How-To/Value:**
- Lead with actionable benefit
- Pattern: "How to [Achieve Outcome] [Qualifier]"
- Example: "How to Write Viral Headlines (Without Being Clickbait)"

**Contrarian:**
- Challenge industry conventional wisdom
- Pattern: "Why [Common Practice] Is [Negative Outcome]"
- Example: "Why Your 'Consistent Posting Schedule' Is Killing Your Growth"

**Listicle:**
- Odd numbers perform better (7, 9, 11)
- Pattern: "[N] [Adjective] [Noun] for [Audience/Goal]"
- Example: "7 Underrated AI Workflows Every Content Creator Needs"

### Step 3: Score Each Headline

Rate each headline on these dimensions (1-10):

| Dimension | Weight | Criteria |
|-----------|--------|----------|
| Clarity | 25% | Is the value proposition immediately clear? |
| Curiosity | 25% | Does it create an information gap? |
| Specificity | 20% | Does it include concrete details/numbers? |
| Emotional Pull | 15% | Does it trigger an emotional response? |
| SEO Fit | 15% | Does it include target keywords naturally? |

**Composite Score** = weighted average → map to letter grade (A+ to C)

### Step 4: A/B Recommendation

Select the top 2 headlines and explain:
- Which to use as primary (A)
- Which to use as variant (B)
- What metric to track (CTR, read time, shares)
- Expected performance difference

## Output Format

```markdown
# Headlines — [Topic]

## Generated: [date]
## Style: [selected style(s)]

### [Style Name] Headlines

#### 1. [Headline Text]
| Clarity | Curiosity | Specificity | Emotion | SEO | **Score** |
|---------|-----------|-------------|---------|-----|-----------|
| 8/10    | 7/10      | 9/10        | 6/10    | 8/10| **B+ (7.7)** |

[Repeat for each variant]

### A/B Test Recommendation

**Primary (A)**: "[headline]"
**Variant (B)**: "[headline]"
**Track**: [metric]
**Rationale**: [1-2 sentences]

### Quick-Pick Summary
| Rank | Headline | Score | Best For |
|------|----------|-------|----------|
| 1    | ...      | A     | ...      |
| 2    | ...      | B+    | ...      |
| ...  | ...      | ...   | ...      |
```

## Quality Criteria

- No headline should exceed 70 characters (SEO best practice)
- Each variant must be meaningfully different (not just word swaps)
- Scores must reflect actual headline quality (no inflated ratings)
- A/B recommendation must have clear, actionable rationale

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.
