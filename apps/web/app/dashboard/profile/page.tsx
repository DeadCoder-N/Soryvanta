'use client'

import { useState, useEffect } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid var(--linen-dk)',
  background: 'var(--linen)',
  color: 'var(--ink)',
  padding: '13px 16px',
  fontSize: '0.875rem',
  transition: 'border-color 0.2s',
}

export default function ProfilePage() {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/broker/profile')
      .then(r => r.json())
      .then(data => {
        setName(data.name ?? '')
        setEmail(data.email ?? '')
        setPhone(data.phone ?? '')
        setFetching(false)
      })
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const cleanPhone = phone.replace(/[^0-9+]/g, '')

    const res = await fetch('/api/broker/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone: cleanPhone }),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Update failed')
    } else {
      setSuccess('Profile updated! WhatsApp is now linked.')
      // Reload the page so sidebar updates too
      setTimeout(() => window.location.reload(), 1200)
    }
  }

  if (fetching) {
    return (
      <div style={{ maxWidth: '520px' }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '520px' }}>
      <p style={{ fontSize: '0.62rem', color: 'var(--mauve)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '12px' }}>
        Account
      </p>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--ink)', fontWeight: 400, marginBottom: '8px' }}>
        Profile Settings
      </h1>
      <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: '48px', lineHeight: 1.7 }}>
        Your WhatsApp number is how we link incoming messages to your account. Make sure it matches the number you use to message our WhatsApp bot.
      </p>

      {/* WhatsApp notice banner if no phone */}
      {!phone && (
        <div style={{
          background: 'rgba(184,134,11,0.08)',
          border: '1px solid rgba(184,134,11,0.25)',
          padding: '14px 18px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}>
          <span style={{ fontSize: '1rem' }}>⚠</span>
          <p style={{ fontSize: '0.8rem', color: 'var(--gold)', lineHeight: 1.6 }}>
            No WhatsApp number linked. Add your number below so you can create listings by messaging our WhatsApp bot.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Name */}
        <div>
          <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--mauve)')}
            onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')}
          />
        </div>

        {/* Email — read only */}
        <div>
          <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Email <span style={{ color: 'var(--ink-muted)', fontWeight: 400, fontSize: '0.62rem' }}>(cannot change)</span>
          </label>
          <input
            type="email"
            value={email}
            disabled
            style={{ ...inputStyle, opacity: 0.5, cursor: 'not-allowed', background: 'var(--linen-md)' }}
          />
        </div>

        {/* WhatsApp Phone */}
        <div>
          <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            WhatsApp Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
            placeholder="919876543210"
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--mauve)')}
            onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')}
          />
          <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: '6px' }}>
            Include country code, no spaces or dashes — e.g. <strong>919876543210</strong> for India
          </p>
        </div>

        {error && (
          <p style={{ fontSize: '0.8rem', color: 'var(--gold)', background: 'rgba(184,134,11,0.08)', padding: '12px 16px' }}>
            {error}
          </p>
        )}

        {success && (
          <p style={{ fontSize: '0.8rem', color: 'var(--logo-green)', background: 'rgba(26,107,42,0.08)', padding: '12px 16px' }}>
            ✓ {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? 'var(--linen-dk)' : 'var(--ink)',
            color: 'var(--warm-white)',
            padding: '15px', fontSize: '0.72rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  )
}
