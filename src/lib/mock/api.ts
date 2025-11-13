import { Message } from '@/types/message';
import { delay, generateId } from '../utils/delay';
import { simulateStreaming } from './streaming';
import { matchResponse } from './data/chat';

export interface MockOptions {
  delay?: number;
  errorRate?: number;
  streaming?: boolean;
  streamingOptions?: {
    chunkDelay?: number;
    chunkSize?: number;
  };
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  metadata?: {
    requestId: string;
    timestamp: number;
    [key: string]: any;
  };
}

/**
 * Mock chat API - non-streaming
 */
export async function mockChat(
  messages: Message[],
  options: MockOptions = {}
): Promise<APIResponse<Message>> {
  const { delay: delayMs = 1000, errorRate = 0 } = options;

  // Simulate network delay
  await delay(delayMs);

  // Simulate random errors
  if (Math.random() < errorRate) {
    return {
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request'
      }
    };
  }

  // Get last user message
  const lastMessage = messages[messages.length - 1];
  const userContent = lastMessage?.content || '';

  // Generate response
  const responseContent = matchResponse(userContent);

  const assistantMessage: Message = {
    id: generateId('msg'),
    role: 'assistant',
    content: responseContent,
    timestamp: Date.now(),
    metadata: {
      tokens: responseContent.length,
      model: 'mock-llm-v1'
    }
  };

  return {
    success: true,
    data: assistantMessage,
    metadata: {
      requestId: generateId('req'),
      timestamp: Date.now()
    }
  };
}

/**
 * Mock chat API - streaming
 */
export async function* mockChatStream(
  messages: Message[],
  options: MockOptions = {}
): AsyncGenerator<string, void, unknown> {
  const {
    delay: delayMs = 500,
    streamingOptions = {}
  } = options;

  // Initial delay
  await delay(delayMs);

  // Get last user message
  const lastMessage = messages[messages.length - 1];
  const userContent = lastMessage?.content || '';

  // Generate response
  const responseContent = matchResponse(userContent);

  // Stream the response
  yield* simulateStreaming(responseContent, {
    chunkDelay: streamingOptions.chunkDelay || 30,
    chunkSize: streamingOptions.chunkSize || 2,
    randomChunkSize: true
  });
}
