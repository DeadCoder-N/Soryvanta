'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteListingButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this listing?')) return
    setLoading(true)
    await fetch(`/api/broker/listings/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button onClick={handleDelete} disabled={loading} style={{
      fontSize: '0.72rem', color: 'var(--mauve)',
      background: 'none', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
      opacity: loading ? 0.5 : 1,
      borderBottom: '1px solid var(--mauve)', paddingBottom: '1px',
    }}>
      {loading ? '...' : 'Delete'}
    </button>
  )
}
