import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message } from '../types';

const SYSTEM_INSTRUCTION = `
You are an expert Frontend Engineer and UI Designer for "Future Lab".
Your design aesthetic is:
- Dark Mode (Background: #0a0a0f)
- Primary Color: Neon Cyan (#00ffcc)
- Fonts: 'Syne' (headings), 'Epilogue' (body)
- Glassmorphism style

When the user asks for code, a UI component, an SVG, or an artifact:
1. You MUST wrap the code content in a special XML tag: <llmartifact title="Brief Title" type="html|svg"> ... content ... </llmartifact>
2. For 'html' type, include standard HTML with <style> tags for inline CSS. Ensure the body background is transparent or fits the dark theme.
3. For 'svg' type, output the raw SVG code.
4. Do NOT use markdown code blocks (\`\`\`) inside the artifact tag. Use them only for explanation text outside the tag.
5. Provide a brief explanation before or after the artifact.
`;

export async function* geminiChatStream(messages: Message[]): AsyncGenerator<string> {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) {
    yield 'Error: VITE_GOOGLE_API_KEY not found. Switch to Mock mode or add the key.';
    return;
  }

  const ai = new GoogleGenerativeAI(apiKey);

  const history = messages.slice(0, -1).map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));

  const lastMessage = messages[messages.length - 1]?.content ?? '';

  try {
    const model = ai.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastMessage);

    for await (const chunk of result.stream) {
      if (chunk.text()) {
        yield chunk.text();
      }
    }
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    yield `\n\nError generating response: ${error?.message || 'Unknown error'}`;
  }
}
