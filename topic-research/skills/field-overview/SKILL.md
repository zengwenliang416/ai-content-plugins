---
name: field-overview
description: "Create a comprehensive 3,000-5,000 word overview of an AI sub-field covering definition, history, current state, key players, open problems, and future directions"
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebSearch
  - WebFetch
  - AskUserQuestion
---

# Field Overview

Create a comprehensive, authoritative overview of an AI sub-field — suitable for a reader who wants to understand the landscape without diving into a single specific topic.

## Overview

A field overview is broader than a deep-research article. It covers the entire sub-field — its history, internal structure, major research threads, key players, and future directions.

**Output**: Field overview document (3,000-5,000 words, Markdown)

---

## Workflow

### Step 1: Define Scope and Boundaries

Before researching, establish:
- What exactly is included in this field? (e.g., "NLP" includes text generation, classification, translation, etc.)
- What is excluded? (what is adjacent but not part of this field?)
- What are the major sub-topics within this field?
- How does this field relate to other AI sub-fields?

Document a 1-paragraph scope definition to anchor the research.

### Step 2: Research History and Key Milestones

- When did this field emerge?
- What are the 5-10 defining moments in its history?
- What were the paradigm shifts? (e.g., for NLP: rule-based → statistical → neural → transformers)
- Who are the founding researchers or labs?
- What is the field's relationship to its parent disciplines?

### Step 3: Map the Current State

Research the current landscape across four dimensions:

**1. Key players**
- Academic groups and labs (top 5-10)
- Industry labs (top 5-10)
- Open-source communities and projects
- Note: what each is known for and their relative influence

**2. Major approaches and paradigms**
- What are the current dominant approaches?
- What are the competing schools of thought?
- What has been tried and abandoned? (and why)
- What are the current SOTA techniques?

**3. Benchmarks and evaluation**
- What are the canonical benchmarks for this field?
- Who holds current SOTA on each?
- What benchmarks are contested or criticized?
- Are there gaps in evaluation that the community debates?

**4. Applications and deployment**
- Where is this field having real-world impact today?
- Which industries are most affected?
- What are the most impressive deployed systems?
- What gap remains between research and deployment?

### Step 4: Identify Open Problems and Future Directions

- What are the 3-5 most important unsolved problems?
- What are researchers most actively working on?
- What are the long-term grand challenges?
- What technical breakthroughs would unlock step-change progress?
- What are the field's internal debates and disagreements?

### Step 5: Write the Overview

Structure:
1. **Introduction** (300-500 words): What is this field, why does it matter, what will this document cover
2. **Definition and Scope** (200-300 words): Precise definition, sub-topics, boundaries
3. **History and Milestones** (400-600 words): Key moments, paradigm shifts, founding figures
4. **Current State** (1,000-1,400 words):
   - Major approaches and paradigms
   - Key players (academic + industry)
   - SOTA benchmarks and results
   - Real-world applications
5. **Open Problems** (400-600 words): 3-5 unsolved challenges with context
6. **Future Directions** (300-500 words): Where the field is heading
7. **Resources for Further Reading** (100-200 words): Key papers, courses, communities

---

## Output Format

```markdown
# [Field Name]: A Comprehensive Overview

*Date: [Date] | Scope: [Brief scope statement]*

---

## Introduction
[300-500 words]

## Definition and Scope
[200-300 words]

## History and Milestones
[400-600 words]

## Current State

### Major Approaches and Paradigms
[400-600 words]

### Key Players
[300-500 words]

### Benchmarks and Evaluation
[200-300 words]

### Applications and Deployment
[200-300 words]

## Open Problems
[400-600 words]

## Future Directions
[300-500 words]

## Resources for Further Reading
[100-200 words — key papers, courses, communities]

---

*Sources: [all citations with URLs]*
```

---

## Quality Standards

- **Anti-AI writing rules** — load `content-utilities/skills/humanizer/references/writing-rules.md` during writing. Avoid AI vocabulary, significance inflation, filler phrases, generic conclusions. Write like a person.
- 3,000-5,000 word total
- All claims cited with sources
- History section covers paradigm shifts, not just a list of dates
- Current state covers all four dimensions
- Open problems are specific and substantive — not vague ("more research needed")
- Future directions are grounded in current research signals
