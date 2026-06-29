import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@brisvora/shared'

export async function POST(req: Request) {
  const { name, email, password, phone } = await req.json()

  if (!email || !password || !phone) {
    return NextResponse.json({ error: 'Email, password and WhatsApp number required' }, { status: 400 })
  }

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { phone }] },
  })
  if (existing) {
    return NextResponse.json(
      { error: existing.email === email ? 'Email already in use' : 'Phone number already registered' },
      { status: 409 }
    )
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { name, email, passwordHash, phone },
    select: { id: true, email: true, name: true, phone: true },
  })

  return NextResponse.json(user, { status: 201 })
}
