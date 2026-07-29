import React from 'react';

export const InstitutionFooter: React.FC = () => {
  return (
    <footer className="mt-12 py-8 border-t-2 border-slate-800/80 light:border-slate-200 text-center bg-slate-950/40 light:bg-slate-100/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-bold text-slate-300 light:text-slate-700">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <span className="uppercase tracking-wider text-xs font-black text-slate-400 light:text-slate-500 font-heading">
            HOSTED & ORGANIZED BY:
          </span>
          <img
            src="./srm-trp-logo.jpg"
            alt="SRM TRP Engineering College, Trichy"
            className="h-16 sm:h-20 md:h-24 max-w-full object-contain rounded-2xl bg-white p-2 shadow-lg border-2 border-slate-200 transition-transform duration-300 hover:scale-105"
          />
        </div>
        <span className="text-xs font-extrabold text-slate-400 light:text-slate-500 uppercase tracking-widest font-heading">
          SDG Arcade Quiz • Live Booth Interactive System
        </span>
      </div>
    </footer>
  );
};
