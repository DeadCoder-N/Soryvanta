import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left — brand panel */}
      <div style={{
        background: 'var(--bark)',
        padding: '56px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <Image src="/Brisvora.png" alt="Brisvora" width={80} height={80} style={{ objectFit: 'contain', display: 'block' }} />
        </div>

        <div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--warm-white)',
            fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)',
            fontWeight: 400,
            lineHeight: 1.2,
            marginBottom: '24px',
          }}>
            Turn a WhatsApp<br />
            message into a<br />
            <em style={{ fontStyle: 'italic', color: 'var(--logo-gold-bright)' }}>premium listing.</em>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'rgba(253,252,249,0.4)', lineHeight: 1.8 }}>
            Send property details via WhatsApp.<br />
            AI creates the listing. Share the URL.
          </p>
        </div>

        <p style={{ fontSize: '0.7rem', color: 'rgba(255,253,245,0.18)', letterSpacing: '0.08em' }}>
          © 2026 BRISVORA
        </p>
      </div>

      {/* Right — form panel */}
      <div style={{
        background: 'var(--warm-white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '56px',
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
