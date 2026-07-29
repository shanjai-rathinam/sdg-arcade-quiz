import React from 'react';

export const InstitutionFooter: React.FC = () => {
  return (
    <footer className="mt-12 py-6 border-t border-slate-800/60 light:border-slate-200 text-center opacity-80 hover:opacity-100 transition-opacity">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-400 light:text-slate-600">
        <div className="flex items-center space-x-2">
          <span>Hosted & Organized by</span>
          <img
            src="./srm-trp-logo.jpg"
            alt="SRM TRP Engineering College, Trichy"
            className="h-7 sm:h-8 object-contain rounded bg-white p-1 shadow-sm border border-slate-200"
          />
        </div>
        <span className="text-[11px] text-slate-500 light:text-slate-400">
          SDG Arcade Quiz • Live Booth Interactive System
        </span>
      </div>
    </footer>
  );
};
