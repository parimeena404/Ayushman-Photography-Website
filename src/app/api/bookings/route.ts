import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const bookings = await db.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json({ success: true, bookings });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch bookings' }, { status: 500 });
  }
}
