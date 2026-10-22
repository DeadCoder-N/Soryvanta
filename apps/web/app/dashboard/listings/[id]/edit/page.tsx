import { notFound, redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@marketing-os/shared'
import EditListingForm from './EditListingForm'

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const { id } = await params
  const listing = await prisma.property.findUnique({
    where: { id, ownerId: session.user.id },
    include: { images: { orderBy: { order: 'asc' }, select: { id: true, url: true } } },
  })

  if (!listing) notFound()

  return <EditListingForm listing={listing} />
}
