import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@brisvora/shared'

function isAdmin(role?: string) { return role === 'ADMIN' || role === 'SUPER_ADMIN' }
function isSuperAdmin(role?: string) { return role === 'SUPER_ADMIN' }

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user || !isAdmin(session.user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') ?? ''
  const role = searchParams.get('role') ?? ''
  const page = Number(searchParams.get('page') ?? 1)
  const limit = 20

  const where = {
    ...(search && {
      OR: [
        { email: { contains: search, mode: 'insensitive' as const } },
        { name: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
    ...(role && { role: role as any }),
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true, name: true, email: true, phone: true, role: true, createdAt: true,
        _count: { select: { properties: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.user.count({ where }),
  ])

  return NextResponse.json({ users, total, page, pages: Math.ceil(total / limit) })
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user || !isSuperAdmin(session.user.role))
    return NextResponse.json({ error: 'Forbidden — Super Admin only' }, { status: 403 })

  const { userId, role, plan } = await req.json()
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })

  if (role) {
    if (!['BROKER', 'ADMIN', 'SUPER_ADMIN'].includes(role))
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    const user = await prisma.user.update({ where: { id: userId }, data: { role } })
    return NextResponse.json({ id: user.id, role: user.role })
  }

  if (plan) {
    if (!['STARTER', 'PROFESSIONAL', 'BUSINESS', 'ENTERPRISE'].includes(plan))
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    const user = await prisma.user.update({ where: { id: userId }, data: { plan } })
    return NextResponse.json({ id: user.id, plan: user.plan })
  }

  return NextResponse.json({ error: 'role or plan required' }, { status: 400 })
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session?.user || !isSuperAdmin(session.user.role))
    return NextResponse.json({ error: 'Forbidden — Super Admin only' }, { status: 403 })

  const { userId } = await req.json()
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })
  if (userId === session.user.id)
    return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 })

  await prisma.user.delete({ where: { id: userId } })
  return NextResponse.json({ success: true })
}
