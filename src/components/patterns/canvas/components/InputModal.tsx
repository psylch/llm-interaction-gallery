import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Sparkles } from 'lucide-react';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
  parentNodeId: string | null;
}

const InputModal: React.FC<InputModalProps> = ({ isOpen, onClose, onSubmit, parentNodeId }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setInput('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    onSubmit(input);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl mx-4 relative transform transition-all scale-100 animate-in zoom-in-95 duration-200">
        
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-lg opacity-50" />
        
        <div className="relative bg-[#0a0a0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-2 text-gray-200">
              <Sparkles size={18} className="text-primary" />
              <span className="font-display font-medium">
                {parentNodeId ? 'Branching Thought' : 'Start New Topic'}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What's on your mind? Ask a question or explore an idea..."
              className="w-full h-32 bg-transparent text-lg text-gray-200 placeholder-gray-600 border-none focus:ring-0 resize-none font-sans"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-t border-white/5">
            <span className="text-xs text-gray-500 font-mono">
              Press Enter to send, Shift+Enter for new line
            </span>
            <button
              onClick={() => handleSubmit()}
              disabled={!input.trim()}
              className={`
                flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-300
                ${input.trim() 
                  ? 'bg-primary text-black hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(0,255,204,0.4)]' 
                  : 'bg-white/10 text-gray-500 cursor-not-allowed'}
              `}
            >
              <span>Generate</span>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
