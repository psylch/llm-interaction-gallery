export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  hasArtifact?: boolean;
}

export interface Artifact {
  id: string;
  messageId: string;
  title: string;
  type: 'html' | 'svg' | 'react';
  content: string;
  status: 'streaming' | 'complete';
}

export type ArtifactMode = 'mock' | 'gemini';