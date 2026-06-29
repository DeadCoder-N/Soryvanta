'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid var(--linen-dk)',
  background: 'var(--linen)',
  color: 'var(--ink)',
  padding: '13px 16px',
  fontSize: '0.875rem',
  transition: 'border-color 0.2s',
}

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const res = await signIn('credentials', {
      email: form.get('email'),
      password: form.get('password'),
      redirect: false,
    })
    setLoading(false)
    if (res?.error) setError('Invalid email or password')
    else router.push('/dashboard')
  }

  return (
    <>
      <p style={{ fontSize: '0.62rem', color: 'var(--mauve)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '20px' }}>
        Welcome Back
      </p>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', color: 'var(--ink)', fontWeight: 400, marginBottom: '8px' }}>
        Sign in
      </h1>
      <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: '40px' }}>
        Access your broker dashboard
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Email
          </label>
          <input name="email" type="email" required style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--mauve)')}
            onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')} />
        </div>
        <div>
          <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Password
          </label>
          <input name="password" type="password" required style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--mauve)')}
            onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')} />
        </div>

        {error && (
          <p style={{ fontSize: '0.8rem', color: 'var(--gold)', background: 'rgba(184,134,11,0.08)', padding: '10px 14px' }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} style={{
          background: 'var(--ink)', color: 'var(--warm-white)',
          padding: '14px', fontSize: '0.72rem', letterSpacing: '0.16em',
          textTransform: 'uppercase', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1, marginTop: '4px',
        }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginTop: '28px', textAlign: 'center' }}>
        No account?{' '}
        <Link href="/register" style={{ color: 'var(--ink)', borderBottom: '1px solid var(--ink)', paddingBottom: '1px', textDecoration: 'none' }}>
          Register here
        </Link>
      </p>
    </>
  )
}
