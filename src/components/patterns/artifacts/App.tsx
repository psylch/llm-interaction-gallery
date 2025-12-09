import React, { useMemo, useState } from 'react';
import ChatPanel from './components/ChatPanel';
import ArtifactRenderer from './components/ArtifactRenderer';
import { Message, Artifact, ArtifactMode } from './types';
import { mockChatStream } from './services/mockService';
import { geminiChatStream } from './services/geminiService';
import { extractArtifacts } from './utils/parser';

/**
 * Embeddable Artifacts experience with split chat + preview.
 * The original standalone view used a fixed fullscreen layout; this version
 * keeps the Future Lab aesthetics while fitting inside the detail page card.
 */
const ArtifactsApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [artifacts, setArtifacts] = useState<Record<string, Artifact>>({});
  const [activeArtifactId, setActiveArtifactId] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [mode, setMode] = useState<ArtifactMode>('mock');

  const modeLabel = useMemo(
    () => (mode === 'mock' ? 'Mock Mode (no key required)' : 'Gemini Stream (uses VITE_GOOGLE_API_KEY)'),
    [mode]
  );

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text };
    const history = [...messages, userMessage];
    setMessages(history);
    setIsStreaming(true);

    const assistantId = `assistant-${Date.now()}`;
    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    const stream = mode === 'gemini' ? geminiChatStream(history) : mockChatStream(history);
    let assembled = '';

    try {
      for await (const chunk of stream) {
        assembled += chunk;

        // Update assistant message progressively
        setMessages(prev =>
          prev.map(msg => (msg.id === assistantId ? { ...msg, content: assembled } : msg))
        );

        // Extract artifacts as they appear
        const found = extractArtifacts(assembled, assistantId);
        if (found.length) {
          setArtifacts(prev => {
            const next = { ...prev };
            found.forEach(art => {
              next[art.id] = art;
            });
            return next;
          });

          if (!activeArtifactId) {
            setActiveArtifactId(found[0].id);
          }
        }
      }
    } catch (error) {
      console.error('Artifact stream error', error);
    } finally {
      setIsStreaming(false);
    }
  };

  const activeArtifact = activeArtifactId ? artifacts[activeArtifactId] : null;

  return (
    <div className="relative w-full min-h-[760px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-64 w-64 bg-primary/15 blur-[120px]" />
        <div className="absolute right-4 bottom-0 h-72 w-72 bg-secondary/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,204,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(185,54,238,0.08),transparent_30%)]" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/50">
          <div>
            <p className="text-xs font-mono text-primary mb-1 tracking-wide">LLM Artifacts</p>
            <p className="text-sm text-gray-400">{modeLabel}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,255,204,0.8)]" />
            <span className="text-xs uppercase font-semibold text-gray-300">Future Lab</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row flex-1 min-h-[680px]">
          <div className="w-full md:w-[45%] lg:w-[42%] border-b md:border-b-0 md:border-r border-white/10">
            <ChatPanel
              messages={messages}
              artifacts={artifacts}
              isLoading={isStreaming}
              onSend={handleSend}
              mode={mode}
              setMode={setMode}
              onArtifactSelect={art => setActiveArtifactId(art.id)}
              activeArtifactId={activeArtifactId}
            />
          </div>

          <div className="flex-1 min-w-0">
            <ArtifactRenderer
              artifact={activeArtifact}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactsApp;
