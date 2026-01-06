'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, Timestamp } from 'firebase/firestore';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import type { FirebaseDrinkLog } from '@/lib/types';


type TimeRange = '7d' | '30d';

type ChartData = {
    date: string;
    intake: number;
    goal: number;
}

const dailyGoal = 2500; // Assuming a static goal for now for simplicity. Could be fetched.

export default function ReportsPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const [timeRange, setTimeRange] = useState<TimeRange>('7d');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const dateRange = useMemo(() => {
        if (!isClient) return { start: null, end: null };
        const endDate = endOfDay(new Date());
        const startDate = startOfDay(subDays(endDate, timeRange === '7d' ? 6 : 29));
        return { start: startDate, end: endDate };
    }, [timeRange, isClient]);

    const waterLogsQuery = useMemoFirebase(() => {
        if (!user || !dateRange.start) return null;
        return query(
            collection(firestore, `users/${user.uid}/waterLogs`),
            where('userId', '==', user.uid),
            where('timestamp', '>=', dateRange.start),
            where('timestamp', '<=', dateRange.end)
        );
    }, [firestore, user, dateRange]);

    const { data: logs, isLoading } = useCollection<FirebaseDrinkLog>(waterLogsQuery);

    const { chartData, summaryStats } = useMemo(() => {
        if (!logs || !dateRange.start) return { chartData: [], summaryStats: { avgIntake: 0, goalsMet: 0, trend: 0 } };

        const days = timeRange === '7d' ? 7 : 30;
        const dateArray = Array.from({ length: days }, (_, i) => subDays(new Date(), days - 1 - i));
        
        const dataByDate = new Map<string, number>();
        for (const log of logs) {
            // Ensure timestamp is valid before processing
            if (log.timestamp && typeof log.timestamp.toDate === 'function') {
                const dateStr = format(log.timestamp.toDate(), 'yyyy-MM-dd');
                dataByDate.set(dateStr, (dataByDate.get(dateStr) || 0) + log.amount);
            }
        }

        const newChartData: ChartData[] = dateArray.map(date => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const intake = dataByDate.get(dateStr) || 0;
            return {
                date: format(date, 'EEE'), // Short day name e.g., 'Mon'
                intake,
                goal: dailyGoal,
            };
        });

        const totalIntake = newChartData.reduce((sum, day) => sum + day.intake, 0);
        const goalsMet = newChartData.filter(day => day.intake >= day.goal).length;

        return {
            chartData: newChartData,
            summaryStats: {
                avgIntake: totalIntake > 0 ? totalIntake / days : 0,
                goalsMet: goalsMet,
                trend: 0, // Trend calculation would be more complex
            }
        };

    }, [logs, dateRange.start, timeRange]);

    if (isLoading || isUserLoading) {
        return <ReportsSkeleton />;
    }
    
    if (!isLoading && (!logs || logs.length < 1)) {
      return (
        <div className="p-8 max-w-4xl mx-auto text-center">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            </header>
            <Card className="py-16">
              <CardContent>
                <h3 className="text-xl font-semibold text-gray-800">Not Enough Data Yet</h3>
                <p className="text-gray-500 mt-2">Log your water intake for a few days to see your trends and reports here.</p>
              </CardContent>
            </Card>
        </div>
      )
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
                    <p className="text-sm text-muted-foreground mt-1">Your hydration analytics and trends.</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <Button variant={timeRange === '7d' ? 'default' : 'outline'} onClick={() => setTimeRange('7d')}>Last 7 Days</Button>
                    <Button variant={timeRange === '30d' ? 'default' : 'outline'} onClick={() => setTimeRange('30d')} className="ml-2">Last 30 Days</Button>
                </div>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <SummaryCard title="Daily Average" value={`${Math.round(summaryStats.avgIntake).toLocaleString()} ml`} trend={summaryStats.trend} />
                <SummaryCard title="Goals Met" value={`${summaryStats.goalsMet} / ${timeRange === '7d' ? 7: 30} days`} />
                <SummaryCard title="Longest Streak" value={`🏆 Coming soon`} />
            </div>

            {/* Main Chart */}
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Intake vs. Goal</CardTitle>
                    <CardDescription>Your daily water intake compared to your goal of {dailyGoal.toLocaleString()}ml.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}ml`}/>
                            <Tooltip
                                contentStyle={{
                                    background: "white",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "0.5rem"
                                }}
                            />
                            <Bar dataKey="intake" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

        </div>
    );
}

function SummaryCard({ title, value, trend }: { title: string, value: string, trend?: number }) {
    return (
        <Card>
            <CardHeader>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                {trend != null && trend !== 0 && (
                    <p className={`text-xs flex items-center ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trend >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                        {Math.abs(trend)}ml {trend >= 0 ? 'increase' : 'decrease'}
                    </p>
                )}
            </CardHeader>
        </Card>
    )
}

function ReportsSkeleton() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-4 w-72 mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-28" />
        </div>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  )
}
