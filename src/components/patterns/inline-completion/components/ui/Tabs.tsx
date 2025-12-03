import React from 'react';
import { TabType } from '../../types';

interface TabsProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
  items: { id: TabType; label: string; icon: React.ReactNode }[];
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onChange, items }) => {
  return (
    <div className="flex flex-wrap gap-2 p-1 glass-panel rounded-xl mb-6">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300
            ${activeTab === item.id
              ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_20px_rgba(0,255,204,0.1)]'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
            }
          `}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};
