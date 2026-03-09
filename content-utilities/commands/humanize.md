---
description: Remove AI writing patterns and make text sound natural and human-written
argument-hint: "[markdown path or pipeline.openspec.json]"
---

## Step 1: Upstream Artifact Detection (MANDATORY -- before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE loading the skill and BEFORE asking the user for input. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, then `outputs.research_md`, then `outputs.analysis_md`.
   - If argument is a markdown/text path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.article_md`.

3. **Auto-scan articles**:

```bash
ls -t openspec/runtime/deep-research/*/*.md 2>/dev/null | head -5
```

4. **Ask user**: Only if ALL auto-scans returned empty.

## Step 2: Load the humanizer skill

Read and follow the full SKILL.md at `content-utilities/skills/humanizer/SKILL.md`.

Apply the humanizer process to the detected input text.

## Step 3: Output

Write the humanized text to `{original_filename}-humanized.md` in the same directory as the input.
