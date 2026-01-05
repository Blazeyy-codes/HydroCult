"use client";

import type { DrinkLog } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, GlassWater, Grape, Leaf, MoreVertical, RefreshCw, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

type DailyHistoryProps = {
  logs: DrinkLog[];
  isLoading: boolean;
  onRetry: (logId: string) => void;
  onDelete: (logId: string) => void;
};

const drinkIcons = {
  water: <GlassWater className="w-5 h-5 text-blue-500" />,
  coffee: <Coffee className="w-5 h-5 text-amber-800" />,
  tea: <Leaf className="w-5 h-5 text-green-600" />,
  juice: <Grape className="w-5 h-5 text-purple-600" />,
};

function LogItem({ log, onRetry, onDelete }: { log: DrinkLog, onRetry: (logId: string) => void; onDelete: (logId: string) => void; }) {
  const itemStyle = log.status === 'pending' ? 'opacity-50' : log.status === 'error' ? 'bg-red-50 border-red-200' : 'bg-card';
  
  return (
    <div className={`flex items-center justify-between p-3 transition-all rounded-lg hover:bg-muted ${itemStyle}`}>
      <div className="flex items-center gap-3">
        {drinkIcons[log.drinkType]}
        <div>
          <p className="font-semibold text-foreground">{log.amount}ml <span className="capitalize text-muted-foreground font-normal">{log.drinkType}</span></p>
          <p className="text-xs text-muted-foreground">{format(new Date(log.timestamp), 'p')}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {log.status === 'error' && <Button variant="ghost" size="icon" onClick={() => onRetry(log.id)} aria-label="Retry"><RefreshCw className="w-4 h-4 text-red-500" /></Button>}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="More options"><MoreVertical className="w-4 h-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onDelete(log.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export function DailyHistory({ logs, isLoading, onRetry, onDelete }: DailyHistoryProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-50 rounded-2xl shadow-none border-none">
      <CardHeader>
        <CardTitle>Today's Log</CardTitle>
        <CardDescription>A record of your hydration today.</CardDescription>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No drinks logged yet today.</p>
            <p className="text-sm text-muted-foreground">Time to get hydrating!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {logs.map(log => (
              <LogItem key={log.id} log={log} onRetry={onRetry} onDelete={onDelete} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
