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
    demoType: 'internal',

    overview: {
      useCases: [
        'Customer support and FAQ systems',
        'Virtual assistants and personal AI helpers',
        'Educational tutoring applications',
        'Content creation and brainstorming tools',
        'Code explanation and debugging assistance',
      ],
      keyFeatures: [
        'Streaming text output for real-time response display',
        'Markdown rendering with syntax highlighting for code blocks',
        'Multi-turn conversation with message history',
        'Auto-scrolling to latest messages',
        'Loading states and typing indicators',
        'Support for user and assistant message roles',
      ],
      pros: [
        'Familiar and intuitive for users',
        'Excellent for multi-turn conversations',
        'Easy to implement and maintain',
        'Works well on all device sizes',
        'Supports rich content (markdown, code, images)',
      ],
      cons: [
        'Can become overwhelming with long conversation history',
        'Linear format limits exploration of alternative responses',
        'Requires scrolling for reviewing past messages',
        'May not be ideal for tasks requiring spatial organization',
      ],
      bestPractices: [
        'Implement streaming for responses longer than a few sentences',
        'Use clear visual distinction between user and assistant messages',
        'Add timestamps for better conversation context',
        'Provide "Clear chat" and "Export conversation" options',
        'Handle errors gracefully with retry mechanisms',
        'Consider adding message reactions or feedback buttons',
      ],
    },

    codeExample: {
      language: 'typescript',
      description: 'Basic React implementation with streaming support',
      code: `import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate streaming response
    const assistantMsg = {
      id: (Date.now() + 1).toString(),
      role: 'assistant' as const,
      content: ''
    };
    setMessages(prev => [...prev, assistantMsg]);

    // Stream response character by character
    const response = await fetchLLMResponse(userMsg.content);
    for (let i = 0; i < response.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20));
      setMessages(prev => prev.map(msg =>
        msg.id === assistantMsg.id
          ? { ...msg, content: response.slice(0, i + 1) }
          : msg
      ));
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}
          >
            <div className={\`max-w-[80%] p-4 rounded-lg \${
              msg.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'
            }\`}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            disabled={isLoading}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}`,
    },

    llmsPrompt: `You are implementing a Chatbot conversational interface. Follow these guidelines:

CORE FEATURES:
- Implement streaming text output for real-time response display (20-50ms per character)
- Support Markdown rendering with syntax highlighting for code blocks
- Maintain conversation history with proper message sequencing
- Auto-scroll to the latest message when new content arrives
- Show loading states with typing indicators

MESSAGE STRUCTURE:
- Each message should have: id, role (user/assistant), content, timestamp
- User messages: right-aligned, distinct background color
- Assistant messages: left-aligned, different styling
- System messages (optional): centered, muted styling

INTERACTION PATTERNS:
- Enter key sends message (Shift+Enter for new line)
- Disable input during message processing
- Clear input field after sending
- Provide visual feedback for message delivery status

STREAMING IMPLEMENTATION:
- Use async generators or SSE for real-time streaming
- Update message content incrementally as tokens arrive
- Handle stream interruption and errors gracefully
- Maintain smooth scrolling during streaming

ERROR HANDLING:
- Network errors: Show retry button
- API errors: Display user-friendly error messages
- Rate limits: Show appropriate wait time
- Timeout: Allow cancellation and retry

ACCESSIBILITY:
- Proper ARIA labels for screen readers
- Keyboard navigation support
- Focus management between input and messages
- Announce new messages to screen readers

UI BEST PRACTICES:
- Maximum message width for readability (60-80 characters)
- Clear visual distinction between message roles
- Responsive design for mobile devices
- Smooth animations for message appearance
- Loading spinner or typing indicator

OPTIONAL ENHANCEMENTS:
- Message timestamps (show on hover)
- Export conversation as text/JSON
- Clear conversation button with confirmation
- Message editing and regeneration
- Reaction buttons or feedback mechanism
- Code block copy buttons
- Image and file upload support`,
  },
  {
    id: 'inline-completion',
    name: 'Inline Completion',
    description: 'Real-time text completion as you type',
    category: 'completion',
    complexity: 'medium',
    status: 'available',
    tags: ['completion', 'autocomplete', 'inline'],
    demoPath: '/demo/inline-completion',
    demoType: 'both',
    externalDemoUrl: 'https://ai.studio/apps/drive/1VPVa647b7MuWm3jan7UID-IpOKzTmU-M?fullscreenApplet=true',
    externalDemoNote: '👆 This is a Mock version. For an API-powered live demo, click the button above to open in a new tab.',

    overview: {
      useCases: [
        'Code editors and IDEs (like GitHub Copilot)',
        'Email composition tools',
        'Document writing applications',
        'Search bars with smart suggestions',
      ],
      keyFeatures: [
        'Real-time completion suggestions as you type',
        'Ghost text preview of suggestions',
        'Tab key to accept suggestions',
        'Debounced API calls to reduce latency',
        'Context-aware completions',
      ],
      pros: [
        'Non-intrusive and seamless user experience',
        'Increases typing speed and efficiency',
        'Reduces cognitive load during writing',
      ],
      cons: [
        'Requires fast API response times (<300ms)',
        'May interrupt flow if suggestions are poor',
        'Complex to implement with proper debouncing',
      ],
    },
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
    demoType: 'external',
    externalDemoUrl: 'https://claude.ai',
    externalDemoNote: 'Claude.ai may block iframe embedding. Visit the site to see Artifacts in action.',

    overview: {
      useCases: [
        'Code generation and prototyping',
        'Data visualization and charts',
        'Interactive UI component creation',
        'Document and report generation',
      ],
      keyFeatures: [
        'Split-screen: chat on left, artifact preview on right',
        'Real-time preview of generated content',
        'Support for multiple content types (code, charts, SVG, React)',
        'Editable artifacts with iteration support',
      ],
      pros: [
        'What-you-see-is-what-you-get experience',
        'Great for creative and iterative workflows',
        'Supports complex content types',
      ],
      cons: [
        'Complex to implement securely (requires sandboxing)',
        'Higher performance overhead',
        'Challenging error handling for generated code',
      ],
    },
  },
  {
    id: 'infinite-canvas',
    name: 'Infinite Canvas',
    description: 'Spatial conversation on an infinite canvas',
    category: 'canvas',
    complexity: 'complex',
    status: 'available',
    tags: ['canvas', 'spatial', 'nodes', 'branching'],
    demoPath: '/demo/canvas',
    demoType: 'both',
    externalDemoUrl: 'https://ai.studio/apps/drive/1mQziiCTSNO9sNcPen3vIW3K-FpEEYFWg?fullscreenApplet=true',
    externalDemoNote: '👆 Mocked locally with ReactFlow. Open the API-powered version in a new tab to compare behaviors.',

    overview: {
      useCases: [
        'Exploratory brainstorming with branching ideas and hypotheses',
        'Spatial knowledge mapping for research sprints and technical discovery',
        'Product/architecture reviews that need visual decision trees',
        'Workshop facilitation where participants branch and regroup concepts',
      ],
      keyFeatures: [
        'ReactFlow-based infinite canvas with pan/zoom and smooth controls',
        'Branch from any node with Enter shortcut and Input modal',
        'Auto layout (Shift + L) powered by dagre for tidy trees',
        'Streaming assistant replies with mock fallback and Gemini hook',
        'Role-aware nodes with glowing gradients and hover actions',
      ],
      pros: [
        'Makes divergent thinking tangible with spatial structure',
        'Keyboard shortcuts keep the flow fast (Enter, Shift+L)',
        'Mock mode works without API keys; can swap to Gemini easily',
        'Visual hierarchy clarifies conversation context at a glance',
      ],
      cons: [
        'Large graphs can grow dense—needs layout refresh periodically',
        'Mobile interactions are less precise for drag/zoom',
        'Real API streaming requires a valid `VITE_GOOGLE_API_KEY`',
        'No persistence layer in the mock—state resets on refresh',
      ],
      bestPractices: [
        'Debounce layout operations when many nodes update at once',
        'Keep node copy concise for readable cards (~45 chars/line)',
        'Use color channels to separate user vs assistant branches',
        'Offer a clear mock/API mode indicator near the toolbar',
      ],
    },

    codeExample: {
      language: 'typescript',
      description: 'Minimal Infinite Canvas with branching, layout, and streaming fallback',
      code: `import { useState, useCallback, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Background, Connection } from 'reactflow';
import dagre from 'dagre';
import { mockGenerateContentStream } from './services/mockService';
import { CustomNode } from './components/CustomNode';

const nodeTypes = { custom: CustomNode };

export function InfiniteCanvasLite() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [activeParent, setActiveParent] = useState<string | null>(null);

  useEffect(() => {
    setNodes([{
      id: 'root',
      type: 'custom',
      position: { x: 0, y: 0 },
      data: { label: 'Start exploring', role: 'assistant', timestamp: Date.now() }
    }]);
  }, [setNodes]);

  const layout = useCallback(() => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: 'TB', ranksep: 140, nodesep: 90 });
    nodes.forEach(n => dagreGraph.setNode(n.id, { width: 420, height: 160 }));
    edges.forEach(e => dagreGraph.setEdge(e.source, e.target));
    dagre.layout(dagreGraph);
    setNodes(nds => nds.map(n => {
      const pos = dagreGraph.node(n.id);
      return { ...n, position: { x: pos.x - 200, y: pos.y - 80 } };
    }));
  }, [nodes, edges, setNodes]);

  const onConnect = useCallback((c: Connection) => {
    setEdges(eds => addEdge({ ...c, animated: true }, eds));
  }, [setEdges]);

  const handleBranch = async (parentId: string, text: string) => {
    const parent = nodes.find(n => n.id === parentId);
    if (!parent) return;
    const userId = \`user-\${Date.now()}\`;
    const botId = \`bot-\${Date.now() + 1}\`;
    setNodes(nds => [...nds,
      { id: userId, type: 'custom', position: parent.position, data: { label: text, role: 'user', timestamp: Date.now() } },
      { id: botId, type: 'custom', position: { ...parent.position, y: parent.position.y + 200 }, data: { label: '', role: 'assistant', isStreaming: true, timestamp: Date.now() } }
    ]);
    setEdges(eds => [...eds, { id: \`e-\${parentId}-\${userId}\`, source: parentId, target: userId }, { id: \`e-\${userId}-\${botId}\`, source: userId, target: botId }]);

    let full = '';
    for await (const chunk of mockGenerateContentStream(text)) {
      full += chunk;
      setNodes(nds => nds.map(n => n.id === botId ? { ...n, data: { ...n.data, label: full } } : n));
    }
    setNodes(nds => nds.map(n => n.id === botId ? { ...n, data: { ...n.data, isStreaming: false } } : n));
    layout();
  };

  return (
    <div className="h-[700px] rounded-2xl border border-white/10 bg-black/30">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      {/* Attach your input modal and call handleBranch */}
    </div>
  );
}`,
    },

    llmsPrompt: `# Infinite Canvas Implementation Guide

CORE FEATURES:
- Infinite pan/zoom canvas with ReactFlow and custom nodes
- Branching from any node via click or Enter shortcut
- Auto layout toggle (Shift + L) using dagre to untangle trees
- Streaming assistant responses; fall back to mock generator when no API key
- Visual distinction for roles (user vs assistant) with glow + gradient bars

DATA MODEL:
- CanvasNode = { id, type, position {x,y}, data: { label, role, timestamp, isStreaming, onBranch } }
- CanvasEdge = { id, source, target, animated, style }
- ChatMessage (for API): { role: 'user' | 'assistant', parts: [{ text }] }

INTERACTION:
- Enter: branch from selected node and open input modal
- Shift + L: recompute dagre layout, then fit view with padding
- Click node: highlight, show "Branch" action, keep handles visible

STREAMING IMPLEMENTATION:
- If VITE_GOOGLE_API_KEY exists: call Gemini sendMessageStream(prompt) and append text chunks
- Else: yield from mockGenerateContentStream(prompt) with 50ms cadence
- Mark node.data.isStreaming=true during stream; hide typing bar when finished

UI & ACCESSIBILITY:
- Maintain 45–60 char line width for readability in cards
- High-contrast gradients and blur shells to fit the Future Lab theme
- Keyboard focus should not trap in modals; Esc closes modal
- Announce new nodes to screen readers when feasible

ERROR HANDLING:
- On API failure, replace assistant node text with a friendly error and disable streaming state
- Keep a clear status pill (Mock vs Gemini) near the toolbar
- Avoid crashing when history is empty; seed with a system node

BEST PRACTICES:
- Debounce layout when adding multiple nodes in quick succession
- Cap zoom between 0.1 and 2.0 to prevent lost nodes
- Use memoized node renderers (React.memo) for large graphs
- Consider persistence layer if promoting to production`,
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
