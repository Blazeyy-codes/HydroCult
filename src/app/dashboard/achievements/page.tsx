'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Droplet, Zap, Star } from "lucide-react";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { cn } from "@/lib/utils";

type Achievement = {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
};

// This would typically be defined in a config file
const allAchievements: Achievement[] = [
    { id: 'first-log', title: 'First Drop', description: 'Log your first drink.', icon: <Droplet /> },
    { id: '3-day-streak', title: 'Streak Starter', description: 'Maintain a 3-day streak.', icon: <Zap /> },
    { id: '7-day-streak', title: 'Hydration Hero', description: 'Maintain a 7-day streak.', icon: <Trophy /> },
    { id: 'perfect-week', title: 'Perfect Week', description: 'Meet your goal every day for a week.', icon: <Star /> },
];

type UnlockedAchievement = {
    achievementId: string;
    unlockedAt: string;
}

export default function AchievementsPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const achievementsRef = useMemoFirebase(() => {
        if (!user) return null;
        return collection(firestore, `users/${user.uid}/achievements`);
    }, [firestore, user]);

    const { data: unlockedAchievements, isLoading } = useCollection<UnlockedAchievement>(achievementsRef);
    
    if (isLoading || isUserLoading) {
        return <AchievementsSkeleton />;
    }

    const unlockedIds = new Set(unlockedAchievements?.map(a => a.achievementId));

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
                <p className="text-sm text-muted-foreground mt-1">Celebrate your hydration milestones.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {allAchievements.map(ach => {
                    const isUnlocked = unlockedIds.has(ach.id);
                    return (
                        <Card 
                            key={ach.id}
                            className={cn(
                                "transition-all",
                                isUnlocked ? "border-green-500 shadow-lg" : "opacity-50"
                            )}
                        >
                            <CardContent className="p-6 text-center flex flex-col items-center">
                                <div className={cn(
                                    "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                                    isUnlocked ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                                )}>
                                    {ach.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">{ach.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{ach.description}</p>
                                {isUnlocked && <p className="text-xs font-semibold text-green-600 mt-4">UNLOCKED</p>}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}

function AchievementsSkeleton() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <header className="mb-8">
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-4 w-80 mt-2" />
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-6 text-center flex flex-col items-center">
                           <Skeleton className="w-16 h-16 rounded-full mb-4" />
                           <Skeleton className="h-6 w-32 mb-2" />
                           <Skeleton className="h-4 w-40" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
