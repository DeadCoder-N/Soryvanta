'use client'

import { useState } from 'react'

export default function LeadForm({ propertyId, onSent }: { propertyId: string; onSent?: () => void }) {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true)
    const form = new FormData(e.currentTarget)
    await fetch('/api/leads', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId, name: form.get('name'), phone: form.get('phone'), message: form.get('message'), source: 'web' }),
    })
    setLoading(false); setSent(true); onSent?.()
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <div style={{ fontSize: '2rem', color: '#c9a84c', marginBottom: '10px' }}>✓</div>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', color: '#fff', marginBottom: '6px' }}>Enquiry Sent!</p>
        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)' }}>The broker will contact you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <input
        name="name" placeholder="Your name" required
        style={{
          width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', padding: '13px 16px', fontSize: '0.9rem', borderRadius: '8px', outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.15)' }}
        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none' }}
      />
      <input
        name="phone" placeholder="Phone number" type="tel" required
        style={{
          width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', padding: '13px 16px', fontSize: '0.9rem', borderRadius: '8px', outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.15)' }}
        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none' }}
      />
      <textarea
        name="message" placeholder="Message (optional)" rows={3}
        style={{
          width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', padding: '13px 16px', fontSize: '0.9rem', borderRadius: '8px', outline: 'none',
          resize: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', fontFamily: 'inherit',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.15)' }}
        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none' }}
      />
      <button
        type="submit" disabled={loading}
        style={{
          width: '100%', padding: '14px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: '#0a0a0a', cursor: loading ? 'not-allowed' : 'pointer',
          background: 'linear-gradient(135deg, #c9a84c, #f0d080)', border: 'none', borderRadius: '8px',
          opacity: loading ? 0.7 : 1, marginTop: '4px',
        }}
      >
        {loading ? 'Sending...' : 'Send Enquiry'}
      </button>
    </form>
  )
}
