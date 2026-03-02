---
name: deep-research
description: Create comprehensive AI topic research articles through a 5-task workflow. Tasks must be executed individually with verified prerequisites - (1) topic research, (2) data compilation, (3) analysis & synthesis, (4) visual asset generation, (5) article assembly. Each task produces specific deliverables (markdown docs, Excel workbooks, image assets, or final articles). Tasks 3-5 have dependencies on earlier tasks.
---

# Deep Research

Create comprehensive, publication-ready AI topic research articles through a structured 5-task workflow. Each task must be executed separately with verified inputs.

## Overview

This skill produces in-depth AI topic articles following high-quality content standards. Tasks are executed individually, each verifying prerequisites before proceeding.

**Default Font**: Times New Roman throughout all documents (unless user specifies otherwise).

---

## Pre-flight: Upstream Artifact Detection (MANDATORY — RUN FIRST)

**CRITICAL**: You MUST run the bash commands below BEFORE asking the user ANY question about topics, tasks, or research direction. Do NOT skip this step. Do NOT present topic options without first scanning for artifacts.

```bash
# Step A: Check for brainstorm output (today first, then recent)
TODAY=$(date +%Y-%m-%d) && ls -t openspec/runtime/brainstorm/${TODAY}*.md openspec/runtime/brainstorm/*.md 2>/dev/null | head -3

# Step B: Check for daily brief (fallback if no brainstorm)
ls -t openspec/runtime/daily-brief/*.md 2>/dev/null | head -3
```

**After running the commands**:

1. **If brainstorm files found** → Read the most recent one, extract the top-3 topic briefs. Present them to the user via AskUserQuestion: "检测到最近的选题报告，请选择一个话题进入深度研究：" with the top-3 topics as options (plus a "自定义话题" option).

2. **If only daily brief found** → Read the file, extract top stories as potential research topics. Present them to the user via AskUserQuestion.

3. **If nothing found** → Proceed to ask the user for a topic.

**Only after a topic is confirmed**, proceed to the task selection below.

---

## CRITICAL: One Task at a Time

**THIS SKILL OPERATES IN SINGLE-TASK MODE ONLY.**

### If User Requests Full Pipeline

When user requests:

- "Create a deep research article on [topic]"
- "Write a comprehensive article on [topic]"
- "Do the entire research process for [topic]"
- "Complete all 5 tasks for [topic]"
- Any request that implies running multiple tasks or the entire workflow

**REQUIRED RESPONSE:**

1. **Ask which specific task to perform:**

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

2. **When user explicitly requests all tasks together:**

   ```
   I understand you'd like to complete the entire deep research pipeline.
   Currently, this skill supports executing one task at a time, which allows
   for better quality control and review at each stage.

   We're working on a seamless end-to-end workflow that will make this process
   more automated, but for now, we'll need to complete each task separately.

   Would you like to start with Task 1 (Topic Research)?
   ```

3. **Never automatically assume which task to start** - always ask user to confirm.

4. **Never execute multiple tasks in sequence** - complete one task, deliver outputs, then wait for next user request.

### Task Execution Rules

- Execute exactly ONE task per user request
- Always verify prerequisites before starting a task
- Deliver task outputs and confirm completion
- Wait for user to explicitly request the next task
- Never chain multiple tasks together automatically
- Never assume user wants to proceed to next task
- Never execute Tasks 3-5 without verifying required inputs exist

### Deliverables Policy: NO SHORTCUTS

**DELIVER ONLY THE SPECIFIED OUTPUTS. DO NOT CREATE EXTRA DOCUMENTS.**

Each task specifies exact deliverables. Do NOT create:

- "Completion summaries"
- "Executive summaries"
- "Quick reference guides"
- "Next steps documents"
- "Task completion reports"
- Any other "helpful" documentation not explicitly specified

**Why**: These extras waste context and are not part of the professional workflow.

**What TO deliver**:

- Task 1: Research document (.md) — **NOTHING ELSE**
- Task 2: Data workbook (.xlsx) — **NOTHING ELSE**
- Task 3: Analysis document (.md) + Excel tabs added to Task 2 file — **NOTHING ELSE**
- Task 4: Visual assets zip file (.zip) — **NOTHING ELSE**
- Task 5: Final article (.md or .docx) — **NOTHING ELSE**

