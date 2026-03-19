---
name: skill-creator
description: "Create or update a reusable skill for content workflows"
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - AskUserQuestion
---

# Skill Creator

This skill provides guidance for creating effective skills for AI content workflows.

## About Skills

Skills are modular, self-contained packages that extend Claude's capabilities by providing specialized knowledge, workflows, and tools. Think of them as "onboarding guides" for specific domains or tasks — they transform Claude from a general-purpose agent into a specialized agent equipped with procedural knowledge.

### What Skills Provide

1. Specialized workflows — Multi-step procedures for specific content tasks
2. Tool integrations — Instructions for working with specific platforms or APIs
3. Domain expertise — Niche-specific knowledge, schemas, business logic
4. Bundled resources — Scripts, references, and assets for complex or repetitive tasks

## Core Principles

### Concise is Key

The context window is a public good. Only add context Claude doesn't already have. Challenge each piece of information: "Does Claude really need this?" and "Does this justify its token cost?"

Prefer concise examples over verbose explanations.

### Set Appropriate Degrees of Freedom

Match the level of specificity to the task's fragility and variability:

**High freedom**: Use when multiple approaches are valid or decisions depend on context.
**Medium freedom**: Use when a preferred pattern exists but some variation is acceptable.
**Low freedom**: Use when operations are fragile, consistency is critical, or a specific sequence must be followed.

### Anatomy of a Skill

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter: name, description
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/       — Executable code
    ├── references/    — Documentation to load as needed
    └── assets/        — Files used in output (templates, etc.)
```

## Skill Creation Process

### Step 1: Understand the Skill with Concrete Examples

Clarify the skill's usage patterns:
- "What content workflows should this skill support?"
- "Give me 2-3 examples of how you'd use this skill."
- "What would a user say to trigger this skill?"

For an AI content workflow skill, examples might be: "Analyze this YouTube video script for engagement", "Create a content calendar for a tech newsletter", "Find the best hook formula for AI explainer videos."

### Step 2: Plan Reusable Skill Contents

For each example, identify what would need to be rewritten each time without a skill, and what reusable resource would help:

| Example | Repeated Work | Reusable Resource |
|---------|---------------|-------------------|
| Analyze YouTube scripts | Finding engagement pattern checklist | `references/engagement-patterns.md` |
| Build content calendars | Calendar structure and frequency logic | `assets/calendar-template.md` |
| Hook formula research | Web search + synthesis | `references/hook-formulas.md` |

### Step 3: Initialize the Skill

Create the skill directory:
```
mkdir -p skill-name/{scripts,references,assets}
touch skill-name/SKILL.md
```

### Step 4: Edit the Skill

**Frontmatter guidelines:**
- `name`: kebab-case skill name
- `description`: What the skill does AND when to trigger it. This is the primary triggering mechanism — be specific. Include content domain examples.

Example description for a YouTube script skill:
> "Create, review, and optimize YouTube video scripts for AI and tech content. Use when writing a new script, auditing an existing script for engagement, optimizing a script for retention, or adapting long-form content into YouTube format."

**Body guidelines:**
- Lead with the workflow, not background theory
- Use numbered steps with clear action verbs
- Reference bundled files explicitly: "See `references/engagement-patterns.md` for..."
- Keep SKILL.md under 500 lines; move detailed content to reference files

**Progressive disclosure principle:**
- SKILL.md body: core workflow only (<500 lines)
- `references/`: detailed criteria, examples, schemas
- `assets/`: templates and output files

### Step 5: Package the Skill

Validate the skill before distribution:
- YAML frontmatter has `name` and `description`
- `description` clearly states when to trigger the skill
- No extraneous files (README, CHANGELOG, etc.)
- All referenced files exist in the directory

### Step 6: Iterate

After real usage:
1. Notice where the skill struggles or produces inconsistent output
2. Update SKILL.md with tighter guidance on the failure points
3. Add reference files for patterns that needed to be re-specified each run

## What NOT to Include in a Skill

- README.md, CHANGELOG.md, or any user-facing documentation
- Background context about how the skill was created
- Information Claude already knows (general writing advice, basic platform facts)
- Duplicate content across SKILL.md and reference files — pick one location per piece of information
