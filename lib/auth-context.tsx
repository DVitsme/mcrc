// lib/auth-context.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

export interface Profile {
  id: string
  full_name: string | null
  role: string
  skills: string | null
  preferred_case_types: string | null
  languages_spoken: string | null
  is_available_for_new_cases: boolean | null
  contact_preferences: string | null
  bio: string | null
  avatar_url: string | null
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
  const [isLoading, setIsLoading] = useState(true)

  // Initialize the Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => {
          const cookie = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${name}=`))
          return cookie ? cookie.split('=')[1] : undefined
        },
        set: (name, value, options) => {
          let cookieString = `${name}=${value}; path=${options.path || '/'}; max-age=${options.maxAge || 3600}`;
          if (options.domain) cookieString += `; domain=${options.domain}`;
          if (options.secure) cookieString += `; secure`;
          if (options.sameSite) cookieString += `; samesite=${options.sameSite}`;
          document.cookie = cookieString;
        },
        remove: (name, options) => {
          let cookieString = `${name}=; path=${options.path || '/'}; max-age=0`;
          if (options.domain) cookieString += `; domain=${options.domain}`;
          document.cookie = cookieString;
        }
      }
    }
  )

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        setProfile(null)
      } else {
        setProfile(profileData)
      }
    } catch (error) {
      console.error('Unexpected error fetching profile:', error)
      setProfile(null)
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        console.log('AuthProvider: Attempting to get initial session...');
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('AuthProvider: Error from supabase.auth.getSession():', sessionError.message);
        } else if (sessionData.session) {
          console.log('AuthProvider: Initial session found directly for user:', sessionData.session.user.id);
          setSession(sessionData.session);
          setUser(sessionData.session.user);
          await fetchProfile(sessionData.session.user.id);
        } else {
          console.log('AuthProvider: No direct session from getSession(), trying refreshSession()...');
          const { data: refreshedData, error: refreshError } = await supabase.auth.refreshSession();

          if (refreshError) {
            console.info('AuthProvider: refreshSession() did not establish a session:', refreshError.message);
          } else if (refreshedData.session) {
            console.log('AuthProvider: Session refreshed successfully for user:', refreshedData.session.user.id);
            setSession(refreshedData.session);
            setUser(refreshedData.session.user);
            await fetchProfile(refreshedData.session.user.id);
          } else {
            console.log('AuthProvider: No session found after getSession and refreshSession attempts.');
          }
        }
      } catch (e: Error | unknown) {
        console.error('AuthProvider: Unexpected error in getInitialSession logic:', e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      console.log('AuthProvider: onAuthStateChange event:', _event, 'session:', currentSession ? currentSession.user.id : null);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        await fetchProfile(currentSession.user.id);
      } else {
        setProfile(null);
      }

      if (isLoading && (_event === 'SIGNED_IN' || _event === 'INITIAL_SESSION' || _event === 'TOKEN_REFRESHED')) {
        setIsLoading(false);
      }
      if (_event === 'SIGNED_OUT' && isLoading) {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isLoading]);

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
