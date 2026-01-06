'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

// This is a mock. In a real app, this would come from a custom hook using actual backend.
const useReminderSettings = () => {
    const [mode, setMode] = useState<'interval' | 'custom'>('interval');
    const [interval, setInterval] = useState(60); // in minutes
    const [customTimes, setCustomTimes] = useState(['09:00', '11:30', '14:00', '16:30']);
    const [isEnabled, setIsEnabled] = useState(true);
    const [loading, setLoading] = useState(false);

    // Mock API call function
    const updateSettings = async (settings: any) => {
        console.log("Saving settings:", settings);
        // Optimistic update would happen before this
        return new Promise(resolve => setTimeout(resolve, 500));
    };

    const addCustomTime = (time: string) => {
        if (customTimes.includes(time) || !/^\d{2}:\d{2}$/.test(time)) {
            toast({ variant: "destructive", title: "Invalid time", description: "Please enter a valid, unique time in HH:MM format." });
            return;
        }
        const newTimes = [...customTimes, time].sort();
        setCustomTimes(newTimes);
        updateSettings({ customTimes: newTimes });
    };

    const removeCustomTime = (time: string) => {
        const newTimes = customTimes.filter(t => t !== time);
        setCustomTimes(newTimes);
        updateSettings({ customTimes: newTimes });
    };

    return { mode, setMode, interval, setInterval, customTimes, addCustomTime, removeCustomTime, isEnabled, setIsEnabled, loading };
}


export default function ScheduleReminderPage() {
    const { mode, setMode, interval, setInterval, customTimes, addCustomTime, removeCustomTime, isEnabled, setIsEnabled, loading } = useReminderSettings();

    if (loading) {
        return <ScheduleSkeleton />;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Schedule Reminders</h1>
                <p className="text-sm text-muted-foreground mt-1">Set gentle reminders to stay hydrated throughout the day.</p>
            </header>

            <Card className="shadow-sm">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Reminder Settings</CardTitle>
                            <CardDescription>Reminders help you stay consistent.</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="enable-reminders" checked={isEnabled} onCheckedChange={setIsEnabled} />
                            <Label htmlFor="enable-reminders">Enable</Label>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className={`transition-opacity ${!isEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="space-y-6">
                        {/* Reminder Mode */}
                        <div>
                            <Label className="font-semibold">Reminder Type</Label>
                            <div className="flex mt-2 p-1 bg-muted rounded-lg">
                                <Button variant={mode === 'interval' ? 'default' : 'ghost'} className="flex-1" onClick={() => setMode('interval')}>Interval</Button>
                                <Button variant={mode === 'custom' ? 'default' : 'ghost'} className="flex-1" onClick={() => setMode('custom')}>Custom Times</Button>
                            </div>
                        </div>

                        {/* Interval Mode Content */}
                        {mode === 'interval' && (
                            <div>
                                <Label htmlFor="interval-select" className="font-semibold">Remind me every</Label>
                                <div className="flex gap-2 mt-2">
                                    {[30, 45, 60, 90].map(val => (
                                        <Button key={val} variant={interval === val ? 'default' : 'outline'} onClick={() => setInterval(val)}>
                                            {val} min
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Custom Time Mode Content */}
                        {mode === 'custom' && (
                            <div>
                                <Label className="font-semibold">Scheduled Times</Label>
                                {customTimes.length > 0 ? (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {customTimes.map(time => (
                                            <div key={time} className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm font-semibold pl-3 pr-1 py-1 rounded-full">
                                                {time}
                                                <button onClick={() => removeCustomTime(time)} className="rounded-full hover:bg-blue-200 p-0.5">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                        <AddTimeDialog onAddTime={addCustomTime} />
                                    </div>
                                ) : (
                                    <div className="mt-4 text-center border-2 border-dashed rounded-lg p-8">
                                        <p className="text-muted-foreground">No reminders set yet.</p>
                                        <AddTimeDialog onAddTime={addCustomTime}>
                                          <Button variant="link" className="mt-1">Add one to build a healthy hydration habit.</Button>
                                        </AddTimeDialog>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function AddTimeDialog({ onAddTime, children }: { onAddTime: (time: string) => void, children?: React.ReactNode }) {
    const [time, setTime] = useState("10:00");
    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        onAddTime(time);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ? children : <Button variant="outline" size="sm" className="flex items-center gap-1"><Plus className="w-4 h-4"/> Add time</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[320px]">
                <DialogHeader>
                    <DialogTitle>Add a custom reminder time</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Add Reminder</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function ScheduleSkeleton() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <Skeleton className="h-9 w-80" />
        <Skeleton className="h-4 w-96 mt-2" />
      </header>
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64 mt-2" />
            </div>
            <Skeleton className="h-6 w-20" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-5 w-40 mb-2" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10 w-20" />)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
