import React from 'react';
import App from './App';

/**
 * Inline Editing Demo Component
 * Wrapper for embedding in the pattern detail page.
 */
export const InlineEditingDemo: React.FC = () => {
  return (
    <div className="relative w-full min-h-[720px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-0 h-60 w-60 bg-primary/12 blur-[120px]" />
        <div className="absolute right-6 bottom-0 h-72 w-72 bg-secondary/15 blur-[150px]" />
      </div>
      <div className="relative z-10">
        <App />
      </div>
    </div>
  );
};
