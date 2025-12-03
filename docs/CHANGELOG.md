# 变更日志 (CHANGELOG)

> 记录项目的所有重要变更

遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/) 格式，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

### Added
- **Pattern 集成标准化流程文档**
  - 创建 `PATTERN_INTEGRATION_GUIDE.md` 详细指南
  - 7 步标准化集成流程（清理、包装、配置、文档、测试）
  - 文档内容编写规范（Use Cases、Features、Pros & Cons）
  - 快速参考 Checklist 和命令速查表
  - 常见问题解答（依赖冲突、样式冲突、Mock 数据等）
- **Inline Completion Pattern 集成**
  - 使用 Mock 数据服务替代 Google Generative AI
  - 清理独立项目配置文件（避免冲突）
  - 创建 `InlineCompletionDemo` 包装组件
  - 支持混合演示模式（本地 Mock + 外部 API 链接）
  - Pattern 状态从 `wip` 更新为 `available`
- **Infinite Canvas Pattern 集成**
  - 清理独立 Vite 配置（保留组件、服务与类型）
  - 创建 `InfiniteCanvasDemo` 包装组件，适配详情页 Live Demo
  - Mock 流模式 + Gemini 钩子（`VITE_GOOGLE_API_KEY`）双通道
  - Pattern 配置更新为 `demoType: 'both'`，附外部 API 演示链接

### Changed
- **CLAUDE.md 模型兼容性改进**
  - 将所有 "Claude" 引用改为 "AI Agent"
  - 添加多模型兼容说明（Claude、GPT-4、Gemini 等）
  - 文档版本升级到 v0.3.0
  - 说明文件名保持为 CLAUDE.md 的历史原因
- 文档重构：将 UI/UX 设计系统从 ARCHITECTURE.md 独立为 UIUX_SPEC.md
- CLAUDE.md：新增 PATTERN_INTEGRATION_GUIDE.md 到辅助文档列表

### 计划中
- 实现 LLM Artifacts 交互模式（内部实现）
- 响应式设计优化（移动端适配）
- 添加更多 Mock 响应数据

---

## [0.3.0] - 2025-12-03

### Added
- **Tab 式详情页布局**
  - 🎮 Live Demo Tab（默认显示，优先展示交互演示）
  - 📝 Overview Tab（完整的模式说明文档）
  - 💻 Implementation Tab（代码示例和 LLM Prompt）
- **Glassmorphism 视觉设计系统**
  - 高斯模糊背景效果（`backdrop-blur-xl` 和 `backdrop-blur-md`）
  - 半透明玻璃态层次效果（`bg-white/5`, `bg-black/40`）
  - 彩色边框区分（绿色优点、黄色缺点、蓝色最佳实践）
  - 大幅提升文字可读性（灰度文字 + 模糊背景）
- **代码和 Prompt 复制功能**
  - CopyButton 通用组件
  - 一键复制代码示例
  - 一键复制 llms.txt prompt
  - 复制成功视觉反馈
- **外部网页嵌套支持**
  - 支持 `demoType: 'internal' | 'external' | 'both'`
  - iframe 安全沙箱配置
  - 外部链接打开新窗口按钮
  - 友好的阻止提示（如网站不支持 iframe）
- **完整的模式文档系统**
  - Use Cases（使用场景）
  - Key Features（关键特性）
  - Advantages（优点）
  - Limitations（局限性）
  - Best Practices（最佳实践）
- **Chatbot 完整文档**
  - 5 个使用场景
  - 6 个关键特性
  - 完整的 React + TypeScript 代码示例（70+ 行）
  - 详细的 llms.txt 实现指南（200+ 行）
- **外部示例链接**
  - Inline Completion → GitHub Copilot
  - LLM Artifacts → Claude.ai

### Changed
- 详情页从单页式改为 Tab 式布局，提升用户体验
- 所有文字区域应用 glassmorphism 效果
- 文字颜色从 `text-muted-foreground` 改为 `text-gray-300/200`，提升对比度
- Tab 切换增加发光效果（`shadow-lg shadow-primary/20`）

### Technical Details
- 扩展 `PatternConfig` 类型
  - 新增 `demoType`, `externalDemoUrl`, `externalDemoNote`
  - 新增 `overview: PatternOverview`
  - 新增 `codeExample: PatternCode`
  - 新增 `llmsPrompt: string`
- 创建 `CopyButton` 组件（支持剪贴板 API）
- 优化 Tab 切换交互和动画
- 完善类型系统（`DemoType`, `PatternOverview`, `PatternCode`）

---

## [0.2.0] - 2025-11-13

### Added
- 完整的项目架构搭建
- Vite + React + TypeScript 开发环境
- Tailwind CSS 配置和自定义主题系统
- "未来实验室"美学设计（深色主题 + 荧光色）
- Gallery 首页
  - 精美的 PatternCard 组件
  - 动画效果（fade-in, hover glow, shimmer）
  - WIP 状态标识
- Chatbot 交互模式（完整功能）
  - 流式输出支持
  - Markdown 渲染
  - 消息历史管理
  - 精美的消息气泡设计
- Mock API 系统
  - 流式和非流式 API
  - 智能响应匹配
  - 可配置延迟和错误率
- 路由系统
  - 首页路由
  - 模式详情页路由
- Header 组件
- Pattern 配置常量

### Technical Details
- 字体: Epilogue (body), Syne (display), JetBrains Mono (code)
- 颜色: 青色/蓝绿色主题配合洋红强调色
- 动画: gradient, glow, float, shimmer
- 特效: 网格背景、玻璃态、噪点纹理、渐变边框

---

## [0.1.0] - 2025-11-12

### Added
- 创建项目文档体系
  - CLAUDE.MD - AI 协作指南
  - prd_init.md - 产品需求文档
  - ROADMAP.md - 开发路线图
  - ARCHITECTURE.md - 系统架构设计
  - PATTERNS_SPEC.md - 交互模式规格说明
  - API_SPEC.md - Mock API 接口规范
  - COMPONENTS.md - 组件库文档
  - CHANGELOG.md - 变更日志

### Changed
- 无

### Deprecated
- 无

### Removed
- 无

### Fixed
- 无

### Security
- 无

---

## 版本历史

- **[0.3.0]** - 2025-12-03 - 详情页重大升级（Tab 式布局 + Glassmorphism）
- **[0.2.0]** - 2025-11-13 - 首个可运行版本
- **[0.1.0]** - 2025-11-12 - 文档初始化

---

## 变更类型说明

- `Added` - 新增功能
- `Changed` - 功能变更
- `Deprecated` - 即将废弃的功能
- `Removed` - 已移除的功能
- `Fixed` - 问题修复
- `Security` - 安全相关

---

> 💡 **提示**: 每次重要变更都应该更新本文档
