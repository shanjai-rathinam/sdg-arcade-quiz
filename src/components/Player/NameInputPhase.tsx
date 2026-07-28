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
    <div className="max-w-md mx-auto space-y-6 text-center animate-slide-up pb-10">
      {/* Title */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white light:text-slate-900 drop-shadow-md">
          SDG ARCADE QUIZ
        </h2>
        <p className="text-sm text-slate-400 light:text-slate-600 mt-2">
          Enter your nickname to join the arcade challenge!
        </p>
      </div>

      {/* Name Form Card */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-3xl border border-slate-700/60 light:border-slate-300 shadow-2xl text-left space-y-5">
        <label className="block text-xs font-extrabold text-slate-300 light:text-slate-700 uppercase tracking-wider">
          Enter Arcade Player Nickname
        </label>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <User className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            maxLength={20}
            required
            placeholder="Enter your nickname..."
            className="w-full pl-11 pr-4 py-3.5 bg-slate-950/80 light:bg-white text-white light:text-slate-900 border border-slate-700 light:border-slate-300 rounded-xl focus:ring-2 focus:ring-unblue focus:outline-none font-bold text-base shadow-inner transition"
          />
        </div>

        {/* Quick Nickname Presets */}
        <div>
          <span className="text-[11px] font-medium text-slate-400 light:text-slate-500 block mb-2">
            Quick Nicknames:
          </span>
          <div className="flex flex-wrap gap-2">
            {['Eco Warrior', 'Earth Guardian', 'Climate Hero', 'Green Pioneer'].map(preset => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className="px-3 py-1.5 rounded-lg bg-slate-900/80 light:bg-slate-200 text-xs font-semibold text-slate-300 light:text-slate-700 border border-slate-800 light:border-slate-300 hover:border-unblue hover:text-unblue transition"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-unblue to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-black text-base tracking-wider uppercase shadow-xl shadow-unblue/30 transform active:scale-95 transition flex items-center justify-center space-x-2"
        >
          <span>CONTINUE TO GAME</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
