import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', padding: '36px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <Image src="/Brisvora.png" alt="Brisvora" width={52} height={52} style={{ objectFit: 'contain', display: 'block', filter: 'brightness(1.3) saturate(0.9)' }} />
        <p style={{ fontSize: '0.72rem', color: 'rgba(255,253,245,0.3)', letterSpacing: '0.05em' }}>
          © 2026 Brisvora. AI-powered property listings.
        </p>
      </div>
    </footer>
  )
}
