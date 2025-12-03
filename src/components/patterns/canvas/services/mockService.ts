export const mockGenerateContentStream = async function* (_prompt: string) {
  const responses = [
    "That's an interesting perspective. Let's explore the implications of that idea in a futuristic context.",
    "Based on the parameters you've provided, the optimal solution involves a hybrid approach of quantum computing and neural networks.",
    "The data suggests a 97% probability of success if we proceed with the current trajectory. However, we should consider the outliers.",
    "I've generated a schematic for that. It involves three primary nodes: Input, Processing, and Abstract Representation.",
    "Here is a breakdown of the concept:\n1. Scalability\n2. Modularity\n3. Aesthetic integration.",
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  const tokens = randomResponse.split(" ");

  for (const token of tokens) {
    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate network latency
    yield token + " ";
  }
};