**If a deliverable is not listed above, DO NOT CREATE IT.**

---

## Task Selection

Select which task to execute:

| Task  | Name                    | Prerequisites                 | Output                    |
| ----- | ----------------------- | ----------------------------- | ------------------------- |
| **1** | Topic Research          | Topic name                    | 6-8K word document        |
| **2** | Data Compilation        | Access to data sources        | Excel workbook (6 tabs)   |
| **3** | Analysis & Synthesis    | Data workbook (Task 2)        | Analysis doc + Excel tabs |
| **4** | Visual Asset Generation | Tasks 1, 2, 3 + external data | 15-25 PNG/JPG assets      |
| **5** | Article Assembly        | ALL previous tasks (1-4)      | 3,000-8,000 word article  |

---

## How to Use This Skill

### User Request Patterns and Responses

**Pattern 1: User specifies a specific task**

```
User: "Use deep-research, Task 1 for AI agents"
Response: Execute Task 1 immediately
```

**Pattern 2: User asks for "deep research article" or "full pipeline"**

```
User: "Create a deep research article on AI agents"
Response: DO NOT start any task automatically
         Ask which task to start with (see template above)
```

**Pattern 3: User wants to do "all tasks" or "entire workflow"**

```
User: "I want to complete all 5 tasks for AI agents"
Response: DO NOT chain tasks together
         Explain one-at-a-time limitation (see template above)
         Ask if they want to start with Task 1
```

### Correct Usage Examples

**Executing a single task:**

```
"Use deep-research skill, Task 1 for AI agents"
"Do Task 2 of deep-research for AI agents"
"Run Task 3 for AI agents using the deep-research skill"
```

**Completing full article (requires 5 separate requests):**

```
Request 1: "Do Task 1 for AI agents" → Complete → Deliver outputs
Request 2: "Do Task 2 for AI agents" → Complete → Deliver outputs
Request 3: "Do Task 3 for AI agents" → Complete → Deliver outputs
Request 4: "Do Task 4 for AI agents" → Complete → Deliver outputs
Request 5: "Do Task 5 for AI agents" → Complete → Deliver outputs
```

### Task Execution Order

For a complete research article, tasks must be executed in separate user requests:

```
Request 1: Task 1 - Topic Research (independent)
           ↓ [User reviews outputs and requests next task]
Request 2: Task 2 - Data Compilation (independent)
           ↓ [User reviews outputs and requests next task]
Request 3: Task 3 - Analysis & Synthesis (requires Task 2 output)
           ↓ [User reviews outputs and requests next task]
Request 4: Task 4 - Visual Asset Generation (requires Tasks 2 & 3 outputs)
           ↓ [User reviews outputs and requests next task]
Request 5: Task 5 - Article Assembly (requires ALL previous task outputs)
```

