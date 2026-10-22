'use client'

import Link from 'next/link'
import { useState } from 'react'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

const CONTACT_OPTIONS = [
  { icon: '◉', title: 'General Enquiries', desc: 'Questions about Marketing OS, partnerships, or press.', email: 'hello@marketingos.in' },
  { icon: '✦', title: 'Sales', desc: 'Talk to our team about Business or Enterprise plans.', email: 'sales@marketingos.in' },
  { icon: '◈', title: 'Support', desc: 'Need help with your account or a technical issue?', email: 'support@marketingos.in' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <MarketingLayout>
      <PageHero
        label="Contact"
        title="Let's Talk About"
        titleGold="Your Business."
        description="Whether you have a question, want to explore Enterprise options, or just want to say hello — we'd love to hear from you."
      />

      <section style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(260px,35%, 380px) 1fr',
          gap: 'clamp(2rem,4vw,4rem)',
          alignItems: 'start',
        }}
          className="contact-grid"
        >
          {/* Left: contact options */}
          <div>
            <p style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(0.48rem,0.78vw,0.56rem)',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: 'clamp(1.25rem,2.5vw,2rem)',
            }}>
              Get in Touch
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem,1.5vw,1.25rem)' }}>
              {CONTACT_OPTIONS.map(opt => (
                <div key={opt.title} style={{
                  padding: 'clamp(1rem,2vw,1.4rem)',
                  background: 'var(--surface-2)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>{opt.icon}</span>
                    <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.92rem)', color: 'var(--text-primary)' }}>{opt.title}</p>
                  </div>
                  <p style={{ fontSize: 'clamp(0.68rem,1vw,0.78rem)', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                    {opt.desc}
                  </p>
                  <a href={`mailto:${opt.email}`} style={{
                    fontSize: 'clamp(0.68rem,1vw,0.78rem)',
                    color: 'var(--gold)', textDecoration: 'none',
                  }}>
                    {opt.email}
                  </a>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 'clamp(1.5rem,3vw,2.5rem)',
              padding: 'clamp(1rem,2vw,1.4rem)',
              background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
              borderRadius: 'var(--radius-lg)',
            }}>
              <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                Need help right now?
              </p>
              <p style={{ fontSize: 'clamp(0.65rem,0.95vw,0.75rem)', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Visit our Help Center for instant answers.
              </p>
              <Link href="/help" style={{
                fontSize: 'clamp(0.65rem,0.95vw,0.75rem)',
                color: 'var(--gold)', textDecoration: 'none',
              }}>
                Go to Help Center →
              </Link>
            </div>
          </div>

          {/* Right: form */}
          <div style={{
            padding: 'clamp(1.5rem,3vw,2.5rem)',
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-2xl)',
          }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1rem,1.8vw,1.3rem)',
              color: 'var(--text-primary)', marginBottom: 'clamp(1.25rem,2.5vw,2rem)',
            }}>
              Send us a message
            </p>

            {sent ? (
              <div style={{
                padding: 'clamp(1.5rem,3vw,2.5rem)',
                background: 'rgba(21,128,61,0.06)', border: '1px solid rgba(21,128,61,0.2)',
                borderRadius: 'var(--radius-lg)', textAlign: 'center',
              }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✓</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.95rem,1.5vw,1.1rem)', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                  Message sent!
                </p>
                <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-muted)' }}>
                  We'll get back to you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.85rem,1.6vw,1.2rem)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.75rem,1.4vw,1rem)' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 'clamp(0.62rem,0.95vw,0.72rem)', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      Name
                    </label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className="input-modern"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 'clamp(0.62rem,0.95vw,0.72rem)', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      Email
                    </label>
                    <input
                      type="email" required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="input-modern"
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 'clamp(0.62rem,0.95vw,0.72rem)', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Subject
                  </label>
                  <input
                    type="text" required
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="What is this about?"
                    className="input-modern"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 'clamp(0.62rem,0.95vw,0.72rem)', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Message
                  </label>
                  <textarea
                    required rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us more..."
                    className="input-modern"
                    style={{ resize: 'vertical', minHeight: '120px' }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '0.9rem', fontSize: '0.82rem' }}>
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </MarketingLayout>
  )
}
