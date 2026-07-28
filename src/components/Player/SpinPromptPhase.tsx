import React from 'react';
import { Sparkles } from 'lucide-react';

interface SpinPromptPhaseProps {
  playerName: string;
}

export const SpinPromptPhase: React.FC<SpinPromptPhaseProps> = ({ playerName }) => {
  return (
    <div className="max-w-md mx-auto space-y-6 text-center animate-scale-in pb-10">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white light:text-slate-900 drop-shadow-md">
          WELCOME, <span className="text-unblue">{playerName.toUpperCase()}</span>!
        </h2>
      </div>

      {/* Main Wheel Prompt Graphic & Message Card */}
      <div className="glass-panel p-8 rounded-3xl border-2 border-amber-400/80 light:border-amber-500 shadow-2xl space-y-6 relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-transparent to-transparent">
        {/* Animated Pulsing Wheel Graphic */}
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          {/* Glowing Aura */}
          <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-xl animate-pulse" />
          
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-2 shadow-2xl flex items-center justify-center animate-spin-slow">
            <div className="w-24 h-24 rounded-full bg-slate-950 flex items-center justify-center border-4 border-white text-4xl">
              🎡
            </div>
          </div>
        </div>

        {/* Big Instruction Text */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-amber-300 light:text-amber-600 tracking-tight leading-snug drop-shadow-sm uppercase">
            PLEASE SPIN THE PHYSICAL WHEEL NOW!
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-300 light:text-slate-600 max-w-xs mx-auto leading-relaxed">
            Step up to the physical wheel at the booth and give it a spin! Your 5-question arcade quiz will start automatically in a moment.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center space-x-2 text-xs font-bold text-slate-400">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>Game starting shortly...</span>
        </div>
      </div>
    </div>
  );
};
