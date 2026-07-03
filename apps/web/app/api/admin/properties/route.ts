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
  const status = searchParams.get('status') ?? ''
  const type = searchParams.get('type') ?? ''
  const page = Number(searchParams.get('page') ?? 1)
  const limit = 20

  const where = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { city: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
    ...(status && { status: status as any }),
    ...(type && { type: type as any }),
  }

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      include: {
        owner: { select: { name: true, email: true } },
        images: { take: 1, orderBy: { order: 'asc' } },
        analytics: { select: { viewCount: true } },
        _count: { select: { leads: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.property.count({ where }),
  ])

  return NextResponse.json({ properties, total, page, pages: Math.ceil(total / limit) })
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user || !isAdmin(session.user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { propertyId, status } = await req.json()
  if (!propertyId || !status) return NextResponse.json({ error: 'propertyId and status required' }, { status: 400 })

  const property = await prisma.property.update({ where: { id: propertyId }, data: { status } })
  return NextResponse.json({ id: property.id, status: property.status })
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session?.user || !isAdmin(session.user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { propertyId } = await req.json()
  if (!propertyId) return NextResponse.json({ error: 'propertyId required' }, { status: 400 })

  await prisma.property.delete({ where: { id: propertyId } })
  return NextResponse.json({ success: true })
}
