import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // A simple query to test connection
    const { data, error } = await supabase.from('profiles').select('*').limit(1)

    if (error) {
      return NextResponse.json(
        { success: false, message: 'Failed to connect to Supabase', error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Supabase',
      version: data?.[0]?.version || 'Unknown'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error testing Supabase connection', error: String(error) },
      { status: 500 }
    )
  }
} 