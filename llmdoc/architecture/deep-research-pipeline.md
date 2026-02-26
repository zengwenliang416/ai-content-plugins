# Deep Research Pipeline Architecture

The deep research pipeline is the flagship workflow of the `topic-research` plugin. It produces publication-ready AI topic articles through a strict 5-task sequential process, each task gated by user review before advancing.

## Pipeline Overview

The pipeline transforms a topic name into a 3,000--8,000 word article with 15--25 embedded visuals and 8--15 data tables. Five tasks execute in strict single-task mode -- one task per user request, one deliverable per task.

| Task | Name | Output | Word/File Target |
|------|------|--------|-----------------|
| 1 | Topic Research | `.md` research document | 6,000--8,000 words |
| 2 | Data Compilation | `.xlsx` workbook (6 tabs) | 6 complete tabs |
| 3 | Analysis & Synthesis | `.md` analysis + 4 Excel tabs added | 4--6 pages |
| 4 | Visual Asset Generation | `.zip` of 15--25 PNG/JPG at 300 DPI | 15--25 files |
| 5 | Article Assembly | `.md` or `.docx` final article | 3,000--8,000 words |

Entry point: `SKILL.md` at `topic-research/skills/deep-research/SKILL.md`.

## Task Dependency Graph

```
Task 1 (Topic Research)       Task 2 (Data Compilation)
    │  independent                │  independent
    │                             │
    │                             ▼
    │                        Task 3 (Analysis & Synthesis)
    │                             │  requires Task 2
    │                             ▼
    └────────────────────►  Task 4 (Visual Asset Generation)
                                  │  requires Tasks 1, 2, 3
                                  ▼
                            Task 5 (Article Assembly)
                                     requires Tasks 1, 2, 3, 4
```

Tasks 1 and 2 are independent -- they can run in either order. Tasks 3--5 have strict sequential dependencies. Each task verifies prerequisites before starting; if any prerequisite is missing, the task stops immediately and reports which prior tasks need completion.

## Single-Task Execution Model

The pipeline enforces a one-task-at-a-time contract:

- Execute exactly one task per user request.
- Deliver task outputs and confirm completion.
- Wait for the user to explicitly request the next task.
- Never chain multiple tasks or assume the user wants to proceed.

When a user requests the full pipeline (e.g., "create a deep research article on X"), the skill asks which task to start with rather than running anything automatically. This design ensures quality control and review at each gate.

## Deliverables Policy

Each task produces exactly one deliverable. Extra outputs are explicitly prohibited -- no completion summaries, executive summaries, quick reference guides, or any "helpful" supplementary documents.

| Task | Deliverable | File Pattern |
|------|-------------|-------------|
| 1 | Research document | `[Topic]_Research_Document_[Date].md` |
| 2 | Data workbook | `[Topic]_Data_Workbook_[Date].xlsx` |
| 3 | Analysis document + 4 Excel tabs appended to Task 2 file | `[Topic]_Analysis_[Date].md` |
| 4 | Visual assets zip (includes `chart_index.txt`) | `[Topic]_Visuals_[Date].zip` |
| 5 | Final article | `[Topic]_Article_[Date].md` |

## Task Details

### Task 1: Topic Research

Produces a 6,000--8,000 word qualitative research document covering: technology overview, development timeline, technical deep dive, key players and products, applications and use cases, competitive landscape, and risks and challenges.

Data sources: arXiv papers, conference proceedings, company research blogs, GitHub repositories, HuggingFace, tech media, and industry analyst reports.

The research workflow has 7 steps: initial landscape survey, background and history research, key players research, technical deep dive, applications and use cases, risk and challenge assessment, and synthesis/writing. Detailed instructions live in `references/task1-topic-research.md`.

### Task 2: Data Compilation

Produces a 6-tab Excel workbook with quantitative data:

