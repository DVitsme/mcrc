"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useParams } from "next/navigation"
import { Profile } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, Phone, Calendar, Languages, Briefcase } from "lucide-react"
import Link from "next/link"

export default function UserDetailsPage() {
  const [user, setUser] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const userId = params.id as string

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (error) {
          console.error('Error fetching user:', error.message)
          return
        }

        setUser(profile)
      } catch (error) {
        console.error('Error in fetchUser:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
          <Link href="/dashboard/users">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Users
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/dashboard/users">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {/* User Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{user.full_name}</CardTitle>
                <CardDescription className="mt-2">
                  <Badge variant={user.is_active ? "default" : "destructive"}>
                    {user.is_active ? "Active" : "Inactive"}
                  </Badge>
                </CardDescription>
              </div>
              <Button>Edit Profile</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  {user.email}
                </div>
                {user.phone_number && (
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="mr-2 h-4 w-4" />
                    {user.phone_number}
                  </div>
                )}
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  Joined {new Date(user.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-muted-foreground">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Role: {user.role}
                </div>
                {user.languages_spoken && user.languages_spoken.length > 0 && (
                  <div className="flex items-center text-muted-foreground">
                    <Languages className="mr-2 h-4 w-4" />
                    {user.languages_spoken.join(", ")}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills and Expertise */}
        {user.skills && user.skills.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Case Preferences */}
        {user.preferred_case_types && user.preferred_case_types.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Preferred Case Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.preferred_case_types.map((type, index) => (
                  <Badge key={index} variant="outline">
                    {type}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bio */}
        {user.bio && (
          <Card>
            <CardHeader>
              <CardTitle>Bio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{user.bio}</p>
            </CardContent>
          </Card>
        )}

        {/* Contact Preferences */}
        {user.contact_preferences && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(user.contact_preferences).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-muted-foreground capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <Badge variant="outline">
                      {value ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 