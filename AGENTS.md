
# -- AI Content Plugins (Codex CLI) --

# AGENTS.md — AI Content Plugins (Codex CLI)

## Artifact Conventions

- All output artifacts MUST be saved under `openspec/runtime/` at the project root
- Each skill MUST auto-scan for upstream artifacts before asking the user for input
- OpenSpec contract files (`pipeline.openspec.json`) MUST be created or updated after each stage
- Pipeline stage directories: `openspec/runtime/{daily-brief,brainstorm,deep-research,visuals,...}/`

## Safety Rules

- Never delete user content without explicit confirmation
- Never overwrite existing artifacts without confirmation
- Always create backup before modifying existing pipeline outputs
- When executing TypeScript scripts, verify runtime (bun/node) is available before running

## Output Language

- Default to Chinese unless the user explicitly requests English
- Respect the language selection made in upstream pipeline stages
- All user-facing prompts and questions should be bilingual (Chinese primary, English secondary)

## Script Execution

- Publishing scripts (x-publisher, wechat-publisher) require browser automation permissions
- Image generation scripts require API keys configured in environment
- News search scripts require platform cookies/tokens configured via `tr-news-search-setup`

## Pipeline Routing

- After `tr-deep-research` completes, the deterministic next step is `cp-long-article`
- After article refinement, use `vc-cover-image` for cover generation
- After content finalization, use `publishing-post-to-x` or `publishing-post-to-wechat` for distribution
- Visual pipeline can run standalone (`vc-*`) or as part of deep-research pipeline

# -- End AI Content Plugins --
