
# LLM Interaction Patterns Gallery

## 项目概述

一个交互式的 Gallery 项目，收集、展示和演示各种 LLM 人机交互模式。类似 React-bits，但专注于 LLM 交互范式，帮助开发者和设计师了解、学习和参考不同的 AI 交互模式。

## 目标用户

- 产品设计师：寻找 AI 产品交互灵感
- 前端开发者：学习如何实现 LLM 交互
- AI 产品经理：了解各种交互模式的适用场景
- 学习者：理解 LLM 交互的最佳实践

## 核心价值

- **可交互演示**：不只是静态展示，用户可以实际体验每种交互模式
- **代码示例**：提供实现代码参考
- **设计指南**：说明每种模式的适用场景、优缺点
- **快速原型**：可以作为快速原型的起点

## 交互模式列表

### 第一期核心模式

1. **Chatbot 对话**
   - 流式输出 (Streaming)
   - 非流式输出 (Non-streaming)
   - 多轮对话历史
   - 代码高亮、Markdown 渲染

2. **Infinite Canvas LLM**
   - 无限画布上的节点式对话
   - 分支对话
   - 空间化的思维导图

3. **Inline Completion**
   - 输入框内的自动补全
   - 类似 IDE 的 autocomplete
   - Tab 键接受建议

4. **LLM Artifacts**
   - 生成可交互的内容（图表、代码、UI 等）
   - 实时预览
   - 可编辑和迭代

5. **Command Palette**
   - 快捷键唤起的命令面板
   - 自然语言指令执行
   - 类似 Cmd+K 的交互

6. **Inline Editing**
   - 选中文本后的编辑模式
   - 重写、优化、翻译等操作
   - Diff 视图展示修改

### 第二期扩展模式

7. **Sidebar Assistant**
   - 持续存在的侧边栏助手
   - 可以引用主界面内容

8. **Contextual Menu**
   - 右键菜单集成 LLM
   - 快速操作（总结、解释、翻译）

9. **Progressive Disclosure**
   - 渐进式展开的对话
   - 引用和来源的展开

10. **Multi-agent Collaboration**
    - 多个 AI 角色协同
    - 角色对话可视化

## 技术栈

### 核心技术
- **构建工具**: Vite
- **框架**: React + TypeScript
- **UI 组件**: shadcn/ui + Radix UI
- **样式**: Tailwind CSS
- **路由**: React Router
- **状态管理**: Zustand / Jotai（轻量级）

### 展示和交互
- **代码展示**: Prism.js / Shiki
- **Markdown**: React Markdown
- **沙箱**: iframe 隔离展示
- **动画**: Framer Motion

### 数据和 API
- **Mock 数据**: 本地 JSON / TypeScript 模拟响应
- **流式模拟**: 使用 setTimeout 模拟逐字输出
- **未来扩展**: 可接入真实 LLM API

## 项目结构

```
/src
  /components
    /ui              # shadcn 基础组件
    /layout          # 布局组件（Header, Sidebar, etc）
    /patterns        # 交互模式的实现组件
      /chatbot
      /canvas
      /inline-completion
      /artifacts
      /command-palette
      /inline-editing
      ...
  /demos             # 每个交互模式的完整演示
    /chatbot-demo
    /canvas-demo
    ...
  /lib
    /mock            # Mock 数据和模拟 API
    /utils           # 工具函数
  /pages             # 页面
    /home            # 首页 Gallery 视图
    /pattern         # 单个模式详情页
    /playground      # 交互式试验场
  /hooks             # 自定义 Hooks
  /types             # TypeScript 类型定义
```

## 功能特性

### Gallery 首页
- **卡片展示**：每个交互模式一个卡片
- **分类筛选**：按类型、复杂度、场景分类
- **搜索**：快速查找特定模式
- **预览**：卡片上的小型预览/GIF

### 模式详情页
- **实时演示**：iframe 中的可交互演示
- **代码查看**：支持查看实现代码
- **设计说明**：
  - 适用场景
  - 优点和缺点
  - 最佳实践
  - 实现要点
- **变体展示**：同一模式的不同变体

### Playground（可选）
- 可以自由组合和测试不同的交互元素
- 实时调整参数
- 导出代码

## 实现阶段

### Phase 1: 基础框架（Week 1-2）
- [ ] 项目搭建：Vite + React + TypeScript
- [ ] 配置 shadcn/ui
- [ ] 基础布局和路由
- [ ] Mock 数据系统设计
- [ ] 首页 Gallery 视图

### Phase 2: 核心交互模式（Week 3-4）
- [ ] Chatbot（流式 + 非流式）
- [ ] Inline Completion
- [ ] LLM Artifacts
- [ ] 每个模式的详情页

### Phase 3: 高级模式（Week 5-6）
- [ ] Infinite Canvas
- [ ] Command Palette
- [ ] Inline Editing
- [ ] iframe 沙箱优化

### Phase 4: 完善和优化（Week 7-8）
- [ ] 添加更多模式
- [ ] 代码展示和复制功能
- [ ] 响应式适配
- [ ] 性能优化
- [ ] 文档完善

## 设计原则

1. **可交互性优先**：每个演示都应该是可以实际操作的
2. **代码可复用**：组件设计应便于复制和使用
3. **清晰的文档**：每个模式都有详细的说明和最佳实践
4. **视觉一致性**：统一的设计语言，但每个模式保持独特性
5. **性能考虑**：iframe 隔离，避免影响主应用性能

## 未来扩展

- 支持接入真实 LLM API（OpenAI, Anthropic, etc）
- 用户可以提交新的交互模式
- 社区投票和评分
- 导出为独立组件包
- 多语言支持