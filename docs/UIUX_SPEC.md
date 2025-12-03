# UI/UX 设计规范 (UIUX SPEC)

> 本文档定义项目的视觉设计系统、交互规范和用户体验指南

**最后更新**: 2025-12-03
**版本**: v0.3.0
**设计主题**: "未来实验室" (Future Lab)

---

## 📐 设计原则

### 核心理念

1. **科技感与未来感**
   - 深色主题为主
   - 荧光色强调
   - 网格和几何元素

2. **可读性优先**
   - 高对比度文字
   - 充足的留白
   - 清晰的层次结构

3. **流畅的交互**
   - 300ms 标准过渡时间
   - 微妙的悬停效果
   - 即时的视觉反馈

4. **克制的动画**
   - 动画服务于功能
   - 避免过度装饰
   - 保证性能

---

## 🎨 视觉设计系统

### 色彩系统

#### 主色调

```css
/* 背景色 */
--background: 240 10% 4%           /* 深邃黑 #0a0a0f */
--foreground: 0 0% 98%             /* 纯白 */

/* 主色 */
--primary: 168 100% 50%            /* 荧光青 #00ffcc */
--primary-foreground: 0 0% 0%      /* 黑色文字 */

/* 次要色 */
--secondary: 280 80% 58%           /* 洋红 #b936ee */
--secondary-foreground: 0 0% 98%   /* 白色文字 */

/* 强调色 */
--accent: 180 100% 50%             /* 亮青 #00ffff */
--accent-foreground: 0 0% 0%       /* 黑色文字 */

/* 边框和分割线 */
--border: 0 0% 100% / 0.1          /* 10% 白色 */
--muted: 0 0% 100% / 0.3           /* 30% 白色 */
--muted-foreground: 0 0% 60%       /* 灰色 */
```

#### 语义色

```css
/* 成功 */
--success: 142 76% 36%             /* 绿色 */
--success-light: 142 76% 36% / 0.1 /* 浅绿背景 */

/* 警告 */
--warning: 38 92% 50%              /* 黄色 */
--warning-light: 38 92% 50% / 0.1  /* 浅黄背景 */

/* 错误 */
--error: 0 84% 60%                 /* 红色 */
--error-light: 0 84% 60% / 0.1     /* 浅红背景 */

/* 信息 */
--info: 217 91% 60%                /* 蓝色 */
--info-light: 217 91% 60% / 0.1    /* 浅蓝背景 */
```

#### 文字颜色

```css
/* 标题 */
--text-title: rgb(229, 231, 235)    /* text-gray-200 */

/* 正文 */
--text-body: rgb(209, 213, 219)     /* text-gray-300 */

/* 次要文字 */
--text-secondary: rgb(156, 163, 175) /* text-gray-400 */

/* 占位符 */
--text-placeholder: rgb(107, 114, 128) /* text-gray-500 */
```

### 字体系统

#### 字体族

```css
/* Display 字体 - 标题和强调 */
font-display: "Syne", sans-serif

/* Sans 字体 - 正文 */
font-sans: "Epilogue", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

/* Mono 字体 - 代码和数据 */
font-mono: "JetBrains Mono", "Fira Code", Consolas, monospace
```

#### 字体大小

```css
/* 标题 */
text-4xl: 2.25rem  /* 36px - 页面主标题 */
text-3xl: 1.875rem /* 30px - 区域标题 */
text-2xl: 1.5rem   /* 24px - 子标题 */
text-xl:  1.25rem  /* 20px - 小标题 */
text-lg:  1.125rem /* 18px - 大正文 */

/* 正文 */
text-base: 1rem    /* 16px - 标准正文 */
text-sm:   0.875rem /* 14px - 小字 */
text-xs:   0.75rem  /* 12px - 极小字 */
```

#### 字重

```css
font-light: 300   /* 轻盈 */
font-normal: 400  /* 正常 */
font-medium: 500  /* 中等 */
font-semibold: 600 /* 半粗 */
font-bold: 700    /* 粗体 */
```

### 间距系统

遵循 8px 基准网格：

```css
/* Tailwind spacing scale */
spacing-0.5: 0.125rem  /* 2px */
spacing-1:   0.25rem   /* 4px */
spacing-2:   0.5rem    /* 8px */
spacing-3:   0.75rem   /* 12px */
spacing-4:   1rem      /* 16px */
spacing-6:   1.5rem    /* 24px */
spacing-8:   2rem      /* 32px */
spacing-12:  3rem      /* 48px */
spacing-16:  4rem      /* 64px */
```

