import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createOtp, sendOtpWhatsApp } from '@brisvora/api'

export async function POST(req: Request) {
  try {
    const session = await auth()
    const { phone, countryCode = '+91' } = await req.json()

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    const digits = phone.replace(/\D/g, '')
    if (digits.length < 7 || digits.length > 15) {
      return NextResponse.json({ error: 'Invalid phone number length' }, { status: 400 })
    }

    // Create OTP record
    const { otp, expiresAt } = await createOtp({
      phone: digits,
      countryCode,
      userId: session?.user?.id ?? undefined,
      purpose: 'PHONE_VERIFICATION',
    })

    // Send OTP via WhatsApp
    const sent = await sendOtpWhatsApp(digits, otp)

    if (!sent) {
      return NextResponse.json({
        error: 'Failed to send OTP. Check your WhatsApp number and try again.',
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      expiresAt: expiresAt.toISOString(),
      // In production, never return the OTP. For development, we return it for testing.
      ...(process.env.NODE_ENV === 'development' ? { otp } : {}),
    })
  } catch (error) {
    console.error('[OTP Send] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}