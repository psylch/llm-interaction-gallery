import React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { DiffResult } from '../types';

interface DiffViewProps {
  originalText: string;
  diffResult: DiffResult;
  onAccept: () => void;
  onReject: () => void;
  selectionStart: number;
  selectionEnd: number;
}

export const DiffView: React.FC<DiffViewProps> = ({
  originalText,
  diffResult,
  onAccept,
  onReject,
  selectionStart,
  selectionEnd
}) => {
  const beforeSelection = originalText.substring(0, selectionStart);
  const selectedText = originalText.substring(selectionStart, selectionEnd);
  const afterSelection = originalText.substring(selectionEnd);

  return (
    <div className="relative w-full h-full min-h-[300px] bg-black/40 rounded-lg p-6 font-mono text-sm leading-relaxed overflow-y-auto border border-white/5 animate-fade-in">
      
      <div className="text-gray-500 mb-6 flex items-center justify-between">
         <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            Reviewing AI Suggestions
         </span>
         <span className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400 uppercase tracking-wider">
            {diffResult.diffType}
         </span>
      </div>

      <div className="whitespace-pre-wrap break-words">
        <span className="text-gray-400">{beforeSelection}</span>
        
        {/* Diff Block */}
        <span className="relative inline mx-1 group cursor-default">
            {/* Deleted Text */}
            <span className="line-through decoration-red-500/50 text-red-400/50 bg-red-900/10 px-1 rounded-sm transition-opacity duration-300">
                {selectedText}
            </span>
            
            <ArrowRight size={14} className="inline mx-2 text-gray-600" />
            
            {/* Added Text */}
            <span className="text-primary bg-primary/10 px-1 py-0.5 rounded border border-primary/20 shadow-[0_0_10px_rgba(0,255,204,0.1)]">
                {diffResult.modified}
            </span>
        </span>

        <span className="text-gray-400">{afterSelection}</span>
      </div>

      {/* Floating Action Bar for Diff */}
      <div className="absolute bottom-6 right-6 flex items-center gap-3">
        <button
          onClick={onReject}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-200"
        >
          <X size={16} />
          <span>Discard</span>
        </button>
        <button
          onClick={onAccept}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-black font-semibold hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(0,255,204,0.4)] transition-all duration-200"
        >
          <Check size={16} />
          <span>Accept Changes</span>
        </button>
      </div>
    </div>
  );
};
