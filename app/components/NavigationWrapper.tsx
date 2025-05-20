'use client'

import { usePathname } from 'next/navigation'
import { Navbar1 } from '@/components/blocks/Navbar1'

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboardRoute = pathname?.startsWith('/dashboard')

  return (
    <>
      {!isDashboardRoute && <Navbar1 />}
      {children}
    </>
  )
} 