1. **Market Data** -- market size estimates, growth projections, adoption rates with source citations
2. **Player Comparison** -- feature comparison matrix across 5--10 major players
3. **Technical Benchmarks** -- performance metrics from Papers With Code, arXiv, and official leaderboards
4. **Adoption Metrics** -- usage stats, GitHub stars, HuggingFace downloads, job posting trends
5. **Timeline** -- chronological milestones with event type, significance rating, and source URLs
6. **Scenarios** -- Optimistic/Base/Pessimistic projections with key assumptions

Every data point requires a source citation. Missing data is marked "N/A -- not publicly disclosed" rather than fabricated. Detailed instructions live in `references/task2-data-compilation.md`.

### Task 3: Analysis & Synthesis

Consumes the Task 2 workbook and produces two outputs: a 4--6 page analysis document (`.md`) and 4 new tabs appended to the existing Excel workbook (Comparative Analysis, Trajectory Forecast, Recommendation Summary, Talking Points).

The analysis uses a four-dimension comparative framework: Technical Capability, Ecosystem & Access, Commercial Position, and Research Pipeline. Each player receives a structured assessment with strengths, weaknesses, moat, and threat.

The central output is a content recommendation: **WRITE**, **MONITOR**, or **SKIP**. This framework also identifies 3--5 narrative hooks for use in the final article. Detailed instructions live in `references/task3-analysis.md`.

### Task 4: Visual Asset Generation

Produces 15--25 professional chart files (PNG/JPG, 300 DPI) packaged in a zip with a `chart_index.txt` manifest.

**4 mandatory visuals** (must always be present):
- `chart_01`: Development timeline (horizontal timeline diagram)
- `chart_05`: Performance benchmarks (bar or line chart)
- `chart_09`: Market size / adoption trend (area or line chart)
- `chart_14`: Competitive positioning map (2x2 or scatter plot)

The remaining required visuals span 6 categories: timeline and history, technical, players and ecosystem, market and adoption, competitive landscape, and forward-looking projections. Up to 10 optional visuals can extend coverage to the 25-chart maximum.

Task 5 embeds all generated visuals at a density of 1 visual per 300--500 words. The `chart_index.txt` includes placement suggestions mapping each chart to an article section. Detailed instructions live in `references/task4-visual-generation.md`.

### Task 5: Article Assembly

Consumes all prior task outputs and produces the final publication-ready article (3,000--8,000 words, 15--25 embedded visuals, 8--15 data tables).

The article follows an 8-section structure defined in `assets/article-template.md`:

1. Hook & Why It Matters (300--500 words)
2. What It Is -- Technical Overview (600--1,000 words)
3. How It Got Here -- Development History (400--700 words)
4. The Landscape -- Key Players & Approaches (800--1,200 words)
5. The Numbers -- Data & Benchmarks (500--800 words)
6. What's Next -- Trajectory & Scenarios (400--600 words)
7. Risks & Watch-outs (400--600 words)
8. Takeaways & Content Angle (200--300 words)

Writing principles: narrative-driven (use Task 3 hooks as editorial spine), data-backed (reference Task 2 workbook throughout), visually rich (embed all Task 4 charts), and publication-ready on first delivery. A final quality checklist lives in `assets/quality-checklist.md`. Detailed instructions live in `references/task5-article-assembly.md`.

## MCP Integration

The `topic-research` plugin declares three MCP servers in `.mcp.json`:

| MCP Server | Package | Purpose |
|------------|---------|---------|
| `hacker-news` | `mcp-hacker-news` | Real-time Hacker News stories and discussions |
| `arxiv` | `arxiv-mcp-server` | Academic paper search on arXiv |
| `rss-reader` | `@kwp-lab/rss-reader-mcp` | RSS feed aggregation from AI newsletters and blogs |

These MCPs provide real-time data feeds primarily for AI news, research papers, and RSS content. Web search operates as a co-primary data source (not merely a fallback) -- it covers non-AI-news sources such as market reports, company announcements, industry analyst publications, and product documentation that the three MCPs do not reach.

Tasks 1 and 2 are the primary consumers of MCP data. Task 1 uses arXiv for foundational and survey papers, Hacker News for community discussion signals, and RSS for newsletter coverage. Task 2 uses arXiv for benchmark data and web search for market reports and adoption surveys.

