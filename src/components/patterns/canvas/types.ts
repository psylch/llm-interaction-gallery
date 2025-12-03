import { Node, Edge } from 'reactflow';

export enum Role {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system'
}

export interface NodeData {
  label: string; // The text content
  role: Role;
  isStreaming?: boolean;
  timestamp: number;
  onBranch?: (nodeId: string) => void; // Callback to create a new branch
}

export type CanvasNode = Node<NodeData>;
export type CanvasEdge = Edge;

export interface ChatMessage {
  role: string;
  parts: { text: string }[];
}
