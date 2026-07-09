'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import PhoneInput from '@/components/PhoneInput'
import type { PhoneInputValue } from '@/components/PhoneInput'
import { getFullPhone } from '@/components/PhoneInput'

type View = 'login' | 'register'

export default function AuthPage({ initial }: { initial: View }) {
  const router = useRouter()
  const [view, setView] = useState<View>(initial)
  const [animating, setAnimating] = useState(false)
  const [entered, setEntered] = useState(false)

  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [regError, setRegError] = useState('')
  const [regLoading, setRegLoading] = useState(false)

useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60)
    return () => clearTimeout(t)
  }, [])

  function switchTo(target: View) {
    if (target === view || animating) return
    setAnimating(true)
    setView(target)
    window.history.replaceState(null, '', target === 'login' ? '/login' : '/register')
    setTimeout(() => setAnimating(false), 700)
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

  async function handleRegister(e: React.FormEvent<HTMLFormElement>, phoneVal: PhoneInputValue) {
    e.preventDefault()
    setRegError(''); setRegLoading(true)
    const form = new FormData(e.currentTarget)
    const phone = getFullPhone(phoneVal)
    const countryCode = phoneVal.countryCode
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.get('name'),
        email: form.get('email'),
        password: form.get('password'),
        phone,
        countryCode,
      }),
    })
    if (!res.ok) { setRegError((await res.json()).error ?? 'Registration failed'); setRegLoading(false); return }
    await signIn('credentials', { email: form.get('email'), password: form.get('password'), redirect: false })
    router.push('/')
  }

  const contentLeft = view === 'login' ? '0%' : '50%'

  return (
    <>
      <style>{`
        .auth-root {
          min-height: 100vh;
          background: var(--bg);
          position: relative;
          overflow: hidden;
        }

        .form-half {
          position: absolute;
          top: 0; bottom: 0;
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 1.5rem;
        }
        .form-half-left  { left: 0; }
        .form-half-right { left: 50%; }

        .content-panel {
          position: absolute;
          top: 0; bottom: 0;
          width: 50%;
          background: var(--surface-1);
          border-right: 1px solid var(--border);
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          z-index: 10;
          transition: left 0.7s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .content-enter {
          animation: contentSlideIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .form-enter-right {
          animation: formSlideIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
          opacity: 0;
        }
        .form-enter-left {
          animation: formSlideInLeft 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
          opacity: 0;
        }
        @keyframes contentSlideIn {
          from { opacity: 0; transform: translateX(-60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes formSlideIn {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes formSlideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes glintSweep {
          0%   { transform: translateX(-120%) skewX(-18deg); }
          100% { transform: translateX(320%)  skewX(-18deg); }
        }
        .glint { animation: glintSweep 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

        @keyframes fieldIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .field-stagger {
          opacity: 0;
          animation: fieldIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .gold-input-wrap { position: relative; }
        .gold-input-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius-md, 8px);
          border: 1.5px solid var(--gold);
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .gold-input-wrap:focus-within::after {
          opacity: 1;
          animation: borderTrace 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes borderTrace {
          from { clip-path: inset(0 100% 100% 0); }
          to   { clip-path: inset(0 0% 0% 0); }
        }
      `}</style>

      <div className="auth-root" style={{ minHeight: '100vh' }}>

        {/* Background ambient glow */}
        <div style={{
          position: 'fixed', top: '-200px', right: '-200px',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'fixed', bottom: '-200px', left: '-200px',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Gold glint sweep */}
        {animating && (
          <div className="glint" style={{
            position: 'fixed', top: 0, left: 0,
            width: '35%', height: '100%',
            zIndex: 50, pointerEvents: 'none',
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.06) 30%, rgba(245,208,128,0.18) 50%, rgba(201,168,76,0.06) 70%, transparent)',
          }} />
        )}

        {/* Register form — LEFT half */}
        <div className={`form-half form-half-left${entered ? ' form-enter-left' : ''}`}
          style={{ visibility: view === 'login' ? 'hidden' : 'visible' }}
        >
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <RegisterForm onSwitch={switchTo} onSubmit={handleRegister} error={regError} loading={regLoading} />

          </div>
        </div>

        {/* Login form — RIGHT half */}
        <div className={`form-half form-half-right${entered ? ' form-enter-right' : ''}`}
          style={{ visibility: view === 'register' ? 'hidden' : 'visible' }}
        >
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <LoginForm onSwitch={switchTo} onSubmit={handleLogin} error={loginError} loading={loginLoading} />
          </div>
        </div>

        {/* Content panel — slides like a curtain */}
        <div
          className={`content-panel${entered ? ' content-enter' : ''}`}
          style={{ left: contentLeft, opacity: entered ? undefined : 0 }}
        >
          {/* Decorative glow */}
          <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
          
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--gold-dim), rgba(201,168,76,0.05))',
                border: '1px solid var(--gold-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Image src="/Brisvora.png" alt="Brisvora" width={30} height={30} className="logo-img" style={{ objectFit: 'contain' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
                Brisvora
                <span style={{ color: 'var(--gold)', fontSize: '0.55rem', verticalAlign: 'super', marginLeft: '2px' }}>™</span>
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '20px' }}>
              Turn a WhatsApp<br />message into a<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--gold), var(--gold-bright))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                premium listing.
              </span>
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Send property details via WhatsApp.<br />AI creates the listing in seconds. Share the URL instantly.
            </p>
          </div>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {['Send WhatsApp message with details', 'AI crafts title, description & SEO', 'Share the premium listing URL'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold-dim), transparent)',
                  border: '1px solid var(--gold-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 600, flexShrink: 0,
                  fontFamily: "'Cinzel', serif",
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{s}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', position: 'relative' }}>© 2026 Brisvora. All rights reserved.</p>
        </div>

      </div>
    </>
  )
}

