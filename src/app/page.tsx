"use client";

import { useState, useEffect, useMemo } from "react";
import { Award, BarChart2, Flame, Plus, Settings, Share2, Target, Zap } from "lucide-react";
import type { DrinkLog } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SetGoalDialog } from "@/components/set-goal-dialog";
import { LogWaterDialog } from "@/components/log-water-dialog";
import { DailyHistory } from "@/components/daily-history";
import { HydrationVisual } from "@/components/hydration-visual";
import { Skeleton } from "@/components/ui/skeleton";
import ConfettiCelebration from "@/components/confetti-celebration";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";


const mockLogs: DrinkLog[] = [
  { id: "1", amount: 500, timestamp: new Date(new Date().setHours(8, 15)).toISOString(), drinkType: "water", status: "success" },
  { id: "2", amount: 250, timestamp: new Date(new Date().setHours(10, 30)).toISOString(), drinkType: "coffee", status: "success" },
];

const mockChallenges = [
    { title: "Morning Rush", description: "Drink 500ml before 10 AM.", completed: true },
    { title: "Mid-day Hydration", description: "Log 2 drinks before 2 PM.", completed: false },
    { title: "Evening Wind-down", description: "Drink 250ml after 8 PM.", completed: false },
];

const mockBadges = [
    { icon: <Flame className="w-8 h-8 text-orange-500" />, name: "3-Day Streak", earned: true },
    { icon: <Award className="w-8 h-8 text-yellow-500" />, name: "First Goal Met", earned: true },
    { icon: <Target className="w-8 h-8 text-green-500" />, name: "Perfect Week", earned: false },
    { icon: <Zap className="w-8 h-8 text-blue-500" />, name: "Power Drinker", earned: false },
];


