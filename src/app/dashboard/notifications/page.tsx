'use client';

import { useState, useMemo } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

type NotificationSettings = {
    goalCompleted: boolean;
    reminderAlerts: boolean;
    streakMilestones: boolean;
    missedGoalSummary: boolean;
    userId: string;
}

type ReminderSettings = {
    isEnabled: boolean;
}

const defaultSettings: NotificationSettings = {
    goalCompleted: true,
    reminderAlerts: true,
    streakMilestones: true,
    missedGoalSummary: false,
    userId: '',
};

export default function NotificationsPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const notificationSettingsRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, `users/${user.uid}/notificationPreferences`, 'settings');
    }, [firestore, user]);

    const remindersRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, `users/${user.uid}/reminders`, 'settings');
    }, [firestore, user]);

    const { data: notificationSettings, isLoading: isLoadingNotifications } = useDoc<NotificationSettings>(notificationSettingsRef);
    const { data: reminderSettings, isLoading: isLoadingReminders } = useDoc<ReminderSettings>(remindersRef);

    const settings = useMemo(() => notificationSettings || defaultSettings, [notificationSettings]);
    const remindersEnabled = reminderSettings?.isEnabled ?? true;

    const updateSetting = async (key: keyof Omit<NotificationSettings, 'userId'>, value: boolean) => {
        if (!notificationSettingsRef || !user) return;
        
        const newSettings = { ...settings, [key]: value };
        // Optimistic update
        // Note: useSWR or React Query would handle this more gracefully
        // For now, we just update the backend. The UI will follow due to realtime listener.
        
        try {
            await setDoc(notificationSettingsRef, { ...newSettings, userId: user.uid }, { merge: true });
            toast({ title: "Settings updated" });
        } catch (error) {
            toast({ variant: "destructive", title: "Update failed", description: "Please try again." });
            // Revert would be needed here if not for realtime updates
        }
    };
    
    const notificationItems = [
        { id: 'goalCompleted', title: 'Daily Goal Completed', description: 'Get notified when you hit your goal.', },
        { id: 'reminderAlerts', title: 'Reminder Alerts', description: 'Receive hydration reminders.', disabled: !remindersEnabled },
        { id: 'streakMilestones', title: 'Streak Milestones', description: 'Celebrate consistency milestones.', },
        { id: 'missedGoalSummary', title: 'Missed Goal Summary', description: 'Daily summary if you miss your goal.', },
    ] as const;

    if (isUserLoading || isLoadingNotifications || isLoadingReminders) {
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
                                    checked={settings[item.id]}
                                    onCheckedChange={(value) => updateSetting(item.id, value)}
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
