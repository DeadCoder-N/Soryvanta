'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(''); setLoading(true)
    const form = new FormData(e.currentTarget)
    const phone = (form.get('phone') as string).replace(/[^0-9+]/g, '')
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.get('name'), email: form.get('email'), password: form.get('password'), phone }),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Registration failed')
      setLoading(false)
      return
    }
    await signIn('credentials', { email: form.get('email'), password: form.get('password'), redirect: false })
    router.push('/dashboard')
  }

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: '32px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '16px', display: 'inline-flex' }}>Free to start</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '8px' }}>
          Create account
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Start listing properties in minutes</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {[
          { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Rahul Sharma', required: true },
          { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
        ].map(f => (
          <div key={f.name}>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              {f.label}
            </label>
            <input name={f.name} type={f.type} required={f.required} placeholder={f.placeholder} className="input-modern" />
          </div>
        ))}

        <div>
          <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            WhatsApp Number
          </label>
          <input name="phone" type="tel" required placeholder="919876543210" className="input-modern" />
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            With country code, no spaces — e.g. 919876543210
          </p>
        </div>

        <div>
          <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Password
          </label>
          <input name="password" type="password" required minLength={8} placeholder="Min 8 characters" className="input-modern" />
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
            <p style={{ fontSize: '0.82rem', color: '#f87171' }}>{error}</p>
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary"
          style={{ padding: '14px', fontSize: '0.85rem', marginTop: '4px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '24px', textAlign: 'center' }}>
        Already have an account?{' '}
        <Link href="/login" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Sign in</Link>
      </p>
    </div>
  )
}