**Note**: Tasks 1 and 2 can be run in any order. Tasks 3-5 have strict dependencies and must verify inputs before proceeding.

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
│   ├── cover.png            # cover-generator output
│   └── chart_index.txt
└── article.md               # Task 5 output
```

**Slug derivation**: Kebab-case from topic name (e.g., "LLM Agents" → `llm-agents`).

**MANDATORY**: Each task MUST:

1. Create `openspec/runtime/deep-research/<slug>/` on first run (if not exists)
2. Save its output to the path shown above
3. Confirm the save path to user after delivery

**Downstream consumers**: `article-builder`, `cover-generator`, `md-to-html`, `quality-check`, and `wechat-publisher` all read from this directory.

---

## Task 1: Topic Research

**Purpose**: Research the topic's background, key players, development history, current state, competing approaches, applications, and risks.

**Prerequisites**: None (fully independent)

- Topic name or technology name only

**Input Context**:

> **CONSTRAINT — Upstream Artifact Auto-Detection is MANDATORY**: Before asking the user for topic details or starting research from scratch, you MUST first scan for existing upstream artifacts. If upstream artifacts are found, present them to the user via AskUserQuestion for confirmation before using. Only ask the user for topic input when NO upstream artifact is found.

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

> **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- Twitter/X discourse: `${TS_RUNNER} news-search/scripts/search.ts twitter "<topic>" 20`
- Reddit discussions: `${TS_RUNNER} news-search/scripts/search.ts reddit "<topic>" 10`
- GitHub projects: `${TS_RUNNER} news-search/scripts/search.ts github "<topic>" 10`
- See `news-search` skill for full platform reference.

**Output**: Topic Research Document (6,000-8,000 words)

- Technology overview & background
- Key players & products (companies, research labs, open-source projects)
- Development timeline & history
- Technical deep dive (how it works, key concepts)
- Applications & use cases
- Competitive landscape (5-10 approaches or alternatives)
- Risks & challenges (technical, adoption, ethical, regulatory)

**File name**: `research.md` (saved to `openspec/runtime/deep-research/<slug>/research.md` per Output Directory Convention)

**DELIVER ONLY THIS 1 FILE. NO completion summaries, no extra documents.**

**DO NOT TAKE SHORTCUTS:**

- Write full 6,000-8,000 words (not summaries)
- Cover all major players with substantive analysis (not one-liners)
- Analyze technical mechanisms in depth
- Cover all 8-12 risks across categories
- Do not abbreviate sections to save time
- Do not skip any required sections

**Verification before proceeding**: None required for this task.

---

## Task 2: Data Compilation

**Purpose**: Collect and organize quantitative data: adoption metrics, benchmark results, market size estimates, player comparison tables, and timeline data.

**Prerequisites**: Verify before starting

- **Required**: Access to data sources
  - news-search web/exa for market reports, benchmark papers, adoption surveys
  - arXiv for performance benchmarks and technical comparisons
  - Company announcements for product metrics
  - OR: Pre-collected data provided by user
- **Optional**: Topic research (Task 1) for context on what data matters

**Input Verification**:

```
BEFORE STARTING - Select approach:

Option A: Collect data from sources (most common)
- [ ] Have access to news-search CLI and arXiv MCP?
- [ ] Ready to extract quantitative data?

Option B: User provided pre-collected data
- [ ] Data file received?
- [ ] Contains metrics, benchmarks, market data?

Optional:
- [ ] Topic research (Task 1) complete for context?
```

**Process**:

1. Verify access to data sources
2. Load detailed instructions from references/task2-data-compilation.md
3. Collect quantitative data from sources
4. Build structured Excel workbook with 6 tabs
5. Deliver workbook

**Optional platform data** (via news-search CLI, 24h freshness enforced):

> **CONSTRAINT**: Execute all `news-search` commands below via Bash tool. Do NOT substitute with Claude's built-in WebSearch — it lacks freshness control and structured multi-platform output. WebSearch may only supplement, never replace, news-search. Resolve script path: from project root use `topic-research/skills/news-search/scripts/`. Run `doctor.ts` first to check available platforms.

- YouTube metrics: `${TS_RUNNER} news-search/scripts/search.ts youtube "<topic>" 10`
- Bilibili metrics: `${TS_RUNNER} news-search/scripts/search.ts bilibili "<topic>" 10`
- Exa web data: `${TS_RUNNER} news-search/scripts/search.ts exa "<topic>" 20`
- See `news-search` skill for full platform reference.

**Output**: Data Workbook (.xlsx)

- 6 tabs:
  1. **Market Data** - Market size estimates, growth projections, adoption rates
  2. **Player Comparison** - Feature comparison table across key players/approaches
  3. **Technical Benchmarks** - Performance metrics, benchmark results, SOTA comparisons
  4. **Adoption Metrics** - Usage stats, deployment numbers, geographic spread
  5. **Timeline** - Chronological milestones, paper releases, product launches
  6. **Scenarios** - Optimistic/Base/Pessimistic projections for the field

**File name**: `data-workbook.md` (saved to `openspec/runtime/deep-research/<slug>/data-workbook.md` per Output Directory Convention)

**DELIVER ONLY THIS 1 FILE. NO completion summaries, no extra documents.**

**DO NOT TAKE SHORTCUTS:**

- Collect real data from actual sources (not fabricated)
- Build ALL 6 tabs completely
- Include source citations for every data point
- Complete ALL three scenarios with different parameters
- Do not create simplified/abbreviated versions
- Do not skip any of the 6 essential tabs

**Verification before proceeding to Task 3**:

- [ ] Data workbook created and can be opened
- [ ] Workbook has all 6 tabs
- [ ] Real data collected from sources (not fabricated)
- [ ] Sources cited for each data point
- [ ] Scenarios complete (Optimistic/Base/Pessimistic)

---

## Task 3: Analysis & Synthesis

**Purpose**: Perform comparative analysis, assess competitive advantages and disadvantages, evaluate future trajectory, and produce a content recommendation.

**Prerequisites**: Verify before starting

- **Required**: Data workbook from Task 2
  - Player comparison table
  - Technical benchmarks
  - Market data and adoption metrics
  - Scenario projections

**CRITICAL: DO NOT START THIS TASK UNLESS TASK 2 IS COMPLETE**

This task requires the data workbook from Task 2. Starting without it will result in incomplete analysis.

**IF TASK 2 IS NOT COMPLETE**: Stop immediately and inform the user that Task 2 (Data Compilation) must be completed first.

**Input Verification**:

```
BEFORE STARTING:
- [ ] Task 2 complete? (Data workbook exists)
- [ ] Workbook file path/location known?
- [ ] Can access comparison and benchmark data?

