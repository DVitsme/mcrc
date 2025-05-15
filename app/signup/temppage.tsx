'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { FcGoogle } from "react-icons/fc";
import { AuthError } from '@supabase/supabase-js'
import Link from 'next/link'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define the user role type to match the enum in the database
type UserRole = 'coordinator' | 'mediator' | 'participant';

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState<UserRole>('participant')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    try {
      // 1. Create the auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role,
          },
        },
      })

      if (error) throw error

      if (data?.user) {
        // 2. Create the profile record
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: name,
            role,
            is_active: true,
            // Initialize mediator fields only if the role is mediator
            ...(role === 'mediator' ? {
              skills: [],
              preferred_case_types: [],
              languages_spoken: ['English'],
              is_available_for_new_cases: true
            } : {})
          })

        if (profileError) {
          console.error('Profile creation failed:', profileError)
          throw profileError
        }
      }

      alert('Check your email for the confirmation link!')
    } catch (error) {
      const authError = error as AuthError
      alert(authError.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
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
      alert(authError.message)
    }
  }

  return (
    <section className="py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2">
          <div className="py-10">
            <div className="mx-auto my-auto flex h-full w-full max-w-md flex-col justify-center gap-4 p-6">
              <div className="ite flex flex-col pb-6">
                <p className="mb-2 text-3xl font-bold">Signup</p>
                <p className="text-muted-foreground">
                  Start your 30-day free trial.
                </p>
              </div>
              <div className="w-full rounded-md bg-background">
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your name"
                          required
                        />
                      </div>

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

                      <div className="grid w-full max-w-sm gap-1.5">
                        <Label>I am a:</Label>
                        <RadioGroup
                          value={role}
                          onValueChange={(value) => setRole(value as UserRole)}
                          className="grid grid-cols-3 gap-4 pt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="participant" id="participant" />
                            <Label htmlFor="participant" className="cursor-pointer">Participant</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mediator" id="mediator" />
                            <Label htmlFor="mediator" className="cursor-pointer">Mediator</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="coordinator" id="coordinator" />
                            <Label htmlFor="coordinator" className="cursor-pointer">Coordinator</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Get Started'}
                      </Button>
                    </div>
                  </form>
                  <Button variant="outline" className="w-full mt-4" onClick={handleGoogleSignUp}>
                    <FcGoogle className="mr-2 size-5" />
                    Sign up with Google
                  </Button>
                </div>
              </div>
              <div className="mx-auto mt-3 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>Already have an account?</p>
                <Link
                  href="/signin"
                  className="font-medium text-primary hover:underline"
                >
                  Log in
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
};
