# Visual Content Guide

Practical recipes for generating visual content with the Content Writer agent. Each section is a self-contained workflow.

## Generating Article Covers

Use `cover-generator` to create a cover image for any article.

1. Provide the article title and a brief description of the mood or theme.
2. The skill selects from 5 dimensions (type, palette, rendering, text, mood) and generates a cover prompt.
3. For fast iteration, pass `--quick` to skip dimension exploration and produce a single cover immediately.

The generated cover image and its prompt file are saved to the working directory. To regenerate with a different style, describe the change -- the skill updates the prompt file first, then regenerates.

## Creating Infographics

Two skills work together for infographic production:

- **`infographic`** (planning): Define the data layout, section structure, and content hierarchy. Outputs an ASCII layout reference and content outline. Use this when you need to design the infographic's information architecture before rendering.
- **`infographic-gen`** (generation): Produce the actual infographic image. Choose from 21 layout types and 20 visual styles. For Chinese-language infographics, use the shortcuts `高密度信息大图` or `信息图` to select common presets.

You can use `infographic-gen` directly if you already know what layout and content you want. Chain them (`infographic` then `infographic-gen`) for complex data-heavy visuals that benefit from structural planning.

## Making Knowledge Comics

`knowledge-comic` produces multi-page educational comics with a full pipeline:

1. **First-time setup**: The skill requires EXTEND.md configuration before generating. It will prompt you to select art style, tone, layout, and provider preferences. This only happens once.
2. **Storyboard**: Provide the topic and key points. The skill generates a page-by-page storyboard with panel descriptions.
3. **Character sheet**: A reference character sheet is generated first (no `--ref`) to establish visual consistency.
4. **Page generation**: Each subsequent page uses the character sheet as `--ref` to maintain consistent art style.
5. **PDF merge**: `scripts/merge-to-pdf.ts` combines all pages into a single PDF.

Preset shortcuts -- `ohmsha` (technical textbook style), `wuxia` (martial arts ink wash), `shoujo` (soft manga) -- skip manual dimension selection. Use `--outline-only` to review the storyboard before committing to image generation.

## Building Slide Decks

`slide-generator` renders slide content as styled images and merges them into presentation files.

1. Provide the topic, key points, and target audience. Optionally chain from `presentation` (the planning skill) for structured slide outlines with speaker notes.
2. Select a style preset (16 available) or specify dimensions: texture, mood, typography, density.
3. The skill generates one image per slide, then runs `scripts/merge-to-pptx.ts` and `scripts/merge-to-pdf.ts` to produce deliverable files.

Use `--prompts-only` to review all slide prompts before generating images. Use `--regenerate 3` to regenerate only slide 3 without re-running the full deck.

## XiaoHongShu Card Series

`xhs-card` produces 1--10 image cards optimized for XiaoHongShu (Little Red Book).

1. **First-time setup**: Requires EXTEND.md configuration (provider, default style).
2. Choose an outline strategy: story-driven (narrative arc), info-dense (data-heavy), or visual-first (image-led with minimal text).
3. Select from 10 visual styles and 8 layouts.
4. The first card generates without `--ref`. All subsequent cards use card 1 as the reference image, ensuring a cohesive visual series.

## Setting Up EXTEND.md

Seven visual skills read persistent configuration from EXTEND.md. To configure:

1. Create the file at either location:
   - Project-level: `.content-skills/<skill-name>/EXTEND.md`
   - User-level: `$HOME/.content-skills/<skill-name>/EXTEND.md`
2. Project-level config takes priority over user-level.
3. Common settings: `default_provider` (google/openai/dashscope/replicate), `quality`, `aspect_ratio`, `language`, `watermark`.

Three skills (`knowledge-comic`, `xhs-card`, `cover-generator`) block execution until EXTEND.md exists. Other visual skills use provider defaults when no EXTEND.md is found.

Ensure the corresponding API key environment variable is set for your chosen provider (see TOOLS.md for the full list).
