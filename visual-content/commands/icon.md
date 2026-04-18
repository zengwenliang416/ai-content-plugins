---
description: Search and fetch SVG icons by keyword with local cache
argument-hint: "<keyword> [--topk N] [--no-cache]"
---

## Step 1: Parse Arguments

- First positional arg → search keyword (required). Accept Chinese or English.
- `--topk N` → number of icons (1–20, default 5).
- `--no-cache` → bypass cache, hit API directly.

If no keyword provided, ask: "What icon concept are you looking for? (e.g., security, cloud, 数据分析)"

## Step 2: Load Skill and Execute

Load the `icon-retrieval` skill.

## Artifact Handoff

**Output**: SVGs cached to `openspec/runtime/visuals/icons/_cache/`.

**Next step**: Downstream skills (`infographic-dsl`, `slide-generator`, `xhs-card`) can reference icons by local path.
