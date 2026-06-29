import { NextResponse } from 'next/server'
import { getBrokerAnalytics } from '@brisvora/api'
import { auth } from '@/auth'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const analytics = await getBrokerAnalytics(session.user.id)
  return NextResponse.json(analytics)
}
