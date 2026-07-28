import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  trigger?: boolean;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger = true }) => {
  useEffect(() => {
    if (!trigger) return;

    // Fire festive arcade confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#E5243B', '#DDA63A', '#4C9F38', '#C5192D', '#FF3A21']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#26BDE2', '#FCC30B', '#A21942', '#FD6925']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#DD1367', '#FD9D24', '#BF8B2E', '#3F7E44']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#0A97D9', '#56C02B', '#00689D', '#19486A']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [trigger]);

  return null;
};
