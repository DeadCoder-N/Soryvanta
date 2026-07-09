import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@brisvora/shared'
import { claimListings } from '@brisvora/api'

export async function POST(req: Request) {
  const { name, email, password, phone, countryCode } = await req.json()

  if (!email || !password || !phone) {
    return NextResponse.json({ error: 'Email, password and WhatsApp number required' }, { status: 400 })
  }

  // Normalize phone — strip everything except digits so DB is always consistent
  const normalizedPhone = phone.replace(/\D/g, '')
  const normalizedCode = countryCode?.replace(/[^0-9+]/g, '') || '+91'

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { phone: normalizedPhone }] },
  })
  if (existing) {
    return NextResponse.json(
      { error: existing.email === email ? 'Email already in use' : 'Phone number already registered' },
      { status: 409 }
    )
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      phone: normalizedPhone,
      countryCode: normalizedCode,
    },
    select: { id: true, email: true, name: true, phone: true, countryCode: true },
  })

  // Claim any WhatsApp listings created before registration
  await claimListings(normalizedPhone, user.id)

  return NextResponse.json(user, { status: 201 })
}
