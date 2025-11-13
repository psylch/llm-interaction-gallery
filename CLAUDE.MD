# CLAUDE.MD - AI 协作指南

> 本文档定义了 Claude AI 与项目维护者的协作方式、工作流程和交互原则

## 文档目的

这是一个 **Spec-Driven Development** 项目。本文档确保：
- 在不同对话会话中保持项目上下文的连续性
- 统一的开发规范和代码风格
- 清晰的文档结构和维护方式
- 高效的沟通和协作

---

## 项目信息

**项目名称**: LLM Interaction Patterns Gallery
**技术栈**: Vite + React + TypeScript + shadcn/ui
**开发模式**: Spec-Driven, 文档先行

---

## 📚 文档体系

### 核心文档（MUST READ）

在每次对话开始时，Claude 应该按顺序阅读以下文档：

1. **CLAUDE.MD** (本文件)
   - 协作原则和工作流程
   - 文档索引
   - 代码规范

2. **docs/prd_init.md**
   - 产品需求和功能规格
   - 项目目标和范围
   - 技术栈选型

3. **docs/ROADMAP.md**
   - 当前开发阶段
   - 已完成功能清单
   - 待办任务列表
   - 优先级排序

4. **docs/ARCHITECTURE.md**
   - 系统架构设计
   - 目录结构
   - 模块划分
   - 技术决策

5. **docs/PATTERNS_SPEC.md**
   - 每个交互模式的详细规格
   - UX 流程图
   - 实现要点

6. **docs/API_SPEC.md**
   - Mock API 接口定义
   - 数据结构
   - 请求/响应格式

### 辅助文档（按需阅读）

7. **docs/COMPONENTS.md**
   - 组件库文档
   - 组件 API 和用法

8. **docs/CHANGELOG.md**
   - 版本历史
   - 重要变更记录

---

## 🤖 Claude 工作流程

### 每次对话开始时

```
1. 读取 CLAUDE.MD（本文件）
2. 读取 docs/ROADMAP.md 了解当前进度
3. 根据用户需求，读取相关的其他文档
4. 确认当前任务在 ROADMAP 中的位置
5. 开始工作
```

### 执行任务时

1. **理解需求**
   - 询问不明确的地方
   - 确认优先级

2. **查阅规范**
   - 检查相关的 spec 文档
   - 遵循已定义的设计和架构

3. **设计思考**（如涉及 UI）
   - 使用 frontend-design skill
   - 遵循"未来实验室"美学
   - 确保有独特的视觉特征

4. **实现功能**
   - 遵循代码规范（见下文）
   - 遵循设计系统（见 Frontend Design Skill 章节）
   - 编写清晰的注释
   - 保持代码一致性

5. **更新文档**
   - 完成功能后，更新 ROADMAP.md
   - 必要时更新相关 spec 文档
   - 记录重要变更到 CHANGELOG.md

6. **验证完成**
   - 确认功能符合规格
   - 检查是否有遗漏
   - UI 组件检查设计质量清单

---

## 💬 沟通原则

### 与用户的交互方式

1. **简洁明了**
   - 避免冗长的解释
   - 使用中文沟通
   - 代码注释使用英文

2. **主动确认**
   - 不确定时主动询问
   - 提供选项让用户选择
   - 说明技术权衡

3. **及时反馈**
   - 使用 TodoWrite 追踪任务
   - 说明当前进度
   - 遇到问题立即报告

4. **文档优先**
   - 重要决策记录到文档
   - 规格变更及时更新
   - 保持文档和代码同步

### 任务确认流程

```
用户提出需求
  ↓
Claude 确认理解
  ↓
查阅相关文档
  ↓
说明实现方案
  ↓
用户确认
  ↓
开始实现
```

---

## 📝 代码规范

### TypeScript 规范

```typescript
// ✅ 好的实践
interface PatternConfig {
  id: string;
  name: string;
  description: string;
  category: 'chat' | 'canvas' | 'completion' | 'artifact';
}

// ✅ 使用命名导出
export function useStreamingChat() { }

// ✅ 组件使用 FC 类型
export const ChatBot: React.FC<ChatBotProps> = ({ config }) => {
  // ...
}
```

### 文件组织

```
- 每个组件一个文件夹
- 包含 index.tsx, types.ts, styles.ts (如需要)
- 相关的 hooks 放在同一文件夹
```

### 命名规范

