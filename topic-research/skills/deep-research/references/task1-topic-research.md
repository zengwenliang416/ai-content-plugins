# Task 1: Topic Research - Detailed Workflow

This document provides step-by-step instructions for executing Task 1 (Topic Research) of the deep-research skill.

## Task Overview

**Purpose**: Research an AI topic's background, key players, development history, current state, competing approaches, applications, and risks.

**Prerequisites**: None (fully independent)

- Topic name or technology name only

**Output**: Topic Research Document (6,000-8,000 words)

---

## Data Sources to Gather

### Primary Sources

- **arXiv**: Foundational papers, survey papers, recent SOTA results
- **Conference proceedings**: NeurIPS, ICML, ICLR, CVPR, ACL, EMNLP
- **Company research blogs**: Google DeepMind, OpenAI, Anthropic, Meta AI, Microsoft Research
- **GitHub repositories**: Key implementations, star counts, contributor activity
- **HuggingFace**: Model cards, leaderboards, dataset pages

### Secondary Sources (via news-search CLI)

- **Tech media**: The Verge, Wired, MIT Technology Review, VentureBeat, The Information
  - `bun news-search/scripts/search.ts web "<topic>" 10`
  - `bun news-search/scripts/search.ts exa "<topic> research" 10`
- **Industry analysts**: Gartner, Forrester, IDC, a16z, Sequoia AI reports
- **Newsletters** (via news-search RSS):
  - `bun news-search/scripts/search.ts rss "https://importai.substack.com/feed" 10`
  - `bun news-search/scripts/search.ts rss "https://deeplearning.ai/the-batch/feed" 10`
- **Podcasts/videos**: Lex Fridman, Dwarkesh Patel, 80,000 Hours, conference talks

### Key Information to Extract

- Field origins and founding moments
- Breakthrough papers and their authors/labs
- Current state-of-the-art approaches and results
- Key companies and research labs active in the space
- Open-source ecosystem health
- Real-world deployment examples
- Known failure modes and limitations
- Regulatory and ethical debates

---

## Step-by-Step Research Workflow

### Step 1: Initial Landscape Survey

1. **Define the topic precisely**
   - What is the canonical name for this technology?
   - Are there sub-fields or variants to distinguish?
   - What adjacent topics exist?

2. **Search for survey papers**
   - Search arXiv for "[topic] survey" or "[topic] review"
   - Identify the 2-3 most-cited survey papers
   - Note publication dates to understand field age

3. **Identify foundational papers**
   - What paper(s) "started" this field or sub-field?
   - What are the 5-10 most-cited papers?
   - What was the breakthrough moment?

4. **Map the ecosystem**
   - Which labs/companies are most active?
   - Which researchers are most cited?
   - What open-source projects are most starred?

### Step 2: Background and History Research

1. **Trace the origins**
   - When was the core idea first proposed?
   - Who were the pioneers?
   - What earlier work does it build on?

2. **Build the milestone timeline**
   - Year-by-year major breakthroughs
   - Key benchmark records broken
   - First real-world deployments
   - Major pivots or paradigm shifts

3. **Document the current state**
   - What is state-of-the-art today?
   - What benchmarks exist and who leads them?
   - What are the open problems?

### Step 3: Key Players Research

For each major player (companies, research labs, open-source projects):

1. **Identify the major players**
   - Leading commercial providers
   - Top academic/research labs
   - Significant open-source contributors
   - Emerging challengers

2. **Research each player**
   - Key products or models in this space
   - Notable papers or breakthroughs
   - Approach or philosophy (how they differ)
   - Strengths and known weaknesses
   - Market position or community size

3. **Assess the landscape**
   - Who leads on performance?
   - Who leads on accessibility/openness?
   - Who leads on commercial adoption?
   - Where are the gaps?

### Step 4: Technical Deep Dive

1. **Explain the core mechanism**
   - What problem does it solve?
   - How does it work at a conceptual level?
   - What are the key algorithms or architectures?
   - What data or compute does it require?

2. **Map competing approaches**
   - What are the main technical approaches within this field?
   - What are the trade-offs between them?
   - Which approach is winning and why?

3. **Document key concepts**
   - What terms does a reader need to know?
   - What misconceptions exist?
   - What are common oversimplifications to avoid?

### Step 5: Applications and Use Cases

1. **Identify application domains**
   - Which industries are adopting this?
   - What specific tasks does it enable?
   - What are the most compelling real-world examples?

2. **Assess deployment readiness**
   - Is this research-stage or production-ready?
   - What are the barriers to adoption?
   - What companies have deployed at scale?

3. **Find concrete case studies**
   - Specific companies and their results
   - Before/after comparisons
   - Metrics that demonstrate value

### Step 6: Risk and Challenge Assessment

