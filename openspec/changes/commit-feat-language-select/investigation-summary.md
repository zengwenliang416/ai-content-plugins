#### Investigation Summary

**Git State:**

- Branch: main
- Staged: 0 files | Unstaged: 41 files | Untracked: 1 path (openspec/)

**Files by Category:**

- Code: (none)
- Config: `.gitignore`
- Docs: (none)
- Tests: (none)
- Commands (plugin slash commands): `audience-management/commands/audience-review.md`, `audience-management/commands/biz-proposal.md`, `audience-management/commands/cleanup.md`, `audience-management/commands/content-plan.md`, `audience-management/commands/content-rebalance.md`, `audience-management/commands/ops-report.md`, `content-analysis/commands/benchmark.md`, `content-analysis/commands/check-quality.md`, `content-analysis/commands/competitor.md`, `content-analysis/commands/debug-draft.md`, `content-analysis/commands/skill-creator.md`, `content-analysis/commands/template.md`, `content-analysis/commands/trend-analysis.md`, `content-production/commands/ab-test.md`, `content-production/commands/asset-pack.md`, `content-production/commands/audience.md`, `content-production/commands/collab-letter.md`, `content-production/commands/content-tracker.md`, `content-production/commands/infographic.md`, `content-production/commands/long-article.md`, `content-production/commands/presentation.md`, `content-production/commands/short-post.md`, `growth-ops/commands/account-portfolio.md`, `growth-ops/commands/collab-prep.md`, `growth-ops/commands/content-roi.md`, `growth-ops/commands/find-sources.md`, `growth-ops/commands/growth-plan.md`, `growth-ops/commands/performance.md`, `growth-ops/commands/review-checklist.md`, `growth-ops/commands/screen-topic.md`, `growth-ops/commands/strategy-memo.md`, `topic-research/commands/brainstorm.md`, `topic-research/commands/daily-brief.md`, `topic-research/commands/deep-research.md`, `topic-research/commands/events.md`, `topic-research/commands/field-overview.md`, `topic-research/commands/narrative.md`, `topic-research/commands/release-analysis.md`, `topic-research/commands/trend-preview.md`, `topic-research/commands/update-research.md`

**Change Pattern:**

All 40 command `.md` files received an identical 9-line block inserted after the YAML frontmatter `---` close tag:

```
Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.
```

The `.gitignore` received one line addition: `backups`.

`topic-research/commands/deep-research.md` also gained one extra blank line (10 insertions vs 9 for others), making its diff slightly larger.

**Diff Statistics:**

- +362 -0 across 41 files

**Ready for Analysis:** openspec/changes/commit-feat-language-select/changes-raw.json
