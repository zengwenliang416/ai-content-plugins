---
name: cp-asset-pack
description: "Bundle content assets into an organized package for articles, series, or campaigns"
arguments:
  - name: input
    description: "Project brief, asset paths, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY)

Complete this step BEFORE any other interaction.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `pipeline.openspec.json`, read it first and prioritize `outputs.article_md`, then `outputs.cover_image`, then `outputs.illustrations_dir`.
   - If `$ARGUMENTS` is a project brief or asset path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `outputs.article_md`, `outputs.cover_image`, and `outputs.illustrations_dir`.

3. **Auto-scan legacy asset inputs**:

```bash
ls -t openspec/runtime/deep-research/*/article.md 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/images/cover.png 2>/dev/null | head -3
ls -dt openspec/runtime/deep-research/*/images 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下素材，请选择要打包的输入：" with files/directories as options.

4. **No upstream found**: Only in this case, ask for project details, deadline, and needed asset types.

## Language Selection (MANDATORY)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Core Workflow

### Identify the Content Project

- Article title or content series name
- Publication date or deadline
- Formats needed (text, images, data files, video thumbnails)
- Who will use the asset pack (writer, designer, editor, social media manager)

### Collect Assets

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

### Organize the Package

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

### Validate Completeness

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

## Artifact Handoff

**Output path**:

- `openspec/runtime/asset-pack/YYYY-MM-DD-<project>-asset-pack.zip` (standalone mode)
- `openspec/runtime/deep-research/<slug>/asset-pack.zip` (pipeline mode)

**OpenSpec contract (MANDATORY)**:

- Standalone: create or update a stage-local `*.openspec.json` contract.
- Pipeline: update `pipeline.openspec.json` in-place with `stage: content-production`, `outputs.asset_pack_zip`, `next.command: /publishing:post-to-wechat`.

## Important Notes

- A well-organized asset pack saves hours in production — invest the time upfront
- Track where every piece of data came from — fact-checkers and editors will ask
- Image licenses matter — document commercial use rights for any visuals used publicly
- Update the pack as new assets are added — don't let it go stale mid-project
- The asset pack becomes the source of truth for the content — keep it current
