import { NextResponse } from 'next/server';
import { getCurrentUser, hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error fetching profile' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, phone, address, city, state, pincode, newPassword } = body;

    const updateData: any = {};
    if (name) updateData.name = name.trim();
    if (email && email.trim()) {
      const cleanEmail = email.trim().toLowerCase();
      if (cleanEmail !== currentUser.email.toLowerCase()) {
        const existing = await db.user.findUnique({ where: { email: cleanEmail } });
        if (existing && existing.id !== currentUser.id) {
          return NextResponse.json({ error: 'This email address is already in use by another account.' }, { status: 400 });
        }
        updateData.email = cleanEmail;
      }
    }
    if (phone !== undefined) updateData.phone = phone ? phone.trim() : null;
    if (address !== undefined) updateData.address = address ? address.trim() : null;
    if (city !== undefined) updateData.city = city ? city.trim() : null;
    if (state !== undefined) updateData.state = state ? state.trim() : null;
    if (pincode !== undefined) updateData.pincode = pincode ? pincode.trim() : null;

    if (newPassword && newPassword.trim().length >= 6) {
      updateData.password = await hashPassword(newPassword.trim());
    }

    const updatedUser = await db.user.update({
      where: { id: currentUser.id },
      data: updateData,
    });

    const { password, ...userSafe } = updatedUser;

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully!',
      user: userSafe,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update profile' }, { status: 500 });
  }
}
