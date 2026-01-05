
'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Bell,
  Calendar,
  CircleDot,
  Droplets,
  LayoutGrid,
  MoreHorizontal,
  Search,
  Settings,
  Sun,
  User,
  X,
} from 'lucide-react';
import type { DrinkLog } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const mockLogs: DrinkLog[] = [
  {
    id: '1',
    amount: 250,
    timestamp: new Date(new Date().setHours(8, 0)).toISOString(),
    drinkType: 'water',
    status: 'success',
  },
  {
    id: '2',
    amount: 200,
    timestamp: new Date(new Date().setHours(9, 30)).toISOString(),
    drinkType: 'water',
    status: 'success',
  },
  {
    id: '3',
    amount: 500,
    timestamp: new Date(new Date().setHours(11, 0)).toISOString(),
    drinkType: 'water',
    status: 'success',
  },
  {
    id: '4',
    amount: 200,
    timestamp: new Date(new Date().setHours(13, 0)).toISOString(),
    drinkType: 'water',
    status: 'success',
  },
  {
    id: '5',
    amount: 250,
    timestamp: new Date(new Date().setHours(15, 0)).toISOString(),
    drinkType: 'water',
    status: 'success',
  },
];

const glassIntakeData = [
  { time: '6 am', glass1: 100, glass2: 150, glass3: 50 },
  { time: '8 am', glass1: 120, glass2: 180, glass3: 60 },
  { time: '10 am', glass1: 200, glass2: 250, glass3: 100 },
  { time: '12 pm', glass1: 180, glass2: 220, glass3: 90 },
  { time: '2 pm', glass1: 150, glass2: 200, glass3: 70 },
  { time: '4 pm', glass1: 170, glass2: 210, glass3: 80 },
  { time: '6 pm', glass1: 160, glass2: 190, glass3: 75 },
  { time: '8 pm', glass1: 130, glass2: 160, glass3: 65 },
  { time: '10 pm', glass1: 90, glass2: 120, glass3: 40 },
];

function IntakeStatCard({
  title,
  value,
  goal,
  color,
  icon: Icon,
}: {
  title: string;
  value: number;
  goal: number;
  color: string;
  icon: React.ElementType;
}) {
  const percentage = goal > 0 ? Math.round((value / goal) * 100) : 0;
  return (
    <Card className="bg-white/80 p-4 flex items-center gap-4">
      <div
        className="w-16 h-16 flex items-center justify-center rounded-full"
        style={{ backgroundColor: color + '20' }}
      >
        <div
          className="w-12 h-12 flex items-center justify-center rounded-full"
          style={{ backgroundColor: color + '40' }}
        >
          <span className="font-bold" style={{ color: color }}>
            {percentage}%
          </span>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-lg font-bold text-foreground">
          {value.toLocaleString()} ml
        </p>
      </div>
    </Card>
  );
}

