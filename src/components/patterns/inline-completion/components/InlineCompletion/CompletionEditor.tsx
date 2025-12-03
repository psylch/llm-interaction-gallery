import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getCompletion } from '../../services/completionService';
import { Loader2, Sparkles } from 'lucide-react';

export const CompletionEditor: React.FC = () => {
  const [text, setText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const fetchSuggestion = useCallback(async (currentText: string) => {
    if (!currentText.trim()) {
      setSuggestion('');
      return;
    }

    setIsLoading(true);
    try {
      const response = await getCompletion({
        text: currentText,
        cursorPosition: currentText.length
      });
      
      console.log('Gemini Suggestion:', JSON.stringify(response.suggestion));

      // Check if suggestion is valid and non-empty
      if (response.suggestion) {
        setSuggestion(response.suggestion);
      } else {
        setSuggestion('');
      }
    } catch (error) {
      console.error("Failed to fetch suggestion", error);
      setSuggestion('');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setSuggestion(''); // Clear suggestion immediately on type
    
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Use a slightly longer debounce for real API to save tokens/calls
    debounceTimer.current = setTimeout(() => {
      fetchSuggestion(newText);
    }, 600); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (suggestion) {
      if (e.key === 'Tab') {
        e.preventDefault();
        setText(prev => prev + suggestion);
        setSuggestion('');
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSuggestion('');
      } else if (e.key === 'ArrowRight') {
        // Only accept if cursor is at the end
        if (textareaRef.current && textareaRef.current.selectionStart === text.length) {
             e.preventDefault();
             setText(prev => prev + suggestion);
             setSuggestion('');
        }
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Editor Container */}
      <div className="relative group rounded-xl overflow-hidden glass-panel border border-white/10 focus-within:border-primary/50 transition-colors duration-300 min-h-[400px]">
        
        {/* Top Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 z-20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
             {isLoading ? (
               <span className="flex items-center gap-1.5 text-primary animate-pulse">
                 <Loader2 className="w-3 h-3 animate-spin" />
                 Gemini Thinking...
               </span>
             ) : suggestion ? (
                <span className="flex items-center gap-1.5 text-accent animate-in fade-in slide-in-from-left-2 duration-300">
                  <Sparkles className="w-3 h-3" />
                  Suggestion ready
                </span>
             ) : (
               <span>Ready</span>
             )}
          </div>
        </div>

        {/* Text Layer Container */}
        <div className="relative mt-10 p-6 font-mono text-base leading-relaxed h-[360px] overflow-hidden">
          
          {/* 1. Backdrop Layer (Suggestion) */}
          <div 
            aria-hidden="true"
            className="absolute inset-0 p-6 w-full h-full whitespace-pre-wrap break-words pointer-events-none select-none text-transparent"
          >
            {text}
            <span className="text-gray-500/60 inline-block opacity-75">{suggestion}</span>
          </div>

          {/* 2. Textarea Layer (User Input) */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            placeholder="Type in English. Pause to see AI completion..."
            className="
              absolute inset-0 w-full h-full p-6 
              bg-transparent text-gray-200 
              resize-none outline-none border-none
              whitespace-pre-wrap break-words
              selection-area
              z-10
            "
            style={{
                caretColor: '#00ffcc'
            }}
          />
        </div>
        
        {/* Bottom Helper */}
        <div className="absolute bottom-4 right-4 flex items-center gap-4 text-xs font-mono text-gray-500 pointer-events-none">
            <div className={`flex items-center gap-1 transition-opacity duration-300 ${suggestion ? 'opacity-100' : 'opacity-30'}`}>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-gray-300">Tab</kbd>
                <span>Accept</span>
            </div>
            <div className={`flex items-center gap-1 transition-opacity duration-300 ${suggestion ? 'opacity-100' : 'opacity-30'}`}>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-gray-300">Esc</kbd>
                <span>Reject</span>
            </div>
        </div>
      </div>
    </div>
  );
};
