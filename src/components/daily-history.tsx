"use client";

import type { FirebaseDrinkLog } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, GlassWater, Grape, Leaf, MoreVertical, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Timestamp } from "firebase/firestore";
import { ScrollArea } from "./ui/scroll-area";

type DailyHistoryProps = {
  logs: FirebaseDrinkLog[];
  isLoading: boolean;
  onDelete: (logId: string) => void;
};

const drinkIcons = {
  water: <GlassWater className="w-5 h-5 text-blue-500" />,
  coffee: <Coffee className="w-5 h-5 text-amber-800" />,
  tea: <Leaf className="w-5 h-5 text-green-600" />,
  juice: <Grape className="w-5 h-5 text-purple-600" />,
};

function LogItem({ log, onDelete }: { log: FirebaseDrinkLog, onDelete: (logId: string) => void; }) {
  // Defensive check for timestamp. Create a new variable, do not mutate props.
  const displayDate = log.timestamp instanceof Timestamp 
    ? log.timestamp.toDate() 
    : new Date();
  
  return (
    <div className={`flex items-center justify-between p-3 transition-all rounded-lg hover:bg-muted bg-card`}>
      <div className="flex items-center gap-3">
        {drinkIcons[log.drinkType]}
        <div>
          <p className="font-semibold text-foreground">{log.amount}ml <span className="capitalize text-muted-foreground font-normal">{log.drinkType}</span></p>
          <p className="text-xs text-muted-foreground">{format(displayDate, 'p')}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
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

export function DailyHistory({ logs, isLoading, onDelete }: DailyHistoryProps) {
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
    <Card className="bg-gray-50 rounded-2xl shadow-none border-none flex flex-col h-96">
      <CardHeader>
        <CardTitle>Today's Log</CardTitle>
        <CardDescription>A record of your hydration today.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        {logs.length === 0 ? (
          <div className="text-center py-8 h-full flex flex-col justify-center items-center">
            <p className="text-muted-foreground">No drinks logged yet today.</p>
            <p className="text-sm text-muted-foreground">Time to get hydrating!</p>
          </div>
        ) : (
          <ScrollArea className="h-full pr-4">
            <div className="space-y-1">
                {logs.map(log => (
                  <LogItem key={log.id} log={log} onDelete={onDelete} />
                ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
