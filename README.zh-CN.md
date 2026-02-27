# AI Content Agents

[English](./README.md) | 中文

三个 OpenClaw Agent，为 AI 内容创作者打造。覆盖完整内容生命周期：选题研究、内容写作、视觉生成、发布运营、增长优化。

## Agents

| Agent                                                | Skills | 说明                                         |
| ---------------------------------------------------- | ------ | -------------------------------------------- |
| [content-researcher](./workspace-content-researcher) | 18     | 多平台新闻搜索、深度研究、趋势分析、内容对标 |
| [content-writer](./workspace-content-writer)         | 16     | 长文写作、短帖、视觉内容、幻灯片、信息图     |
| [content-operator](./workspace-content-operator)     | 22     | 增长策略、受众管理、平台发布、内容工具       |

## 快速开始

### 前置要求

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code)，支持 OpenClaw
- [Bun](https://bun.sh) 运行时（`curl -fsSL https://bun.sh/install | bash`）

### 安装

```bash
git clone https://github.com/user/ai-content-agents.git
cd ai-content-agents
./install.sh
```

安装脚本会将三个 Agent workspace 软链接到 `~/.openclaw/`，并设置共享依赖。

### MCP 服务器（可选）

部分 skill 集成了免费 MCP 服务器：

| MCP 服务器                                                        | 使用者             | 功能                        |
| ----------------------------------------------------------------- | ------------------ | --------------------------- |
| [mcp-hacker-news](https://github.com/paabloLC/mcp-hacker-news)    | content-researcher | 获取 Hacker News 帖子和讨论 |
| [arxiv-mcp-server](https://github.com/blazickjp/arxiv-mcp-server) | content-researcher | 搜索和阅读 arXiv 论文       |
| [rss-reader-mcp](https://github.com/kwp-lab/rss-reader-mcp)       | content-researcher | 聚合 RSS 订阅源             |

## 文章生产流水线

```
选题研究 ─── 内容规划 ─── 文章写作 ─── 质量审核 ─── 视觉增强 ─── 格式转换 ─── 平台发布
```

### 阶段 1：选题研究（content-researcher）

```
/daily-brief                          # 每日 AI 新闻简报
/deep-research "LLM Agents"          # 5 任务深度研究流水线
/field-overview "RAG"                 # 领域综述（3000-5000 字）
```

### 阶段 2：内容规划（content-researcher + content-operator）

```
/brainstorm                           # 生成 20+ 选题，评分 Top 10
/screen-topic "AI Agents"            # 快速潜力评估
/audience                            # 定义目标受众
/content-plan                        # 编辑日历
```

### 阶段 3：文章写作（content-writer）

```
/long-article                        # 长文写作
/short-post                          # 短帖 / 推文串
```

### 阶段 4：质量审核（content-researcher）

```
/debug-draft                         # 诊断结构和清晰度问题
/check-quality                       # 五维质量审核
```

### 阶段 5：视觉增强（content-writer）

```
/cover-image article.md              # 封面图（9 色板 × 6 渲染风格）
/article-illustrator article.md      # 自动检测插图位置
/infographic article.md              # 信息图（21 布局 × 17 风格）
/xhs-images article.md              # 小红书卡片系列
```

### 阶段 6：格式转换与发布（content-operator）

```
/format-markdown                     # 规范化 Markdown 结构
/markdown-to-html                    # 转换为微信兼容 HTML
/post-to-wechat                      # 发布到微信公众号
/post-to-x                          # 发布到 X / Twitter
```

## 全部 Skills

### content-researcher（18 个 skills）

| Skill                 | 说明                 |
| --------------------- | -------------------- |
| `news-search`         | 跨 12+ 平台多源搜索  |
| `news-search-setup`   | 平台工具安装和配置   |
| `daily-brief`         | 每日 AI 新闻简报     |
| `deep-research`       | 5 任务深度研究流水线 |
| `field-overview`      | AI 子领域综述        |
| `trend-preview`       | 趋势预览             |
| `release-analysis`    | AI 新产品/论文分析   |
| `research-updater`    | 更新已有研究文档     |
| `narrative-tracker`   | 内容叙事追踪         |
| `event-calendar`      | AI 事件日历          |
| `topic-brainstorm`    | 选题头脑风暴         |
| `competitor-analysis` | 竞品内容策略分析     |
| `content-benchmark`   | 内容表现对标         |
| `quality-check`       | 文章质量审核         |
| `trend-analysis`      | 数据趋势分析         |
| `draft-debugger`      | 草稿结构诊断         |
| `template-creator`    | 可复用模板创建       |
| `skill-creator`       | Skill 编写指南       |

### content-writer（16 个 skills）

| Skill                 | 说明                    |
| --------------------- | ----------------------- |
| `article-builder`     | 长文写作                |
| `short-post`          | 社交媒体短帖            |
| `infographic`         | 可视化摘要卡片          |
| `presentation`        | 演示文稿                |
| `audience-targeting`  | 目标受众定义            |
| `content-experiment`  | 内容 A/B 测试           |
| `content-tracker`     | 内容流水线跟踪          |
| `collab-letter`       | 合作邀请函              |
| `asset-pack`          | 内容素材打包            |
| `ai-image-gen`        | AI 图片生成（多供应商） |
| `article-illustrator` | 文章配图生成            |
| `cover-generator`     | 封面图生成              |
| `infographic-gen`     | 专业信息图生成          |
| `knowledge-comic`     | 知识漫画创作            |
| `slide-generator`     | 幻灯片图片生成          |
| `xhs-card`            | 小红书卡片系列          |

### content-operator（22 个 skills）

| Skill                  | 说明             |
| ---------------------- | ---------------- |
| `growth-plan`          | 增长策略规划     |
| `performance-analysis` | 内容表现分析     |
| `topic-screening`      | 选题潜力筛选     |
| `source-discovery`     | 内容源发现       |
| `review-checklist`     | 发布前检查清单   |
| `strategy-memo`        | 策略备忘录       |
| `account-monitor`      | 账号矩阵监控     |
| `collab-prep`          | 合作会议准备     |
| `content-roi`          | 内容 ROI 计算    |
| `audience-review`      | 受众画像分析     |
| `content-plan`         | 编辑日历规划     |
| `ops-report`           | 运营报告生成     |
| `content-rebalance`    | 内容配比调整     |
| `content-cleanup`      | 低效内容清理     |
| `biz-proposal`         | 商务提案撰写     |
| `x-publisher`          | X/Twitter 发布   |
| `wechat-publisher`     | 微信公众号发布   |
| `web-clipper`          | 网页转 Markdown  |
| `tweet-clipper`        | 推文转 Markdown  |
| `md-to-html`           | Markdown 转 HTML |
| `md-formatter`         | Markdown 格式化  |
| `image-compressor`     | 图片压缩         |

## 项目结构

```
ai-content-agents/
├── openclaw.json                     # Agent 注册配置
├── install.sh                        # 安装脚本
├── workspace-content-researcher/
│   ├── AGENTS.md                     # 操作指令
│   ├── SOUL.md                       # 人格定义
│   ├── IDENTITY.md                   # 身份信息
│   ├── USER.md                       # 用户偏好
│   ├── TOOLS.md                      # 工具清单
│   ├── MEMORY.md                     # 持久记忆
│   ├── memory/                       # 记忆存储
│   └── skills/                       # 18 个 skills
├── workspace-content-writer/
│   └── （同上结构，16 个 skills）
└── workspace-content-operator/
    └── （同上结构，22 个 skills）
```

## 许可证

[Apache License 2.0](./LICENSE)
