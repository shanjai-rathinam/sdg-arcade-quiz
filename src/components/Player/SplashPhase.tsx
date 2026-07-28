import React, { useEffect, useState } from 'react';
import type { SDGGoal } from '../../types/game';
import { Zap } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface SplashPhaseProps {
  sdg: SDGGoal;
  onFinishSplash: () => void;
}

export const SplashPhase: React.FC<SplashPhaseProps> = ({ sdg, onFinishSplash }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    audioService.playStart();
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onFinishSplash();
          return 0;
        }
        audioService.playTimerTick();
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onFinishSplash]);

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-white text-center transition-all duration-500 animate-scale-in"
      style={{ backgroundColor: sdg.color }}
    >
      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        {/* Goal Badge */}
        <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white font-extrabold text-sm uppercase tracking-widest shadow-xl">
          <Zap className="w-4 h-4 fill-white animate-bounce" />
          <span>SDG ARCADE QUIZ READY</span>
        </div>

        {/* Big SDG Number */}
        <div className="text-7xl sm:text-9xl font-black tracking-tighter drop-shadow-2xl animate-pulse">
          SDG {sdg.sdgNumber}
        </div>

        {/* Vector Icon */}
        <div 
          className="w-24 h-24 sm:w-32 sm:h-32 mx-auto text-white fill-current drop-shadow-2xl transform hover:scale-110 transition duration-300"
          dangerouslySetInnerHTML={{ __html: sdg.iconSvg }}
        />

        {/* Title & Short Description */}
        <div>
          <h2 className="text-3xl sm:text-5xl font-black leading-tight drop-shadow-lg">
            {sdg.title}
          </h2>
          <p className="text-base sm:text-lg font-medium text-white/90 mt-3 max-w-md mx-auto drop-shadow-sm">
            {sdg.shortDesc}
          </p>
        </div>

        {/* Countdown Circle */}
        <div className="mt-8 pt-4 border-t border-white/20">
          <div className="text-xs font-extrabold tracking-wider uppercase text-white/80 mb-2">
            QUIZ LAUNCHING IN
          </div>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-slate-900 font-black text-3xl shadow-2xl animate-bounce-short">
            {countdown}
          </div>
        </div>
      </div>
    </div>
  );
};
