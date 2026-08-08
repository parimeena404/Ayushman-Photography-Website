import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { comparePassword, signToken, COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function findUserWithRetry(email: string) {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch (err: any) {
    console.error('First findUser DB attempt failed:', err?.message || err);
    await new Promise((res) => setTimeout(res, 500));
    return await db.user.findUnique({ where: { email } });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Find User with retry logic
    let user;
    try {
      user = await findUserWithRetry(cleanEmail);
    } catch (dbError: any) {
      console.error('Database connection error in login route:', dbError?.message || dbError);
      return NextResponse.json(
        { error: `Database connection error: ${dbError?.message || 'Unable to connect to database server.'}` },
        { status: 503 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email. Please create a new account first.' },
        { status: 401 }
      );
    }

    // Compare Password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    // Create JWT Token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
    };

    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully!',
      user: userData,
    });

    // Set HTTP-Only Cookie
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
