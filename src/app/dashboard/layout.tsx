'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Droplet, LayoutDashboard, CalendarClock, LineChart, Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import { useAuth, useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/login');
    }
  };

  if (isUserLoading || !user) {
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
                {children}
            </main>
        </div>
    )
  }

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard />, href: '/dashboard' },
    { name: 'Schedule Reminder', icon: <CalendarClock />, href: '/dashboard/schedule' },
    { name: 'Reports', icon: <LineChart />, href: '/dashboard/reports' },
    { name: 'Notifications', icon: <Bell />, href: '/dashboard/notifications' },
    { name: 'Settings', icon: <Settings />, href: '/dashboard/settings' },
  ];

  return (
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
                    <Link 
                        key={item.name} 
                        href={item.href} 
                        className={cn(
                            "flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-primary transition-colors",
                            pathname === item.href && "bg-blue-50 text-primary font-semibold"
                        )}
                    >
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
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
            {children}
        </main>
      </div>
  );
}
