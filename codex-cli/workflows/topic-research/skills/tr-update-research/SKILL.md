---
name: tr-update-research
description: "Update an existing research document by finding new developments since the last update, identifying what changed, updating relevant sections, and producing a change log"
arguments:
  - name: input
    description: "Topic name, research file path, .openspec.json, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE any other interaction and BEFORE asking the user for update scope. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `outputs.research_md`, then `outputs.release_analysis_md`, then `inputs.topic`.
   - If argument is a research path or topic, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/release-analysis/*.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.research_md`, `outputs.release_analysis_md`, and `inputs.topic`.

3. **Auto-scan legacy research assets**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/deep-research/*/research.md 2>/dev/null | head -3
ls -t openspec/runtime/release-analysis/*.md 2>/dev/null | head -3
ls -t openspec/runtime/research-updates/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下研究文档，请选择要更新的输入：" with files as options.

4. **No upstream found**: Only in this case, ask which research document to update and where to find it.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Execute Research Update

Update an existing research document with the latest developments — new papers, product updates, market shifts, and new data — and produce a versioned change log.

### Step 2.1: Load and Assess the Existing Document

1. Read the existing research document
2. Note the document's **last updated date**
3. Identify the **topic and scope** covered
4. List the **sections present** and their current content
5. Note any existing gaps or areas marked for future update

### Step 2.2: Search for New Developments

Search for everything that has changed since the document's last update date:

**New papers**:
- arXiv: Search "[topic] since:[last-update-date]"
- Conference proceedings published since last update
- Industry technical reports and whitepapers

**Product and model updates**:
- New model releases or version updates from key players
- New product features or capabilities
- API changes or pricing updates
- New deployments or customers announced

**Market and business developments**:
- New funding rounds or acquisitions
- Revenue and growth data (from earnings calls)
- New competitors entering the space
- Partnership announcements

**Benchmark updates**:
- New SOTA results on canonical benchmarks
- New benchmarks introduced
- Prior results updated or corrected

**Policy and regulatory changes**:
- New regulations or guidelines
- Government reports or policy statements
- Industry self-regulatory actions

**Community and ecosystem updates**:
- Major open-source releases or updates
- Significant GitHub activity
- Community adoption data (downloads, stars)

**Platform sources** (via news-search CLI, 24h freshness enforced):

> **CONSTRAINT**: Execute all `news-search` commands via Bash tool. Do NOT substitute with Claude's built-in WebSearch. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "[topic] since:[last-update]" 20`
- Reddit: `${TS_RUNNER} news-search/scripts/search.ts reddit "[topic] new" 10`
- GitHub: `${TS_RUNNER} news-search/scripts/search.ts github "[topic]" 10`
- YouTube: `${TS_RUNNER} news-search/scripts/search.ts youtube "[topic] 2026" 5`

### Step 2.3: Identify What Changed

For each development found, classify:
- **Category**: Research / Product / Market / Benchmark / Policy / Community
- **Impact on existing content**: Which section(s) does this affect?
- **Change type**:
  - New addition (content to add)
  - Update (existing content to modify)
  - Correction (existing claim now outdated or wrong)
  - Deletion (content that is now irrelevant)
- **Significance**: High / Medium / Low

### Step 2.4: Update Relevant Sections

For each section that needs updating:
1. Quote the current text that needs changing
2. Write the updated replacement text
3. Note the source(s) for the update
4. Mark in change log

**Principles**:
- Update only what has changed — don't rewrite sections that are still current
- Preserve the original structure unless it no longer fits
- Add a "[UPDATED: date]" marker after updated paragraphs if helpful for version tracking
- If a claim is now outdated but the new information is uncertain, note both old and new

### Step 2.5: Produce Change Log

Document all changes made in a structured change log appended to the document.

## Output Format

Deliver the **complete updated document** with the change log appended at the end.

```markdown
[COMPLETE UPDATED DOCUMENT — all sections, with updates incorporated]

---

## Change Log

**Updated**: [Date]
**Previous version date**: [Last update date]
**Changes**: [N additions, N updates, N corrections, N deletions]

### Additions

| Section | What was added | Source | Date |
|---------|---------------|--------|------|
| [Section] | [Brief description] | [Source URL] | [Date] |

### Updates

| Section | What changed | Old claim | New claim | Source | Date |
|---------|-------------|-----------|-----------|--------|------|
| [Section] | [Brief description] | [Old text summary] | [New text summary] | [Source URL] | [Date] |

### Corrections

| Section | Error corrected | Correct information | Source | Date |
|---------|----------------|---------------------|--------|------|

### Deletions

| Section | What was removed | Reason |
|---------|-----------------|--------|

### No-change confirmation

Sections reviewed and confirmed current:
- [Section 1]: No changes needed
- [Section 2]: No changes needed
```

## Artifact Handoff

**Output**:
- Updated research file saved to the original path when possible.
- If generated as a new version, save to `openspec/runtime/research-updates/YYYY-MM-DD-<topic>-research-update.md`.

**OpenSpec contract (MANDATORY)**:

- Update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json` with:
  - `stage`: `topic-research`
  - `outputs.research_md`: updated research path
  - `outputs.research_update_md`: new update summary path (if generated)
  - `next.command`: `long-article`
  - `next.input`: updated research path or contract path

**Next step**: Suggest running a long-article skill to regenerate the draft with the latest research.

## Quality Standards

- Search window must start from document's last update date (don't re-research what's already covered)
- Every change must have a source citation
- Change log must be complete — no undocumented edits
- Sections confirmed unchanged must be listed (shows the review was thorough)
- If a section has major changes, consider flagging it for full Task 1 re-research
