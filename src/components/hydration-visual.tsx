"use client";

import { PlantIcon } from "@/components/icons";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

type HydrationVisualProps = {
  progress: number;
  totalIntake: number;
  goal: number;
};

export function HydrationVisual({
  progress,
  totalIntake,
  goal,
}: HydrationVisualProps) {
  const safeProgress = Math.min(progress, 150); // Cap progress for visual reasons
  const moodColor = progress < 50 ? "#a8a29e" // stone-400
                  : progress < 100 ? "#38bdf8" // sky-400
                  : "#34d399"; // emerald-400

  const excessProgress = Math.max(0, progress - 100);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={[{ value: safeProgress }, {value: excessProgress }]}
          startAngle={90}
          endAngle={-270}
          barSize={20}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            angleAxisId={0}
            cornerRadius={10}
            className="[&&]:fill-primary/20"
          >
             {[{ value: safeProgress }].map((entry, index) => (
              <g key={`cell-${index}`}>
                  <style>
                      {`
                          @keyframes fillAnimation {
                              from { stroke-dashoffset: 283; }
                              to { stroke-dashoffset: ${283 * (1 - Math.min(entry.value, 100) / 100)}; }
                          }
                          .animated-bar {
                              animation: fillAnimation 1.5s ease-out forwards;
                              stroke-dasharray: 283;
                              stroke-dashoffset: 283;
                          }
                      `}
                  </style>
                  <RadialBar 
                      background 
                      dataKey="value" 
                      fill={moodColor} 
                      cornerRadius={10} 
                  />
              </g>
            ))}
          </RadialBar>
          {progress > 100 && (
             <RadialBar
                dataKey="value"
                angleAxisId={0}
                cornerRadius={10}
                className="[&&]:fill-amber-400"
                data={[{value: Math.min(excessProgress, 50)}]} // a second layer for excess
            />
          )}
          <g>
            <foreignObject x="25%" y="25%" width="50%" height="50%">
              <div className="flex flex-col items-center justify-center h-full w-full text-center">
                <PlantIcon progress={progress} className="w-12 h-12 mb-1" />
                <span className="text-4xl font-bold font-headline text-primary-text">
                  {Math.round(progress)}%
                </span>
                <span className="text-sm text-muted-foreground">
                  {totalIntake} / {goal} ml
                </span>
              </div>
            </foreignObject>
          </g>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
