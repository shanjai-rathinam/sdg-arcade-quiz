import React from 'react';
import type { PlayerState } from '../../types/game';
import { User, Trophy, Activity, Target, Clock, ShieldAlert } from 'lucide-react';
import { getSdgByNumber } from '../../data/sdgData';

interface PlayerMonitorProps {
  playerState: PlayerState;
}

export const PlayerMonitor: React.FC<PlayerMonitorProps> = ({ playerState }) => {
  const currentSdg = playerState.currentSdgNumber ? getSdgByNumber(playerState.currentSdgNumber) : null;
  const totalAnswers = playerState.answers.length;
  const correctCount = playerState.answers.filter(a => a.isCorrect).length;
  const accuracy = totalAnswers > 0 ? Math.round((correctCount / totalAnswers) * 100) : 0;

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-700/60 light:border-slate-300 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-700/60 light:border-slate-200 pb-3">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-300 light:text-slate-700 flex items-center space-x-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Live Connected Player Feed</span>
        </h3>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse">
          ● REAL-TIME MONITOR
        </span>
      </div>

      {/* Main Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Player Name */}
        <div className="bg-slate-950/60 light:bg-slate-100 p-3 rounded-xl border border-slate-800 light:border-slate-300">
          <div className="text-[11px] font-bold text-slate-400 light:text-slate-500 flex items-center space-x-1">
            <User className="w-3.5 h-3.5 text-unblue" />
            <span>Player</span>
          </div>
          <div className="text-sm font-black text-white light:text-slate-900 mt-1 truncate">
            {playerState.playerName || 'Eco Player'}
          </div>
        </div>

        {/* Current Phase & Goal */}
        <div className="bg-slate-950/60 light:bg-slate-100 p-3 rounded-xl border border-slate-800 light:border-slate-300">
          <div className="text-[11px] font-bold text-slate-400 light:text-slate-500 flex items-center space-x-1">
            <Target className="w-3.5 h-3.5 text-indigo-400" />
            <span>Active Goal / State</span>
          </div>
          <div className="text-xs font-bold text-white light:text-slate-900 mt-1 truncate">
            {playerState.phase === 'QUIZ' && currentSdg ? (
              <span style={{ color: currentSdg.color }}>
                SDG {currentSdg.sdgNumber} (Q{playerState.currentQuestionIndex + 1}/5)
              </span>
            ) : (
              <span className="text-amber-400">{playerState.phase}</span>
            )}
          </div>
        </div>

        {/* Live Score */}
        <div className="bg-slate-950/60 light:bg-slate-100 p-3 rounded-xl border border-slate-800 light:border-slate-300">
          <div className="text-[11px] font-bold text-slate-400 light:text-slate-500 flex items-center space-x-1">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Live Score</span>
          </div>
          <div className="text-lg font-black text-amber-400 mt-0.5">
            {playerState.score} <span className="text-xs font-normal text-slate-400">pts</span>
          </div>
        </div>

        {/* Accuracy */}
        <div className="bg-slate-950/60 light:bg-slate-100 p-3 rounded-xl border border-slate-800 light:border-slate-300">
          <div className="text-[11px] font-bold text-slate-400 light:text-slate-500 flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Accuracy</span>
          </div>
          <div className="text-lg font-black text-emerald-400 mt-0.5">
            {correctCount}/{totalAnswers} <span className="text-xs font-normal text-slate-400">({accuracy}%)</span>
          </div>
        </div>
      </div>

      {/* Paused Alert Banner */}
      {playerState.isPaused && (
        <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-300 text-xs font-bold flex items-center space-x-2 animate-pulse">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>GAME IS CURRENTLY PAUSED BY EVENT OPERATOR</span>
        </div>
      )}

      {/* Answers Log Table */}
      {playerState.answers.length > 0 && (
        <div className="mt-3">
          <div className="text-xs font-bold text-slate-400 light:text-slate-600 mb-2 uppercase tracking-wider">
            Answer Submission History
          </div>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {playerState.answers.map((ans, idx) => (
              <div
                key={ans.questionId + idx}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 light:bg-slate-200 text-xs border border-slate-800/80 light:border-slate-300"
              >
                <span className="font-semibold text-slate-300 light:text-slate-800">
                  Question #{idx + 1}
                </span>
                <div className="flex items-center space-x-3">
                  <span className={ans.isCorrect ? 'text-emerald-400 font-extrabold' : 'text-rose-400 font-extrabold'}>
                    {ans.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    +{ans.pointsEarned} pts ({ans.timeRemaining}s left)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
