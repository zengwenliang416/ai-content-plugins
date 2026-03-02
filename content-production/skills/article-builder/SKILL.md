---
name: article-builder
description: Write comprehensive long-form articles for blogs, newsletters, and editorial platforms. Triggers on "article", "long post", "blog post", "deep dive", "write about", "long-form".
---

# Article Builder

## Input Handling

> **CONSTRAINT — Upstream Artifact Auto-Detection is MANDATORY**: Before asking the user for article topics or starting from scratch, you MUST first scan for existing upstream artifacts. If found, present them to the user via AskUserQuestion for confirmation before using. Only ask the user for input when NO upstream artifact is found.

**Detection order** (stop at first hit):

1. **Explicit argument**: If user passes a file/directory path, use it directly

2. **Auto-scan deep-research**: Run this Bash command immediately:

```bash
ls -dt openspec/runtime/deep-research/*/ 2>/dev/null | head -3
```

If directories found → present them to the user via AskUserQuestion: "检测到以下深度研究产物，请选择一个作为文章素材：" with the directories as options (plus a "自定义话题" option).

3. **No upstream found**: Only in this case, proceed with fresh source gathering

**When a deep-research directory is loaded** (e.g., `openspec/runtime/deep-research/<slug>/`):

1. Read the directory contents
2. Load available research documents as source materials:
   - `research.md` → Background, technical overview, key players (Task 1)
   - `data-workbook.md` → Data tables, benchmarks, market data (Task 2)
   - `analysis.md` → Competitive analysis, narrative hooks, content recommendation (Task 3)
   - `images/chart_index.txt` → Available visuals and embedding syntax (Task 4)
3. Skip Step 1 source gathering for data already present in these documents
4. Use Task 3's narrative hooks and content angle as the article's thesis

**When a single file is provided** (e.g., a daily-brief or brainstorm output):

1. Read the file content as background reference
2. Proceed with Step 1 to gather additional materials as needed

---

## Workflow

### Step 1: Gather Source Materials

Ask for available inputs:

- Research documents, PDFs, or reference articles
- Data, statistics, or charts to include
- **Platform research** (via news-search CLI, 24h freshness enforced):

  > **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.
  - Twitter/X: `${TS_RUNNER} news-search/scripts/search.ts twitter "[article topic]" 10` — expert opinions and discourse
  - Reddit: `${TS_RUNNER} news-search/scripts/search.ts reddit "[article topic]" 10` — community perspectives
  - Web: `${TS_RUNNER} news-search/scripts/search.ts web "[article topic]" 10` — related articles and data sources
  - Read sources: `${TS_RUNNER} news-search/scripts/read.ts <url>` — extract content from references
  - See `news-search` skill for full platform reference.

- Key points or arguments that must be covered
- Target publication or platform (blog, newsletter, Medium, etc.)
- Target word count (default: 2,000-3,000 words)
- Tone (authoritative, conversational, technical, accessible)
- Target reader (expert, generalist, decision-maker, student)

### Step 2: Article Structure

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

### Step 3: Writing Guidelines

- **Lead with insights, not chronology** — the most interesting point goes first
- **Every claim needs evidence** — no unsupported assertions
- **Subheadings every 300 words** — readers scan before they read
- **Use analogies** to explain technical concepts to non-experts
- **Avoid jargon without explanation** — define terms on first use
- **Active voice throughout** — passive voice kills momentum
- **Vary sentence length** — short punchy sentences after long ones create rhythm
- **Data-driven** — specific numbers over vague superlatives

### Step 4: Output

- Markdown file (.md) for easy editing and publishing
- Optional: Word document (.docx) if print or formal publication needed
- Target 2,000-5,000 words depending on topic depth
- Include suggested title + 2 alternative titles
- Include meta description (150-160 characters) for SEO

## Output Persistence

**MANDATORY**: Save the article to file immediately after generation.

**Output path** (based on context):

- **With deep-research input**: `openspec/runtime/deep-research/<slug>/article.md` (alongside research docs)
- **Standalone**: `openspec/runtime/articles/YYYY-MM-DD-<slug>.md`

**Steps**:

1. Create output directory if not exists
2. Write the complete article with frontmatter to the file
3. If images directory exists (from deep-research), verify all image references resolve
4. Confirm save path to user

**Downstream consumers**: `cover-generator` reads the article for cover image generation. `md-to-html` converts the article to styled HTML.

---

## Important Notes

- The introduction must earn the read — if it's weak, nothing else matters
- Every section should answer: "Why should the reader care about this?"
- Use visuals or charts where data would be clearer as an image than as text
- Get the structure right before writing prose — a bad outline produces a bad article
- Articles that teach something specific outperform general overviews every time
