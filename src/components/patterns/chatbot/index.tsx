import { ChatBotProps } from './types';
import { MessageList } from './message-list';
import { InputArea } from './input-area';
import { useChat } from '@/hooks/use-chat';
import { cn } from '@/lib/utils/cn';

export function ChatBot({
  initialMessages = [],
  streaming = true,
  className
}: ChatBotProps) {
  const { messages, isLoading, sendMessage, clearMessages } = useChat({
    streaming,
    initialMessages
  });

  return (
    <div
      className={cn(
        'flex flex-col h-[600px] max-h-[80vh]',
        'rounded-xl overflow-hidden',
        'bg-card border border-border/50',
        'noise-overlay',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse glow" />
          <div>
            <h3 className="text-sm font-display font-bold">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">
              {streaming ? 'Streaming Mode' : 'Standard Mode'}
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Clear chat
          </button>
        )}
      </div>

      {/* Messages */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* Input */}
      <InputArea
        onSend={sendMessage}
        disabled={isLoading}
        placeholder="Ask me anything..."
      />
    </div>
  );
}
