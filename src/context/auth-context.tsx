'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleAuthStateChange = useCallback(
    (event: string, session: Session | null) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      const isAuthPage = ['/login', '/signup'].includes(pathname);

      if (event === 'SIGNED_IN' && isAuthPage) {
        router.push('/dashboard');
      }
      
      if (event === 'SIGNED_OUT' && pathname.startsWith('/dashboard')) {
        router.push('/login');
      }
    },
    [router, pathname]
  );

  useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
      
      // Handle initial load redirect
      if (!data.session && pathname.startsWith('/dashboard')) {
          router.push('/login');
      }
      if (data.session && ['/login', '/signup', '/'].includes(pathname)) {
          router.push('/dashboard');
      }
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthStateChange(event, session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router, pathname, handleAuthStateChange]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    signOut,
  };

  // Prevent flicker of content on page load
  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
