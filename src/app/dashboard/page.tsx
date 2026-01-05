'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Droplet } from 'lucide-react';
import { HydrationVisual } from '@/components/hydration-visual';
import { DailyHistory } from '@/components/daily-history';
import { LogWaterDialog } from '@/components/log-water-dialog';
import { SetGoalDialog } from '@/components/set-goal-dialog';
import ConfettiCelebration from "@/components/confetti-celebration";
import { useToast } from "@/hooks/use-toast";
import type { DrinkLog } from '@/lib/types';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, session, signOut } = useAuth();
  const router = useRouter();
  
  const [dailyGoal, setDailyGoal] = useState(2500);
  const [drinkLogs, setDrinkLogs] = useState<DrinkLog[]>([]);
  const [isLogWaterOpen, setIsLogWaterOpen] = useState(false);
  const [isSetGoalOpen, setIsSetGoalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);
  
  const totalIntake = drinkLogs.reduce((sum, log) => sum + log.amount, 0);
  const progress = dailyGoal > 0 ? (totalIntake / dailyGoal) * 100 : 0;

  const handleLogWater = (amount: number, drinkType: DrinkLog['drinkType']) => {
    const newLog: DrinkLog = {
      id: crypto.randomUUID(),
      drinkType,
      amount,
      timestamp: new Date().toISOString(),
      status: 'synced',
    };

    setDrinkLogs(prev => [...prev, newLog].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    setIsLogWaterOpen(false);

    if(totalIntake < dailyGoal && (totalIntake + amount) >= dailyGoal) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        toast({
            title: "Goal reached!",
            description: "Congratulations! You've met your hydration goal for today.",
        })
    }
  };

  const handleSetGoal = (newGoal: number) => {
    setDailyGoal(newGoal);
    setIsSetGoalOpen(false);
  };
  
  const handleDeleteLog = (logId: string) => {
    setDrinkLogs(prev => prev.filter(log => log.id !== logId));
  }

  if (!session) {
    return null;
  }

  return (
    <>
      {showConfetti && <ConfettiCelebration />}
      <div className="min-h-screen bg-white text-gray-900">
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 border-b">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
                <Droplet className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold text-gray-900">HydroCult</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:inline">
                {user?.email}
              </span>
              <Button onClick={signOut} variant="ghost" className="text-sm font-semibold">Log Out</Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Today's Progress</CardTitle>
                  <CardDescription>You've drunk {totalIntake.toLocaleString()}ml so far.</CardDescription>
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
                <Button className="w-full h-16 text-lg font-semibold rounded-full bg-gray-900 text-white hover:bg-gray-800" onClick={() => setIsLogWaterOpen(true)}>
                    <Plus className="w-6 h-6 mr-2" />
                    Log Drink
                </Button>
                <DailyHistory logs={drinkLogs} isLoading={false} onDelete={handleDeleteLog} onRetry={() => {}} />
             </div>
          </div>
        </main>
      </div>
      <LogWaterDialog isOpen={isLogWaterOpen} onOpenChange={setIsLogWaterOpen} onLogWater={handleLogWater} />
      <SetGoalDialog isOpen={isSetGoalOpen} onOpenChange={setIsSetGoalOpen} onSetGoal={handleSetGoal} currentGoal={dailyGoal} />
    </>
  );
}
