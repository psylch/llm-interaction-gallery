import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIService } from '../types';

/**
 * Mock Service for demonstration without API Key
 */
export class MockAIService implements AIService {
  streamResponse(
    prompt: string,
    onChunk: (text: string) => void,
    onComplete: () => void,
    _onError: (error: Error) => void
  ): () => void {
    let active = true;
    let index = 0;
    
    // A fake intelligent response
    const mockResponse = `Here is a simulated response for: "${prompt}"\n\nTo achieve this using the Future Lab design system, you can utilize the glassmorphism utility classes.\n\n1. Use 'backdrop-blur-xl' for the container.\n2. Add a 'bg-white/5' layer for subtle depth.\n3. Ensure your text contrast is high using 'text-gray-200'.\n\n(This is a mock service. Connect the API Key to use Gemini 2.5)`;
    
    const interval = setInterval(() => {
      if (!active) return;
      
      const chunk = mockResponse.slice(0, index + 3); // Simulate chunks
      onChunk(chunk);
      index += 3;

      if (index >= mockResponse.length) {
        clearInterval(interval);
        onComplete();
      }
    }, 30); // Fast typing effect

    return () => {
      active = false;
      clearInterval(interval);
    };
  }
}

/**
 * Real Gemini Service
 */
export class GeminiAIService implements AIService {
  private ai: GoogleGenerativeAI;
  private modelName: string;

  constructor(apiKey: string) {
    this.ai = new GoogleGenerativeAI(apiKey);
    // Using flash for low latency command palette interactions
    this.modelName = 'gemini-2.5-flash'; 
  }

  streamResponse(
    prompt: string,
    onChunk: (text: string) => void,
    onComplete: () => void,
    onError: (error: Error) => void
  ): () => void {
    let active = true;

    (async () => {
      try {
        const model = this.ai.getGenerativeModel({
          model: this.modelName,
          systemInstruction: "You are a concise, helpful command palette assistant. Keep answers brief (under 100 words) and formatted for a small UI overlay. Use markdown for code.",
        });
        const result = await model.generateContentStream(prompt);

        let accumulatedText = "";

        for await (const chunk of result.stream) {
          if (!active) break;
          const text = chunk.text();
          if (text) {
            accumulatedText += text;
            onChunk(accumulatedText);
          }
        }
        
        if (active) onComplete();
      } catch (err) {
        if (active) onError(err instanceof Error ? err : new Error('Unknown error'));
      }
    })();

    return () => {
      active = false;
    };
  }
}