Required from workbook:
- [ ] Player comparison data
- [ ] Benchmark results
- [ ] Market size data
- [ ] Scenario projections
```

**Process**:

1. Verify data workbook is accessible
2. Load detailed instructions from references/task3-analysis.md
3. Execute analysis workflow
4. Deliver analysis document

**Output**: Analysis & Synthesis (4-6 pages + Excel tabs)

- Comparative analysis of key players and approaches
- Advantage/disadvantage assessment (strengths, weaknesses, differentiators)
- Future trajectory forecast with confidence levels
- Content recommendation: **WRITE** / **MONITOR** / **SKIP**
  - WRITE: High-value topic with clear audience interest, unique angle available, good timing
  - MONITOR: Promising but wait for more developments before investing in deep coverage
  - SKIP: Saturated coverage, low audience interest, or timing is off
- Key talking points for article (3-5 narrative hooks)

**Files**:

- `analysis.md` (saved to `openspec/runtime/deep-research/<slug>/analysis.md` per Output Directory Convention)
- Additional sections appended to `data-workbook.md`:
  - Comparative Analysis tab
  - Trajectory Forecast tab
  - Recommendation Summary tab
  - Talking Points tab

**DELIVER ONLY: 1 markdown file + additional sections added to data-workbook.md. NO completion summaries, no extra documents.**

**DO NOT TAKE SHORTCUTS:**

- Complete full comparative analysis (not a surface-level list)
- Include quantitative backing for every major claim
- Write full 4-6 pages of analysis (not abbreviated)
- Justify content recommendation with specific rationale
- Do not skip the scenario analysis

**Verification before proceeding to Task 4**:

- [ ] Content recommendation determined (WRITE/MONITOR/SKIP)
- [ ] Analysis uses data from Task 2 workbook
- [ ] Comparative framework covers all major players
- [ ] Talking points identified (3-5 narrative hooks)

---

## Task 4: Visual Asset Generation

**Purpose**: Generate 15-25 professional charts, diagrams, and infographics for the article.

**Prerequisites**: Verify before starting

- **Required**: Topic research from Task 1
  - Development timeline (for timeline diagrams)
  - Key players list (for competitive maps)
  - Technical concepts (for architecture diagrams)
  - Application domains (for use-case diagrams)
- **Required**: Data workbook from Task 2 (with Task 3 analysis tabs added)
  - Market size data
  - Player comparison data
  - Benchmark results
  - Adoption metrics
  - Scenario projections
- **Required**: External reference data
  - Historical benchmark trends from papers
  - Adoption curves from industry reports

**CRITICAL: DO NOT START THIS TASK UNLESS TASKS 1, 2, AND 3 ARE COMPLETE**

**IF ANY OF TASKS 1, 2, OR 3 ARE NOT COMPLETE**: Stop immediately and inform the user which tasks need to be completed first.

**Input Verification**:

```
BEFORE STARTING:
- [ ] Task 1 complete? (Topic research exists)
- [ ] Task 2 complete? (Data workbook exists)
- [ ] Task 3 complete? (Analysis exists)
- [ ] Can access external data sources for benchmark trends?

