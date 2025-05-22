'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { FcGoogle } from "react-icons/fc";
import { AuthError } from '@supabase/supabase-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Define the user role type to match the enum in the database
type UserRole = 'coordinator' | 'mediator' | 'participant';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState<UserRole>('participant')
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            role: role,
          },
        },
      })

      if (error) throw error;

      if (data?.user) {
        toast.success('Account created! Please check your email for a confirmation link.')
        // Redirect to sign-in page with a message
        router.push('/signin?toast=Please check your email to confirm your account&toastType=info')
      }
    } catch (error) {
      const authError = error as AuthError
      setError(authError.message)
      toast.error(authError.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setError(null)
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            role: role // Pass role as a query parameter
          }
        }
      })
      if (error) throw error
    } catch (error) {
      const authError = error as AuthError
      setError(authError.message)
      toast.error(authError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2">
          <div className="py-10">
            <div className="mx-auto my-auto flex h-full w-full max-w-md flex-col justify-center gap-4 p-6">
              <div className="ite flex flex-col pb-6">
                <p className="mb-2 text-3xl font-bold">Sign Up</p>
                <p className="text-muted-foreground">
                  Create your MCRC account to get started.
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

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
                          value={formData.name}
                          onChange={handleInputChange}
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
                          value={formData.email}
                          onChange={handleInputChange}
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
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
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
                        {isLoading ? 'Creating account...' : 'Create Account'}
                      </Button>
                    </div>
                  </form>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={handleGoogleSignUp}
                    disabled={isLoading}
                  >
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

          <Image
            src="/path/to/your/image.jpg"
            alt="Description"
            width={500}
            height={300}
            className="hidden h-full max-h-screen object-cover lg:block"
          />
        </div>
      </div>
    </section>
  );
};