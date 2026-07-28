import React from 'react';
import { Play, Pause, RotateCcw, Radio } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { getSdgByNumber } from '../../data/sdgData';

interface ActionPanelProps {
  selectedSdgNum: number | null;
  playerName: string;
  isPaused: boolean;
  onTriggerStart: () => void;
  onTogglePause: () => void;
  onResetQuiz: () => void;
  onResetSession: () => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
  selectedSdgNum,
  playerName,
  isPaused,
  onTriggerStart,
  onTogglePause,
  onResetQuiz,
  onResetSession
}) => {
  const activeSdg = selectedSdgNum ? getSdgByNumber(selectedSdgNum) : null;

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 light:border-slate-300 shadow-xl space-y-5">
      {/* Live Physical Wheel Selection Status */}
      <div className="p-4 rounded-2xl bg-slate-950/80 light:bg-slate-100 border border-slate-800 light:border-slate-300 flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-unblue/20 text-unblue">
            <Radio className="w-5 h-5 animate-ping" />
          </div>
          <div>
            <div className="text-[11px] font-extrabold text-slate-400 light:text-slate-500 uppercase tracking-wider">
              CONNECTED PARTICIPANT: <span className="text-white light:text-slate-900">{playerName || 'Eco Player'}</span>
            </div>
            <div className="text-sm font-black text-white light:text-slate-900 mt-0.5">
              {activeSdg ? (
                <span style={{ color: activeSdg.color }}>
                  🎯 Selected Wheel Goal: SDG #{activeSdg.sdgNumber} ({activeSdg.title})
                </span>
              ) : (
                <span className="text-amber-400">Click a Goal Card below to select landed wheel topic</span>
              )}
            </div>
          </div>
        </div>

        {/* Big Trigger Quiz Button */}
        <button
          type="button"
          onClick={() => {
            audioService.playStart();
            onTriggerStart();
          }}
          disabled={!selectedSdgNum}
          className={`flex items-center space-x-2 px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm tracking-wide text-white transition-all transform active:scale-95 shadow-xl shrink-0 ${
            selectedSdgNum
              ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-unblue hover:from-emerald-400 hover:to-blue-600 shadow-emerald-500/30 animate-pulse'
              : 'bg-slate-700 opacity-50 cursor-not-allowed'
          }`}
        >
          <Play className="w-5 h-5 fill-current" />
          <span>TRIGGER QUIZ START</span>
        </button>
      </div>

      {/* Streamlined Host Control Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Reset Quiz for Next Player */}
        <button
          onClick={() => {
            audioService.playClick();
            onResetQuiz();
          }}
          className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-unblue hover:bg-blue-600 text-white font-black text-xs shadow-lg shadow-unblue/20 transition transform active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-white" />
          <span>RESET QUIZ (NEXT PLAYER)</span>
        </button>

        {/* Pause / Resume */}
        <button
          onClick={() => {
            audioService.playClick();
            onTogglePause();
          }}
          className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-bold text-xs transition border ${
            isPaused
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500/30'
              : 'bg-slate-800 light:bg-slate-100 border-slate-700 light:border-slate-300 text-slate-300 light:text-slate-700 hover:bg-slate-700'
          }`}
        >
          {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
          <span>{isPaused ? 'Resume Game' : 'Pause Game'}</span>
        </button>

        {/* Reset Entire Session */}
        <button
          onClick={() => {
            audioService.playWrong();
            onResetSession();
          }}
          className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 font-bold text-xs transition"
        >
          <RotateCcw className="w-4 h-4 text-rose-400" />
          <span>Clear Entire Session</span>
        </button>
      </div>
    </div>
  );
};
