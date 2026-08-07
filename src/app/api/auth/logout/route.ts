import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully!',
  });

  // Clear HTTP-Only Cookie
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}
