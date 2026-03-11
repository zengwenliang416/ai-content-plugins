---
name: am-cleanup
description: "Identify and clean up underperforming content"
arguments:
  - name: input
    description: "Content inventory path, performance data, or pipeline.openspec.json"
---

# Content Cleanup

## Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: Complete this step BEFORE any analysis and BEFORE asking the user for cleanup scope.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.performance_report_md`, then `outputs.content_plan_md`, then `outputs.content_rebalance_md`.
   - If `$ARGUMENTS` is a file path or cleanup scope, use it directly.
   - Then skip to the Workflow section.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.performance_report_md`, `outputs.content_plan_md`, and `outputs.content_rebalance_md`.

3. **Auto-scan legacy cleanup assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/content-plan/*.md 2>/dev/null | head -3
ls -t openspec/runtime/content-rebalance/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下内容治理素材，请选择要用于清理分析的输入：" with files as options.

4. **No upstream found**: Only in this case, ask the user for content inventory and performance metrics.

## Language Selection (MANDATORY — after upstream detection)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Workflow

### Step 1: Identify Candidates

Scan published content for pieces that may need action:

**Underperformance signals:**
- Views or engagement significantly below account average (bottom 20%)
- Engagement rate below half the account average
- Content older than 12-18 months with no recent engagement

**Quality issues:**
- Outdated information, superseded by newer posts or events
- Factual errors or claims that no longer hold
- Poor formatting, broken links, or missing images
- Thin content with no unique perspective or value

**Relevance issues:**
- Topics no longer aligned with the creator's current niche
- Content that attracts the wrong audience segment
- Posts that create confusion or dilute brand positioning

Candidate list:

| Title/Description | Platform | Published Date | Views | Engagement Rate | Issue Type |
|-----------------|----------|----------------|-------|-----------------|-----------|
| | | | | | Underperformance / Outdated / Off-niche |

### Step 2: Categorize Actions

For each candidate, assign an action:

| Action | When to Use |
|--------|-------------|
| **Update** | Core topic is still relevant but information is outdated or quality is low |
| **Merge** | Multiple thin posts on the same topic that should be consolidated into one strong piece |
| **Archive** | Content with no value to current audience but worth preserving (off-platform, private, or unlisted) |
| **Delete** | Factually wrong, harmful, severely off-brand, or provides zero value |

Cleanup action list:

| Title | Action | Reason | Estimated Effort | Priority |
|-------|--------|--------|-----------------|----------|
| | Update | Outdated stats | 1 hour | High |
| | Merge with [X] | Duplicate coverage | 2 hours | Medium |
| | Archive | Off-niche | 5 min | Low |
| | Delete | Factually wrong | 5 min | High |

### Step 3: Estimate Effort and Impact

For each action:

**Update**: How much work is required? (light edit vs. full rewrite)
**Merge**: Which posts to combine; which URL/title to keep as canonical
**Archive**: Where will it be archived? Off platform? Unlisted?
**Delete**: Any SEO or traffic implications from removing a URL?

Impact estimate:
- What improvement in content quality or audience experience is expected?
- For updates: will this recover traffic or engagement on the piece?
- For merges: will the consolidated post rank better for the topic?

### Step 4: Prioritized Cleanup Plan

Sequence actions by priority:

| Priority | Action | Title | Effort | Expected Impact |
|----------|--------|-------|--------|----------------|
| 1 | Delete | | 5 min | Remove harmful/wrong content |
| 2 | Update | | 2 hrs | Recover traffic on key topic |
| 3 | Merge | | 3 hrs | Consolidate authority |
| 4 | Archive | | 15 min | Tidy platform |

**Batching recommendation**: Group similar actions (e.g., all deletes in one session, all updates in a dedicated writing session).

### Step 5: Output

Cleanup action list:
1. **Full candidate table**: All pieces reviewed with issue type
2. **Action categorization**: Update / Merge / Archive / Delete with rationale
3. **Prioritized plan**: Ordered by urgency and impact
4. **Effort summary**: Total estimated hours to complete cleanup
5. **Review schedule**: When to run the next audit (recommend quarterly)

## Artifact Handoff

**Output**: Cleanup plan saved to:

- `openspec/runtime/content-cleanup/YYYY-MM-DD-content-cleanup.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/content-cleanup.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.
- Update with:
  - `stage`: `audience-management`
  - `outputs.content_cleanup_md`: cleanup plan path
  - `next.command`: `am-content-plan`
  - `next.input`: cleanup plan path or contract path

**Next step**: Suggest running `am-content-plan` to apply cleanup decisions into the next cycle.

## Important Notes

- Deleting content has potential SEO implications — check if the URL receives any search traffic before removing
- When merging posts, redirect the removed URL to the canonical post if on a website
- Don't delete content just because it's old — age alone is not a reason; look at ongoing engagement
- Avoid mass deletions at once — make changes gradually and monitor traffic impact
- Update high-priority posts first — those with existing authority that can recover with fresh content
- Archive is preferable to delete when uncertain — reversible and less risky
- Run cleanup quarterly or bi-annually; monthly is excessive for most creators
