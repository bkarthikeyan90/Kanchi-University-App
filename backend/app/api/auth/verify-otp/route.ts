import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, mobile, otp, fcmToken } = await request.json();

    if (!otp || (!email && !mobile)) {
      return NextResponse.json(
        { error: 'OTP and email or mobile are required' },
        { status: 400 }
      );
    }

    // Verify OTP with Supabase Auth
    // Note: In production, you'd use Firebase Auth for OTP
    // This is a simplified version - for now, accept any 6-digit OTP
    // In production, implement proper OTP verification
    if (!supabase) {
      // Fallback: Simple OTP validation (for development)
      if (otp.length !== 6 || !/^\d+$/.test(otp)) {
        return NextResponse.json(
          { error: 'Invalid OTP format' },
          { status: 400 }
        );
      }
    } else {
      const { data: authData, error: authError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (authError || !authData.user) {
        return NextResponse.json(
          { error: 'Invalid OTP' },
          { status: 401 }
        );
      }
    }

    // Get or create app user
    let appUser = await prisma.appUser.findFirst({
      where: {
        OR: [
          { email: email || undefined },
          { mobile: mobile || undefined },
        ],
      },
    });

    if (!appUser) {
      appUser = await prisma.appUser.create({
        data: {
          email: email || null,
          mobile: mobile || null,
          fcmToken: fcmToken || null,
        },
      });
    } else if (fcmToken) {
      appUser = await prisma.appUser.update({
        where: { id: appUser.id },
        data: { fcmToken },
      });
    }

    const token = generateToken({
      userId: appUser.id,
      role: 'USER',
      username: appUser.email || appUser.mobile || '',
    });

    return NextResponse.json({
      user: {
        id: appUser.id,
        email: appUser.email,
        mobile: appUser.mobile,
        name: appUser.name,
      },
      token,
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

