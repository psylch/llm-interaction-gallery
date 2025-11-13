# Mock API 接口规范 (API SPEC)

> 本文档定义项目中 Mock LLM API 的接口规范、数据结构和行为

**最后更新**: 2025-11-12
**版本**: v0.1.0

---

## 📋 目录

- [概述](#概述)
- [通用数据结构](#通用数据结构)
- [Chat API](#chat-api)
- [Completion API](#completion-api)
- [Artifact API](#artifact-api)
- [Edit API](#edit-api)
- [工具函数](#工具函数)

---

## 概述

### 设计原则

1. **模拟真实行为**: 尽可能接近真实 LLM API 的行为
2. **可配置性**: 支持配置延迟、错误率等参数
3. **类型安全**: 完整的 TypeScript 类型定义
4. **易于测试**: 提供确定性的测试数据

### Mock 数据来源

```
/src/lib/mock/
  ├── api.ts           # API 函数
  ├── streaming.ts     # 流式输出工具
  ├── data/            # Mock 数据
  │   ├── chat.ts      # 对话数据
  │   ├── completion.ts
  │   ├── artifacts.ts
  │   └── common.ts
  └── utils.ts         # 工具函数
```

---

## 通用数据结构

### Message

```typescript
interface Message {
  /** 消息唯一标识 */
  id: string;

  /** 角色 */
  role: 'user' | 'assistant' | 'system';

  /** 消息内容 */
  content: string;

  /** 时间戳 (ms) */
  timestamp: number;

  /** 元数据（可选） */
  metadata?: {
    tokens?: number;
    model?: string;
    [key: string]: any;
  };
}
```

### APIResponse

```typescript
interface APIResponse<T> {
  /** 是否成功 */
  success: boolean;

  /** 数据 */
  data?: T;

  /** 错误信息 */
  error?: {
    code: string;
    message: string;
  };

  /** 元数据 */
  metadata?: {
    requestId: string;
    timestamp: number;
    [key: string]: any;
  };
}
```

### MockOptions

```typescript
interface MockOptions {
  /** 延迟时间 (ms)，默认 1000 */
  delay?: number;

  /** 错误率 (0-1)，默认 0 */
  errorRate?: number;

  /** 是否启用流式输出 */
  streaming?: boolean;

  /** 流式输出配置 */
  streamingOptions?: {
    /** 每个 chunk 的延迟 (ms)，默认 50 */
    chunkDelay?: number;

    /** 每个 chunk 的字符数，默认 1-3 */
    chunkSize?: number;
  };
}
```

---

## Chat API

### 1. mockChat (非流式)

**描述**: 模拟对话 API，返回完整响应

**签名**:
```typescript
function mockChat(
  messages: Message[],
  options?: MockOptions
): Promise<APIResponse<Message>>
```

**参数**:
- `messages`: 对话历史，包含 user 和 assistant 消息
- `options`: Mock 配置选项

**返回**:
```typescript
{
  success: true,
  data: {
    id: "msg_xxx",
    role: "assistant",
    content: "LLM 的回复内容...",
    timestamp: 1699999999999,
    metadata: {
      tokens: 120,
      model: "mock-llm-v1"
    }
  },
  metadata: {
    requestId: "req_xxx",
    timestamp: 1699999999999
  }
}
```

**示例**:
```typescript
const response = await mockChat([
  { id: '1', role: 'user', content: 'Hello', timestamp: Date.now() }
], {
  delay: 1000
});

console.log(response.data.content); // "你好！有什么我可以帮助你的吗？"
```

**错误情况**:
```typescript
{
  success: false,
  error: {
    code: "RATE_LIMIT",
    message: "请求过于频繁，请稍后重试"
  }
}
```

### 2. mockChatStream (流式)

**描述**: 模拟流式对话 API，逐字返回响应

**签名**:
```typescript
function mockChatStream(
  messages: Message[],
  options?: MockOptions
): AsyncGenerator<string, void, unknown>
```

**参数**: 同 `mockChat`

**返回**: AsyncGenerator，每次 yield 一个文本片段

**示例**:
```typescript
const stream = mockChatStream([
  { id: '1', role: 'user', content: 'Hello', timestamp: Date.now() }
], {
  streamingOptions: {
    chunkDelay: 50,
    chunkSize: 2
  }
});

for await (const chunk of stream) {
  console.log(chunk); // "你", "好！", "有什", ...
}
```

### 3. Mock 响应数据

**位置**: `src/lib/mock/data/chat.ts`

```typescript
export const mockChatResponses: Record<string, string> = {
  // 问候
  hello: "你好！有什么我可以帮助你的吗？",
  hi: "嗨！很高兴见到你。",

  // 通用问题
  "what is llm": "LLM（Large Language Model，大型语言模型）是一种...",

  // 代码相关
  "write code": "当然，我可以帮你写代码。你需要什么类型的代码？",

  // 默认响应
  default: "我理解了你的问题。让我来帮助你解答..."
};

/** 根据用户消息匹配响应 */
export function matchResponse(userMessage: string): string {
  const normalized = userMessage.toLowerCase().trim();

  // 精确匹配
  if (mockChatResponses[normalized]) {
    return mockChatResponses[normalized];
  }

  // 模糊匹配
  for (const [key, value] of Object.entries(mockChatResponses)) {
    if (normalized.includes(key)) {
      return value;
    }
  }

  // 默认响应
  return mockChatResponses.default;
}
```

---

## Completion API

### 1. mockCompletion

**描述**: 模拟文本补全 API

**签名**:
```typescript
interface CompletionRequest {
  /** 光标前的文本 */
  prefix: string;

  /** 光标后的文本（可选） */
  suffix?: string;

  /** 额外上下文（可选） */
  context?: string;

  /** 最大补全长度 */
  maxLength?: number;
}

function mockCompletion(
  request: CompletionRequest,
  options?: MockOptions
): Promise<APIResponse<string>>
```

**返回**:
```typescript
{
  success: true,
  data: "建议的补全文本",
  metadata: {
    requestId: "req_xxx",
    timestamp: 1699999999999
  }
}
```

**示例**:
```typescript
const response = await mockCompletion({
  prefix: "const greeting = ",
  context: "// 创建一个问候函数"
}, {
  delay: 200
});

console.log(response.data); // "'Hello, World!'"
```

### 2. Mock 补全数据

**位置**: `src/lib/mock/data/completion.ts`

```typescript
export const mockCompletions: Record<string, string> = {
  "const greeting = ": "'Hello, World!'",
  "function add": "(a: number, b: number): number {\n  return a + b;\n}",
  "import React": " from 'react';",
  // ...
};

export function matchCompletion(prefix: string): string {
  // 精确匹配
  if (mockCompletions[prefix]) {
    return mockCompletions[prefix];
  }

  // 模糊匹配：找最长的匹配前缀
  let bestMatch = "";
  let bestKey = "";

  for (const key of Object.keys(mockCompletions)) {
    if (prefix.endsWith(key) && key.length > bestKey.length) {
      bestKey = key;
      bestMatch = mockCompletions[key];
    }
  }

  return bestMatch || "";
}
```

---

## Artifact API

### 1. mockGenerateArtifact

**描述**: 模拟生成 artifact（代码、图表等）

**签名**:
```typescript
interface Artifact {
  id: string;
  type: 'code' | 'chart' | 'markdown' | 'react' | 'svg';
  title: string;
  content: string;
  language?: string; // 对于 code 类型
  createdAt: number;
  updatedAt: number;
}

function mockGenerateArtifact(
  prompt: string,
  type: ArtifactType,
  options?: MockOptions
): Promise<APIResponse<Artifact>>
```

**返回**:
```typescript
{
  success: true,
  data: {
    id: "art_xxx",
    type: "code",
    title: "Hello World 示例",
    content: "console.log('Hello, World!');",
    language: "javascript",
    createdAt: 1699999999999,
    updatedAt: 1699999999999
  }
}
```

**示例**:
```typescript
const response = await mockGenerateArtifact(
  "创建一个 Hello World 程序",
  "code"
);

console.log(response.data.content);
```

### 2. mockUpdateArtifact

**描述**: 模拟更新已有 artifact

**签名**:
```typescript
function mockUpdateArtifact(
  artifactId: string,
  instructions: string,
  options?: MockOptions
): Promise<APIResponse<Artifact>>
```

**示例**:
```typescript
const response = await mockUpdateArtifact(
  "art_xxx",
  "添加错误处理"
);
```

### 3. Mock Artifact 数据

**位置**: `src/lib/mock/data/artifacts.ts`

```typescript
export const mockArtifactTemplates = {
  code: {
    javascript: {
      hello: `console.log('Hello, World!');`,
      function: `function greet(name) {\n  return \`Hello, \${name}!\`;\n}`,
    },
    typescript: {
      component: `import React from 'react';\n\ninterface Props {\n  name: string;\n}\n\nexport const Greeting: React.FC<Props> = ({ name }) => {\n  return <div>Hello, {name}!</div>;\n};`,
    },
  },
  chart: {
    line: {
      // Chart.js 配置
      config: { /* ... */ }
    }
  },
  // ...
};

export function generateArtifact(
  prompt: string,
  type: ArtifactType
): Artifact {
  // 基于 prompt 选择合适的模板
  // 返回 Artifact
}
```

---

## Edit API

### 1. mockInlineEdit

**描述**: 模拟行内编辑 API

**签名**:
```typescript
interface EditOperation {
  type: 'rewrite' | 'improve' | 'shorten' | 'expand' | 'translate' | 'fix';
  text: string;
  context?: string;
  targetLanguage?: string; // 对于 translate
}

function mockInlineEdit(
  operation: EditOperation,
  options?: MockOptions
): Promise<APIResponse<string>>
```

**返回**:
```typescript
{
  success: true,
  data: "编辑后的文本",
  metadata: {
    requestId: "req_xxx",
    timestamp: 1699999999999,
    operation: "rewrite"
  }
}
```

**示例**:
```typescript
const response = await mockInlineEdit({
  type: 'improve',
  text: 'This is a text',
  context: 'Technical documentation'
});

console.log(response.data); // "This is a well-written text."
```

### 2. Mock 编辑规则

**位置**: `src/lib/mock/data/edit.ts`

```typescript
export const editRules = {
  rewrite: (text: string) => {
    // 重写逻辑
    return `重写后的: ${text}`;
  },

  improve: (text: string) => {
    // 优化逻辑
    return text
      .replace(/\bi\b/g, 'I')
      .replace(/^[a-z]/, (c) => c.toUpperCase());
  },

  shorten: (text: string) => {
    // 缩短逻辑
    const words = text.split(' ');
    return words.slice(0, Math.ceil(words.length / 2)).join(' ') + '...';
  },

  expand: (text: string) => {
    // 延展逻辑
    return `${text} 这是一些额外的解释和细节。`;
  },

  translate: (text: string, targetLang: string) => {
    // 简单的翻译模拟
    if (targetLang === 'zh') {
      return `【中文翻译】: ${text}`;
    }
    return text;
  },

  fix: (text: string) => {
    // 修复语法
    return text
      .replace(/\bi\b/g, 'I')
      .replace(/(\w+)\s+\1/g, '$1'); // 去重复词
  }
};
```

---

## 工具函数

### 1. simulateStreaming

**描述**: 模拟流式输出

**位置**: `src/lib/mock/streaming.ts`

**签名**:
```typescript
interface StreamingOptions {
  /** 每个 chunk 的延迟 (ms) */
  chunkDelay?: number;

  /** 每个 chunk 的字符数 */
  chunkSize?: number;

  /** 是否随机 chunk 大小 */
  randomChunkSize?: boolean;
}

async function* simulateStreaming(
  fullText: string,
  options?: StreamingOptions
): AsyncGenerator<string, void, unknown>
```

**实现**:
```typescript
export async function* simulateStreaming(
  fullText: string,
  options: StreamingOptions = {}
): AsyncGenerator<string, void, unknown> {
  const {
    chunkDelay = 50,
    chunkSize = 2,
    randomChunkSize = false
  } = options;

  let index = 0;

  while (index < fullText.length) {
    const size = randomChunkSize
      ? Math.floor(Math.random() * chunkSize) + 1
      : chunkSize;

    const chunk = fullText.slice(index, index + size);
    index += size;

    yield chunk;

    // 延迟
    await delay(chunkDelay);
  }
}
```

### 2. delay

**描述**: 延迟工具函数

```typescript
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### 3. randomError

**描述**: 根据错误率随机抛出错误

```typescript
export function randomError(errorRate: number = 0): void {
  if (Math.random() < errorRate) {
    const errors = [
      { code: 'RATE_LIMIT', message: '请求过于频繁' },
      { code: 'SERVER_ERROR', message: '服务器错误' },
      { code: 'TIMEOUT', message: '请求超时' }
    ];

    const error = errors[Math.floor(Math.random() * errors.length)];
    throw new Error(JSON.stringify(error));
  }
}
```

### 4. generateId

**描述**: 生成唯一 ID

```typescript
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
```

---

## 使用示例

### 在组件中使用

```typescript
// hooks/use-chat.ts
import { mockChat, mockChatStream } from '@/lib/mock/api';
import { useState } from 'react';

export function useChat(streaming: boolean = false) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: generateId('msg'),
      role: 'user',
      content,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (streaming) {
        // 流式
        const stream = mockChatStream([...messages, userMessage]);
        let fullContent = '';

        const assistantMessage: Message = {
          id: generateId('msg'),
          role: 'assistant',
          content: '',
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, assistantMessage]);

        for await (const chunk of stream) {
          fullContent += chunk;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = fullContent;
            return newMessages;
          });
        }
      } else {
        // 非流式
        const response = await mockChat([...messages, userMessage]);

        if (response.success && response.data) {
          setMessages(prev => [...prev, response.data!]);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage };
}
```

---

## 扩展性

### 添加新的 Mock 响应

1. 在 `src/lib/mock/data/` 中添加数据
2. 在对应的 API 函数中引用
3. 更新类型定义

### 接入真实 API

未来接入真实 LLM API 时，只需：

1. 创建 `src/lib/api/` 目录
2. 实现相同接口的真实 API 函数
3. 通过环境变量或配置切换 mock/real

```typescript
// lib/api/index.ts
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const chatAPI = USE_MOCK
  ? mockChat
  : realChat;
```

---

## 测试数据

### 固定测试场景

```typescript
export const testScenarios = {
  // 基础对话
  basicChat: {
    messages: [
      { role: 'user', content: 'Hello' }
    ],
    expectedResponse: '你好！有什么我可以帮助你的吗？'
  },

  // 代码生成
  codeGeneration: {
    messages: [
      { role: 'user', content: 'Write a hello world function' }
    ],
    expectedResponse: /function.*hello/i
  },

  // 错误场景
  errorScenario: {
    messages: [],
    options: { errorRate: 1 },
    shouldFail: true
  }
};
```

---

## 附录

### API 错误码

| 错误码 | 说明 |
|--------|------|
| `RATE_LIMIT` | 请求频率过高 |
| `SERVER_ERROR` | 服务器内部错误 |
| `TIMEOUT` | 请求超时 |
| `INVALID_REQUEST` | 无效的请求参数 |
| `CONTEXT_LENGTH_EXCEEDED` | 上下文长度超限 |

### 性能指标

| 指标 | 目标值 |
|------|--------|
| 非流式响应延迟 | 500-1500ms |
| 流式首字延迟 | 200-500ms |
| 流式 chunk 延迟 | 30-80ms |
| 补全延迟 | 100-300ms |

---

> 💡 **提示**: 本规范会随着项目演进持续更新
