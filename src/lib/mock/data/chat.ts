export const mockChatResponses: Record<string, string> = {
  // Greetings
  'hello': 'Hello! How can I assist you today?',
  'hi': 'Hi there! What would you like to know?',
  'hey': 'Hey! How can I help?',

  // About LLMs
  'what is llm': 'LLM stands for Large Language Model. It\'s an AI system trained on vast amounts of text data to understand and generate human-like text. LLMs like GPT, Claude, and others can assist with tasks ranging from answering questions to writing code and creative content.',

  'how does llm work': 'LLMs work by processing text through neural networks with billions of parameters. They\'ve been trained on diverse internet text, learning patterns in language. When you provide input, the model predicts the most likely next words based on what it has learned, generating coherent and contextually relevant responses.',

  // Code related
  'write code': 'I\'d be happy to help you write code! What programming language and what type of functionality are you looking for?',

  'hello world': 'Here\'s a simple Hello World example:\n\n```javascript\nconsole.log("Hello, World!");\n```\n\nWould you like to see this in a different programming language?',

  // General questions
  'help': 'I\'m here to help! You can ask me:\n\n- Questions about LLMs and AI\n- To write or explain code\n- To brainstorm ideas\n- General knowledge questions\n\nWhat would you like to know?',

  'test': 'Test message received! The chatbot is working correctly. Feel free to ask me anything!',

  // Default response
  'default': 'That\'s an interesting question! While I don\'t have a specific answer prepared for that, I\'d be happy to discuss it further. Could you provide more details about what you\'d like to know?'
};

export function matchResponse(userMessage: string): string {
  const normalized = userMessage.toLowerCase().trim();

  // Exact match
  if (mockChatResponses[normalized]) {
    return mockChatResponses[normalized];
  }

  // Fuzzy match - check if any key is contained in the message
  for (const [key, value] of Object.entries(mockChatResponses)) {
    if (key !== 'default' && normalized.includes(key)) {
      return value;
    }
  }

  // Default response
  return mockChatResponses.default;
}
