import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, ExternalLink } from 'lucide-react';
import { audioService } from '../services/audioService';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const playerUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}?view=player`
    : 'https://sdg-arcade-quiz.local?view=player';

  const handleCopy = () => {
    audioService.playClick();
    navigator.clipboard.writeText(playerUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-scale-in">
      <div className="relative w-full max-w-md bg-slate-900 light:bg-white rounded-3xl border border-slate-700/80 light:border-slate-300 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => {
            audioService.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-unblue/20 text-unblue mb-3">
            <ExternalLink className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white light:text-slate-900">
            Player Join QR Code
          </h2>
          <p className="text-xs text-slate-400 light:text-slate-600 mt-1 max-w-xs mx-auto">
            Scan this code with a mobile device or open in a second browser window to play as the user.
          </p>

          {/* QR Code Container */}
          <div className="mt-6 p-4 bg-white rounded-2xl inline-block shadow-lg border border-slate-200">
            <QRCodeSVG
              value={playerUrl}
              size={200}
              bgColor={"#FFFFFF"}
              fgColor={"#0F172A"}
              level={"H"}
              includeMargin={true}
            />
          </div>

          {/* URL Copy box */}
          <div className="mt-5 flex items-center space-x-2 bg-slate-950 light:bg-slate-100 p-2.5 rounded-xl border border-slate-800 light:border-slate-300">
            <input
              type="text"
              readOnly
              value={playerUrl}
              className="bg-transparent text-xs text-slate-300 light:text-slate-700 w-full focus:outline-none px-2 font-mono truncate"
            />
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-unblue hover:bg-blue-600 text-white text-xs font-semibold transition shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <div className="mt-4 text-[11px] text-slate-500">
            💡 Both windows synchronize instantly using browser <code className="text-unblue">BroadcastChannel</code> events.
          </div>
        </div>
      </div>
    </div>
  );
};
