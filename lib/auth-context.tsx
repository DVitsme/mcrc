// lib/auth-context.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean // Indicates if initial auth check is complete
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true, // Start with isLoading true
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Initial auth check is loading

  useEffect(() => {
    // Initialize the Supabase client for the browser
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          // Browser-specific cookie handlers
          get: (name) => {
            const cookie = document.cookie
              .split('; ')
              .find((row) => row.startsWith(`${name}=`))
            return cookie ? cookie.split('=')[1] : undefined
          },
          set: (name, value, options) => {
            // Construct cookie string carefully
            let cookieString = `${name}=${value}; path=${options.path || '/'}; max-age=${options.maxAge || 3600}`;
            if (options.domain) cookieString += `; domain=${options.domain}`;
            if (options.secure) cookieString += `; secure`;
            if (options.sameSite) cookieString += `; samesite=${options.sameSite}`;
            document.cookie = cookieString;
          },
          remove: (name, options) => {
            let cookieString = `${name}=; path=${options.path || '/'}; max-age=0`;
            if (options.domain) cookieString += `; domain=${options.domain}`;
            // Secure and SameSite typically not needed for deletion but can be included
            document.cookie = cookieString;
          }
        }
      }
    )

    const getInitialSession = async () => {
      try {
        console.log('AuthProvider: Attempting to get initial session...');
        // Attempt to get the current session from cookies/localStorage
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          // This indicates an error with the getSession() call itself (e.g., network issue)
          console.error('AuthProvider: Error from supabase.auth.getSession():', sessionError.message);
          // We couldn't determine session state due to an error, but we are done loading.
        } else if (sessionData.session) {
          // An active session was found directly
          console.log('AuthProvider: Initial session found directly for user:', sessionData.session.user.id);
          setSession(sessionData.session);
          setUser(sessionData.session.user);
        } else {
          // No active session found by getSession(), try to refresh
          // This is normal if only a refresh token cookie exists.
          console.log('AuthProvider: No direct session from getSession(), trying refreshSession()...');
          const { data: refreshedData, error: refreshError } = await supabase.auth.refreshSession();

          if (refreshError) {
            // refreshSession() returned an error. This is common if no valid refresh token exists
            // (e.g., user is not logged in, or refresh token is expired/invalid).
            // This is not a critical failure of the AuthProvider, but an expected auth state.
            console.info('AuthProvider: refreshSession() did not establish a session (this is normal if not logged in or refresh token invalid):', refreshError.message);
          } else if (refreshedData.session) {
            // Session was successfully refreshed
            console.log('AuthProvider: Session refreshed successfully for user:', refreshedData.session.user.id);
            setSession(refreshedData.session);
            setUser(refreshedData.session.user);
          } else {
            // No session after getSession(), and no session after refreshSession(), and no errors from those calls.
            // This is the definitive "user is not logged in" state.
            console.log('AuthProvider: No session found after getSession and refreshSession attempts.');
          }
        }
      } catch (e: Error | unknown) {
        // Catch any unexpected synchronous errors or unhandled promise rejections from the above logic
        console.error('AuthProvider: Unexpected error in getInitialSession logic:', e instanceof Error ? e.message : 'Unknown error');
      } finally {
        // This ALWAYS runs, ensuring isLoading is set to false after initial attempts.
        // The app can now render based on whether 'user' is null or populated.
        console.log('AuthProvider: getInitialSession finished. isLoading is now false.');
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen to auth state changes (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      console.log('AuthProvider: onAuthStateChange event:', _event, 'session:', currentSession ? currentSession.user.id : null);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      // If the event is SIGNED_IN or TOKEN_REFRESHED and isLoading was true,
      // it might be a good idea to ensure isLoading is false.
      // However, getInitialSession's finally block should already handle this for the initial load.
      if (isLoading && (_event === 'SIGNED_IN' || _event === 'INITIAL_SESSION' || _event === 'TOKEN_REFRESHED')) {
        setIsLoading(false);
      }
      if (_event === 'SIGNED_OUT' && isLoading) {
        setIsLoading(false); // Ensure loading is false on sign out if initial check was still pending
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [isLoading]); // Added isLoading to dependency array for the onAuthStateChange effect's setIsLoading logic

  return (
    <AuthContext.Provider value={{ user, session, isLoading }}>
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
