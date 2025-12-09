import React, { useState, useEffect } from 'react';
import { Artifact } from '../types';

interface ArtifactRendererProps {
  artifact: Artifact | null;
}

const ArtifactRenderer: React.FC<ArtifactRendererProps> = ({ artifact }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  // Logic: Force 'code' tab if streaming, allow 'preview' only when complete
  useEffect(() => {
    if (artifact) {
      if (artifact.status === 'streaming') {
        setActiveTab('code');
      } else if (artifact.status === 'complete') {
        setActiveTab('preview');
      }
    }
  }, [artifact?.status, artifact?.id]);

  if (!artifact) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-[#0a0a0f] border-l border-white/10">
        <div className="relative mb-8">
           <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
           <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative backdrop-blur-md shadow-2xl">
            <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
           </div>
        </div>
        <h3 className="text-xl font-display font-bold text-gray-200 mb-2">Ready to Visualize</h3>
        <p className="text-gray-500 max-w-sm text-sm">
          Generated artifacts will appear here. You can view the live preview and the underlying code.
        </p>
      </div>
    );
  }

  const isGenerating = artifact.status === 'streaming';

  return (
    <div className="h-full flex flex-col border-l border-white/10 bg-[#050508] relative">
      {/* Header Toolbar - Opaque to cover content */}
      <div className="h-14 px-4 border-b border-white/10 flex justify-between items-center bg-[#0a0a0f] z-40 flex-shrink-0 absolute top-0 left-0 right-0 shadow-sm">
        
        {/* Left: Tab Toggle */}
        <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
          <button
            onClick={() => !isGenerating && setActiveTab('preview')}
            disabled={isGenerating}
            className={`
              flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-medium transition-all
              ${activeTab === 'preview' 
                ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10' 
                : 'text-gray-500 hover:text-gray-300'
              }
              ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isGenerating ? 'bg-gray-600' : 'bg-green-500'}`} />
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`
              px-4 py-1.5 rounded-md text-xs font-medium transition-all
              ${activeTab === 'code' 
                ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10' 
                : 'text-gray-500 hover:text-gray-300'
              }
            `}
          >
            Code
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
           <button className="p-2 text-gray-500 hover:text-gray-200 transition-colors rounded-lg hover:bg-white/5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
           </button>
           <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-200 transition-colors rounded-lg hover:bg-white/5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Device</span>
           </button>
        </div>
      </div>

      {/* Content Area - Padding top for Header */}
      <div className="flex-1 relative overflow-hidden group pt-14">
        
        {/* Loading Overlay for Preview Tab when Generating */}
        {activeTab === 'preview' && isGenerating && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
             <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
             <p className="text-sm font-mono text-primary animate-pulse">GENERATING ARTIFACT...</p>
          </div>
        )}

        {activeTab === 'preview' ? (
          <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center p-4 md:p-8">
            <div className="w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl relative">
                <iframe
                title="preview"
                srcDoc={artifact.content}
                className="w-full h-full border-0"
                sandbox="allow-scripts"
                />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 overflow-auto custom-scrollbar bg-[#0a0a0f]">
            <div className="p-4 md:p-6 min-h-full">
                <pre className="font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap break-all">
                <code dangerouslySetInnerHTML={{ __html: highlightCode(artifact.content) }} />
                </pre>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer Info */}
      <div className="h-8 border-t border-white/10 bg-black/40 flex items-center justify-between px-4 text-[10px] text-gray-500 font-mono flex-shrink-0 z-40 relative">
         <span>{artifact.id}</span>
         <span>{artifact.content.length} bytes</span>
      </div>
    </div>
  );
};

// Simple helper to colorize HTML tags for 'Code' view
const highlightCode = (code: string) => {
    return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/(&lt;\/?[a-z0-9]+)(&gt;)?/gi, '<span class="text-secondary">$1</span><span class="text-secondary">$2</span>')
        .replace(/("[^"]*")/g, '<span class="text-primary">$1</span>');
};

export default ArtifactRenderer;
