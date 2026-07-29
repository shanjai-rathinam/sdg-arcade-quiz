import React, { useState, useEffect } from 'react';
import { User, ArrowRight, ShieldCheck } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface NameInputPhaseProps {
  playerName: string;
  roomCode: string;
  onNameSubmitted: (name: string, roomCode: string) => void;
}

export const NameInputPhase: React.FC<NameInputPhaseProps> = ({
  playerName,
  roomCode,
  onNameSubmitted
}) => {
  const [inputName, setInputName] = useState(playerName || 'Eco Player');
  const [inputRoomCode, setInputRoomCode] = useState(roomCode || 'SDG-1738');

  useEffect(() => {
    if (roomCode) {
      setInputRoomCode(roomCode);
    }
  }, [roomCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim() || !inputRoomCode.trim()) return;
    audioService.playStart();
    onNameSubmitted(inputName.trim(), inputRoomCode.trim().toUpperCase());
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
          Join the live booth session to start the Sustainability Challenge!
        </p>
      </div>

      {/* Name & Room Code Form Card */}
      <form onSubmit={handleSubmit} className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-slate-700/60 light:border-slate-300 shadow-2xl text-left space-y-6">
        
        {/* Room Code Input */}
        <div>
          <label className="block text-xs sm:text-sm font-extrabold text-amber-400 uppercase tracking-wider mb-2 font-heading">
            Live Booth Room Code
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={inputRoomCode}
              onChange={(e) => setInputRoomCode(e.target.value.toUpperCase())}
              maxLength={12}
              required
              placeholder="e.g. SDG-1738"
              className="w-full pl-13 pr-4 py-3.5 bg-slate-950/90 light:bg-white text-amber-400 font-mono font-black text-lg border-2 border-amber-500/40 rounded-2xl focus:ring-4 focus:ring-amber-500/40 focus:outline-none tracking-widest transition uppercase"
            />
          </div>
        </div>

        {/* Player Nickname Input */}
        <div>
          <label className="block text-sm sm:text-base font-extrabold text-slate-200 light:text-slate-700 uppercase tracking-wider mb-2 font-heading">
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
          <span>JOIN LIVE ROOM SESSION</span>
          <ArrowRight className="w-7 h-7" />
        </button>
      </form>
    </div>
  );
};
