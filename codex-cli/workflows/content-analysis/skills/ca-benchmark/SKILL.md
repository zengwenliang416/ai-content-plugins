---
name: ca-benchmark
description: "Benchmark content performance against top performers in a niche"
arguments:
  - name: input
    description: "Niche/topic, comparison file path, or pipeline.openspec.json"
---

# Content Benchmark

## Step 1: Upstream Artifact Detection (MANDATORY)

Complete this step BEFORE any other interaction.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, then `outputs.performance_report_md`, then `inputs.topic`.
   - If `$ARGUMENTS` is a niche/topic or file path, use it directly.
   - Then skip to Step 3.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.article_md`, `outputs.performance_report_md`, and `inputs.topic`.

3. **Auto-scan legacy benchmark inputs**:

```bash
ls -t openspec/runtime/articles/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/benchmark/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下 benchmark 素材，请选择要用于对标分析的输入：" with files as options.

4. **No upstream found**: Only in this case, ask what niche or topic to benchmark.

## Step 2: Language Selection (MANDATORY)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 3: Define Benchmark Criteria

Confirm:
- **Topic / niche**: What subject area to benchmark within
- **Platform**: YouTube, TikTok, newsletter, blog, podcast, etc.
- **Content format**: Long-form video, short clip, article, thread, etc.
- **Time period**: Recent top performers (last 30/90 days) or evergreen leaders
- **Performance signal**: What defines "top performing" (views, engagement, shares, saves)

## Step 4: Identify Top-Performing Content

Use web search to find 5-8 top-performing pieces in the niche:
- Search for "[topic] best performing [platform] [year]" and "[topic] most viewed [format]"
- Look for content with significantly above-average metrics for the niche
- Include a mix of large and mid-tier accounts to capture different success patterns

For each piece, record:
- Title, creator, platform, publish date
- Key performance metrics (views, likes, shares, engagement rate)
- Estimated production tier (high / medium / low)

## Step 5: Extract Patterns

Analyze the top performers for shared patterns:

| Dimension | Pattern to Extract |
|-----------|-------------------|
| Headline / Title | Hook formula, length, keyword placement |
| Structure | Intro style, section flow, conclusion type |
| Length | Word count / video duration |
| Format | List, narrative, how-to, comparison, opinion |
| Hook style | Question, statistic, controversy, story, bold claim |
| Visual elements | Thumbnail style, graphic density, chart types |
| Call to action | Type, placement, conversion approach |
| SEO signals | Keyword density, heading usage, meta approach |

## Step 6: Build Benchmark Report

Produce a markdown report with:

**Section 1: Benchmark Summary Table**
```
| Metric | Top Performer Avg | Niche Average | Your Content | Gap |
|--------|------------------|---------------|--------------|-----|
| Views  | XXK              | XXK           | XXK          | +/- |
| Eng %  | X.X%             | X.X%          | X.X%         | +/- |
| Length | XX min / XX words| XX            | XX           | +/- |
```

**Section 2: Pattern Analysis**
- Headline patterns: [observed formula with examples]
- Structure patterns: [common flow with examples]
- Hook patterns: [top 3 hook types found]
- Format patterns: [dominant format types]

**Section 3: Individual Top Performer Profiles**
For each of the 5-8 benchmark pieces, one paragraph summary: what it is, why it performed, what's replicable.

## Step 7: Actionable Recommendations

Produce 3-5 specific recommendations ranked by estimated impact:

1. **[Recommendation]**: [What to change] -> [Expected improvement]
2. **[Recommendation]**: [What to change] -> [Expected improvement]

## Output

Markdown benchmark report with:
- Summary table
- Pattern analysis with examples
- Individual top-performer profiles
- Ranked recommendations with rationale

## Important Notes

- Always cite the source and date for each benchmark piece
- Flag if top performers are outliers vs. representative of the niche
- Note when patterns conflict across top performers (this reveals niche variation)
- Distinguish between format patterns (replicable) and creator-specific advantages (not replicable)

## Artifact Handoff

**Output**: Benchmark report saved to:
- `openspec/runtime/benchmark/YYYY-MM-DD-<niche>-benchmark.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/benchmark.md` (if contract/deep-research mode)

**Next step**: Suggest applying benchmark patterns in the next content draft.
