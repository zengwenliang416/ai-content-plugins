---
name: cp-collab-letter
description: "Draft collaboration and outreach messages for creator partnerships, brand deals, and content co-production"
arguments:
  - name: input
    description: "Target person/brand, support brief path, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY)

Complete this step BEFORE any other interaction.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `pipeline.openspec.json`, read it first and prioritize `outputs.audience_review_md`, then `outputs.ops_report_md`, then `inputs.partner`.
   - If `$ARGUMENTS` is a target person/brand or source path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.audience_review_md`, `outputs.ops_report_md`, and `inputs.partner`.

3. **Auto-scan legacy outreach assets**:

```bash
ls -t openspec/runtime/audience-review/*.md 2>/dev/null | head -3
ls -t openspec/runtime/ops-report/*.md 2>/dev/null | head -3
ls -t openspec/runtime/collab-letter/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下合作外联素材，请选择要用于合作信的输入：" with files as options.

4. **No upstream found**: Only in this case, ask who they want to reach out to and what collaboration they are proposing.

## Language Selection (MANDATORY)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Core Workflow

### Identify the Target

- Name and handle of the person or brand
- Their content focus and audience size (if known)
- Type of collaboration proposed:
  - Content co-creation (joint article, video, podcast)
  - Cross-promotion or shoutout exchange
  - Brand sponsorship or product feature
  - Expert quote or interview request
  - Guest post or newsletter swap
- What the sender brings (audience, reach, expertise, production)

### Research Their Content

Before drafting, review:
- Their recent posts or articles (last 2-4 weeks)
- What topics they focus on
- Their tone and communication style
- Any prior collaboration or public engagement
- Mutual connections or shared audience

This research makes the message specific — generic outreach gets ignored.

### Draft the Message

**Structure:**

1. **Opening (1-2 sentences)**: Who you are, with one specific reference to their work ("I read your piece on X last week — the point about Y resonated.")
2. **Why them (1 sentence)**: Why you're reaching out to them specifically, not anyone else
3. **The pitch (2-3 sentences)**: What you're proposing, what it looks like, why it's good for both sides
4. **Mutual benefit (1 sentence)**: Be explicit about what they get (reach, content, exposure, payment)
5. **CTA (1 sentence)**: Clear, low-friction next step ("Would a 15-minute call make sense?")

**Tone guidelines:**
- Professional but warm — write like a peer, not a fan or a salesperson
- Specific not generic — one reference to their actual work is worth ten compliments
- Short — under 150 words for cold outreach; if they know you, slightly longer is fine
- No pressure — leave them an easy exit ("No worries if the timing isn't right")

### Output

- Ready-to-send message (email or DM format as appropriate)
- Subject line (for email): Specific, not clickbait ("Collaboration idea — [their topic] + [your topic]")
- Optional: 2 alternative opening lines to choose from

## Artifact Handoff

**Output path**:

- `openspec/runtime/collab-letter/YYYY-MM-DD-<target>-collab-letter.md` (standalone mode)
- `openspec/runtime/deep-research/<slug>/collab-letter.md` (pipeline mode)

**OpenSpec contract (MANDATORY)**:

- Standalone: create or update a stage-local `*.openspec.json` contract.
- Pipeline: update `pipeline.openspec.json` in-place with `stage: content-production`, `outputs.collab_letter_md`, `next.command: /growth-ops:collab-prep`.

## Important Notes

- Generic flattery ("I love your content!") signals a mass outreach — always be specific
- Lead with what you can offer, not what you want from them
- If reaching out cold, keep it under 100 words — respect their time
- Follow up once after 5-7 days if no response; do not follow up more than twice
- Track who received messages, when sent, and response — becomes the outreach log
- Coordinate timing — avoid reaching out during their busiest publishing windows
