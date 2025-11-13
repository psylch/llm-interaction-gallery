# LLM Interaction Patterns Gallery

> A curated gallery of interaction patterns for Large Language Models

[![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🎯 About

This project showcases various interaction patterns for Large Language Models (LLMs), helping developers and designers explore and learn different ways to build AI-powered interfaces.

**Live Demo**: http://localhost:5173 (when running locally)

## ✨ Features

- **6 Interaction Patterns**: Chatbot, Inline Completion, LLM Artifacts, Infinite Canvas, Command Palette, Inline Editing
- **Beautiful UI**: "Future Lab" aesthetic with dark theme and neon accents
- **Production-Ready Code**: Built with React, TypeScript, and Tailwind CSS
- **Mock API System**: Simulate LLM responses with streaming support
- **Fully Documented**: Comprehensive docs for every component and pattern

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Design System

**Theme**: Future Lab - Dark mode with neon cyan and magenta accents

**Typography**:
- Display: Syne
- Body: Epilogue
- Monospace: JetBrains Mono

**Key Features**:
- Animated grid background
- Glow effects on hover
- Glassmorphism
- Gradient borders
- Shimmer animations

## 📚 Documentation

- [CLAUDE.MD](CLAUDE.MD) - AI collaboration guide
- [docs/prd_init.md](docs/prd_init.md) - Product requirements
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - System architecture
- [docs/PATTERNS_SPEC.md](docs/PATTERNS_SPEC.md) - Pattern specifications
- [docs/API_SPEC.md](docs/API_SPEC.md) - Mock API documentation
- [docs/ROADMAP.md](docs/ROADMAP.md) - Development roadmap
- [docs/CHANGELOG.md](docs/CHANGELOG.md) - Version history

## 🎭 Interaction Patterns

### ✅ Available
- **Chatbot** - Classic conversational interface with streaming support

### 🚧 Coming Soon (WIP)
- **Inline Completion** - Real-time text completion
- **LLM Artifacts** - Generate interactive content
- **Infinite Canvas** - Spatial conversation nodes
- **Command Palette** - Keyboard-driven commands
- **Inline Editing** - AI-powered text editing

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Router**: React Router v6
- **Animation**: Framer Motion
- **State**: Zustand
- **Markdown**: React Markdown

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── patterns/      # Interaction pattern components
│   ├── layout/        # Layout components
│   └── common/        # Shared components
├── pages/             # Page components
├── lib/               # Utilities and APIs
│   ├── mock/          # Mock API system
│   └── utils/         # Helper functions
├── hooks/             # Custom React hooks
├── types/             # TypeScript types
└── styles/            # Global styles
```

## 🤝 Contributing

This project follows a **spec-driven development** approach. Please read [CLAUDE.MD](CLAUDE.MD) to understand the collaboration workflow.

## 📄 License

MIT License - feel free to use this project for learning and building!

## 🙏 Credits

Built with:
- ⚡ Claude Code
- 🎨 frontend-design skill
- 💙 Love for great UX

---

**Note**: This is an educational project showcasing LLM interaction patterns. The "AI responses" are mocked and don't connect to real LLM services.