Required from Task 1:
- [ ] Development timeline milestones (for timeline diagram)
- [ ] Key players and their descriptions (for competitive map)
- [ ] Technical architecture/mechanism (for architecture diagram)
- [ ] Application domains (for use-case diagram)

Required from Task 2:
- [ ] Market size data (for market chart)
- [ ] Player comparison table (for comparison chart)
- [ ] Benchmark results (for performance chart)
- [ ] Adoption metrics (for adoption curve)
- [ ] Scenario projections (for forecast chart)

Required from Task 3:
- [ ] Comparative analysis results (for positioning map)
- [ ] Trajectory forecast (for trend chart)
- [ ] Recommendation rationale (for summary infographic)
```

**Process**:

1. Verify all previous task outputs are accessible
2. Load detailed instructions from references/task4-visual-generation.md
3. Execute visual generation workflow
4. Package all assets into a zip file
5. Deliver zip file

**Output**: 15-25 Visual Asset Files (PNG/JPG, 300 DPI) packaged in zip

**4 MANDATORY Visuals** (must be present):

- chart_01: Development timeline (horizontal timeline diagram)
- chart_05: Performance benchmarks (bar or line chart comparing approaches)
- chart_09: Market size / adoption trend (area or line chart)
- chart_14: Competitive positioning map (2x2 or scatter plot)

**15 REQUIRED Visuals** (specific list):

- Overview: chart_01 (timeline), chart_02 (field overview diagram)
- Technical: charts 03, 04, 05 (architecture, mechanism, benchmarks)
- Players: charts 06, 07, 08 (player comparison, feature matrix, org/product map)
- Market: charts 09, 10, 11 (adoption, market size, geographic spread)
- Competitive: charts 12, 13, 14 (landscape, moat analysis, positioning)
- Forward-looking: charts 15, 16 (scenario projections, trajectory)

**10 OPTIONAL Visuals** (for 16-25 range):

- charts 17-25 (use-case maps, funding landscape, research paper volume trends, etc.)

**IMPORTANT**: Task 5 embeds ALL visuals created (15-25) for visual density (1 visual per 300-500 words).

**File naming**: `chart_01_description.png`, `chart_02_description.png`, etc.

**Deliverable**: `[Topic]_Visuals_[Date].zip` containing all 15-25 files + chart_index.txt

**DELIVER ONLY THIS 1 ZIP FILE. NO completion summaries, no separate chart lists, no extra documents.**

**DO NOT TAKE SHORTCUTS:**

- Create ALL 15 required visuals minimum
- Include ALL 4 mandatory visuals
- Generate professional-quality charts at 300 DPI
- Create unique, well-formatted visuals for each type
- Package all assets in zip file with index
- Do not use low-quality/placeholder images

**Verification before proceeding to Task 5**:

- [ ] Minimum 15 visual files created
- [ ] All 4 mandatory visuals present:
  - [ ] chart_01: Development timeline
  - [ ] chart_05: Performance benchmarks
  - [ ] chart_09: Market/adoption trend
  - [ ] chart_14: Competitive positioning map
- [ ] All visuals open and display correctly
- [ ] Saved at 300 DPI
- [ ] chart_index.txt created
- [ ] All files packaged in zip

---

## Task 5: Article Assembly

**Purpose**: Write and assemble the final publication-ready article incorporating all research, data, analysis, and visuals.

**Prerequisites**: Verify before starting

- **Required**: Topic research from Task 1
  - Full 6-8K word document
  - Technical explanations
  - Player profiles
  - Risk assessment
- **Required**: Data workbook from Task 2
  - All 6 tabs with quantitative data
  - Benchmark tables
  - Market data
- **Required**: Analysis from Task 3
  - Content recommendation and rationale
  - Narrative hooks and talking points
  - Comparative analysis
- **Required**: Visual assets from Task 4
  - Zip file containing 15-25 PNG/JPG files
  - chart_index.txt

**CRITICAL: DO NOT START THIS TASK UNLESS ALL TASKS 1-4 ARE COMPLETE**

**IF ANY OF TASKS 1, 2, 3, OR 4 ARE NOT COMPLETE**: Stop immediately and inform the user which tasks need to be completed first.

**Input Verification**:

```
BEFORE STARTING - ALL TASKS MUST BE COMPLETE:

