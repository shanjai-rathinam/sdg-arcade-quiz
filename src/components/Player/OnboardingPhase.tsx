import React, { useState } from 'react';
import { User, Sparkles, Radio, HelpCircle, CheckCircle } from 'lucide-react';
import { SDG_DATA, getSdgByNumber } from '../../data/sdgData';
import { audioService } from '../../services/audioService';

interface OnboardingPhaseProps {
  playerName: string;
  onUpdateName: (name: string) => void;
  selectedSdgNum: number | null;
}

export const OnboardingPhase: React.FC<OnboardingPhaseProps> = ({
  playerName,
  onUpdateName,
  selectedSdgNum
}) => {
  const [inputName, setInputName] = useState(playerName || 'Eco Player');
  const selectedSdg = selectedSdgNum ? getSdgByNumber(selectedSdgNum) : null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputName(val);
    onUpdateName(val || 'Eco Player');
  };

  const handlePresetSelect = (preset: string) => {
    audioService.playClick();
    setInputName(preset);
    onUpdateName(preset);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center animate-slide-up pb-10">
      {/* Hero Badge */}
      <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-unblue/10 border border-unblue/30 text-unblue text-xs font-extrabold uppercase tracking-wider shadow-sm">
        <Sparkles className="w-4 h-4 animate-spin" />
        <span>PLAYER CLIENT</span>
      </div>

      {/* Main Title */}
      <div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white light:text-slate-900 drop-shadow-md">
          SDG ARCADE QUIZ
        </h2>
        <p className="text-sm text-slate-400 light:text-slate-600 mt-2 max-w-lg mx-auto">
          Welcome to the SDG Arcade Challenge! Enter your nickname and watch the host select the landed goal on the physical wheel.
        </p>
      </div>

      {/* Player Name Input Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-700/60 light:border-slate-300 shadow-2xl text-left space-y-4">
        <label className="block text-xs font-extrabold text-slate-300 light:text-slate-700 uppercase tracking-wider">
          Enter Your Player Nickname
        </label>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <User className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={inputName}
            onChange={handleNameChange}
            maxLength={20}
            placeholder="Enter player nickname..."
            className="w-full pl-11 pr-4 py-3 bg-slate-950/80 light:bg-white text-white light:text-slate-900 border border-slate-700 light:border-slate-300 rounded-xl focus:ring-2 focus:ring-unblue focus:outline-none font-bold text-base shadow-inner transition"
          />
        </div>

        {/* Quick Name Presets */}
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
                className="px-3 py-1 rounded-lg bg-slate-900/80 light:bg-slate-200 text-xs font-semibold text-slate-300 light:text-slate-700 border border-slate-800 light:border-slate-300 hover:border-unblue hover:text-unblue transition"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 bg-amber-500/5 shadow-xl text-center space-y-3">
        {selectedSdg ? (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm font-black space-y-2 animate-bounce-short">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>HOST SELECTED GOAL #{selectedSdg.sdgNumber}: {selectedSdg.title}</span>
            </div>
            <p className="text-xs font-medium text-slate-300">
              Host is preparing to launch the 5-Question Quiz...
            </p>
          </div>
        ) : (
          <div className="inline-flex items-center space-x-2 text-amber-400 font-extrabold text-xs sm:text-sm uppercase tracking-wider animate-pulse">
            <Radio className="w-4 h-4 text-amber-400 animate-ping" />
            <span>Waiting for Event Host to select landed goal on physical wheel...</span>
          </div>
        )}
      </div>

      {/* 17 SDG Preview Grid */}
      <div>
        <div className="text-xs font-extrabold text-slate-400 light:text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-center space-x-1.5">
          <HelpCircle className="w-4 h-4 text-unblue" />
          <span>Physical Wheel Goal Topics</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {SDG_DATA.map(sdg => (
            <div
              key={sdg.sdgNumber}
              className="p-3 rounded-2xl text-white font-extrabold text-xs text-left shadow-md flex items-center space-x-2 border border-white/20 transition transform hover:scale-105"
              style={{ backgroundColor: sdg.color }}
            >
              <span className="text-base font-black shrink-0">#{sdg.sdgNumber}</span>
              <span className="line-clamp-1 opacity-95">{sdg.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
