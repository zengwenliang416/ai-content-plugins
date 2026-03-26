# Claude Code → Codex CLI 迁移计划

> 项目：ai-content-plugins（当前已同步为 10 个 workflow / 61 个 skills）
> 日期：2026-03-06
> 参考：ccg-workflows/CLAUDE-CODE-TO-CODEX-CLI-MIGRATION-GUIDE.md

---

## 状态更新（2026-03-19）

- 已补齐 `content-hooks`、`content-repurpose`、`tr-repo-analysis`
- `install-codex-bundle.sh` 改为自动发现 workflow，不再手写 8 个目录
- `.codex/config.toml` 已切到官方文档一致的 `SKILL.md` 文件路径注册方式
- 新增 `scripts/sync_codex_bundle.py`，用于从主插件目录补齐缺失 skill 与资源

---

## 1. 资产盘点总览

### 1.1 当前插件资产统计

| 插件 | Commands | Skills | References | Scripts | Agents | Hooks | MCP |
|------|----------|--------|------------|---------|--------|-------|-----|
| publishing | 2 | 2 | 2 | 30+ | 0 | 空 | 无 |
| content-production | 9 | 10 | 0 | 0 | 0 | 空 | 空 |
| content-utilities | 6 | 6 | 2 | 46 | 0 | 空 | 空 |
| growth-ops | 10 | 10 | 0 | 0 | 0 | 空 | 空 |
| visual-content | 5 | 4 | 60+ | 4+ | 0 | 空 | 无 |
| content-analysis | 7 | 8 | 4 | 0 | 0 | 空 | 空 |
| topic-research | 11 | 11 | 20+ | 10+ | 0 | 空 | 空 |
| audience-management | 6 | 6 | 0 | 0 | 0 | 空 | 空 |
| **合计** | **56** | **57** | **88+** | **90+** | **0** | **全空** | **全空** |

### 1.2 关键发现

- **无 agents**：8 个插件全部是纯 Command→Skill 链，无需迁移 agent 定义
- **Hooks 全空**：所有 `hooks.json` 都是 `{"hooks": {}}`，无需转写 AGENTS.md 规则
- **MCP 全空**：`.mcp.json` 都是 `{"mcpServers": {}}`，无运行时依赖
- **Command 模式统一**：所有 command 遵循三段式（上游检测→语言选择→加载 Skill）
- **Skill 已有 SKILL.md**：大部分功能已在 SKILL.md 中，command 只是薄入口层

### 1.3 迁移决策

| 决策项 | 结论 |
|--------|------|
| Command → Skill 合并策略 | 将 command 的上游检测 + 语言选择逻辑**合并进** SKILL.md |
| Agent TOML | **不需要** — 这些都是单 skill 调用，无多 agent 编排 |
| Hooks → AGENTS.md | **不需要** — hooks 全空 |
| references/ + scripts/ | **原样复制**，保持相对路径不变 |
| `argument-hint` | **转写为** `arguments` 数组 |
| 工作流命名 | 以原插件名为 workflow name（`publishing`, `growth-ops` 等）|

---

## 2. 迁移后目标结构

