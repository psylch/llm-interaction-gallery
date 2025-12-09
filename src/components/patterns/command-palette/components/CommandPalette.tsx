import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Sparkles, Bot, Loader2 } from 'lucide-react';
import { CommandGroup, AIService } from '../types';
import { cn } from '../utils';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  groups: CommandGroup[];
  aiService: AIService;
}

type Mode = 'COMMAND' | 'AI_CHAT';

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, groups, aiService }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('COMMAND');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cancelAiRef = useRef<(() => void) | null>(null);

  // Filter items based on query
  const filteredGroups = useMemo(() => {
    if (!query) return groups;
    const lowerQuery = query.toLowerCase();
    return groups.map(group => ({
      ...group,
      items: group.items.filter(item => 
        item.label.toLowerCase().includes(lowerQuery) ||
        item.keywords.some(k => k.toLowerCase().includes(lowerQuery)) ||
        (item.description && item.description.toLowerCase().includes(lowerQuery))
      )
    })).filter(group => group.items.length > 0);
  }, [query, groups]);

  const flatItems = useMemo(() => filteredGroups.flatMap(group => group.items), [filteredGroups]);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setMode('COMMAND');
      setAiResponse('');
      setIsAiLoading(false);
      if (cancelAiRef.current) cancelAiRef.current();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, mode]);

  // Scroll logic
  useEffect(() => {
    if (mode === 'COMMAND') {
      const activeElement = document.getElementById(`command-item-${selectedIndex}`);
      if (activeElement && listRef.current) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, mode]);

  const startAiSearch = () => {
    if (!query.trim()) return;
    
    setMode('AI_CHAT');
    setIsAiLoading(true);
    setAiResponse('');
    
    cancelAiRef.current = aiService.streamResponse(
      query,
      (text) => {
        setAiResponse(text);
        // Auto scroll to bottom of AI response
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current.scrollHeight;
        }
      },
      () => setIsAiLoading(false),
      (err) => {
        setAiResponse(`Error: ${err.message}`);
        setIsAiLoading(false);
      }
    );
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // AI Mode Navigation
      if (mode === 'AI_CHAT') {
         if (e.key === 'Escape') {
           e.preventDefault();
           if (cancelAiRef.current) cancelAiRef.current();
           setMode('COMMAND');
           setIsAiLoading(false);
           inputRef.current?.focus();
         }
         return;
      }

      // Command Mode Navigation
      if (e.key === 'Tab') {
        e.preventDefault();
        if (query.trim().length > 0) {
          startAiSearch();
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % flatItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + flatItems.length) % flatItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (flatItems[selectedIndex]) {
          flatItems[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, flatItems, selectedIndex, onClose, mode, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl shadow-2xl animate-fade-in ring-1 ring-white/5 flex flex-col max-h-[60vh] transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center border-b border-white/10 px-4 py-4 shrink-0">
          {mode === 'AI_CHAT' ? (
            <Sparkles className="h-5 w-5 text-primary animate-pulse mr-3" />
          ) : (
            <Search className="h-5 w-5 text-gray-500 mr-3" />
          )}
          
          <input
            ref={inputRef}
            type="text"
            className={cn(
              "flex-1 bg-transparent text-lg font-medium placeholder-gray-500 focus:outline-none font-sans transition-colors",
              mode === 'AI_CHAT' ? "text-primary/80" : "text-gray-100"
            )}
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={mode === 'AI_CHAT'}
          />
          
          <div className="hidden sm:flex items-center gap-2">
            {mode === 'AI_CHAT' && isAiLoading && (
               <Loader2 className="w-4 h-4 text-primary animate-spin" />
            )}
            <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">ESC</span>
          </div>
        </div>

        {/* Content Area */}
        <div 
          ref={listRef}
          className="flex-1 overflow-y-auto custom-scrollbar p-2 scroll-smooth min-h-[300px]"
        >
          {mode === 'AI_CHAT' ? (
            <div className="p-4 space-y-4 animate-fade-in">
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Bot className="w-4 h-4 text-primary" />
                 </div>
                 <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-primary font-display">AI Assistant</span>
                      {isAiLoading && <span className="text-xs text-gray-500 animate-pulse">Thinking...</span>}
                    </div>
                    
                    <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-mono">
                      {aiResponse || <span className="text-gray-600 italic">Processing request...</span>}
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            <>
              {flatItems.length === 0 && query ? (
                 <div className="py-12 flex flex-col items-center justify-center text-gray-500 gap-3">
                    <p className="text-sm">No commands found.</p>
                    <button 
                      onClick={startAiSearch}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-mono hover:bg-primary/20 transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Ask AI about "{query}"</span>
                    </button>
                 </div>
              ) : (
                filteredGroups.map((group) => (
                  <div key={group.id} className="mb-2">
                    <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider font-display">
                      {group.heading}
                    </h3>
                    <div className="space-y-0.5">
                      {group.items.map((item) => {
                        const itemGlobalIndex = flatItems.indexOf(item);
                        const isSelected = itemGlobalIndex === selectedIndex;
                        return (
                          <button
                            key={item.id}
                            id={`command-item-${itemGlobalIndex}`}
                            onClick={() => { item.action(); onClose(); }}
                            className={cn(
                              "w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 group text-left",
                              isSelected 
                                ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,255,204,0.1)]" 
                                : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent"
                            )}
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className={cn(
                                "p-1.5 rounded-md transition-colors",
                                isSelected ? "bg-primary/20 text-primary" : "bg-white/5 text-gray-400"
                              )}>
                                {item.icon}
                              </div>
                              <div className="flex flex-col truncate">
                                <span className={cn("text-sm font-medium truncate font-sans", isSelected ? "text-primary" : "text-gray-200")}>
                                  {item.label}
                                </span>
                                {item.description && (
                                  <span className={cn("text-xs truncate transition-colors", isSelected ? "text-primary/70" : "text-gray-500")}>
                                    {item.description}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-3 pl-3">
                              {item.shortcut && (
                                <div className="hidden sm:flex items-center gap-1">
                                  {item.shortcut.map((key, i) => (
                                    <kbd key={i} className={cn(
                                      "text-[10px] font-mono px-1.5 py-0.5 rounded min-w-[20px] text-center border",
                                      isSelected ? "bg-primary/20 border-primary/30 text-primary" : "bg-white/5 border-white/10 text-gray-500"
                                    )}>{key}</kbd>
                                  ))}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-4 py-2 bg-black/20 text-[10px] text-gray-500 flex justify-between items-center font-mono">
          <div className="flex gap-4">
            {mode === 'COMMAND' ? (
              <>
                <span><strong className="text-gray-400">↑↓</strong> nav</span>
                <span><strong className="text-gray-400">↵</strong> select</span>
                {query.length > 0 && (
                   <span className="animate-pulse text-primary"><strong className="text-primary">Tab</strong> ask AI</span>
                )}
              </>
            ) : (
               <span><strong className="text-gray-400">Esc</strong> back to search</span>
            )}
          </div>
          <div className="flex items-center gap-2">
             <div className={cn("w-1.5 h-1.5 rounded-full", mode === 'AI_CHAT' ? "bg-primary animate-pulse" : "bg-gray-700")} />
             <span>{mode === 'AI_CHAT' ? 'Future Intelligence' : 'Ready'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