function HydrationTipCard({
  title,
  description,
  imageUrl,
  imageHint,
  bgColor,
}: {
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  bgColor: string;
}) {
  return (
    <Card className="p-4 flex-1" style={{ backgroundColor: bgColor }}>
      <div className="flex items-center gap-4">
        <Image
          src={imageUrl}
          alt={title}
          width={64}
          height={64}
          data-ai-hint={imageHint}
          className="rounded-lg"
        />
        <div>
          <h4 className="font-bold">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}

function DrinkLogItem({ log }: { log: DrinkLog }) {
  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <div className="flex items-center gap-2">
        <CircleDot className="w-4 h-4 text-primary" />
        <span>{log.amount} ml</span>
      </div>
      <span className="text-muted-foreground">
        {new Date(log.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    </div>
  );
}

export default function DashboardPage() {
  const [goal, setGoal] = useState(25000);
  const [logs, setLogs] = useState<DrinkLog[]>(mockLogs);

  const totalIntake = useMemo(() => {
    return logs.reduce(
      (acc, log) => acc + (log.status === 'success' ? log.amount : 0),
      0
    );
  }, [logs]);

  return (
    <div className="min-h-screen bg-background text-foreground font-body flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <Droplets className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">HYDROCULT</span>
          </div>
          <nav className="space-y-4">
            <p className="text-sm text-muted-foreground uppercase">Menu</p>
            <a
              href="#"
              className="flex items-center gap-3 p-2 text-primary bg-primary/10 rounded-lg font-semibold"
            >
              <LayoutGrid className="w-5 h-5" />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 p-2 text-muted-foreground hover:bg-gray-100 rounded-lg">
              <Calendar className="w-5 h-5" />
              Schedule Reminder
            </a>
            <a href="#" className="flex items-center gap-3 p-2 text-muted-foreground hover:bg-gray-100 rounded-lg">
              <BarChart className="w-5 h-5" />
              Reports
            </a>
            <a href="#" className="flex items-center gap-3 p-2 text-muted-foreground hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
              Notifications
            </a>
            <a href="#" className="flex items-center gap-3 p-2 text-muted-foreground hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
              Settings
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src="https://picsum.photos/seed/user/40/40"
              alt="Mathew Perry"
            />
            <AvatarFallback>MP</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Mathew Perry</p>
            <p className="text-xs text-muted-foreground">mathewperry@xyz.com</p>
          </div>
          <MoreHorizontal className="w-5 h-5 text-muted-foreground ml-auto" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome back Mathew!</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search"
                className="bg-white rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none"
              />
            </div>
          </div>
        </header>

        {/* Sunny Day Card */}
        <Card className="mb-8 p-4 bg-yellow-50/50 border-yellow-200/80 flex items-center gap-4">
          <Sun className="w-6 h-6 text-yellow-500" />
          <div>
            <span className="font-bold">26°C</span>
            <span className="text-muted-foreground ml-2">
              It's a Sunny Day today!
            </span>
            <span className="text-muted-foreground ml-4 hidden md:inline">
              Don't forget to take your water bottle with you.
            </span>
          </div>
        </Card>

        {/* Intake Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <IntakeStatCard
            title="Daily Intake"
            value={5000}
            goal={6000}
            color="#52b788"
            icon={User}
          />
          <IntakeStatCard
            title="Average Intake"
            value={2500}
            goal={3000}
            color="#8a5cf5"
            icon={User}
          />
          <IntakeStatCard
            title="Total Intake"
            value={17000}
            goal={25000}
            color="#f4a261"
            icon={User}
          />
        </section>

        {/* Glass Intake Chart */}
        <section className="mb-8">
          <Card className="p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle>Glass Intake</CardTitle>
              <CardDescription>200 ml</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={glassIntakeData}>
                  <XAxis
                    dataKey="time"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #eee',
                    }}
                  />
                  <Bar dataKey="glass1" stackId="a" fill="#e63946" radius={[4, 4, 0, 0]} barSize={12} />
                  <Bar dataKey="glass2" stackId="a" fill="#fca3b3" barSize={12} />
                  <Bar dataKey="glass3" stackId="a" fill="#457b9d" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Hydration Tips */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Hydration Tips</h3>
            <a href="#" className="text-sm text-primary font-semibold">
              See All
            </a>
          </div>
          <p className="text-muted-foreground mb-4">
            Consuming fruit juices keeps up the hydration level.
          </p>
          <div className="flex gap-6">
            <HydrationTipCard
              title="Watermelon"
              description="It contains 97% water in it. A good choice to stay hydrated."
              imageUrl="https://picsum.photos/seed/watermelon/64/64"
              imageHint="watermelon slice"
              bgColor="#fde2e4"
            />
            <HydrationTipCard
              title="Oranges"
              description="It contains 72% water in it. It's tangy nature helps with skin care."
              imageUrl="https://picsum.photos/seed/oranges/64/64"
              imageHint="orange fruit"
              bgColor="#fff1e6"
            />
            <HydrationTipCard
              title="Grapes"
              description="It contains vitamin 'C' which helps with retaining water."
              imageUrl="https://picsum.photos/seed/grapes/64/64"
              imageHint="grapes bunch"
              bgColor="#eaf4f4"
            />
          </div>
        </section>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 bg-white p-6 border-l border-gray-100">
        <div className="flex justify-end items-center mb-6">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span>Tue, 24 Nov 2021</span>
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <Card className="bg-primary text-primary-foreground p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-24">
              <Image
                src="https://picsum.photos/seed/bottle/100/200"
                alt="Water bottle"
                width={100}
                height={200}
                className="object-contain"
                data-ai-hint="water bottle"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">Stay Hydrated and beat heat.</h3>
            </div>
          </div>
        </Card>

        <Card className="bg-primary/90 text-primary-foreground p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Intake Goal</p>
              <p className="text-xl font-bold">
                {totalIntake} ml / {goal} ml
              </p>
            </div>
            <Droplets className="w-8 h-8 opacity-50" />
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Drink Log</CardTitle>
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="max-h-60 overflow-y-auto">
            {logs.map((log) => (
              <DrinkLogItem key={log.id} log={log} />
            ))}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
