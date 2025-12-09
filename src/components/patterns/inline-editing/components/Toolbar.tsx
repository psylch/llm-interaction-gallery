import React from 'react';
import { Sparkles, Minimize2, Maximize2, SpellCheck, MessageCircle } from 'lucide-react';
import { ActionType } from '../types';

interface ToolbarProps {
  position: { x: number; y: number; placement: 'top' | 'bottom' };
  onAction: (action: ActionType) => void;
  isLoading: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ position, onAction, isLoading }) => {
  if (!position) return null;

  const { x, y, placement } = position;
  
  // Calculate vertical position based on placement
  // If top: position above cursor (y - offset)
  // If bottom: position below cursor (y + offset)
  const topPosition = placement === 'top' ? y - 60 : y + 20;

  return (
    <div
      className="absolute z-50 flex flex-col items-center animate-fade-in"
      style={{
        top: topPosition,
        left: x,
        transform: 'translateX(-50%)',
      }}
    >
      {/* The Toolbar Content */}
      <div className={`
        flex items-center gap-1 p-1.5 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,204,0.15)] ring-1 ring-white/5
        ${placement === 'bottom' ? 'order-2' : 'order-1'}
      `}>
        
        {isLoading ? (
          <div className="flex items-center gap-2 px-3 py-1.5 text-primary font-mono text-sm min-w-[120px] justify-center">
             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-[bounce_1s_infinite_0ms]"/>
             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-[bounce_1s_infinite_200ms]"/>
             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-[bounce_1s_infinite_400ms]"/>
             <span className="ml-1 text-xs uppercase tracking-wider">Processing</span>
          </div>
        ) : (
          <>
            <ToolbarButton 
              icon={<Sparkles size={14} />} 
              label="Improve" 
              onClick={() => onAction('improve')} 
              primary
            />
            <div className="w-px h-4 bg-white/10 mx-1" />
            
            <ToolbarButton 
              icon={<SpellCheck size={14} />} 
              label="Fix" 
              onClick={() => onAction('fix')} 
            />
            <ToolbarButton 
              icon={<Minimize2 size={14} />} 
              label="Shorten" 
              onClick={() => onAction('shorten')} 
            />
            <ToolbarButton 
              icon={<Maximize2 size={14} />} 
              label="Expand" 
              onClick={() => onAction('expand')} 
            />
            <ToolbarButton 
              icon={<MessageCircle size={14} />} 
              label="Tone" 
              onClick={() => onAction('tone')} 
            />
          </>
        )}
      </div>
      
      {/* Arrow Indicator */}
      <div className={`
        w-3 h-3 bg-black/80 border-white/10 backdrop-blur-xl rotate-45 z-40
        ${placement === 'bottom' 
            ? 'order-1 border-l border-t -mb-1.5 mt-0.5' // Arrow points up (border top/left)
            : 'order-2 border-r border-b -mt-1.5 mb-0.5' // Arrow points down (border bottom/right)
        }
      `}></div>
    </div>
  );
};

interface ButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  primary?: boolean;
}

const ToolbarButton: React.FC<ButtonProps> = ({ icon, label, onClick, primary }) => (
  <button
    onClick={(e) => {
      e.stopPropagation(); // Prevent deselecting text
      onClick();
    }}
    className={`
      flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
      ${primary 
        ? 'bg-primary/20 text-primary hover:bg-primary/30 shadow-[0_0_10px_rgba(0,255,204,0.2)]' 
        : 'text-gray-300 hover:text-white hover:bg-white/10'
      }
    `}
  >
    {icon}
    <span>{label}</span>
  </button>
);