- **组件**: PascalCase (`ChatBot`, `InlineCompletion`)
- **文件**: kebab-case (`chat-bot.tsx`, `use-streaming.ts`)
- **变量/函数**: camelCase (`handleSubmit`, `isStreaming`)
- **常量**: UPPER_SNAKE_CASE (`MAX_TOKENS`, `DEFAULT_CONFIG`)
- **类型/接口**: PascalCase (`MessageType`, `PatternConfig`)

### 注释规范

```typescript
/**
 * Simulates streaming LLM response
 * @param text - Full text to stream
 * @param onChunk - Callback for each chunk
 * @param delay - Delay between chunks in ms
 */
export function simulateStreaming(
  text: string,
  onChunk: (chunk: string) => void,
  delay: number = 50
) {
  // Implementation
}
```

### Mock 数据规范

```typescript
// mock/data/chat-messages.ts
export const mockChatMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Hello',
    timestamp: Date.now(),
  },
  // ...
];
```

---

## 🏗️ 项目特定规范

### 交互模式组件结构

每个交互模式应该包含：

```
/src/components/patterns/chatbot/
  ├── index.tsx           # 主组件
  ├── types.ts            # 类型定义
  ├── use-chat.ts         # 自定义 Hook
  ├── message-list.tsx    # 子组件
  └── input-area.tsx      # 子组件
```

### Demo 页面结构

```
/src/demos/chatbot-demo/
  ├── index.tsx           # Demo 入口
  ├── config.ts           # 配置
  └── README.md           # 说明文档
```

### iframe 隔离原则

- 每个 demo 运行在独立的 iframe
- 避免样式污染
- 提供 postMessage 通信接口（如需要）

---

## 🎨 Frontend Design Skill 使用指南

### 何时使用

本项目**全局使用** frontend-design skill 来创建高质量、有设计感的界面。

### 设计思维框架

在编写任何 UI 代码之前，必须先进行设计思考：

#### 1. Purpose (目的)
- 这个界面解决什么问题？
- 目标用户是谁？
- 使用场景是什么？

#### 2. Tone (美学方向)
选择一个**极致的**美学方向，避免平庸：
- ✅ 本项目选择：**"未来实验室" (Future Lab)**
  - 深色主题 + 荧光色
  - 科技感 + 实验性
  - 专业但有个性

#### 3. Differentiation (差异化)
- 什么让这个界面**难以忘记**？
- 用户会记住的一个特点是什么？
- ✅ 本项目：网格背景 + 发光效果 + 流动渐变

### 设计系统

#### Typography (字体)

**禁止使用**：
- ❌ Inter, Roboto, Arial
- ❌ 系统默认字体
- ❌ Space Grotesk（过度使用）

**本项目选择**：
```css
font-display: "Syne"          /* 几何、未来感 */
font-sans: "Epilogue"         /* 优雅、易读 */
font-mono: "JetBrains Mono"   /* 代码展示 */
```

#### Color Palette (色彩)

**禁止使用**：
- ❌ 紫色渐变 + 白背景（AI cliche）
- ❌ 平庸的配色方案

**本项目选择**：
```css
--background: 240 10% 4%      /* 深邃黑 #0a0a0f */
--primary: 168 100% 50%       /* 荧光青 #00ffcc */
--secondary: 280 80% 58%      /* 洋红 #b936ee */
--accent: 180 100% 50%        /* 亮青 #00ffff */
```

#### Visual Effects (视觉效果)

必须包含的效果类型：

1. **Motion (动画)**
   - 使用 CSS 动画优先
   - 重点时刻使用 Framer Motion
   - 错落式入场动画（stagger）

2. **Backgrounds (背景)**
   - ✅ 网格动画背景
   - ✅ 噪点纹理
   - ❌ 避免纯色背景

3. **Special Effects (特效)**
   - Glow (发光)
   - Glassmorphism (玻璃态)
   - Gradient borders (渐变边框)
   - Shimmer (闪光扫过)

### 实现原则

#### 1. 一致性
- 使用 CSS 变量管理主题
- 所有颜色来自设计系统
- 统一的视觉语言

#### 2. 性能
- CSS 动画优先于 JavaScript
- 使用 `transform` 和 `opacity` 做动画
- 避免触发 layout 的属性

#### 3. 细节
- 精确的间距（使用 Tailwind spacing）
- 流畅的过渡（transition-all duration-300）
- 微妙的交互反馈

#### 4. 克制
- 不是所有元素都需要动画
- 重点在关键交互时刻
- 保证可用性优先

### 组件设计模式

#### PatternCard 示例

