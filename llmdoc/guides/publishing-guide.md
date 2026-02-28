# Publishing Guide

## Publishing to WeChat

### API Method

Best for programmatic article creation with full metadata control.

1. Configure WeChat MP cookies in `EXTEND.md` (project or user level)
2. Run `wechat-publisher` with your Markdown article
3. The skill calls `md-to-html` to convert content (default theme unless overridden)
4. `wechat-api.ts` uploads via WeChat MP REST API
5. Review the preview link -- confirm to publish or abort

### Browser Method

Required for image-text posts or when the API encounters permission limitations.

1. Ensure Chrome is running with remote debugging enabled
2. Run `wechat-publisher`, specifying browser mode
3. `wechat-browser.ts` opens the WeChat MP editor, fills title/content/cover/metadata
4. The script pauses at the publish button -- you review and click publish manually

## Publishing to X / Twitter

All X publishing uses Chrome CDP (no API).

1. Configure X login cookies in `EXTEND.md`
2. Run `x-publisher` with your content
3. For text/image: `x-browser.ts` fills the compose box and attaches media
4. For long-form articles: `x-article.ts` pastes formatted HTML via clipboard
5. For video: `x-video.ts` handles upload and metadata
6. The script stops before posting -- you confirm to publish

## Converting Markdown to WeChat HTML

Use `md-to-html` standalone when you need HTML without publishing:

1. Provide a Markdown file path and optionally a theme (`default`, `grace`, or `simple`)
2. The skill outputs a self-contained `.html` file with all CSS inlined
3. For CJK content, `md-formatter` runs automatically to normalize typography

Output is WeChat-compatible (no external CSS, no `<style>` blocks). Paste or upload directly.

## Using review-checklist Before Publishing

Run `review-checklist` on any draft before publishing. It checks: accuracy & sourcing, readability, SEO, formatting, legal compliance, and platform guidelines. The checklist adapts to the target platform and content type. All items should pass before proceeding.

## Setting Up Credentials

### WeChat

1. Log in to WeChat MP backend (`mp.weixin.qq.com`) in Chrome
2. Extract session cookies (see `wechat-publisher/references/`)
3. Add cookies to EXTEND.md (project: `.content-skills/wechat-publisher/EXTEND.md`, user: `~/.content-skills/wechat-publisher/EXTEND.md`)
4. Validate: `bun skills/wechat-publisher/scripts/check-permissions.ts`

### X / Twitter

1. Log in to X in Chrome and extract session cookies (see `x-publisher/references/`)
2. Add cookies to EXTEND.md at project or user level
3. Ensure Chrome is running with remote debugging for CDP access

Credentials are stored in gitignored EXTEND.md files. Both publishers validate credentials at startup and fail fast if missing or expired.
