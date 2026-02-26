# Content Experiment

description: Design content A/B tests to optimize headlines, formats, posting times, and engagement tactics. Triggers on "A/B test", "experiment", "test which", "compare formats", "optimize content", "what performs better".

## Workflow

### Step 1: Define the Hypothesis

State clearly:
- **What you believe**: "Headline A will get more clicks than headline B because..."
- **The variable being tested**: Exactly one thing changes between variants (headline, format, posting time, CTA, hook style)
- **Why this variable matters**: What behavior it is expected to change

Examples of valid hypotheses:
- "A question-format headline will get more clicks than a statement headline on this topic"
- "A thread will get more engagement than a single post of the same content"
- "Posting at 9am will outperform posting at 6pm for this audience"

### Step 2: Design Variants

Create exactly two variants (A and B) with **one variable changed**:

| | Variant A (Control) | Variant B (Test) |
|--|---------------------|-----------------|
| Variable | [Current / baseline] | [New / challenger] |
| Everything else | Identical | Identical |

Document both variants fully — the test is invalid if more than one thing differs.

### Step 3: Define Metrics and Success Criteria

**Primary metric** (one): The number that decides which variant wins
- Click-through rate (CTR)
- Engagement rate (likes + comments + shares / impressions)
- Saves / bookmarks
- Profile visits or follows generated
- Link clicks

**Secondary metrics** (2-3): Supporting signals to understand the result
- Reach / impressions
- Comment sentiment
- Save rate

**Success threshold**: What does Variant B need to achieve to be declared the winner?
- Example: "B must achieve at least 20% higher CTR than A to be conclusive"

### Step 4: Plan Execution

- **When to publish**: Same day of week and time of day for both variants (or specify why timing differs)
- **Sample size**: Minimum impressions or days needed before reading results (avoid stopping early)
- **Run duration**: Typically 48-72 hours for social posts; 7+ days for newsletters or blog posts
- **How to isolate**: Ensure no other major variables change during the test (no algorithm changes, no off-topic events)

### Step 5: Analysis Framework

When the test concludes:

1. **Pull the numbers**: Primary and secondary metrics for both variants
2. **Calculate lift**: (B - A) / A × 100% = % improvement
3. **Check significance**: Is the sample large enough to trust the result? (Rule of thumb: 100+ impressions per variant minimum)
4. **Interpret**: Did the result confirm or disprove the hypothesis? Why might the result have gone this way?
5. **Decision**: Apply the winning variant as the new default, or call the test inconclusive

**Result template:**

| Metric | Variant A | Variant B | Lift |
|--------|-----------|-----------|------|
| Primary metric | | | +/-X% |
| Secondary metric 1 | | | |
| Secondary metric 2 | | | |

**Conclusion**: [Winner] / [Inconclusive] — [1-2 sentence interpretation]

### Output

- Experiment design document with hypothesis, variants, metrics, and timeline
- Results table (filled after experiment runs)
- Decision and next experiment recommendation

## Important Notes

- Test one variable at a time — multi-variable tests require much larger sample sizes to be valid
- Don't end the test early because one variant is ahead — variance is high with small samples
- Negative results are valuable — knowing what doesn't work is as useful as knowing what does
- Keep a running log of all experiments and results — patterns emerge over multiple tests
- The winning variant becomes the new baseline for the next experiment — iterate systematically
