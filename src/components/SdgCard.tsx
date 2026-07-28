import React from 'react';
import type { SDGGoal } from '../types/game';
import { CheckCircle2 } from 'lucide-react';

interface SdgCardProps {
  sdg: SDGGoal;
  isSelected?: boolean;
  onSelect?: () => void;
  isCompact?: boolean;
  disabled?: boolean;
}

export const SdgCard: React.FC<SdgCardProps> = React.memo(({
  sdg,
  isSelected = false,
  onSelect,
  isCompact = false,
  disabled = false
}) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`group relative w-full text-left rounded-2xl transition-all duration-300 transform active:scale-95 overflow-hidden border ${
        isSelected
          ? 'ring-4 ring-white/90 scale-105 z-10 shadow-2xl'
          : 'hover:scale-[1.03] hover:shadow-xl'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      style={{
        backgroundColor: isSelected ? sdg.color : `${sdg.color}EE`,
        borderColor: isSelected ? '#FFFFFF' : `${sdg.color}`,
        boxShadow: isSelected ? `0 0 25px ${sdg.color}CC` : 'none'
      }}
    >
      {/* Top Banner with Number & Title */}
      <div className={`p-3 sm:p-4 text-white flex flex-col justify-between h-full min-h-[110px] ${isCompact ? 'min-h-[90px]' : ''}`}>
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center justify-center font-black text-2xl sm:text-3xl tracking-tighter opacity-90 drop-shadow-md">
            SDG {sdg.sdgNumber}
          </span>
          {isSelected && (
            <span className="p-1 rounded-full bg-white text-slate-900 shadow-md animate-bounce-short">
              <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
            </span>
          )}
        </div>

        {/* Vector Icon preview & Title */}
        <div className="mt-2 flex items-center space-x-2.5">
          <div 
            className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 text-white fill-current opacity-90"
            dangerouslySetInnerHTML={{ __html: sdg.iconSvg }}
          />
          <h3 className="font-extrabold text-sm sm:text-base leading-tight tracking-tight drop-shadow-sm line-clamp-2">
            {sdg.title}
          </h3>
        </div>

        {!isCompact && (
          <p className="text-[11px] font-medium text-white/80 mt-2 line-clamp-1">
            {sdg.questions.length} Arcade Questions
          </p>
        )}
      </div>

      {/* Shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 pointer-events-none" />
    </button>
  );
});

SdgCard.displayName = 'SdgCard';
