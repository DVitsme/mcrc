'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { AuthError } from '@supabase/supabase-js'
import Link from 'next/link'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      setMessage({
        text: 'Check your email for the password reset link',
        type: 'success'
      })
    } catch (error) {
      const authError = error as AuthError
      setMessage({
        text: authError.message,
        type: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-32">
      <div className="container mx-auto max-w-md">
        <div className="mx-auto my-auto flex w-full flex-col justify-center gap-4 p-6">
          <div className="flex flex-col pb-6">
            <p className="mb-2 text-3xl font-bold">Reset Password</p>
            <p className="text-muted-foreground">
              Enter your email to receive a password reset link
            </p>
          </div>
          <div className="w-full rounded-md bg-background">
            <div>
              {message && (
                <div
                  className={`mb-4 p-3 text-sm rounded-md ${message.type === 'success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }`}
                >
                  {message.text}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="mx-auto mt-3 flex justify-center">
            <Link
              href="/signin"
              className="text-sm text-muted-foreground hover:text-primary hover:underline"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 