---
name: ch-headline-optimizer
description: "Generate CTR-optimized headlines with A/B variants"
arguments:
  - name: input
    description: "topic, article file, .openspec.json, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, `outputs.short_post_md`, then `inputs.topic`.
   - If argument is a topic string or file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/short-post/*.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md`, `outputs.short_post_md`, then `inputs.topic`.

3. **Auto-scan legacy content inputs**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/*.md 2>/dev/null | head -3
ls -t openspec/runtime/short-post/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下内容素材，请选择要用于标题优化的输入：" with files as options.

4. **No upstream found**: Only in this case, ask for the topic.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Headline Configuration

Use AskUserQuestion to ask the user:

"请选择标题风格 / Select headline style:

1. 📊 数据驱动 / Data-Driven (numbers, stats, specifics)
2. ❓ 好奇心 / Curiosity Gap (questions, teasers)
3. 🎯 实用价值 / How-To/Value (actionable, benefit-focused)
4. 💥 争议性 / Contrarian (challenges assumptions)
5. 📋 清单体 / Listicle (N things, N ways, N reasons)
6. 🔥 全风格 / All Styles (generate one of each)"

## Step 3: Load Skill and Execute

Load the `headline-optimizer` skill and generate scored headlines for the specified topic/content using the selected style.

## Artifact Handoff

**Output**: Headline variants saved to:

- `openspec/runtime/headlines/<slug>/headlines.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/headlines.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `pipeline.openspec.json` is available from upstream, update it in-place for cross-stage traceability.

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-hooks`
  - `outputs.headlines_md`: headlines file path
  - `next.command`: apply headline to article or post
  - `next.input`: headlines file path or contract path

**Next step**: Suggest applying the top-ranked headline to the target article or post.

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
