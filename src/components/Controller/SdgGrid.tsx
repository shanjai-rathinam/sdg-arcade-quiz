import React from 'react';
import { SDG_DATA } from '../../data/sdgData';
import { SdgCard } from '../SdgCard';
import { audioService } from '../../services/audioService';

interface SdgGridProps {
  selectedSdgNum: number | null;
  onSelectSdg: (sdgNum: number) => void;
}

export const SdgGrid: React.FC<SdgGridProps> = ({
  selectedSdgNum,
  onSelectSdg
}) => {
  const handleCardClick = (sdgNum: number) => {
    audioService.playClick();
    onSelectSdg(sdgNum);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-extrabold text-white light:text-slate-900 tracking-tight flex items-center space-x-2">
          <span>🎯 Select Physical Wheel Landing Goal</span>
          <span className="text-xs font-normal text-slate-400 light:text-slate-600">
            (17 UN SDGs)
          </span>
        </h2>
        <span className="text-xs font-medium text-slate-400 light:text-slate-600">
          Click goal card to broadcast
        </span>
      </div>

      {/* 17 SDG Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {SDG_DATA.map((sdg) => (
          <SdgCard
            key={sdg.sdgNumber}
            sdg={sdg}
            isSelected={selectedSdgNum === sdg.sdgNumber}
            onSelect={() => handleCardClick(sdg.sdgNumber)}
            isCompact={true}
          />
        ))}
      </div>
    </div>
  );
};
