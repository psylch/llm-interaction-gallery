import React from 'react';
import ArtifactsApp from './App';

/**
 * Artifacts Demo Component
 * Wrapper for embedding in the pattern detail page.
 */
export const ArtifactsDemo: React.FC = () => {
  return (
    <div className="relative w-full min-h-[820px] overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-4">
      {/* Ambient gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 -left-24 h-72 w-72 bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 bg-secondary/15 blur-[180px]" />
      </div>

      <div className="relative z-10">
        <ArtifactsApp />
      </div>
    </div>
  );
};
