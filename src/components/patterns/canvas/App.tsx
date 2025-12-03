import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
  BackgroundVariant,
  ReactFlowProvider,
  Node,
  useReactFlow,
} from 'reactflow';
import type { GenerateContentResponse } from '@google/generative-ai';
import { GitBranch, Network, LayoutGrid, Command, MousePointerClick } from 'lucide-react';
import dagre from 'dagre';
import CustomNode from './components/CustomNode';
import InputModal from './components/InputModal';
import { generateContentStream } from './services/geminiService';
import { mockGenerateContentStream } from './services/mockService';
import { Role, CanvasNode } from './types';
import 'reactflow/dist/style.css';

// Register custom node types
const nodeTypes = {
  custom: CustomNode,
};

const SYSTEM_INSTRUCTION = `You are an intelligent assistant in a "Future Lab" infinite canvas interface. 
Your goal is to help users explore ideas, brainstorm, and visualize knowledge in a branching format.
Keep responses concise, insightful, and structured. Use formatting like bullet points where appropriate.`;

const INITIAL_NODE_ID = 'root';

const initialNodes: CanvasNode[] = [
  {
    id: INITIAL_NODE_ID,
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      label: "Welcome to the Infinite Canvas. \n\nI am your AI assistant. Create a new branch to start exploring ideas together.",
      role: Role.ASSISTANT,
      timestamp: Date.now(),
      onBranch: () => {}, // placeholder
    },
  },
];

// Heuristic to estimate node height based on character count
// Assumes ~40 chars per line in a 400px wide container + padding
const estimateNodeHeight = (text: string) => {
  const baseHeight = 140; // Header + Padding + Footer
  const charsPerLine = 45;
  const lineHeight = 20;
  const lines = Math.ceil(text.length / charsPerLine) + (text.split('\n').length - 1);
  return baseHeight + (lines * lineHeight);
};

// Layout helper function
const getLayoutedElements = (nodes: any[], edges: any[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Increase separation for better visibility
  dagreGraph.setGraph({ 
    rankdir: 'TB', 
    ranksep: 150, // Increased vertical gap
    nodesep: 100   // Increased horizontal gap
  });

  nodes.forEach((node) => {
    // Dynamic height calculation
    const height = estimateNodeHeight(node.data.label || '');
    const width = 420; // Fixed width + slight margin

    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: 'top',
      sourcePosition: 'bottom',
      position: {
        x: nodeWithPosition.x - 200, // Center offset (width/2)
        y: nodeWithPosition.y - (estimateNodeHeight(node.data.label || '') / 2),
      },
    };
  });

  return { nodes: newNodes, edges };
};

const HelpPanel = () => (
  <div className="absolute bottom-6 right-6 hidden md:block">
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl w-64">
      <h3 className="text-gray-200 font-display font-medium mb-3 flex items-center gap-2">
        <Command size={16} className="text-primary" />
        Controls
      </h3>
      <div className="space-y-2 text-xs text-gray-400">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5"><MousePointerClick size={12}/> Select Node</span>
          <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded">Click</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5"><GitBranch size={12}/> Branch</span>
          <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded">Enter</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5"><LayoutGrid size={12}/> Auto Layout</span>
          <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded">Shift + L</span>
        </div>
      </div>
    </div>
  </div>
);

