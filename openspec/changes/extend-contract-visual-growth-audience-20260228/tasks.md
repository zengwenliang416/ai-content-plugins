## 1. 阶段任务

### 1.1 通用契约模板落地
- [x] 1.1 [T0] 统一命令模板结构：Step 1 检测顺序 + Step 2 执行 + Artifact Handoff + OpenSpec 写回 + Next step
- [x] 1.2 [T0] 将 `argument-hint` 扩展为支持 `.openspec.json` / `pipeline.openspec.json`
- [x] 1.3 [T0] 保持现有产物目录兼容（不迁移运行时落盘根目录）

### 1.2 插件批次改造（剩余命令全覆盖）
- [x] 1.4 [T1] `topic-research` 剩余命令接入 OpenSpec 生命周期承接
- [x] 1.5 [T2] `content-analysis` 剩余命令接入 OpenSpec 生命周期承接
- [x] 1.6 [T4] `content-production` 剩余命令接入 OpenSpec 生命周期承接
- [x] 1.7 [T4] `content-utilities` 剩余命令接入 OpenSpec 生命周期承接
- [x] 1.8 [T5] `publishing:post-to-x` 接入 OpenSpec 生命周期承接

### 1.3 已有批次并入（同一 change）
- [x] 1.9 [T2] 已接入 `growth-ops` 全命令契约承接
- [x] 1.10 [T3] 已接入 `audience-management` 全命令契约承接
- [x] 1.11 [T4] 已接入 `visual-content` 全命令契约承接

## 2. 测试步骤

- [x] 2.1 [T0] 运行 `for f in */commands/*.md; do if rg -q "openspec\\.json" "$f"; then :; else echo "$f"; fi; done`，确认无遗漏命令
- [x] 2.2 [T0] 运行 `for f in */commands/*.md; do if rg -q "Artifact Handoff" "$f"; then :; else echo "$f"; fi; done`，确认无遗漏命令
- [x] 2.3 [T0] 运行 `openspec validate extend-contract-visual-growth-audience-20260228 --type change --strict --json`
- [x] 2.4 [T0] 运行 `openspec validate --all --strict --json`

## 3. 成功标准

- [x] 3.1 [T0] `*/commands/*.md` 全量命令均具备 OpenSpec 生命周期承接说明
- [x] 3.2 [T0] 输入检测顺序统一为：显式参数 > 合约扫描 > 旧路径回退 > 兜底提问
- [x] 3.3 [T0] 主链与非主链都具备可追踪契约写回策略（pipeline 合约 + stage-local 合约）
- [ ] 3.4 [T0] Update project documentation using docflow-recorder
