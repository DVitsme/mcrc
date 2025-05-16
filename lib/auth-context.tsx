'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
            document.cookie = `${name}=${value}; path=${options.path || '/'}; max-age=${options.maxAge || 3600}`
          },
          remove: (name, options) => {
            document.cookie = `${name}=; path=${options.path || '/'}; max-age=0`
          }
        }
      }
    )

    const getInitialSession = async () => {
      try {
        console.log('AuthProvider: Getting initial session...')
        const { data: { session: initialSession }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('AuthProvider: Error getting initial session:', error)
          return
        }

        if (initialSession) {
          console.log('AuthProvider: Initial session found:', initialSession)
          setSession(initialSession)
          setUser(initialSession.user)
        } else {
          console.log('AuthProvider: No initial session found, trying to refresh...')
          const { data: { session: refreshedSession }, error: refreshError } = await supabase.auth.refreshSession()

          if (refreshError) {
            console.error('AuthProvider: Error refreshing session:', refreshError)
            return
          }

          if (refreshedSession) {
            console.log('AuthProvider: Refreshed session found:', refreshedSession)
            setSession(refreshedSession)
            setUser(refreshedSession.user)
          } else {
            console.log('AuthProvider: No session found after refresh')
          }
        }
      } catch (error) {
        console.error('AuthProvider: Unexpected error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('AuthProvider: Auth state changed', _event, session)
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

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