```
codex-cli/
├── workflows/
│   ├── publishing/
│   │   └── skills/
│   │       ├── publishing-post-to-x/
│   │       │   └── SKILL.md              ← command + skill 合并
│   │       ├── publishing-post-to-wechat/
│   │       │   └── SKILL.md
│   │       ├── publishing-x-publisher/
│   │       │   ├── SKILL.md              ← 原 skill（执行层）
│   │       │   ├── references/
│   │       │   └── scripts/
│   │       └── publishing-wechat-publisher/
│   │           ├── SKILL.md
│   │           ├── references/
│   │           └── scripts/
│   │
│   ├── content-production/
│   │   └── skills/
│   │       ├── cp-short-post/SKILL.md
│   │       ├── cp-long-article/SKILL.md
│   │       ├── cp-audience/SKILL.md
│   │       ├── cp-presentation/SKILL.md
│   │       ├── cp-ab-test/SKILL.md
│   │       ├── cp-infographic/SKILL.md
│   │       ├── cp-asset-pack/SKILL.md
│   │       ├── cp-collab-letter/SKILL.md
│   │       └── cp-content-tracker/SKILL.md
│   │
│   ├── content-utilities/
│   │   └── skills/
│   │       ├── humanizer/
│   │       │   ├── SKILL.md
│   │       │   └── references/
│   │       ├── image-compressor/
│   │       │   ├── SKILL.md
│   │       │   └── scripts/
│   │       ├── md-formatter/
│   │       │   ├── SKILL.md
│   │       │   └── scripts/
│   │       ├── md-to-html/
│   │       │   ├── SKILL.md
│   │       │   └── scripts/
│   │       ├── tweet-clipper/
│   │       │   ├── SKILL.md
│   │       │   ├── references/
│   │       │   └── scripts/
│   │       └── web-clipper/
│   │           ├── SKILL.md
│   │           └── scripts/
│   │
│   ├── growth-ops/
│   │   └── skills/
│   │       ├── go-review-checklist/SKILL.md
│   │       ├── go-screen-topic/SKILL.md
│   │       ├── go-find-sources/SKILL.md
│   │       ├── go-strategy-memo/SKILL.md
│   │       ├── go-performance/SKILL.md
│   │       ├── go-growth-plan/SKILL.md
│   │       ├── go-account-portfolio/SKILL.md
│   │       ├── go-collab-prep/SKILL.md
│   │       └── go-content-roi/SKILL.md
│   │
│   ├── visual-content/
│   │   └── skills/
│   │       ├── vc-comic/SKILL.md
│   │       ├── vc-cover-image/SKILL.md
│   │       ├── vc-infographic/SKILL.md
│   │       ├── vc-xhs-images/SKILL.md
│   │       ├── vc-slide-deck/SKILL.md
│   │       ├── vc-article-illustrator/SKILL.md
│   │       ├── vc-ai-image-gen/
│   │       │   ├── SKILL.md
│   │       │   ├── references/
│   │       │   └── scripts/
│   │       ├── vc-cover-generator/
│   │       │   ├── SKILL.md
│   │       │   └── references/  (palettes, dimensions, renderings, workflow 等)
│   │       ├── vc-infographic-gen/
│   │       │   ├── SKILL.md
│   │       │   └── references/  (21 layouts, 19+ styles)
│   │       ├── vc-knowledge-comic/
│   │       │   ├── SKILL.md
│   │       │   └── references/
│   │       └── vc-slide-generator/
│   │           ├── SKILL.md
│   │           └── references/
│   │
│   ├── content-analysis/
│   │   └── skills/
│   │       ├── ca-skill-creator/SKILL.md
│   │       ├── ca-template/SKILL.md
│   │       ├── ca-benchmark/SKILL.md
│   │       ├── ca-trend-analysis/SKILL.md
│   │       ├── ca-debug-draft/SKILL.md
│   │       ├── ca-competitor/SKILL.md
│   │       ├── ca-check-quality/SKILL.md
│   │       └── ca-quality-check/
│   │           ├── SKILL.md
│   │           └── references/
│   │
│   ├── topic-research/
│   │   └── skills/
│   │       ├── tr-daily-brief/SKILL.md
│   │       ├── tr-field-overview/SKILL.md
│   │       ├── tr-release-analysis/SKILL.md
│   │       ├── tr-update-research/SKILL.md
│   │       ├── tr-deep-research/
│   │       │   ├── SKILL.md
│   │       │   ├── assets/
│   │       │   └── references/
│   │       ├── tr-news-search/
│   │       │   ├── SKILL.md
│   │       │   ├── assets/
│   │       │   ├── references/
│   │       │   └── scripts/
│   │       ├── tr-news-search-setup/
│   │       │   ├── SKILL.md
│   │       │   ├── scripts/
│   │       │   ├── references/
│   │       │   └── assets/
│   │       ├── tr-trend-preview/SKILL.md
│   │       ├── tr-narrative/SKILL.md
│   │       ├── tr-events/SKILL.md
│   │       └── tr-brainstorm/SKILL.md
│   │
│   └── audience-management/
│       └── skills/
│           ├── am-audience-review/SKILL.md
│           ├── am-content-plan/SKILL.md
│           ├── am-ops-report/SKILL.md
│           ├── am-content-rebalance/SKILL.md
│           ├── am-cleanup/SKILL.md
│           └── am-biz-proposal/SKILL.md
│
├── .codex/
│   └── config.toml                    ← 中心注册（所有 skills）
├── AGENTS.md                          ← 安全规则（通用）
├── install-codex-bundle.sh            ← Linux/macOS 安装脚本
└── install-codex-bundle.ps1           ← Windows 安装脚本
```

