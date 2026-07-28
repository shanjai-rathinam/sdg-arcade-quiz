import React from 'react';
import type { RoleMode, ThemeMode } from '../types/game';
import { Sun, Moon, Volume2, VolumeX, Sparkles, Sliders, Smartphone } from 'lucide-react';
import { audioService } from '../services/audioService';

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
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 light:border-slate-200 bg-slate-950/80 light:bg-white/90 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* UN Brand Logo & App Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-unblue flex items-center justify-center text-white font-black text-xs tracking-tighter shadow-md shadow-unblue/30">
            SDG
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight text-white light:text-slate-900 leading-none">
              ARCADE QUIZ
            </span>
            <span className="text-[10px] font-semibold text-slate-400 light:text-slate-500 flex items-center space-x-1 mt-0.5">
              <span>UN Sustainable Development Goals</span>
            </span>
          </div>
        </div>

        {/* Global Controls: Sound, Theme, View Switcher, QR Link */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick View Switcher Button */}
          {role === 'PLAYER' ? (
            <a
              href="?role=controller"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-unblue/20 hover:bg-unblue/30 text-unblue light:bg-unblue/10 border border-unblue/30 font-bold text-xs shadow-sm transition"
              title="Switch to Host Controller Dashboard"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Host Controller</span>
            </a>
          ) : (
            <a
              href="?role=player"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 light:bg-emerald-500/10 border border-emerald-500/30 font-bold text-xs shadow-sm transition"
              title="Switch to Player Client View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Player View</span>
            </a>
          )}

          {/* QR Join Button for Host Controller */}
          {role === 'CONTROLLER' && onOpenQrModal && (
            <button
              onClick={() => {
                audioService.playClick();
                onOpenQrModal();
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 light:bg-slate-100 hover:bg-slate-700 text-slate-200 light:text-slate-800 border border-slate-700 light:border-slate-300 font-bold text-xs shadow-sm transition"
              title="Show Player Join QR Code"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Join QR</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className="p-2 rounded-xl bg-slate-900 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-slate-900 border border-slate-800 light:border-slate-200 transition shadow-sm"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-900 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-slate-900 border border-slate-800 light:border-slate-200 transition shadow-sm"
            title="Toggle Light / Dark Theme"
          >
            {theme === 'DARK' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-unblue" />}
          </button>
        </div>
      </div>
    </header>
  );
};
