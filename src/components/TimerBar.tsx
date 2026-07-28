import React from 'react';

interface TimerBarProps {
  timeRemaining: number;
  totalTime?: number;
  color?: string;
}

export const TimerBar: React.FC<TimerBarProps> = ({
  timeRemaining,
  totalTime = 15,
  color = '#009EDB'
}) => {
  const percentage = Math.max(0, Math.min(100, (timeRemaining / totalTime) * 100));

  // Determine dynamic bar color based on remaining time
  let barColorClass = 'bg-emerald-500 shadow-emerald-500/50';
  if (timeRemaining <= 4) {
    barColorClass = 'bg-rose-500 shadow-rose-500/80 animate-pulse';
  } else if (timeRemaining <= 8) {
    barColorClass = 'bg-amber-400 shadow-amber-400/60';
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs font-extrabold text-slate-300 light:text-slate-700 mb-1.5 px-1">
        <span className="flex items-center space-x-1 uppercase tracking-wider">
          <span>⏱️ Time Remaining</span>
        </span>
        <span className={`text-sm font-mono font-black ${timeRemaining <= 4 ? 'text-rose-400 animate-bounce' : ''}`}>
          {timeRemaining}s
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-3 bg-slate-950/80 light:bg-slate-200 rounded-full p-0.5 border border-slate-800 light:border-slate-300 overflow-hidden shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-linear shadow-lg ${barColorClass}`}
          style={{
            width: `${percentage}%`,
            backgroundColor: timeRemaining > 8 ? color : undefined
          }}
        />
      </div>
    </div>
  );
};
