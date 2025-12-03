# Pattern 集成指南

> 本文档提供将独立项目集成到 LLM Interaction Patterns Gallery 的标准化流程

## 📋 目录

- [前置准备](#前置准备)
- [Step 1: 清理独立项目配置](#step-1-清理独立项目配置)
- [Step 2: 创建包装组件](#step-2-创建包装组件)
- [Step 3: 配置 Pattern 元数据](#step-3-配置-pattern-元数据)
- [Step 4: 更新详情页渲染逻辑](#step-4-更新详情页渲染逻辑)
- [Step 5: 编写文档内容](#step-5-编写文档内容)
- [Step 6: 更新项目文档](#step-6-更新项目文档)
- [Step 7: 测试验证](#step-7-测试验证)
- [常见问题](#常见问题)

---

## 前置准备

### 检查清单

- [ ] 独立项目已放置在 `src/components/patterns/{pattern-id}/` 目录
- [ ] 项目可以独立运行（验证功能正常）
- [ ] 了解项目的主要组件和入口文件
- [ ] 确认依赖是否已安装（检查 package.json）

### 文件结构示例

假设你有一个名为 `inline-completion` 的独立项目：

```
src/components/patterns/inline-completion/
├── package.json          # 需要删除
├── vite.config.ts        # 需要删除
├── tsconfig.json         # 需要删除
├── index.html            # 需要删除
├── index.tsx             # 需要删除（独立项目入口）
├── App.tsx               # 可能需要删除（取决于是否需要）
├── components/           # 保留
│   └── MainComponent.tsx # 保留（主组件）
├── services/             # 保留
│   └── api.ts            # 保留
└── types.ts              # 保留
```

---

## Step 1: 清理独立项目配置

### 1.1 删除项目配置文件

删除以下会与主项目冲突的配置文件：

```bash
cd src/components/patterns/{pattern-id}

# 删除构建配置
rm -f package.json
rm -f vite.config.ts
rm -f tsconfig.json

# 删除入口文件
rm -f index.html
rm -f index.tsx

# 删除独立应用的根组件（如果不需要）
rm -f App.tsx
```

### 1.2 检查依赖

如果独立项目使用了主项目没有的依赖，需要安装：

```bash
# 回到项目根目录
cd /path/to/final_project

# 安装缺失的依赖
npm install <package-name>
```

**常见依赖示例**：
- `lucide-react` - 图标库
- `react-markdown` - Markdown 渲染
- `framer-motion` - 动画库

### 1.3 验证文件结构

确保只保留必要的文件：

```bash
tree src/components/patterns/{pattern-id} -L 2
```

**应该保留的文件类型**：
- ✅ 组件文件 (`*.tsx`, `*.ts`)
- ✅ 类型定义 (`types.ts`)
- ✅ 服务文件 (`services/`)
- ✅ 样式文件 (`*.css`)
- ✅ 说明文档 (`README.md`)
- ✅ 元数据 (`metadata.json`)

**应该删除的文件类型**：
- ❌ 构建配置 (`vite.config.ts`, `webpack.config.js`)
- ❌ 项目配置 (`package.json`, `tsconfig.json`)
- ❌ 入口文件 (`index.html`, `index.tsx`)
- ❌ 独立应用根组件 (`App.tsx`)

---

## Step 2: 创建包装组件

### 2.1 创建 Demo 包装组件

在 pattern 目录下创建一个包装组件，用于嵌入到详情页：

**文件路径**：`src/components/patterns/{pattern-id}/{PatternName}Demo.tsx`

**模板**：

```tsx
import React from 'react';
import { MainComponent } from './components/MainComponent';

/**
 * {Pattern Name} Demo Component
 * Wrapper for embedding in the pattern detail page
 */
export const {PatternName}Demo: React.FC = () => {
  return (
    <div className="w-full min-h-[600px] flex items-center justify-center p-6 relative">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      {/* Core Component */}
      <div className="w-full max-w-4xl relative z-10">
        <MainComponent />
      </div>
    </div>
  );
};
```

**关键点**：
- 使用 `min-h-[600px]` 确保足够的显示空间
- 添加背景光晕效果保持视觉一致性
- 根据实际组件调整 `max-w-*` 宽度限制

### 2.2 处理 Mock 数据

如果原项目使用 API，需要创建 Mock 版本：

**示例**：将 API 调用改为 Mock 数据

```typescript
// services/completionService.ts

// ❌ 原来的 API 调用
import { GoogleGenerativeAI } from '@google/generative-ai';

// ✅ 改为 Mock 数据
const MOCK_DELAY = 400; // ms

const PATTERNS: Record<string, string[]> = {
  "keyword1": ["completion1", "completion2"],
  "keyword2": ["completion3", "completion4"],
  "default": ["default completion"]
};

export const getCompletion = async (req: CompletionRequest): Promise<CompletionResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock 逻辑
      const suggestion = PATTERNS[req.text] || PATTERNS['default'][0];
      resolve({ suggestion });
    }, MOCK_DELAY);
  });
};
```

---

## Step 3: 配置 Pattern 元数据

### 3.1 更新 patterns.ts

**文件路径**：`src/lib/constants/patterns.ts`

找到对应的 pattern 配置，更新以下字段：

```typescript
{
  id: 'pattern-id',
  name: 'Pattern Name',
  description: 'Brief description of the pattern',
  category: 'chat' | 'completion' | 'generation' | 'canvas' | 'command' | 'editing',
  complexity: 'simple' | 'medium' | 'complex',
  status: 'available',  // ⚠️ 从 'wip' 改为 'available'
  tags: ['tag1', 'tag2', 'tag3'],
  demoPath: '/demo/pattern-id',
  demoType: 'internal' | 'external' | 'both',  // 选择展示方式

  // 如果有外部 demo URL
  externalDemoUrl: 'https://example.com/demo',
  externalDemoNote: '👆 This is a Mock version. For an API-powered live demo, click the button above to open in a new tab.',

  // Overview 部分（详细文档）
  overview: {
    useCases: [
      'Use case 1',
      'Use case 2',
      'Use case 3',
    ],
    keyFeatures: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ],
    pros: [
      'Advantage 1',
      'Advantage 2',
      'Advantage 3',
    ],
    cons: [
      'Limitation 1',
      'Limitation 2',
      'Limitation 3',
    ],
    bestPractices: [  // 可选
      'Best practice 1',
      'Best practice 2',
    ],
  },

  // Code Example（代码示例）
  codeExample: {
    language: 'typescript',
    description: 'Brief description of the code example',
    code: `// 在这里粘贴代码示例
import React from 'react';

export function Example() {
  // ...
}`,
  },

  // LLMs Prompt（给 LLM 的实现指南）
  llmsPrompt: `在这里编写给 LLM 的实现提示...

CORE FEATURES:
- Feature 1
- Feature 2

IMPLEMENTATION:
- Step 1
- Step 2

BEST PRACTICES:
- Practice 1
- Practice 2`,
}
```

### 3.2 DemoType 选择指南

| DemoType | 何时使用 | 效果 |
|----------|---------|------|
| `internal` | 只显示本地 Mock 版本 | 直接在页面中渲染组件 |
| `external` | 只显示外部网站（iframe） | 尝试 iframe 嵌入 |
| `both` | **推荐**：本地 Mock + 外部链接 | 显示本地版本 + "Open API Demo" 按钮 |

---

## Step 4: 更新详情页渲染逻辑

### 4.1 导入组件

**文件路径**：`src/pages/pattern-detail/index.tsx`

在文件顶部添加导入：

```typescript
import { PatternNameDemo } from '@/components/patterns/pattern-id/PatternNameDemo';
```

### 4.2 添加渲染逻辑

在 Live Demo 标签页的渲染部分添加：

```typescript
{/* Live Demo Tab */}
{activeTab === 'demo' && (
  <div>
    {/* ... existing code ... */}

    {/* Internal demos */}
    {(pattern.demoType === 'internal' || pattern.demoType === 'both') && (
      <>
        {/* ... existing patterns ... */}

        {/* 新增的 pattern */}
        {pattern.id === 'pattern-id' && (
          <div className="backdrop-blur-md bg-black/20 rounded-lg border border-white/10">
            <PatternNameDemo />
          </div>
        )}
      </>
    )}
  </div>
)}
```

---

## Step 5: 编写文档内容

### 5.1 Overview 内容指南

#### Use Cases（使用场景）
描述这个模式在什么场景下使用，要具体：

```typescript
useCases: [
  'Customer support chatbots and FAQ systems',  // ✅ 具体
  'Code editors like GitHub Copilot',          // ✅ 有实际例子
  'Educational applications',                  // ❌ 太笼统
]
```

#### Key Features（核心特性）
列出技术特性和用户体验特点：

```typescript
keyFeatures: [
  'Real-time streaming with 20-50ms latency',        // ✅ 有数据
  'Markdown rendering with syntax highlighting',     // ✅ 具体功能
  'Context-aware suggestions using last 10 tokens',  // ✅ 技术细节
]
```

#### Pros & Cons（优缺点）
诚实地列出优势和局限性：

```typescript
pros: [
  'Non-intrusive user experience',           // 用户体验优势
  'Increases typing speed by 30-50%',       // 可量化的优势
],
cons: [
  'Requires fast API response (<300ms)',    // 技术限制
  'May distract users if suggestions are poor',  // 用户体验挑战
]
```

### 5.2 Code Example 指南

提供一个最小可运行的示例（50-150 行）：

```typescript
codeExample: {
  language: 'typescript',
  description: 'Basic implementation with core features',
  code: `import React, { useState } from 'react';

// 1. 定义类型
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// 2. 核心逻辑
export function PatternComponent() {
  const [state, setState] = useState<Message[]>([]);

  const handleAction = async () => {
    // 关键实现逻辑
  };

  // 3. UI 渲染
  return (
    <div>
      {/* 简化的 UI */}
    </div>
  );
}`
}
```

### 5.3 LLMs Prompt 指南

编写给 LLM 的实现提示，结构化、详细：

```
# Pattern Name Implementation Guide

CORE FEATURES:
- Feature 1: Detailed explanation
- Feature 2: Technical requirements
- Feature 3: Implementation considerations

DATA STRUCTURE:
- Define key interfaces and types
- Specify required fields

INTERACTION PATTERNS:
- Describe user interactions
- Define keyboard shortcuts
- Explain state transitions

STREAMING IMPLEMENTATION: (如果适用)
- Use async generators or SSE
- Handle partial updates
- Implement error recovery

ERROR HANDLING:
- Network errors: Retry mechanism
- API errors: User-friendly messages
- Edge cases: Graceful degradation

ACCESSIBILITY:
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management

UI BEST PRACTICES:
- Responsive design considerations
- Loading states and feedback
- Smooth animations

OPTIONAL ENHANCEMENTS:
- Advanced features
- Performance optimizations
- Future improvements
```

---

## Step 6: 更新项目文档

### 6.1 更新 ROADMAP.md

**文件路径**：`docs/ROADMAP.md`

将 pattern 从 WIP 移到 Completed：

```markdown
## ✅ Phase X: {Phase Name}

**状态**: 🚀 已完成

**完成功能**:
- [x] Pattern Name - {Brief description}
  - Mock 数据版本
  - 详细的 Overview 和最佳实践
  - Code Example 和 LLMs Prompt
```

### 6.2 更新 CHANGELOG.md

**文件路径**：`docs/CHANGELOG.md`

添加版本条目：

```markdown
## [v0.X.0] - YYYY-MM-DD

### ✨ New Features
- **Pattern Name**: Integrated {pattern name} pattern
  - Added mock-based implementation
  - Comprehensive documentation with use cases and best practices
  - Code example and LLMs prompt for developers
  - Hybrid demo mode (local mock + external API link)

### 🔧 Technical Changes
- Installed dependencies: `package-name-1`, `package-name-2`
- Added `{PatternName}Demo` wrapper component
- Updated pattern status from `wip` to `available`
```

### 6.3 更新 ARCHITECTURE.md（如有必要）

**文件路径**：`docs/ARCHITECTURE.md`

如果 pattern 引入了新的架构决策，记录在 Technical Decisions 部分：

```markdown
### Pattern Integration Strategy

**决策**: 使用包装组件模式集成独立项目

**背景**: 需要将完整的独立 Vite 项目集成到主项目中

**方案**:
1. 删除独立项目配置文件避免冲突
2. 创建 Demo 包装组件用于嵌入
3. 使用 Mock 数据替代 API 调用

**优势**:
- 避免项目配置冲突
- 保持组件独立性
- 降低演示成本（无需 API）
```

---

## Step 7: 测试验证

### 7.1 开发环境测试

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
# 1. 检查主页 pattern 卡片是否显示
# 2. 点击卡片进入详情页
# 3. 验证 Live Demo 是否正常工作
# 4. 切换到 Overview 标签页查看文档
# 5. 切换到 Implementation 标签页查看代码
```

### 7.2 功能测试清单

- [ ] Pattern 卡片在主页正确显示
- [ ] 卡片状态从 WIP 改为可点击
- [ ] 详情页标题和描述正确
- [ ] Live Demo 标签页组件正常渲染
- [ ] Mock 数据功能正常工作
- [ ] Overview 标签页内容完整
- [ ] Implementation 标签页代码和 Prompt 可复制
- [ ] "Open API Demo" 按钮（如有）正确跳转
- [ ] 响应式布局在移动端正常
- [ ] 无 Console 错误

### 7.3 构建测试

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

---

## 常见问题

### Q1: 依赖冲突怎么办？

**问题**：独立项目使用的包版本与主项目不同

**解决**：
1. 优先使用主项目的版本
2. 如果必须升级，先在分支测试
3. 记录依赖变更到 CHANGELOG.md

```bash
# 检查当前版本
npm list <package-name>

# 安装特定版本（如果需要）
npm install <package-name>@<version>
```

### Q2: 组件样式冲突？

**问题**：独立项目的样式影响主项目

**解决**：
1. 使用 Tailwind 的作用域类名
2. 避免全局 CSS
3. 使用 `className` 而不是 inline styles

```tsx
// ✅ 推荐：使用 Tailwind
<div className="backdrop-blur-md bg-white/5 rounded-lg">

// ❌ 避免：inline styles
<div style={{ backgroundColor: '#fff' }}>
```

### Q3: Mock 数据不够真实？

**问题**：Mock 响应太简单，无法展示复杂场景

**解决**：
1. 添加随机延迟模拟网络
2. 提供多个响应选项随机返回
3. 实现状态机模拟多轮交互

```typescript
// 添加延迟和随机性
const delay = 100 + Math.random() * 300;
const options = ['response1', 'response2', 'response3'];
const response = options[Math.floor(Math.random() * options.length)];
```

### Q4: 主组件文件找不到？

**问题**：不确定哪个是主要组件

**解决步骤**：
1. 查看 `index.tsx` 或 `App.tsx`（删除前）
2. 查找 `export default` 或最顶层组件
3. 查看 `package.json` 的 `main` 字段

### Q5: 类型定义报错？

**问题**：TypeScript 类型错误

**解决**：
1. 确保 `types.ts` 已保留
2. 检查导入路径是否正确
3. 使用 `@/` 别名而不是相对路径

```typescript
// ✅ 推荐：使用别名
import { Type } from '@/components/patterns/pattern-id/types';

// ⚠️ 可能出错：相对路径
import { Type } from '../../types';
```

---

## 快速参考

### 集成 Checklist（一页版）

```
Phase 1: 清理
[ ] 删除 package.json, vite.config.ts, tsconfig.json
[ ] 删除 index.html, index.tsx
[ ] 删除 App.tsx (如不需要)
[ ] 安装缺失的依赖
[ ] 验证文件结构

Phase 2: 组件
[ ] 创建 {PatternName}Demo.tsx
[ ] 确认主组件可导入
[ ] 处理 API 改为 Mock

Phase 3: 配置
[ ] 更新 patterns.ts
  [ ] status: 'available'
  [ ] demoType
  [ ] overview
  [ ] codeExample
  [ ] llmsPrompt
[ ] 更新 pattern-detail/index.tsx 渲染逻辑

Phase 4: 文档
[ ] 编写 Use Cases (3-5 条)
[ ] 编写 Key Features (4-6 条)
[ ] 编写 Pros & Cons (各 3-4 条)
[ ] 编写 Best Practices (可选)
[ ] 编写 Code Example (50-150 行)
[ ] 编写 LLMs Prompt (结构化)

Phase 5: 更新
[ ] 更新 ROADMAP.md
[ ] 更新 CHANGELOG.md
[ ] 更新 ARCHITECTURE.md (如需要)

Phase 6: 测试
[ ] 开发服务器运行正常
[ ] 主页卡片可点击
[ ] 详情页三个 Tab 都正常
[ ] Mock 功能正常工作
[ ] 无 Console 错误
[ ] 构建成功
```

---

## 附录：命令速查

```bash
# 文件操作
cd src/components/patterns/{pattern-id}
ls -la
tree -L 2

# 删除配置文件（一键清理）
rm -f package.json vite.config.ts tsconfig.json index.html index.tsx App.tsx

# 依赖管理
npm install <package-name>
npm list <package-name>

# 开发测试
npm run dev
npm run build
npm run preview

# 查看文件内容
cat src/lib/constants/patterns.ts
cat docs/ROADMAP.md
```

---

**文档版本**: v1.0.0
**最后更新**: 2025-12-03
**维护者**: Claude & User

---

> 💡 **提示**: 每次集成新 pattern 时，打开这个文档按照清单逐项完成，确保不遗漏任何步骤！
