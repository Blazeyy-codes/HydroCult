import { cn } from "@/lib/utils";
import * as React from "react";

export const PlantIcon = ({ progress, className }: { progress: number, className?: string }) => {
  // Determine color based on progress
  const moodColor = progress < 50 ? "#a16207" // yellow-700
                  : progress < 100 ? "#65a30d" // lime-600
                  : "#16a34a"; // green-600

  // Determine plant "perkiness"
  const leafTransform = progress < 25 ? "rotate(15 -10 20)" 
                      : progress < 50 ? "rotate(5 -5 10)"
                      : "rotate(0)";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("transition-all duration-500", className)}
      style={{ color: moodColor }}
    >
      <path d="M7 22h10" />
      <path d="M12 22V8.5" />
      <path d="M12 8.5a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1 5-5" style={{ transform: leafTransform, transition: 'transform 0.5s ease-out' }}/>
      <path d="M12 8.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0-5-5" style={{ transform: `scaleX(-1) ${leafTransform}`, transformOrigin: 'center', transition: 'transform 0.5s ease-out' }} />
    </svg>
  );
};
