'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid var(--linen-dk)',
  background: 'var(--warm-white)',
  color: 'var(--ink)',
  padding: '13px 16px',
  fontSize: '0.875rem',
  transition: 'border-color 0.2s',
}

export default function EditListingForm({ listing }: { listing: Listing }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // We map the initial state directly from the listing object
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
    
    // Redirect back to dashboard overview
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div style={{ maxWidth: '720px' }}>
      <p style={{ fontSize: '0.62rem', color: 'var(--mauve)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '12px' }}>
        Edit Listing
      </p>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--ink)', fontWeight: 400, marginBottom: '8px' }}>
        {listing.title}
      </h1>
      <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: '48px', lineHeight: 1.7 }}>
        Update the details for this property. Changes will immediately reflect on the public listing.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Title */}
        <div>
          <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} required style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--mauve)')} onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')} />
        </div>

        {/* Description */}
        <div>
          <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={5} style={{ ...inputStyle, resize: 'none' }} onFocus={e => (e.target.style.borderColor = 'var(--mauve)')} onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Price */}
          <div>
            <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Price (₹)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--mauve)')} onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')} />
          </div>

          {/* Type */}
          <div>
            <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Property Type</label>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* City */}
          <div>
            <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>City</label>
            <input name="city" value={formData.city} onChange={handleChange} required style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--mauve)')} onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')} />
          </div>

          {/* Status */}
          <div>
            <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} required style={inputStyle}>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SOLD">Sold</option>
              <option value="RENTED">Rented</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
          <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Address</label>
          <input name="address" value={formData.address} onChange={handleChange} required style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--mauve)')} onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
          {/* Bedrooms */}
          <div>
            <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Bedrooms</label>
            <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--mauve)')} onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')} />
          </div>

          {/* Bathrooms */}
          <div>
            <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Bathrooms</label>
            <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--mauve)')} onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')} />
          </div>

          {/* Area */}
          <div>
            <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Area (Sqft)</label>
            <input type="number" name="areaSqft" value={formData.areaSqft} onChange={handleChange} style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--mauve)')} onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')} />
          </div>
        </div>

        {error && (
          <p style={{ fontSize: '0.8rem', color: 'var(--gold)', background: 'rgba(184,134,11,0.08)', padding: '12px 16px' }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} style={{
          background: loading ? 'var(--linen-dk)' : 'var(--ink)',
          color: 'var(--warm-white)',
          padding: '16px', fontSize: '0.72rem', letterSpacing: '0.16em',
          textTransform: 'uppercase', border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: '12px'
        }}>
          {loading ? 'Saving Changes...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
