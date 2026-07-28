import React from 'react';
import { Sparkles } from 'lucide-react';

interface SpinPromptPhaseProps {
  playerName: string;
}

export const SpinPromptPhase: React.FC<SpinPromptPhaseProps> = ({ playerName }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 text-center animate-scale-in pb-10 pt-4">
      {/* Title */}
      <div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white light:text-slate-900 drop-shadow-md font-heading uppercase">
          WELCOME, <span className="text-unblue">{playerName.toUpperCase()}</span>!
        </h2>
      </div>

      {/* Main Wheel Prompt Card - Scaled for Landscape Monitors */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border-4 border-amber-400/80 light:border-amber-500 shadow-2xl space-y-8 relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-transparent to-transparent">
        {/* Large Animated Pulsing Wheel Graphic */}
        <div className="relative w-48 h-48 sm:w-60 sm:h-60 mx-auto flex items-center justify-center">
          {/* Glowing Aura */}
          <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-2xl animate-pulse" />
          
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-3 shadow-2xl flex items-center justify-center animate-spin-slow">
            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-slate-950 flex items-center justify-center border-4 border-white text-6xl sm:text-7xl">
              🎡
            </div>
          </div>
        </div>

        {/* Big Monitor Instruction Text */}
        <div className="space-y-3">
          <h3 className="text-2xl sm:text-4xl font-black text-amber-300 light:text-amber-600 tracking-tight leading-snug drop-shadow-sm uppercase font-heading">
            PLEASE SPIN THE PHYSICAL WHEEL NOW!
          </h3>
          <p className="text-base sm:text-xl font-bold text-slate-200 light:text-slate-700 max-w-xl mx-auto leading-relaxed">
            Step up to the physical wheel at the booth and give it a spin! Your 5-question arcade quiz will start automatically.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center space-x-3 text-base sm:text-lg font-black text-slate-300 light:text-slate-600">
          <Sparkles className="w-6 h-6 text-amber-400 animate-spin" />
          <span>Game starting shortly...</span>
        </div>
      </div>
    </div>
  );
};
