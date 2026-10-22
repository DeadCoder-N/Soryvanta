import { NextResponse } from 'next/server'
import { createLead } from '@marketing-os/api'

export async function POST(req: Request) {
  const { propertyId, name, phone, message, source } = await req.json()

  if (!propertyId) {
    return NextResponse.json({ error: 'propertyId is required' }, { status: 400 })
  }

  const lead = await createLead({ propertyId, name, phone, message, source })
  return NextResponse.json(lead, { status: 201 })
}