## WRITE / MONITOR / SKIP Framework

Task 3 produces a content recommendation using a three-tier framework:

- **WRITE**: High-value topic with demonstrable audience interest, a unique angle that is not saturated, and good timing (topic is rising but not yet peaked).
- **MONITOR**: Topic has potential but is too early or too nascent. Needs one more data point (product launch, paper, funding round) before the angle is compelling.
- **SKIP**: Topic is already saturated with high-quality coverage, audience interest is declining, the available angle is weak or derivative, or timing is off.

This framework is shared across the `topic-research` plugin:

| Skill | Uses WRITE/MONITOR/SKIP |
|-------|------------------------|
| `deep-research` (Task 3) | Primary producer -- full comparative analysis and recommendation |
| `topic-brainstorm` | Scores brainstormed topics with the framework |
| `trend-preview` | Assesses trend momentum using the framework |
| `release-analysis` | Produces a content angle recommendation |

The `content-analysis` plugin does **not** adopt this framework; it uses its own framing tailored to competitive benchmarking.

## Data Integrity Rules

Strict data integrity rules apply across all tasks:

- **No fabricated data.** If a data point is unavailable, mark it "N/A -- not publicly disclosed" and move on.
- **Source attribution required.** Every factual claim and data point must cite its source with a URL and date.
- **Scenario structure is fixed.** Projections always use three tiers: Optimistic, Base, and Pessimistic, each with explicitly stated key assumptions.
- **Cross-task consistency.** Task 5 data must match Task 2 workbook values exactly; Task 3 analysis must reference Task 2 data by cell, not paraphrased approximations.

## Reference Files Architecture

The skill uses progressive disclosure to manage context cost:

```
deep-research/
├── SKILL.md                          # Entry point: metadata + task overview + execution rules
├── references/
│   ├── task1-topic-research.md       # 340 lines -- qualitative research workflow
│   ├── task2-data-compilation.md     # 180 lines -- data collection & workbook workflow
│   ├── task3-analysis.md             # 206 lines -- analysis methodology
│   ├── task4-visual-generation.md    # 205 lines -- visual generation specs
│   └── task5-article-assembly.md     # 218 lines -- article writing workflow
└── assets/
    ├── article-template.md           # Section-by-section article skeleton with placeholders
    └── quality-checklist.md          # Pre-delivery quality verification checklist
```

`SKILL.md` is always loaded on skill activation. It contains the full task table, dependency graph, execution rules, and per-task summaries. Reference files load on demand -- only the reference file for the active task is loaded per execution. This keeps context cost low while providing detailed sub-workflows when needed.

The two asset files (`article-template.md` and `quality-checklist.md`) are used exclusively by Task 5 and loaded during article assembly.

## Input Verification Protocol

Every task (except Task 1) runs a prerequisite check before execution. The verification is a checklist of file existence and data completeness checks:

- **Task 2**: Verifies data source access (web search, arXiv).
- **Task 3**: Verifies Task 2 workbook exists and has all 6 tabs with data.
- **Task 4**: Verifies Tasks 1, 2, and 3 outputs exist and are accessible.
- **Task 5**: Verifies all four prior task outputs exist and meet completeness criteria.

On verification failure, the task stops immediately, identifies the missing prerequisites, and asks the user which prior task to complete first.

## File Organization Convention

The recommended workspace layout during a pipeline run:

```
[Topic]_Research/
├── Task1_Research/
│   └── [Topic]_Research_Document.md
├── Task2_Data/
│   └── [Topic]_Data_Workbook.xlsx
├── Task3_Analysis/
│   └── [Topic]_Analysis.md
├── Task4_Visuals/
│   ├── chart_01_development_timeline.png
│   ├── ...
│   └── chart_index.txt
└── Task5_Article/
    └── [Topic]_Article.md
```

## Session Management

Within the same Claude session, task outputs remain in context and are automatically available to subsequent tasks. Across sessions, the user must reference prior outputs explicitly by file path (e.g., "Use Task 3 with the data workbook at [path]").
