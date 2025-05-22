import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

// Define protected routes and their required roles
const PROTECTED_ROUTES = {
  '/dashboard/users': ['coordinator'],
  '/dashboard/events-management': ['coordinator'],
  '/dashboard/blog-management': ['coordinator'],
  '/dashboard/reports': ['coordinator'],
  '/dashboard/cases': ['coordinator', 'mediator', 'participant'],
  '/dashboard/profile': ['coordinator', 'mediator', 'participant'],
  '/dashboard/settings': ['coordinator', 'mediator', 'participant'],
} as const

// Define public routes that don't require authentication
const PUBLIC_ROUTES = ['/signin', '/signup', '/', '/about', '/contact']

export async function middleware(request: NextRequest) {
  console.log('Middleware executing for path:', request.nextUrl.pathname)

  // Prepare a single response object to mutate
  const response = NextResponse.next({
    request: { headers: request.headers },
  })

  // Supabase SSR client: read from request.cookies; write via response.cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => {
          return request.cookies.get(name)?.value
        },
        set: (name: string, value: string, options: CookieOptions) => {
          response.cookies.set({ name, value, ...options })
        },
        remove: (name: string, options: CookieOptions) => {
          response.cookies.delete({ name, ...options })
        },
      },
      cookieOptions: {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      },
    }
  )

  try {
    const path = request.nextUrl.pathname

    // Handle public routes first
    if (PUBLIC_ROUTES.includes(path)) {
      // For auth pages (signin/signup), check if user is already authenticated
      if (['/signin', '/signup'].includes(path)) {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('Middleware: Session error:', sessionError.message)
          // Clear any invalid session cookies
          response.cookies.delete('sb-dgueacxqidptazdmgdvq-auth-token')
          return response
        }

        if (session?.user) {
          // Verify the user's profile is active
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('is_active')
            .eq('id', session.user.id)
            .single()

          if (profileError || !profile?.is_active) {
            // Clear invalid session
            response.cookies.delete('sb-dgueacxqidptazdmgdvq-auth-token')
            return response
          }

          const url = new URL('/dashboard', request.url)
          url.searchParams.set('toast', 'You are already signed in')
          url.searchParams.set('toastType', 'info')
          return NextResponse.redirect(url)
        }
      }
      return response
    }

    // For all other routes, check authentication
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      console.error('Middleware: Session error:', sessionError.message)
      // Clear any invalid session cookies
      response.cookies.delete('sb-dgueacxqidptazdmgdvq-auth-token')
      const url = new URL('/signin', request.url)
      url.searchParams.set('toast', 'Your session has expired. Please sign in again.')
      url.searchParams.set('toastType', 'warning')
      return NextResponse.redirect(url)
    }

    // If not authenticated and trying to access protected route, redirect to signin
    if (!session?.user && path.startsWith('/dashboard')) {
      const url = new URL('/signin', request.url)
      url.searchParams.set('redirect', path)
      url.searchParams.set('toast', 'Please sign in to access this page')
      url.searchParams.set('toastType', 'warning')
      return NextResponse.redirect(url)
    }

    // If authenticated, check profile and permissions
    if (session?.user && path.startsWith('/dashboard')) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, is_active')
        .eq('id', session.user.id)
        .single()

      if (profileError) {
        console.error('Middleware: profile fetch error:', profileError.message)
        throw profileError
      }

      // Check if user profile exists and is active
      if (!profile || !profile.is_active) {
        // Clear invalid session
        response.cookies.delete('sb-dgueacxqidptazdmgdvq-auth-token')
        const url = new URL('/signin', request.url)
        url.searchParams.set('toast', 'Your account is not active. Please contact support.')
        url.searchParams.set('toastType', 'error')
        return NextResponse.redirect(url)
      }

      // Check role-based access for specific routes
      for (const [route, allowedRoles] of Object.entries(PROTECTED_ROUTES)) {
        if (path.startsWith(route)) {
          if (!allowedRoles.includes(profile.role)) {
            const url = new URL('/dashboard', request.url)
            url.searchParams.set('toast', 'You do not have permission to access this page')
            url.searchParams.set('toastType', 'error')
            return NextResponse.redirect(url)
          }
          break
        }
      }
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    // On error, redirect to signin with error message
    const url = new URL('/signin', request.url)
    url.searchParams.set('toast', 'An error occurred. Please try again.')
    url.searchParams.set('toastType', 'error')
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/signin',
    '/signup',
    '/profile/:path*',
    '/settings/:path*',
  ],
}
