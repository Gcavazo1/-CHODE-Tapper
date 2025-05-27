import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Your Supabase client

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email;

    // Basic validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'Email is required and must be a string.' }, { status: 400 });
    }

    // More robust email validation (optional, but recommended)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Invalid email format.' }, { status: 400 });
    }

    // Insert into Supabase
    const { error } = await supabase
      .from('waitlist_entries')
      .insert([{ email: email }])
      .select(); // .select() is optional here, but can be useful for confirmation

    if (error) {
      console.error('Supabase waitlist insert error:', error);
      // Handle specific errors, e.g., unique constraint violation for email
      if (error.code === '23505') { // Code for unique violation in PostgreSQL
        return NextResponse.json({ message: 'This email is already on the Girth Waitlist!' }, { status: 409 }); // 409 Conflict
      }
      return NextResponse.json({ message: 'Error joining waitlist. Girth has encountered an obstacle.', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Successfully joined the Girth Waitlist! Prepare for monumental updates!' }, { status: 201 }); // 201 Created

  } catch (error: unknown) {
    console.error('Waitlist API general error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'An unexpected error occurred. The Girth is weak with this one.', error: errorMessage }, { status: 500 });
  }
}
 