import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface NameInputPhaseProps {
  playerName: string;
  onNameSubmitted: (name: string) => void;
}

export const NameInputPhase: React.FC<NameInputPhaseProps> = ({
  playerName,
  onNameSubmitted
}) => {
  const [inputName, setInputName] = useState(playerName || 'Eco Player');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    audioService.playStart();
    onNameSubmitted(inputName.trim());
  };

  const handlePresetSelect = (preset: string) => {
    audioService.playClick();
    setInputName(preset);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-center animate-slide-up pb-10 pt-4">
      {/* Big Monitor Title */}
      <div>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white light:text-slate-900 drop-shadow-lg uppercase font-heading">
          SDG ARCADE QUIZ
        </h2>
        <p className="text-lg sm:text-xl font-medium text-slate-300 light:text-slate-600 mt-3">
          Enter your nickname on screen to join the arcade challenge!
        </p>
      </div>

      {/* Name Form Card - Scaled for Monitors */}
      <form onSubmit={handleSubmit} className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-slate-700/60 light:border-slate-300 shadow-2xl text-left space-y-6">
        <label className="block text-sm sm:text-base font-extrabold text-slate-200 light:text-slate-700 uppercase tracking-wider">
          Enter Arcade Player Nickname
        </label>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <User className="w-7 h-7" />
          </div>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            maxLength={20}
            required
            placeholder="Enter your nickname..."
            className="w-full pl-14 pr-5 py-4 sm:py-5 bg-slate-950/80 light:bg-white text-white light:text-slate-900 border-2 border-slate-700 light:border-slate-300 rounded-2xl focus:ring-4 focus:ring-unblue focus:outline-none font-black text-xl sm:text-2xl shadow-inner transition"
          />
        </div>

        {/* Quick Nickname Presets */}
        <div>
          <span className="text-xs sm:text-sm font-bold text-slate-400 light:text-slate-600 block mb-3 uppercase tracking-wider">
            Quick Nickname Presets:
          </span>
          <div className="flex flex-wrap gap-3">
            {['Eco Warrior', 'Earth Guardian', 'Climate Hero', 'Green Pioneer'].map(preset => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className="px-4 py-2.5 rounded-xl bg-slate-900/80 light:bg-slate-100 text-sm font-extrabold text-slate-200 light:text-slate-800 border-2 border-slate-700 light:border-slate-300 hover:border-unblue hover:text-unblue transition shadow-md"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Big Submit Button */}
        <button
          type="submit"
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-unblue to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-black text-xl tracking-wider uppercase shadow-2xl shadow-unblue/40 transform active:scale-98 transition flex items-center justify-center space-x-3"
        >
          <span>CONTINUE TO GAME</span>
          <ArrowRight className="w-7 h-7" />
        </button>
      </form>
    </div>
  );
};
