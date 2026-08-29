import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const banners = await db.banner.findMany();
    return NextResponse.json({
      success: true,
      banners: banners || [],
    });
  } catch (error: any) {
    console.error('Error fetching admin banners:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch banners' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, subtitle, badge, image, link, buttonText, displayOrder, isActive } = body;

    if (!title || !image) {
      return NextResponse.json(
        { error: 'Banner Title and Image URL are required' },
        { status: 400 }
      );
    }

    const banner = await db.banner.create({
      data: {
        title: title.trim(),
        subtitle: subtitle ? subtitle.trim() : '',
        badge: badge ? badge.trim() : '',
        image: image.trim(),
        link: link ? link.trim() : '/products',
        buttonText: buttonText ? buttonText.trim() : 'Explore Now',
        displayOrder: typeof displayOrder === 'number' ? displayOrder : 1,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Banner created successfully',
      banner,
    });
  } catch (error: any) {
    console.error('Error creating banner:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create banner' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, title, subtitle, badge, image, link, buttonText, displayOrder, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: 'Banner ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title.trim();
    if (subtitle !== undefined) updateData.subtitle = subtitle.trim();
    if (badge !== undefined) updateData.badge = badge.trim();
    if (image !== undefined) updateData.image = image.trim();
    if (link !== undefined) updateData.link = link.trim();
    if (buttonText !== undefined) updateData.buttonText = buttonText.trim();
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updated = await db.banner.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Banner updated successfully',
      banner: updated,
    });
  } catch (error: any) {
    console.error('Error updating banner:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to update banner' },
      { status: 500 }
    );
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

    if (!id) {
      return NextResponse.json({ error: 'Banner ID is required' }, { status: 400 });
    }

    await db.banner.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: 'Banner deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting banner:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to delete banner' },
      { status: 500 }
    );
  }
}
