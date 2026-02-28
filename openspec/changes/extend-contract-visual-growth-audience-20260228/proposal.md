## Why

上一阶段已完成 P0 主链与部分视觉/增长/受众命令的 OpenSpec 契约承接，但仍存在大量命令仅靠手工输入与对话上下文传递中间产物，导致生命周期不可追踪、跨插件复用困难、历史回放成本高。

本次变更将“契约优先输入 + Artifact Handoff + 契约写回”扩展到仓库剩余命令，目标是让**全部命令**都具备 OpenSpec 生命周期管理能力，同时保持现有产物目录兼容。

## What Changes

- 将剩余命令统一改造为 OpenSpec 承接模式：
  - `argument-hint` 支持 `.openspec.json` 或 `pipeline.openspec.json`
  - Step 1 固化为：显式参数 > OpenSpec 合约扫描 > 旧路径回退 > 兜底提问
  - Step 2 明确 skill 加载与执行
  - 新增 `Artifact Handoff` 段落
  - 新增 `OpenSpec contract update` 或 `OpenSpec contract` 段落
  - 新增下一步命令路由建议
- 扩展覆盖到全仓剩余命令层：
  - `topic-research`（趋势/叙事/发布分析/事件/搜索与配置/研究更新）
  - `content-analysis`（benchmark/competitor/trend-analysis/debug/template/skill-creator）
  - `content-production`（short-post/collab-letter/audience/tracker/ab-test/infographic/presentation/asset-pack）
  - `content-utilities`（compress-image/format-markdown/url-to-markdown/x-to-markdown）
  - `publishing`（post-to-x）
- 保持产物在当前仓库路径（如 `ai-content-output/...`），仅引入 OpenSpec 契约层做生命周期编排，不迁移运行时存储根目录。

## Pipeline Impact

- 影响插件：8 个插件的全部命令均纳入 OpenSpec 生命周期承接能力。
- 契约路径策略：
  - 主链延续 `ai-content-output/deep-research/<slug>/pipeline.openspec.json`
  - 非主链命令采用各自阶段的 `*.openspec.json`（如 `trend-preview/*.openspec.json`）
- 兼容性：
  - 既有文件命名与目录结构保持不变
  - OpenSpec 为增量元数据层，不破坏既有工作流
