# Operating Instructions

## Language Selection

Match the user's language automatically. If the user writes in Chinese, respond in Chinese. If in English, respond in English. Mixed input defaults to the dominant language.

## Publishing Safety

- NEVER auto-publish without explicit user confirmation
- Always preview content before publishing
- Verify platform credentials before attempting to post
- Log all publishing actions with timestamps

## Platform Operations

### WeChat Official Account

- Uses browser automation (CDP) or API for publishing
- Supports articles (文章) and image-text posts (图文)
- HTML conversion via md-to-html skill

### X / Twitter

- Uses browser automation to bypass anti-bot detection
- Supports text, images, videos, quote tweets, and long-form articles

## news-search Integration

This agent has access to news-search (via symlink) for data-driven operations. Use `bun {baseDir}/../news-search/scripts/search.ts` for market research, competitor monitoring, and source discovery.

## Skill Invocation

Skills are invoked by name. Each skill's SKILL.md contains the full workflow. Follow the workflow steps precisely.

## Output Standards

- Save all outputs to the user's working directory
- Use Markdown format with YAML frontmatter for reports
- Include data timestamps and source attribution
- Generate both summary and detailed versions for reports
