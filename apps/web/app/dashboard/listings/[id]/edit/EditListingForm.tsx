'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { IcoClose, IcoCamera, IcoCheck } from '@/components/Icons'

interface Listing {
  id: string
  title: string
  description: string
  address: string
  city: string
  price: number
  type: string
  status: string
  bedrooms: number | null
  bathrooms: number | null
  areaSqft: number | null
  images?: Array<{ id: string; url: string }>
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid var(--border-md)',
  background: 'var(--surface-3)',
  color: 'var(--text-primary)',
  padding: '13px 16px',
  fontSize: '0.875rem',
  borderRadius: 'var(--radius-md)',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.68rem', color: 'var(--text-secondary)', letterSpacing: '0.14em',
  textTransform: 'uppercase', display: 'block', marginBottom: '10px',
}

export default function EditListingForm({ listing }: { listing: Listing }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [existingImages, setExistingImages] = useState<Array<{ id: string; url: string }>>(listing.images ?? [])
  const [newImageUrls, setNewImageUrls] = useState<string[]>([])

  const [formData, setFormData] = useState({
    title: listing.title,
    description: listing.description,
    address: listing.address,
    city: listing.city,
    price: listing.price,
    type: listing.type,
    status: listing.status,
    bedrooms: listing.bedrooms ?? '',
    bathrooms: listing.bathrooms ?? '',
    areaSqft: listing.areaSqft ?? '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

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
    setNewImageUrls(prev => [...prev, ...urls])
    setUploading(false)
  }

  function removeExistingImage(id: string) {
    setExistingImages(prev => prev.filter(img => img.id !== id))
  }

  function removeNewImage(url: string) {
    setNewImageUrls(prev => prev.filter(u => u !== url))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      ...formData,
      price: Number(formData.price),
      bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
      bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
      areaSqft: formData.areaSqft ? Number(formData.areaSqft) : null,
      keepImageIds: existingImages.map(img => img.id),
      newImageUrls,
    }

    const res = await fetch(`/api/broker/listings/${listing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Failed to update listing')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const allImages = [
    ...existingImages.map(img => ({ url: img.url, id: img.id, isNew: false })),
    ...newImageUrls.map(url => ({ url, id: url, isNew: true })),
  ]

  return (
    <div style={{ maxWidth: '720px' }} className="animate-fade-up">
      <span className="section-label" style={{ marginBottom: '6px' }}>Edit Listing</span>
      <div className="gold-divider" style={{ marginBottom: '14px' }} />
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '8px' }}>
        {listing.title}
      </h1>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '36px', lineHeight: 1.7 }}>
        Changes will immediately reflect on the public listing.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Title */}
        <div>
          <label style={labelStyle}>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} required style={inputStyle}
            onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px var(--gold-dim)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--border-md)'; e.target.style.boxShadow = 'none' }} />
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={5}
            style={{ ...inputStyle, resize: 'none' }}
            onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px var(--gold-dim)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--border-md)'; e.target.style.boxShadow = 'none' }} />
        </div>

        <div className="edit-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Price (&#8377;)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px var(--gold-dim)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border-md)'; e.target.style.boxShadow = 'none' }} />
          </div>
          <div>
            <label style={labelStyle}>Property Type</label>
            <select name="type" value={formData.type} onChange={handleChange} required style={inputStyle}>
              <option value="APARTMENT">Apartment</option>
              <option value="VILLA">Villa</option>
              <option value="HOUSE">House</option>
              <option value="PLOT">Plot</option>
              <option value="COMMERCIAL">Commercial</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>

        <div className="edit-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={labelStyle}>City</label>
            <input name="city" value={formData.city} onChange={handleChange} required style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px var(--gold-dim)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border-md)'; e.target.style.boxShadow = 'none' }} />
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} required style={inputStyle}>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SOLD">Sold</option>
              <option value="RENTED">Rented</option>
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Address</label>
          <input name="address" value={formData.address} onChange={handleChange} required style={inputStyle}
            onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px var(--gold-dim)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--border-md)'; e.target.style.boxShadow = 'none' }} />
        </div>

        <div className="edit-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Bedrooms</label>
            <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px var(--gold-dim)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border-md)'; e.target.style.boxShadow = 'none' }} />
          </div>
          <div>
            <label style={labelStyle}>Bathrooms</label>
            <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px var(--gold-dim)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border-md)'; e.target.style.boxShadow = 'none' }} />
          </div>
          <div>
            <label style={labelStyle}>Area (Sqft)</label>
            <input type="number" name="areaSqft" value={formData.areaSqft} onChange={handleChange} style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px var(--gold-dim)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border-md)'; e.target.style.boxShadow = 'none' }} />
          </div>
        </div>

        {/* Images */}
        <div>
          <label style={labelStyle}>Property Images</label>

          {/* Current images grid */}
          {allImages.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px', marginBottom: '12px' }}>
              {allImages.map(img => (
                <div key={img.id} style={{ position: 'relative', paddingTop: '75%', background: 'var(--linen-md)' }}>
                  <Image src={img.url} alt="" fill style={{ objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => img.isNew ? removeNewImage(img.url) : removeExistingImage(img.id)}
                    style={{
                      position: 'absolute', top: '4px', right: '4px',
                      background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff',
                      width: '22px', height: '22px', cursor: 'pointer', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    aria-label="Remove image"
                  >
                    <IcoClose size={10} />
                  </button>
                  {img.isNew && (
                    <div style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'var(--logo-green)', color: '#fff', fontSize: '0.55rem', padding: '2px 6px', letterSpacing: '0.08em' }}>
                      NEW
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Upload area */}
          <div className="upload-zone" style={{ padding: '24px', textAlign: 'center' }}>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: 'none' }} id="edit-image-upload" />
            <label htmlFor="edit-image-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--gold)', opacity: 0.7 }}><IcoCamera size={20} /></span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>
                {uploading ? 'Uploading...' : 'Click to add more images'}
              </p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>JPEG, PNG supported</p>
            </label>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', padding: '12px 16px' }}>
            <p style={{ fontSize: '0.82rem', color: '#f87171' }}>{error}</p>
          </div>
        )}

        <button type="submit" disabled={loading || uploading} className="btn-primary"
          style={{ padding: '15px', fontSize: '0.85rem', opacity: loading || uploading ? 0.7 : 1, cursor: loading || uploading ? 'not-allowed' : 'pointer', gap: '8px' }}>
          {loading ? 'Saving...' : <><IcoCheck size={15} /> Save Changes</>}
        </button>
      </form>
    </div>
  )
}
