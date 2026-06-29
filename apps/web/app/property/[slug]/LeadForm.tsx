'use client'

import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid var(--linen-dk)',
  background: 'var(--linen)',
  color: 'var(--ink)',
  padding: '11px 14px',
  fontSize: '0.83rem',
  transition: 'border-color 0.2s',
}

export default function LeadForm({ propertyId }: { propertyId: string }) {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget)
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyId,
        name: form.get('name'),
        phone: form.get('phone'),
        message: form.get('message'),
        source: 'web',
      }),
    })
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div style={{ background: 'var(--bark)', padding: '28px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--warm-white)', marginBottom: '8px' }}>
          Enquiry Sent
        </p>
        <p style={{ fontSize: '0.8rem', color: 'rgba(253,252,249,0.5)', lineHeight: 1.6 }}>
          The broker will contact you shortly.
        </p>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--warm-white)', border: '1px solid var(--linen-dk)', padding: '28px' }}>
      <p style={{ fontSize: '0.62rem', color: 'var(--mauve)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '20px' }}>
        Send Enquiry
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input name="name" placeholder="Your name" required style={inputStyle}
          onFocus={e => (e.target.style.borderColor = 'var(--mauve)')}
          onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')} />
        <input name="phone" placeholder="Phone number" type="tel" style={inputStyle}
          onFocus={e => (e.target.style.borderColor = 'var(--mauve)')}
          onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')} />
        <textarea name="message" placeholder="Message (optional)" rows={3} style={{ ...inputStyle, resize: 'none' }}
          onFocus={e => (e.target.style.borderColor = 'var(--mauve)')}
          onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')} />
        <button type="submit" disabled={loading} style={{
          background: 'var(--ink)', color: 'var(--warm-white)',
          padding: '13px', fontSize: '0.7rem', letterSpacing: '0.16em',
          textTransform: 'uppercase', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1, marginTop: '4px',
        }}>
          {loading ? 'Sending...' : 'Send Enquiry'}
        </button>
      </form>
    </div>
  )
}
