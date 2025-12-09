import React, { useRef, useEffect } from 'react';
import { Message, Artifact } from '../types';
import { parseMessageContent } from '../utils/parser';
import ArtifactBlock from './ArtifactBlock';

interface ChatPanelProps {
  messages: Message[];
  artifacts: Record<string, Artifact>;
  isLoading: boolean;
  onSend: (text: string) => void;
  mode: 'mock' | 'gemini';
  setMode: (mode: 'mock' | 'gemini') => void;
  onArtifactSelect: (artifact: Artifact) => void;
  activeArtifactId: string | null;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ 
  messages, 
  artifacts, 
  isLoading, 
  onSend, 
  mode, 
  setMode,
  onArtifactSelect,
  activeArtifactId
}) => {
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll on new messages
  useEffect(() => {
    if (containerRef.current) {
        // Scroll container to bottom
        const scrollOptions: ScrollIntoViewOptions = { behavior: 'smooth', block: 'end' };
        messagesEndRef.current?.scrollIntoView(scrollOptions);
    }
  }, [messages.length, isLoading, activeArtifactId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden bg-[#0a0a0f]">
      
      {/* Header - Fixed Top, Opaque Background to prevent overlap */}
      <div className="h-14 px-4 border-b border-white/10 flex justify-between items-center bg-[#0a0a0f] z-50 flex-shrink-0 absolute top-0 left-0 right-0 shadow-lg shadow-black/20">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#00ffcc]" />
          <h2 className="font-display font-bold text-gray-200 tracking-wide text-sm">AI ASSISTANT</h2>
        </div>
        
        {/* Mode Toggle */}
        <div className="flex p-0.5 rounded-lg bg-black/40 border border-white/10">
          <button
            onClick={() => setMode('mock')}
            className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${mode === 'mock' ? 'bg-secondary text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
          >
            MOCK
          </button>
          <button
            onClick={() => setMode('gemini')}
            className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${mode === 'gemini' ? 'bg-primary text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
          >
            GEMINI
          </button>
        </div>
      </div>

      {/* Messages Area - Scrollable Container with padding for Header and Input */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto custom-scrollbar pt-16 pb-4 px-4 space-y-6 bg-transparent"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-6 opacity-60 min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="font-display font-bold text-gray-300 mb-1">Future Lab AI</h3>
              <p className="text-xs text-gray-500 font-mono">Ready to generate artifacts.</p>
            </div>
          </div>
        )}
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <span className="text-[10px] font-mono text-gray-500 mb-1 px-1 uppercase opacity-75">
              {msg.role === 'user' ? 'You' : 'Assistant'}
            </span>
            
            <div
              className={`max-w-[95%] md:max-w-[85%] rounded-2xl p-4 md:p-5 ${
                msg.role === 'user'
                  ? 'bg-primary/10 border border-primary/20 text-white rounded-tr-sm'
                  : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm shadow-xl'
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed text-sm">
                {msg.role === 'assistant' ? (
                  <>
                    {parseMessageContent(msg.content).map((part, idx) => {
                      if (part.type === 'text') {
                         return <span key={idx}>{part.content}</span>;
                      } else {
                        const artifactId = `${msg.id}-${part.artifactIdIndex}`;
                        const artifact = artifacts[artifactId];
                        if (!artifact) return null;
                        
                        return (
                          <ArtifactBlock
                            key={idx}
                            artifact={artifact}
                            onClick={() => onArtifactSelect(artifact)}
                            isSelected={activeArtifactId === artifactId}
                          />
                        );
                      }
                    })}
                  </>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
           <div className="flex justify-start">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-1.5 w-16 justify-center">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Input Area - Fixed Bottom */}
      <div className="p-4 bg-[#0a0a0f] border-t border-white/10 flex-shrink-0 z-50 relative pb-[env(safe-area-inset-bottom)]">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={mode === 'mock' ? "Click Send to trigger artifact..." : "Message Future Lab..."}
            className="relative w-full bg-black border border-white/10 rounded-xl py-3.5 pl-4 pr-12 
                       text-gray-200 placeholder-gray-600 focus:outline-none focus:border-white/20 
                       transition-all font-sans text-sm shadow-inner"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg 
                       text-primary hover:bg-primary/10 disabled:opacity-30 
                       disabled:hover:bg-transparent transition-all z-10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;