### 圆角系统

```css
rounded-none: 0
rounded-sm:   0.125rem  /* 2px */
rounded:      0.25rem   /* 4px */
rounded-md:   0.375rem  /* 6px */
rounded-lg:   0.5rem    /* 8px */
rounded-xl:   0.75rem   /* 12px */
rounded-2xl:  1rem      /* 16px */
rounded-full: 9999px
```

---

## ✨ Glassmorphism 效果系统

### 设计原则

- **提升可读性**: 模糊背景提供文字背景层
- **视觉层次**: 不同模糊程度创建深度感
- **专业质感**: 符合"未来实验室"美学
- **性能优化**: 使用 CSS 原生属性

### 效果层级

#### 一级容器（最强模糊）

```css
/* 用于：页面主容器、Tab 导航区 */
backdrop-blur-xl bg-white/5 border border-white/10
```

**效果**：
- `backdrop-blur-xl`: 24px 模糊半径
- `bg-white/5`: 5% 不透明度白色背景
- `border-white/10`: 10% 不透明度白色边框

#### 二级容器（中等模糊）

```css
/* 用于：卡片、模块、按钮背景 */
backdrop-blur-md bg-white/5 border border-white/10
```

**效果**：
- `backdrop-blur-md`: 12px 模糊半径
- 适合内容卡片和独立模块

#### 代码区域（深色半透明）

```css
/* 用于：代码块、终端 */
backdrop-blur-md bg-black/40 border border-white/10
```

**效果**：
- `bg-black/40`: 40% 不透明度黑色
- 更暗的背景突出代码

#### 彩色主题卡片

```css
/* 优点 - 绿色 */
backdrop-blur-md bg-green-500/5 border border-green-500/20

/* 缺点 - 黄色 */
backdrop-blur-md bg-yellow-500/5 border border-yellow-500/20

/* 最佳实践 - 蓝色 */
backdrop-blur-md bg-blue-500/5 border border-blue-500/20

/* 信息提示 - 青色 */
backdrop-blur-md bg-primary/10 border border-primary/30
```

### 文字可读性优化

#### 标题文字

```css
/* 主标题 */
text-gray-200 font-display font-bold

/* 区域标题 */
text-white font-display font-semibold
```

#### 正文文字

```css
/* 标准正文 */
text-gray-300 leading-relaxed

/* 次要文字 */
text-gray-400 leading-normal
```

#### 代码文字

```css
/* 代码块 */
text-gray-200 font-mono text-sm leading-relaxed
```

---

## 🖼️ 组件设计规范

### PatternCard（模式卡片）

#### 基础结构

```tsx
<div className="glass rounded-xl p-6 border border-white/10
                hover:border-primary/50 transition-all duration-300
                group relative overflow-hidden">
  {/* 分类色条 */}
  <div className="absolute top-0 left-0 right-0 h-1
                  bg-gradient-to-r from-primary to-secondary" />

  {/* 内容区域 */}
  <div className="space-y-4">
    <h3 className="text-xl font-display font-bold
                   group-hover:gradient-text transition-all">
      {name}
    </h3>
    <p className="text-gray-300">{description}</p>
  </div>

  {/* 悬停效果 */}
  <div className="shimmer opacity-0 group-hover:opacity-100" />
</div>
```

#### 状态变体

**Available（可用）**:
```css
border-white/10 hover:border-primary/50
```

**WIP（进行中）**:
```css
border-yellow-500/30
/* 添加脉动动画徽章 */
```

**Coming Soon（即将到来）**:
```css
border-white/5 opacity-60
```

### Tab 导航

#### 标准 Tab 按钮

```tsx
<button className={`
  flex items-center gap-2 px-6 py-3 rounded-lg
  font-medium transition-all duration-300
  ${active
    ? 'bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/20'
    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
  }
`}>
  <span className="text-xl">{icon}</span>
  <span>{label}</span>
</button>
```

**激活状态特性**：
- 背景：`bg-primary/20`
- 边框：`border-primary/30`
- 发光：`shadow-lg shadow-primary/20`
- 文字：`text-primary`

