import { useEffect, useRef } from 'react';
import { MessageListProps } from './types';
import { MessageItem } from './message-item';
import { cn } from '@/lib/utils/cn';

export function MessageList({ messages, isLoading, className }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={cn('flex-1 overflow-y-auto space-y-4 p-6', className)}>
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center glow">
              <span className="text-3xl">💬</span>
            </div>
            <div>
              <h3 className="text-lg font-display font-bold mb-2">
                Start a Conversation
              </h3>
              <p className="text-sm text-muted-foreground">
                Type a message below to begin chatting with the AI assistant.
                Try asking about LLMs, code examples, or anything else!
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center pt-4">
              <button className="px-3 py-1.5 rounded-lg bg-muted/30 hover:bg-muted/50 text-xs transition-colors border border-border/50">
                What is an LLM?
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-muted/30 hover:bg-muted/50 text-xs transition-colors border border-border/50">
                Write hello world
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-muted/30 hover:bg-muted/50 text-xs transition-colors border border-border/50">
                How does this work?
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-4 fade-in">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow">
                <span className="text-sm">🤖</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/30 border border-border/50">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs text-muted-foreground">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}
