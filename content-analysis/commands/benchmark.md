---
description: Benchmark content against top performers in a niche
argument-hint: "[niche/topic, comparison file path, or pipeline.openspec.json]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for benchmark scope. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, then `outputs.performance_report_md`, then `inputs.topic`.
   - If argument is a niche/topic or file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t ai-content-output/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found → read and prioritize `outputs.article_md`, `outputs.performance_report_md`, and `inputs.topic`.

3. **Auto-scan legacy benchmark inputs**: Run these Bash commands immediately:

```bash
ls -t ai-content-output/articles/*.md 2>/dev/null | head -3
ls -t ai-content-output/performance-analysis/*.md 2>/dev/null | head -3
ls -t ai-content-output/benchmark/*.md 2>/dev/null | head -3
```

If files found → present them to the user via AskUserQuestion: "检测到以下 benchmark 素材，请选择要用于对标分析的输入：" with files as options.

4. **No upstream found**: Only in this case, ask what niche or topic to benchmark.

## Step 2: Load Skill and Execute

Load the `content-benchmark` skill and benchmark content performance against top performers in the specified niche.

## Artifact Handoff

**Output**: Benchmark report saved to:

- `ai-content-output/benchmark/YYYY-MM-DD-<niche>-benchmark.md` (standalone mode)
- `ai-content-output/deep-research/<slug>/benchmark.md` (if contract/deep-research mode)

**OpenSpec contract update (RECOMMENDED when contract exists)**:

- Update `ai-content-output/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `content-analysis`
  - `outputs.benchmark_md`: benchmark report path
  - `next.command`: `/content-production:long-article`
  - `next.input`: benchmark report path or contract path

**Next step**: Suggest running `/content-production:long-article` to apply benchmark patterns in the next draft.
