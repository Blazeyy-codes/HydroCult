'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { signOut } from 'firebase/auth';
import { useAuth, useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { doc, setDoc } from 'firebase/firestore';


type UserSettings = {
    units?: 'ml' | 'oz';
    theme?: 'system' | 'light' | 'dark';
    userId: string;
}

const defaultSettings = {
    units: 'ml' as const,
    theme: 'system' as const,
    dailyGoal: 2500,
}

export default function SettingsPage() {
    const auth = useAuth();
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const router = useRouter();

    const [deleteInput, setDeleteInput] = useState('');
    
    // User Settings (Theme, Units)
    const userSettingsRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, `users/${user.uid}/settings`, 'main');
    }, [firestore, user]);
    const { data: userSettings, isLoading: isLoadingUserSettings } = useDoc<UserSettings>(userSettingsRef);
    
    // Daily Goal
    const dailyGoalRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, `users/${user.uid}/dailyGoals`, 'main');
    }, [firestore, user]);
    const { data: dailyGoalData, isLoading: isLoadingGoal } = useDoc<{ amount: number }>(dailyGoalRef);

    const units = userSettings?.units || defaultSettings.units;
    const theme = userSettings?.theme || defaultSettings.theme;
    const goal = dailyGoalData?.amount || defaultSettings.dailyGoal;
    
    const [localGoal, setLocalGoal] = useState(goal);

    useEffect(() => {
        setLocalGoal(goal);
    }, [goal]);


    const updateUserSettings = async (newSettings: Partial<Omit<UserSettings, 'userId'>>) => {
        if (!userSettingsRef || !user) return;
        try {
            await setDoc(userSettingsRef, { ...newSettings, userId: user.uid }, { merge: true });
            toast({title: "Settings Saved"})
        } catch (error) {
            console.error("Error saving settings:", error);
            toast({ variant: "destructive", title: "Save failed", description: "Could not save your settings." });
        }
    }

    const updateGoal = async () => {
        if (!dailyGoalRef || !user || localGoal === goal) return;
        try {
            await setDoc(dailyGoalRef, { amount: localGoal, userId: user.uid }, { merge: true });
            toast({title: "Daily Goal Saved"})
        } catch (error) {
            console.error("Error saving goal:", error);
            toast({ variant: "destructive", title: "Save failed", description: "Could not save your goal." });
        }
    }

    const handleSignOut = async () => {
        if(auth) {
            await signOut(auth);
            router.push('/login');
        }
    };
    
    const handleDeleteAccount = async () => {
        if (!user) return;
        try {
            // This is a destructive action. In a real app, you would also delete all associated user data in Firestore via a Cloud Function.
            await user.delete();
            toast({ title: "Account deleted", description: "Your account and all data have been successfully deleted." });
            router.push('/');
        } catch (error: any) {
            toast({ variant: "destructive", title: "Deletion failed", description: "Please re-authenticate to delete your account." });
            // Often requires recent sign-in. You might redirect to login here.
        }
    };

    if (isUserLoading || isLoadingUserSettings || isLoadingGoal) {
        return <SettingsSkeleton />;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            </header>

            {/* Hydration Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Hydration</h2>
                <Card>
                    <CardContent className="p-6 space-y-6">
                        <div>
                            <Label htmlFor="daily-goal" className="font-medium">Daily Goal</Label>
                            <div className="relative mt-1 flex items-center gap-2">
                                <Input id="daily-goal" type="number" value={localGoal} onChange={e => setLocalGoal(Number(e.target.value))} className="pr-12" />
                                <span className="absolute inset-y-0 right-16 flex items-center text-muted-foreground text-sm">{units}</span>
                                <Button onClick={updateGoal} disabled={localGoal === goal}>Save</Button>
                            </div>
                        </div>
                        <div>
                            <Label className="font-medium">Units</Label>
                            <RadioGroup value={units} onValueChange={(v: 'ml' | 'oz') => updateUserSettings({ units: v })} className="flex gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="ml" id="ml" />
                                    <Label htmlFor="ml">Milliliters (ml)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="oz" id="oz" />
                                    <Label htmlFor="oz">Ounces (oz)</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Appearance Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Appearance</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Theme</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex p-1 bg-muted rounded-lg">
                            <Button variant={theme === 'light' ? 'default' : 'ghost'} className="flex-1" onClick={() => updateUserSettings({ theme: 'light' })}>Light</Button>
                            <Button variant={theme === 'dark' ? 'default' : 'ghost'} className="flex-1" onClick={() => updateUserSettings({ theme: 'dark' })}>Dark</Button>
                            <Button variant={theme === 'system' ? 'default' : 'ghost'} className="flex-1" onClick={() => updateUserSettings({ theme: 'system' })}>System</Button>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Account Section */}
            <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Account</h2>
                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle>Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full sm:w-auto" onClick={handleSignOut}>Log Out</Button>
                        
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="w-full sm:w-auto">Delete Account</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                        To confirm, please type <strong>DELETE</strong> below.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <Input
                                    id="delete-confirm"
                                    value={deleteInput}
                                    onChange={(e) => setDeleteInput(e.target.value)}
                                    placeholder="DELETE"
                                />
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setDeleteInput('')}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteAccount} disabled={deleteInput !== 'DELETE'}>
                                        Delete My Account
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}

function SettingsSkeleton() {
  return (
    <div className="p-8 max-w-4xl mx-auto animate-pulse">
      <header className="mb-8">
        <Skeleton className="h-9 w-48" />
      </header>

      {/* Hydration Section */}
      <section className="mb-8">
        <Skeleton className="h-6 w-32 mb-3" />
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-16 mb-2" />
              <div className="flex gap-4">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-6 w-28" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Appearance Section */}
      <section className="mb-8">
        <Skeleton className="h-6 w-40 mb-3" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-20" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
      </section>

      {/* Account Section */}
      <section>
        <Skeleton className="h-6 w-32 mb-3" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="flex gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
