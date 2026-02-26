# Deep Research Pipeline Guide

How to use the `topic-research` plugin's 5-task deep research pipeline to produce publication-ready AI topic articles.

---

## Prerequisites

### MCP Servers

The pipeline relies on three MCP servers declared in `topic-research/.mcp.json`:

| Server | Package | What It Provides |
|--------|---------|-----------------|
| `hacker-news` | `mcp-hacker-news` | Hacker News stories and discussion threads |
| `arxiv` | `arxiv-mcp-server` | arXiv paper search (titles, abstracts, metadata) |
| `rss-reader` | `@kwp-lab/rss-reader-mcp` | RSS feed aggregation from AI newsletters |

Verify these servers are configured and accessible before starting. Without them, Tasks 1 and 2 lose access to real-time AI research and news feeds.

### Web Search

Web search is a co-primary data source alongside the MCP servers. It covers market reports, company announcements, product documentation, industry analyst publications, and other sources the MCPs do not reach. Confirm web search is available in your Claude session.

### Recommended: Topic Selection

The pipeline works best on clearly defined AI topics or technologies. Good candidates:

- A specific technology (e.g., "mixture of experts", "retrieval-augmented generation")
- A product category (e.g., "AI coding assistants", "text-to-video models")
- A research area (e.g., "multi-agent systems", "constitutional AI")

Use `/topic-research:brainstorm` or `/topic-research:daily-brief` to identify candidate topics before committing to a full pipeline run.

---

## Invocation

```
/topic-research:deep-research [topic]
```

Example:

```
/topic-research:deep-research AI agents
```

If no topic argument is provided, the skill prompts for one. The skill then presents the 5-task menu and asks which task to start with.

---

## Task-by-Task Walkthrough

### Task 1: Topic Research

**Invoke**: "Do Task 1 for [topic]"

**What it does**: Qualitative research across arXiv, Hacker News, RSS feeds, web search, company blogs, and GitHub. Produces a 6,000--8,000 word research document covering technology overview, development timeline, technical deep dive, key players, applications, competitive landscape, and risks.

**Output**: `[Topic]_Research_Document_[Date].md`

**Duration hint**: This is the most research-intensive task. Expect significant time for source gathering and synthesis.

**Review checklist**:
- All 7 sections present with substantive content
- Key players include both commercial and open-source
- Technical explanation is accurate and accessible
- Risk assessment covers 8--12 risks across technical, adoption, ethical, and regulatory categories
- Sources cited throughout

### Task 2: Data Compilation

**Invoke**: "Do Task 2 for [topic]"

**What it does**: Collects quantitative data from web search, arXiv benchmarks, company reports, and industry analysts. Builds a 6-tab Excel workbook: Market Data, Player Comparison, Technical Benchmarks, Adoption Metrics, Timeline, and Scenarios.

**Output**: `[Topic]_Data_Workbook_[Date].xlsx`

**Duration hint**: Comparable to Task 1. Data verification across multiple sources takes time.

**Review checklist**:
- All 6 tabs complete with data
- Every data point has a source citation
- No fabricated numbers (missing data marked "N/A -- not publicly disclosed")
- Scenarios tab has three distinct projections (Optimistic/Base/Pessimistic)
- Player comparison covers at least 5 players
- Timeline has at least 20 milestones

**Note**: Tasks 1 and 2 are independent. You can run Task 2 before Task 1 if you prefer to start with quantitative data.

### Task 3: Analysis & Synthesis

**Invoke**: "Do Task 3 for [topic]"

**Prerequisite**: Task 2 workbook must exist. The skill verifies this before starting.

**What it does**: Performs comparative analysis using a four-dimension framework (Technical Capability, Ecosystem & Access, Commercial Position, Research Pipeline). Produces a content recommendation (WRITE / MONITOR / SKIP) and identifies 3--5 narrative hooks for the article.

**Output**: `[Topic]_Analysis_[Date].md` + 4 new tabs added to the Task 2 workbook (Comparative Analysis, Trajectory Forecast, Recommendation Summary, Talking Points).

**Duration hint**: Shorter than Tasks 1--2. Primarily analytical synthesis of existing data.

**Review checklist**:
- Content recommendation is clearly stated with specific rationale
- Comparative analysis covers all major players from Task 2
- Trajectory forecast uses confidence levels (High/Medium/Low)
- 3--5 narrative hooks identified with evidence backing
- All claims reference Task 2 data points

**Decision point**: If the recommendation is SKIP, consider whether to continue with Tasks 4--5 or redirect effort to a different topic.

### Task 4: Visual Asset Generation

**Invoke**: "Do Task 4 for [topic]"

**Prerequisite**: Tasks 1, 2, and 3 must all be complete. The skill verifies each.

