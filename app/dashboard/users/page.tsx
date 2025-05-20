'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { UsersTable } from './users-table'
import { UsersTableSkeleton } from './users-table-skeleton'

export default function UsersPage() {
  const { user, profile, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || profile?.role !== 'coordinator')) {
      router.push('/dashboard')
    }
  }, [isLoading, user, profile, router])

  if (isLoading) {
    return <UsersTableSkeleton />
  }

  if (!user || profile?.role !== 'coordinator') {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
      </div>
      <UsersTable />
    </div>
  )
}
