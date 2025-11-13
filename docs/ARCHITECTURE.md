# 系统架构设计 (ARCHITECTURE)

> 本文档描述项目的整体架构、技术选型和设计决策

**最后更新**: 2025-11-12
**版本**: v0.1.0

---

## 📐 架构概览

### 系统分层

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│  (React Components + shadcn/ui)         │
├─────────────────────────────────────────┤
│           Business Logic Layer          │
│  (Custom Hooks + State Management)      │
├─────────────────────────────────────────┤
│            Data Layer                   │
│  (Mock API + Data Models)               │
└─────────────────────────────────────────┘
```

### 核心模块

1. **Gallery System** - 展示所有交互模式
2. **Pattern Components** - 各种交互模式的实现
3. **Demo Sandbox** - iframe 隔离的演示环境
4. **Mock System** - 模拟 LLM 响应
5. **Documentation** - 代码展示和说明

---

## 🗂️ 目录结构

```
/
├── docs/                    # 项目文档
│   ├── prd_init.md         # 产品需求
│   ├── ROADMAP.md          # 开发路线图
│   ├── ARCHITECTURE.md     # 架构设计（本文件）
│   ├── PATTERNS_SPEC.md    # 交互模式规格
│   ├── API_SPEC.md         # API 规范
│   ├── COMPONENTS.md       # 组件文档
│   └── CHANGELOG.md        # 变更日志
│
├── src/
│   ├── components/
│   │   ├── ui/             # shadcn 基础组件
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/         # 布局组件
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── main-layout.tsx
│   │   │   └── footer.tsx
│   │   │
│   │   └── patterns/       # 交互模式组件
│   │       ├── chatbot/
│   │       │   ├── index.tsx
│   │       │   ├── types.ts
│   │       │   ├── use-chat.ts
│   │       │   ├── message-list.tsx
│   │       │   ├── message-item.tsx
│   │       │   └── input-area.tsx
│   │       │
│   │       ├── inline-completion/
│   │       │   ├── index.tsx
│   │       │   ├── types.ts
│   │       │   ├── use-completion.ts
│   │       │   └── completion-input.tsx
│   │       │
│   │       ├── artifacts/
│   │       │   ├── index.tsx
│   │       │   ├── types.ts
│   │       │   ├── artifact-container.tsx
│   │       │   └── artifact-renderer.tsx
│   │       │
│   │       └── ... (其他模式)
│   │
│   ├── demos/              # 完整演示页面
│   │   ├── chatbot-demo/
│   │   │   ├── index.tsx
│   │   │   ├── config.ts
│   │   │   └── README.md
│   │   │
│   │   └── ... (其他 demo)
│   │
│   ├── pages/              # 路由页面
│   │   ├── home/           # Gallery 首页
│   │   │   ├── index.tsx
│   │   │   ├── pattern-card.tsx
│   │   │   ├── filter-bar.tsx
│   │   │   └── search-bar.tsx
│   │   │
│   │   ├── pattern-detail/ # 模式详情页
│   │   │   ├── index.tsx
│   │   │   ├── demo-frame.tsx
│   │   │   ├── code-viewer.tsx
│   │   │   └── spec-docs.tsx
│   │   │
│   │   └── playground/     # 实验场（可选）
│   │       └── index.tsx
│   │
│   ├── lib/                # 工具库
│   │   ├── mock/           # Mock 系统
│   │   │   ├── streaming.ts    # 流式输出模拟
│   │   │   ├── responses.ts    # 响应数据
│   │   │   └── api.ts          # Mock API
│   │   │
│   │   ├── utils/          # 工具函数
│   │   │   ├── cn.ts           # className 合并
│   │   │   ├── format.ts       # 格式化
│   │   │   └── delay.ts        # 延迟函数
│   │   │
│   │   └── constants/      # 常量
│   │       ├── patterns.ts     # 模式配置
│   │       └── routes.ts       # 路由配置
│   │
│   ├── hooks/              # 自定义 Hooks
│   │   ├── use-streaming.ts    # 流式输出
│   │   ├── use-llm-mock.ts     # LLM 模拟
│   │   └── use-pattern-data.ts # 模式数据
│   │
│   ├── types/              # TypeScript 类型
│   │   ├── pattern.ts          # 模式类型
│   │   ├── message.ts          # 消息类型
│   │   └── api.ts              # API 类型
│   │
│   ├── styles/             # 全局样式
│   │   └── globals.css
│   │
│   ├── App.tsx             # 应用入口
│   ├── main.tsx            # Vite 入口
│   └── routes.tsx          # 路由配置
│
├── public/                 # 静态资源
│   └── demos/              # Demo 的静态文件（如需要）
│
├── CLAUDE.MD               # AI 协作指南
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## 🛠️ 技术栈详解