---

## 3. Skill 命名约定

为避免跨 workflow 的 skill 名冲突，采用**前缀式**命名：

| Workflow | 前缀 | 示例 |
|----------|------|------|
| publishing | `publishing-` | `publishing-post-to-x` |
| content-production | `cp-` | `cp-short-post` |
| content-utilities | 保留原 utility 名称 | `md-to-html`, `humanizer` |
| growth-ops | `go-` | `go-screen-topic` |
| visual-content | `vc-` | `vc-cover-image` |
| content-analysis | `ca-` | `ca-benchmark` |
| topic-research | `tr-` | `tr-deep-research` |
| audience-management | `am-` | `am-ops-report` |

补充说明：`content-utilities` 保留既有 skill 名称，不额外加前缀，以兼容
其它 workflow 对 `md-to-html`、`humanizer` 等 utility skill 的直接引用。

### Command vs Skill 合并规则

对于**同时存在 command 和对应 skill 的情况**（如 `commands/deep-research.md` + `skills/deep-research/SKILL.md`）：

- **合并为一个 SKILL.md**：将 command 的上游检测、语言选择逻辑**写入 SKILL.md 开头**
- 原 skill 的核心执行逻辑保持不变
- 不再保留独立的 command 入口

对于**只有 command 没有对应 skill 的情况**（如 `commands/news-search.md` 无匹配 skill）：

- **新建 SKILL.md**：将 command 内容直接转为 SKILL.md 格式

---

## 4. SKILL.md 改写规则

### 4.1 Frontmatter 标准化

**Before (Claude Code command)**:
```yaml
---
description: Run a multi-task deep research pipeline on an AI topic
argument-hint: "[AI topic, technology, or pipeline.openspec.json path]"
---
```

**After (Codex CLI skill)**:
```yaml
---
name: tr-deep-research
description: "Run a multi-task deep research pipeline on an AI topic"
arguments:
  - name: topic
    description: "AI topic, technology, or pipeline.openspec.json path"
---
```

**Before (Claude Code skill)**:
```yaml
---
name: deep-research
description: Create comprehensive AI topic research articles...
---
```

**After (Codex CLI skill)**:
```yaml
---
name: tr-deep-research
description: "Create comprehensive AI topic research articles"
arguments:
  - name: topic
    description: "AI topic or technology to research"
---
```

### 4.2 Body 改写清单

| 源代码模式 | 改写目标 |
|-----------|---------|
| `AskUserQuestion("...")` | 叙述式："Ask the user: ..." |
| `Skill("xxx")` | 直接 skill 调用：`Run skill: xxx` |
| `Task(subagent_type="xxx")` | 叙述式 agent 调用 + 文件交接 |
| `TeamCreate / TaskOutput / SendMessage` | 全部移除，用文件交换 |
| `mcp__xxx__yyy()` | 保留（Codex 运行时按 MCP 配置决定） |
| `Bash("ls -t openspec/runtime/...")` | 保持，Codex 支持 bash 执行 |
| `$ARGUMENTS` | 改为 `$ARGUMENTS`（Codex 原生支持） |

### 4.3 禁止字段

以下字段会导致 Codex CLI **静默跳过** skill：
- `allowed-tools`
- `argument-hint` / `argument_hint`
- `type: string` / `required: true`（在 arguments 内）

---

## 5. 分 Wave 执行计划

### Wave 1: 简单 Skill 链（无 scripts、无 references）
**预计工时：2h | 3 个插件 | 25 个 skills**

