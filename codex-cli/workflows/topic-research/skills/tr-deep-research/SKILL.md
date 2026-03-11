---
name: tr-deep-research
description: "Create comprehensive AI topic research articles through a 5-task workflow: topic research, data compilation, analysis, visual generation, article assembly"
arguments:
  - name: input
    description: "AI topic, technology name, or pipeline.openspec.json path"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE any other interaction and BEFORE asking the user for a topic. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `pipeline.openspec.json`, read it first and use the contract context.
   - If argument is a topic or file path, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run this Bash command immediately:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If files found, read the latest contract and ask the user whether to continue from it.

3. **Auto-scan brainstorm output**: Run this Bash command immediately:

```bash
TODAY=$(date +%Y-%m-%d) && ls -t openspec/runtime/brainstorm/${TODAY}*.md openspec/runtime/brainstorm/*.md 2>/dev/null | head -3
```

If files found, read the most recent one, extract the top-3 topic briefs. Ask the user: "检测到最近的选题报告，请选择一个话题进入深度研究：" with the top-3 topics as options (plus a "自定义话题" option).

4. **Auto-scan daily brief**: If no brainstorm output, check:

```bash
ls -t openspec/runtime/daily-brief/*.md 2>/dev/null | head -1
```

If found, read the file, extract top stories as potential topics. Ask the user to select.

5. **No upstream found**: Only in this case, ask the user which AI topic or technology to research.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Execute Deep Research

Create comprehensive, publication-ready AI topic research articles through a structured 5-task workflow. Each task must be executed separately with verified inputs.

**Default Font**: Times New Roman throughout all documents (unless user specifies otherwise).

### Pre-flight: Additional Upstream Artifact Detection

```bash
# Check for brainstorm output (today first, then recent)
TODAY=$(date +%Y-%m-%d) && ls -t openspec/runtime/brainstorm/${TODAY}*.md openspec/runtime/brainstorm/*.md 2>/dev/null | head -3

# Check for daily brief (fallback if no brainstorm)
ls -t openspec/runtime/daily-brief/*.md 2>/dev/null | head -3
```

**After running the commands**:

1. **If brainstorm files found** -> Read the most recent one, extract the top-3 topic briefs. Ask the user: "检测到最近的选题报告，请选择一个话题进入深度研究：" with the top-3 topics as options (plus a "自定义话题" option).
2. **If only daily brief found** -> Read the file, extract top stories as potential research topics. Ask the user to select.
3. **If nothing found** -> Proceed to ask the user for a topic.

**Only after a topic is confirmed**, proceed to the task selection below.

### CRITICAL: One Task at a Time

**THIS SKILL OPERATES IN SINGLE-TASK MODE ONLY.**

#### If User Requests Full Pipeline

When user requests "Create a deep research article on [topic]" or any request implying multiple tasks:

**REQUIRED RESPONSE:**

1. Ask which specific task to perform:

   ```
   I can help you create a deep research article on [topic].
   This involves 5 separate tasks that need to be completed individually:

   1. Topic Research - Background, key players, history, current state
   2. Data Compilation - Statistics, benchmarks, market data tables
   3. Analysis & Synthesis - Comparative analysis, content recommendation
   4. Visual Asset Generation - Charts, diagrams, infographics
   5. Article Assembly - Final publication-ready article

   Which task would you like to start with?
   ```

2. Never automatically assume which task to start — always ask user to confirm.
3. Never execute multiple tasks in sequence — complete one task, deliver outputs, then wait for next user request.

### Task Execution Rules

- Execute exactly ONE task per user request
- Always verify prerequisites before starting a task
- Deliver task outputs and confirm completion
- Wait for user to explicitly request the next task

### Deliverables Policy: NO SHORTCUTS

Each task specifies exact deliverables. Do NOT create extra documents like "completion summaries", "executive summaries", "quick reference guides", etc.

### Task Selection

| Task  | Name                    | Prerequisites                 | Output                    |
| ----- | ----------------------- | ----------------------------- | ------------------------- |
| **1** | Topic Research          | Topic name                    | 6-8K word document        |
| **2** | Data Compilation        | Access to data sources        | Excel workbook (6 tabs)   |
| **3** | Analysis & Synthesis    | Data workbook (Task 2)        | Analysis doc + Excel tabs |
| **4** | Visual Asset Generation | Tasks 1, 2, 3 + external data | 15-25 PNG/JPG assets      |
| **5** | Article Assembly        | ALL previous tasks (1-4)      | 3,000-8,000 word article  |

---

## Task 1: Topic Research

**Purpose**: Research the topic's background, key players, development history, current state, competing approaches, applications, and risks.

**Prerequisites**: None (fully independent) — Topic name or technology name only

**Input Context**:

