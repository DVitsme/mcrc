import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Create a Supabase client configured to use cookies
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    }
  })

  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession()
  console.log('session', session)
  // Check auth condition
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    // Redirect to login page
    const redirectUrl = new URL('/signin', request.url)
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

// Specify the paths this middleware will run for
export const config = {
  matcher: [
    '/dashboard/:path*', // Match all dashboard routes
  ],
} 