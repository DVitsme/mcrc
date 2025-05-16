// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  console.log('Middleware executing for path:', request.nextUrl.pathname);
  // Log all incoming cookies before doing anything else
  // console.log('RAW Incoming cookies in middleware:', request.cookies.getAll());


  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response.cookies.set({ name, value: '', ...options });
        },
      },
      cookieOptions: {
        // REMOVED: name: 'sb-auth-token', // Let Supabase use its default cookie name
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true, // Good practice to include this
      },
      // If you have a custom JWT secret in Supabase project settings, add it here:
      // auth: {
      //   jwtSecret: process.env.SUPABASE_JWT_SECRET,
      // }
    }
  );

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    // Log the error but don't necessarily stop if it's just "Auth session missing!"
    // as that's expected if the cookie is invalid or not present.
    console.error('Middleware: Error fetching user (or session missing):', userError.message);
  }

  const allCookiesFromRequest = request.cookies.getAll().map(c => `${c.name}=${c.value ? 'present' : 'empty/not_found'}`);
  console.log('Middleware - Auth state:', {
    hasUser: !!user,
    userId: user?.id,
    path: request.nextUrl.pathname,
    cookiesPresentInRequest: allCookiesFromRequest
  });

  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('Middleware: No user session, redirecting to /signin from path:', request.nextUrl.pathname);
    const redirectUrl = new URL('/signin', request.url);
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup')) {
    console.log('Middleware: User session exists, redirecting to /dashboard from path:', request.nextUrl.pathname);
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/signin',
    '/signup',
  ],
};
