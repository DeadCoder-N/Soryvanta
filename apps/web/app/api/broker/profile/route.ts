import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@brisvora/shared'

// GET — return current broker profile
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, phone: true },
  })

  return NextResponse.json(user)
}

// PUT — update name and/or phone
export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, phone } = await req.json()

  if (!phone) {
    return NextResponse.json({ error: 'WhatsApp number is required' }, { status: 400 })
  }

  // Check if phone is already taken by another user
  const existing = await prisma.user.findFirst({
    where: { phone, NOT: { id: session.user.id } },
  })
  if (existing) {
    return NextResponse.json({ error: 'That phone number is already registered to another account' }, { status: 409 })
  }

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: { name, phone },
    select: { id: true, name: true, email: true, phone: true },
  })

  return NextResponse.json(updated)
}
