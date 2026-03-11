## Why

当前工作区同时包含技能文档增强、视觉样式扩展、OpenSpec 旧治理资产清理，以及
Codex CLI 迁移材料新增。为避免一次性混合提交导致审阅困难，需要先做结构化调查，
再按逻辑边界拆分为多批提交，并同步维护 `CHANGELOG.md`。

## What Changes

- 盘点当前未提交改动并生成分批提交建议。
- 为每个可提交批次生成对应的变更摘要、提交信息与 CHANGELOG 条目。
- 对明显未完成或存在风险的改动单独标记，避免误提交。

## Delivery Plan

- 先生成 changes-raw / semantic / symbol 分析产物。
- 再据此执行 split commits，并在每批提交前更新 `CHANGELOG.md`。
- 最终输出提交哈希、剩余改动与建议后续动作。
