'use client'

import { useState } from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type View = 'login' | 'register'

export default function AuthPage({ initial }: { initial: View }) {
  const router = useRouter()
  const [view, setView] = useState<View>(initial)
  const [curtain, setCurtain] = useState<'idle' | 'sweep-in' | 'sweep-out'>('idle')

  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [regError, setRegError] = useState('')
  const [regLoading, setRegLoading] = useState(false)

  function switchTo(target: View) {
    if (target === view || curtain !== 'idle') return

    // Phase 1: gold curtain sweeps IN (left → right covers screen) — 400ms
    setCurtain('sweep-in')

    // Phase 2: at peak coverage swap content — 420ms
    setTimeout(() => {
      setView(target)
      window.history.replaceState(null, '', target === 'login' ? '/login' : '/register')
      // Phase 3: curtain sweeps OUT (continues right → off screen) — 400ms
      setCurtain('sweep-out')
    }, 420)

    // Phase 4: done
    setTimeout(() => setCurtain('idle'), 840)
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoginError(''); setLoginLoading(true)
    const form = new FormData(e.currentTarget)
    const res = await signIn('credentials', { email: form.get('email'), password: form.get('password'), redirect: false })
    setLoginLoading(false)
    if (res?.error) setLoginError('Invalid email or password')
    else router.push('/')
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setRegError(''); setRegLoading(true)
    const form = new FormData(e.currentTarget)
    const phone = (form.get('phone') as string).replace(/[^0-9+]/g, '')
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.get('name'), email: form.get('email'), password: form.get('password'), phone }),
    })
    if (!res.ok) { setRegError((await res.json()).error ?? 'Registration failed'); setRegLoading(false); return }
    await signIn('credentials', { email: form.get('email'), password: form.get('password'), redirect: false })
    router.push('/')
  }

  const isLogin = view === 'login'

  return (
    <>
      <style>{`
        @keyframes curtainIn {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0%); }
        }
        @keyframes curtainOut {
          from { transform: translateX(0%); }
          to   { transform: translateX(100%); }
        }
        .curtain-sweep-in  { animation: curtainIn  0.42s cubic-bezier(0.7, 0, 0.3, 1) forwards; }
        .curtain-sweep-out { animation: curtainOut 0.42s cubic-bezier(0.7, 0, 0.3, 1) forwards; }

        .auth-content-fade-in {
          animation: contentFadeIn 0.3s ease 0.1s both;
        }
        @keyframes contentFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>

        {/* Gold curtain overlay */}
        {curtain !== 'idle' && (
          <div
            className={curtain === 'sweep-in' ? 'curtain-sweep-in' : 'curtain-sweep-out'}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'linear-gradient(135deg, var(--gold) 0%, #a07800 50%, var(--gold) 100%)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Layout */}
        <div
          key={view}
          className={curtain === 'sweep-out' ? 'auth-content-fade-in' : ''}
          style={{
            minHeight: '100vh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          {/* Brand panel — left on login, right on register */}
          <div style={{ order: isLogin ? 1 : 2, background: 'var(--surface-1)', borderRight: isLogin ? '1px solid var(--border)' : 'none', borderLeft: isLogin ? 'none' : '1px solid var(--border)', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(201,150,14,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
                <Image src="/Brisvora.png" alt="Brisvora" width={36} height={36} style={{ objectFit: 'contain' }} />
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)' }}>Brisvora</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: '20px' }}>
                Turn a WhatsApp<br />message into a<br />
                <span style={{ color: 'var(--gold)' }}>premium listing.</span>
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Send property details via WhatsApp.<br />AI creates the listing. Share the URL.
              </p>
            </div>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Send WhatsApp message', 'AI generates listing', 'Share the URL'].map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--gold-dim)', border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 600, flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{s}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', position: 'relative' }}>© 2026 Brisvora</p>
          </div>

          {/* Form panel */}
          <div style={{ order: isLogin ? 2 : 1, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 1.5rem' }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
              {isLogin
                ? <LoginForm onSwitch={switchTo} onSubmit={handleLogin} error={loginError} loading={loginLoading} />
                : <RegisterForm onSwitch={switchTo} onSubmit={handleRegister} error={regError} loading={regLoading} />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function LoginForm({ onSwitch, onSubmit, error, loading }: { onSwitch: (v: View) => void; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; error: string; loading: boolean }) {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <span className="badge badge-muted" style={{ marginBottom: '16px', display: 'inline-flex' }}>Welcome back</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '8px' }}>Sign in</h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Access your broker dashboard</p>
      </div>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Email</label>
          <input name="email" type="email" required className="input-modern" placeholder="you@example.com" />
        </div>
        <div>
          <label style={labelStyle}>Password</label>
          <input name="password" type="password" required className="input-modern" placeholder="••••••••" />
        </div>
        {error && <ErrorBox msg={error} />}
        <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '14px', fontSize: '0.85rem', marginTop: '4px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '24px', textAlign: 'center' }}>
        No account?{' '}
        <button onClick={() => onSwitch('register')} style={linkBtnStyle}>Register here</button>
      </p>
    </div>
  )
}

function RegisterForm({ onSwitch, onSubmit, error, loading }: { onSwitch: (v: View) => void; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; error: string; loading: boolean }) {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '16px', display: 'inline-flex' }}>Free to start</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '8px' }}>Create account</h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Start listing properties in minutes</p>
      </div>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={labelStyle}>Full Name</label>
          <input name="name" type="text" required placeholder="Rahul Sharma" className="input-modern" />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input name="email" type="email" required placeholder="you@example.com" className="input-modern" />
        </div>
        <div>
          <label style={labelStyle}>WhatsApp Number</label>
          <input name="phone" type="tel" required placeholder="919876543210" className="input-modern" />
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>With country code, no spaces — e.g. 919876543210</p>
        </div>
        <div>
          <label style={labelStyle}>Password</label>
          <input name="password" type="password" required minLength={8} placeholder="Min 8 characters" className="input-modern" />
        </div>
        {error && <ErrorBox msg={error} />}
        <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '14px', fontSize: '0.85rem', marginTop: '4px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '24px', textAlign: 'center' }}>
        Already have an account?{' '}
        <button onClick={() => onSwitch('login')} style={linkBtnStyle}>Sign in</button>
      </p>
    </div>
  )
}

const labelStyle: React.CSSProperties = { fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }
const linkBtnStyle: React.CSSProperties = { background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
      <p style={{ fontSize: '0.82rem', color: '#f87171' }}>{msg}</p>
    </div>
  )
}
