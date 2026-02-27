# AI Content Plugins

[English](./README.md) | 中文

AI 内容创作者和账号运营者的 Claude Cowork 插件市场。覆盖内容生产全链路：选题研究、内容创作、视觉生成、平台发布、竞品分析、增长运营和受众管理。

## 插件一览

| 插件 | 说明 |
|------|------|
| [content-analysis](./content-analysis) | 竞品分析、内容对标、质量审核、趋势分析、模板创建 |
| [topic-research](./topic-research) | 深度研究、每日简报、趋势预判、领域综述、事件追踪 |
| [content-production](./content-production) | 长文撰写、短内容、信息图、受众定向、内容追踪、协作外联 |
| [visual-content](./visual-content) | 文章配图、知识漫画、封面图、信息图、幻灯片、小红书卡片 |
| [publishing](./publishing) | 微信公众号发布、X/Twitter 发布自动化 |
| [content-utilities](./content-utilities) | 图片压缩、Markdown 格式化、HTML 转换、网页/推文剪藏 |
| [growth-ops](./growth-ops) | 信息源发现、发布清单、选题筛选、账号监控、增长规划 |
| [audience-management](./audience-management) | 运营报告、受众分析、内容规划、商业提案、内容优化 |

## 快速开始

### 环境要求

- [Claude Desktop](https://claude.ai/download) 或 [Claude Code](https://docs.anthropic.com/en/docs/claude-code)（需支持 Cowork 插件）
- Node.js 18+（MCP 服务器需要）
- Python 3.10+ 及 `uvx`（可选，arXiv MCP 需要）

### 安装插件

将 Claude 指向插件目录即可。每个插件自动激活——技能在匹配触发条件时自动执行，斜杠命令在会话中可直接使用。

### MCP 服务器（可选）

部分插件通过免费开源 MCP 服务器获取外部数据：

| MCP 服务器 | 使用方 | 功能 | 安装 |
|-----------|--------|------|------|
| [mcp-hacker-news](https://github.com/paabloLC/mcp-hacker-news) | topic-research, growth-ops | 获取 Hacker News 帖子和讨论 | `npx -y mcp-hacker-news` |
| [arxiv-mcp-server](https://github.com/blazickjp/arxiv-mcp-server) | topic-research | 搜索和阅读 arXiv 论文 | `uvx arxiv-mcp-server` |
| [rss-reader-mcp](https://github.com/kwp-lab/rss-reader-mcp) | topic-research, growth-ops | 聚合 RSS 订阅源 | `npx -y @kwp-lab/rss-reader-mcp` |

MCP 配置在各插件的 `.mcp.json` 中。所有 MCP 服务器均免费，无需 API 密钥。

## 文章生产全链路

从选题到发布的完整工作流：

```
研究 ─── 规划 ─── 写作 ─── 质检 ─── 视觉增强 ─── 格式化 ─── 发布
```

### 阶段一：研究

收集素材，建立领域认知。

```
/topic-research:daily-brief                 # 每日 AI 新闻简报
/topic-research:deep-research "LLM Agents"  # 五步深度研究流水线
/content-utilities:url-to-markdown          # 网页剪藏为 Markdown
/content-utilities:x-to-markdown            # 推文剪藏为 Markdown
/topic-research:field-overview "RAG"        # 领域综述（3000-5000 字）
```

### 阶段二：规划

确定选题，明确内容角度。

```
/topic-research:brainstorm                  # 生成 20+ 选题并打分
/growth-ops:screen-topic "AI Agents"        # 快速评估选题潜力
/content-production:audience                # 定义目标受众
/audience-management:content-plan           # 编辑日历排期
```

### 阶段三：写作

撰写文章初稿。

```
/content-production:long-article            # 撰写长文
/content-production:short-post              # 或：短内容 / Thread
```

### 阶段四：质检

发布前审核与优化。

```
/content-analysis:debug-draft               # 诊断结构和清晰度问题
/content-analysis:check-quality             # 五维质量审核
/growth-ops:review-checklist                # 发布前检查清单
```

### 阶段五：视觉增强

生成封面、配图和信息图。

```
/visual-content:cover-image article.md      # 封面图（9 种配色 × 6 种渲染风格）
/visual-content:article-illustrator article.md  # 自动识别配图位置并生成
/visual-content:infographic article.md      # 信息图（21 种布局 × 17 种视觉风格）
/visual-content:xhs-images article.md       # 小红书卡片系列
/content-utilities:compress-image           # 压缩图片体积
```

### 阶段六：格式化与发布

转换为平台格式并发布。

```
/content-utilities:format-markdown          # Markdown 结构规范化
/content-utilities:markdown-to-html         # 转为微信公众号兼容 HTML
/publishing:post-to-wechat                  # 发布到微信公众号
/publishing:post-to-x                       # 发布到 X / Twitter
```

### 最简路径（最小可行流水线）

一篇微信公众号文章的最短路径：

```
/topic-research:deep-research "topic"       # 研究
/content-production:long-article            # 写作
/content-analysis:check-quality             # 质检
/visual-content:cover-image article.md      # 封面
/content-utilities:markdown-to-html         # 格式化
/publishing:post-to-wechat                  # 发布
```

## 使用指南

### 日常工作流

```
/topic-research:daily-brief              # 早间：获取今日 AI 新闻简报
/topic-research:brainstorm               # 从简报中选题
/topic-research:deep-research "LLM Agents"  # 深度研究（五步流水线）
/content-production:long-article         # 撰写文章
/visual-content:cover-image article.md   # 生成封面图
/content-utilities:markdown-to-html      # 转为微信 HTML
/content-analysis:check-quality          # 发布前质检
/publishing:post-to-wechat               # 发布到微信
```

### 全部命令

**content-analysis** —— 内容分析与对标

| 命令 | 说明 |
|------|------|
| `/content-analysis:competitor [账号]` | 分析竞争对手内容策略 |
| `/content-analysis:benchmark [领域]` | 对标头部内容 |
| `/content-analysis:check-quality` | 文章质量审核（准确性、可读性、SEO） |
| `/content-analysis:trend-analysis [话题]` | 分析 AI 话题数据趋势 |
| `/content-analysis:template [类型]` | 创建可复用内容模板 |
| `/content-analysis:debug-draft` | 诊断并修复草稿问题 |

**topic-research** —— 选题研究与趋势追踪

| 命令 | 说明 |
|------|------|
| `/topic-research:deep-research [话题]` | 五步深度研究流水线 |
| `/topic-research:daily-brief` | 生成每日 AI 新闻简报 |
| `/topic-research:brainstorm [种子]` | 头脑风暴并筛选内容选题 |
| `/topic-research:field-overview [领域]` | AI 子领域综述 |
| `/topic-research:trend-preview [话题]` | 趋势预判 |
| `/topic-research:events [时间段]` | 构建 AI 事件日历 |
| `/topic-research:narrative [主题]` | 追踪内容叙事角度 |
| `/topic-research:release-analysis [名称]` | 分析新 AI 产品/模型发布 |
| `/topic-research:update-research [话题]` | 更新已有研究文档 |

**content-production** —— 内容创作

| 命令 | 说明 |
|------|------|
| `/content-production:long-article [话题]` | 撰写长文 |
| `/content-production:short-post [话题]` | 起草社交媒体短内容或 Thread |
| `/content-production:infographic [话题]` | 创建视觉摘要卡片 |
| `/content-production:audience [领域]` | 定义目标受众细分 |
| `/content-production:content-tracker` | 追踪内容管道和排期 |
| `/content-production:collab-letter [对象]` | 起草合作外联信件 |
| `/content-production:ab-test [变量]` | 设计内容 A/B 测试 |

**visual-content** —— 视觉内容生成

| 命令 | 说明 |
|------|------|
| `/visual-content:article-illustrator [文章]` | 自动识别配图位置并生成插图 |
| `/visual-content:comic [话题]` | 创作知识漫画 |
| `/visual-content:cover-image [文章]` | 生成文章封面图 |
| `/visual-content:infographic [内容]` | 生成信息图（21 种布局 × 17 种风格） |
| `/visual-content:slide-deck [内容]` | 生成演示文稿幻灯片 |
| `/visual-content:xhs-images [内容]` | 生成小红书卡片系列 |

**publishing** —— 平台发布

| 命令 | 说明 |
|------|------|
| `/publishing:post-to-wechat [文章]` | 发布到微信公众号 |
| `/publishing:post-to-x [内容]` | 发布到 X / Twitter |

**content-utilities** —— 内容工具

| 命令 | 说明 |
|------|------|
| `/content-utilities:compress-image [路径]` | 压缩图片为 WebP/PNG |
| `/content-utilities:format-markdown [文件]` | 规范化 Markdown 格式 |
| `/content-utilities:markdown-to-html [文件]` | Markdown 转微信公众号兼容 HTML |
| `/content-utilities:url-to-markdown [URL]` | 网页剪藏为 Markdown |
| `/content-utilities:x-to-markdown [URL]` | 推文/Thread 剪藏为 Markdown |

**growth-ops** —— 增长运营

| 命令 | 说明 |
|------|------|
| `/growth-ops:find-sources [话题]` | 发现内容信息源和参考资料 |
| `/growth-ops:screen-topic [话题]` | 快速筛选选题潜力 |
| `/growth-ops:review-checklist` | 发布前审核清单 |
| `/growth-ops:growth-plan [平台]` | 制定增长策略 |
| `/growth-ops:performance [时间段]` | 分析内容表现 |
| `/growth-ops:content-roi [内容]` | 计算内容 ROI |
| `/growth-ops:strategy-memo [话题]` | 撰写策略备忘录 |
| `/growth-ops:account-portfolio` | 监控内容账号矩阵 |
| `/growth-ops:collab-prep [名称]` | 协作会议准备 |

**audience-management** —— 受众管理

| 命令 | 说明 |
|------|------|
| `/audience-management:ops-report [时间段]` | 生成运营报告 |
| `/audience-management:audience-review [平台]` | 分析受众画像 |
| `/audience-management:content-plan [时间段]` | 创建编辑日历 |
| `/audience-management:biz-proposal [品牌]` | 起草商业提案 |
| `/audience-management:content-rebalance` | 调整内容比例 |
| `/audience-management:cleanup` | 清理低效内容 |

### 深度研究流水线

最强大的功能是五步深度研究流水线（`/topic-research:deep-research`），逐步执行以确保质量：

```
步骤 1：选题研究       -> 6000-8000 字研究文档
步骤 2：数据整理       -> 含 6 个数据表的 Excel 工作簿
步骤 3：分析与综合     -> 对比分析 + 写/观望/跳过 建议
步骤 4：视觉素材       -> 15-25 张图表和信息图
步骤 5：文章组装       -> 可直接发布的成稿
```

每步在执行前验证前置条件。步骤 1 和 2 可独立运行；步骤 3-5 依赖前序步骤的产出。

## 项目结构

```
plugin-name/
├── .claude-plugin/plugin.json   # 插件清单
├── .mcp.json                    # MCP 服务器配置（可选）
├── commands/                    # 斜杠命令（.md 文件）
├── skills/                      # 技能与工作流文件
│   └── skill-name/
│       ├── SKILL.md             # 技能主定义
│       ├── references/          # 参考文档
│       └── scripts/             # TypeScript 自动化脚本（可选）
└── hooks/
    └── hooks.json               # 事件驱动自动化
```

visual-content 和 publishing 插件包含 TypeScript 脚本（通过 `npx -y bun` 运行），用于图像生成 API 调用、PDF/PPTX 组装和平台 API 集成。无需构建步骤。

## 许可证

[Apache License 2.0](./LICENSE)
