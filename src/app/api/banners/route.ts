import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const banners = await db.banner.findMany({
      where: { isActive: true },
    });

    return NextResponse.json({
      success: true,
      banners: banners || [],
    });
  } catch (error: any) {
    console.error('Error in public banners API:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch banners' },
      { status: 500 }
    );
  }
}
