import React from 'react';
import { Artifact } from '../types';

interface ArtifactBlockProps {
  artifact: Artifact;
  onClick: () => void;
  isSelected: boolean;
}

const ArtifactBlock: React.FC<ArtifactBlockProps> = ({ artifact, onClick, isSelected }) => {
  const isComplete = artifact.status === 'complete';

  return (
    <div className="my-3 group">
      <div 
        onClick={onClick}
        className={`
          relative rounded-xl border p-3 cursor-pointer transition-all duration-300 overflow-hidden flex items-center justify-between
          ${isSelected 
            ? 'bg-primary/5 border-primary shadow-[0_0_15px_rgba(0,255,204,0.1)]' 
            : 'bg-[#0f0f13] border-white/10 hover:border-primary/40 hover:bg-white/5'
          }
        `}
      >
        {/* Left: Icon & Text */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Icon Box */}
          <div className={`
            w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
            ${isSelected ? 'bg-primary text-black' : 'bg-primary/20 text-primary'}
          `}>
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
             </svg>
          </div>

          <div className="flex flex-col min-w-0">
            <h4 className={`font-display font-bold text-sm tracking-wide truncate ${isSelected ? 'text-primary' : 'text-gray-200'}`}>
              {artifact.title || 'Untitled'}
            </h4>
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isComplete ? 'bg-primary' : 'bg-secondary animate-pulse'}`} />
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                {isComplete ? 'Artifact Ready' : 'Generating...'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Arrow Button */}
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
          ${isSelected 
            ? 'bg-primary text-black' 
            : 'bg-white/10 text-primary'
          }
        `}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      {/* Optional "More Actions" dots visual appearing below - purely visual for demo match */}
      {isComplete && (
         <div className="flex justify-start mt-2 ml-1">
             <div className="p-1 rounded hover:bg-white/10 cursor-pointer text-gray-500 hover:text-gray-300 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
             </div>
         </div>
      )}
    </div>
  );
};

export default ArtifactBlock;