| 序号 | 插件 | 源 Commands | 源 Skills | 目标 Skills | 复杂度 |
|------|------|------------|----------|------------|--------|
| 1.1 | audience-management | 6 | 6 | 6 | 低 |
| 1.2 | content-production | 9 | 10 | 9 | 低 |
| 1.3 | growth-ops | 10 | 10 | 9 | 低 |

**执行步骤**：

1. **创建目录结构**
   - `codex-cli/workflows/{plugin}/skills/{prefix}-{name}/`

2. **合并 Command + Skill → 新 SKILL.md**
   - 读取 command.md 提取上游检测 + 语言选择逻辑
   - 读取对应 skill/SKILL.md 提取核心执行逻辑
   - 合并写入新 SKILL.md，frontmatter 只保留 `name` + `description` + `arguments`

3. **处理 Command-only（无对应 skill）的情况**
   - 直接将 command 转为 SKILL.md 格式

4. **验证**
   - 检查所有 SKILL.md frontmatter 格式
   - 确认无 `allowed-tools`、`argument-hint`、`type`、`required` 字段

---

### Wave 2: 中等复杂度（有 references、无 scripts）
**预计工时：2h | 1 个插件 | 7 个 skills**

| 序号 | 插件 | 源 Commands | 源 Skills | References | 目标 Skills | 复杂度 |
|------|------|------------|----------|------------|------------|--------|
| 2.1 | content-analysis | 7 | 8 | 4 files | 7 | 中 |

**执行步骤**：

1. 同 Wave 1 的 1-4 步
2. **复制 references/ 子目录**
   - `competitor-analysis/references/` → `ca-competitor/references/`
   - `quality-check/references/` → `ca-check-quality/references/`
3. **更新 SKILL.md 中的 references 路径**（如有相对引用）

### Wave 2.5: Utility Workflow Compatibility
**预计工时：1.5h | 1 个插件 | 6 个 skills**

| 序号 | 插件 | 源 Commands | 源 Skills | References | Scripts | 目标 Skills | 复杂度 |
|------|------|------------|----------|------------|---------|------------|--------|
| 2.5 | content-utilities | 6 | 6 | 2 files | 46 files | 6 | 中 |

**特殊处理**：

1. 保留 `md-to-html`、`humanizer` 等既有 utility 名称，避免跨 workflow 引用失效
2. 复制 `scripts/` 与 `references/`，保持相对路径不变
3. 清理 Codex CLI 不兼容 frontmatter 字段，例如 `allowed-tools`

---

### Wave 3: 高复杂度 — Topic Research
**预计工时：3h | 1 个插件 | 11 个 skills**

| 序号 | 插件 | 源 Commands | 源 Skills | References | Scripts | 复杂度 |
|------|------|------------|----------|------------|---------|--------|
| 3.1 | topic-research | 11 | 11 | 20+ | 10+ | 高 |

**特殊处理**：

1. **news-search skill 有 TypeScript scripts**
   - 复制 `scripts/` 目录及 `package.json`
   - 检查脚本内是否有 Claude Code 特有的路径引用

2. **news-search-setup skill 有安装脚本**
   - 复制 `scripts/install.ts`、`verify.ts`
   - 复制 `references/`（cookie-guide, proxy-guide, platform-setup）
   - 复制 `assets/`

3. **deep-research skill 有 5 任务 references**
   - 复制 `references/task1-*.md` 到 `references/task5-*.md`
   - 复制 `assets/`（quality-checklist, article-template）

4. **Command→Skill 合并重点**
   - `deep-research` command 有复杂的上游检测逻辑（openspec contracts、brainstorm output、daily brief）
   - 需将此逻辑完整合并进 SKILL.md

---

### Wave 4: 最高复杂度 — Visual Content + Publishing
**预计工时：4h | 2 个插件 | 11 个 skills**

| 序号 | 插件 | 源 Commands | 源 Skills | References | Scripts | 复杂度 |
|------|------|------------|----------|------------|---------|--------|
| 4.1 | visual-content | 5 (+1 article-illustrator) | 4 | 60+ | 4+ | 极高 |
| 4.2 | publishing | 2 | 2 | 2 | 30+ | 高 |

**Visual Content 特殊处理**：

