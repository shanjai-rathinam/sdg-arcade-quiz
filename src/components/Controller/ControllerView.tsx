import React from 'react';
import type { PlayerState } from '../../types/game';
import { SdgGrid } from './SdgGrid';
import { ActionPanel } from './ActionPanel';
import { PlayerMonitor } from './PlayerMonitor';
import { Sliders, Shield } from 'lucide-react';

interface ControllerViewProps {
  selectedSdgNum: number | null;
  onSelectSdg: (sdgNum: number) => void;
  playerState: PlayerState;
  onTriggerStart: () => void;
  onTogglePause: () => void;
  onResetQuiz: () => void;
  onResetSession: () => void;
}

export const ControllerView: React.FC<ControllerViewProps> = ({
  selectedSdgNum,
  onSelectSdg,
  playerState,
  onTriggerStart,
  onTogglePause,
  onResetQuiz,
  onResetSession
}) => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-slide-up">
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-700/60 light:border-slate-300 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-unblue to-blue-700 text-white shadow-lg shadow-unblue/20">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white light:text-slate-900 tracking-tight">
              HOST CONTROLLER DASHBOARD
            </h2>
            <p className="text-xs text-slate-400 light:text-slate-600">
              Observe physical spin wheel result, select landed SDG topic & trigger live player quiz
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900/80 light:bg-slate-200 px-3 py-1.5 rounded-xl border border-slate-800 light:border-slate-300 text-xs font-semibold text-slate-300 light:text-slate-700">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Operator Privileges Granted</span>
        </div>
      </div>

      {/* Action Controls & Live Player Monitor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <ActionPanel
            selectedSdgNum={selectedSdgNum}
            playerName={playerState.playerName}
            isPaused={playerState.isPaused}
            onTriggerStart={onTriggerStart}
            onTogglePause={onTogglePause}
            onResetQuiz={onResetQuiz}
            onResetSession={onResetSession}
          />
        </div>

        <div className="lg:col-span-5">
          <PlayerMonitor playerState={playerState} />
        </div>
      </div>

      {/* 17 SDG Selection Grid */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-700/60 light:border-slate-300 shadow-xl">
        <SdgGrid
          selectedSdgNum={selectedSdgNum}
          onSelectSdg={onSelectSdg}
        />
      </div>
    </div>
  );
};