const AppContent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeParentId, setActiveParentId] = useState<string | null>(null);
  const [apiKeyExists] = useState(Boolean(import.meta.env.VITE_GOOGLE_API_KEY));
  const { fitView, getNodes, getEdges } = useReactFlow();

  // Update onBranch callback
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onBranch: handleBranchRequest,
        },
      }))
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBranchRequest = useCallback((nodeId: string) => {
    setActiveParentId(nodeId);
    setIsModalOpen(true);
  }, []);

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      getNodes(),
      getEdges()
    );
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    setTimeout(() => {
      fitView({ duration: 800, padding: 0.2 });
    }, 10);
  }, [getNodes, getEdges, setNodes, setEdges, fitView]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;

      // Shift + L: Auto Layout
      if (e.key === 'L' && e.shiftKey) {
        e.preventDefault();
        onLayout();
      }

      // Enter: Branch from selected node
      if (e.key === 'Enter') {
        const selectedNodes = getNodes().filter(n => n.selected);
        if (selectedNodes.length === 1) {
          e.preventDefault();
          handleBranchRequest(selectedNodes[0].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [getNodes, onLayout, handleBranchRequest]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({
      ...params,
      animated: true,
      style: { stroke: '#ffffff30', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#ffffff30' },
    }, eds)),
    [setEdges]
  );

  const createNode = (
    text: string, 
    role: Role, 
    parentId: string | null, 
    sourcePosition: { x: number, y: number }
  ): Node => {
    const id = `${role}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Default placement: offset slightly right and down to prevent immediate overlap before layout
    const offsetX = (Math.random() - 0.5) * 100; 
    const offsetY = 200; 
    
    const position = parentId 
      ? { x: sourcePosition.x + offsetX, y: sourcePosition.y + offsetY }
      : { x: 0, y: 0 };

    return {
      id,
      type: 'custom',
      position,
      data: {
        label: text,
        role,
        timestamp: Date.now(),
        onBranch: handleBranchRequest,
        isStreaming: role === Role.ASSISTANT,
      },
    };
  };

  const handleInputSubmit = async (inputText: string) => {
    if (!activeParentId) return;

    const parentNode = nodes.find((n) => n.id === activeParentId);
    if (!parentNode) return;

    // 1. Create User Node
    const userNode = createNode(inputText, Role.USER, activeParentId, parentNode.position);
    
    // 2. Create Placeholder Assistant Node (Positioned below user node)
    const assistantNode = createNode("", Role.ASSISTANT, userNode.id, {
        x: userNode.position.x,
        y: userNode.position.y + 200
    });

    // 3. Update State
    setNodes((nds) => [...nds, userNode, assistantNode]);
    setEdges((eds) => [
      ...eds,
      {
        id: `e-${activeParentId}-${userNode.id}`,
        source: activeParentId,
        target: userNode.id,
        animated: true,
        style: { stroke: '#b936ee', strokeWidth: 2 },
      },
      {
        id: `e-${userNode.id}-${assistantNode.id}`,
        source: userNode.id,
        target: assistantNode.id,
        animated: true,
        style: { stroke: '#00ffcc', strokeWidth: 2 },
      },
    ]);

    // 4. Trigger AI Stream
    try {
      let stream;
      if (apiKeyExists) {
        // Build context from history if needed, for now just previous node + current prompt
        const context = [
            { role: parentNode.data.role, parts: [{ text: parentNode.data.label }] }
        ];
        stream = await generateContentStream(context, inputText, SYSTEM_INSTRUCTION);
      } else {
        stream = mockGenerateContentStream(inputText);
      }

      let fullText = "";

      if (apiKeyExists) {
         for await (const chunk of (stream as any)) {
            const c = chunk as GenerateContentResponse;
            const text = (c as any)?.text?.() ?? (c as any)?.text ?? '';
            fullText += text;
            
            setNodes((nds) => 
              nds.map((node) => 
                node.id === assistantNode.id 
                  ? { ...node, data: { ...node.data, label: fullText } }
                  : node
              )
            );
         }
      } else {
        for await (const chunk of (stream as AsyncGenerator<string>)) {
          fullText += chunk;
          setNodes((nds) => 
            nds.map((node) => 
              node.id === assistantNode.id 
                ? { ...node, data: { ...node.data, label: fullText } }
                : node
            )
          );
        }
      }

      setNodes((nds) => 
        nds.map((node) => 
          node.id === assistantNode.id 
            ? { ...node, data: { ...node.data, isStreaming: false } }
            : node
        )
      );

    } catch (error) {
      console.error("Generation failed", error);
      setNodes((nds) => 
        nds.map((node) => 
          node.id === assistantNode.id 
            ? { 
                ...node, 
                data: { 
                  ...node.data, 
                  label: "Error generating response. Please check API key configuration.", 
                  isStreaming: false 
                } 
              }
            : node
        )
      );
    }
  };

  return (
    <div className="relative w-full min-h-[720px] h-[720px] bg-background/90 font-sans overflow-hidden rounded-2xl border border-white/10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 bg-primary/10 blur-[120px]" />
        <div className="absolute right-0 bottom-10 h-80 w-80 bg-secondary/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,204,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(185,54,238,0.08),transparent_30%)]" />
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          color="#333" 
          gap={24} 
          size={1} 
          variant={BackgroundVariant.Dots} 
          className="opacity-50"
        />
        <Controls 
          position="bottom-left"
          className="!m-4 !bg-white/5 !border !border-white/10 !rounded-lg !overflow-hidden !shadow-xl backdrop-blur-md [&>button]:!border-b-white/10 [&>button]:!bg-transparent hover:[&>button]:!bg-white/10 [&>button]:!transition-colors" 
        />
      </ReactFlow>

      {/* Top Toolbar: Actions */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <button
          onClick={onLayout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-gray-200 transition-all backdrop-blur-md"
          title="Auto Layout (Shift+L)"
        >
          <LayoutGrid size={16} className="text-primary" />
          <span className="text-sm font-medium">Auto Layout</span>
        </button>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10 pointer-events-none">
        <div className="pointer-events-auto px-6 py-3 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 flex items-center gap-3 shadow-2xl">
          <div className={`w-2 h-2 rounded-full ${apiKeyExists ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-yellow-500'}`} />
          <span className="text-sm font-medium text-gray-300">
            {apiKeyExists ? 'Gemini 2.5 Active' : 'Mock Mode'}
          </span>
          <div className="h-4 w-[1px] bg-white/10 mx-1" />
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Network size={12} />
            <span>{nodes.length} Nodes</span>
          </div>
        </div>
      </div>

      <HelpPanel />

      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleInputSubmit}
        parentNodeId={activeParentId}
      />
    </div>
  );
};

// Wrap in Provider
const App = () => (
  <ReactFlowProvider>
    <AppContent />
  </ReactFlowProvider>
);

export default App;
