'use client'

import { useState, useEffect } from 'react'

export default function ProfilePage() {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/broker/profile').then(r => r.json()).then(data => {
      setName(data.name ?? ''); setEmail(data.email ?? ''); setPhone(data.phone ?? '')
      setFetching(false)
    })
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(''); setSuccess(''); setLoading(true)
    const res = await fetch('/api/broker/profile', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone: phone.replace(/[^0-9+]/g, '') }),
    })
    setLoading(false)
    if (!res.ok) setError((await res.json()).error ?? 'Update failed')
    else { setSuccess('Profile updated successfully!'); setTimeout(() => window.location.reload(), 1200) }
  }

  if (fetching) {
    return (
      <div style={{ maxWidth: '520px' }}>
        <div style={{ height: '28px', width: '160px', marginBottom: '8px' }} className="skeleton" />
        <div style={{ height: '20px', width: '280px', marginBottom: '40px' }} className="skeleton" />
        {[1, 2, 3].map(i => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <div style={{ height: '14px', width: '80px', marginBottom: '10px' }} className="skeleton" />
            <div style={{ height: '46px', width: '100%' }} className="skeleton" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '520px' }} className="animate-fade-up">
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '4px' }}>Account</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '8px' }}>
          Profile Settings
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Your WhatsApp number links incoming messages to your account.
        </p>
      </div>

      {!phone && (
        <div style={{ background: 'rgba(201,150,14,0.08)', border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-md)', padding: '14px 16px', marginBottom: '28px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span>⚠️</span>
          <p style={{ fontSize: '0.82rem', color: 'var(--gold)', lineHeight: 1.6 }}>
            No WhatsApp number linked. Add your number to create listings via WhatsApp.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Full Name
          </label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="input-modern" />
        </div>

        <div>
          <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Email <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', fontWeight: 400 }}>(cannot change)</span>
          </label>
          <input type="email" value={email} disabled className="input-modern"
            style={{ opacity: 0.45, cursor: 'not-allowed' }} />
        </div>

        <div>
          <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            WhatsApp Number
          </label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required
            placeholder="919876543210" className="input-modern" />
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Include country code, no spaces — e.g. <strong style={{ color: 'var(--text-secondary)' }}>919876543210</strong>
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
            <p style={{ fontSize: '0.82rem', color: '#f87171' }}>{error}</p>
          </div>
        )}
        {success && (
          <div style={{ background: 'var(--green-dim)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
            <p style={{ fontSize: '0.82rem', color: '#4ade80' }}>✓ {success}</p>
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary"
          style={{ padding: '14px', fontSize: '0.88rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  )
}
