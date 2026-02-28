# Visual Generation Architecture

The Content Writer agent produces images, infographics, slide decks, comics, and social cards through a layered visual generation system. A single core engine (`ai-image-gen`) handles all provider communication; six specialized skills build on it for specific visual formats.

## Core Engine: ai-image-gen

`ai-image-gen` is the shared image generation engine. It wraps four providers behind a unified interface and is never invoked directly by users for finished content -- it serves as the runtime for all higher-level visual skills.

| Provider        | Env Var               | Strength         |
| --------------- | --------------------- | ---------------- |
| Google (Gemini) | `GOOGLE_API_KEY`      | Default, general |
| OpenAI (DALL-E) | `OPENAI_API_KEY`      | Photorealistic   |
| DashScope       | `DASHSCOPE_API_KEY`   | Chinese market   |
| Replicate       | `REPLICATE_API_TOKEN` | Open models      |

The engine supports aspect ratio control, reference images for style consistency, and sequential or parallel generation modes. Provider selection is configured via EXTEND.md (see below) or overridden per invocation.

Entry point: `workspace-content-writer/skills/ai-image-gen/scripts/main.ts` (bun runtime).

## Visual Skill Hierarchy

```
ai-image-gen (core engine)
├── cover-generator        5-dimension cover system
├── infographic-gen        21 layouts × 20 styles
├── article-illustrator    type × style inline images
├── xhs-card               XiaoHongShu card series
├── slide-generator        16 presets, merge to PPTX/PDF
└── knowledge-comic        5 art × 7 tone × 6 layout, merge to PDF
```

All six skills delegate image generation to `ai-image-gen`. They add format-specific logic: dimension systems, layout selection, prompt construction, and post-processing (merging, packaging).

## Dimension Systems

Each visual skill defines a combinatorial design space that controls output variety.

**cover-generator** -- 5 dimensions: type (6) × palette (9) × rendering (6) × text placement × mood. Supports `--quick` mode for fast single-cover output.

**infographic-gen** -- 21 layout types × 20 visual styles = 420 combinations. Keyword shortcuts `高密度信息大图` and `信息图` map to common presets.

**knowledge-comic** -- 5 art styles × 7 tones × 6 layouts = 210 base combinations. Preset shortcuts (`ohmsha`, `wuxia`, `shoujo`) select curated style bundles. Full pipeline: storyboard, character sheet, page images, PDF merge.

**slide-generator** -- 16 style presets × 4 dimensions (texture, mood, typography, density).

**xhs-card** -- 10 visual styles × 8 layouts. Three outline strategies: story-driven, info-dense, visual-first. Generates 1--10 images per series.

**article-illustrator** -- 6 types × 6+ styles. Analyzes article text to identify illustration insertion points automatically.

## Planning vs Generation Skills

Two pairs of skills address the same visual format but at different stages:

| Planning Skill | Generation Skill  | Relationship                                                                                                          |
| -------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| `infographic`  | `infographic-gen` | infographic designs layouts and content structure; infographic-gen produces the actual images                         |
| `presentation` | `slide-generator` | presentation plans slide structure and speaker notes; slide-generator renders slides as images and merges to PPTX/PDF |

Planning skills output conceptual structures (ASCII layouts, content outlines, speaker notes). Generation skills consume those structures and produce pixel output. Users can use either independently or chain them.

## EXTEND.md Configuration

Seven visual skills support persistent configuration via EXTEND.md:

- **Lookup order**: project-level (`.content-skills/<skill>/EXTEND.md`) then user-level (`$HOME/.content-skills/<skill>/EXTEND.md`)
- **Configurable fields**: default provider, quality, aspect ratio, language, watermark, style preferences
- **Blocking setup**: `knowledge-comic`, `xhs-card`, and `cover-generator` require EXTEND.md to exist before any generation -- they halt and prompt the user to complete first-time setup

## Cross-Cutting Patterns

**Reference image chain** -- Used by `xhs-card` and `knowledge-comic` for visual consistency across multi-image outputs. Generate image 1 without `--ref`, then pass it as `--ref` for all subsequent images. This maintains consistent character design, color palette, and art style.

**Prompt file discipline** -- All image-generating skills save the complete prompt to a text file before calling the generation API. Existing prompt files are backed up with a timestamp before overwriting. On regeneration, the prompt file updates first. This guarantees reproducibility.

## Script-Based Pipelines

Two skills use bun scripts for post-processing multi-image outputs into deliverable formats:

| Skill             | Script                     | Output         |
| ----------------- | -------------------------- | -------------- |
| `knowledge-comic` | `scripts/merge-to-pdf.ts`  | PDF comic book |
| `slide-generator` | `scripts/merge-to-pptx.ts` | PPTX deck      |
| `slide-generator` | `scripts/merge-to-pdf.ts`  | PDF deck       |

Both `slide-generator` and `knowledge-comic` support partial workflow flags: `--outline-only`, `--prompts-only`, `--images-only`, `--regenerate N` for iterating on specific pipeline stages without re-running the full workflow.
