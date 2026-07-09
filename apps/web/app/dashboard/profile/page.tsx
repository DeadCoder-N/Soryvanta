'use client'

import { useState, useEffect } from 'react'
import PhoneInput from '@/components/PhoneInput'
import type { PhoneInputValue } from '@/components/PhoneInput'
import { getFullPhone, validatePhone } from '@/components/PhoneInput'
import { IcoWarning, IcoCheck } from '@/components/Icons'

export default function ProfilePage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneValue, setPhoneValue] = useState<PhoneInputValue>({ countryCode: '+91', phone: '' })
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // OTP state
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpError, setOtpError] = useState('')
  const [otpSuccess, setOtpSuccess] = useState('')
  const [otpTimer, setOtpTimer] = useState(0)
  const [otpDevCode, setOtpDevCode] = useState('')

  useEffect(() => {
    fetch('/api/broker/profile').then(r => r.json()).then(data => {
      setName(data.name ?? '')
      setEmail(data.email ?? '')
      setPhoneVerified(data.phoneVerified ?? false)
      // Parse existing phone into country code + local number
      const phone = data.phone ?? ''
      const code = data.countryCode ?? '+91'
      const digits = phone.replace(/\D/g, '')
      setPhoneValue({ countryCode: code, phone: digits })
      setFetching(false)
    })
  }, [])

  // OTP countdown timer
  useEffect(() => {
    if (otpTimer <= 0) return
    const t = setInterval(() => setOtpTimer(p => p - 1), 1000)
    return () => clearInterval(t)
  }, [otpTimer])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(''); setSuccess(''); setLoading(true)

    const phoneError = validatePhone(phoneValue)
    if (phoneError) { setError(phoneError); setLoading(false); return }

    const fullPhone = getFullPhone(phoneValue)
    const res = await fetch('/api/broker/profile', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone: fullPhone }),
    })
    setLoading(false)
    if (!res.ok) setError((await res.json()).error ?? 'Update failed')
    else {
      setSuccess('Profile updated successfully!')
      setPhoneVerified(false) // Reset verification on phone change
      setOtpSent(false)
      setTimeout(() => window.location.reload(), 1200)
    }
  }

  async function handleSendOtp() {
    setOtpError(''); setOtpSuccess(''); setOtpLoading(true)

    const phoneError = validatePhone(phoneValue)
    if (phoneError) { setOtpError(phoneError); setOtpLoading(false); return }

    const fullPhone = getFullPhone(phoneValue)
    const res = await fetch('/api/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: fullPhone, countryCode: phoneValue.countryCode }),
    })
    const data = await res.json()
    setOtpLoading(false)

    if (!res.ok) {
      setOtpError(data.error || 'Failed to send OTP')
      return
    }

    setOtpSent(true)
    setOtpTimer(60)
    setOtpSuccess('OTP sent to your WhatsApp number')
    // In dev mode, show the OTP for testing
    if (data.otp) {
      setOtpDevCode(data.otp)
    }
  }

  async function handleVerifyOtp() {
    setOtpError(''); setOtpSuccess(''); setOtpLoading(true)

    if (!otp || otp.length !== 6) {
      setOtpError('Enter the 6-digit code sent to your WhatsApp')
      setOtpLoading(false)
      return
    }

    const fullPhone = getFullPhone(phoneValue)
    const res = await fetch('/api/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: fullPhone, otp }),
    })
    const data = await res.json()
    setOtpLoading(false)

    if (!res.ok) {
      setOtpError(data.error || 'Verification failed')
      return
    }

    setPhoneVerified(true)
    setOtpSuccess('✓ Phone number verified successfully')
    setOtp('')
    setOtpDevCode('')
  }

  if (fetching) {
    return (
      <div style={{ maxWidth: '560px' }}>
        <div style={{ height: '28px', width: '160px', marginBottom: '8px' }} className="skeleton" />
        <div style={{ height: '20px', width: '280px', marginBottom: '40px' }} className="skeleton" />
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <div style={{ height: '14px', width: '80px', marginBottom: '10px' }} className="skeleton" />
            <div style={{ height: '46px', width: '100%' }} className="skeleton" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '560px' }} className="animate-fade-up">
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '4px' }}>Account</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '8px' }}>
          Profile Settings
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Manage your account details and verify your WhatsApp number for AI listing generation.
        </p>
      </div>

      {/* Phone not set warning */}
      {!phoneValue.phone && (
        <div style={{ background: 'rgba(201,150,14,0.08)', border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-md)', padding: '14px 16px', marginBottom: '28px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span style={{ flexShrink: 0, marginTop: '2px', color: 'var(--gold)' }}>
            <IcoWarning size={16} />
          </span>
          <p style={{ fontSize: '0.82rem', color: 'var(--gold)', lineHeight: 1.6 }}>
            No WhatsApp number linked. Add your number to create listings via WhatsApp.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Name */}
        <div>
          <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Full Name
          </label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="input-modern" />
        </div>

        {/* Email */}
        <div>
          <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Email <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', fontWeight: 400 }}>(cannot change)</span>
          </label>
          <input type="email" value={email} disabled className="input-modern"
            style={{ opacity: 0.45, cursor: 'not-allowed' }} />
        </div>

        {/* WhatsApp Number with Country Code */}
        <div>
          <PhoneInput
            value={phoneValue}
            onChange={setPhoneValue}
            label="WhatsApp Number"
            placeholder="Enter phone number"
          />
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Your WhatsApp number for AI listing generation and OTP verification
          </p>
        </div>

        {/* OTP Verification Section */}
        <div style={{
          background: 'var(--surface-2)',
          border: `1px solid ${phoneVerified ? 'rgba(74,222,128,0.2)' : 'var(--border)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '20px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              WhatsApp Verification
            </p>
            {phoneVerified ? (
              <span style={{
                fontSize: '0.65rem', fontWeight: 600, padding: '3px 10px',
                borderRadius: '999px', background: 'rgba(74,222,128,0.1)',
                color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)',
              }}>
                ✓ Verified
              </span>
            ) : (
              <span style={{
                fontSize: '0.65rem', fontWeight: 500, padding: '3px 10px',
                borderRadius: '999px', background: 'rgba(201,168,76,0.08)',
                color: 'var(--gold)', border: '1px solid var(--gold-border)',
              }}>
                Not verified
              </span>
            )}
          </div>

          {!phoneVerified && (
            <>
              {!otpSent ? (
                <button type="button" onClick={handleSendOtp} disabled={otpLoading || !phoneValue.phone}
                  style={{
                    padding: '10px 16px', fontSize: '0.78rem',
                    background: 'rgba(201,168,76,0.08)',
                    border: '1px solid var(--gold-border)',
                    borderRadius: '8px', color: 'var(--gold)',
                    cursor: (!otpLoading && phoneValue.phone) ? 'pointer' : 'not-allowed',
                    opacity: (!otpLoading && phoneValue.phone) ? 1 : 0.5,
                    fontFamily: "'DM Sans', sans-serif",
                    width: '100%',
                  }}>
                  {otpLoading ? 'Sending OTP...' : 'Send OTP via WhatsApp'}
                </button>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                      Enter 6-digit OTP
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otp}
                        onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="000000"
                        className="input-modern"
                        style={{ flex: 1, textAlign: 'center', letterSpacing: '6px', fontSize: '18px', fontFamily: "'DM Sans', monospace" }}
                      />
                      <button type="button" onClick={handleVerifyOtp} disabled={otpLoading || otp.length !== 6}
                        style={{
                          padding: '10px 20px', fontSize: '0.78rem',
                          background: otp.length === 6 ? 'var(--gold)' : 'var(--surface-3)',
                          border: 'none', borderRadius: '8px',
                          color: otp.length === 6 ? '#000' : 'var(--text-muted)',
                          cursor: (otpLoading || otp.length !== 6) ? 'not-allowed' : 'pointer',
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                          opacity: otpLoading ? 0.7 : 1,
                        }}>
                        {otpLoading ? '...' : 'Verify'}
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {otpTimer > 0 ? (
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Resend in <strong style={{ color: 'var(--text-secondary)' }}>{otpTimer}s</strong>
                      </span>
                    ) : (
                      <button type="button" onClick={handleSendOtp} disabled={otpLoading}
                        style={{
                          background: 'none', border: 'none', color: 'var(--gold)',
                          cursor: otpLoading ? 'not-allowed' : 'pointer',
                          fontSize: '0.78rem', padding: 0,
                          fontFamily: "'DM Sans', sans-serif",
                          opacity: otpLoading ? 0.5 : 1,
                        }}>
                        Resend OTP
                      </button>
                    )}

                    {otpDevCode && (
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        Dev: <strong style={{ color: '#60a5fa', fontFamily: 'monospace' }}>{otpDevCode}</strong>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {otpError && (
            <p style={{ fontSize: '0.78rem', color: '#f87171', marginTop: '10px' }}>{otpError}</p>
          )}
          {otpSuccess && (
            <p style={{ fontSize: '0.78rem', color: '#4ade80', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <IcoCheck size={12} /> {otpSuccess}
            </p>
          )}
        </div>

        {/* Error / Success messages */}
        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
            <p style={{ fontSize: '0.82rem', color: '#f87171' }}>{error}</p>
          </div>
        )}
        {success && (
          <div style={{ background: 'var(--green-dim)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
            <p style={{ fontSize: '0.82rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IcoCheck size={14} /> {success}
            </p>
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