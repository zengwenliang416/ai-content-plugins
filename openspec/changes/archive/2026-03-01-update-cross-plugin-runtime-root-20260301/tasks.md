## 1. Contract Setup
- [x] 1.1 [T0] Confirm change-id and spec domain (`update-cross-plugin-runtime-root-20260301`, `cross-plugin`)
- [x] 1.2 [T0] Freeze pipeline contract fields (`pipeline/stage/inputs/outputs/next`), only migrate root paths

## 2. Task Mapping
- [x] 2.1 [T1] Migrate `topic-research` command runtime scans/writes to `openspec/runtime/**`
- [x] 2.2 [T5] Migrate `content-production` + `content-utilities` + `publishing` P0 chain to `openspec/runtime/**`
- [x] 2.3 [T3] Migrate `content-analysis` command path references to `openspec/runtime/**`
- [x] 2.4 [T4] Migrate `visual-content` and downstream asset path references to `openspec/runtime/**`
- [x] 2.5 [T2] Migrate `growth-ops` + `audience-management` command path references to `openspec/runtime/**`
- [x] 2.6 [T0] Sync docs/templates/skill refs (`docs/artifact-conventions.md`, `llmdoc/*`, `openspec/config.yaml`, templates)

## 3. Validation & Rollout
- [x] 3.1 [T0] Run `openspec schema validate ai-content`
- [x] 3.2 [T0] Run `openspec validate --changes --strict --no-interactive`
- [x] 3.3 [T0] Update project documentation using docflow-recorder (manual equivalent completed after user-confirmed strict OpenSpec workflow; recorder binary not invoked in this workspace)
