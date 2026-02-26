# Task 5: Article Assembly - Detailed Workflow

This document provides step-by-step instructions for executing Task 5 (Article Assembly) of the deep-research skill.

## Task Overview

**Purpose**: Assemble all research, data, analysis, and visuals into a final publication-ready article.

**Prerequisites**: ALL of Tasks 1, 2, 3, and 4 complete

**Output**: Final article (.md or .docx), 3,000-8,000 words

---

## Pre-Assembly Checklist

Before writing a single word, load and review all inputs:

1. **Read Task 1 document** — absorb all research, note the best explanations and examples
2. **Scan Task 2 workbook** — identify the 8-15 most compelling data points and tables to feature
3. **Read Task 3 analysis** — internalize the content recommendation, narrative hooks, and talking points
4. **Review Task 4 chart index** — note which charts go in which sections (use placement suggestions)

---

## Article Structure

Load `assets/article-template.md` for the full template with section headers.

### Section 1: Hook & Why It Matters (300-500 words)

**Goal**: Pull the reader in immediately. Establish stakes.

**Content**:
- Open with the most compelling fact, tension, or question from this topic
- State why this matters right now (use narrative hook from Task 3)
- Preview the article structure briefly

**Visuals**: 1 opening visual (often chart_02 field overview or chart_01 timeline)

**Tips**:
- Do NOT open with "Artificial intelligence is transforming..."
- Open with a specific fact, number, quote, or scenario
- The first sentence determines whether the reader continues

### Section 2: What It Is — Technical Overview (600-1,000 words)

**Goal**: Give the reader enough technical grounding to follow the rest.

**Content** (from Task 1, Section 3 Technical Deep Dive):
- Core mechanism explained in plain language
- Key concepts defined on first use
- What problem it solves and why existing approaches don't
- Key architectures or algorithms (high-level, not implementation detail)

**Visuals**: chart_03 (architecture diagram), chart_04 (mechanism comparison)

**Tips**:
- Write for a smart non-expert. Avoid jargon without definition.
- Use analogies to make abstract concepts concrete
- The "how it works" section should be memorable, not just accurate

### Section 3: How It Got Here — Development History (400-700 words)

**Goal**: Give context on the field's trajectory and where we are in it.

**Content** (from Task 1, Section 2 Development Timeline):
- When and why this field emerged
- 3-5 pivotal moments (not exhaustive — choose the most important)
- The "moment everything changed" — what breakthrough opened the current era

**Visuals**: chart_01 (development timeline), chart_02 (paper volume growth)

**Tips**:
- Don't be exhaustive — choose milestones that explain "how we got here"
- Connect history to the present: "That 2017 paper is why today's systems can..."
- A good history section makes the current landscape feel inevitable in retrospect

### Section 4: The Landscape — Key Players & Approaches (800-1,200 words)

**Goal**: Map who is building what, and how to think about the competitive dynamics.

**Content** (from Task 1 key players + Task 3 comparative analysis):
- 5-10 major players with profile summaries
- What differentiates each approach (technical, business model, philosophy)
- Who is leading on performance, access, and adoption
- The key tensions (open vs. closed, scale vs. efficiency, etc.)

**Visuals**: chart_06 (player comparison), chart_08 (ecosystem map), chart_14 (positioning map)

**Tips**:
- Group players by archetype rather than listing alphabetically
- Name the key tensions explicitly — readers want to understand the dynamics
- Include open-source ecosystem even if less commercially prominent

### Section 5: The Numbers — Data & Benchmarks (500-800 words)

**Goal**: Ground the narrative in quantitative reality.

**Content** (from Task 2 workbook):
- 3-5 key benchmark results (use table from Tab 3)
- Market size and adoption trajectory (from Tabs 1 and 4)
- 2-3 "wow" data points that crystallize the scale of what's happening

**Visuals**: chart_05 (benchmarks), chart_09 (adoption), chart_10 (market size)

**Tables to embed**:
- Benchmark comparison table (players × benchmarks)
- Market size table (year × estimate × source)
- Adoption metrics summary (players × key metrics)

**Tips**:
- Lead each sub-section with the most striking number
- Always cite sources for every data point
- Explain what benchmarks actually measure — don't assume reader knows

### Section 6: What's Next — Trajectory & Scenarios (400-600 words)

**Goal**: Give the reader a forward-looking view grounded in current signals.

**Content** (from Task 3 trajectory + Task 2 scenarios):
- Base case: what happens if current trends continue
- Bull case: what accelerates progress
- Bear case: what could stall or derail
- Key variables to watch (inflection points, upcoming events)

**Visuals**: chart_15 (scenario projections), chart_16 (trajectory roadmap)

**Tips**:
- Be honest about uncertainty — use confidence levels
- Name specific events or triggers to watch (conferences, product launches, paper deadlines)
- The forward-looking section is where the article becomes a tool, not just information

### Section 7: Risks & Watch-outs (400-600 words)

**Goal**: Give the reader a balanced view — what could go wrong.

**Content** (from Task 1 risks section, Task 3 analysis):
- Top 4-6 risks (select the most important from the full list)
- Technical, adoption, ethical, and regulatory risks
- Mitigating factors where relevant

**Visuals**: chart_13 (moat analysis can double as risk framing)

**Tips**:
- Don't be cynical, but don't be a hype piece either
- Acknowledge risks even for very promising technologies
- Frame risks as "things to watch" not "reasons to dismiss"

### Section 8: Takeaways & Content Angle (200-300 words)

**Goal**: Send the reader away with 3-5 clear takeaways and a recommendation.

**Content** (from Task 3 recommendation + talking points):
- 3-5 bullet takeaways (the "tl;dr" of the whole article)
- Content angle/recommendation: what story this enables for the writer/operator
- Call to action or next read

**No visuals needed in this section.**

### Sources & References

List all sources used throughout the article:
- Format: Author/Organization. "Title." Publication. Date. URL.
- All URLs should be clickable hyperlinks
- Organize by section or type

---

## Writing Principles

### Voice and Tone
- Authoritative but accessible
- Analytical, not hype-driven
- Specific over vague: "GPT-4 scored 86.4 on MMLU" not "performed strongly"
- Honest about uncertainty

### Data Integration
- Every major claim in Sections 2-6 should be backed by a number or citation
- Tables should have source lines
- Charts should have figure captions

### Visual Placement
- Embed visuals inline, near the text that discusses them
- Target: 1 visual per 300-500 words
- Caption format: `*Figure N: [Description]. Source: [Source].*`

### Editorial Spine
- The narrative hooks from Task 3 should be woven throughout
- The article should have a point of view, not just be a survey
- The "why now" should be answered in Section 1 and reinforced in Section 6

---

## Final Quality Checklist

Load `assets/quality-checklist.md` for the complete checklist.

Key checks:
- [ ] 3,000-8,000 word count verified
- [ ] All 8 sections present
- [ ] 15-25 visuals embedded
- [ ] 8-15 data tables included
- [ ] All claims backed by citations
- [ ] All URLs are clickable hyperlinks
- [ ] Narrative hooks from Task 3 woven throughout
- [ ] Data matches Task 2 workbook
- [ ] No hype language without evidence
- [ ] Sources section complete

---

## File Naming Convention

`[Topic]_Article_[Date].md`

Example: `AI_Agents_Article_2026-02-25.md`
