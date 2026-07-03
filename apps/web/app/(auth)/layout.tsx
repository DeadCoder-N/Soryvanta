import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-grid" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--bg)' }}>

      {/* Left — brand panel */}
      <div className="auth-brand" style={{
        background: 'var(--surface-1)',
        borderRight: '1px solid var(--border)',
        padding: '48px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', bottom: '-100px', left: '-100px',
          width: '500px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(201,150,14,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
            <Image src="/Brisvora.png" alt="Brisvora" width={36} height={36} style={{ objectFit: 'contain' }} />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)' }}>Brisvora</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--text-primary)',
            fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)',
            fontWeight: 400, lineHeight: 1.2, marginBottom: '20px',
          }}>
            Turn a WhatsApp<br />message into a<br />
            <span style={{ color: 'var(--gold)' }}>premium listing.</span>
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Send property details via WhatsApp.<br />
            AI creates the listing. Share the URL.
          </p>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {['Send WhatsApp message', 'AI generates listing', 'Share the URL'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 600, flexShrink: 0,
              }}>{i + 1}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{s}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', position: 'relative' }}>© 2026 Brisvora</p>
      </div>

      {/* Right — form */}
      <div style={{
        background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px 1.5rem',
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div className="auth-mobile-logo" style={{ marginBottom: '32px', display: 'none', alignItems: 'center', gap: '10px' }}>
            <Image src="/Brisvora.png" alt="Brisvora" width={32} height={32} style={{ objectFit: 'contain' }} />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)' }}>Brisvora</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
