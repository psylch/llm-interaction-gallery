import { Artifact } from '../types';

/**
 * Extracts all artifacts from a given text.
 * Returns an array of Artifact objects.
 */
export const extractArtifacts = (text: string, messageId: string): Artifact[] => {
  const artifacts: Artifact[] = [];
  // Regex to match the opening tag and content.
  // We use a global regex to find all instances.
  // Group 1: Title
  // Group 2: Type
  // Group 3: Content (greedy until closing tag or end of string)
  const regex = /<llmartifact\s+title="([^"]+)"\s+type="([^"]+)">([\s\S]*?)(<\/llmartifact>|$)/g;

  let match;
  let index = 0;
  while ((match = regex.exec(text)) !== null) {
    const isComplete = match[0].endsWith('</llmartifact>');
    
    artifacts.push({
      id: `${messageId}-${index}`,
      messageId: messageId,
      title: match[1],
      type: match[2] as any,
      content: match[3],
      status: isComplete ? 'complete' : 'streaming'
    });
    index++;
  }

  return artifacts;
};

/**
 * Splits the message text into parts for rendering (text vs artifact blocks).
 */
export const parseMessageContent = (text: string) => {
  const parts: { type: 'text' | 'artifact'; content: string; artifactTitle?: string; artifactIdIndex?: number }[] = [];
  
  const regex = /<llmartifact\s+title="([^"]+)"\s+type="[^"]+">[\s\S]*?(?:<\/llmartifact>|$)/g;
  
  let lastIndex = 0;
  let match;
  let artifactCount = 0;

  while ((match = regex.exec(text)) !== null) {
    // Push preceding text
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex, match.index)
      });
    }

    // Push artifact placeholder info
    parts.push({
      type: 'artifact',
      content: match[0],
      artifactTitle: match[1],
      artifactIdIndex: artifactCount
    });

    lastIndex = regex.lastIndex;
    artifactCount++;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.substring(lastIndex)
    });
  }

  return parts;
};