1. **cover-generator — 最大的 references 集合**
   - `references/palettes/` (9 files)
   - `references/dimensions/` (3 files)
   - `references/renderings/` (6 files)
   - `references/workflow/` (3 files)
   - `references/config/` (3 files)
   - 全部原样复制到 `vc-cover-image/references/`

2. **infographic-gen — 21 layouts + 19 styles**
   - `references/layouts/` (21 layout files)
   - `references/styles/` (19 style files)
   - 全部原样复制到 `vc-infographic/references/`

3. **ai-image-gen — 多 provider scripts**
   - `scripts/providers/` (dashscope, google, openai, replicate)
   - `scripts/types.ts`
   - 检查 provider scripts 中的路径引用

4. **article-illustrator — 有 prompts/system.md**
   - 将 `prompts/system.md` 合并到 SKILL.md 或移到 `references/`

5. **Command→Skill 映射特殊情况**：
   - `commands/comic.md` → 对应 `skills/knowledge-comic/`（名称不一致，需映射）
   - `commands/cover-image.md` → 对应 `skills/cover-generator/`（名称不一致）
   - `commands/xhs-images.md` → 对应 `skills/xhs-card/`（需确认目录）

**Publishing 特殊处理**：

1. **大量 TypeScript 脚本**
   - `x-publisher/scripts/` (11 files + package.json + bun.lock)
   - `wechat-publisher/scripts/` (18+ files, including md render engine)
   - 全部原样复制，保持 `scripts/` 相对路径

2. **wechat-publisher 有 CSS 主题**
   - `scripts/md/themes/` (4 CSS files)
   - `scripts/md/extensions/` (8 extension files)

---

### Wave 5: 注册与安装
**预计工时：1h**

1. **创建 `.codex/config.toml`**
   - 注册所有 8 个 workflow 下的 skills
   - 使用相对路径 `../workflows/{wf}/skills/{name}/SKILL.md`

2. **创建 `AGENTS.md`**
   - 通用安全规则（artifact 输出路径、上游检测约定）
   - 无需迁移 hooks（全空）

3. **创建 `install-codex-bundle.sh`**
   - 支持 `--scope user|project`
   - 支持 `--workflows` 选择性安装
   - 支持 `--dry-run`
   - 安装时改写 config.toml 路径

4. **创建 `install-codex-bundle.ps1`** (Windows)

---

### Wave 6: 验证与清理
**预计工时：1h**

1. **Frontmatter 验证脚本**
   - 扫描所有 `SKILL.md`，检查 frontmatter 只包含 `name` + `description` + `arguments`
   - 报告任何非法字段

2. **路径引用验证**
   - 检查 SKILL.md 中的 `references/` 相对路径是否存在
   - 检查 scripts 中的路径引用

3. **Dry-run 安装验证**
   - 运行 `install-codex-bundle.sh --dry-run` 确认无错误

4. **创建 `ARCHIVED.md`**
   - 在原 plugins 目录标记已归档

---

## 6. Command↔Skill 完整映射表

### 6.1 publishing (2 commands → 2 entry skills + 2 execution skills)

| Command | 对应 Skill | 合并后 Codex Skill | 动作 |
|---------|-----------|-------------------|------|
| `post-to-x.md` | `x-publisher/SKILL.md` | `publishing-post-to-x/SKILL.md` | 合并 command 入口 + skill 执行 |
| `post-to-wechat.md` | `wechat-publisher/SKILL.md` | `publishing-post-to-wechat/SKILL.md` | 合并 command 入口 + skill 执行 |

### 6.2 content-production (9 commands → 9 skills)

| Command | 对应 Skill | Codex Skill |
|---------|-----------|-------------|
| `short-post.md` | `short-post/SKILL.md` | `cp-short-post` |
| `long-article.md` | `article-builder/SKILL.md` | `cp-long-article` |
| `audience.md` | `audience-targeting/SKILL.md` | `cp-audience` |
| `presentation.md` | `presentation/SKILL.md` | `cp-presentation` |
| `ab-test.md` | `content-experiment/SKILL.md` | `cp-ab-test` |
| `infographic.md` | `infographic/SKILL.md` | `cp-infographic` |
| `asset-pack.md` | `asset-pack/SKILL.md` | `cp-asset-pack` |
| `collab-letter.md` | `collab-letter/SKILL.md` | `cp-collab-letter` |
| `content-tracker.md` | `content-tracker/SKILL.md` | `cp-content-tracker` |

