# 交互模式规格说明 (PATTERNS SPEC)

> 本文档详细定义每个 LLM 交互模式的规格、行为和实现要点

**最后更新**: 2025-11-12
**版本**: v0.1.0

---

## 📋 目录

- [1. Chatbot 对话](#1-chatbot-对话)
- [2. Inline Completion](#2-inline-completion)
- [3. LLM Artifacts](#3-llm-artifacts)
- [4. Infinite Canvas](#4-infinite-canvas)
- [5. Command Palette](#5-command-palette)
- [6. Inline Editing](#6-inline-editing)
- [其他模式](#其他模式)

---

## 模式分类

| 类别 | 模式 |
|------|------|
| **对话类** | Chatbot, Sidebar Assistant |
| **补全类** | Inline Completion |
| **生成类** | LLM Artifacts |
| **画布类** | Infinite Canvas |
| **命令类** | Command Palette, Contextual Menu |
| **编辑类** | Inline Editing |
| **协作类** | Multi-agent Collaboration |

---

## 1. Chatbot 对话

### 基本信息

- **ID**: `chatbot`
- **名称**: Chatbot 对话
- **类别**: 对话类
- **复杂度**: Simple
- **标签**: `chat`, `conversation`, `streaming`

### 功能描述

经典的对话式交互，用户和 LLM 进行多轮文本对话。支持流式和非流式两种输出模式。

### 适用场景

- 通用问答
- 客服机器人
- 助手应用
- 教学辅导

### 用户体验流程

```
用户输入消息
  ↓
点击发送 / 按 Enter
  ↓
消息添加到对话历史
  ↓
显示加载状态
  ↓
LLM 响应（流式逐字显示 或 一次性显示）
  ↓
响应添加到对话历史
  ↓
等待下一轮输入
```

### 关键特性

#### 1. 流式输出 (Streaming)

- **行为**: 文字逐字/逐词显示
- **延迟**: ~50ms/字
- **用户体验**: 更有"打字"的感觉，降低等待焦虑

#### 2. 非流式输出 (Non-streaming)

- **行为**: 完整响应一次性显示
- **延迟**: 1-3 秒后显示
- **用户体验**: 更适合短响应

#### 3. 消息历史

- 保存所有历史消息
- 支持滚动查看
- 最新消息自动滚动到底部

#### 4. Markdown 渲染

- 支持标题、列表、引用
- 代码块高亮
- 链接可点击

### UI 组件结构

```
<ChatBot>
  <ChatHeader />
  <MessageList>
    {messages.map(msg => (
      <MessageItem
        role={msg.role}
        content={msg.content}
      />
    ))}
  </MessageList>
  <InputArea
    onSend={handleSend}
    disabled={isLoading}
  />
</ChatBot>
```

### 数据模型

```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
}
```

### Mock API

```typescript
// 非流式
mockChat(messages: Message[]): Promise<string>

// 流式
mockChatStream(messages: Message[]): AsyncGenerator<string>
```

### 实现要点

1. **自动滚动**: 新消息时滚动到底部
2. **加载状态**: 显示"正在输入..."指示器
3. **错误处理**: 网络错误时显示重试按钮
4. **输入优化**:
   - Enter 发送，Shift+Enter 换行
   - 发送时清空输入框
   - 发送时禁用输入

### 变体

- **Streaming Chatbot**: 流式输出版本
- **Non-streaming Chatbot**: 非流式版本
- **Code-focused Chatbot**: 强化代码高亮

### 优缺点

**优点**:
- ✅ 用户熟悉的交互方式
- ✅ 适合多轮对话
- ✅ 容易实现

**缺点**:
- ❌ 历史消息多时占用空间大
- ❌ 不适合需要并行处理的场景

---

## 2. Inline Completion

### 基本信息

- **ID**: `inline-completion`
- **名称**: 行内补全
- **类别**: 补全类
- **复杂度**: Medium
- **标签**: `completion`, `autocomplete`, `inline`

### 功能描述

在用户输入时，实时提供自动补全建议，类似 IDE 的代码补全功能。

### 适用场景

- 文本编辑器
- 代码编辑器
- 邮件撰写
- 搜索框

### 用户体验流程

```
用户开始输入
  ↓
检测到停顿（debounce）
  ↓
调用补全 API
  ↓
灰色文本显示建议
  ↓
用户按 Tab 接受 / 继续输入忽略
```

### 关键特性

#### 1. 实时触发

- **触发时机**: 用户停止输入 300ms 后
- **防抖**: 避免频繁请求

#### 2. 视觉提示

- **建议文本**: 灰色/半透明显示
- **光标位置**: 在当前输入后
- **可区分**: 明显区分建议和已输入文本

#### 3. 快捷键交互

- **Tab**: 接受建议
- **Esc**: 拒绝建议
- **→**: 接受建议
- **继续输入**: 忽略建议

### UI 组件结构

```
<CompletionInput>
  <input value={value} onChange={handleChange} />
  {suggestion && (
    <SuggestionOverlay>
      {suggestion}
    </SuggestionOverlay>
  )}
</CompletionInput>
```

### 数据模型

```typescript
interface CompletionState {
  value: string;
  suggestion: string | null;
  isLoading: boolean;
}

interface CompletionRequest {
  prefix: string;  // 光标前的文本
  suffix?: string; // 光标后的文本
  context?: string; // 额外上下文
}
```

### Mock API

```typescript
mockCompletion(request: CompletionRequest): Promise<string>
```

### 实现要点

1. **Debounce**: 使用 300-500ms 防抖
2. **相对定位**: suggestion 覆盖层使用绝对定位
3. **字体同步**: 确保 suggestion 和 input 字体一致
4. **Tab 键处理**: 阻止默认行为，接受建议
5. **快速响应**: Mock 延迟控制在 100-300ms

### 变体

- **Single-line Completion**: 单行补全
- **Multi-line Completion**: 多行补全（类似 Copilot）
- **Ghost Text**: 幽灵文本风格

### 优缺点

**优点**:
- ✅ 提升输入效率
- ✅ 用户无需离开输入流
- ✅ 非侵入式

**缺点**:
- ❌ 需要快速响应才有好体验
- ❌ 建议不准确会打断思路

---

## 3. LLM Artifacts

### 基本信息

- **ID**: `artifacts`
- **名称**: LLM Artifacts
- **类别**: 生成类
- **复杂度**: Complex
- **标签**: `generation`, `preview`, `interactive`

### 功能描述

LLM 生成可交互的内容对象（代码、图表、UI 等），并在独立的容器中实时预览和编辑。

### 适用场景

- 代码生成工具
- 数据可视化
- 文档生成
- UI 原型

### 用户体验流程

```
用户请求生成某个 artifact
  ↓
LLM 生成代码/内容
  ↓
分屏显示：左侧对话，右侧预览
  ↓
实时渲染 artifact
  ↓
用户可以编辑和迭代
  ↓
保存或导出
```

### 关键特性

#### 1. Artifact 类型

- **Code**: JavaScript/TypeScript/Python/HTML/CSS
- **Chart**: 数据图表（基于 Chart.js 或 Recharts）
- **Markdown**: 格式化文档
- **React Component**: 可交互的 React 组件
- **SVG**: 矢量图形

#### 2. 分屏布局

```
┌────────────────┬─────────────────┐
│                │                 │
│   Chat Area    │  Artifact       │
│   (对话)        │  Preview        │
│                │  (预览)          │
│                │                 │
└────────────────┴─────────────────┘
```

#### 3. 实时预览

- 代码变更即时反映
- 错误提示
- 控制台输出（如果是代码）

#### 4. 编辑能力

- 在线编辑 artifact
- 语法高亮
- 重新生成/优化

### UI 组件结构

```
<ArtifactContainer>
  <SplitView>
    <ChatPanel>
      <ChatBot />
    </ChatPanel>
    <ArtifactPanel>
      <Tabs>
        <Tab label="Preview">
          <ArtifactRenderer artifact={artifact} />
        </Tab>
        <Tab label="Code">
          <CodeEditor code={artifact.code} />
        </Tab>
      </Tabs>
    </ArtifactPanel>
  </SplitView>
</ArtifactContainer>
```

### 数据模型

```typescript
interface Artifact {
  id: string;
  type: 'code' | 'chart' | 'markdown' | 'react' | 'svg';
  title: string;
  content: string;
  language?: string; // for code type
  createdAt: number;
  updatedAt: number;
}

interface ArtifactState {
  artifacts: Artifact[];
  currentArtifactId: string | null;
  isGenerating: boolean;
}
```

### Mock API

```typescript
mockGenerateArtifact(
  prompt: string,
  type: ArtifactType
): Promise<Artifact>

mockUpdateArtifact(
  artifactId: string,
  instructions: string
): Promise<Artifact>
```

### 实现要点

1. **沙箱渲染**: 使用 iframe 或 sandpack 安全渲染
2. **错误边界**: 捕获渲染错误
3. **代码编辑器**: 使用 Monaco Editor 或 CodeMirror
4. **响应式布局**: 支持调整左右面板大小
5. **版本历史**: 保存编辑历史（可选）

### 变体

- **Code Artifact**: 专注于代码生成
- **Chart Artifact**: 专注于数据可视化
- **Document Artifact**: 专注于文档生成

### 优缺点

**优点**:
- ✅ 所见即所得
- ✅ 支持复杂内容类型
- ✅ 可以迭代优化

**缺点**:
- ❌ 实现复杂
- ❌ 需要处理安全问题
- ❌ 性能开销大

---

## 4. Infinite Canvas

### 基本信息

- **ID**: `infinite-canvas`
- **名称**: 无限画布
- **类别**: 画布类
- **复杂度**: Complex
- **标签**: `canvas`, `spatial`, `nodes`, `branching`

### 功能描述

在无限扩展的画布上，以节点形式展示对话，支持分支和空间化思维导图。

### 适用场景

- 头脑风暴
- 知识图谱
- 复杂问题探索
- 多分支对话

### 用户体验流程

```
用户在画布上创建节点
  ↓
输入问题/想法
  ↓
LLM 响应生成新节点
  ↓
用户可以从任意节点分支新对话
  ↓
拖拽、缩放画布
  ↓
节点之间自动连线
```

### 关键特性

#### 1. 无限画布

- **平移**: 鼠标拖拽或触摸板
- **缩放**: 滚轮或双指缩放
- **边界**: 无限扩展

#### 2. 节点系统

- **节点类型**: 问题节点、回答节点
- **节点样式**: 不同角色不同颜色
- **节点状态**: 激活、未激活、加载中

#### 3. 分支对话

- 从任意节点发起新对话
- 形成树状结构
- 可视化分支关系

#### 4. 空间布局

- 自动布局算法（可选）
- 手动拖拽调整
- 连线自动路径规划

### UI 组件结构

```
<InfiniteCanvas>
  <CanvasViewport
    zoom={zoom}
    pan={pan}
    onZoom={handleZoom}
    onPan={handlePan}
  >
    {nodes.map(node => (
      <CanvasNode
        key={node.id}
        node={node}
        onBranch={handleBranch}
      />
    ))}
    <Connections nodes={nodes} />
  </CanvasViewport>
  <CanvasToolbar />
</InfiniteCanvas>
```

### 数据模型

```typescript
interface CanvasNode {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  position: { x: number; y: number };
  parentId: string | null;
  childrenIds: string[];
  createdAt: number;
}

interface CanvasState {
  nodes: CanvasNode[];
  connections: Connection[];
  viewport: {
    zoom: number;
    pan: { x: number; y: number };
  };
}

interface Connection {
  from: string;
  to: string;
}
```

### 实现要点

1. **画布库**: 使用 react-flow 或 xyflow
2. **性能优化**: 虚拟化大量节点
3. **手势支持**: 触摸板和鼠标手势
4. **自动布局**: 使用 dagre 或 elk.js（可选）
5. **持久化**: 保存画布状态

### 变体

- **Tree Layout**: 树状自动布局
- **Mind Map**: 思维导图风格
- **Free Form**: 自由拖拽布局

### 优缺点

**优点**:
- ✅ 适合复杂思维过程
- ✅ 可视化分支关系
- ✅ 空间感强

**缺点**:
- ❌ 实现复杂
- ❌ 学习曲线较陡
- ❌ 移动端体验差

---

## 5. Command Palette

### 基本信息

- **ID**: `command-palette`
- **名称**: 命令面板
- **类别**: 命令类
- **复杂度**: Medium
- **标签**: `command`, `keyboard`, `search`

### 功能描述

通过快捷键唤起的命令面板，用户可以用自然语言输入指令快速执行操作。

### 适用场景

- 效率工具
- IDE
- 应用快捷操作
- 搜索和导航

### 用户体验流程

```
用户按下 Cmd+K (或 Ctrl+K)
  ↓
命令面板弹出
  ↓
输入自然语言指令
  ↓
实时搜索/匹配命令
  ↓
选择命令 (Enter 或 点击)
  ↓
执行命令
  ↓
面板关闭
```

### 关键特性

#### 1. 快捷键唤起

- **macOS**: `Cmd + K`
- **Windows/Linux**: `Ctrl + K`
- **关闭**: `Esc`

#### 2. 模糊搜索

- 支持拼音、缩写
- 高亮匹配部分
- 智能排序

#### 3. 命令分类

- 最近使用
- 常用命令
- 所有命令

#### 4. 键盘导航

- `↑↓`: 选择命令
- `Enter`: 执行
- `Esc`: 关闭

### UI 组件结构

```
<CommandPalette open={open} onClose={handleClose}>
  <CommandInput
    value={query}
    onChange={setQuery}
    placeholder="输入命令或问题..."
  />
  <CommandList>
    <CommandGroup heading="建议">
      {suggestions.map(cmd => (
        <CommandItem
          key={cmd.id}
          onSelect={() => executeCommand(cmd)}
        >
          {cmd.label}
        </CommandItem>
      ))}
    </CommandGroup>
  </CommandList>
</CommandPalette>
```

### 数据模型

```typescript
interface Command {
  id: string;
  label: string;
  description?: string;
  keywords: string[];
  action: () => void | Promise<void>;
  icon?: React.ReactNode;
  shortcut?: string;
}

interface CommandPaletteState {
  open: boolean;
  query: string;
  selectedIndex: number;
  recentCommands: string[];
}
```

### 实现要点

1. **快捷键监听**: 全局键盘事件
2. **模糊搜索**: 使用 fuse.js
3. **Portal 渲染**: 使用 React Portal 确保层级
4. **焦点管理**: 打开时自动聚焦输入框
5. **命令注册**: 可扩展的命令系统

### 变体

- **Simple Search**: 简单搜索版本
- **AI-powered**: LLM 理解自然语言指令
- **Nested Commands**: 支持子命令

### 优缺点

**优点**:
- ✅ 高效快捷
- ✅ 降低菜单复杂度
- ✅ 键盘友好

**缺点**:
- ❌ 需要用户熟悉快捷键
- ❌ 移动端不适用

---

## 6. Inline Editing

### 基本信息

- **ID**: `inline-editing`
- **名称**: 行内编辑
- **类别**: 编辑类
- **复杂度**: Medium
- **标签**: `editing`, `selection`, `diff`

### 功能描述

选中文本后，通过快捷键或菜单触发 LLM 进行文本编辑、重写、翻译等操作，并以 diff 视图展示修改。

### 适用场景

- 文本编辑器
- 写作工具
- 代码编辑器
- 邮件撰写

### 用户体验流程

```
用户选中文本
  ↓
按 Cmd+K 或右键菜单
  ↓
选择操作（重写/优化/翻译）
  ↓
LLM 处理
  ↓
Diff 视图显示修改
  ↓
接受 或 拒绝 修改
```

### 关键特性

#### 1. 文本选择检测

- 监听 selection 事件
- 悬浮工具栏显示

#### 2. 操作菜单

- 重写 (Rewrite)
- 优化 (Improve)
- 缩短 (Shorten)
- 延展 (Expand)
- 翻译 (Translate)
- 修复语法 (Fix Grammar)

#### 3. Diff 视图

- 高亮删除部分（红色）
- 高亮新增部分（绿色）
- 保留未修改部分

#### 4. 快速操作

- `Cmd + Enter`: 接受
- `Esc`: 拒绝
- 点击接受/拒绝按钮

### UI 组件结构

```
<InlineEditor>
  <TextArea
    value={content}
    onSelect={handleSelect}
  />
  {selection && (
    <FloatingToolbar position={toolbarPosition}>
      <ToolbarButton onClick={() => edit('rewrite')}>
        重写
      </ToolbarButton>
      {/* 其他操作 */}
    </FloatingToolbar>
  )}
  {diffMode && (
    <DiffView
      original={original}
      modified={modified}
      onAccept={handleAccept}
      onReject={handleReject}
    />
  )}
</InlineEditor>
```

### 数据模型

```typescript
interface Selection {
  text: string;
  start: number;
  end: number;
}

interface EditOperation {
  type: 'rewrite' | 'improve' | 'translate' | 'fix';
  selection: Selection;
  context?: string;
}

interface DiffResult {
  original: string;
  modified: string;
  changes: Change[];
}

interface Change {
  type: 'add' | 'remove' | 'unchanged';
  text: string;
  position: number;
}
```

### Mock API

```typescript
mockInlineEdit(
  operation: EditOperation
): Promise<string>
```

### 实现要点

1. **Selection API**: 使用浏览器 Selection API
2. **Floating Toolbar**: Popper.js 或 Floating UI 定位
3. **Diff 算法**: diff-match-patch 或 fast-diff
4. **高亮渲染**: 自定义 Diff 渲染组件
5. **撤销/重做**: 支持历史记录

### 变体

- **Simple Replace**: 简单替换，无 Diff
- **Side-by-side Diff**: 左右对比视图
- **Inline Diff**: 行内 Diff

### 优缺点

**优点**:
- ✅ 直观的编辑体验
- ✅ 修改可控
- ✅ 适合文本优化

**缺点**:
- ❌ Diff 视图对长文本不友好
- ❌ 移动端交互复杂

---

## 其他模式

### 7. Sidebar Assistant

**简要说明**: 持续存在的侧边栏助手，可以引用主界面内容。

**关键特性**:
- 固定侧边栏
- 上下文感知
- 快速引用

**优先级**: P2

### 8. Contextual Menu

**简要说明**: 右键菜单集成 LLM 快捷操作。

**关键特性**:
- 右键触发
- 快速操作（总结、解释、翻译）

**优先级**: P2

### 9. Progressive Disclosure

**简要说明**: 渐进式展开的对话，类似 Perplexity 的引用展开。

**关键特性**:
- 折叠/展开引用
- 来源链接
- 分层信息

**优先级**: P2

### 10. Multi-agent Collaboration

**简要说明**: 多个 AI 角色协同对话。

**关键特性**:
- 多角色
- 角色对话可视化
- 协作流程

**优先级**: P2

---

## 附录

### 通用设计原则

1. **一致性**: 所有模式遵循统一的视觉语言
2. **可访问性**: 支持键盘导航和屏幕阅读器
3. **响应式**: 适配不同屏幕尺寸
4. **性能**: 流畅的交互，<100ms 响应
5. **容错性**: 优雅的错误处理

### 测试清单

对每个模式，需要测试：
- [ ] 基本功能正常
- [ ] 键盘交互
- [ ] 错误场景
- [ ] 加载状态
- [ ] 响应式布局
- [ ] 可访问性

---

> 💡 **提示**: 实现新模式时，请参考本文档的规格定义