function TypingInput({ placeholder, name, type, required, minLength }: {
  placeholder: string; name: string; type: string; required?: boolean; minLength?: number
}) {
  const [displayed, setDisplayed] = useState('')
  const [focused, setFocused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function startTyping() {
    setFocused(true)
    if (displayed.length > 0) return
    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      setDisplayed(placeholder.slice(0, i))
      if (i >= placeholder.length) clearInterval(intervalRef.current!)
    }, 38)
  }

  function stopTyping() {
    setFocused(false)
    clearInterval(intervalRef.current!)
    setDisplayed('')
  }

  return (
    <div className="gold-input-wrap">
      <input
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        placeholder={focused ? displayed : placeholder}
        className="input-modern"
        onFocus={startTyping}
        onBlur={stopTyping}
        style={{ width: '100%', paddingTop: '14px', paddingBottom: '14px' }}
      />
    </div>
  )
}

function LoginForm({ onSwitch, onSubmit, error, loading }: {
  onSwitch: (v: View) => void; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; error: string; loading: boolean
}) {
  const fields = [
    { label: 'Email',    name: 'email',    type: 'email',    placeholder: 'you@example.com' },
    { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
  ]
  return (
    <div>
      <div className="field-stagger" style={{ marginBottom: '36px', animationDelay: '0ms' }}>
        <span className="section-label" style={{ marginBottom: '16px', display: 'inline-block' }}>Welcome back</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '8px' }}>
          Sign in
          <span style={{ color: 'var(--gold)', fontSize: '1.5rem', marginLeft: '4px' }}>.</span>
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Access your broker dashboard</p>
      </div>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {fields.map((f, i) => (
          <div key={f.name} className="field-stagger" style={{ animationDelay: `${(i + 1) * 70}ms` }}>
            <label style={labelStyle}>{f.label}</label>
            <TypingInput name={f.name} type={f.type} placeholder={f.placeholder} required />
          </div>
        ))}
        {error && <ErrorBox msg={error} />}
        <div className="field-stagger" style={{ animationDelay: '210ms' }}>
          <button type="submit" disabled={loading} className="btn-primary" style={{
            padding: '15px', fontSize: '0.82rem', width: '100%',
            opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer',
          }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>
      <p className="field-stagger" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '28px', textAlign: 'center', animationDelay: '260ms' }}>
        No account?{' '}
        <button onClick={() => onSwitch('register')} style={linkBtnStyle}>Register here</button>
      </p>
    </div>
  )
}

function RegisterForm({ onSwitch, onSubmit, error, loading }: {
  onSwitch: (v: View) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>, phone: PhoneInputValue) => void
  error: string
  loading: boolean
}) {
  const [phoneValue, setPhoneValue] = useState<PhoneInputValue>({ countryCode: '+91', phone: '' })
  const [phoneError, setPhoneError] = useState<string | null>(null)

  const fields = [
    { label: 'Full Name',        name: 'name',     type: 'text',     placeholder: 'Rahul Sharma' },
    { label: 'Email',            name: 'email',    type: 'email',    placeholder: 'you@example.com' },
    { label: 'Password',         name: 'password', type: 'password', placeholder: 'Min 8 characters' },
  ]

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const digits = phoneValue.phone.replace(/\D/g, '')
    if (!digits || digits.length < 7) {
      setPhoneError('Enter a valid phone number')
      return
    }
    setPhoneError(null)
    onSubmit(e, phoneValue)
  }

  return (
    <div>
      <div className="field-stagger" style={{ marginBottom: '28px', animationDelay: '0ms' }}>
        <span className="section-label" style={{ color: 'var(--gold)', marginBottom: '16px', display: 'inline-block' }}>Free to start</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '8px' }}>
          Create account
          <span style={{ color: 'var(--gold)', fontSize: '1.5rem', marginLeft: '4px' }}>.</span>
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Start listing properties in minutes</p>
      </div>
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {fields.map((f, i) => (
          <div key={f.name} className="field-stagger" style={{ animationDelay: `${(i + 1) * 60}ms` }}>
            <label style={labelStyle}>{f.label}</label>
            <TypingInput name={f.name} type={f.type} placeholder={f.placeholder} required minLength={f.name === 'password' ? 8 : undefined} />
          </div>
        ))}
        {/* Phone with country code dropdown */}
        <div className="field-stagger" style={{ animationDelay: `${(fields.length + 1) * 60}ms` }}>
          <PhoneInput
            value={phoneValue}
            onChange={setPhoneValue}
            error={phoneError}
            label="WhatsApp Number"
            placeholder="Enter phone number"
          />
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '5px' }}>
            Your WhatsApp number for AI listing generation
          </p>
        </div>
        {error && <ErrorBox msg={error} />}
        <div className="field-stagger" style={{ animationDelay: '320ms' }}>
          <button type="submit" disabled={loading} className="btn-primary" style={{
            padding: '15px', fontSize: '0.82rem', width: '100%',
            opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer',
          }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </div>
      </form>
      <p className="field-stagger" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '22px', textAlign: 'center', animationDelay: '370ms' }}>
        Already have an account?{' '}
        <button onClick={() => onSwitch('login')} style={linkBtnStyle}>Sign in</button>
      </p>
    </div>
  )
}

const labelStyle: React.CSSProperties = { fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }
const linkBtnStyle: React.CSSProperties = { background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.85rem', padding: 0, fontWeight: 500 }

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div style={{
      background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
      borderRadius: 'var(--radius-md)', padding: '12px 14px',
    }}>
      <p style={{ fontSize: '0.82rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>⚠</span> {msg}
      </p>
    </div>
  )
}