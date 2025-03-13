// poblaria/next/app/api/submit-form/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Here you would typically save to a database or send an email
    console.log('Form submission received:', body);

    return NextResponse.json({ 
      success: true,
      message: 'Form submitted successfully' 
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error submitting form' },
      { status: 500 }
    );
  }
}