### 6.3 growth-ops (10 commands → 9 skills)

| Command | 对应 Skill | Codex Skill |
|---------|-----------|-------------|
| `review-checklist.md` | `review-checklist/SKILL.md` | `go-review-checklist` |
| `screen-topic.md` | `topic-screening/SKILL.md` | `go-screen-topic` |
| `find-sources.md` | `source-discovery/SKILL.md` | `go-find-sources` |
| `strategy-memo.md` | `strategy-memo/SKILL.md` | `go-strategy-memo` |
| `performance.md` | `performance-analysis/SKILL.md` | `go-performance` |
| `growth-plan.md` | `growth-plan/SKILL.md` | `go-growth-plan` |
| `account-portfolio.md` | `account-monitor/SKILL.md` | `go-account-portfolio` |
| `collab-prep.md` | `collab-prep/SKILL.md` | `go-collab-prep` |
| `content-roi.md` | `content-roi/SKILL.md` | `go-content-roi` |

### 6.4 visual-content (6 commands → 6 entry skills + 5 execution skills)

| Command | 对应 Skill | Codex Skill |
|---------|-----------|-------------|
| `comic.md` | `knowledge-comic/SKILL.md` | `vc-comic` |
| `cover-image.md` | `cover-generator/SKILL.md` | `vc-cover-image` |
| `infographic.md` | `infographic-gen/SKILL.md` | `vc-infographic` |
| `xhs-images.md` | `xhs-card/SKILL.md` (需确认) | `vc-xhs-images` |
| `slide-deck.md` | `slide-generator/SKILL.md` | `vc-slide-deck` |
| `article-illustrator.md` | `article-illustrator/SKILL.md` | `vc-article-illustrator` |
| (无 command) | `ai-image-gen/SKILL.md` | `vc-ai-image-gen` (底层 skill) |

### 6.5 content-analysis (7 commands → 7 skills)

| Command | 对应 Skill | Codex Skill |
|---------|-----------|-------------|
| `skill-creator.md` | `skill-creator/SKILL.md` | `ca-skill-creator` |
| `template.md` | `template-creator/SKILL.md` | `ca-template` |
| `benchmark.md` | `content-benchmark/SKILL.md` | `ca-benchmark` |
| `trend-analysis.md` | `trend-analysis/SKILL.md` | `ca-trend-analysis` |
| `debug-draft.md` | `draft-debugger/SKILL.md` | `ca-debug-draft` |
| `competitor.md` | `competitor-analysis/SKILL.md` | `ca-competitor` |
| `check-quality.md` | `quality-check/SKILL.md` | `ca-check-quality` |

### 6.6 topic-research (11 commands → 11 skills)

| Command | 对应 Skill | Codex Skill |
|---------|-----------|-------------|
| `daily-brief.md` | `daily-brief/SKILL.md` | `tr-daily-brief` |
| `field-overview.md` | `field-overview/SKILL.md` | `tr-field-overview` |
| `release-analysis.md` | `release-analysis/SKILL.md` | `tr-release-analysis` |
| `update-research.md` | `research-updater/SKILL.md` | `tr-update-research` |
| `deep-research.md` | `deep-research/SKILL.md` | `tr-deep-research` |
| `news-search.md` | `news-search/SKILL.md` | `tr-news-search` |
| `news-search-setup.md` | `news-search-setup/SKILL.md` | `tr-news-search-setup` |
| `trend-preview.md` | `trend-preview/SKILL.md` | `tr-trend-preview` |
| `narrative.md` | `narrative-tracker/SKILL.md` | `tr-narrative` |
| `events.md` | `event-calendar/SKILL.md` | `tr-events` |
| `brainstorm.md` | `topic-brainstorm/SKILL.md` | `tr-brainstorm` |

### 6.7 audience-management (6 commands → 6 skills)

