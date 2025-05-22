/**
 * Users Dashboard Page
 * 
 * This page displays user management functionality, including user lists,
 * roles, and management controls.
 */

"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { DataTable } from "@/components/dashboard-components/data-table"
import { z } from "zod"
import { useAuth } from "@/lib/auth-context"
import { Profile } from "@/lib/auth-context"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { User } from "@/lib/auth-context"

// Define the user schema for the DataTable
const userSchema = z.object({
  id: z.number(),
  header: z.string(), // full_name
  type: z.string(), // role
  status: z.string(), // is_active
  target: z.string(), // email
  limit: z.string(), // role-based access
  reviewer: z.string(), // assigned coordinator
  skills: z.array(z.string()).optional(), // user skills
})

type UserTableData = z.infer<typeof userSchema>

export default function UsersPage() {
  const [users, setUsers] = useState<UserTableData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { profile } = useAuth()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // Fetch profiles with all necessary fields
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching users:', error.message)
          return
        }

        // Transform the profiles data to match our DataTable schema
        const transformedUsers: UserTableData[] = profiles.map((profile: Profile, index: number) => ({
          id: index + 1,
          header: profile.full_name || 'Unnamed User',
          type: profile.role,
          status: profile.is_active ? 'Active' : 'Inactive',
          target: profile.email || 'No email',
          limit: profile.role === 'coordinator' ? 'Unlimited' : 'Standard',
          reviewer: profile.role === 'coordinator' ? 'System' : 'Coordinator',
          skills: profile.skills || [],
        }))

        setUsers(transformedUsers)
      } catch (error) {
        console.error('Error in fetchUsers:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase()
    return (
      user.header.toLowerCase().includes(searchLower) ||
      user.skills?.some(skill => skill.toLowerCase().includes(searchLower))
    )
  })

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6 px-4">Users</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6 px-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <DataTable data={filteredUsers} />
    </div>
  )
} 