import { CompletionRequest, CompletionResponse } from '../types';

const MOCK_DELAY = 400; // ms

// Simple pattern matching for demo purposes
const PATTERNS: Record<string, string[]> = {
  "function": [" calculateTotal(items) {\n  return items.reduce((acc, item) => acc + item.price, 0);\n}", " fetchData(url) {\n  const response = await fetch(url);\n  return response.json();\n}"],
  "const": [" App = () => {\n  return <div>Hello World</div>;\n}", " [data, setData] = useState(null);"],
  "import": [" React, { useState, useEffect } from 'react';", " { Button } from '@/components/ui/button';"],
  "hello": [" world! How are you doing today?", " there! Welcome to the Future Lab."],
  "email": [" address is user@example.com", " subject: Project Update"],
  "todo": ["\n- [ ] Review PRs\n- [ ] Update documentation\n- [ ] Deploy to production"],
  "default": [" is a powerful tool for productivity.", " can help you write faster.", " completion is ready."]
};

export const getCompletion = async (req: CompletionRequest): Promise<CompletionResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const text = req.text;
      if (!text || text.trim().length === 0) {
        resolve({ suggestion: '' });
        return;
      }

      // Find the last word or segment
      const lastWord = text.split(/\s+/).pop()?.toLowerCase() || "";

      // Basic context matching
      let options = PATTERNS['default'];

      if (text.endsWith('function ')) options = PATTERNS['function'];
      else if (text.endsWith('const ')) options = PATTERNS['const'];
      else if (text.endsWith('import ')) options = PATTERNS['import'];
      else if (text.includes('TODO:')) options = PATTERNS['todo'];
      else if (PATTERNS[lastWord]) options = PATTERNS[lastWord];

      // Randomly pick one
      const randomSuggestion = options[Math.floor(Math.random() * options.length)];

      resolve({ suggestion: randomSuggestion });
    }, MOCK_DELAY);
  });
};
