'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Droplet, LayoutDashboard, CalendarClock, LineChart, Bell, Settings } from 'lucide-react';
import { HydrationVisual } from '@/components/hydration-visual';
import { DailyHistory } from '@/components/daily-history';
import { LogWaterDialog } from '@/components/log-water-dialog';
import { SetGoalDialog } from '@/components/set-goal-dialog';
import ConfettiCelebration from "@/components/confetti-celebration";
import { useToast } from "@/hooks/use-toast";
import type { DrinkLog } from '@/lib/types';
import Link from 'next/link';
import { useAuth, useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RealTimeDate } from '@/components/real-time-date';
import { Skeleton } from '@/components/ui/skeleton';


export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  
  const [dailyGoal, setDailyGoal] = useState(2500);
  const [drinkLogs, setDrinkLogs] = useState<DrinkLog[]>([]);
  const [isLogWaterOpen, setIsLogWaterOpen] = useState(false);
  const [isSetGoalOpen, setIsSetGoalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);
  
  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/login');
    }
  };

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

  if (isUserLoading) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <aside className="w-64 bg-white border-r flex flex-col p-6">
                <div className="flex items-center gap-2 mb-10">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-6 w-24" />
                </div>
                <div className="flex flex-col gap-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-3">
                            <Skeleton className="w-6 h-6" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    ))}
                </div>
                 <div className="mt-auto">
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-3 w-28" />
                        </div>
                    </div>
                    <Skeleton className="h-8 w-full mt-4" />
                </div>
            </aside>
            <main className="flex-1 p-8">
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
            </main>
        </div>
    )
  }
  
  if (!user) {
    return null; // This will be handled by the useEffect redirect, preventing render with null user
  }

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard />, href: '/dashboard' },
    { name: 'Schedule Reminder', icon: <CalendarClock />, href: '#' },
    { name: 'Reports', icon: <LineChart />, href: '#' },
    { name: 'Notifications', icon: <Bell />, href: '#' },
    { name: 'Settings', icon: <Settings />, href: '#' },
  ];

  return (
    <>
      {showConfetti && <ConfettiCelebration />}
      <div className="min-h-screen bg-gray-50 text-gray-900 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r flex flex-col p-6">
            <Link href="/" className="flex items-center gap-2 mb-10">
                <Droplet className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold text-gray-900">HydroCult</span>
            </Link>
            
            <span className="text-sm font-semibold text-gray-400 uppercase mb-4">Menu</span>
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <Link key={item.name} href={item.href} className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-primary transition-colors">
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="mt-auto">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={user.photoURL || undefined} />
                        <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold truncate">{user.displayName || 'User'}</span>
                        <span className="text-xs text-gray-500 truncate">{user.email}</span>
                    </div>
                </div>
                 <Button onClick={handleSignOut} variant="ghost" className="w-full justify-start text-sm font-semibold mt-4">Log Out</Button>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {user.displayName || 'User'}!</h1>
                </div>
                <div className="flex items-center gap-4">
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
                    <DailyHistory logs={drinkLogs} isLoading={false} onDelete={handleDeleteLog} onRetry={() => {}} />
                </div>
              </div>
            </div>
        </main>
      </div>
      <LogWaterDialog isOpen={isLogWaterOpen} onOpenChange={setIsLogWaterOpen} onLogWater={handleLogWater} />
      <SetGoalDialog isOpen={isSetGoalOpen} onOpenChange={setIsSetGoalOpen} onSetGoal={handleSetGoal} currentGoal={dailyGoal} />
    </>
  );
}
