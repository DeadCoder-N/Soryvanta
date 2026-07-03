'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(''); setLoading(true)
    const form = new FormData(e.currentTarget)
    const res = await signIn('credentials', { email: form.get('email'), password: form.get('password'), redirect: false })
    setLoading(false)
    if (res?.error) setError('Invalid email or password')
    else router.push('/dashboard')
  }

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: '32px' }}>
        <span className="badge badge-muted" style={{ marginBottom: '16px', display: 'inline-flex' }}>Welcome back</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '8px' }}>
          Sign in
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Access your broker dashboard</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Email
          </label>
          <input name="email" type="email" required className="input-modern" placeholder="you@example.com" />
        </div>
        <div>
          <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Password
          </label>
          <input name="password" type="password" required className="input-modern" placeholder="••••••••" />
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
            <p style={{ fontSize: '0.82rem', color: '#f87171' }}>{error}</p>
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary"
          style={{ padding: '14px', fontSize: '0.85rem', marginTop: '4px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '24px', textAlign: 'center' }}>
        No account?{' '}
        <Link href="/register" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
          Register here
        </Link>
      </p>
    </div>
  )
}
