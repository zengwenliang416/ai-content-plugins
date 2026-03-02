## Why

当前仓库已经完成 55 个命令的 OpenSpec 契约化，但运行期路径仍保留在旧根目录。
为满足“运行产物严格走 OpenSpec 目录”的执行目标，需要将运行期扫描、写回与文档规范统一到
`openspec/runtime/`，并保持契约字段结构与阶段路由稳定。

## What Changes

- 将全量命令中的运行路径前缀从 `ai-content-output/` 统一迁移到 `openspec/runtime/`。
- 保持 `pipeline/stage/inputs/outputs/next.command/next.input` 契约结构不变。
- 同步更新运行期规范文档与模板：`docs/artifact-conventions.md`、`llmdoc/*`、
  `openspec/config.yaml`、`openspec/schemas/ai-content/templates/artifacts.md`。
- 同步更新受影响技能文档中的路径示例，确保命令与技能说明一致。

## Pipeline Impact

- 影响插件：`topic-research`、`content-production`、`content-utilities`、`publishing`、
  `content-analysis`、`growth-ops`、`audience-management`、`visual-content`。
- 影响范围：55 个命令文件的 Step1 扫描与 OpenSpec contract 写回路径。
- 兼容策略：保持契约字段与路由语义不变，仅替换运行目录前缀。
- 风险说明：用户本地已改动的 `CLAUDE.md` 与 `visual-content/skills/xhs-card/*` 本轮未触碰。
