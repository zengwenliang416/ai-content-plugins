---
name: research-updater
description: "Update an existing research document by finding new developments since the last update, identifying what changed, updating relevant sections, and producing a change log"
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebSearch
  - WebFetch
  - AskUserQuestion
---

# Research Updater

Update an existing research document with the latest developments — new papers, product updates, market shifts, and new data — and produce a versioned change log.

## Overview

The research updater keeps existing research documents current without requiring a full rebuild from scratch. It identifies what has changed since the last update, updates only the affected sections, and documents all changes.

**Output**: Updated research document with change log appended

---

## Workflow

### Step 1: Load and Assess the Existing Document

1. Read the existing research document
2. Note the document's **last updated date**
3. Identify the **topic and scope** covered
4. List the **sections present** and their current content
5. Note any existing gaps or areas marked for future update

### Step 2: Search for New Developments

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

> **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "[topic] since:[last-update]" 20` — recent announcements
- Reddit: `${TS_RUNNER} news-search/scripts/search.ts reddit "[topic] new" 10` — community discussions
- GitHub: `${TS_RUNNER} news-search/scripts/search.ts github "[topic]" 10` — new repos and releases
- YouTube: `${TS_RUNNER} news-search/scripts/search.ts youtube "[topic] 2026" 5` — recent talks and demos
- See `news-search` skill for full platform reference.

### Step 3: Identify What Changed

For each development found, classify:
- **Category**: Research / Product / Market / Benchmark / Policy / Community
- **Impact on existing content**: Which section(s) does this affect?
- **Change type**:
  - New addition (content to add)
  - Update (existing content to modify)
  - Correction (existing claim now outdated or wrong)
  - Deletion (content that is now irrelevant)
- **Significance**: High / Medium / Low

### Step 4: Update Relevant Sections

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

### Step 5: Produce Change Log

Document all changes made in a structured change log appended to the document.

---

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

---

## Quality Standards

- Search window must start from document's last update date (don't re-research what's already covered)
- Every change must have a source citation
- Change log must be complete — no undocumented edits
- Sections confirmed unchanged must be listed (shows the review was thorough)
- If a section has major changes, consider flagging it for full Task 1 re-research