### 核心框架

#### Vite
- **选择理由**:
  - 极快的开发服务器启动速度
  - 原生 ESM 支持
  - 优秀的 HMR 体验
  - TypeScript 开箱即用
- **配置要点**:
  - 配置路径别名 `@/`
  - 优化构建输出

#### React 18
- **选择理由**:
  - 组件化开发
  - 丰富的生态系统
  - Concurrent 特性支持流式渲染
- **使用特性**:
  - Hooks（主要使用）
  - Suspense（懒加载）

#### TypeScript
- **选择理由**:
  - 类型安全
  - 更好的 IDE 支持
  - 减少运行时错误
- **配置**:
  - strict 模式
  - 路径映射

### UI 框架

#### Tailwind CSS
- **选择理由**:
  - 快速开发
  - 一致的设计系统
  - 优秀的性能（PurgeCSS）
- **配置**:
  - 自定义主题
  - 暗色模式支持

#### shadcn/ui + Radix UI
- **选择理由**:
  - 无依赖，代码在项目中
  - 完全可定制
  - 基于 Radix UI，可访问性好
  - 美观的默认样式
- **使用组件**:
  - Button, Card, Input
  - Dialog, Dropdown
  - Tabs, Tooltip
  - Command (Command Palette)

### 路由和状态

#### React Router v6
- **选择理由**:
  - 声明式路由
  - 嵌套路由支持
  - 代码分割友好

#### 状态管理: Zustand
- **选择理由**:
  - 轻量级（~1KB）
  - API 简洁
  - TypeScript 友好
  - 无需 Provider
- **使用场景**:
  - 全局 UI 状态
  - 用户偏好设置
  - 跨组件数据共享

### 辅助库

#### Markdown 渲染: react-markdown
- 用于 Chatbot 中的 Markdown 内容

#### 代码高亮: Shiki / Prism.js
- 展示代码示例
- 支持多种语言和主题

#### 动画: Framer Motion
- 页面过渡
- 交互动画

---

## 🔄 数据流

### Mock 数据流

```
用户交互
  ↓
组件触发事件
  ↓
调用自定义 Hook (e.g., useChat)
  ↓
Hook 调用 Mock API
  ↓
Mock API 模拟延迟和流式输出
  ↓
Hook 更新状态
  ↓
组件重新渲染
```

### 流式输出模拟

```typescript
// lib/mock/streaming.ts
export function simulateStreaming(
  fullText: string,
  onChunk: (chunk: string) => void,
  options?: {
    delay?: number;
    chunkSize?: number;
  }
) {
  // 实现逐字输出效果
}
```

---

## 🎨 组件设计原则

### 1. 职责单一

每个组件只负责一个功能

```typescript
// ✅ 好的设计
<MessageList messages={messages} />
<InputArea onSend={handleSend} />

// ❌ 不好的设计
<ChatInterface /> // 包含太多职责
```

### 2. Props 明确

```typescript
interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  onMessageClick?: (id: string) => void;
}
```

### 3. 可组合性

组件应该易于组合和复用

```typescript
<ChatBot>
  <ChatBot.Header />
  <ChatBot.Messages />
  <ChatBot.Input />
</ChatBot>
```

### 4. 样式隔离

