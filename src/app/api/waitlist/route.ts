import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const EmailSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parseResult = EmailSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    const { email } = parseResult.data;

    const { error } = await supabase.from('waitlist').insert([{ email }]);
    if (error) {
      if (error.code === '23505') { // unique_violation
        return NextResponse.json({ error: 'Email already on waitlist' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 