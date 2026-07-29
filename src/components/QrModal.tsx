import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { audioService } from '../services/audioService';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomCode: string;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose, roomCode }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const playerUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}?room=${encodeURIComponent(roomCode)}`
    : `https://sdg-arcade-quiz.vercel.app/?room=${encodeURIComponent(roomCode)}`;

  const handleCopy = () => {
    audioService.playClick();
    navigator.clipboard.writeText(playerUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-scale-in">
      <div className="relative w-full max-w-md bg-slate-900 light:bg-white rounded-3xl border-2 border-slate-700/80 light:border-slate-300 p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => {
            audioService.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-unblue/20 text-unblue">
            <ExternalLink className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white light:text-slate-900 font-heading">
              SCAN TO JOIN QUIZ
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 mt-1 max-w-xs mx-auto">
              Scan with a mobile camera or open link to join this live booth session on any device.
            </p>
          </div>

          {/* Room Code Badge */}
          <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-400 font-black text-base tracking-widest font-heading shadow-md">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>ROOM CODE: {roomCode}</span>
          </div>

          {/* QR Code Container */}
          <div className="p-4 bg-white rounded-3xl inline-block shadow-2xl border-4 border-slate-200">
            <QRCodeSVG
              value={playerUrl}
              size={210}
              bgColor={"#FFFFFF"}
              fgColor={"#0F172A"}
              level={"H"}
              includeMargin={true}
            />
          </div>

          {/* URL Copy box */}
          <div className="flex items-center space-x-2 bg-slate-950 light:bg-slate-100 p-2.5 rounded-2xl border border-slate-800 light:border-slate-300">
            <input
              type="text"
              readOnly
              value={playerUrl}
              className="bg-transparent text-xs text-slate-300 light:text-slate-700 w-full focus:outline-none px-2 font-mono truncate font-bold"
            />
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-unblue hover:bg-blue-600 text-white text-xs font-black transition shrink-0 shadow-md active:scale-95"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'COPIED!' : 'COPY'}</span>
            </button>
          </div>

          <div className="text-xs font-semibold text-slate-400 light:text-slate-500">
            ⚡ Powered by real-time WebRTC cloud synchronization.
          </div>
        </div>
      </div>
    </div>
  );
};
