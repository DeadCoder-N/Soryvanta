import { NextResponse } from 'next/server'
import { getBrokerLeads } from '@marketing-os/api'
import { auth } from '@/auth'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const leads = await getBrokerLeads(session.user.id)
  return NextResponse.json(leads)
}
