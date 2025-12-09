import React from 'react';
import App from './App';

/**
 * Command Palette Demo Component
 * Thin wrapper to embed the palette experience inside the detail page.
 */
export const CommandPaletteDemo: React.FC = () => {
  return (
    <div className="relative w-full min-h-[720px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-64 w-64 bg-primary/15 blur-[120px]" />
        <div className="absolute right-6 bottom-0 h-72 w-72 bg-secondary/20 blur-[160px]" />
      </div>
      <div className="relative z-10">
        <App />
      </div>
    </div>
  );
};
