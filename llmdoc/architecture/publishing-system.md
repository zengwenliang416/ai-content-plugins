# Publishing System Architecture

## Safety Model

All publishing is **human-in-the-loop**. No skill auto-publishes content. Publishing skills automate form filling and content preparation, then halt and require explicit user confirmation before submission. Every publish action is logged with a timestamp.

## Platforms

| Platform                | Methods              | Content Types                            |
| ----------------------- | -------------------- | ---------------------------------------- |
| WeChat Official Account | REST API, Chrome CDP | Articles, image-text posts               |
| X / Twitter             | Chrome CDP only      | Text, images, videos, long-form articles |

WeChat supports two paths: the API covers article creation, while browser automation handles image-text formatting preview. X has no suitable posting API, so all posting uses Chrome CDP.

## Publishing Pipeline

Three skills form a directed chain:

```
wechat-publisher  ──>  md-to-html  ──>  md-formatter
```

- **wechat-publisher** calls `md-to-html` for WeChat-compatible HTML, validates metadata, fills the editor, and waits for user confirmation.
- **md-to-html** converts Markdown to styled HTML. Optionally calls `md-formatter` for CJK typography normalization.
- **md-formatter** handles CJK-Latin spacing, punctuation normalization, frontmatter/heading/list cleanup, and quote correction.

The X publisher handles content conversion internally via a bundled `md-to-html.ts` and clipboard operations.

## Content Format Conversion

**md-to-html** produces self-contained HTML with inline CSS (WeChat strips `<style>` tags). Three themes:

| Theme     | Style                      | Use Case          |
| --------- | -------------------------- | ----------------- |
| `default` | Clean, neutral             | General articles  |
| `grace`   | Elegant serif with accents | Premium/editorial |
| `simple`  | Minimal, high-contrast     | Technical posts   |

**md-formatter** is a CJK typography preprocessor: CJK-Latin spacing, fullwidth/halfwidth punctuation, Markdown structure cleanup, and quote normalization (`quotes.ts`, `autocorrect.ts`).

## Content Utilities

| Skill              | Purpose                                                         |
| ------------------ | --------------------------------------------------------------- |
| `web-clipper`      | Fetch URL via Chrome CDP, convert to clean Markdown             |
| `tweet-clipper`    | Convert X tweets/articles to Markdown with YAML frontmatter     |
| `image-compressor` | Compress images to WebP/PNG/JPEG (sips/cwebp/ImageMagick/Sharp) |

## Chrome CDP Automation

Both publishers use bun TypeScript scripts connecting to Chrome via DevTools Protocol:

1. Connect to Chrome CDP endpoint
2. Navigate to platform editor (WeChat MP backend or X compose)
3. Fill form fields, upload media, set metadata
4. **Stop and prompt for confirmation** -- user must approve before publish

Key scripts: `wechat-browser.ts`, `wechat-article.ts`, `wechat-api.ts` (WeChat); `x-browser.ts`, `x-article.ts`, `x-video.ts` (X); clipboard utilities for X long-form insertion.

## Credential Management

| Platform    | Credential            | Storage                |
| ----------- | --------------------- | ---------------------- |
| WeChat      | MP platform cookies   | EXTEND.md (gitignored) |
| X / Twitter | Login session cookies | EXTEND.md (gitignored) |

Credentials use the two-level EXTEND.md pattern (project-level over user-level). Both publishers validate credentials at startup and fail fast with actionable errors if expired. WeChat has a dedicated `check-permissions.ts` validator.

## Pre-Publish Review

The `review-checklist` skill generates a platform-specific quality gate: accuracy & sourcing, readability, SEO, formatting, legal compliance, and platform guidelines. All items must pass before the publishing skills proceed to the confirmation step.
