export type PatternCategory = 'chat' | 'completion' | 'generation' | 'canvas' | 'command' | 'editing';

export type PatternComplexity = 'simple' | 'medium' | 'complex';

export type PatternStatus = 'available' | 'wip' | 'coming-soon';

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
}

export interface PatternMetadata {
  useCases: string[];
  pros: string[];
  cons: string[];
  implementationNotes?: string[];
}
