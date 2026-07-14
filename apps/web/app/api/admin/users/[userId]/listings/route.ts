import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@brisvora/shared'

export async function GET(_req: Request, { params }: { params: Promise<{ userId: string }> }) {
  const session = await auth()
  if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role ?? ''))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { userId } = await params

  const listings = await prisma.property.findMany({
    where: { ownerId: userId },
    select: {
      id: true, title: true, city: true, price: true,
      status: true, type: true, slug: true,
      analytics: { select: { viewCount: true } },
      _count: { select: { leads: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(listings)
}
