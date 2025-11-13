import { useState, useCallback } from 'react';
import { Message } from '@/types/message';
import { mockChat, mockChatStream } from '@/lib/mock/api';
import { generateId } from '@/lib/utils/delay';

export interface UseChatOptions {
  streaming?: boolean;
  initialMessages?: Message[];
}

export function useChat(options: UseChatOptions = {}) {
  const { streaming = true, initialMessages = [] } = options;

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId('msg'),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (streaming) {
        // Streaming mode
        setIsStreaming(true);

        const stream = mockChatStream([...messages, userMessage]);
        let fullContent = '';

        const assistantMessage: Message = {
          id: generateId('msg'),
          role: 'assistant',
          content: '',
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, assistantMessage]);

        for await (const chunk of stream) {
          fullContent += chunk;
          setMessages(prev => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              content: fullContent
            };
            return newMessages;
          });
        }

        setIsStreaming(false);
      } else {
        // Non-streaming mode
        const response = await mockChat([...messages, userMessage]);

        if (response.success && response.data) {
          setMessages(prev => [...prev, response.data!]);
        } else {
          // Handle error
          const errorMessage: Message = {
            id: generateId('msg'),
            role: 'assistant',
            content: 'Sorry, an error occurred. Please try again.',
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, errorMessage]);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: generateId('msg'),
        role: 'assistant',
        content: 'Sorry, an error occurred. Please try again.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, streaming]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    isStreaming,
    sendMessage,
    clearMessages
  };
}
