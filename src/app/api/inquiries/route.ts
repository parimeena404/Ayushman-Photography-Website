import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, eventType, date, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, phone number, and message are required fields.' },
        { status: 400 }
      );
    }

    const inquiry = await db.inquiry.create({
      data: {
        name,
        email: email || '',
        phone,
        eventType: eventType || 'General Inquiry',
        date: date || '',
        message,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully! Our team will contact you shortly.',
      inquiry,
    });
  } catch (error: any) {
    console.error('Inquiry Submission Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
