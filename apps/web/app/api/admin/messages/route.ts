import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@brisvora/shared'

function isAdmin(role?: string) { return role === 'ADMIN' || role === 'SUPER_ADMIN' }

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user || !isAdmin(session.user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const direction = searchParams.get('direction') ?? ''
  const search = searchParams.get('search') ?? ''
  const page = Number(searchParams.get('page') ?? 1)
  const limit = 30

  const where = {
    ...(direction && { direction: direction as any }),
    ...(search && { waId: { contains: search } }),
  }

  const [messages, total] = await Promise.all([
    prisma.whatsappMessage.findMany({
      where,
      include: { user: { select: { name: true, email: true } } },
      orderBy: { timestamp: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.whatsappMessage.count({ where }),
  ])

  return NextResponse.json({ messages, total, page, pages: Math.ceil(total / limit) })
}
