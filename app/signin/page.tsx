'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { FcGoogle } from "react-icons/fc";
import { AuthError } from '@supabase/supabase-js'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Redirect to dashboard on successful login
      router.push('/dashboard')
    } catch (error) {
      const authError = error as AuthError
      setError(authError.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      if (error) throw error
    } catch (error) {
      const authError = error as AuthError
      setError(authError.message)
    }
  }

  return (
    <section className="py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2">
          <div className="py-10">
            <div className="mx-auto my-auto flex h-full w-full max-w-md flex-col justify-center gap-4 p-6">
              <div className="flex flex-col pb-6">
                <p className="mb-2 text-3xl font-bold">Sign In</p>
                <p className="text-muted-foreground">
                  Welcome back to MCRC
                </p>
              </div>
              <div className="w-full rounded-md bg-background">
                <div>
                  {error && (
                    <div className="mb-4 p-3 text-sm text-white bg-red-500 rounded-md">
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          required
                        />
                      </div>

                      <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </div>
                  </form>
                  <Button variant="outline" className="w-full mt-4" onClick={handleGoogleSignIn}>
                    <FcGoogle className="mr-2 size-5" />
                    Sign in with Google
                  </Button>
                </div>
              </div>
              <div className="mx-auto mt-3 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>Don't have an account?</p>
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </div>
              <div className="mx-auto flex justify-center">
                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </div>

          <img
            src="https://shadcnblocks.com/images/block/placeholder-1.svg"
            alt="placeholder"
            className="hidden h-full max-h-screen object-cover lg:block"
          />
        </div>
      </div>
    </section>
  );
} 