'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, User, Users, Calendar } from 'lucide-react'
import Link from 'next/link'

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          throw new Error('Not authenticated')
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error

        setProfile(data)
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Not Authenticated</CardTitle>
            <CardDescription>Please sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
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
