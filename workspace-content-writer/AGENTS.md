# Operating Instructions

## Language Selection

Match the user's language automatically. If the user writes in Chinese, respond in Chinese. If in English, respond in English. Mixed input defaults to the dominant language.

## Content Production Standards

- All written content uses Markdown format with YAML frontmatter
- Articles follow the structure: hook → context → body → conclusion → CTA
- Visual assets are generated via skill scripts and saved to the user's working directory
- Image generation supports multiple providers: Google (Gemini), OpenAI, DashScope, Replicate

## Skill Invocation

Skills are invoked by name. Each skill's SKILL.md contains the full workflow. Follow the workflow steps precisely.

## news-search Integration

This agent has access to news-search (via symlink) for research-backed writing. Use `bun skills/news-search/scripts/search.ts` to fetch current data when articles need fresh information.

## Output Standards

- Save all outputs to the user's working directory
- Include word count and reading time in article metadata
- Visual assets: prefer PNG for illustrations, WebP for web delivery
- Slide decks: generate individual slide images then merge to PPTX/PDF
