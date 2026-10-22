import { describe, it, expect } from 'vitest'
import { prisma } from '@marketing-os/shared'

describe('database connectivity (read-only)', () => {
  it('runs SELECT 1 via the app Prisma client', async () => {
    const res = await prisma.$queryRawUnsafe<{ ok: number }[]>('SELECT 1 AS ok')
    expect(Number(res[0].ok)).toBe(1)
  })
})