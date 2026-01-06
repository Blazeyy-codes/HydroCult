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
  const chartData = [{ value: Math.min(100, progress) }];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={chartData}
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
            fill="hsl(var(--primary))"
          />
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
