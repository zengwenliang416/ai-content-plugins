## 1. Contract Setup
- [x] 1.1 [T0] Create `openspec/config.yaml` with ai-content schema defaults
- [x] 1.2 [T0] Add ai-content schema and template files
- [x] 1.3 [T0] Validate schema with `openspec schema validate ai-content`

## 2. Task Mapping (P0)
- [x] 2.1 [T1] Update `topic-research:deep-research` command to emit contract
- [x] 2.2 [T5] Update `content-production:long-article` to read/write contract
- [x] 2.3 [T5] Update `content-utilities:markdown-to-html` to read/write contract
- [x] 2.4 [T5] Update `publishing:post-to-wechat` to read/write contract
- [x] 2.5 [T0] Update `topic-research:daily-brief` and `topic-research:brainstorm` to emit upstream OpenSpec contracts
- [x] 2.6 [T5] Update `content-analysis:check-quality` to read/write contract and emit quality report path

## 3. Validation & Rollout
- [x] 3.1 [T0] Run `openspec validate --changes --strict --no-interactive`
- [x] 3.2 [T0] Dry-run one full chain in a real content topic and verify contract transitions
- [x] 3.3 [T0] Update project documentation using docflow-recorder (executed as manual equivalent after user confirmation because `docflow-recorder` binary is not installed in this workspace)
