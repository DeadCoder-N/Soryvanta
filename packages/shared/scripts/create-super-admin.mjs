import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const email = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase()
const password = process.env.SUPER_ADMIN_PASSWORD
const name = process.env.SUPER_ADMIN_NAME?.trim() || null
const phone = process.env.SUPER_ADMIN_PHONE?.replace(/\D/g, '') || undefined

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required.')
  process.exit(1)
}

if (!email || !password) {
  console.error('SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD are required.')
  process.exit(1)
}

if (password.length < 8) {
  console.error('SUPER_ADMIN_PASSWORD must be at least 8 characters.')
  process.exit(1)
}

const prisma = new PrismaClient()

try {
  const passwordHash = await bcrypt.hash(password, 12)
  const user = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      name,
      phone,
      passwordHash,
      role: 'SUPER_ADMIN',
    },
    update: {
      name: name ?? undefined,
      phone,
      passwordHash,
      role: 'SUPER_ADMIN',
    },
    select: { email: true, name: true, role: true },
  })

  console.log(`Super admin ready: ${user.email} (${user.role})`)
} finally {
  await prisma.$disconnect()
}