| Command | 对应 Skill | Codex Skill |
|---------|-----------|-------------|
| `audience-review.md` | `audience-review/SKILL.md` | `am-audience-review` |
| `content-plan.md` | `content-plan/SKILL.md` | `am-content-plan` |
| `ops-report.md` | `ops-report/SKILL.md` | `am-ops-report` |
| `content-rebalance.md` | `content-rebalance/SKILL.md` | `am-content-rebalance` |
| `cleanup.md` | `content-cleanup/SKILL.md` | `am-cleanup` |
| `biz-proposal.md` | `biz-proposal/SKILL.md` | `am-biz-proposal` |

---

## 7. config.toml 注册模板

```toml
# codex-cli/.codex/config.toml
# AI Content Plugins — Codex CLI Central Registration

# ── Publishing ──────────────────────────────
[[skills.config]]
path = "../workflows/publishing/skills/publishing-post-to-x/SKILL.md"

[[skills.config]]
path = "../workflows/publishing/skills/publishing-post-to-wechat/SKILL.md"

# ── Content Production ──────────────────────
[[skills.config]]
path = "../workflows/content-production/skills/cp-short-post/SKILL.md"

[[skills.config]]
path = "../workflows/content-production/skills/cp-long-article/SKILL.md"

# ... (省略，全部 50+ skills 按此模式注册)

# ── Visual Content ──────────────────────────
[[skills.config]]
path = "../workflows/visual-content/skills/vc-cover-image/SKILL.md"

# ... 等等
```

---

## 8. AGENTS.md 模板

```markdown
# AGENTS.md — AI Content Plugins (Codex CLI)

## Artifact Conventions

- All output artifacts MUST be saved under `openspec/runtime/` at the project root
- Each skill MUST auto-scan for upstream artifacts before asking user for input
- OpenSpec contract files (`pipeline.openspec.json`) MUST be created/updated after each stage

## Safety Rules

- Never delete user content without confirmation
- Never overwrite existing artifacts without confirmation
- Always preserve user's language preference (Chinese/English) across pipeline stages

## Output Language

- Default to Chinese unless user explicitly requests English
- Respect the language selection made in upstream pipeline stages
```

---

## 9. 风险与缓解

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| Codex CLI 不支持 `AskUserQuestion` | 语言选择交互可能失效 | 改为叙述式 "Ask the user..." |
| scripts/ 中的 TypeScript 运行时依赖 | bun/node 版本差异 | 保持原有 package.json，安装时检查运行时 |
| references/ 相对路径在安装后可能断裂 | Skill 无法加载参考文档 | 安装脚本复制完整 skill 目录（含 references/） |
| Codex CLI skill 搜索 (`$`) 性能 | 50+ skills 可能搜索慢 | 使用清晰的 `description` 提高匹配率 |
| 原 command 的 `Bash(...)` 调用 | Codex sandbox 可能限制 | 标注 `sandbox_mode = "workspace-write"` |

---

## 10. 执行顺序与依赖

```
Wave 1 (audience-management, content-production, growth-ops)
  ↓  无依赖，可并行执行
Wave 2 (content-analysis)
  ↓  无依赖
Wave 3 (topic-research)
  ↓  无依赖
Wave 4 (visual-content, publishing)
  ↓  无依赖
Wave 5 (config.toml + AGENTS.md + install scripts)
  ↓  依赖 Wave 1-4 全部完成
Wave 6 (验证 + 清理)
  ↓  依赖 Wave 5
```

**Wave 1-4 可并行执行**，每个 Wave 内的插件也可并行。
Wave 5-6 需串行，依赖前置 Wave 完成。

---

## 11. 验收标准

- [ ] 所有 50+ SKILL.md frontmatter 只包含 `name` + `description` + `arguments`
- [ ] 无 `allowed-tools`、`argument-hint`、`type`、`required` 等非法字段
- [ ] 所有 references/ 和 scripts/ 目录完整复制
- [ ] config.toml 注册所有 skills
- [ ] AGENTS.md 包含通用安全规则
- [ ] install-codex-bundle.sh 支持 dry-run 并可成功执行
- [ ] 安装后目标结构与 §2 一致
- [ ] 每个 skill 的 `$ARGUMENTS` 占位符正确消费用户输入
