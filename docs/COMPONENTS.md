# 组件库文档 (COMPONENTS)

> 本文档记录项目中的所有组件，包括 UI 组件和业务组件

**最后更新**: 2025-11-12
**版本**: v0.1.0

---

## 📋 组件分类

### UI 基础组件（来自 shadcn/ui）

这些组件在 `src/components/ui/` 目录下：

- Button
- Card
- Input
- Dialog
- Dropdown
- Tabs
- Tooltip
- Command
- （待添加更多）

**文档**: 参考 [shadcn/ui 官方文档](https://ui.shadcn.com/)

### 布局组件

位置: `src/components/layout/`

- Header
- Sidebar
- MainLayout
- Footer

### 业务组件

位置: `src/components/patterns/`

每个交互模式的组件（详见下文）

---

## 🎨 布局组件

### MainLayout

**描述**: 应用主布局

**路径**: `src/components/layout/main-layout.tsx`

**Props**:
```typescript
interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}
```

**使用**:
```typescript
<MainLayout showSidebar={true}>
  <YourPage />
</MainLayout>
```

### Header

**描述**: 顶部导航栏

**Props**:
```typescript
interface HeaderProps {
  title?: string;
  showSearch?: boolean;
}
```

---

## 🧩 Pattern 组件

### 1. ChatBot

**位置**: `src/components/patterns/chatbot/`

**主要组件**:

#### ChatBot (index.tsx)

**Props**:
```typescript
interface ChatBotProps {
  /** 初始消息 */
  initialMessages?: Message[];

  /** 是否启用流式输出 */
  streaming?: boolean;

  /** 配置 */
  config?: ChatConfig;

  /** 自定义样式类名 */
  className?: string;
}
```

**使用示例**:
```typescript
<ChatBot
  streaming={true}
  config={{
    placeholder: "输入消息...",
    showTimestamp: true
  }}
/>
```

#### MessageList

**Props**:
```typescript
interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  className?: string;
}
```

#### MessageItem

**Props**:
```typescript
interface MessageItemProps {
  message: Message;
  showTimestamp?: boolean;
  className?: string;
}
```

#### InputArea

**Props**:
```typescript
interface InputAreaProps {
  onSend: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}
```

**Hooks**:

- `useChat()`: 管理聊天状态和逻辑

```typescript
const {
  messages,
  isLoading,
  sendMessage,
  clearMessages
} = useChat({ streaming: true });
```

---

### 2. InlineCompletion

**位置**: `src/components/patterns/inline-completion/`

#### CompletionInput

**Props**:
```typescript
interface CompletionInputProps {
  /** 初始值 */
  value?: string;

  /** 值改变回调 */
  onChange?: (value: string) => void;

  /** 配置 */
  config?: CompletionConfig;

  className?: string;
}

interface CompletionConfig {
  /** 触发延迟 (ms) */
  debounceDelay?: number;

  /** 最大补全长度 */
  maxCompletionLength?: number;

  /** 占位符 */
  placeholder?: string;
}
```

**使用示例**:
```typescript
<CompletionInput
  config={{
    debounceDelay: 300,
    maxCompletionLength: 100
  }}
  onChange={handleChange}
/>
```

**Hooks**:

- `useCompletion()`: 管理补全逻辑

```typescript
const {
  value,
  suggestion,
  isLoading,
  acceptSuggestion,
  rejectSuggestion
} = useCompletion();
```

---

### 3. Artifacts

**位置**: `src/components/patterns/artifacts/`

#### ArtifactContainer

**Props**:
```typescript
interface ArtifactContainerProps {
  /** 初始 artifacts */
  initialArtifacts?: Artifact[];

  /** 布局模式 */
  layout?: 'split' | 'tabs';

  className?: string;
}
```

#### ArtifactRenderer

**Props**:
```typescript
interface ArtifactRendererProps {
  artifact: Artifact;
  onUpdate?: (artifact: Artifact) => void;
  editable?: boolean;
}
```

**使用示例**:
```typescript
<ArtifactRenderer
  artifact={artifact}
  editable={true}
  onUpdate={handleUpdate}
/>
```

---

### 4. InfiniteCanvas

**位置**: `src/components/patterns/canvas/`

#### CanvasViewport

**Props**:
```typescript
interface CanvasViewportProps {
  nodes: CanvasNode[];
  connections: Connection[];
  onNodeCreate?: (node: CanvasNode) => void;
  onNodeUpdate?: (node: CanvasNode) => void;
  onNodeDelete?: (nodeId: string) => void;
}
```

---

### 5. CommandPalette

**位置**: `src/components/patterns/command-palette/`

#### CommandPalette

**Props**:
```typescript
interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commands: Command[];
}
```

**使用示例**:
```typescript
const [open, setOpen] = useState(false);

// 快捷键
useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen(true);
    }
  };

  document.addEventListener('keydown', down);
  return () => document.removeEventListener('keydown', down);
}, []);

return (
  <CommandPalette
    open={open}
    onOpenChange={setOpen}
    commands={commands}
  />
);
```

---

### 6. InlineEditor

**位置**: `src/components/patterns/inline-editing/`

#### InlineEditor

**Props**:
```typescript
interface InlineEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
  operations?: EditOperation[];
}
```

#### DiffView

**Props**:
```typescript
interface DiffViewProps {
  original: string;
  modified: string;
  onAccept: () => void;
  onReject: () => void;
}
```

---

## 🧱 共用组件

### PatternCard

**位置**: `src/components/common/pattern-card.tsx`

**描述**: Gallery 页面展示每个模式的卡片

**Props**:
```typescript
interface PatternCardProps {
  pattern: PatternConfig;
  onClick?: () => void;
}
```

### CodeViewer

**位置**: `src/components/common/code-viewer.tsx`

**描述**: 代码展示组件，带语法高亮和复制功能

**Props**:
```typescript
interface CodeViewerProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}
```

### DemoFrame

**位置**: `src/components/common/demo-frame.tsx`

**描述**: iframe 演示容器

**Props**:
```typescript
interface DemoFrameProps {
  src: string;
  title: string;
  height?: string | number;
}
```

---

## 🪝 自定义 Hooks

### useStreaming

**位置**: `src/hooks/use-streaming.ts`

**描述**: 管理流式输出状态

**签名**:
```typescript
function useStreaming(
  fullText: string,
  options?: StreamingOptions
): {
  currentText: string;
  isStreaming: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}
```

### useLLMMock

**位置**: `src/hooks/use-llm-mock.ts`

**描述**: 封装 Mock LLM API 调用

**签名**:
```typescript
function useLLMMock() {
  return {
    chat: mockChat,
    chatStream: mockChatStream,
    completion: mockCompletion,
    // ...
  };
}
```

### usePatternData

**位置**: `src/hooks/use-pattern-data.ts`

**描述**: 获取模式配置数据

**签名**:
```typescript
function usePatternData(patternId: string): PatternConfig | null
```

---

## 📝 组件开发规范

### 文件结构

```
/component-name/
  ├── index.tsx       # 主组件导出
  ├── types.ts        # 类型定义
  ├── hooks.ts        # 组件专用 hooks（如有）
  ├── utils.ts        # 工具函数（如有）
  └── README.md       # 组件文档（可选）
```

### 组件模板

```typescript
// index.tsx
import { FC } from 'react';
import { ComponentProps } from './types';

/**
 * Component description
 *
 * @example
 * ```tsx
 * <Component prop1="value" />
 * ```
 */
export const Component: FC<ComponentProps> = ({
  prop1,
  prop2,
  className,
  ...rest
}) => {
  return (
    <div className={cn("base-classes", className)} {...rest}>
      {/* Component content */}
    </div>
  );
};

Component.displayName = 'Component';
```

### Props 规范

```typescript
// types.ts
export interface ComponentProps {
  /** Required prop with description */
  requiredProp: string;

  /** Optional prop with description */
  optionalProp?: number;

  /** Callback with description */
  onAction?: (value: string) => void;

  /** Custom className */
  className?: string;

  /** Children elements */
  children?: React.ReactNode;
}
```

---

## 🎨 样式规范

### Tailwind 类名组织

```typescript
// ✅ 推荐：使用 cn 工具函数
<div className={cn(
  "base-class",
  "layout-classes",
  "spacing-classes",
  "color-classes",
  conditionalClass && "conditional-classes",
  className
)}>
```

### 响应式

```typescript
// 移动优先
<div className="text-sm md:text-base lg:text-lg">
```

---

## 🧪 组件测试（未来）

### 单元测试示例

```typescript
import { render, screen } from '@testing-library/react';
import { Component } from './';

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component prop1="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
```

---

## 📚 参考资源

- [React 官方文档](https://react.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

---

> 💡 **提示**: 添加新组件后，请及时更新本文档
