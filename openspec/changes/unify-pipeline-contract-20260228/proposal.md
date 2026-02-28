## Why

当前主链中间产物存在“主链承接 + 旁路分散”的问题，跨插件流转依赖人工选择文件，缺少统一可追踪契约。
本次变更先落地 P0 主链（topic-research -> content-production -> content-utilities -> publishing），
通过 `pipeline.openspec.json` 实现标准化承接，保证中间产物可审计、可回放、可自动衔接。

## What Changes

- 为主链命令引入 OpenSpec 契约检测优先级。
- 在主链各阶段强制写回/更新 `pipeline.openspec.json`。
- 在上游阶段（daily-brief/brainstorm）与质量关卡（check-quality）补齐契约衔接。
- 建立 `openspec/config.yaml` 与 `ai-content` 自定义 schema，规范 change/spec/task 命名与结构。

## Pipeline Impact

- 影响插件：`topic-research`、`content-production`、`content-utilities`、`content-analysis`、`publishing`。
- 保持既有运行时文件名兼容（`research.md`、`analysis.md`、`article.md`、`article.html` 等）。
- 新增统一契约文件：`ai-content-output/deep-research/<slug>/pipeline.openspec.json`。
