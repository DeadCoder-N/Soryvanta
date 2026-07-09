'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { IcoCamera, IcoCheck, IcoClose, IcoSparkle, IcoUpload } from '@/components/Icons'

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
      if (res.ok) urls.push((await res.json()).url)
    }
    setImageUrls(prev => [...prev, ...urls])
    setUploading(false)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(''); setLoading(true)
    const form = new FormData(e.currentTarget)
    const res = await fetch('/api/properties', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rawMessage: form.get('rawMessage'), imageUrls }),
    })
    if (!res.ok) { setError((await res.json()).error ?? 'Failed'); setLoading(false); return }
    router.push(`/property/${(await res.json()).slug}`)
  }

  return (
    <div style={{ maxWidth: '680px' }} className="animate-fade-up">
      <div style={{ marginBottom: '36px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '14px', display: 'inline-flex' }}>AI-Powered</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '8px' }}>
          Create a Listing
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Describe the property in plain language — AI will generate a professional listing instantly.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        <div>
          <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
            Property Description
          </label>
          <textarea name="rawMessage" required rows={7} placeholder="e.g. 3 BHK flat in Bandra West, Mumbai. 1200 sqft, 2 bathrooms, modular kitchen, parking, near Western Express Highway. Price 1.8 Cr negotiable."
            className="input-modern"
            style={{ resize: 'none', lineHeight: 1.7 }} />
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            English, Hindi, or Hinglish — all supported.
          </p>
        </div>

        {/* Drop zone */}
        <div>
          <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
            Property Images
          </label>
          <div className={`upload-zone${dragOver ? ' drag-over' : ''}`}
            style={{ padding: '40px 24px', textAlign: 'center' }}
            onClick={() => inputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); uploadFiles(Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))) }}>
            <input ref={inputRef} type="file" accept="image/*" multiple onChange={e => uploadFiles(Array.from(e.target.files ?? []))} style={{ display: 'none' }} />
            <div style={{
              width: '48px', height: '48px', margin: '0 auto 12px',
              background: 'var(--gold-dim)', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--gold)', opacity: 0.7,
            }}>
              <IcoCamera size={22} />
            </div>
            {uploading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <IcoUpload size={14} style={{ color: 'var(--gold)', animation: 'pulse-dot 1.2s infinite' }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>Uploading...</p>
              </div>
            ) : (
              <>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Drop images here or <span style={{ color: 'var(--gold)' }}>browse</span>
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JPEG, PNG — multiple files supported</p>
              </>
            )}
          </div>

          {imageUrls.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))', gap: '8px', marginTop: '12px' }}>
              {imageUrls.map((url, i) => (
                <div key={url} className="animate-scale-in" style={{ position: 'relative', paddingTop: '75%', background: 'var(--surface-3)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', animationDelay: `${i * 0.05}s` }}>
                  <Image src={url} alt="" fill style={{ objectFit: 'cover' }} />
                  <button type="button" onClick={() => setImageUrls(p => p.filter(u => u !== url))}
                    style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff', width: '20px', height: '20px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    aria-label="Remove image">
                    <IcoClose size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {imageUrls.length > 0 && (
            <p style={{ fontSize: '0.75rem', color: '#4ade80', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <IcoCheck size={13} /> {imageUrls.length} image{imageUrls.length > 1 ? 's' : ''} ready
            </p>
          )}
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
            <p style={{ fontSize: '0.82rem', color: '#f87171' }}>{error}</p>
          </div>
        )}

        <button type="submit" disabled={loading || uploading} className="btn-primary"
          style={{ padding: '15px', fontSize: '0.88rem', opacity: loading || uploading ? 0.7 : 1, cursor: loading || uploading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Generating with AI...' : uploading ? 'Uploading...' : <><IcoSparkle size={15} /> Generate Listing</>}
        </button>
      </form>
    </div>
  )
}
