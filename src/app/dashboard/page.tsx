'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Quote } from 'lucide-react';
import { HydrationVisual } from '@/components/hydration-visual';
import { DailyHistory } from '@/components/daily-history';
import { LogWaterDialog } from '@/components/log-water-dialog';
import { SetGoalDialog } from '@/components/set-goal-dialog';
import ConfettiCelebration from "@/components/confetti-celebration";
import { useToast } from "@/hooks/use-toast";
import type { DrinkLog } from '@/lib/types';
import { useUser, useFirestore, useMemoFirebase, useCollection, useDoc } from '@/firebase';
import { RealTimeDate } from '@/components/real-time-date';
import { Skeleton } from '@/components/ui/skeleton';
import { collection, query, where, orderBy, addDoc, serverTimestamp, deleteDoc, doc, setDoc } from 'firebase/firestore';

const motivationalQuotes = [
    "A single glass of water can brighten your day.",
    "Your body is a temple, keep it hydrated.",
    "Small sips lead to great health.",
    "Stay hydrated, stay healthy, stay happy.",
    "Water is the driving force of all nature.",
    "Every drop counts towards a healthier you."
];

const getDailyQuote = () => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return motivationalQuotes[dayOfYear % motivationalQuotes.length];
};


export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  
  const [isLogWaterOpen, setIsLogWaterOpen] = useState(false);
  const [isSetGoalOpen, setIsSetGoalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  const [quote, setQuote] = useState('');
  
  // This state ensures all client-side logic runs only after hydration
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if(isClient) {
        setQuote(getDailyQuote());
    }
  }, [isClient]);
  
  const dailyGoalRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, `users/${user.uid}/dailyGoals`, 'main');
  }, [firestore, user]);

  const { data: dailyGoalData, isLoading: isLoadingGoal } = useDoc<{ amount: number }>(dailyGoalRef);
  const dailyGoal = dailyGoalData?.amount || 2500;

  const waterLogsQuery = useMemoFirebase(() => {
    // This query will not run until the component has mounted on the client
    if (!isClient || !user || !firestore) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return query(
      collection(firestore, `users/${user.uid}/waterLogs`),
      where('timestamp', '>=', today),
      orderBy('timestamp', 'desc')
    );
  }, [firestore, user, isClient]);

  const { data: drinkLogs, isLoading: isLoadingLogs } = useCollection<Omit<DrinkLog, 'id'>>(waterLogsQuery);

  const totalIntake = useMemo(() => (drinkLogs || []).reduce((sum, log) => sum + log.amount, 0), [drinkLogs]);
  const progress = dailyGoal > 0 ? (totalIntake / dailyGoal) * 100 : 0;

  const handleLogWater = async (amount: number, drinkType: DrinkLog['drinkType']) => {
    if (!user || !firestore) return;

    const newLog = {
      drinkType,
      amount,
      userId: user.uid,
      timestamp: serverTimestamp(),
    };

    try {
        await addDoc(collection(firestore, `users/${user.uid}/waterLogs`), newLog);
        setIsLogWaterOpen(false);

        const newTotal = totalIntake + amount;
        if(totalIntake < dailyGoal && newTotal >= dailyGoal) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
            toast({
                title: "Goal reached!",
                description: "Congratulations! You've met your hydration goal for today.",
            })
        }
    } catch (error) {
        console.error("Error logging water: ", error);
        toast({
            variant: "destructive",
            title: "Log failed",
            description: "Could not save your drink log. Please try again."
        })
    }
  };

  const handleSetGoal = async (newGoal: number) => {
     if (!user || !firestore || !dailyGoalRef) return;
    try {
        await setDoc(dailyGoalRef, { amount: newGoal, userId: user.uid }, { merge: true });
        setIsSetGoalOpen(false);
        toast({ title: "Goal updated", description: `Your new daily goal is ${newGoal}ml.`})
    } catch (error) {
        console.error("Error setting goal:", error)
        toast({ variant: "destructive", title: "Update failed", description: "Could not save your new goal."})
    }
  };
  
  const handleDeleteLog = async (logId: string) => {
    if (!user || !firestore) return;
    try {
      await deleteDoc(doc(firestore, `users/${user.uid}/waterLogs`, logId));
    } catch (error) {
      console.error("Error deleting log:", error);
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "Could not delete the log. Please try again."
      })
    }
  }

  // The skeleton now correctly handles the initial server render and client hydration
  if (!isClient || isUserLoading || isLoadingLogs || isLoadingGoal) {
    return (
        <div className="p-8">
             <header className="flex justify-between items-center mb-8">
                <div>
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-10 w-40" />
            </header>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Skeleton className="lg:col-span-2 h-80 rounded-2xl" />
                <Skeleton className="lg:col-span-1 h-96 rounded-2xl" />
             </div>
        </div>
    )
  }

  return (
    <>
      {showConfetti && <ConfettiCelebration />}
      <div className="p-8">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                  <h1 className="text-3xl font-bold">Welcome back, {user?.displayName || 'User'}!</h1>
                  {quote && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Quote className="w-4 h-4" />
                      <span>{quote}</span>
                    </div>
                  )}
              </div>
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <RealTimeDate />
              </div>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-semibold">Today's Progress</CardTitle>
                    <CardDescription className="text-gray-600">You've drunk {totalIntake.toLocaleString()}ml so far.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsSetGoalOpen(true)}>Set Goal</Button>
                </CardHeader>
                <CardContent>
                  <HydrationVisual progress={progress} totalIntake={totalIntake} goal={dailyGoal} />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1 row-start-2 lg:row-start-auto">
              <div className="flex flex-col gap-6">
                  <Button className="w-full h-16 text-lg font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg" onClick={() => setIsLogWaterOpen(true)}>
                      <Plus className="w-6 h-6 mr-2" />
                      Log Drink
                  </Button>
                  <DailyHistory logs={drinkLogs || []} isLoading={isLoadingLogs} onDelete={handleDeleteLog} />
              </div>
            </div>
          </div>
      </div>
      <LogWaterDialog isOpen={isLogWaterOpen} onOpenChange={setIsLogWaterOpen} onLogWater={handleLogWater} />
      <SetGoalDialog isOpen={isSetGoalOpen} onOpenChange={setIsSetGoalOpen} onSetGoal={handleSetGoal} currentGoal={dailyGoal} />
    </>
  );
}
