import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const coupons = await db.coupon.findMany();
    return NextResponse.json({ success: true, coupons });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch coupons' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();
    const { code, discountType, discountValue, minOrderAmount, isActive, expiryDate } = body;
    if (!code || !String(code).trim()) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }
    const coupon = await db.coupon.create({
      data: {
        code: String(code).toUpperCase().trim(),
        discountType: discountType === 'FLAT' ? 'FLAT' : 'PERCENT',
        discountValue: Number(discountValue) || 10,
        minOrderAmount: Number(minOrderAmount) || 0,
        isActive: isActive !== false,
        expiryDate: expiryDate || undefined,
        usageCount: 0,
      },
    });
    return NextResponse.json({ success: true, message: 'Coupon created', coupon });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create coupon' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: 'Coupon ID required' }, { status: 400 });
    const updated = await db.coupon.update({ where: { id: String(id).trim() }, data });
    return NextResponse.json({ success: true, coupon: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to update coupon' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id || !id.trim()) return NextResponse.json({ error: 'Coupon ID required' }, { status: 400 });
    const deleted = await db.coupon.delete({ where: { id: id.trim() } });
    if (!deleted) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, deleted, message: 'Coupon deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to delete coupon' }, { status: 500 });
  }
}

