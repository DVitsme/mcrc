// app/api/auth/signin/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

type ErrorResponse = {
  message: string;
  status: number;
};

type ServerError = {
  message: string;
  stack?: string;
};

export async function POST(request: NextRequest) {
  console.log('API /api/auth/signin: Received POST request');
  let responseToClient: NextResponse;

  try {
    const body = await request.json();
    const email = body.email as string;
    const password = body.password as string;

    console.log('API /api/auth/signin: Parsed body:', { emailProvided: !!email, passwordProvided: !!password });

    if (!email || !password) {
      console.log('API /api/auth/signin: Email or password missing in request body');
      const errorResponse: ErrorResponse = {
        message: 'Email and password are required',
        status: 400
      };
      return NextResponse.json(errorResponse, { status: errorResponse.status });
    }

    // Create an initial response object. Supabase client will add cookies to this.
    // We'll construct the final JSON body later.
    const supabaseResponseCookies = NextResponse.next();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            console.log(`API /api/auth/signin: supabase.cookies.set called for ${name}`);
            supabaseResponseCookies.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            console.log(`API /api/auth/signin: supabase.cookies.remove called for ${name}`);
            supabaseResponseCookies.cookies.set({ name, value: '', ...options });
          },
        },
        cookieOptions: {
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true, // Server-side can set HttpOnly cookies
        },
      }
    );

    console.log('API /api/auth/signin: Attempting supabase.auth.signInWithPassword...');
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (signInError) {
      console.error('API /api/auth/signin: Supabase signInWithPassword error:', signInError.message, 'Status:', signInError.status);
      // Return a JSON response with the error details from Supabase
      const errorResponse: ErrorResponse = {
        message: signInError.message,
        status: signInError.status || 401
      };
      return NextResponse.json(errorResponse, { status: errorResponse.status });
    }

    console.log('API /api/auth/signin: signInWithPassword successful. User ID:', data.user?.id);
    // If successful, the `cookies.set` handler should have been called by Supabase
    // to add Set-Cookie headers to our `supabaseResponseCookies` object.

    // Construct the final success response with the user data and the cookies.
    responseToClient = NextResponse.json(
      {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email
        } : null,
        session: data.session
      },
      { status: 200 }
    );

    // Copy cookies from supabaseResponseCookies to the final responseToClient
    const cookies = supabaseResponseCookies.cookies.getAll();
    cookies.forEach((cookie) => {
      responseToClient.cookies.set(cookie.name, cookie.value, cookie);
    });

    return responseToClient;

  } catch (e: unknown) {
    const error = e as ServerError;
    console.error('API /api/auth/signin: Unhandled exception in POST handler:', error.message, error.stack);
    const errorResponse: ErrorResponse = {
      message: 'Internal Server Error',
      status: 500
    };
    return NextResponse.json(errorResponse, { status: errorResponse.status });
  }
}