Task 1 Verification:
- [ ] Topic research document exists? (6-8K words)
- [ ] Technical deep dive complete?
- [ ] Player profiles complete?
- [ ] Risk assessment complete?

Task 2 Verification:
- [ ] Data workbook exists and can be opened?
- [ ] Workbook has all 6 tabs with real data?
- [ ] Benchmark table complete?

Task 3 Verification:
- [ ] Analysis document complete?
- [ ] Content recommendation determined?
- [ ] Narrative hooks identified? (3-5)
- [ ] Comparative analysis complete?

Task 4 Verification:
- [ ] Visual assets zip exists?
- [ ] Can extract/access all 15-25 visual files?
- [ ] All 4 mandatory visuals present?
  - [ ] Development timeline
  - [ ] Performance benchmarks
  - [ ] Market/adoption trend
  - [ ] Competitive positioning map
- [ ] Visual files accessible and can be opened?

IF ANY VERIFICATION FAILS: Stop and complete missing task first.
```

**Process**:

1. **CRITICAL**: Verify ALL prerequisites before starting
2. Load detailed instructions from references/task5-article-assembly.md
3. Execute article assembly workflow:
   - Read Task 1 .md file → Use as foundation for background and technical sections
   - Read Task 2 .xlsx → Extract key tables and data points for inline use
   - Read Task 3 .md → Use narrative hooks and recommendation as editorial frame
   - Load Task 4 assets → Embed charts throughout article
   - Write complete article weaving all sources together
4. Save and deliver final article

**Key Principles**:

- Use Claude's DOCX and XLSX skills where applicable
- Good articles are readable, narrative-driven, data-backed, and visually rich
- Lead with the "so what" — why this topic matters to readers right now
- 1 visual per 300-500 words of content

**GO ALL OUT ON THIS TASK**

**THIS IS THE FINAL DELIVERABLE. DO NOT TAKE SHORTCUTS.**

- **Write every section completely** - Do not summarize or abbreviate
- **Hit ALL minimum requirements** - 3,000-8,000 words, 15+ visuals, 8+ tables
- **Lead with narrative** - Use Task 3 talking points as editorial spine
- **Back every claim with data** - Reference Task 2 workbook throughout
- **Insert ALL visuals from Task 4** - Not just a few, all 15-25 throughout
- **Professional quality only** - Publication-ready on first delivery

**NEVER:**

- "This section would include..." - WRITE THE ACTUAL SECTION
- "Charts would be inserted here..." - INSERT THE ACTUAL CHARTS
- "See data workbook for details..." - EXTRACT AND INCLUDE THE DETAILS
- Skip sections due to length - Every section MUST be complete
- Abbreviate for token conservation

**Output**: Final Article

**Specifications**:

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
- Sources & References (all sources with clickable hyperlinks)

**File name**: `article.md` (saved to `openspec/runtime/deep-research/<slug>/article.md` per Output Directory Convention)

**DELIVER ONLY THIS 1 FILE. NO executive summaries, no "highlights" documents, no extra files.**

**Final Verification**:

- [ ] Article is 3,000-8,000 words
- [ ] 15-25 visuals embedded
- [ ] 8-15 tables included
- [ ] All citations are clickable hyperlinks
- [ ] Data matches workbook
- [ ] Narrative hooks from Task 3 are woven throughout

---

## Input Verification Protocol

### Why Input Verification Matters

Each task has strict prerequisites. Running a task without required inputs will:

- Waste time with incomplete work
- Produce low-quality outputs
- Require rework

**Always verify inputs before starting a task.**

### Verification Checklist by Task

**Task 1**: No verification needed (independent)

**Task 2**: Check data source access available

**Task 3**: Check data workbook exists and is accessible

**Task 4**: Check both workbook (Task 2) AND analysis (Task 3) exist

**Task 5**: Check ALL previous tasks complete (1, 2, 3, 4)

### What to Do if Verification Fails

```
IF prerequisites are missing:
1. Stop the current task
2. Identify which prerequisite task(s) need to be completed
3. Execute the missing task(s) first
4. Return to current task once prerequisites are met
```

### Example Verification Dialogue

```
User: "Use deep-research, Task 5 for AI agents"

