---
name: go-strategy-memo
description: "Draft a structured content strategy memo with situation analysis, strategic options, recommendation, risks, and next steps"
arguments:
  - name: input
    description: "Strategy topic, planning report path, or pipeline.openspec.json"
---

# Strategy Memo

## Step 1: Upstream Artifact Detection

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.growth_plan_md`, then `outputs.content_roi_md`, then `outputs.ops_report_md`.
   - If `$ARGUMENTS` is a strategy topic or report path, use it directly.
   - Then skip to Step 3.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.growth_plan_md`, `outputs.content_roi_md`, and `outputs.ops_report_md`.

3. **Auto-scan legacy strategy assets**:

```bash
ls -t openspec/runtime/growth-plan/*.md 2>/dev/null | head -3
ls -t openspec/runtime/content-roi/*.md 2>/dev/null | head -3
ls -t openspec/runtime/ops-report/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下策略素材，请选择要用于策略备忘录的输入："

4. **No upstream found**: Only in this case, ask for the strategic question or decision to address.

## Step 2: Language Selection

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 3: Gather Inputs

Collect from the user (or from prior analysis in the session):

- Strategic question or decision to address
- Relevant context (current account state, recent performance, market observations)
- Available options or approaches being considered
- Constraints (time, budget, audience sensitivity, platform rules)
- Stakeholders who will read or act on this memo
- Any prior decisions or commitments that constrain options

**Market and platform data** (via news-search CLI, 24h freshness enforced):

> **CONSTRAINT**: Execute all `news-search` commands via Bash. Do NOT substitute with WebSearch. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "[topic] trend" 10`
- Reddit: `${TS_RUNNER} news-search/scripts/search.ts reddit "[niche]" 10`
- Web: `${TS_RUNNER} news-search/scripts/search.ts web "[market topic]" 10`

## Step 4: Draft Memo Structure

Standard strategy memo format:

**I. Executive Summary** (half page)
- The strategic question
- Recommendation in one sentence
- Top 3 reasons for the recommendation
- Key risks and how they're addressed

**II. Situation Summary** (half to 1 page)
- What's happening and why this decision needs to be made now
- Relevant data or observations (account performance, audience signals, market trends)
- What happens if no decision is made

**III. Strategic Options** (1 page)
- 2-4 options considered
- For each option:
  - Description
  - Pros and cons
  - Estimated impact (audience growth, content quality, revenue, effort)
  - Key assumptions

**IV. Recommendation** (half page)
- Which option to pursue and why
- What specifically needs to happen
- Timeline and milestones

**V. Risks & Mitigants** (half page)
- Key risks ranked by severity and likelihood
- Mitigant or contingency for each
- Any dealbreaker risks that could change the recommendation

**VI. Next Steps**
- Concrete actions with owners and due dates
- What to review and when to reassess

## Step 5: Output Format

- Default: Structured document (Markdown)
- 1-2 pages for most decisions; up to 3 pages for complex strategy pivots
- Include tables for option comparison and risk assessment, not just prose

## Artifact Handoff

**Output**: Strategy memo saved to:
- `openspec/runtime/strategy-memo/YYYY-MM-DD-<topic>-strategy-memo.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/strategy-memo.md` (if contract/deep-research mode)

## Important Notes

- Strategy memos should be balanced — present real tradeoffs, not just advocacy
- Be direct about the recommendation — vague memos produce vague decisions
- Risks must be honest — downplaying risks undermines trust
- Tailor the level of detail to the decision's stakes and audience
- Ask for missing context rather than making assumptions about goals or constraints
- A good memo creates alignment and clarity, not just a record of thinking
