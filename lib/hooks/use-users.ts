'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { Profile } from '@/lib/auth-context'

type UserRole = 'participant' | 'mediator' | 'coordinator'

interface UseUsersOptions {
  roles?: UserRole[]
  isAvailable?: boolean
  searchQuery?: string
}

interface UseUsersReturn {
  users: Profile[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
  getUsersByRole: (role: UserRole) => Profile[]
  getAvailableMediators: () => Profile[]
  getCoordinators: () => Profile[]
}

export function useUsers(options: UseUsersOptions = {}): UseUsersReturn {
  const [users, setUsers] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      let query = supabase
        .from('profiles')
        .select('*')
        .order('full_name')

      // Apply role filters if specified
      if (options.roles?.length) {
        query = query.in('role', options.roles)
      }

      // Apply availability filter if specified
      if (options.isAvailable !== undefined) {
        query = query.eq('is_available_for_new_cases', options.isAvailable)
      }

      const { data, error: supabaseError } = await query

      if (supabaseError) {
        throw supabaseError
      }

      setUsers(data || [])
    } catch (err) {
      console.error('Error fetching users:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch users'))
    } finally {
      setIsLoading(false)
    }
  }, [options.roles, options.isAvailable])

  // Initial fetch
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // Memoized filtered users based on search query
  const filteredUsers = useMemo(() => {
    if (!options.searchQuery) return users

    const query = options.searchQuery.toLowerCase()
    return users.filter(user =>
      user.full_name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    )
  }, [users, options.searchQuery])

  // Helper functions for common use cases
  const getUsersByRole = useCallback((role: UserRole) => {
    return users.filter(user => user.role === role)
  }, [users])

  const getAvailableMediators = useCallback(() => {
    return users.filter(user =>
      user.role === 'mediator' &&
      user.is_available_for_new_cases
    )
  }, [users])

  const getCoordinators = useCallback(() => {
    return getUsersByRole('coordinator')
  }, [getUsersByRole])

  return {
    users: filteredUsers,
    isLoading,
    error,
    refetch: fetchUsers,
    getUsersByRole,
    getAvailableMediators,
    getCoordinators,
  }
} 