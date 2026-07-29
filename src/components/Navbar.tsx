import React from 'react';
import type { RoleMode, ThemeMode } from '../types/game';
import { Sun, Moon, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { audioService } from '../services/audioService';
import { SdgWheelLogo } from './SdgWheelLogo';

interface NavbarProps {
  role: RoleMode;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onOpenQrModal?: () => void;
  isConnected: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  role,
  theme,
  setTheme,
  isMuted,
  setIsMuted,
  onOpenQrModal
}) => {
  const toggleAudio = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioService.setMuted(nextMuted);
  };

  const toggleTheme = () => {
    audioService.playClick();
    setTheme(theme === 'DARK' ? 'LIGHT' : 'DARK');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-slate-800/80 light:border-slate-200 bg-slate-950/90 light:bg-white/95 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-24 md:h-28 flex items-center justify-between">
        {/* Transparent UN SDG Wheel Ring Logo & Title - Scaled to Match Footer */}
        <div className="flex items-center space-x-4 sm:space-x-5">
          <SdgWheelLogo className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 drop-shadow-lg" />
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white light:text-slate-900 leading-tight font-heading drop-shadow-sm">
              SDG ARCADE QUIZ
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-400 light:text-slate-500 flex items-center space-x-1 mt-0.5 uppercase tracking-wider font-heading">
              <span>UN Sustainable Development Goals</span>
            </span>
          </div>
        </div>

        {/* Global Controls: Sound & Theme Scaled */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* QR Join Button for Host Controller ONLY */}
          {role === 'CONTROLLER' && onOpenQrModal && (
            <button
              onClick={() => {
                audioService.playClick();
                onOpenQrModal();
              }}
              className="flex items-center space-x-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-slate-800/90 light:bg-slate-100 hover:bg-slate-700 text-slate-100 light:text-slate-900 border-2 border-slate-700 light:border-slate-300 font-extrabold text-xs sm:text-sm shadow-md transition transform active:scale-95"
              title="Show Player Join QR Code"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              <span className="hidden sm:inline">Join QR</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className="p-3 sm:p-3.5 rounded-2xl bg-slate-900 light:bg-slate-100 text-slate-200 light:text-slate-800 hover:text-white light:hover:text-slate-900 border-2 border-slate-800 light:border-slate-200 transition shadow-md transform active:scale-95"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" /> : <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-3 sm:p-3.5 rounded-2xl bg-slate-900 light:bg-slate-100 text-slate-200 light:text-slate-800 hover:text-white light:hover:text-slate-900 border-2 border-slate-800 light:border-slate-200 transition shadow-md transform active:scale-95"
            title="Toggle Light / Dark Theme"
          >
            {theme === 'DARK' ? <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-unblue" />}
          </button>
        </div>
      </div>
    </header>
  );
};
