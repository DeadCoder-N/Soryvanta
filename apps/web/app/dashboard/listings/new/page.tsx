'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function NewListingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFiles = useCallback(async (files: File[]) => {
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
  }, [])

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    uploadFiles(Array.from(e.target.files ?? []))
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    uploadFiles(files)
  }

  function removeImage(url: string) {
    setImageUrls(prev => prev.filter(u => u !== url))
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
    <div style={{ maxWidth: '640px' }} className="animate-fade-up">
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

          {/* Drop zone */}
          <div
            className={`upload-zone${dragOver ? ' drag-over' : ''}`}
            style={{
              border: '2px dashed var(--linen-dk)',
              padding: '36px 24px',
              textAlign: 'center',
              background: 'var(--warm-white)',
              cursor: 'pointer',
            }}
            onClick={() => inputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
            <div style={{ fontSize: '1.8rem', marginBottom: '10px', opacity: 0.35 }}>⬆</div>
            {uploading ? (
              <p style={{ fontSize: '0.82rem', color: 'var(--logo-gold)' }}>Uploading...</p>
            ) : (
              <>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', marginBottom: '4px' }}>
                  Drop images here or <span style={{ color: 'var(--logo-gold)', borderBottom: '1px solid var(--logo-gold)' }}>browse</span>
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>JPEG, PNG — multiple files supported</p>
              </>
            )}
          </div>

          {/* Image preview grid */}
          {imageUrls.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: '8px', marginTop: '12px' }}>
              {imageUrls.map((url, i) => (
                <div key={url}
                  className="animate-scale-in"
                  style={{
                    position: 'relative', paddingTop: '75%', background: 'var(--linen-md)',
                    animationDelay: `${i * 0.05}s`,
                  }}>
                  <Image src={url} alt={`Upload ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    style={{
                      position: 'absolute', top: '4px', right: '4px',
                      background: 'rgba(0,0,0,0.65)', border: 'none', color: '#fff',
                      width: '22px', height: '22px', cursor: 'pointer', fontSize: '0.7rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.85)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.65)')}
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {imageUrls.length > 0 && (
            <p style={{ fontSize: '0.75rem', color: 'var(--logo-green)', marginTop: '8px' }}>
              ✓ {imageUrls.length} image{imageUrls.length > 1 ? 's' : ''} ready
            </p>
          )}
        </div>

        {error && (
          <p className="animate-fade-in" style={{ fontSize: '0.8rem', color: 'var(--gold)', background: 'rgba(184,134,11,0.08)', padding: '12px 16px', borderLeft: '3px solid var(--gold)' }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading || uploading}
          className="btn-press"
          style={{
            background: loading || uploading ? 'var(--linen-dk)' : 'var(--ink)',
            color: 'var(--warm-white)',
            padding: '16px', fontSize: '0.72rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', border: 'none',
            cursor: loading || uploading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}>
          {loading ? 'Generating with AI...' : uploading ? 'Uploading images...' : 'Generate Listing'}
        </button>
      </form>
    </div>
  )
}
