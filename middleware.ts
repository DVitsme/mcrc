import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

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

  // Fetch the current user/session
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    console.error('Middleware: getUser error (or no session):', userError.message)
  }

  console.log('Middleware - Auth state:', {
    hasUser: !!user,
    userId: user?.id,
    path: request.nextUrl.pathname,
    cookies: request.cookies.getAll().map(c => c.name + '=' + (c.value ? '✓' : '✗')),
  })

  // Protect /dashboard/*
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = new URL('/signin', request.url)
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Prevent signed-in users from re-visiting auth pages
  if (user && ['/signin', '/signup'].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/signin',
    '/signup',
  ],
}
