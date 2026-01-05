"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Target } from 'lucide-react';

type SetGoalDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSetGoal: (goal: number) => void;
  currentGoal: number;
};

export function SetGoalDialog({ isOpen, onOpenChange, onSetGoal, currentGoal }: SetGoalDialogProps) {
  const [goal, setGoal] = useState(currentGoal || 2500);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal > 0) {
      onSetGoal(goal);
    }
  };
  
  const quickGoals = [2000, 2500, 3000, 3500];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Target /> Set Your Daily Goal</DialogTitle>
            <DialogDescription>
              A common recommendation is 8 glasses of 8 ounces, which is about 2 liters or 2000ml. Adjust based on your needs.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className='flex gap-2'>
              {quickGoals.map(qGoal => (
                <Button key={qGoal} type="button" variant={goal === qGoal ? "default" : "outline"} onClick={() => setGoal(qGoal)}>
                    {qGoal/1000}L
                </Button>
              ))}
            </div>
            <div className="relative">
                <Input
                id="goal"
                type="number"
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                className="pr-12 text-lg"
                step="100"
                />
                <span className="absolute inset-y-0 right-4 flex items-center text-muted-foreground text-sm">ml</span>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Set Goal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