**未激活状态**：
- 文字：`text-gray-400`
- 悬停：`hover:text-gray-200 hover:bg-white/5`

### 按钮系统

#### 主按钮（Primary）

```tsx
<button className="
  px-6 py-3 rounded-lg
  bg-primary text-black
  hover:bg-primary/90
  transition-all duration-300
  hover:shadow-lg hover:shadow-primary/50
  font-medium
">
  {label}
</button>
```

#### 次要按钮（Secondary）

```tsx
<button className="
  px-6 py-3 rounded-lg
  backdrop-blur-md bg-white/5 border border-white/10
  text-gray-200
  hover:bg-white/10 hover:border-primary/50
  transition-all duration-300
">
  {label}
</button>
```

#### 文字按钮（Text）

```tsx
<button className="
  px-4 py-2
  text-primary hover:text-primary/80
  transition-colors duration-300
  underline-offset-4 hover:underline
">
  {label}
</button>
```

### CopyButton（复制按钮）

```tsx
<button className="
  inline-flex items-center gap-2 px-4 py-2
  rounded-lg border border-primary/30
  bg-background/50 hover:bg-primary/10
  text-sm font-mono text-primary
  transition-all duration-300
  hover:border-primary hover:glow
">
  {copied ? <CheckIcon /> : <CopyIcon />}
  <span>{copied ? 'Copied!' : label}</span>
</button>
```

---

## 🎭 特效系统

### 渐变效果

#### 文字渐变

```css
.gradient-text {
  @apply bg-gradient-to-r from-primary via-accent to-secondary
         bg-clip-text text-transparent;
}
```

#### 边框渐变

```css
/* 顶部色条 */
.gradient-border-top {
  @apply bg-gradient-to-r from-primary to-secondary;
}

/* 完整边框 */
.gradient-border {
  border: 1px solid transparent;
  background:
    linear-gradient(var(--background), var(--background)) padding-box,
    linear-gradient(to right, var(--primary), var(--secondary)) border-box;
}
```

### 发光效果

#### 边框发光

```css
.glow {
  box-shadow: 0 0 20px rgba(0, 255, 204, 0.3);
}

.glow-strong {
  box-shadow: 0 0 40px rgba(0, 255, 204, 0.5);
}
```

#### 文字发光

```css
.text-glow {
  text-shadow: 0 0 20px rgba(0, 255, 204, 0.5);
}
```

### 动画效果

#### 淡入动画

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}
```

#### 闪光扫过

```css
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 255, 204, 0.1),
    transparent
  );
  animation: shimmer 3s infinite;
}
```

#### 脉动动画

```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

## 📱 响应式设计

### 断点系统

```css
/* Tailwind 默认断点 */
sm:  640px   /* 小屏幕 */
md:  768px   /* 平板 */
lg:  1024px  /* 桌面 */
xl:  1280px  /* 大桌面 */
2xl: 1536px  /* 超大屏 */
```

### 响应式模式

#### 移动优先

```tsx
<div className="
  flex flex-col gap-4      /* 移动端：垂直布局 */
  md:flex-row md:gap-6     /* 桌面：水平布局 */
">
```

#### 网格布局

```tsx
<div className="
  grid grid-cols-1         /* 移动端：1 列 */
  md:grid-cols-2           /* 平板：2 列 */
  lg:grid-cols-3           /* 桌面：3 列 */
  gap-6
">
```

---

## 🎬 交互规范

### 悬停状态

**标准悬停**：
```css
transition-all duration-300
hover:scale-105
hover:shadow-lg
```

**卡片悬停**：
```css
hover:border-primary/50
hover:shadow-primary/20
```

**按钮悬停**：
```css
hover:bg-primary/90
hover:shadow-lg hover:shadow-primary/50
```

### 激活状态

```css
active:scale-95
transition-transform duration-150
```

### 焦点状态

```css
focus:outline-none
focus:ring-2 focus:ring-primary focus:ring-offset-2
focus:ring-offset-background
```

### 禁用状态

```css
disabled:opacity-50
disabled:cursor-not-allowed
disabled:hover:scale-100
```

---

## 📋 Tab 式详情页规范

### 页面结构

