'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { AuthError } from '@supabase/supabase-js'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [isValidLink, setIsValidLink] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verify that we have a valid reset token in the URL
    const checkResetToken = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        setIsValidLink(false)
        setMessage({
          text: 'Invalid or expired password reset link. Please request a new one.',
          type: 'error'
        })
      } else {
        setIsValidLink(true)
      }
    }

    checkResetToken()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage({
        text: 'Passwords do not match',
        type: 'error'
      })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.updateUser({
        password
      })

      if (error) throw error

      setMessage({
        text: 'Your password has been updated successfully',
        type: 'success'
      })

      // Redirect to signin after a short delay
      setTimeout(() => {
        router.push('/signin')
      }, 2000)
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

  if (!isValidLink) {
    return (
      <section className="py-32">
        <div className="container mx-auto max-w-md">
          <div className="mx-auto my-auto flex w-full flex-col justify-center gap-4 p-6">
            <div className="flex flex-col items-center pb-6 text-center">
              <p className="mb-2 text-3xl font-bold">Invalid Reset Link</p>
              <div className="mt-4 p-3 text-sm bg-red-100 text-red-800 rounded-md">
                Invalid or expired password reset link. Please request a new one.
              </div>
              <Button className="mt-6" onClick={() => router.push('/forgot-password')}>
                Request New Reset Link
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32">
      <div className="container mx-auto max-w-md">
        <div className="mx-auto my-auto flex w-full flex-col justify-center gap-4 p-6">
          <div className="flex flex-col pb-6">
            <p className="mb-2 text-3xl font-bold">Reset Your Password</p>
            <p className="text-muted-foreground">
              Please enter a new password for your account
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
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 