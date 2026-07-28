import React from 'react';

interface SdgWheelLogoProps {
  className?: string;
  size?: number | string;
}

export const SdgWheelLogo: React.FC<SdgWheelLogoProps> = ({
  className = "w-9 h-9",
}) => {
  return (
    <img
      src="./sdg-wheel-logo.png"
      alt="UN Sustainable Development Goals Color Wheel Logo"
      className={`object-contain transition-transform duration-300 hover:rotate-12 ${className}`}
      loading="eager"
    />
  );
};
