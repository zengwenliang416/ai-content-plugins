# Change: feat(commands): add AskUserQuestion language selection to all plugin commands

## Why

Users need the ability to choose output language (Chinese or English) before any plugin generates artifacts. This enables internationalization at the command level.

## What Changes

- Added AskUserQuestion language selection step to all 40 command files across 5 plugins
- Each command now prompts user for language preference before loading its skill
- Modified .gitignore (backup-related)

## Impact

- All plugin commands now support bilingual output
- No breaking changes — existing workflow preserved, language prompt added as pre-step
- Affects: content-analysis (7), content-production (9), topic-research (9), growth-ops (9), audience-management (6)
