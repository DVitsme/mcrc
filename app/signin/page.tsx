'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { FcGoogle } from "react-icons/fc";
import { AuthError } from '@supabase/supabase-js'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import Image from 'next/image';

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get('redirect') || '/dashboard'
  const supabaseRef = useRef<ReturnType<typeof createBrowserClient> | null>(null)

  useEffect(() => {
    supabaseRef.current = createBrowserClient(
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

    // Check if already logged in
    const checkSession = async () => {
      if (!supabaseRef.current) return
      const { data: { session } } = await supabaseRef.current.auth.getSession();
      if (session) {
        console.log('Signin.tsx useEffect: Already has session, redirecting to', redirectPath);
        router.push(redirectPath);
      }
    };
    checkSession();
  }, [redirectPath, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabaseRef.current) return;
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { data, error } = await supabaseRef.current.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log('Signin.tsx: Successfully signed in:', data);
      router.push(redirectPath);

    } catch (error: unknown) {
      if (error instanceof AuthError) {
        setError(error.message || 'An unexpected error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!supabaseRef.current) return;
    try {
      const { error } = await supabaseRef.current.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(redirectPath)}`
        }
      });
      if (error) throw error;
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

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
                <p>Don&apos;t have an account?</p>
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

          <Image
            src="https://shadcnblocks.com/images/block/placeholder-1.svg"
            alt="placeholder"
            className="hidden h-full max-h-screen object-cover lg:block"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
} 