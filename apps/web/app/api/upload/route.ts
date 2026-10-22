import { NextResponse } from 'next/server'
import { uploadImage } from '@marketing-os/api'
import { auth } from '@/auth'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const { url, thumbnailUrl } = await uploadImage(buffer)

  return NextResponse.json({ url, thumbnailUrl })
}
