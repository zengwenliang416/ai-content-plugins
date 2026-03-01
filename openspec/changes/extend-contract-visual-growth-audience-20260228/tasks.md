## 1. 纠偏任务清单（workflow-centric）

- [x] 1.1 [T0] 修订 `proposal.md` 为“工作流级承接”口径，明确生命周期以
  `openspec/changes/<change_id>/` 为主。
  - 变更文件（<=3）：`proposal.md`
- [x] 1.2 [T0] 修订 change spec，新增 workflow 级命令面（`list/view/validate/apply/archive`）与兼容性要求。
  - 变更文件（<=3）：`specs/ai-content-cross-plugin/spec.md`
- [x] 1.3 [T0] 新增并修复 baseline spec（`openspec/specs/ai-content-cross-plugin/spec.md`），满足 Purpose/Requirements/Scenario 结构。
  - 变更文件（<=3）：`openspec/specs/ai-content-cross-plugin/spec.md`
- [x] 1.4 [T1] 全仓 55 个命令统一契约入口：`argument-hint` 支持 `.openspec.json` 与 `pipeline.openspec.json`，并统一 `Language Selection` 放在 Step 1 之后。
  - 变更文件（批次）：`*/commands/*.md`
- [x] 1.5 [T1] 全仓 55 个命令统一为 `OpenSpec contract (MANDATORY)`，并补充 stage-local 合约与 pipeline 原位更新说明（入口命令保留固定契约路径写回）。
  - 变更文件（批次）：`*/commands/*.md`
- [x] 1.6 [T1] 收敛 Next step 分支表达，确保路由与 `next.command` 单值语义一致（含终态 `none`）。
  - 变更文件（批次）：`*/commands/*.md`

## 2. 测试步骤

- [x] 2.1 [T0] 运行 `openspec validate extend-contract-visual-growth-audience-20260228 --type change --strict --json`
- [x] 2.2 [T0] 运行 `openspec validate --all --strict --json`
- [x] 2.3 [T0] 运行 `rg -n "list|view|validate|apply|archive" openspec/changes/extend-contract-visual-growth-audience-20260228/specs/ai-content-cross-plugin/spec.md`
- [x] 2.4 [T1] 运行脚本校验 55/55 命令包含 `## Language Selection (MANDATORY — after Step 1)` 且位置在 Step 1 之后
- [x] 2.5 [T1] 运行脚本校验 55/55 命令包含 `**OpenSpec contract (MANDATORY)**:`
- [x] 2.6 [T1] 运行脚本校验 55/55 命令 frontmatter `argument-hint` 同时包含 `.openspec.json` 与 `pipeline.openspec.json`
- [x] 2.7 [T1] 运行 `rg -n "\*\*Next step\*\*:.*(\\bif\\b|\\bor\\b)" */commands/*.md`，确认无分支表达残留

## 3. 成功标准

- [x] 3.1 [T0] workflow-centric 文档口径成立：生命周期以 change 目录为主，业务命令承担兼容层而非重编排
- [x] 3.2 [T0] baseline spec 与 changes 在 strict 校验下全部通过
- [x] 3.3 [T1] 55/55 命令完成 OpenSpec MANDATORY 契约段统一
- [x] 3.4 [T1] 55/55 命令完成语言选择位置与参数提示统一
- [x] 3.5 [T1] Next step 与 `next.command` 路由语义一致，不再出现显式分支路由表达
- [x] 3.6 [T0] Update project documentation using docflow-recorder
