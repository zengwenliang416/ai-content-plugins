---
name: article-builder
description: Write comprehensive long-form articles for blogs, newsletters, and editorial platforms. Triggers on "article", "long post", "blog post", "deep dive", "write about", "long-form".
---

# Article Builder

## Workflow

### Step 1: Gather Source Materials

Ask for available inputs:
- Research documents, PDFs, or reference articles
- Data, statistics, or charts to include
- **Platform research** (24h freshness enforced | `bun news-search/scripts/doctor.ts` for status):
  - Twitter/X: `bun news-search/scripts/search.ts twitter "[article topic]" 10` — expert opinions and discourse
  - Reddit: `bun news-search/scripts/search.ts reddit "[article topic]" 10` — community perspectives
  - Web: `bun news-search/scripts/search.ts web "[article topic]" 10` — related articles and data sources
  - Read sources: `bun news-search/scripts/read.ts <url>` — extract content from references
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

## Important Notes

- The introduction must earn the read — if it's weak, nothing else matters
- Every section should answer: "Why should the reader care about this?"
- Use visuals or charts where data would be clearer as an image than as text
- Get the structure right before writing prose — a bad outline produces a bad article
- Articles that teach something specific outperform general overviews every time
