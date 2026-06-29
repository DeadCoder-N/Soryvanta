import { notFound, redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@brisvora/shared'
import EditListingForm from './EditListingForm'

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const { id } = await params
  const listing = await prisma.property.findUnique({
    where: { id, ownerId: session.user.id },
  })

  if (!listing) notFound()

  // Convert nullable fields to undefined to satisfy React props if necessary, 
  // but it's easier to just pass the plain object and handle nulls in the form.
  return <EditListingForm listing={listing} />
}
