# Style Selection Guide

Style selection for Xiaohongshu infographic series via grouped categories.

## Style Groups

11 styles organized into 4 groups for AskUserQuestion (max 4 options):

| Group               | ID                | Styles                                                  | Best For                                 |
| ------------------- | ----------------- | ------------------------------------------------------- | ---------------------------------------- |
| Recommended         | `auto`            | Content-signal-based auto-selection                     | Default choice                           |
| Warm & Approachable | `warm-group`      | cute, fresh, warm                                       | Lifestyle, beauty, food, personal shares |
| High Impact         | `impact-group`    | bold, pop, retro                                        | News, warnings, comparisons, trending    |
| Knowledge & Craft   | `knowledge-group` | notion, minimal, chalkboard, study-notes, claymorphic-ui | Tutorials, tech, education, reviews      |

## Content Signal → Style Mapping

Auto-selection rules for the "Recommended" option:

| Content Signals                              | Style         | Group           |
| -------------------------------------------- | ------------- | --------------- |
| Beauty, fashion, cute, girl, pink            | `cute`        | warm-group      |
| Health, nature, clean, fresh, organic        | `fresh`       | warm-group      |
| Life, story, emotion, feeling, warm          | `warm`        | warm-group      |
| Warning, important, must, critical, breaking | `bold`        | impact-group    |
| Fun, exciting, wow, amazing, trending        | `pop`         | impact-group    |
| Classic, vintage, old, traditional, retro    | `retro`       | impact-group    |
| Knowledge, concept, productivity, SaaS, tech | `notion`      | knowledge-group |
| Professional, business, elegant, simple      | `minimal`     | knowledge-group |
| Education, tutorial, learning, teaching      | `chalkboard`  | knowledge-group |
| Notes, handwritten, study guide, realistic   | `study-notes`    | knowledge-group |
| Tech product, AI tool, app feature, trendy   | `claymorphic-ui` | knowledge-group |

When multiple signals match, prefer the style with the strongest signal count. If tied, prefer user's `preferred_style` from EXTEND.md.

## AskUserQuestion Structure

### Style Question (Question 2 in Step 4)

```yaml
header: "Style"
question: "选择视觉风格？"
multiSelect: false
options:
  - label: "[auto-selected] (Recommended)"
    description: "[style_reason from content analysis]"
    markdown: |
      Auto-selected: [style name]
      Reason: [why this style fits]

      Preview:
      - Background: [from preset]
      - Decorations: [from preset]
      - Typography: [from preset]

  - label: "Warm & Approachable (cute/fresh/warm)"
    description: "Lifestyle, beauty, personal shares"
    markdown: |
      cute     Sweet, adorable, girly
      fresh    Clean, refreshing, natural
      warm     Cozy, friendly, approachable

      Best for: Reviews, daily life, food, beauty

  - label: "High Impact (bold/pop/retro)"
    description: "Breaking news, comparisons, trending topics"
    markdown: |
      bold     High contrast, attention-grabbing
      pop      Vibrant, energetic, eye-catching
      retro    Vintage, nostalgic, trendy

      Best for: Hot takes, warnings, trend analysis

  - label: "Knowledge & Craft (notion/minimal/chalkboard/study-notes/claymorphic-ui)"
    description: "Tutorials, tech deep-dives, education"
    markdown: |
      notion          Minimalist hand-drawn line art
      minimal         Ultra-clean, sophisticated
      chalkboard      Chalk on black board, educational
      study-notes     Handwritten photo, blue pen + red marks
      claymorphic-ui  3D clay UI, soft panels, floating elements

      Best for: Tech analysis, tutorials, knowledge cards
```

### After Selection

| User Choice    | Action                                                     |
| -------------- | ---------------------------------------------------------- |
| Recommended    | Use auto-selected style directly                           |
| Group selected | Auto-select best style from group based on content signals |
| "Other" typed  | Parse style name or description, map to closest match      |

### Sub-selection (Optional)

If user selects a group and you want to confirm the specific style:

Display the group's styles with 1-line descriptions in the strategy summary. Use the content-signal auto-selection as default. Only ask a follow-up AskUserQuestion if user explicitly requests to choose within the group.

## Strategy × Style Independence

Each strategy (A/B/C) MUST select its style independently from ALL 11 styles based on:

1. **Content signals** — match the strategy's focus to content characteristics
2. **Strategy nature** — story-driven may favor emotional styles, info-dense may favor structured styles
3. **Differentiation** — each strategy MUST recommend a different style

There is NO fixed mapping between strategies and styles. Any strategy can recommend any style.

### Recommendation Priority

1. Content signal match strength (from table above)
2. Strategy-content fit (how well the style serves the strategy's narrative approach)
3. User's `preferred_style` from EXTEND.md (boost but don't force)
4. Differentiation from other strategies (MUST be different)
