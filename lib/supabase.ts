import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Add this for server-side usage
export function createServerClient(cookieStore: ReturnType<typeof cookies>) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  })
} 