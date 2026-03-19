---
name: asset-pack
description: Bundle content assets — research, images, data, references — into an organized package for an article, series, or campaign. Triggers on "asset pack", "bundle", "package materials", "gather resources", "content bundle".
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebFetch
  - WebSearch
  - AskUserQuestion
---

# Asset Pack

## Workflow

### Step 1: Identify the Content Project

- Article title or content series name
- Publication date or deadline
- Formats needed (text, images, data files, video thumbnails)
- Who will use the asset pack (writer, designer, editor, social media manager)

### Step 2: Collect Assets

Gather all materials needed to produce the content:

**Research assets**
- Reference articles and source URLs
- Academic papers or reports (with page references for key claims)
- Interview transcripts or quotes (with speaker attribution)
- Data exports or spreadsheets

**Visual assets**
- Charts or graphs (raw data files + rendered images)
- Photography or stock images (with license information)
- Brand logos or icons needed
- Previous infographics or slides to reference

**Reference materials**
- Competitor or peer content on the same topic
- Brand voice guide or style sheet
- Previous articles in the same series
- Audience feedback or comments to address

### Step 3: Organize the Package

Structure the asset pack folder:

```
[project-name]/
├── README.md          # Summary of the project and how to use this pack
├── research/          # Source articles, PDFs, notes
├── data/              # Raw data files, spreadsheets
├── images/            # Photos, charts, illustrations
├── references/        # Citation list with full source details
└── brief.md           # Content brief: angle, audience, key points to cover
```

**README.md should include:**
- Project overview (1 paragraph)
- Publishing date and platform
- Key messages to communicate (3-5 bullet points)
- Assets inventory (what's in each folder)
- Outstanding gaps (what's still needed)

### Step 4: Validate Completeness

Before handing off the pack, check:

- [ ] All citations have full source details (author, publication, date, URL)
- [ ] All images have license info (Creative Commons, purchased, original)
- [ ] Data files have source and collection date noted
- [ ] No broken links in reference list
- [ ] Content brief clearly states the angle and target audience
- [ ] Outstanding gaps are explicitly documented

### Output

- Organized folder structure with all assets
- README.md with project context and inventory
- Citations document in standard format:
  `[Author/Publication] (Year). "[Title]". URL. Accessed [date].`

## Important Notes

- A well-organized asset pack saves hours in production — invest the time upfront
- Track where every piece of data came from — fact-checkers and editors will ask
- Image licenses matter — document commercial use rights for any visuals used publicly
- Update the pack as new assets are added — don't let it go stale mid-project
- The asset pack becomes the source of truth for the content — keep it current
