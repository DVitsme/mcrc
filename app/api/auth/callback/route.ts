// app/api/auth/callback/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // If 'next' is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'; // Default to dashboard

  if (code) {
    // Create a response object that we can modify
    const response = NextResponse.redirect(`${origin}${next}`);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            response.cookies.set({ name, value: '', ...options });
          },
        },
        cookieOptions: {
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true, // Important for server-set auth cookies
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Error exchanging code for session:', error);
      // Optionally, redirect to an error page or signin page with an error message
      const errorRedirectUrl = new URL('/signin', origin);
      errorRedirectUrl.searchParams.set('error', 'OAuth authentication failed. Please try again.');
      errorRedirectUrl.searchParams.set('error_description', error.message);
      return NextResponse.redirect(errorRedirectUrl);
    }

    // If successful, exchangeCodeForSession will have called the `cookies.set`
    // handler internally, so the `response` object now has the Set-Cookie headers.
    console.log('OAuth callback successful, redirecting to:', next);
    return response; // This response includes the Set-Cookie headers
  }

  // If no code is present, redirect to an error page or home
  console.error('OAuth callback: No code found in query parameters.');
  const fallbackRedirectUrl = new URL('/signin', origin);
  fallbackRedirectUrl.searchParams.set('error', 'OAuth callback error: No authorization code provided.');
  return NextResponse.redirect(fallbackRedirectUrl);
}
