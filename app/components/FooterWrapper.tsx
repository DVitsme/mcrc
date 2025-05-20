'use client'

import { usePathname } from 'next/navigation'
import { Footer } from '@/components/blocks/Footer'

export function FooterWrapper() {
  const pathname = usePathname()
  const isDashboardRoute = pathname?.startsWith('/dashboard')

  if (isDashboardRoute) {
    return null
  }

  return <Footer />
} 