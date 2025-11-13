import { delay } from '../utils/delay';

export interface StreamingOptions {
  chunkDelay?: number;
  chunkSize?: number;
  randomChunkSize?: boolean;
}

export async function* simulateStreaming(
  fullText: string,
  options: StreamingOptions = {}
): AsyncGenerator<string, void, unknown> {
  const {
    chunkDelay = 50,
    chunkSize = 2,
    randomChunkSize = false
  } = options;

  let index = 0;

  while (index < fullText.length) {
    const size = randomChunkSize
      ? Math.floor(Math.random() * chunkSize) + 1
      : chunkSize;

    const chunk = fullText.slice(index, index + size);
    index += size;

    yield chunk;

    await delay(chunkDelay);
  }
}
