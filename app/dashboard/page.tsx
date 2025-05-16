'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, User, Users, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'

interface Profile {
  id: string
  full_name: string
  role: 'coordinator' | 'mediator' | 'participant'
  is_active: boolean
  skills?: string[]
  preferred_case_types?: string[]
  languages_spoken?: string[]
  is_available_for_new_cases?: boolean
  created_at: string
}

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    let isMounted = true

    const fetchProfile = async () => {
      try {
        console.log('Dashboard: Fetching user data...')
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('Dashboard: Session error:', sessionError.message)
          if (isMounted) {
            setError(sessionError.message)
            setLoading(false)
          }
          return
        }

        console.log('Dashboard: Session state:', {
          hasSession: !!session,
          userId: session?.user?.id,
          userEmail: session?.user?.email,
          expiresAt: session?.expires_at
        })

        if (!session?.user) {
          console.log('Dashboard: No authenticated user found')
          if (isMounted) {
            setError('Not authenticated')
            setLoading(false)
          }
          return
        }

        console.log('Dashboard: User authenticated, fetching profile...')
        const { data, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profileError) {
          console.error('Dashboard: Profile error:', profileError.message)
          if (isMounted) {
            setError(profileError.message)
            setLoading(false)
          }
          return
        }

        console.log('Dashboard: Profile data received:', data ? 'success' : 'null')
        if (isMounted) {
          setProfile(data)
          setLoading(false)
        }
      } catch (error) {
        console.error('Dashboard: Unexpected error in fetchProfile:', error)
        if (isMounted) {
          setError('An unexpected error occurred')
          setLoading(false)
        }
      }
    }

    fetchProfile()

    return () => {
      isMounted = false
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/');
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">MCRC Dashboard</h1>
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-1/3 mb-1" />
                    <Skeleton className="h-5 w-1/2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-1/3 mb-1" />
                    <Skeleton className="h-5 w-1/2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>{error || 'Authentication Error'}</CardTitle>
            <CardDescription>
              {error
                ? 'There was a problem loading your dashboard'
                : 'Please sign in to access your dashboard'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Go to homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">MCRC Dashboard</h1>
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Name</div>
                <div>{profile.full_name}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Role</div>
                <div className="capitalize">{profile.role}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Account Status</div>
                <div>{profile.is_active ? 'Active' : 'Inactive'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Joined</div>
                <div>{new Date(profile.created_at).toLocaleDateString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {profile.role === 'mediator' && (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Mediator Profile
                </CardTitle>
                <CardDescription>Your mediator details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Skills</div>
                    <div>{profile.skills?.length ? profile.skills.join(', ') : 'No skills added'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Languages</div>
                    <div>{profile.languages_spoken?.join(', ') || 'English'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Case Types</div>
                    <div>{profile.preferred_case_types?.length ? profile.preferred_case_types.join(', ') : 'No preferences set'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Available for New Cases</div>
                    <div>{profile.is_available_for_new_cases ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Availability
                </CardTitle>
                <CardDescription>Manage your schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="mb-4">Set your unavailable dates to manage your schedule</p>
                  <Button variant="outline" className="w-full">Manage Availability</Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {profile.role === 'coordinator' && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Access coordinator tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">View All Users</Button>
                <Button variant="outline" className="w-full">Manage Cases</Button>
                <Button variant="outline" className="w-full">System Settings</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
