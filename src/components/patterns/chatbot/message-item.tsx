import { MessageItemProps } from './types';
import { cn } from '@/lib/utils/cn';
import ReactMarkdown from 'react-markdown';

export function MessageItem({ message, className }: MessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-4 fade-in',
        isUser ? 'justify-end' : 'justify-start',
        className
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow">
          <span className="text-sm">🤖</span>
        </div>
      )}

      <div
        className={cn(
          'max-w-[80%] rounded-xl px-4 py-3',
          'transition-all duration-300',
          isUser
            ? 'bg-primary/10 border border-primary/30 text-foreground'
            : 'bg-muted/30 border border-border/50 text-foreground'
        )}
      >
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm prose-invert max-w-none">
            <ReactMarkdown
              components={{
                // Custom renderers for better styling
                code: ({ node, inline, className, children, ...props }: any) => {
                  if (inline) {
                    return (
                      <code
                        className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-xs"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code
                      className="block p-4 rounded-lg bg-muted/50 border border-border font-mono text-xs overflow-x-auto"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                p: ({ children }: any) => (
                  <p className="text-sm leading-relaxed mb-2 last:mb-0">
                    {children}
                  </p>
                ),
                ul: ({ children }: any) => (
                  <ul className="text-sm space-y-1 my-2">{children}</ul>
                ),
                ol: ({ children }: any) => (
                  <ol className="text-sm space-y-1 my-2">{children}</ol>
                ),
                li: ({ children }: any) => (
                  <li className="ml-4">{children}</li>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        {/* Timestamp (optional, can be toggled) */}
        {/* <div className="mt-2 text-xs text-muted-foreground">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div> */}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
          <span className="text-sm">👤</span>
        </div>
      )}
    </div>
  );
}