Identify 8-12 risks across categories. For each risk, write 50-100 words.

**Technical Risks (3-4 risks):**

- Performance limitations and failure modes
- Compute/data requirements
- Reliability and robustness issues
- Benchmark vs. real-world gap

**Adoption Risks (2-3 risks):**

- Integration complexity
- Skill gaps and talent constraints
- Cost and ROI uncertainty
- Vendor lock-in

**Ethical/Societal Risks (2-3 risks):**

- Bias and fairness concerns
- Privacy implications
- Misuse potential
- Labor market impacts

**Regulatory Risks (1-2 risks):**

- Existing or pending regulations
- Compliance uncertainty
- Geographic fragmentation

**For each risk:**

- Describe clearly with examples
- Quantify impact where possible
- Note mitigating factors or counterarguments

### Step 7: Synthesis and Writing

**Write document following this structure:**

1. **Technology Overview** (800-1,200 words)
   - What is it? (plain English, no jargon)
   - Why does it matter? (real-world impact)
   - Where does it fit in the broader AI landscape?
   - Key metrics or scale indicators

2. **Development Timeline** (600-900 words)
   - Founding moment and early work
   - Chronological milestones
   - Paradigm shifts or pivots
   - Recent developments (last 12-18 months)

3. **Technical Deep Dive** (800-1,200 words)
   - Core mechanism explained
   - Key architectures or algorithms
   - Competing approaches and trade-offs
   - Key concepts and terminology

4. **Key Players & Products** (700-1,000 words)
   - 5-10 major players with profiles
   - Their approaches and differentiators
   - Open-source ecosystem
   - Market/community positioning

5. **Applications & Use Cases** (500-700 words)
   - Industry adoption map
   - Specific deployment examples
   - Enabling capabilities
   - Adoption barriers

6. **Competitive Landscape** (700-1,000 words)
   - Comparison of approaches
   - Strengths/weaknesses framework
   - Who is winning and why
   - Emerging challengers

7. **Risks & Challenges** (600-900 words)
   - Technical limitations (3-4)
   - Adoption barriers (2-3)
   - Ethical/societal concerns (2-3)
   - Regulatory risks (1-2)
   - Each: 50-100 word description with mitigants

**Data Sources Section**

- List all sources used
- Include dates and URLs
- Organize by source type

---

## Quality Standards

### Content Depth

- Every section must meet minimum word count targets
- Analysis must be substantive — not just descriptive
- Use specific papers, benchmarks, and product examples
- Cite sources throughout with dates
- Maintain technical accuracy

### Player Profiles

- Cover at least 5 major players
- Include both commercial and open-source
- Differentiate each player's approach
- Note concrete strengths and weaknesses

### Risk Assessment

- 8-12 distinct risks across all four categories
- 50-100 word description per risk
- Real examples where possible
- Include mitigating factors

### Writing Quality

- Lead with "why this matters"
- Use concrete benchmarks and metrics
- Avoid hype language ("revolutionary", "game-changing")
- Explain jargon on first use
- Proper source citations throughout

---

## Output Format

```
TOPIC RESEARCH: [Topic Name]
Date: [Date]

TABLE OF CONTENTS
1. Technology Overview
2. Development Timeline
3. Technical Deep Dive
4. Key Players & Products
5. Applications & Use Cases
6. Competitive Landscape
7. Risks & Challenges

======================================

1. TECHNOLOGY OVERVIEW (800-1,200 words)
[Content]

2. DEVELOPMENT TIMELINE (600-900 words)
[Content]

3. TECHNICAL DEEP DIVE (800-1,200 words)
[Content]

4. KEY PLAYERS & PRODUCTS (700-1,000 words)
[Content]

5. APPLICATIONS & USE CASES (500-700 words)
[Content]

6. COMPETITIVE LANDSCAPE (700-1,000 words)
[Content]

7. RISKS & CHALLENGES (600-900 words)

Technical Risks:
[3-4 risks with descriptions]

Adoption Risks:
[2-3 risks with descriptions]

Ethical/Societal Risks:
[2-3 risks with descriptions]

Regulatory Risks:
[1-2 risks with descriptions]

======================================

DATA SOURCES
[List all sources with dates and URLs]
```

---

## Success Criteria

A successful Task 1 completion:

1. Meets 6,000-8,000 word target
2. Includes all 7 required sections with target word counts
3. Provides substantive analysis, not just description
4. Uses specific papers, benchmarks, products, and companies
5. Cites all sources properly
6. Enables reader to understand:
   - What the technology is and how it works
   - Who the key players are and how they differ
   - What the real-world applications are
   - What the risks and limitations are
   - Where the field is headed

---

## Output Path

Save to: `openspec/runtime/deep-research/<slug>/research.md`

Example: `openspec/runtime/deep-research/llm-agents/research.md`
