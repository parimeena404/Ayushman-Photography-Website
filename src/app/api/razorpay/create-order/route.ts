import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      eventType,
      eventDate,
      city,
      address,
      notes,
      packageType,
      totalAmount,
      depositAmount,
    } = body;

    if (!customerName || !customerPhone || !depositAmount) {
      return NextResponse.json(
        { error: 'Customer name, phone and deposit amount are required.' },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TMSAlhSBWAt4fa';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'rJIrVlDD0pX9EdzxHCee4u1r';

    const amountInPaisa = Math.round(Number(depositAmount) * 100);

    let razorpayOrderId: string;

    try {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const options = {
        amount: amountInPaisa,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: {
          customerName,
          customerPhone,
          eventType,
          packageType,
        },
      };

      const razorpayOrder = await razorpay.orders.create(options);
      razorpayOrderId = razorpayOrder.id;
    } catch (rzpErr: any) {
      console.warn('Razorpay API Warning (Using Sandbox Fallback):', rzpErr?.error || rzpErr?.message);
      razorpayOrderId = `order_test_${Date.now()}`;
    }

    // Save pending booking in database
    const booking = await db.booking.create({
      data: {
        customerName,
        customerEmail: customerEmail || 'client@ayushmancards.com',
        customerPhone,
        eventType: eventType || 'Wedding Cards & Printing Press',
        eventDate: eventDate || new Date().toISOString().split('T')[0],
        city: city || 'Ujjain',
        address: address || '',
        notes: notes || '',
        packageType: packageType || 'Custom Order',
        totalAmount: Number(totalAmount) || Number(depositAmount),
        depositAmount: Number(depositAmount),
        paymentStatus: 'PENDING',
        razorpayOrderId: razorpayOrderId,
        status: 'NEW',
      },
    });

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: amountInPaisa,
      currency: 'INR',
      keyId,
      bookingId: booking.id,
    });
  } catch (error: any) {
    console.error('Razorpay Create Order Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
