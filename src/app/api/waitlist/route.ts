import { NextResponse } from 'next/server';
import { db } from '@/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { z } from 'zod';

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

    // Check if email already exists
    const waitlistRef = collection(db, 'waitlist');
    const q = query(waitlistRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return NextResponse.json({ error: 'Email already on waitlist' }, { status: 409 });
    }

    // Add email to waitlist
    await addDoc(waitlistRef, { 
      email,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 