---
name: cp-long-article
description: "Write comprehensive long-form articles for blogs, newsletters, and editorial platforms"
arguments:
  - name: input
    description: "Topic, outline, deep-research path, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY)

Complete this step BEFORE any other interaction.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `pipeline.openspec.json`, read `outputs.article_md` and related context first.
   - Otherwise use the provided path/topic directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If files found, present them to the user and prefer contract-driven continuation.

3. **Auto-scan deep-research output**:

```bash
ls -dt openspec/runtime/deep-research/*/ 2>/dev/null | head -3
```

If directories found, ask the user: "检测到以下深度研究产物，请选择一个作为文章素材：" with the directories as options (plus "自定义话题" option).

4. **No upstream found**: Only in this case, ask the user for a topic or outline.

## Language Selection (MANDATORY)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Core Workflow

### Input Handling

**When a deep-research directory is loaded** (e.g., `openspec/runtime/deep-research/<slug>/`):

1. Read the directory contents
2. Load available research documents as source materials:
   - `research.md` — Background, technical overview, key players
   - `data-workbook.md` — Data tables, benchmarks, market data
   - `analysis.md` — Competitive analysis, narrative hooks, content recommendation
   - `images/chart_index.txt` — Available visuals and embedding syntax
3. Skip source gathering for data already present in these documents
4. Use analysis narrative hooks and content angle as the article's thesis

**When a single file is provided**: Read the file content as background reference and gather additional materials as needed.

### Gather Source Materials

- Research documents, PDFs, or reference articles
- Data, statistics, or charts to include
- **Platform research** (via news-search CLI, 24h freshness enforced):

  > Execute all `news-search` commands via Bash. Resolve script path from project root: `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.
  - Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "[article topic]" 10`
  - Reddit: `${TS_RUNNER} news-search/scripts/search.ts reddit "[article topic]" 10`
  - Web: `${TS_RUNNER} news-search/scripts/search.ts web "[article topic]" 10`
  - Read sources: `${TS_RUNNER} news-search/scripts/read.ts <url>`

- Key points or arguments that must be covered
- Target publication or platform (blog, newsletter, Medium, etc.)
- Target word count (default: 2,000-3,000 words)
- Tone (authoritative, conversational, technical, accessible)
- Target reader (expert, generalist, decision-maker, student)

### Article Structure

**I. Introduction / Hook** (150-250 words)

- Open with a question, statistic, or provocative claim
- Establish why this topic matters right now
- State the article's thesis and what the reader will learn
- Do not bury the lead — the value proposition must be clear in paragraph 1

**II. Background / Context** (300-500 words)

- What does the reader need to know to follow the analysis
- Define key terms without being condescending
- Brief history or current state of the topic
- Frame the problem or opportunity being explored

**III. Main Analysis** (800-1,500 words)

- 3-5 sections, each with a clear subheading
- Each section: one main point, supporting evidence, implication
- Use data, examples, and analogies to make abstract ideas concrete
- Build toward a conclusion — each section should lead naturally to the next

**IV. Practical Implications** (200-400 words)

- What does this mean for the reader specifically
- Concrete actions, decisions, or mindset shifts the reader should take
- Address the "so what" explicitly

**V. Future Outlook** (150-300 words)

- Where is this heading in 1-3 years
- Open questions that remain unresolved
- What to watch for

**VI. Conclusion** (100-200 words)

- Restate the core thesis in light of the evidence presented
- 3-5 key takeaways in bullet format
- Call to action (share, subscribe, try X, contact)

**VII. References & Sources**

- All claims backed by citations
- Format: [Author/Publication, Year, "Title" or URL]

### Writing Guidelines

- **Lead with insights, not chronology** — the most interesting point goes first
- **Every claim needs evidence** — no unsupported assertions
- **Subheadings every 300 words** — readers scan before they read
- **Use analogies** to explain technical concepts to non-experts
- **Avoid jargon without explanation** — define terms on first use
- **Active voice throughout** — passive voice kills momentum
- **Vary sentence length** — short punchy sentences after long ones create rhythm
- **Data-driven** — specific numbers over vague superlatives

### Output

- Markdown file (.md) for easy editing and publishing
- Target 2,000-5,000 words depending on topic depth
- Include suggested title + 2 alternative titles
- Include meta description (150-160 characters) for SEO

## Artifact Handoff

**Output path**:

- `openspec/runtime/deep-research/<slug>/article.md` (if using deep-research input)
- `openspec/runtime/articles/YYYY-MM-DD-<slug>.md` (if standalone)

Save the article immediately after generation. Create output directory if not exists. If images directory exists (from deep-research), verify all image references resolve.

**OpenSpec contract (MANDATORY)**:

- Standalone: create or update a stage-local `*.openspec.json` contract.
- Pipeline: update `pipeline.openspec.json` in-place with `stage: content-production`, `outputs.article_md`, `next.command: /content-utilities:markdown-to-html`.

**Downstream consumers**: `cover-generator` reads the article for cover image generation. `md-to-html` converts the article to styled HTML.

## Important Notes

- The introduction must earn the read — if it's weak, nothing else matters
- Every section should answer: "Why should the reader care about this?"
- Use visuals or charts where data would be clearer as an image than as text
- Get the structure right before writing prose — a bad outline produces a bad article
- Articles that teach something specific outperform general overviews every time
