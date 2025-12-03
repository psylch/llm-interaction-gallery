import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatMessage } from '../types';

export const generateContentStream = async (
  history: ChatMessage[],
  prompt: string,
  systemInstruction?: string
) => {
  try {
    const apiKey = import.meta.env?.VITE_GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('API Key not found');
    }

    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction,
    });

    const chatHistory = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: msg.parts,
    }));

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessageStream(prompt);
    return result.stream;

  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};