使用 Tailwind 类名，避免全局样式污染

---

## 🏗️ 关键模块设计

### 1. Mock System

#### 目标
- 模拟真实的 LLM API 行为
- 支持流式和非流式输出
- 可配置延迟和错误

#### 实现

```typescript
// lib/mock/api.ts
export interface MockLLMOptions {
  streaming?: boolean;
  delay?: number;
  errorRate?: number;
}

export async function mockLLMChat(
  messages: Message[],
  options?: MockLLMOptions
): Promise<string | AsyncGenerator<string>> {
  // 实现
}
```

### 2. Pattern Component System

#### 设计原则
- 每个 Pattern 是独立的
- 提供统一的接口
- 可以在 Gallery 和 Demo 中复用

#### Pattern 接口

```typescript
// types/pattern.ts
export interface PatternConfig {
  id: string;
  name: string;
  description: string;
  category: PatternCategory;
  complexity: 'simple' | 'medium' | 'complex';
  tags: string[];
}

export interface PatternComponent {
  config: PatternConfig;
  Demo: React.FC;
  Component: React.FC<any>;
}
```

### 3. Demo Sandbox (iframe)

#### 架构

```
┌─────────────────────────┐
│   Pattern Detail Page   │
│                         │
│  ┌───────────────────┐  │
│  │   iframe          │  │
│  │   ┌───────────┐   │  │
│  │   │   Demo    │   │  │
│  │   └───────────┘   │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │  Code Viewer      │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

#### iframe 通信（如需要）

```typescript
// postMessage 通信
window.parent.postMessage({
  type: 'DEMO_EVENT',
  payload: { /* ... */ }
}, '*');
```

---

## 🔐 安全考虑

### iframe 沙箱

```html
<iframe
  sandbox="allow-scripts allow-same-origin"
  src="/demos/chatbot"
/>
```

### CSP（Content Security Policy）

未来可能需要配置适当的 CSP 头

---

## 📊 性能优化策略

### 1. 代码分割

```typescript
// routes.tsx
const HomePage = lazy(() => import('./pages/home'));
const PatternDetail = lazy(() => import('./pages/pattern-detail'));
```

### 2. 组件懒加载

```typescript
// 按需加载 Pattern 组件
const patterns = {
  chatbot: lazy(() => import('./components/patterns/chatbot')),
  // ...
};
```

### 3. 虚拟滚动

如果 Pattern 数量很多，考虑使用虚拟滚动

### 4. Memoization

```typescript
const MemoizedMessageList = React.memo(MessageList);
```

---

## 🧪 测试策略（未来）

### 单元测试
- 使用 Vitest
- 测试工具函数和 Hooks

### 组件测试
- 使用 React Testing Library
- 测试用户交互

### E2E 测试
- 使用 Playwright
- 测试关键用户流程

---

## 🚀 部署架构（未来）

### 静态部署

```
Vite Build
  ↓
Static Files
  ↓
CDN (Vercel / Netlify / Cloudflare Pages)
```

### 环境配置

- Development
- Production

---

## 📝 技术决策记录

### 为什么选择 iframe 隔离？

**问题**: 如何展示 Demo 而不影响主应用？

**决策**: 使用 iframe 沙箱

**理由**:
- 样式完全隔离
- JavaScript 作用域隔离
- 安全性更好
- 可以独立部署 Demo

**权衡**:
- 通信稍复杂（需要 postMessage）
- 初始加载稍慢

### 为什么选择 Zustand 而非 Redux？

**决策**: 使用 Zustand

**理由**:
- 项目状态管理需求简单
- 更少的样板代码
- 更小的包体积
- 足够满足需求

---

## 🔄 未来演进

### v2.0 架构演进

- 考虑引入后端 API
- 接入真实 LLM 服务
- 添加数据库存储用户配置

### v3.0 架构演进

- 微前端架构
- 每个 Pattern 可独立部署
- 插件系统

---

> 💡 **提示**: 架构会随着项目发展逐步演进，重大变更需要更新本文档
