import React, { useState, useRef } from 'react';
import { SelectionState, ActionType, DiffResult } from '../types';
import { mockProcessText } from '../utils/mockService';
import { Toolbar } from './Toolbar';
import { DiffView } from './DiffView';

const INITIAL_TEXT = `The system architecture leverages advanced quantum algorithms to optimize data throughput, ensuring minimal latency across distributed nodes. However, due to the asynchronous nature of the legacy subsystems, race conditions may occasionally occur during high-load intervals. We recommend refactoring the event bus to utilize a persistent message queue to mitigate these discrepancies.`;

export const InlineEditor: React.FC = () => {
  const [text, setText] = useState(INITIAL_TEXT);
  const [selection, setSelection] = useState<SelectionState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [diffResult, setDiffResult] = useState<DiffResult | null>(null);
  
  // Track the range that triggered the diff
  const [diffRange, setDiffRange] = useState<{start: number, end: number} | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!textareaRef.current || !containerRef.current) return;
    
    // Slight delay to ensure selection event fires first and settles
    setTimeout(() => {
        const start = textareaRef.current!.selectionStart;
        const end = textareaRef.current!.selectionEnd;
        const selectedText = text.substring(start, end);

        if (selectedText.trim().length === 0) {
            setSelection(null);
            return;
        }

        const containerRect = containerRef.current!.getBoundingClientRect();
        
        // --- Smart Positioning Logic ---
        const TOOLBAR_WIDTH = 350; // Estimated width of toolbar
        const TOOLBAR_HEIGHT = 60; // Estimated height of toolbar including arrow
        const EDGE_PADDING = 16;
        
        // Raw relative coords from mouse event
        let x = e.clientX - containerRect.left;
        let y = e.clientY - containerRect.top;

        // 1. Clamp X to ensure toolbar doesn't overflow left or right
        const minX = (TOOLBAR_WIDTH / 2) + EDGE_PADDING;
        const maxX = containerRect.width - (TOOLBAR_WIDTH / 2) - EDGE_PADDING;
        x = Math.max(minX, Math.min(x, maxX));

        // 2. Determine Vertical Placement (Flip if too close to top)
        let placement: 'top' | 'bottom' = 'top';
        
        // If the click is too close to the top, put the toolbar BELOW the cursor
        if (y < TOOLBAR_HEIGHT + EDGE_PADDING) {
            placement = 'bottom';
        }

        setSelection({
            text: selectedText,
            start,
            end,
            coords: { x, y, placement }
        });
    }, 10);
  };

  const handleAction = async (action: ActionType) => {
    if (!selection) return;
    
    setIsLoading(true);
    
    try {
      const modified = await mockProcessText(selection.text, action);
      
      setDiffResult({
        original: selection.text,
        modified: modified,
        diffType: action
      });
      // Clear selection to hide toolbar, now showing Diff View
      setSelection(null);
    } finally {
      setIsLoading(false);
    }
  };

  const onTriggerAction = (action: ActionType) => {
    if(selection) {
        setDiffRange({ start: selection.start, end: selection.end });
        handleAction(action);
    }
  };

  const finalizeAccept = () => {
    if (!diffResult || !diffRange) return;
    
    const before = text.substring(0, diffRange.start);
    const after = text.substring(diffRange.end);
    const newText = before + diffResult.modified + after;
    
    setText(newText);
    setDiffResult(null);
    setDiffRange(null);
  };

  const finalizeReject = () => {
    setDiffResult(null);
    setDiffRange(null);
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-[400px] bg-[#0a0a0f] rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden group">
      
      {/* Grid Pattern Inside */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Toolbar Layer */}
      {selection && !diffResult && selection.coords && (
        <Toolbar 
          position={selection.coords} 
          onAction={onTriggerAction} 
          isLoading={isLoading} 
        />
      )}

      {/* Content Layer */}
      {diffResult && diffRange ? (
        <DiffView 
          originalText={text}
          diffResult={diffResult}
          onAccept={finalizeAccept}
          onReject={finalizeReject}
          selectionStart={diffRange.start}
          selectionEnd={diffRange.end}
        />
      ) : (
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onMouseUp={handleMouseUp}
          className="
            relative z-10 w-full h-full min-h-[400px] bg-transparent 
            p-8 text-lg font-sans leading-relaxed text-gray-300 resize-none outline-none
            selection:bg-primary/20 selection:text-white
            placeholder:text-gray-600
          "
          spellCheck={false}
        />
      )}
      
      {/* Decorative Status Bar */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-black/40 border-t border-white/5 flex items-center justify-between px-4 text-[10px] text-gray-500 font-mono uppercase tracking-wider z-20 pointer-events-none">
        <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`}></div>
            <span>{isLoading ? 'AI Simulation Active' : 'System Ready'}</span>
        </div>
        <div>
            {text.length} chars
        </div>
      </div>
    </div>
  );
};