// components/AuthListener.tsx
'use client'; // This component uses hooks, so it's a Client Component

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Adjust path if necessary
import type { User, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation'; // Optional: for reacting to auth changes

export default function AuthListener() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter(); // Optional

  useEffect(() => {
    // Get initial session (important for when page loads with existing cookie)
    const getInitialSession = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      if (initialSession) {
        console.log('AuthListener: Initial session found on mount', initialSession);
        setSession(initialSession);
        setUser(initialSession.user);
      } else {
        console.log('AuthListener: No initial session on mount');
      }
    };
    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log('AuthListener: onAuthStateChange event:', event, 'newSession:', newSession);
      setSession(newSession);
      setUser(newSession?.user ?? null);

      // If user signs out, redirect to home or signin
      if (event === 'SIGNED_OUT') {
        router.push('/signin');
      }
      // Example: If user signs in, maybe refresh data or redirect
      // if (event === 'SIGNED_IN') {
      //    router.refresh(); // Or navigate to dashboard
      // }
    });

    console.log('My user and session:', user, session);
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]); // Add router if you use it inside useEffect

  // This component itself typically doesn't render anything visible directly in the layout.
  // Its purpose is to listen and potentially update a global state (e.g., via Context or Zustand)
  // or trigger navigations. For now, it just logs and manages its internal state.
  // If you want to make `user` or `session` globally available, you'd use React Context here.

  return null; // Or <></>
}
