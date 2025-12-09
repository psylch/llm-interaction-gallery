import { ReactNode } from 'react';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  shortcut?: string[]; // e.g., ["Cmd", "P"]
  icon: ReactNode;
  keywords: string[]; // For fuzzy search
  action: () => void;
}

export interface CommandGroup {
  id: string;
  heading: string;
  items: CommandItem[];
}

export interface PaletteTheme {
  primary: string;
  background: string;
}

export interface AIService {
  streamResponse(
    prompt: string, 
    onChunk: (text: string) => void, 
    onComplete: () => void,
    onError: (error: Error) => void
  ): () => void; // Returns cancel function
}