'use client';

import React from 'react';

type WaterDropIconProps = {
  progress: number;
  className?: string;
};

export const WaterDropIcon = ({ progress, className }: WaterDropIconProps) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const fillHeight = (clampedProgress / 100) * 24;

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="waterDropClip">
          <path d="M12 21.5C8.69 21.5 6 18.81 6 15.5C6 12.19 12 4.5 12 4.5S18 12.19 18 15.5C18 18.81 15.31 21.5 12 21.5Z" />
        </clipPath>
      </defs>
      
      {/* Background fill (empty part) */}
      <path 
        d="M12 21.5C8.69 21.5 6 18.81 6 15.5C6 12.19 12 4.5 12 4.5S18 12.19 18 15.5C18 18.81 15.31 21.5 12 21.5Z" 
        fill="#e0f2fe" // sky-100
      />
      
      {/* Animated fill */}
      <g clipPath="url(#waterDropClip)">
        <rect
          x="0"
          y={24 - fillHeight}
          width="24"
          height={fillHeight}
          fill="#38bdf8" // sky-400
          style={{ transition: 'y 0.5s ease-out, height 0.5s ease-out' }}
        />
      </g>

      {/* Outline */}
      <path 
        d="M12 21.5C8.69 21.5 6 18.81 6 15.5C6 12.19 12 4.5 12 4.5S18 12.19 18 15.5C18 18.81 15.31 21.5 12 21.5Z" 
        stroke="#7dd3fc" // sky-300
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
};
