import React from 'react';
import { InlineEditor } from './components/InlineEditor';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-[660px] w-full bg-[#0a0a0f] text-gray-300 p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4 animate-fade-in">
            <Sparkles size={12} />
            <span>INTERACTIVE DEMO</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-primary to-gray-100 pb-2">
            Inline Editing
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto font-light leading-relaxed">
            Select any text below to trigger the AI refinement engine. Experience real-time diff visualization and semantic text improvements.
          </p>
        </div>

        {/* Editor Container */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-xl opacity-30 group-hover:opacity-50 transition duration-1000 blur"></div>
          <div className="relative rounded-xl bg-[#0a0a0f] p-1">
             <InlineEditor />
          </div>
        </div>

        {/* Footer / Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 font-mono mt-8">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm">
            <span className="flex items-center justify-center w-6 h-6 rounded bg-white/10 text-white text-xs">1</span>
            <span>Highlight text</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm">
            <span className="flex items-center justify-center w-6 h-6 rounded bg-white/10 text-white text-xs">2</span>
            <span>Choose AI action</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm">
            <span className="flex items-center justify-center w-6 h-6 rounded bg-white/10 text-white text-xs">3</span>
            <span>Review & Accept</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
