# 变更日志 (CHANGELOG)

> 记录项目的所有重要变更

遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/) 格式，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

### 计划中
- 完成其他 Phase 1 交互模式
- 响应式设计优化

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
