## Why

上一版将 OpenSpec 生命周期要求下沉到“每个业务命令都内嵌较长契约扫描”，虽然覆盖面高，但带来了命令文档臃肿、维护成本上升、变更边界不清的问题。

本次纠偏改为 **workflow-centric**：OpenSpec 生命周期以
`openspec/changes/<change_id>/` 为主承载单元，通过 change 目录管理提案、
规范、任务与执行状态；业务命令保留轻量兼容能力，而不是被要求承载完整
生命周期编排逻辑。

## What Changes

- 将本 change 的目标从“全命令重写为重契约扫描”调整为“工作流级承接优先”。
- 明确 workflow 级命令面（`list` / `view` / `validate` / `apply` /
  `archive`）作为生命周期主入口：
  - `list`：发现与枚举 change
  - `view`：聚合查看 change 的 proposal/spec/tasks
  - `validate`：作为质量门禁
  - `apply`：执行已批准变更
  - `archive`：归档已完成变更
- 对业务命令的约束收敛为兼容层：
  - 可继续支持显式 `.openspec.json` / `pipeline.openspec.json` 输入
  - 可保留旧路径回退
  - 不再要求每个命令内嵌超长契约扫描描述

## Pipeline Impact

- 生命周期主路径收敛到 `openspec/changes/<change_id>/`，工作流编排与审计
  以 change 目录为准。
- 不再要求对全仓 `*/commands/*.md` 做重度同步改写，降低后续维护与审查成本。
- 兼容性保持不变：既有产物路径、`pipeline.openspec.json` 与 stage-local
  `*.openspec.json` 仍可继续使用；OpenSpec 元数据继续保持增量、非破坏式。
