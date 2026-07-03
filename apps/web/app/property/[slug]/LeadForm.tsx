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
      <div style={{ background: 'var(--green-dim)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 'var(--radius-lg)', padding: '28px', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✅</div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '6px' }}>Enquiry Sent!</p>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>The broker will contact you shortly.</p>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '18px' }}>
        Send Enquiry
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input name="name" placeholder="Your name" required className="input-modern" />
        <input name="phone" placeholder="Phone number" type="tel" className="input-modern" />
        <textarea name="message" placeholder="Message (optional)" rows={3}
          className="input-modern" style={{ resize: 'none' }} />
        <button type="submit" disabled={loading} className="btn-primary"
          style={{ padding: '13px', fontSize: '0.82rem', marginTop: '4px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Sending...' : 'Send Enquiry'}
        </button>
      </form>
    </div>
  )
}