Claude: "Starting Task 5: Article Assembly for AI agents

VERIFICATION - Checking prerequisites:
- Task 1 (Topic research)... NOT FOUND
- Task 2 (Data workbook)... NOT FOUND
- Task 3 (Analysis)... NOT FOUND
- Task 4 (Visuals)... NOT FOUND

VERIFICATION FAILED

Task 5 requires ALL previous tasks to be complete.

To proceed:
1. Complete Task 1: Topic Research
2. Complete Task 2: Data Compilation
3. Complete Task 3: Analysis & Synthesis
4. Complete Task 4: Visual Asset Generation
5. Then return to Task 5

Would you like to start with Task 1 first?"
```

---

## Task Reference Files

Detailed instructions for each task are in separate reference files:

- **references/task1-topic-research.md** - Topic research workflow
- **references/task2-data-compilation.md** - Data collection and workbook workflow
- **references/task3-analysis.md** - Analysis and synthesis methodology
- **references/task4-visual-generation.md** - Visual generation workflow and specifications
- **references/task5-article-assembly.md** - Article writing workflow
  - Also see: assets/article-template.md for article structure
  - Also see: assets/quality-checklist.md for quality checks

**When to load reference files**: Load ONLY the reference file associated with the specific task being performed. These files are large — do not load multiple reference files at once.

---

## Quality Standards

All outputs meet high-quality content standards for AI-focused publications:

- **Comprehensive**: Meet all minimum requirements without shortcuts
- **Detailed**: Specific data and examples, not generic statements
- **Quantified**: Lead with numbers and benchmarks
- **Cited**: Proper sources with clickable hyperlinks
- **Narrative**: Strong editorial angle and clear "so what"
- **Accurate**: All numbers verified and cross-checked against sources

---

## Important Notes

### Task Independence

- **Task 1** can run anytime (no dependencies)
- **Task 2** can run anytime (just needs data source access)
- **Tasks 1 & 2** can run in parallel
- **Task 3** requires Task 2
- **Task 4** requires Tasks 2 & 3
- **Task 5** requires Tasks 1, 2, 3, & 4

### Session Management

**Same session**: Outputs automatically available to subsequent tasks

**Different sessions**: Reference previous task outputs explicitly

```
"Use Task 3 with the data workbook from yesterday at [path]"
"Use Task 5 with the research document at [path]"
```

### File Organization

All outputs go to the shared article directory (see **Output Directory Convention** above):

```
openspec/runtime/deep-research/<slug>/
├── research.md              # Task 1
├── data-workbook.md         # Task 2
├── analysis.md              # Task 3
├── images/                  # Task 4
│   ├── chart_01_*.png
│   ├── ...
│   └── chart_index.txt
└── article.md               # Task 5
```

### No End-to-End Execution

This skill does **NOT** support running all tasks automatically in sequence. Each task must be explicitly requested and verified.

**Why**: This ensures:

- Quality control at each stage
- Ability to review outputs before proceeding
- Flexibility to pause/resume workflow
- Clear verification of prerequisites

---

## Success Criteria

A successful deep research article workflow should:

1. Complete all 5 tasks in order
2. Pass all input verifications
3. Meet all quality standards
4. Produce all required deliverables
5. Data cross-checks between outputs
6. Final article is publication-ready

**Output quality**: Professional AI content publication standard
**Use case**: Comprehensive first-time deep-dive on an AI topic or technology
