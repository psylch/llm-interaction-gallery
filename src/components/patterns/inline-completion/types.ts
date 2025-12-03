export interface CompletionRequest {
  text: string;
  cursorPosition: number;
}

export interface CompletionResponse {
  suggestion: string;
}

export type TabType = 'demo' | 'overview' | 'implementation';

export interface CodeSnippet {
  language: string;
  code: string;
  filename?: string;
}
