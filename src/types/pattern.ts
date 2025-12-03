export type PatternCategory = 'chat' | 'completion' | 'generation' | 'canvas' | 'command' | 'editing';

export type PatternComplexity = 'simple' | 'medium' | 'complex';

export type PatternStatus = 'available' | 'wip' | 'coming-soon';

export type DemoType = 'internal' | 'external' | 'both';

export interface PatternConfig {
  id: string;
  name: string;
  description: string;
  category: PatternCategory;
  complexity: PatternComplexity;
  status: PatternStatus;
  tags: string[];
  icon?: string;
  demoPath?: string;

  // Demo configuration
  demoType?: DemoType;
  externalDemoUrl?: string;
  externalDemoNote?: string; // Note if external site blocks iframe

  // Detailed information
  overview?: PatternOverview;
  codeExample?: PatternCode;
  llmsPrompt?: string; // Prompt text for LLMs
}

export interface PatternOverview {
  useCases: string[];
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  bestPractices?: string[];
}

export interface PatternCode {
  language: string;
  code: string;
  description?: string;
}

export interface PatternMetadata {
  useCases: string[];
  pros: string[];
  cons: string[];
  implementationNotes?: string[];
}
