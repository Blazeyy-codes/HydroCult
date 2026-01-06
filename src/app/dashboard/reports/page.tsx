'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for demonstration
const last7DaysData = [
    { date: 'Mon', intake: 2200, goal: 2500 },
    { date: 'Tue', intake: 2600, goal: 2500 },
    { date: 'Wed', intake: 1800, goal: 2500 },
    { date: 'Thu', intake: 2800, goal: 2500 },
    { date: 'Fri', intake: 2500, goal: 2500 },
    { date: 'Sat', intake: 3000, goal: 2500 },
    { date: 'Sun', intake: 2400, goal: 2500 },
];
const last30DaysData = Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}`,
    intake: 1500 + Math.random() * 2000,
    goal: 2500,
}));

const summaryStats = {
    '7d': { avgIntake: 2471, goalsMet: 4, currentStreak: 2, longestStreak: 4, trend: 150 },
    '30d': { avgIntake: 2350, goalsMet: 18, currentStreak: 2, longestStreak: 9, trend: -50 },
};

const insights = {
    '7d': "Your intake is highest on weekends.",
    '30d': "You're most consistent during the week.",
}

type TimeRange = '7d' | '30d';

export default function ReportsPage() {
    const [timeRange, setTimeRange] = useState<TimeRange>('7d');
    const loading = false; // Replace with actual loading state

    const data = timeRange === '7d' ? last7DaysData : last30DaysData;
    const stats = summaryStats[timeRange];
    const insight = insights[timeRange];

    if (loading) {
        return <ReportsSkeleton />;
    }

    if (last7DaysData.length < 3) {
      return (
        <div className="p-8 max-w-4xl mx-auto text-center">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            </header>
            <Card className="py-16">
              <CardContent>
                <h3 className="text-xl font-semibold text-gray-800">Not Enough Data Yet</h3>
                <p className="text-gray-500 mt-2">Log your water intake for a few more days to see your trends and reports here.</p>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <SummaryCard title="Daily Average" value={`${stats.avgIntake.toLocaleString()} ml`} trend={stats.trend} />
                <SummaryCard title="Goals Met" value={`${stats.goalsMet} / ${timeRange === '7d' ? 7: 30} days`} />
                <SummaryCard title="Current Streak" value={`🔥 ${stats.currentStreak} days`} />
                <SummaryCard title="Longest Streak" value={`🏆 ${stats.longestStreak} days`} />
            </div>

            {/* Main Chart */}
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Intake vs. Goal</CardTitle>
                    <CardDescription>Your daily water intake compared to your goal of 2,500ml.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
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
                            {/* Dotted line for goal */}
                            <line x1="0" y1="0" x2="100%" y2="0" strokeDasharray="5 5" stroke="#a0aec0" transform={`translate(0, ${300 * (1-2500/(Math.max(...data.map(d=>d.intake), 2500) * 1.1))})`}/>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Insight Box */}
            <Card className="bg-blue-50 border-blue-200 mt-8">
                <CardHeader className="flex-row items-center gap-4">
                    <div className="text-xl">💡</div>
                    <div>
                        <CardTitle className="text-blue-900">Quick Insight</CardTitle>
                        <CardDescription className="text-blue-700">{insight}</CardDescription>
                    </div>
                </CardHeader>
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
                {trend != null && (
                    <p className={`text-xs flex items-center ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trend >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                        {Math.abs(trend)}ml {trend >= 0 ? 'above' : 'below'} goal
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  )
}
