export type ActionType = 'improve' | 'shorten' | 'expand' | 'fix' | 'tone';

export interface SelectionState {
  text: string;
  start: number;
  end: number;
  coords: { 
    x: number; 
    y: number;
    placement: 'top' | 'bottom';
  } | null;
}

export interface DiffResult {
  original: string;
  modified: string;
  diffType: ActionType;
}