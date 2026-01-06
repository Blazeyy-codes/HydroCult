'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data and functions, replace with actual logic
const useNotificationSettings = () => {
    const [settings, setSettings] = useState({
        goalCompleted: true,
        reminderAlerts: true,
        streakMilestones: true,
        missedGoalSummary: false,
    });
    const [remindersEnabled, setRemindersEnabled] = useState(true); // Assume this comes from schedule page
    const [loading, setLoading] = useState(false);

    const updateSetting = async (key: keyof typeof settings, value: boolean) => {
        // Optimistic update
        setSettings(prev => ({ ...prev, [key]: value }));

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            // On success
            toast({ title: "Settings updated" });
        } catch (error) {
            // Revert on failure
            setSettings(prev => ({ ...prev, [key]: !value }));
            toast({ variant: "destructive", title: "Update failed", description: "Please try again." });
        }
    };
    
    return { settings, loading, updateSetting, remindersEnabled };
};


export default function NotificationsPage() {
    const { settings, loading, updateSetting, remindersEnabled } = useNotificationSettings();
    
    const notificationItems = [
        { id: 'goalCompleted', title: 'Daily Goal Completed', description: 'Get notified when you hit your goal.', },
        { id: 'reminderAlerts', title: 'Reminder Alerts', description: 'Receive hydration reminders.', disabled: !remindersEnabled },
        { id: 'streakMilestones', title: 'Streak Milestones', description: 'Celebrate consistency milestones.', },
        { id: 'missedGoalSummary', title: 'Missed Goal Summary', description: 'Daily summary if you miss your goal.', },
    ];

    if (loading) {
        return <NotificationsSkeleton />;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                <p className="text-sm text-muted-foreground mt-1">Choose what you want to be notified about.</p>
            </header>

            <Card className="shadow-sm">
                <CardContent className="p-6">
                    <ul className="divide-y divide-gray-200">
                        {notificationItems.map(item => (
                            <li key={item.id} className="flex items-center justify-between py-4">
                                <div className={`transition-opacity ${item.disabled ? 'opacity-50' : ''}`}>
                                    <Label htmlFor={item.id} className="font-semibold text-base text-gray-800">
                                        {item.title}
                                    </Label>
                                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                </div>
                                <Switch
                                    id={item.id}
                                    checked={settings[item.id as keyof typeof settings]}
                                    onCheckedChange={(value) => updateSetting(item.id as keyof typeof settings, value)}
                                    disabled={item.disabled}
                                    aria-label={`Toggle ${item.title}`}
                                />
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}


function NotificationsSkeleton() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-96 mt-2" />
      </header>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          <ul className="divide-y divide-gray-200">
            {[...Array(4)].map((_, i) => (
              <li key={i} className="flex items-center justify-between py-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-6 w-11 rounded-full" />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
