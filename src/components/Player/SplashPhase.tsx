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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 sm:p-10 text-white text-center transition-all duration-500 animate-scale-in overflow-y-auto"
      style={{ backgroundColor: sdg.color }}
    >
      <div className="relative z-10 max-w-2xl mx-auto space-y-6 sm:space-y-8 my-auto">
        {/* Goal Badge */}
        <div className="inline-flex items-center space-x-2.5 px-6 py-2.5 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 text-white font-black text-sm uppercase tracking-widest shadow-xl">
          <Zap className="w-5 h-5 fill-white animate-pulse" />
          <span>SDG ARCADE QUIZ READY</span>
        </div>

        {/* Big SDG Number */}
        <div className="text-7xl sm:text-9xl font-black tracking-tighter drop-shadow-2xl font-heading">
          SDG {sdg.sdgNumber}
        </div>

        {/* Vector Icon */}
        <div 
          className="w-28 h-28 sm:w-36 sm:h-36 mx-auto text-white fill-current drop-shadow-2xl transform hover:scale-110 transition duration-300"
          dangerouslySetInnerHTML={{ __html: sdg.iconSvg }}
        />

        {/* Title & Short Description */}
        <div className="space-y-3">
          <h2 className="text-4xl sm:text-6xl font-black leading-tight drop-shadow-lg font-heading">
            {sdg.title}
          </h2>
          <p className="text-lg sm:text-2xl font-bold text-white/90 max-w-lg mx-auto drop-shadow-sm leading-relaxed">
            {sdg.shortDesc}
          </p>
        </div>

        {/* Countdown Section - Shifted down with generous headroom & downward bounce */}
        <div className="mt-16 sm:mt-24 pt-8 border-t-2 border-white/30 relative">
          <div className="text-sm sm:text-base font-black tracking-widest uppercase text-white/90 mb-6 font-heading drop-shadow-md">
            QUIZ LAUNCHING IN
          </div>

          <div className="relative inline-block">
            {/* 3D Countdown Circle - Uses downward bounce & pop animation so it NEVER moves upward into text */}
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-b from-white via-slate-100 to-slate-200 text-slate-900 font-black text-4xl sm:text-5xl border-4 border-white shadow-[0_12px_24px_rgba(0,0,0,0.45),0_6px_0px_#cbd5e1] animate-pop-pulse font-heading z-10 relative">
              {countdown}
            </div>

            {/* 3D Ground Shadow Effect */}
            <div className="w-24 sm:w-28 h-4 bg-black/40 rounded-full blur-md mx-auto mt-2 transform scale-y-75 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
