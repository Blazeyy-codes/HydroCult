'use client';

import React from 'react';

type PlantIconProps = {
  progress: number;
  className?: string;
};

// Represents the different stages of the plant's growth
const plantStages = [
  {
    // Stage 1: Seedling (0-24%)
    path: 'M12 4c-1.1 0-2 .9-2 2v1H8v2h2v1c0 2.76-2.24 5-5 5H4v2h1c3.86 0 7-3.14 7-7v-1h2V6h-2V4z',
    color: '#a8a29e', // stone-400
  },
  {
    // Stage 2: Sprout (25-49%)
    path: 'M12 2C9.24 2 7 4.24 7 7v1H6v2h1v1c0 2.76-2.24 5-5 5H1v2h1c3.86 0 7-3.14 7-7v-1h1c1.1 0 2-.9 2-2V7c0-2.76 2.24-5 5-5h1V5h-1c-1.66 0-3 1.34-3 3v0z',
    color: '#a3a3a3', // neutral-400
  },
  {
    // Stage 3: Growing Plant (50-74%)
    path: 'M17 11c.34.16.67.35.98.58C16.99 10.15 15.62 9 14 9c-2.21 0-4 1.79-4 4 0 .91.31 1.75.83 2.44C10.25 15.17 10 14.6 10 14c0-2.21 1.79-4 4-4 .75 0 1.44.21 2.04.57.2-.04.4-.07.6-.07.25 0 .49.03.72.09zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
    color: '#38bdf8', // sky-400
  },
  {
    // Stage 4: Healthy Plant (75-99%)
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-3.5-3.5 1.41-1.41L10 12.17l5.59-5.59L17 8l-7 7z',
    color: '#4ade80', // green-400
  },
  {
    // Stage 5: Flourishing Plant (100%+)
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm4 0h-2v-2h2v2zm-4-3H9V9h2v4zm4-3h-2V9h2v1zM9 8V6h6v2H9z',
    color: '#34d399', // emerald-400
  },
];


export const PlantIcon = ({ progress, className }: PlantIconProps) => {
  const getPlantStage = () => {
    if (progress < 25) return plantStages[0];
    if (progress < 50) return plantStages[1];
    if (progress < 75) return plantStages[2];
    if (progress < 100) return plantStages[3];
    return plantStages[4];
  };

  const { path, color } = getPlantStage();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ color: color, transition: 'color 300ms ease-in-out' }}
    >
      <path d={path} />
    </svg>
  );
};
