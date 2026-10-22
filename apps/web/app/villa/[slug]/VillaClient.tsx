'use client'

import { useState, useEffect } from 'react'

type ClientProperty = {
  id: string
  slug: string
  title: string
  description: string
  address: string
  city: string
  price: number
  priceLabel: string | null
  bedrooms: number | null
  bathrooms: number | null
  areaSqft: number | null
  type: string
  status: string
  features: string[]
  amenities: string[]
  rawInput: string | null
  mockDataUrl: string | null
  mediaJson: any
  seoTitle?: string
  waLink?: string
  images?: { url: string; caption: string | null; thumbnailUrl?: string | null; mediaType?: string }[]
  ownerPhone?: string | null
  owner?: { name: string | null; phone: string | null; email: string } | null
  analytics?: { viewCount: number; inquiryCount: number; lastViewed: Date | null } | null
}

const COUNTRIES = [
  { code: '+91', flag: '🇮🇳' }, { code: '+1', flag: '🇺🇸' }, { code: '+44', flag: '🇬🇧' },
  { code: '+971', flag: '🇦🇪' }, { code: '+65', flag: '🇸🇬' }, { code: '+61', flag: '🇦🇺' },
]

function EnquiryForm({
  propertyId, state, setState, onClose, cta
}: {
  propertyId: string
  state: 'idle' | 'loading' | 'success' | 'error'
  setState: (s: 'idle' | 'loading' | 'success' | 'error') => void
  onClose: () => void
  cta: string
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId, name, phone: `${countryCode}${phone}`, countryCode, message, tokenCount: message.length, source: 'WEB' }),
      })
      if (!res.ok) throw new Error('Failed')
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') return (
    <div style={{ textAlign: 'center', padding: '24px 0' }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: '0 auto 16px', display: 'block' }}>
        <circle cx="24" cy="24" r="24" fill="rgba(21,128,61,0.15)" />
        <path d="M14 24l8 8 12-16" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#C9A84C', margin: '0 0 8px' }}>Request Sent!</p>
      <p style={{ fontSize: 13, color: '#A89878', margin: '0 0 20px' }}>The broker will contact you shortly.</p>
      <button onClick={onClose} style={{ padding: '10px 24px', background: '#C9A84C', color: '#080807', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Close</button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" required aria-label="Name"
        style={{ padding: 12, background: 'var(--surface-2, #161412)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 8, color: '#F0EBE0', fontSize: 14 }} />
      <div style={{ display: 'flex', gap: 8 }}>
        <select value={countryCode} onChange={e => setCountryCode(e.target.value)} aria-label="Country code"
          style={{ padding: 12, background: 'var(--surface-2, #161412)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 8, color: '#F0EBE0', fontSize: 14, width: 100 }}>
          {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
        </select>
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" required inputMode="numeric"
          style={{ flex: 1, padding: 12, background: 'var(--surface-2, #161412)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 8, color: '#F0EBE0', fontSize: 14 }} />
      </div>
      {state === 'error' && <p style={{ fontSize: 12, color: '#DC2626', margin: 0 }}>Something went wrong. Please try again.</p>}
      <button type="submit" disabled={state === 'loading'}
        style={{ padding: 14, background: '#C9A84C', color: '#080807', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: state === 'loading' ? 'not-allowed' : 'pointer', opacity: state === 'loading' ? 0.7 : 1, marginTop: 8 }}>
        {state === 'loading' ? 'Sending...' : cta}
      </button>
      <button type="button" onClick={onClose} style={{ padding: 10, background: 'transparent', color: '#6B5E45', border: 'none', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
    </form>
  )
}

export default function VillaClient({ property: p }: { property: ClientProperty }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [showEnquiry, setShowEnquiry] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [enquiryState, setEnquiryState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const images = p.mediaJson
    ? (p.mediaJson as any[])
    : p.images?.length
    ? p.images.map((img: any) => ({ url: img.url, caption: img.caption || '', type: img.mediaType || 'image' }))
    : [
        { url: 'https://placehold.co/1200x800/1e1b18/C9A84C', caption: p.title, type: 'image' },
        { url: 'https://placehold.co/1200x800/161412/C9A84C', caption: 'Villa View', type: 'image' },
        { url: 'https://placehold.co/1200x800/0F0E0C/C9A84C', caption: 'Pool', type: 'image' },
      ]

  return (
    <div style={{ background: 'var(--bg, #080807)', color: 'var(--text-primary, #F0EBE0)', minHeight: '100vh' }}>
      <div style={{ position: 'relative', width: '100%', height: isMobile ? '55vh' : '70vh', overflow: 'hidden' }}>
        {images.map((img: any, i: number) => (
          <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === currentImage ? 1 : 0, transition: 'opacity 0.8s ease' }}>
            {img.type === 'video' ? (
              <video autoPlay muted loop playsInline poster={img.thumbnailUrl || img.url}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={img.url} type="video/mp4" />
              </video>
            ) : (
              <img src={img.url} alt={img.caption || p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </div>
        ))}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
          background: 'linear-gradient(transparent, rgba(201,168,76,0.15) 50%, var(--bg, #080807))' }} />
        {images.length > 1 && (
          <>
            <button onClick={() => setCurrentImage(i => i === 0 ? images.length - 1 : i - 1)} aria-label="Previous"
              style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', fontSize: 20, padding: '14px 10px', borderRadius: 4, cursor: 'pointer', zIndex: 10 }}>
              ◀
            </button>
            <button onClick={() => setCurrentImage(i => i === images.length - 1 ? 0 : i + 1)} aria-label="Next"
              style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', fontSize: 20, padding: '14px 10px', borderRadius: 4, cursor: 'pointer', zIndex: 10 }}>
              ▶
            </button>
          </>
        )}
        <div style={{ position: 'absolute', bottom: 48, left: 32, right: 32, zIndex: 10 }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: '#C9A84C', letterSpacing: 4, marginBottom: 8 }}>PREMIUM LUXURY VILLA</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 26 : 42, color: '#F0EBE0', margin: 0, textShadow: '0 4px 12px rgba(0,0,0,0.8)', maxWidth: isMobile ? '100%' : '65%' }}>{p.title}</h1>
          <div style={{ display: 'flex', gap: 20, marginTop: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: '#C9A84C', letterSpacing: 1, fontWeight: 600 }}>{p.priceLabel || `₹${(p.price / 100000).toFixed(1)} L`}</span>
            <span style={{ width: 1, height: 24, background: 'rgba(201,168,76,0.3)' }} />
            <span style={{ fontSize: 13, color: '#A89878' }}>{p.bedrooms} Bedrooms</span>
            <span style={{ width: 1, height: 24, background: 'rgba(201,168,76,0.3)' }} />
            <span style={{ fontSize: 13, color: '#A89878' }}>{p.areaSqft} sqft Living</span>
            <span style={{ width: 1, height: 24, background: 'rgba(201,168,76,0.3)' }} />
            <span style={{ fontSize: 13, color: '#A89878' }}>{p.bathrooms} Bathrooms</span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', gap: 2, zIndex: 10 }}>
          {images.map((_: any, i: number) => (
            <div key={i} style={{ flex: 1, height: 3, background: i === currentImage ? '#C9A84C' : 'rgba(255,255,255,0.15)', transition: 'background 0.3s' }} />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '20px 32px', background: 'var(--surface-1, #0F0E0C)', borderTop: '1px solid rgba(201,168,76,0.2)', borderBottom: '1px solid rgba(201,168,76,0.2)', scrollbarWidth: 'none', whiteSpace: 'nowrap' }}>
        {[
          { icon: '🛏', label: 'Bedrooms', value: `${p.bedrooms || '?'} BHK` },
          { icon: '🚿', label: 'Bathrooms', value: `${p.bathrooms || '?'}` },
          { icon: '📐', label: 'Area', value: `${p.areaSqft || '?'} sqft` },
          { icon: '🏊', label: 'Pool', value: 'Private' },
          { icon: '🚗', label: 'Parking', value: '3 Cars' },
          { icon: '🧭', label: 'Facing', value: 'North' },
          { icon: '📅', label: 'Status', value: 'Ready to Move' },
        ].map((spec) => (
          <div key={spec.label} style={{ padding: '10px 20px', background: 'var(--surface-2, #161412)', borderRadius: 12, border: '1px solid rgba(201,168,76,0.1)', minWidth: 90, textAlign: 'center' }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{spec.icon}</div>
            <div style={{ fontSize: 9, color: '#6B5E45', letterSpacing: 2, fontFamily: "'Cinzel', serif" }}>{spec.label}</div>
            <div style={{ fontSize: 14, color: '#C9A84C', fontFamily: "'DM Sans', sans-serif", marginTop: 2, fontWeight: 600 }}>{spec.value}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '32px 32px 0', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#C9A84C', margin: '0 0 8px', textAlign: 'center' }}>Exclusive Highlights</h2>
        <div style={{ width: 60, height: 2, background: '#C9A84C', margin: '0 auto 24px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { icon: '🏊', title: 'Private Swimming Pool', desc: 'Temperature-controlled luxury pool with deck area and panoramic views' },
            { icon: '🌳', title: 'Landscaped Garden', desc: '2400 sqft of manicured garden with automatic irrigation and outdoor seating' },
            { icon: '🎬', title: 'Home Theatre Room', desc: 'Fully equipped 7.1 surround sound home theatre with 120" projection screen' },
            { icon: '🏠', title: 'Smart Home Automation', desc: 'Voice-controlled lighting, climate, security, and entertainment systems' },
            { icon: '🛁', title: 'Spa Master Bathroom', desc: 'Jacuzzi, steam shower, and imported Italian marble throughout' },
            { icon: '🔐', title: '24/7 Concierge Security', desc: 'Gated community with CCTV, intercom, and dedicated security staff' },
          ].map((h) => (
            <div key={h.title} style={{ background: 'var(--surface-1, #0F0E0C)', borderRadius: 16, padding: 24, border: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{h.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: '#C9A84C', margin: '0 0 6px' }}>{h.title}</h3>
              <p style={{ fontSize: 13, color: '#A89878', lineHeight: 1.6, margin: 0 }}>{h.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 360px', gap: 32, padding: '32px 32px', maxWidth: 1200, margin: '0 auto' }}>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: '#C9A84C', margin: '0 0 16px' }}>About This Villa</h2>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: '#A89878', fontFamily: "'DM Sans', sans-serif" }}>{p.description}</p>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: '#6B5E45', letterSpacing: 2, marginTop: 32, marginBottom: 12 }}>PREMIUM FEATURES</h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 8 }}>
            {p.features?.map((f: string, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#A89878', padding: '8px 12px', background: 'var(--surface-2, #161412)', borderRadius: 8 }}>
                <span style={{ color: '#C9A84C', fontSize: 16 }}>✦</span> {f}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--surface-1, #0F0E0C)', borderRadius: 16, padding: 28, border: '1px solid rgba(201,168,76,0.2)', height: 'fit-content', position: 'sticky', top: 88 }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: '#6B5E45', letterSpacing: 3, marginBottom: 8 }}>LISTED BY</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#C9A84C', margin: 0 }}>Vikram Mehta</h3>
          <p style={{ fontSize: 13, color: '#A89878', margin: '6px 0 4px' }}>Marketing OS Luxury Estates</p>
          <p style={{ fontSize: 11, color: '#6B5E45', margin: '0 0 16px' }}>⭐ 20 years experience</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => setShowEnquiry(true)} style={{ padding: '14px 24px', background: '#C9A84C', color: '#080807', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Schedule a Visit</button>
            <a href={`tel:${p.ownerPhone || ''}`} style={{ padding: '14px 24px', background: 'transparent', color: '#C9A84C', border: '1px solid #C9A84C', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>📞 Call Broker</a>
            <a href={p.waLink || '#'} target="_blank" rel="noopener noreferrer" style={{ padding: '14px 24px', background: '#15803D', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>💬 WhatsApp Share</a>
          </div>
        </div>
      </div>

      {isMobile && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'var(--surface-1, #0F0E0C)', borderTop: '1px solid rgba(201,168,76,0.2)', padding: '12px 16px', display: 'flex', gap: 8, zIndex: 100 }}>
          <div style={{ flex: 1 }}><div style={{ fontSize: 16, fontWeight: 600, color: '#C9A84C' }}>{p.priceLabel || `₹${(p.price / 100000).toFixed(1)} L`}</div><div style={{ fontSize: 12, color: '#6B5E45' }}>{p.bedrooms} BHK · {p.areaSqft} sqft · Pool</div></div>
          <a href={`tel:${p.ownerPhone || ''}`} style={{ padding: '10px 20px', background: '#15803D', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>📞 Call</a>
          <button onClick={() => setShowEnquiry(true)} style={{ padding: '10px 20px', background: '#C9A84C', color: '#080807', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Visit</button>
        </div>
      )}

      {showEnquiry && (
        <div onClick={() => setShowEnquiry(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--surface-1, #0F0E0C)', borderRadius: 16, padding: 32, maxWidth: 440, width: '100%', border: '1px solid rgba(201,168,76,0.2)' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#C9A84C', margin: '0 0 20px' }}>Schedule Your Visit</h3>
            <EnquiryForm
              propertyId={p.id}
              state={enquiryState}
              setState={setEnquiryState}
              onClose={() => { setShowEnquiry(false); setEnquiryState('idle') }}
              cta="Request Visit"
            />
          </div>
        </div>
      )}

      {isMobile && <div style={{ height: 80 }} />}
    </div>
  )
}
