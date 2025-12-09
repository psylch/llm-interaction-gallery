import React, { useState, useEffect, useMemo } from 'react';
import { CommandPalette } from './components/CommandPalette';
import { getCommandGroups } from './constants';
import { Command, CheckCircle2 } from 'lucide-react';
import { GeminiAIService, MockAIService } from './services/ai';
import { AIService } from './types';

const App: React.FC = () => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Initialize AI Service
  // In a real env, check process.env.API_KEY. 
  // Here we assume if the key is in the env, we use real AI.
  const aiService: AIService = useMemo(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY as string | undefined;
    if (apiKey) {
      console.log('Using Gemini AI Service');
      return new GeminiAIService(apiKey);
    }
    console.log('Using Mock AI Service');
    return new MockAIService();
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAction = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const commandGroups = getCommandGroups(handleAction);

  return (
    <div className="min-h-[660px] w-full bg-background relative overflow-hidden font-sans text-gray-300 selection:bg-primary/30 selection:text-primary">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[660px] p-6 text-center">
        
        <div className="space-y-6 max-w-2xl animate-fade-in">
          <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="px-3 py-1 text-xs font-mono text-primary font-medium tracking-wide">
              V0.3.0 PATTERN PREVIEW
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight">
            Command Palette
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto leading-relaxed">
            Access all system actions with a single keystroke. <br/>
            Type to search, or press <span className="text-primary font-bold">Tab</span> to ask AI.
          </p>

          <div className="mt-12 group">
            <button 
              onClick={() => setIsPaletteOpen(true)}
              className="relative inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(0,255,204,0.2)] transition-all duration-300 group-hover:scale-[1.02]"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/50 border border-white/10 text-gray-300">
                <Command className="w-5 h-5" />
              </span>
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-400 font-medium">Open Command Palette</span>
                <div className="flex items-center gap-1 mt-1">
                   <kbd className="hidden sm:inline-block min-w-[20px] px-1.5 py-0.5 text-[10px] font-mono font-bold text-gray-300 bg-white/10 border border-white/10 rounded-md shadow-sm">⌘</kbd>
                   <kbd className="hidden sm:inline-block min-w-[20px] px-1.5 py-0.5 text-[10px] font-mono font-bold text-gray-300 bg-white/10 border border-white/10 rounded-md shadow-sm">K</kbd>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-primary/50 transition-all duration-300" />
            </button>
          </div>
        </div>

      </main>

      {/* Notification Toast */}
      <div className={
        `fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          notification ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`
      }>
        <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#0a0a0f] border border-primary/30 shadow-[0_0_20px_rgba(0,255,204,0.15)] text-primary backdrop-blur-xl">
           <CheckCircle2 className="w-5 h-5" />
           <span className="font-medium">{notification}</span>
        </div>
      </div>

      <CommandPalette 
        isOpen={isPaletteOpen} 
        onClose={() => setIsPaletteOpen(false)} 
        groups={commandGroups}
        aiService={aiService}
      />
      
    </div>
  );
};

export default App;
