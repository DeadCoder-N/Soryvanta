import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@brisvora/shared'

function isAdmin(role?: string) { return role === 'ADMIN' || role === 'SUPER_ADMIN' }

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user || !isAdmin(session.user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') ?? ''
  const source = searchParams.get('source') ?? ''
  const page = Number(searchParams.get('page') ?? 1)
  const limit = 25

  const where = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { phone: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
    ...(source && { source }),
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      include: {
        property: { select: { id: true, title: true, slug: true, city: true, owner: { select: { name: true, email: true } } } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.lead.count({ where }),
  ])

  return NextResponse.json({ leads, total, page, pages: Math.ceil(total / limit) })
}
