'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewListingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploading(true)
    const urls: string[] = []
    for (const file of files) {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      if (res.ok) {
        const data = await res.json()
        urls.push(data.url)
      }
    }
    setImageUrls(prev => [...prev, ...urls])
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rawMessage: form.get('rawMessage'), imageUrls }),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Failed to create listing')
      setLoading(false)
      return
    }
    const property = await res.json()
    router.push(`/property/${property.slug}`)
  }

  return (
    <div style={{ maxWidth: '640px' }}>
      <p style={{ fontSize: '0.62rem', color: 'var(--mauve)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '12px' }}>
        New Listing
      </p>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--ink)', fontWeight: 400, marginBottom: '8px' }}>
        Create a Listing
      </h1>
      <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: '48px', lineHeight: 1.7 }}>
        Describe the property in your own words — our AI will generate a professional listing page instantly.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

        {/* Description */}
        <div>
          <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
            Property Description
          </label>
          <textarea
            name="rawMessage"
            required
            rows={7}
            placeholder="e.g. 3 BHK flat in Bandra West, Mumbai. 1200 sqft, 2 bathrooms, modular kitchen, parking, near Western Express Highway. Price 1.8 Cr negotiable."
            style={{
              width: '100%',
              border: '1px solid var(--linen-dk)',
              background: 'var(--warm-white)',
              color: 'var(--ink)',
              padding: '16px 18px',
              fontSize: '0.875rem',
              resize: 'none',
              lineHeight: 1.7,
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--mauve)')}
            onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')}
          />
          <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: '8px' }}>
            English, Hindi, or Hinglish — all supported.
          </p>
        </div>

        {/* Images */}
        <div>
          <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
            Property Images
          </label>
          <div style={{ border: '1px dashed var(--linen-dk)', padding: '28px', textAlign: 'center', background: 'var(--warm-white)' }}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', marginBottom: '6px' }}>Click to upload images</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>JPEG, PNG supported</p>
            </label>
          </div>
          {uploading && (
            <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: '8px' }}>Uploading...</p>
          )}
          {imageUrls.length > 0 && (
            <p style={{ fontSize: '0.75rem', color: 'var(--logo-green)', marginTop: '8px' }}>
              ✓ {imageUrls.length} image{imageUrls.length > 1 ? 's' : ''} uploaded
            </p>
          )}
        </div>

        {error && (
          <p style={{ fontSize: '0.8rem', color: 'var(--gold)', background: 'rgba(184,134,11,0.08)', padding: '12px 16px' }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading || uploading} style={{
          background: loading || uploading ? 'var(--linen-dk)' : 'var(--ink)',
          color: 'var(--warm-white)',
          padding: '16px', fontSize: '0.72rem', letterSpacing: '0.16em',
          textTransform: 'uppercase', border: 'none',
          cursor: loading || uploading ? 'not-allowed' : 'pointer',
        }}>
          {loading ? 'Generating with AI...' : 'Generate Listing'}
        </button>
      </form>
    </div>
  )
}
