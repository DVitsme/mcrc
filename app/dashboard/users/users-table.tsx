'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import type { Profile } from '@/lib/auth-context'
import { useUsers } from '@/lib/hooks/use-users'

export function UsersTable() {
  const [userToDelete, setUserToDelete] = useState<Profile | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const {
    users,
    isLoading,
    error,
    refetch,
  } = useUsers({
    searchQuery,
  })

  const handleDelete = async (user: Profile) => {
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id)

      if (error) {
        throw error
      }

      toast.success('User deleted successfully')
      refetch() // Refresh the users list
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    } finally {
      setUserToDelete(null)
    }
  }

  if (error) {
    return (
      <div className="rounded-md border p-4">
        <p className="text-destructive">Error loading users: {error.message}</p>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Dont forget to add a search bar and in it, it needs to search by name and email, and skills. Also work in a calendar for availability</h1>
      <p>Finish User crud functionality</p>
      <p>Sheets for that crud functionality</p>
      <p>Found shadcn dashboard. figure out if it worth the time. making it smaller is really nice!</p>

      <p>Also we were trying to get step 4 to happen by getting profiile email to update when auth email gets updated.</p>
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <div className="h-12 border-b px-4 flex items-center justify-between">
          <h2 className="font-semibold">All Users</h2>
          <p className="text-sm text-muted-foreground">
            {users.length} {users.length === 1 ? 'user' : 'users'}
          </p>
        </div>
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 flex items-center justify-between border-b last:border-0"
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user.avatar_url || undefined} />
                <AvatarFallback>
                  {user.full_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.full_name}</p>
                <p className="text-sm text-muted-foreground">{user.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  // TODO: Implement edit functionality
                  toast.info('Edit functionality coming soon')
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setUserToDelete(user)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              {userToDelete?.full_name ? ` ${userToDelete.full_name}` : ''} and all
              their data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => userToDelete && handleDelete(userToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 