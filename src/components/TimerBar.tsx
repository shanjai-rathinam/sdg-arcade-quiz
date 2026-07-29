import React from 'react';

interface TimerBarProps {
  timeRemaining: number;
  totalTime?: number;
  color?: string;
}

export const TimerBar: React.FC<TimerBarProps> = React.memo(({
  timeRemaining,
  totalTime = 30,
  color = '#0091b9'
}) => {
  const percentage = Math.max(0, Math.min(100, (timeRemaining / totalTime) * 100));

  // Determine dynamic bar color based on remaining time (30s scale)
  let barColorClass = 'bg-emerald-500 shadow-emerald-500/50';
  if (timeRemaining <= 8) {
    barColorClass = 'bg-rose-500 shadow-rose-500/80 animate-pulse';
  } else if (timeRemaining <= 15) {
    barColorClass = 'bg-amber-400 shadow-amber-400/60';
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs sm:text-sm font-black text-slate-300 light:text-slate-700 mb-2 px-1">
        <span className="flex items-center space-x-1.5 uppercase tracking-wider font-heading">
          <span>⏱️ TIME REMAINING</span>
        </span>
        <span className={`text-base sm:text-lg font-mono font-black ${timeRemaining <= 8 ? 'text-rose-400 animate-pulse' : ''}`}>
          {timeRemaining}s
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-4 bg-slate-950/80 light:bg-slate-200 rounded-full p-0.5 border border-slate-800 light:border-slate-300 overflow-hidden shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-linear shadow-lg ${barColorClass}`}
          style={{
            width: `${percentage}%`,
            backgroundColor: timeRemaining > 15 ? color : undefined
          }}
        />
      </div>
    </div>
  );
});

TimerBar.displayName = 'TimerBar';
