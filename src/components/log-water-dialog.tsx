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
import { Coffee, GlassWater, Grape, Leaf } from 'lucide-react';
import type { DrinkLog } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

type LogWaterDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onLogWater: (amount: number, drinkType: DrinkLog['drinkType']) => void;
};

const drinkTypes = [
  { type: 'water', icon: <GlassWater />, label: 'Water' },
  { type: 'coffee', icon: <Coffee />, label: 'Coffee' },
  { type: 'tea', icon: <Leaf />, label: 'Tea' },
  { type: 'juice', icon: <Grape />, label: 'Juice' },
] as const;

export function LogWaterDialog({ isOpen, onOpenChange, onLogWater }: LogWaterDialogProps) {
  const [amount, setAmount] = useState(250);
  const [drinkType, setDrinkType] = useState<DrinkLog['drinkType']>('water');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      onLogWater(amount, drinkType);
    }
  };
  
  const getWarning = () => {
      switch(drinkType) {
          case 'coffee': return "Coffee can be dehydrating in large amounts. Moderation is key!";
          case 'tea': return "Some teas are diuretic. Remember to balance with plain water.";
          case 'juice': return "Juices can be high in sugar. Water is the best for pure hydration.";
          default: return null;
      }
  }

  const warning = getWarning();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Log Your Drink</DialogTitle>
            <DialogDescription>
              Add a new entry to your daily log. Select the drink type and amount.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label className="mb-2 block">Drink Type</Label>
              <RadioGroup defaultValue="water" className="grid grid-cols-4 gap-2" onValueChange={(value: DrinkLog['drinkType']) => setDrinkType(value)}>
                {drinkTypes.map(d => (
                  <div key={d.type}>
                    <RadioGroupItem value={d.type} id={d.type} className="peer sr-only" />
                    <Label
                      htmlFor={d.type}
                      className="flex flex-col items-center justify-between border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      {d.icon}
                      <span className="text-xs mt-1">{d.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {warning && (
                <Alert variant="destructive" className="bg-yellow-50 border-yellow-200 text-yellow-800 [&>svg]:text-yellow-600">
                    <AlertDescription>{warning}</AlertDescription>
                </Alert>
            )}

            <div>
                <Label className="mb-2 block">Amount</Label>
                <div className="flex gap-2 mb-2">
                    {[150, 250, 500, 750].map(val => (
                        <Button key={val} type="button" variant={amount === val ? "default" : "outline"} onClick={() => setAmount(val)}>
                            {val}ml
                        </Button>
                    ))}
                </div>
                <div className="relative">
                    <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="pr-12 text-lg"
                        step="50"
                    />
                    <span className="absolute inset-y-0 right-4 flex items-center text-muted-foreground text-sm">ml</span>
                </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Log Drink</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
