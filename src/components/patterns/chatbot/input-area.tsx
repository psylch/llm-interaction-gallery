import { useState, KeyboardEvent } from 'react';
import { InputAreaProps } from './types';
import { cn } from '@/lib/utils/cn';

export function InputArea({
  onSend,
  disabled = false,
  placeholder = 'Type your message...',
  className
}: InputAreaProps) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value);
      setValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn('border-t border-border/50 p-6 bg-background/50 backdrop-blur-sm', className)}>
      <div className="flex gap-3 items-end">
        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            rows={1}
            className={cn(
              'w-full px-4 py-3 rounded-xl',
              'bg-muted/30 border border-border/50',
              'text-sm text-foreground placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent',
              'resize-none',
              'transition-all duration-200',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            style={{
              minHeight: '48px',
              maxHeight: '200px',
            }}
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground font-mono">
            {value.length > 0 && `${value.length} chars`}
          </div>
        </div>

        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className={cn(
            'flex-shrink-0 w-12 h-12 rounded-xl',
            'bg-gradient-to-br from-primary to-accent',
            'flex items-center justify-center',
            'transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'hover:shadow-lg hover:shadow-primary/30',
            'active:scale-95',
            !disabled && value.trim() && 'glow'
          )}
        >
          <svg
            className="w-5 h-5 text-background"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>

      {/* Hint */}
      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-4">
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-mono">Enter</kbd> to send
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-mono">Shift+Enter</kbd> for new line
        </span>
      </div>
    </div>
  );
}