```typescript
// 1. 分类色条 - 视觉识别
<div className="absolute top-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />

// 2. 状态区分
{isWIP ? (
  <span className="wip-badge">
    <span className="animate-pulse bg-yellow-500" />
    WIP
  </span>
) : (
  <div className="glow-hover" />
)}

// 3. 悬停效果
<div className="shimmer opacity-0 group-hover:opacity-100" />

// 4. 渐变文字
<h3 className="group-hover:gradient-text transition-all" />
```

#### 动画系统

```typescript
// 错落入场
<div className="stagger-children">
  {items.map((item, index) => (
    <Component index={index} /> // 自动计算 delay
  ))}
</div>

// CSS 实现
.stagger-children > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-children > *:nth-child(2) { animation-delay: 0.2s; }
```

### 质量检查清单

实现新组件时，确保：

- [ ] 使用项目定义的字体（非 Inter/Roboto）
- [ ] 颜色来自 CSS 变量（非硬编码）
- [ ] 包含至少一种视觉效果（glow/shimmer/gradient）
- [ ] 有悬停/激活状态
- [ ] 动画流畅（300ms duration）
- [ ] 符合"未来实验室"美学
- [ ] 有独特的记忆点
- [ ] 响应式设计

### 禁止事项

- ❌ 不要使用 Inter, Roboto, Arial, 系统字体
- ❌ 不要使用紫色渐变 + 白背景
- ❌ 不要创建通用的、无个性的界面
- ❌ 不要忽略细节（间距、对齐、颜色）
- ❌ 不要过度动画（影响性能）

### 核心理念

> **迫使自己做出有意识的、大胆的、与众不同的设计决策，而不是依赖默认选项和常见模式。**

每个设计选择都要能回答：
- 为什么选这个字体？
- 为什么选这个颜色？
- 这个效果服务于什么目的？
- 如何体现"未来实验室"主题？

### 参考资源

- **globals.css**: 查看所有可用的效果类
- **PatternCard**: 查看完整的组件设计示例
- **ChatBot**: 查看交互组件的设计模式

---

## 🔄 文档维护规范

### 何时更新文档

| 场景 | 更新文档 |
|------|---------|
| 完成一个功能 | ROADMAP.md, CHANGELOG.md |
| 新增交互模式 | PATTERNS_SPEC.md |
| 架构调整 | ARCHITECTURE.md |
| API 变更 | API_SPEC.md |
| 新增组件 | COMPONENTS.md |
| 需求变更 | prd_init.md |

### 文档更新原则

1. **即时更新**: 代码和文档同步维护
2. **清晰描述**: 说明变更原因和影响
3. **版本标记**: 记录变更时间和负责人
4. **向后兼容**: 说明是否有 breaking changes

---

## 🚨 重要注意事项

### ⚠️ 禁止操作

- ❌ 不要偏离已定义的架构
- ❌ 不要引入未讨论的新依赖
- ❌ 不要修改已完成的核心组件（除非明确要求）
- ❌ 不要忽略 spec 文档自行实现

### ✅ 必须操作

- ✅ 始终遵循 spec 文档
- ✅ 代码前查阅相关文档
- ✅ 完成后更新 ROADMAP
- ✅ 重要决策记录到文档
- ✅ 保持代码风格一致

---

## 🎯 快速参考

### 新对话开始 Checklist

- [ ] 读取 CLAUDE.MD
- [ ] 读取 ROADMAP.md 确认当前进度
- [ ] 了解用户需求
- [ ] 查阅相关 spec 文档
- [ ] 开始工作

### 完成任务 Checklist

- [ ] 功能符合规格
- [ ] 代码遵循规范
- [ ] 更新 ROADMAP.md
- [ ] 更新相关文档
- [ ] 测试验证通过

### 遇到问题时

1. 检查是否有相关 spec 文档
2. 查看 ARCHITECTURE.md 了解设计意图
3. 如果需要偏离规范，先与用户讨论
4. 记录决策到相关文档

---

## 📌 附录

### 常用命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 类型检查
npm run type-check

# Lint
npm run lint
```

### 项目链接

- 文档目录: `/docs`
- 源码目录: `/src`
- 组件目录: `/src/components/patterns`

---

## 📅 文档版本

**当前版本**: v0.2.0
**最后更新**: 2025-11-13
**维护者**: User & Claude

**更新历史**:
- v0.2.0 (2025-11-13): 添加 Frontend Design Skill 使用指南
- v0.1.0 (2025-11-12): 初始版本

---

> 💡 **提示**: 本文档会随着项目演进持续更新。如有疑问或建议，请及时与用户沟通。
