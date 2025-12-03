import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Bot, User, GitBranch } from 'lucide-react';
import { NodeData, Role } from '../types';

const CustomNode = ({ data, id, selected }: NodeProps<NodeData>) => {
  const isAssistant = data.role === Role.ASSISTANT;
  const isSystem = data.role === Role.SYSTEM;

  return (
    <div 
      className={`
        relative group min-w-[300px] max-w-[400px] rounded-xl transition-all duration-300
        backdrop-blur-md border 
        ${selected 
          ? (isAssistant ? 'border-primary shadow-[0_0_20px_rgba(0,255,204,0.3)]' : 'border-secondary shadow-[0_0_20px_rgba(185,54,238,0.3)]') 
          : 'border-white/10 hover:border-white/30'
        }
        ${isSystem ? 'bg-white/5' : isAssistant ? 'bg-black/40' : 'bg-white/5'}
      `}
    >
      {/* Header Line */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r 
        ${isAssistant ? 'from-primary/50 to-primary' : 'from-secondary/50 to-secondary'}`} 
      />

      {/* Handles */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!bg-white/50 !w-3 !h-3 !border-none transition-colors hover:!bg-primary" 
      />
      
      <div className="p-5 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`
              p-1.5 rounded-lg 
              ${isAssistant ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}
            `}>
              {isAssistant ? <Bot size={16} /> : <User size={16} />}
            </div>
            <span className="font-display font-semibold text-sm tracking-wide text-gray-200 uppercase">
              {data.role}
            </span>
          </div>
          <span className="text-xs font-mono text-gray-500">
            {new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Content */}
        <div className="font-sans text-sm leading-relaxed text-gray-300 break-words whitespace-pre-wrap">
          {data.label}
          {data.isStreaming && (
            <span className="inline-block w-2 h-4 ml-1 align-middle bg-primary animate-pulse" />
          )}
        </div>

        {/* Actions (Only show on hover or selected) */}
        <div className={`
          flex justify-end pt-2 border-t border-white/5 mt-2
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          ${selected ? 'opacity-100' : ''}
        `}>
          <button 
            onClick={() => data.onBranch && data.onBranch(id)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md"
            title="Branch from this thought"
          >
            <GitBranch size={14} />
            <span>Branch</span>
          </button>
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!bg-white/50 !w-3 !h-3 !border-none transition-colors hover:!bg-primary" 
      />
    </div>
  );
};

export default memo(CustomNode);
