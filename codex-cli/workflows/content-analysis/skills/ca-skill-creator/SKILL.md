---
name: ca-skill-creator
description: "Create or update a reusable skill for content workflows"
arguments:
  - name: input
    description: "Skill name/description, reference path, or pipeline.openspec.json"
---

# Skill Creator

## Step 1: Upstream Artifact Detection (MANDATORY)

Complete this step BEFORE any other interaction.

**Detection order** (stop at first hit):

1. **Explicit argument**:
   - If `$ARGUMENTS` is `pipeline.openspec.json`, read it first and prioritize `inputs.workflow`, then `outputs.template_md`, then `outputs.strategy_memo_md`.
   - If `$ARGUMENTS` is skill name/description or reference path, use it directly.
   - Then skip to Step 3.

2. **Auto-scan OpenSpec contracts**:

```bash
ls -t openspec/runtime/deep-research/*/pipeline.openspec.json 2>/dev/null | head -3
```

If contracts found, read and prioritize `inputs.workflow`, `outputs.template_md`, and `outputs.strategy_memo_md`.

3. **Auto-scan legacy skill-design assets**:

```bash
ls -t openspec/runtime/templates/*.md 2>/dev/null | head -3
ls -t openspec/runtime/strategy-memo/*.md 2>/dev/null | head -3
ls -t openspec/runtime/skill-creator/*.md 2>/dev/null | head -3
```

If files found, ask the user: "检测到以下技能设计素材，请选择要用于技能封装的输入：" with files as options.

4. **No upstream found**: Only in this case, ask what workflow should be packaged into a reusable skill.

## Step 2: Language Selection (MANDATORY)

Ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

## Step 3: Understand the Skill with Concrete Examples

Clarify the skill's usage patterns:
- "What content workflows should this skill support?"
- "Give me 2-3 examples of how you'd use this skill."
- "What would a user say to trigger this skill?"

For an AI content workflow skill, examples might be: "Analyze this YouTube video script for engagement", "Create a content calendar for a tech newsletter", "Find the best hook formula for AI explainer videos."

## Step 4: Plan Reusable Skill Contents

For each example, identify what would need to be rewritten each time without a skill, and what reusable resource would help:

| Example | Repeated Work | Reusable Resource |
|---------|---------------|-------------------|
| Analyze YouTube scripts | Finding engagement pattern checklist | `references/engagement-patterns.md` |
| Build content calendars | Calendar structure and frequency logic | `assets/calendar-template.md` |
| Hook formula research | Web search + synthesis | `references/hook-formulas.md` |

## Step 5: Initialize the Skill

Create the skill directory:
```
mkdir -p skill-name/{scripts,references,assets}
touch skill-name/SKILL.md
```

## Step 6: Edit the Skill

**Frontmatter guidelines:**
- `name`: kebab-case skill name
- `description`: What the skill does AND when to trigger it. This is the primary triggering mechanism — be specific. Include content domain examples.

**Body guidelines:**
- Lead with the workflow, not background theory
- Use numbered steps with clear action verbs
- Reference bundled files explicitly: "See `references/engagement-patterns.md` for..."
- Keep SKILL.md under 500 lines; move detailed content to reference files

**Progressive disclosure principle:**
- SKILL.md body: core workflow only (<500 lines)
- `references/`: detailed criteria, examples, schemas
- `assets/`: templates and output files

## Step 7: Package the Skill

Validate the skill before distribution:
- YAML frontmatter has `name` and `description`
- `description` clearly states when to trigger the skill
- No extraneous files (README, CHANGELOG, etc.)
- All referenced files exist in the directory

## Step 8: Iterate

After real usage:
1. Notice where the skill struggles or produces inconsistent output
2. Update SKILL.md with tighter guidance on the failure points
3. Add reference files for patterns that needed to be re-specified each run

## What NOT to Include

- README.md, CHANGELOG.md, or any user-facing documentation
- Background context about how the skill was created
- Information Claude already knows (general writing advice, basic platform facts)
- Duplicate content across SKILL.md and reference files — pick one location per piece of information

## Artifact Handoff

**Output**: Skill design result saved to `openspec/runtime/skill-creator/YYYY-MM-DD-<skill-slug>-spec.md`.

**Next step**: Suggest implementing the generated skill design in the target plugin.
