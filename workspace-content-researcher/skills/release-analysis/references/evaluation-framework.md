# Evaluation Framework for AI Releases

Reference guide for assessing benchmark claims and capability comparisons in release analyses.

---

## Benchmark Credibility Assessment

### Canonical Benchmarks (high credibility)

These benchmarks are widely accepted and hard to game:

**Language / Reasoning**:
- MMLU (Massive Multitask Language Understanding)
- HellaSwag, WinoGrande, ARC (commonsense reasoning)
- GSM8K, MATH (mathematical reasoning)
- HumanEval, MBPP (code generation)
- BIG-Bench Hard (complex reasoning tasks)

**Multimodal**:
- VQA (visual question answering)
- MMBench, MME (multimodal evaluation)
- COCO (image captioning)

**Safety**:
- TruthfulQA (truthfulness)
- BBQ (bias benchmarks)

### Benchmark Red Flags

Watch for these warning signs when evaluating claims:

- **Cherry-picked benchmarks**: Only reports benchmarks where this model wins
- **Proprietary benchmarks**: Custom benchmarks with no external validation
- **Benchmark saturation**: Reports high scores on benchmarks where all models score high (not differentiating)
- **Missing standard benchmarks**: Avoids reporting on MMLU, HumanEval, etc.
- **No confidence intervals**: Reports point estimates without statistical uncertainty
- **Different evaluation setup**: Uses non-standard prompting, few-shot counts, or system prompts

### How to Evaluate Claims

1. **Check what benchmarks are standard** for this type of model/task
2. **Look for missing benchmarks** — what wasn't reported?
3. **Find independent evaluations** (Papers With Code leaderboards, third-party tests)
4. **Assess the evaluation setup** — same few-shot count as others?
5. **Calculate improvement significance** — is a 0.5% improvement meaningful?

---

## Capability Evaluation Heuristics

### For Text/Language Models

**Strong evidence of capability**:
- Consistent performance across diverse benchmarks
- Strong on held-out test sets (not training contamination)
- Community reproduction of results
- Qualitative examples that are clearly impressive

**Weak evidence of capability**:
- Impressive demos on carefully selected examples
- Strong on one benchmark, weak on others
- No independent reproduction
- Claims about capabilities that aren't demonstrated in evaluations

### For Multimodal Models

**Test on your own examples** (if access available):
- Try the model on images it definitely hasn't seen
- Test edge cases and failure modes
- Compare side-by-side with competitors on same inputs

### For Code Models

- Test on real programming problems (not tutorial-style examples)
- Check if it can debug existing code
- Assess accuracy on more complex tasks (not just simple functions)

---

## Significance Classification

### Major Release
All of the following:
- Achieves new SOTA on multiple canonical benchmarks
- Demonstrates qualitatively new capabilities
- Changes competitive dynamics significantly
- Likely to shift research directions

### Noteworthy Release
Two or more of:
- Achieves SOTA on a canonical benchmark
- Meaningfully improves on prior version
- Opens access that wasn't previously available
- Strong on a specific important capability

### Incremental Release
- Modest improvement on benchmarks
- Primarily packaging/accessibility improvement
- No qualitatively new capabilities
- Competitive but not leading

### Overhyped Release
One or more of:
- Claims unsupported by benchmark evidence
- Only shows cherry-picked examples
- Avoids comparison to established benchmarks
- Marketing significantly overstates technical reality

---

## Common Analysis Mistakes to Avoid

- **Trusting self-reported benchmarks** without checking for cherry-picking
- **Missing context** — a 90% score sounds great, but if human-level is 91% and GPT-4 scores 89%, it's not a breakthrough
- **Ignoring caveats** in technical reports
- **Anchoring to the headline** — read the methodology sections
- **Recency bias** — a release isn't major just because it's new
- **Conflating access with capability** — open-source is valuable but doesn't mean better performance
