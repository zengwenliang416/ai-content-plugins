## Why

当前 OpenSpec 契约已覆盖 P0 主链，但 `visual-content`、`growth-ops`、`audience-management`
命令层仍以“可选承接 + 手工传递”为主，导致跨插件流转在这些阶段缺乏统一的可追踪性。
尤其是视觉产物、增长评估与受众策略输出，尚未形成稳定的契约字段与路由规则。

本次变更将三类命令层纳入 OpenSpec 契约承接范围，确保产物继续落在当前仓库路径，
同时生命周期由 OpenSpec 的 change/spec/tasks 契约统一管理。

## What Changes

- 为 `visual-content`、`growth-ops`、`audience-management` 定义统一的契约承接规则：
  - 契约优先输入（显式 `pipeline.openspec.json` > 自动扫描契约 > 旧路径回退）
  - 命令执行后强制写回 `stage`、`outputs.*`、`next.*`
- 明确三类命令层的契约字段边界与命名：
  - 视觉层：`outputs.cover_image`、`outputs.illustrations_dir`、`outputs.infographic_dir`
  - 增长层：`outputs.topic_screening_md`、`outputs.review_checklist_md`、`outputs.performance_report_md`
  - 受众层：`outputs.content_plan_md`、`outputs.content_rebalance_md`、`outputs.ops_report_md`
- 统一 next 路由策略，支持从增长评估到研究/生产回流，以及从受众策略到执行排期衔接。

## Pipeline Impact

- 影响插件：`visual-content`、`growth-ops`、`audience-management`。
- 影响阶段：新增稳定的 `visual-content`、`growth-ops`、`audience-management` 契约写回语义。
- 契约文件路径不变：`ai-content-output/deep-research/<slug>/pipeline.openspec.json`。
- 保持兼容：既有 markdown/html/图片目录命名不变；契约层仅做增量编排与可追踪增强。
