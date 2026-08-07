import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    // Fetch user's bookings and inquiries
    const bookings = await db.booking.findMany({
      where: { customerEmail: currentUser.email },
      orderBy: { createdAt: 'desc' },
    });

    const inquiries = await db.inquiry.findMany({
      where: { email: currentUser.email },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      authenticated: true,
      user: currentUser,
      bookings,
      inquiries,
    });
  } catch (error: any) {
    return NextResponse.json({ authenticated: false, error: error?.message });
  }
}