> **CONSTRAINT — Upstream Artifact Auto-Detection is MANDATORY**: Before asking the user for topic details or starting research from scratch, you MUST first scan for existing upstream artifacts. Only ask the user for topic input when NO upstream artifact is found.

**Detection order** (stop at first hit):

1. **Explicit argument**: If user passes a file/directory path, use it directly
2. **Brainstorm brief**: Check `openspec/runtime/brainstorm/` for a matching topic brief (today or most recent within 3 days)
   - If found, extract: core angle, target audience, key questions, data requirements, potential sources
   - Use these as research focus areas (skip re-discovering what's already known)
3. **Daily brief**: Check `openspec/runtime/daily-brief/` for relevant daily brief data (today or most recent within 3 days)
   - If found, extract relevant news items and data points
   - Avoid re-searching for information already gathered
4. **No upstream found**: Only in this case, ask the user for topic input

When upstream artifacts exist, reference them in the research document's frontmatter:

```yaml
input_context:
  brainstorm_brief: <path>
  daily_brief: <path>
```

**Process**:

1. Verify topic name provided
2. Load detailed instructions from references/task1-topic-research.md
3. Execute qualitative research workflow
4. Deliver research document

**Optional platform data** (via news-search CLI, 24h freshness enforced):

> **CONSTRAINT**: Execute all `news-search` commands via Bash tool. Do NOT substitute with Claude's built-in WebSearch. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X discourse: `${TS_RUNNER} news-search/scripts/search.ts twitter "<topic>" 20`
- Reddit discussions: `${TS_RUNNER} news-search/scripts/search.ts reddit "<topic>" 10`
- GitHub projects: `${TS_RUNNER} news-search/scripts/search.ts github "<topic>" 10`

**Output**: Topic Research Document (6,000-8,000 words)

- Technology overview & background
- Key players & products (companies, research labs, open-source projects)
- Development timeline & history
- Technical deep dive (how it works, key concepts)
- Applications & use cases
- Competitive landscape (5-10 approaches or alternatives)
- Risks & challenges (technical, adoption, ethical, regulatory)

**File name**: `research.md` (saved to `openspec/runtime/deep-research/<slug>/research.md`)

**DELIVER ONLY THIS 1 FILE. NO completion summaries, no extra documents.**

---

## Task 2: Data Compilation

**Purpose**: Collect and organize quantitative data: adoption metrics, benchmark results, market size estimates, player comparison tables, and timeline data.

**Prerequisites**: Access to data sources

**Process**:

1. Verify access to data sources
2. Load detailed instructions from references/task2-data-compilation.md
3. Collect quantitative data from sources
4. Build structured Excel workbook with 6 tabs
5. Deliver workbook

**Optional platform data** (via news-search CLI):

- YouTube metrics: `${TS_RUNNER} news-search/scripts/search.ts youtube "<topic>" 10`
- Bilibili metrics: `${TS_RUNNER} news-search/scripts/search.ts bilibili "<topic>" 10`
- Exa web data: `${TS_RUNNER} news-search/scripts/search.ts exa "<topic>" 20`

**Output**: Data Workbook — 6 tabs:
1. **Market Data** - Market size estimates, growth projections, adoption rates
2. **Player Comparison** - Feature comparison table across key players/approaches
3. **Technical Benchmarks** - Performance metrics, benchmark results, SOTA comparisons
4. **Adoption Metrics** - Usage stats, deployment numbers, geographic spread
5. **Timeline** - Chronological milestones, paper releases, product launches
6. **Scenarios** - Optimistic/Base/Pessimistic projections for the field

**File name**: `data-workbook.md` (saved to `openspec/runtime/deep-research/<slug>/data-workbook.md`)

**DELIVER ONLY THIS 1 FILE.**

---

## Task 3: Analysis & Synthesis

**Purpose**: Perform comparative analysis, assess competitive advantages/disadvantages, evaluate future trajectory, and produce a content recommendation.

**Prerequisites**: Data workbook from Task 2

**CRITICAL: DO NOT START THIS TASK UNLESS TASK 2 IS COMPLETE**

**Process**:

1. Verify data workbook is accessible
2. Load detailed instructions from references/task3-analysis.md
3. Execute analysis workflow
4. Deliver analysis document

**Output**: Analysis & Synthesis (4-6 pages + Excel tabs)

- Comparative analysis of key players and approaches
- Advantage/disadvantage assessment
- Future trajectory forecast with confidence levels
- Content recommendation: **WRITE** / **MONITOR** / **SKIP**
- Key talking points for article (3-5 narrative hooks)

**Files**:
- `analysis.md` (saved to `openspec/runtime/deep-research/<slug>/analysis.md`)
- Additional sections appended to `data-workbook.md`

---

## Task 4: Visual Asset Generation

**Purpose**: Generate 15-25 professional charts, diagrams, and infographics for the article.

**Prerequisites**: Tasks 1, 2, and 3 must be complete

**CRITICAL: DO NOT START THIS TASK UNLESS TASKS 1, 2, AND 3 ARE COMPLETE**

**Process**:

1. Verify all previous task outputs are accessible
2. Load detailed instructions from references/task4-visual-generation.md
3. Execute visual generation workflow
4. Package all assets into a zip file
5. Deliver zip file

**Output**: 15-25 Visual Asset Files (PNG/JPG, 300 DPI) packaged in zip

**4 MANDATORY Visuals**:
- chart_01: Development timeline
- chart_05: Performance benchmarks
- chart_09: Market size / adoption trend
- chart_14: Competitive positioning map

**File naming**: `chart_01_description.png`, `chart_02_description.png`, etc.

**Deliverable**: `[Topic]_Visuals_[Date].zip` containing all 15-25 files + chart_index.txt

---

## Task 5: Article Assembly

**Purpose**: Write and assemble the final publication-ready article incorporating all research, data, analysis, and visuals.

**Prerequisites**: ALL previous tasks (1-4) must be complete

**CRITICAL: DO NOT START THIS TASK UNLESS ALL TASKS 1-4 ARE COMPLETE**

**Process**:

1. Verify ALL prerequisites before starting
2. Load detailed instructions from references/task5-article-assembly.md
3. Execute article assembly workflow
4. Save and deliver final article

**Output**: Final Article

- **Length**: 3,000-8,000 words (minimum 3,000)
- **Visuals**: 15-25 embedded images
- **Tables**: 8-15 data tables
- **Format**: .md for web publication, or .docx if user prefers

**Structure** (load assets/article-template.md for full template):

- Section 1: Hook & Why It Matters (300-500 words)
- Section 2: What It Is — Technical Overview (600-1,000 words)
- Section 3: How It Got Here — Development History (400-700 words)
- Section 4: The Landscape — Key Players & Approaches (800-1,200 words)
- Section 5: The Numbers — Data & Benchmarks (500-800 words)
- Section 6: What's Next — Trajectory & Scenarios (400-600 words)
- Section 7: Risks & Watch-outs (400-600 words)
- Section 8: Takeaways & Content Angle (200-300 words)
- Sources & References

**File name**: `article.md` (saved to `openspec/runtime/deep-research/<slug>/article.md`)

**DELIVER ONLY THIS 1 FILE.**

---

## Output Directory Convention

**ALL task outputs** are saved to a shared article directory:

```
openspec/runtime/deep-research/<article-slug>/
├── research.md              # Task 1 output
├── data-workbook.md         # Task 2 output
├── analysis.md              # Task 3 output
├── images/                  # Task 4 output
│   ├── chart_01_*.png
│   ├── ...
│   ├── cover.png
│   └── chart_index.txt
└── article.md               # Task 5 output
```

**Slug derivation**: Kebab-case from topic name (e.g., "LLM Agents" -> `llm-agents`).

## Task Reference Files

Detailed instructions for each task are in separate reference files:

- **references/task1-topic-research.md** - Topic research workflow
- **references/task2-data-compilation.md** - Data collection and workbook workflow
- **references/task3-analysis.md** - Analysis and synthesis methodology
- **references/task4-visual-generation.md** - Visual generation workflow and specifications
- **references/task5-article-assembly.md** - Article writing workflow
  - Also see: assets/article-template.md for article structure
  - Also see: assets/quality-checklist.md for quality checks

**When to load reference files**: Load ONLY the reference file associated with the specific task being performed.

## Artifact Handoff

**OpenSpec contract (MANDATORY)**:

- Create or update `openspec/runtime/deep-research/<slug>/pipeline.openspec.json`.
- Minimum fields:
  - `pipeline`: `topic-research->content-production->content-utilities->publishing`
  - `stage`: `topic-research`
  - `outputs.research_md`, `outputs.data_workbook_md`, `outputs.analysis_md`, `outputs.article_md`
  - `next.command`: `long-article`
  - `next.input`: contract file path

**Next step**: After Task 5, run a long-article skill as the deterministic next step.

## Task Independence

- **Task 1** can run anytime (no dependencies)
- **Task 2** can run anytime (just needs data source access)
- **Tasks 1 & 2** can run in parallel
- **Task 3** requires Task 2
- **Task 4** requires Tasks 2 & 3
- **Task 5** requires Tasks 1, 2, 3, & 4

## Quality Standards

- **Comprehensive**: Meet all minimum requirements without shortcuts
- **Detailed**: Specific data and examples, not generic statements
- **Quantified**: Lead with numbers and benchmarks
- **Cited**: Proper sources with clickable hyperlinks
- **Narrative**: Strong editorial angle and clear "so what"
- **Accurate**: All numbers verified and cross-checked against sources
