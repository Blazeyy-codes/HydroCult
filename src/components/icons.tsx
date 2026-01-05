"use client";

import React from 'react';

type PlantIconProps = {
  progress: number;
  className?: string;
};

export const PlantIcon = ({ progress, className }: PlantIconProps) => {
  const getPlantPath = () => {
    if (progress < 25) {
      // Wilted plant
      return {
        path: "M20 2c-1.1 0-2 .9-2 2v2.34c-1.13 1.69-2.75 2.99-4.66 3.66C11.6 10.66 10 12.73 10 15v5H8v2h8v-2h-2v-5c0-2.27-1.6-4.34-3.34-5-1.91-.67-3.53-1.97-4.66-3.66V4c0-1.1-.9-2-2-2S4 2.9 4 4v2.34c.55.83 1.2 1.56 1.94 2.16.74.6 1.56 1.05 2.44 1.35.88.3 1.81.45 2.76.45s1.88-.15 2.76-.45c.88-.3 1.7-.75 2.44-1.35.74-.6 1.39-1.33 1.94-2.16V4c0-1.1-.9-2-2-2z",
        color: "#a8a29e" // stone-400
      };
    } else if (progress < 100) {
      // Growing plant
      return {
        path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15V10H8v7H6v-7c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v7h-2v-7h-2v7h-2z",
        color: "#38bdf8" // sky-400
      };
    } else {
      // Thriving plant with leaves
      return {
        path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.45 13.55c-.38.38-.99.38-1.37 0L12 12.41l-3.08 3.14c-.38.38-.99.38-1.37 0-.38-.38-.38-.99 0-1.37L10.63 11l-3.14-3.08c-.38-.38-.38-.99 0-1.37s.99-.38 1.37 0L12 9.63l3.08-3.14c.38-.38.99-.38 1.37 0s.38.99 0 1.37L13.37 11l3.08 3.08c.38.39.38 1-.00 1.47z",
        color: "#34d399" // emerald-400
      };
    }
  };

  const { path, color } = getPlantPath();

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
