import { NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await sendContactFormEmail(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 