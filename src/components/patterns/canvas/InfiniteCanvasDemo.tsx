import React from 'react';
import App from './App';

/**
 * Infinite Canvas Demo Component
 * Wrapper for embedding inside the pattern detail page
 */
export const InfiniteCanvasDemo: React.FC = () => {
  return (
    <div className="relative w-full min-h-[760px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-64 w-64 bg-primary/15 blur-[120px]" />
        <div className="absolute right-10 bottom-0 h-80 w-80 bg-secondary/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,204,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(185,54,238,0.08),transparent_30%)]" />
      </div>

      <div className="relative z-10 h-full">
        <App />
      </div>
    </div>
  );
};