export default function Home() {
  const [goal, setGoal] = useState(0);
  const [logs, setLogs] = useState<DrinkLog[]>([]);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching initial data
    setTimeout(() => {
      const storedGoal = 2500; // mock
      const todayLogs = mockLogs.filter(log => new Date(log.timestamp).toDateString() === new Date().toDateString());
      setGoal(storedGoal);
      setLogs(todayLogs);
      setIsLoading(false);
      if (storedGoal === 0) {
        setIsGoalModalOpen(true);
      }
    }, 1500);
  }, []);

  const totalIntake = useMemo(() => {
    return logs.reduce((acc, log) => acc + (log.status === 'success' ? log.amount : 0), 0);
  }, [logs]);

  const progress = useMemo(() => {
    return goal > 0 ? (totalIntake / goal) * 100 : 0;
  }, [totalIntake, goal]);
  
  const prevProgress = useMemo(() => {
    const logsWithoutLast = logs.slice(0, logs.length - 1);
    const intakeWithoutLast = logsWithoutLast.reduce((acc, log) => acc + (log.status === 'success' ? log.amount : 0), 0);
    return goal > 0 ? (intakeWithoutLast / goal) * 100 : 0;
  }, [logs, goal]);

  useEffect(() => {
    const milestones = [50, 100];
    for (const milestone of milestones) {
      if (prevProgress < milestone && progress >= milestone) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        toast({
            title: `Milestone Reached! 🎉`,
            description: `You've reached ${Math.floor(progress)}% of your goal!`,
        });
        break;
      }
    }
  }, [progress, prevProgress, toast]);


  const handleSetGoal = (newGoal: number) => {
    setGoal(newGoal);
    setIsGoalModalOpen(false);
    toast({ title: "Goal updated!", description: `Your new daily goal is ${newGoal}ml.` });
  };

  const handleAddLog = (amount: number, drinkType: DrinkLog['drinkType']) => {
    const newLog: DrinkLog = {
      id: new Date().toISOString(),
      amount,
      timestamp: new Date().toISOString(),
      drinkType,
      status: "pending",
    };

    setLogs(prevLogs => [newLog, ...prevLogs]);
    setIsLogModalOpen(false);

    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      setLogs(prevLogs => prevLogs.map(log => 
        log.id === newLog.id ? { ...log, status: success ? "success" : "error" } : log
      ));
      if(!success) {
        toast({
          variant: 'destructive',
          title: 'Log failed to save',
          description: 'Please check your connection and try again.'
        });
      }
    }, 1000);
  };
  
  const handleRetryLog = (logId: string) => {
     setLogs(prevLogs => prevLogs.map(log => 
        log.id === logId ? { ...log, status: 'pending' } : log
      ));
      
      setTimeout(() => {
        setLogs(prevLogs => prevLogs.map(log => 
            log.id === logId ? { ...log, status: 'success' } : log
        ));
        toast({ title: 'Log saved successfully!' });
      }, 1000);
  };
  
  const handleDeleteLog = (logId: string) => {
      setLogs(prevLogs => prevLogs.filter(log => log.id !== logId));
  };
  
  const handleShare = () => {
    const shareText = `I drank ${totalIntake}ml of my ${goal}ml goal today! That's ${Math.round(progress)}%! #HydrateNow`;
    if (navigator.share) {
      navigator.share({
        title: 'My Hydration Summary',
        text: shareText,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      toast({title: 'Copied to clipboard!', description: 'Your summary is ready to be shared.'});
    }
  };


  return (
    <div className={`min-h-screen w-full bg-background font-body`}>
      {showConfetti && <ConfettiCelebration />}
      <SetGoalDialog isOpen={isGoalModalOpen} onOpenChange={setIsGoalModalOpen} onSetGoal={handleSetGoal} currentGoal={goal} />
      <LogWaterDialog isOpen={isLogModalOpen} onOpenChange={setIsLogModalOpen} onLogWater={handleAddLog} />
      
      <main className="container mx-auto p-4 md:p-6 lg:p-8 max-w-2xl">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Flame className="text-orange-500 w-7 h-7" />
            <span className="text-xl font-bold text-foreground">5 day streak</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Share" onClick={handleShare}><Share2 className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" aria-label="Settings" onClick={() => setIsGoalModalOpen(true)}><Settings className="w-5 h-5" /></Button>
          </div>
        </header>

        <section className="mb-8">
            {isLoading ? (
                <div className="flex justify-center items-center h-[300px]">
                    <Skeleton className="w-[300px] h-[300px] rounded-full" />
                </div>
            ) : (
                <HydrationVisual progress={progress} totalIntake={totalIntake} goal={goal} />
            )}
        </section>

        <section className="mb-8">
            <Card>
                <CardContent className="p-4 flex justify-around">
                    {[250, 500, 750].map(amount => (
                        <Button key={amount} variant="outline" size="lg" className="text-lg font-bold" onClick={() => handleAddLog(amount, 'water')}>
                            {amount}ml
                        </Button>
                    ))}
                </CardContent>
            </Card>
        </section>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="history">Today's Log</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="history">
            <DailyHistory logs={logs} isLoading={isLoading} onRetry={handleRetryLog} onDelete={handleDeleteLog}/>
          </TabsContent>
          <TabsContent value="insights">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><BarChart2 className="w-5 h-5" /> Daily Pattern</CardTitle>
                  <CardDescription>When you drink the most during the day.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[{hour: 'Morning', intake: 750}, {hour: 'Afternoon', intake: 250}, {hour: 'Evening', intake: 0}]}>
                      <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}ml`} />
                      <Bar dataKey="intake" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5" /> Mini Challenges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {mockChallenges.map(challenge => (
                        <div key={challenge.title} className={`text-sm p-2 ${challenge.completed ? 'bg-green-100 text-green-800' : 'bg-blue-50'}`}>
                            <strong>{challenge.title}:</strong> {challenge.description} {challenge.completed && '✅'}
                        </div>
                    ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Award className="w-5 h-5" /> Badges</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-4 gap-4 text-center">
                    {mockBadges.map(badge => (
                        <div key={badge.name} className="flex flex-col items-center gap-1"
                             aria-label={`${badge.name}: ${badge.earned ? 'Earned' : 'Not earned'}`}>
                            <div className={`p-3 ${badge.earned ? 'bg-yellow-100' : 'bg-gray-200'}`}>{badge.icon}</div>
                            <span className={`text-xs ${badge.earned ? 'font-semibold' : 'text-muted-foreground'}`}>{badge.name}</span>
                        </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
      </main>

      <div className="fixed bottom-6 right-6">
        <Button size="icon" className="w-16 h-16 rounded-full shadow-lg" onClick={() => setIsLogModalOpen(true)} aria-label="Add water log">
          <Plus className="w-8 h-8" />
        </Button>
      </div>

    </div>
  );
}
