import React, { useEffect } from 'react';
import type { PlayerState, SDGGoal } from '../../types/game';
import { ConfettiEffect } from '../ConfettiEffect';
import { Trophy, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface SummaryPhaseProps {
  playerState: PlayerState;
  sdg: SDGGoal | null;
}

export const SummaryPhase: React.FC<SummaryPhaseProps> = ({
  playerState,
  sdg
}) => {
  const totalQuestions = playerState.answers.length || 5;
  const correctCount = playerState.answers.filter(a => a.isCorrect).length;
  const accuracyPct = Math.round((correctCount / totalQuestions) * 100);

  useEffect(() => {
    if (correctCount >= 3) {
      audioService.playVictory();
    } else {
      audioService.playClick();
    }
  }, [correctCount]);

  // Determine Arcade Rank Badge based on exact correct answers count (5 down to 0)
  const getRankBadge = (count: number) => {
    switch (count) {
      case 5:
        return {
          rankName: 'DIAMOND RANK',
          title: 'SDG MASTER & PLANET GUARDIAN',
          icon: '💎',
          color: 'from-cyan-400 via-sky-500 to-blue-600',
          borderColor: 'border-cyan-400',
          glowClass: 'shadow-cyan-500/50',
          desc: 'PERFECT 5/5 SCORE! Flawless mastery of global sustainability goals.'
        };
      case 4:
        return {
          rankName: 'PLATINUM RANK',
          title: 'PLATINUM ECO ADVOCATE',
          icon: '🪙',
          color: 'from-slate-200 via-sky-300 to-indigo-400',
          borderColor: 'border-indigo-300',
          glowClass: 'shadow-indigo-500/30',
          desc: 'OUTSTANDING 4/5 SCORE! Exceptional sustainability knowledge.'
        };
      case 3:
        return {
          rankName: 'GOLD RANK',
          title: 'GOLD SUSTAINABILITY CHAMPION',
          icon: '🥇',
          color: 'from-amber-300 via-yellow-400 to-amber-600',
          borderColor: 'border-amber-400',
          glowClass: 'shadow-amber-500/30',
          desc: 'GREAT 3/5 SCORE! Strong understanding of sustainable development.'
        };
      case 2:
        return {
          rankName: 'SILVER RANK',
          title: 'SILVER ECO WARRIOR',
          icon: '🥈',
          color: 'from-slate-400 via-slate-300 to-slate-500',
          borderColor: 'border-slate-400',
          glowClass: 'shadow-slate-400/30',
          desc: 'SOLID 2/5 SCORE! A commendable effort for our planet.'
        };
      case 1:
        return {
          rankName: 'BRONZE RANK',
          title: 'BRONZE GREEN ADVOCATE',
          icon: '🥉',
          color: 'from-amber-700 via-orange-600 to-amber-800',
          borderColor: 'border-amber-600',
          glowClass: 'shadow-orange-500/30',
          desc: 'STEP IN THE RIGHT DIRECTION! Keep learning and growing.'
        };
      default:
        return {
          rankName: 'SEEDLING RANK',
          title: 'FUTURE PLANET EXPLORER',
          icon: '🌱',
          color: 'from-emerald-500 via-teal-600 to-emerald-800',
          borderColor: 'border-emerald-500',
          glowClass: 'shadow-emerald-500/30',
          desc: 'EVERY JOURNEY STARTS WITH A STEP! Keep exploring the SDGs.'
        };
    }
  };

  const rank = getRankBadge(correctCount);

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center animate-slide-up pb-10">
      {/* Trigger Festive Confetti Blast for 3+ correct answers */}
      {correctCount >= 3 && <ConfettiEffect trigger={true} />}

      {/* Hero Badge */}
      <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 light:text-amber-700 font-black text-xs uppercase tracking-widest shadow-lg animate-pulse">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>ARCADE QUIZ RESULTS</span>
      </div>

      {/* Main Rank Title */}
      <div>
        <h2 className="text-3xl sm:text-5xl font-black text-white light:text-slate-900 tracking-tight drop-shadow-md">
          {playerState.playerName || 'Eco Player'}
        </h2>
        <p className="text-sm text-slate-400 light:text-slate-600 mt-1">
          Completed Goal #{sdg?.sdgNumber}: {sdg?.title}
        </p>
      </div>

      {/* Rank Badge Card */}
      <div className={`glass-panel p-6 sm:p-8 rounded-3xl border-2 ${rank.borderColor} ${rank.glowClass} shadow-2xl space-y-4 relative overflow-hidden`}>
        <div className="text-6xl sm:text-7xl mb-2 animate-bounce-short">
          {rank.icon}
        </div>

        <div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-400 light:text-slate-500 mb-1">
            EARNED ARCADE TIER
          </div>
          <div className={`inline-block px-5 py-2 rounded-full bg-gradient-to-r ${rank.color} text-white font-black text-sm sm:text-base tracking-wider uppercase shadow-xl`}>
            {rank.rankName} - {rank.title}
          </div>
        </div>

        <p className="text-sm font-bold text-slate-300 light:text-slate-700 max-w-md mx-auto leading-relaxed">
          {rank.desc}
        </p>
      </div>

      {/* Score Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* Total Score */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-700/60 light:border-slate-300">
          <div className="text-xs font-bold text-slate-400 light:text-slate-500 flex items-center justify-center space-x-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Final Score</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 light:text-amber-600 mt-1">
            {playerState.score} <span className="text-xs font-normal text-slate-400 light:text-slate-600">pts</span>
          </div>
        </div>

        {/* Accuracy */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-700/60 light:border-slate-300">
          <div className="text-xs font-bold text-slate-400 light:text-slate-500 flex items-center justify-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Correct Answers</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 light:text-emerald-600 mt-1">
            {correctCount}/{totalQuestions} <span className="text-xs font-normal text-slate-400 light:text-slate-600">({accuracyPct}%)</span>
          </div>
        </div>

        {/* SDG Unlocked */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-700/60 light:border-slate-300 col-span-2 sm:col-span-1">
          <div className="text-xs font-bold text-slate-400 light:text-slate-500 flex items-center justify-center space-x-1">
            <Award className="w-4 h-4 text-unblue" />
            <span>Badge Unlocked</span>
          </div>
          <div className="text-sm font-black text-white light:text-slate-900 mt-2 truncate" style={{ color: sdg?.color }}>
            SDG #{sdg?.sdgNumber} Master
          </div>
        </div>
      </div>
    </div>
  );
};
