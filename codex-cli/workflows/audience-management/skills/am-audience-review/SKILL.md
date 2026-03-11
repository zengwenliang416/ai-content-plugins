---
name: am-audience-review
description: "Review and analyze audience demographics and behavior"
arguments:
  - name: input
    description: "Platform name, audience report path, or pipeline.openspec.json"
---

# Audience Review

## Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: Complete this step BEFORE any analysis and BEFORE asking the user for details.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.ops_report_md`, then `outputs.performance_report_md`, then `inputs.platform`.
   - If `$ARGUMENTS` is a platform or report path, use it directly.
   - Then skip to the Workflow section.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.ops_report_md`, `outputs.performance_report_md`, and `inputs.platform`.

3. **Auto-scan legacy audience assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/ops-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/performance-report/*.md 2>/dev/null | head -3
```

If files found, present them to the user: "检测到以下受众分析素材，请选择要用于受众复盘的输入：" with files as options.

4. **No upstream found**: Only in this case, ask which platforms to analyze and what audience data is available.

## Language Selection (MANDATORY — after upstream detection)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Workflow

### Step 1: Audience Context

Gather or confirm:
- **Platforms**: Which platforms to analyze
- **Data available**: Native platform analytics, third-party tools, direct survey/DM feedback
- **Creator's niche**: Topic area and intended audience profile
- **Prior review**: Any prior audience analysis to compare against

### Step 2: Demographics Analysis

For each platform (use available data):

**Core demographics:**
- Age distribution (if available)
- Gender breakdown
- Geographic distribution (top countries/regions/cities)
- Language breakdown (if multilingual audience)

**Platform-specific insights:**
- When is the audience most active? (peak days and times)
- How do they discover content? (search, explore/feed, direct, referral)
- Device usage (mobile vs. desktop)

### Step 3: Audience Segmentation

Segment the audience by behavior:

**By engagement level:**
| Segment | Description | Estimated % | Value |
|---------|-------------|-------------|-------|
| Core fans | Comment, share, DM regularly | | Highest — community builders |
| Engaged followers | Like and occasionally comment | | High — content amplifiers |
| Passive followers | View but rarely interact | | Medium — reach contributors |
| Dormant | Followed but inactive | | Low — may need re-engagement |

**By content preference** (based on top-performing content analysis):
- Which topics drive the most engagement from which segments?
- Which formats attract new followers vs. retain existing ones?

**By platform:**
- Does the audience behave differently across platforms?
- Are there platform-specific communities worth nurturing separately?

### Step 4: Audience Personas

Create 2-4 audience persona cards based on the data:

**Persona template:**
- **Name**: (fictional but representative)
- **Demographics**: Age range, location, occupation
- **Why they follow**: What value they get from the content
- **Favorite content**: Topics and formats they engage with most
- **Platform**: Where they're most active
- **Engagement behavior**: Lurker, commenter, sharer, buyer

### Step 5: Opportunities & Gaps

Identify:
- **Most valuable segments**: Who drives the most engagement, shares, and conversions
- **Underserved segments**: Audience groups with unmet needs the creator could address
- **Content-audience mismatches**: Topics being published that don't resonate with any clear segment
- **Growth opportunities**: Adjacent audience segments that the current content could attract

### Step 6: Output

Audience review document with:
1. **Demographics summary** by platform
2. **Segmentation table** with engagement tier breakdown
3. **Persona cards** (2-4 representative audience profiles)
4. **Key insights**: What the audience analysis reveals about content strategy
5. **Recommendations**: Content and engagement tactics tailored to audience profile

## Artifact Handoff

**Output**: Audience review saved to:

- `openspec/runtime/audience-review/YYYY-MM-DD-<platform>-audience-review.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/audience-review.md` (if contract/deep-research mode)

**OpenSpec contract (MANDATORY)**:

- Create or update a stage-local `*.openspec.json` contract for this command run when standalone mode is used.
- If `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` exists, update it in-place for cross-stage traceability.
- Update with:
  - `stage`: `audience-management`
  - `outputs.audience_review_md`: audience review path
  - `next.command`: `am-content-plan`
  - `next.input`: audience review path or contract path

**Next step**: Suggest running `am-content-plan` to turn audience findings into an executable calendar.

## Important Notes

- Platform analytics vary in depth — work with what's available and note data limitations
- Engagement quality matters more than follower count — a smaller, highly engaged audience has more value
- Audience demographics should inform content strategy, not constrain it
- Track audience changes period over period — shifts in demographics signal content evolution
- Supplement platform data with qualitative signals: DMs, comments, survey responses
- For brand proposals, audience demographics are the key value metric — ensure data is accurate
