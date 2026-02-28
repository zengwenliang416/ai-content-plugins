## 1. 阶段任务

### 1.1 契约范围与字段定义
- [x] 1.1 [T0] 冻结扩展阶段枚举：`visual-content`、`growth-ops`、`audience-management`
- [x] 1.2 [T0] 冻结新增 `outputs.*` 字段命名与 `next.*` 路由规则（仅覆盖本轮目标命令）
- [x] 1.3 [T0] 补齐 change 文档（proposal/spec/tasks）并与既有 P0 主链兼容策略对齐

### 1.2 visual-content 命令层承接改造
- [x] 1.4 [T4] 将 `article-illustrator` 改为契约优先输入并写回视觉产物字段
- [x] 1.5 [T4] 将 `cover-image` 改为契约优先输入并写回封面字段
- [x] 1.6 [T4] 将 `infographic` 改为契约优先输入并写回图解字段

### 1.3 growth-ops 命令层承接改造
- [x] 1.7 [T2] 强化 `screen-topic` 契约写回（筛选结论与路由决策）
- [x] 1.8 [T2] 为 `review-checklist` 增加契约读写与发布前质量关卡字段
- [x] 1.9 [T2] 为 `performance` 增加契约读写与绩效分析字段

### 1.4 audience-management 命令层承接改造（本轮范围）
- [x] 1.10 [T3] 为 `content-plan` 增加契约承接与输出写回
- [x] 1.11 [T3] 为 `content-rebalance` 增加契约承接与输出写回
- [x] 1.12 [T3] 为 `ops-report` 增加契约承接与输出写回

## 2. 测试步骤

- [x] 2.1 [T0] 运行 `rg -n "pipeline\\.openspec\\.json|Artifact Handoff|OpenSpec contract update" visual-content/commands/*.md growth-ops/commands/*.md audience-management/commands/*.md`，确认目标命令完成契约承接模板改造
- [x] 2.2 [T0] 运行 `openspec validate extend-contract-visual-growth-audience-20260228 --type change --strict --json`，确认 change 结构有效
- [x] 2.3 [T0] 运行 `openspec validate --all --strict --json`，确认全仓 OpenSpec 校验通过

## 3. 成功标准

- [x] 3.1 [T0] visual/growth/audience 本轮目标命令均支持显式 `pipeline.openspec.json` 作为主输入
- [x] 3.2 [T0] 扩展阶段仅增量写回字段，不破坏既有 P0 主链输出引用
- [x] 3.3 [T0] 新增 `outputs.*` 与 `next.*` 字段可被下游命令稳定消费
- [ ] 3.4 [T0] Update project documentation using docflow-recorder
