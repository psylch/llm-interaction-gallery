import { PatternConfig } from '@/types/pattern';

export const PATTERNS: PatternConfig[] = [
  {
    id: 'chatbot',
    name: 'Chatbot',
    description: 'Classic conversational interface with streaming support',
    category: 'chat',
    complexity: 'simple',
    status: 'available',
    tags: ['chat', 'conversation', 'streaming'],
    demoPath: '/demo/chatbot',
  },
  {
    id: 'inline-completion',
    name: 'Inline Completion',
    description: 'Real-time text completion as you type',
    category: 'completion',
    complexity: 'medium',
    status: 'wip',
    tags: ['completion', 'autocomplete', 'inline'],
    demoPath: '/demo/inline-completion',
  },
  {
    id: 'artifacts',
    name: 'LLM Artifacts',
    description: 'Generate and preview interactive content',
    category: 'generation',
    complexity: 'complex',
    status: 'wip',
    tags: ['generation', 'preview', 'interactive'],
    demoPath: '/demo/artifacts',
  },
  {
    id: 'infinite-canvas',
    name: 'Infinite Canvas',
    description: 'Spatial conversation on an infinite canvas',
    category: 'canvas',
    complexity: 'complex',
    status: 'wip',
    tags: ['canvas', 'spatial', 'nodes'],
    demoPath: '/demo/canvas',
  },
  {
    id: 'command-palette',
    name: 'Command Palette',
    description: 'Keyboard-driven command interface',
    category: 'command',
    complexity: 'medium',
    status: 'wip',
    tags: ['command', 'keyboard', 'search'],
    demoPath: '/demo/command-palette',
  },
  {
    id: 'inline-editing',
    name: 'Inline Editing',
    description: 'Edit selected text with AI assistance',
    category: 'editing',
    complexity: 'medium',
    status: 'wip',
    tags: ['editing', 'selection', 'diff'],
    demoPath: '/demo/inline-editing',
  },
];

export function getPatternById(id: string): PatternConfig | undefined {
  return PATTERNS.find(p => p.id === id);
}

export function getPatternsByCategory(category: string): PatternConfig[] {
  return PATTERNS.filter(p => p.category === category);
}

export function getPatternsByStatus(status: string): PatternConfig[] {
  return PATTERNS.filter(p => p.status === status);
}
