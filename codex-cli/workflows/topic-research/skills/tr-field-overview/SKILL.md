---
name: tr-field-overview
description: "Create a comprehensive 3,000-5,000 word overview of an AI sub-field covering definition, history, current state, key players, open problems, and future directions"
arguments:
  - name: input
    description: "AI field name, upstream .openspec.json, or pipeline.openspec.json"
---

## Step 1: Upstream Artifact Detection (MANDATORY — before ANY other interaction)

**CRITICAL**: You MUST complete this step BEFORE any other interaction and BEFORE asking the user for field details. Do NOT skip this step.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If argument is `.openspec.json` or `pipeline.openspec.json`, read it first and prioritize `inputs.field`, then `inputs.topic`, then `outputs.trend_preview_md`.
   - If argument is a field, use it directly.
   - Then skip to Step 2.

2. **Auto-scan OpenSpec contracts**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/trend-preview/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/daily-brief/*.openspec.json 2>/dev/null | head -3
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `inputs.field`, `inputs.topic`, and `outputs.trend_preview_md`.

3. **Auto-scan legacy overview inputs**: Run these Bash commands immediately:

```bash
ls -t openspec/runtime/trend-preview/*.md 2>/dev/null | head -3
ls -t openspec/runtime/daily-brief/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下领域综述素材，请选择要用于子领域概览的输入：" with files as options.

4. **No upstream found**: Only in this case, ask which AI sub-field to cover.

## Language Selection (MANDATORY — after Step 1)

After completing Step 1 and before generating content output, ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 2: Execute Field Overview

Create a comprehensive, authoritative overview of an AI sub-field — suitable for a reader who wants to understand the landscape without diving into a single specific topic.

A field overview is broader than a deep-research article. It covers the entire sub-field — its history, internal structure, major research threads, key players, and future directions.

### Step 2.1: Define Scope and Boundaries

Before researching, establish:
- What exactly is included in this field? (e.g., "NLP" includes text generation, classification, translation, etc.)
- What is excluded? (what is adjacent but not part of this field?)
- What are the major sub-topics within this field?
- How does this field relate to other AI sub-fields?

Document a 1-paragraph scope definition to anchor the research.

### Step 2.2: Research History and Key Milestones

- When did this field emerge?
- What are the 5-10 defining moments in its history?
- What were the paradigm shifts? (e.g., for NLP: rule-based -> statistical -> neural -> transformers)
- Who are the founding researchers or labs?
- What is the field's relationship to its parent disciplines?

### Step 2.3: Map the Current State

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

### Step 2.4: Identify Open Problems and Future Directions

- What are the 3-5 most important unsolved problems?
- What are researchers most actively working on?
- What are the long-term grand challenges?
- What technical breakthroughs would unlock step-change progress?
- What are the field's internal debates and disagreements?

### Step 2.5: Write the Overview

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

## Artifact Handoff

**Output**: Field overview saved to `openspec/runtime/field-overview/YYYY-MM-DD-<field>-overview.md`

**OpenSpec contract (MANDATORY)**:

- Create or update `openspec/runtime/field-overview/YYYY-MM-DD-<field>-overview.openspec.json`.
- Minimum fields:
  - `pipeline`: `field-overview->long-article`
  - `stage`: `field-overview`
  - `outputs.field_overview_md`: overview path
  - `next.command`: `long-article`
  - `next.input`: field overview path or contract path

**Next step**: Suggest running a long-article skill to turn the overview into a publishable long-form piece.

## Quality Standards

- 3,000-5,000 word total
- All claims cited with sources
- History section covers paradigm shifts, not just a list of dates
- Current state covers all four dimensions
- Open problems are specific and substantive — not vague ("more research needed")
- Future directions are grounded in current research signals
