import React from 'react';
import { CompletionEditor } from './components/InlineCompletion/CompletionEditor';

/**
 * Inline Completion Demo Component
 * Wrapper for embedding in the pattern detail page
 */
export const InlineCompletionDemo: React.FC = () => {
  return (
    <div className="w-full min-h-[600px] flex items-center justify-center p-6 relative">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      {/* Core Component */}
      <div className="w-full max-w-4xl relative z-10">
        <CompletionEditor />
      </div>
    </div>
  );
};
