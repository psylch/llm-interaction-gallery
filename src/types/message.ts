export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  metadata?: {
    tokens?: number;
    model?: string;
    [key: string]: any;
  };
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
}
