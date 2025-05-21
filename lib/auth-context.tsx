// lib/auth-context.tsx
'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type UserRole = 'coordinator' | 'mediator' | 'participant';

export interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole;
  skills: string[] | null;
  preferred_case_types: string[] | null;
  languages_spoken: string[] | null;
  is_available_for_new_cases: boolean | null;
  contact_preferences: JsonValue | null;
  bio: string | null;
  avatar_url: string | null;
  is_active: boolean;
  email: string | null;
  opt_in_new_case_notifications: boolean | null;
  phone_number: string | null;
  age: number | null;
  race_ethnicity: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  isLoading: boolean
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  refreshProfile: async () => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Initialize isLoading to true

  // Initialize the Supabase client (ensure no custom 'cookies' object here)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('AuthProvider: Error fetching profile:', error.message)
        setProfile(null)
      } else {
        setProfile(profileData as Profile)
        console.log('AuthProvider: Profile fetched successfully for user:', userId);
      }
    } catch (error) {
      console.error('AuthProvider: Unexpected error fetching profile:', error)
      setProfile(null)
    }
  }, [supabase])

  const refreshProfile = useCallback(async () => {
    if (user) {
      console.log('AuthProvider: Refreshing profile for user:', user.id);
      await fetchProfile(user.id)
    } else {
      console.log('AuthProvider: Cannot refresh profile, no user.');
    }
  }, [user, fetchProfile])

  useEffect(() => {
    console.log('AuthProvider: useEffect running, subscribing to onAuthStateChange.');
    // isLoading is already true by default, no need to set it here.

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        console.log(
          `AuthProvider: onAuthStateChange event: ${_event}, Session User ID: ${currentSession?.user?.id ?? 'null'}`
        );

        if (_event === 'INITIAL_SESSION') {
          console.log('AuthProvider: Processing INITIAL_SESSION event.');
          if (currentSession) {
            setSession(currentSession);
            setUser(currentSession.user);
            console.log('AuthProvider: INITIAL_SESSION - User found, fetching profile for:', currentSession.user.id);
            await fetchProfile(currentSession.user.id);
          } else {
            setSession(null);
            setUser(null);
            setProfile(null);
            console.log('AuthProvider: INITIAL_SESSION - No user session.');
          }
          console.log('AuthProvider: INITIAL_SESSION - Setting isLoading to false.');
          setIsLoading(false);
        } else if (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED' || _event === 'USER_UPDATED') {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          if (currentSession?.user) {
            console.log(`AuthProvider: ${_event} - User found, fetching profile for:`, currentSession.user.id);
            await fetchProfile(currentSession.user.id);
          }
          // If INITIAL_SESSION hasn't fired or was null, this might be the first valid session.
          // Or if these events occur after initial loading.
          if (isLoading) {
            console.log(`AuthProvider: ${_event} - Setting isLoading to false as it was still true.`);
            setIsLoading(false);
          }
        } else if (_event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setProfile(null);
          console.log('AuthProvider: SIGNED_OUT - User signed out.');
          // Ensure loading is false if a sign out happens while initial loading might be perceived
          if (isLoading) {
            console.log('AuthProvider: SIGNED_OUT - Setting isLoading to false as it was still true.');
            setIsLoading(false);
          }
        }
      }
    );

    return () => {
      console.log('AuthProvider: Unsubscribing from onAuthStateChange.');
      subscription.unsubscribe();
    };
    // Key dependencies: supabase.auth for the subscription, fetchProfile for using it.
    // isLoading is not strictly needed as a dependency for the subscription setup itself,
    // but can be included if its changes within the callback are meant to re-evaluate something,
    // though usually the subscription itself is stable.
    // Let's keep it minimal to avoid potential loops from isLoading itself.
  }, [supabase, fetchProfile]);


  return (
    <AuthContext.Provider value={{ user, session, profile, isLoading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