```
┌─────────────────────────────────────────┐
│  Pattern Header                         │
│  - 标题、描述、标签                       │
│  - backdrop-blur-xl bg-white/5          │
├─────────────────────────────────────────┤
│  Tab Navigation                         │
│  - backdrop-blur-xl bg-white/5          │
│  - [🎮 Live Demo] [📝 Overview] [💻]    │
├─────────────────────────────────────────┤
│  Tab Content Area                       │
│  - backdrop-blur-xl bg-white/5          │
│  - min-h-[600px]                        │
│                                         │
│  (Live Demo 默认显示)                    │
└─────────────────────────────────────────┘
```

### Tab 类型定义

```typescript
type TabType = 'demo' | 'overview' | 'implementation';
```

#### Live Demo Tab 🎮

**用途**: 优先展示交互演示

**内容**：
- 内部组件渲染
- 外部网页 iframe
- "Open in new tab" 按钮
- iframe 阻止友好提示

**样式**：
```css
/* Demo 容器 */
backdrop-blur-md bg-black/20 rounded-lg border border-white/10
```

#### Overview Tab 📝

**用途**: 详细的模式说明

**内容区域**：
- **Use Cases** 🎯 - 使用场景
- **Key Features** ✦ - 关键特性
- **Advantages** ✓ - 优点（绿色）
- **Limitations** ⚠ - 缺点（黄色）
- **Best Practices** 💡 - 最佳实践（蓝色）

**卡片样式**：
```css
/* 通用卡片 */
backdrop-blur-md bg-white/5 rounded-lg p-6 border border-white/10

/* 优点卡片 */
backdrop-blur-md bg-green-500/5 border border-green-500/20

/* 缺点卡片 */
backdrop-blur-md bg-yellow-500/5 border border-yellow-500/20

/* 最佳实践卡片 */
backdrop-blur-md bg-blue-500/5 border border-blue-500/20
```

#### Implementation Tab 💻

**用途**: 代码示例和实现指南

**Sub-tabs**：
- **Code Example** - 完整代码
- **LLM Prompt (llms.txt)** - 实现指南

**功能**：
- 📋 Copy Code 按钮
- 📄 Copy Prompt 按钮
- 语法高亮
- 横向滚动

**代码块样式**：
```css
backdrop-blur-md bg-black/40 rounded-lg border border-white/10
```

---

## ♿ 可访问性

### 键盘导航

- Tab 键切换焦点
- Enter 键激活按钮
- Escape 键关闭模态框
- 方向键导航列表

### 焦点指示

```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-primary
focus-visible:ring-offset-2
focus-visible:ring-offset-background
```

### ARIA 标签

```tsx
<button
  aria-label="Copy code to clipboard"
  aria-pressed={copied}
>
  Copy
</button>
```

### 颜色对比度

- 标题文字：至少 7:1
- 正文文字：至少 4.5:1
- 大文字（18px+）：至少 3:1

---

## 📏 最佳实践

### DO（推荐）

✅ 使用 CSS 变量管理颜色
✅ 使用 Tailwind 工具类
✅ 保持一致的间距系统
✅ 使用语义化的类名
✅ 优先使用 CSS 动画
✅ 测试响应式布局
✅ 确保可访问性

### DON'T（避免）

❌ 硬编码颜色值
❌ 使用内联样式
❌ 过度使用动画
❌ 忽略移动端适配
❌ 忽略键盘导航
❌ 使用低对比度文字
❌ 创建不一致的组件

---

## 🔍 质量检查清单

在实现新界面时，确保：

- [ ] 使用项目定义的字体（Syne/Epilogue/JetBrains Mono）
- [ ] 颜色来自 CSS 变量或 Tailwind 配置
- [ ] 包含至少一种视觉效果（blur/glow/gradient）
- [ ] 有悬停和激活状态
- [ ] 动画持续时间为 300ms
- [ ] 符合"未来实验室"美学
- [ ] 文字清晰可读（使用 text-gray-200/300）
- [ ] 响应式设计（移动端友好）
- [ ] 可访问性（键盘导航、ARIA）
- [ ] 性能优化（使用 transform 和 opacity）

---

## 📚 相关文档

- [ARCHITECTURE.md](./ARCHITECTURE.md) - 系统架构设计
- [CLAUDE.md](../CLAUDE.md) - AI 协作指南（包含 Frontend Design Skill）
- [globals.css](../src/styles/globals.css) - CSS 变量和工具类定义

---

> 💡 **提示**: 本文档会随着设计系统演进持续更新。所有新增组件都应遵循这些规范。
