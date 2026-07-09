import { prisma } from '@brisvora/shared'
import crypto from 'crypto'
import { sendMessage } from '../whatsapp'

/**
 * Generate a cryptographically secure 6-digit OTP.
 */
export function generateOtp(): string {
  return crypto.randomInt(100000, 999999).toString()
}

/**
 * Send OTP via WhatsApp using AiSensy API.
 * Returns true if sent successfully.
 */
export async function sendOtpWhatsApp(
  phone: string,
  otp: string,
  waId?: string
): Promise<boolean> {
  const message = `Your Brisvora verification code is: ${otp}\n\nThis code expires in 10 minutes. Do not share this with anyone.\n\n- Team Brisvora`
  
  const to = waId || phone
  try {
    await sendMessage({ to, body: message })
    console.log(`[OTP] OTP ${otp} sent to ${to}`)
    return true
  } catch (error) {
    console.error('[OTP] Failed to send OTP via WhatsApp:', error)
    return false
  }
}

/**
 * Create and persist an OTP record for phone verification.
 * Automatically expires previous unverified OTPs for the same phone.
 */
export async function createOtp(params: {
  phone: string
  countryCode?: string
  userId?: string
  purpose?: 'PHONE_VERIFICATION' | 'LOGIN'
}): Promise<{
  otpId: string
  otp: string
  expiresAt: Date
}> {
  const {
    phone,
    countryCode = '+91',
    userId,
    purpose = 'PHONE_VERIFICATION',
  } = params

  // Expire any previous unverified OTPs for this phone
  await prisma.otpVerification.updateMany({
    where: {
      phone,
      verified: false,
      expiresAt: { gt: new Date() },
    },
    data: {
      expiresAt: new Date(0), // Force expire
    },
  })

  const otp = generateOtp()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

  const record = await prisma.otpVerification.create({
    data: {
      phone,
      countryCode,
      userId: userId ?? null,
      otp,
      purpose,
      expiresAt,
    },
  })

  return {
    otpId: record.id,
    otp,
    expiresAt,
  }
}

/**
 * Verify an OTP for a given phone number.
 * Returns { valid: true, record } on success, or { valid: false, reason } on failure.
 */
export async function verifyOtp(params: {
  phone: string
  otp: string
}): Promise<{
  valid: boolean
  reason?: string
  record?: { id: string; userId: string | null; phone: string; countryCode: string }
}> {
  const { phone, otp } = params

  // Find the latest unverified, non-expired OTP for this phone
  const record = await prisma.otpVerification.findFirst({
    where: {
      phone,
      otp,
      verified: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  })

  if (!record) {
    // Check if OTP exists but expired
    const expired = await prisma.otpVerification.findFirst({
      where: { phone, otp },
      orderBy: { createdAt: 'desc' },
    })
    if (expired && expired.expiresAt < new Date()) {
      return { valid: false, reason: 'OTP has expired. Request a new one.' }
    }
    return { valid: false, reason: 'Invalid OTP. Check the code and try again.' }
  }

  // Mark as verified
  await prisma.otpVerification.update({
    where: { id: record.id },
    data: { verified: true },
  })

  // If associated with a user, mark phone as verified
  if (record.userId) {
    await prisma.user.update({
      where: { id: record.userId },
      data: { phoneVerified: true },
    })
  }

  return {
    valid: true,
    record: {
      id: record.id,
      userId: record.userId,
      phone: record.phone,
      countryCode: record.countryCode,
    },
  }
}

/**
 * Check if a phone has already been verified for a user.
 */
export async function isPhoneVerified(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { phoneVerified: true, phone: true },
  })
  return user?.phoneVerified ?? false
}