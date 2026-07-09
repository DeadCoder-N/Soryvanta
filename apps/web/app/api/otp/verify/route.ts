import { NextResponse } from 'next/server'
import { verifyOtp } from '@brisvora/api'

export async function POST(req: Request) {
  try {
    const { phone, otp } = await req.json()

    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 })
    }

    const digits = phone.replace(/\D/g, '')
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return NextResponse.json({ error: 'OTP must be a 6-digit code' }, { status: 400 })
    }

    const result = await verifyOtp({ phone: digits, otp })

    if (!result.valid) {
      return NextResponse.json({
        verified: false,
        error: result.reason || 'Verification failed',
      }, { status: 400 })
    }

    return NextResponse.json({
      verified: true,
      message: 'Phone number verified successfully',
      record: result.record,
    })
  } catch (error) {
    console.error('[OTP Verify] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}