**What it does**: Generates 15--25 professional charts and diagrams at 300 DPI. Four mandatory visuals must always be present: development timeline, performance benchmarks, adoption trend, and competitive positioning map.

**Output**: `[Topic]_Visuals_[Date].zip` containing 15--25 PNG/JPG files + `chart_index.txt`

**Duration hint**: Generation time depends on the number of charts. Expect this to be one of the longer tasks.

**Review checklist**:
- Minimum 15 visual files in the zip
- All 4 mandatory visuals present (chart_01, chart_05, chart_09, chart_14)
- All files open correctly and display at readable quality
- `chart_index.txt` included with placement suggestions
- Consistent color palette across all visuals

### Task 5: Article Assembly

**Invoke**: "Do Task 5 for [topic]"

**Prerequisite**: All Tasks 1--4 must be complete. The skill runs a comprehensive verification.

**What it does**: Weaves all prior outputs into a final publication-ready article. Uses Task 3 narrative hooks as the editorial spine, embeds all Task 4 visuals, and includes 8--15 data tables drawn from the Task 2 workbook.

**Output**: `[Topic]_Article_[Date].md` (or `.docx` if requested)

**Duration hint**: The longest task. Writing a complete 3,000--8,000 word article with inline visuals and tables requires substantial generation.

**Review checklist** (use `assets/quality-checklist.md` for the complete list):
- 3,000--8,000 words
- All 8 sections present
- 15--25 visuals embedded inline
- 8--15 data tables included
- All citations are clickable hyperlinks
- Data matches Task 2 workbook values
- Narrative hooks from Task 3 woven throughout
- Opening hook is specific (not a generic AI statement)

---

## Review and Approval Flow

The pipeline is designed with user gates between every task:

```
Request Task 1 → Review output → Approve → Request Task 2 → Review → ...
```

At each gate you can:

1. **Approve and continue** -- request the next task.
2. **Request revisions** -- ask for specific changes to the current task output before proceeding.
3. **Pause** -- stop the pipeline and resume in a later session (reference prior outputs by file path).
4. **Redirect** -- if Task 3 recommends SKIP or MONITOR, decide whether to continue or switch topics.

You do not need to approve in a formal way. Simply requesting the next task (e.g., "Do Task 3") signals that you are satisfied with the current output.

---

## Post-Pipeline: Feeding Results Downstream

### Into content-analysis

The deep research article and data workbook provide raw material for competitive content analysis:

- Use the article as a benchmark piece for `/content-analysis:benchmark` to compare against competitor coverage of the same topic.
- Use the data workbook tables as reference data when analyzing competitor articles for accuracy.

Note: `content-analysis` uses its own evaluation framework, not the WRITE/MONITOR/SKIP system.

### Into content-production

The article from Task 5 serves as a source document for content-production workflows:

- Adapt the long-form article into platform-specific formats (social threads, newsletter editions, video scripts) using content-production commands.
- The narrative hooks from Task 3 can anchor shorter-form content pieces.
- Visuals from Task 4 can be reused directly or adapted for different platforms.

---

## Tips and Best Practices

### Choosing Good Topics

- **Use feeder commands first.** Run `/topic-research:daily-brief` to scan current AI developments, then `/topic-research:brainstorm` to score and filter topic ideas. These commands are lightweight and help avoid investing a full pipeline run on a weak topic.
- **Check for saturation.** Before starting, do a quick web search to see how much existing coverage exists. The pipeline adds most value on topics that are rising but not yet saturated.
- **Be specific.** "AI" is too broad. "Multi-agent orchestration frameworks" is a good scope. The more precise the topic, the more focused and valuable the output.

### Working Across Sessions

- Save all task output files to a consistent directory (the pipeline suggests `[Topic]_Research/Task1_Research/`, etc.).
- When resuming in a new session, reference prior outputs by file path: "Do Task 3 for AI agents using the workbook at `/path/to/workbook.xlsx`".
- The pipeline does not maintain state across sessions -- you are responsible for connecting prior outputs.

### Using the Quality Checklist

The file `assets/quality-checklist.md` provides a pre-delivery checklist for Task 5. Use it to verify the final article before publication. Key checks: word count, visual count, table count, citation completeness, data consistency with the workbook, and editorial quality.

### When to Stop Early

- If Task 3 returns **MONITOR**: the topic has potential but needs more time. Note the trigger event to watch for and revisit later.
- If Task 3 returns **SKIP**: redirect effort. Use the analysis to understand why and identify a better-timed topic.
- Completing Tasks 4 and 5 after a SKIP recommendation is not prohibited but is usually not the best use of time.

### Data Integrity

- Never accept fabricated data in any task output. If a data point cannot be found, it should be marked "N/A" with an explanation.
- Cross-check key numbers between Task 2 workbook and Task 5 article. The article must not round, approximate, or paraphrase workbook values.
- Verify source URLs are valid and point to the claimed content.
