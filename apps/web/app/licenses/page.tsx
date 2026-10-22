import type { Metadata } from 'next'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Licenses — Marketing OS',
  description: 'Open source licenses and third-party attributions used in the Marketing OS platform.',
}

const LICENSES = [
  {
    name: 'Next.js',
    author: 'Vercel, Inc.',
    license: 'MIT',
    url: 'https://github.com/vercel/next.js/blob/canary/license.md',
  },
  {
    name: 'React',
    author: 'Meta Platforms, Inc.',
    license: 'MIT',
    url: 'https://github.com/facebook/react/blob/main/LICENSE',
  },
  {
    name: 'Prisma',
    author: 'Prisma Data, Inc.',
    license: 'Apache 2.0',
    url: 'https://github.com/prisma/prisma/blob/main/LICENSE',
  },
  {
    name: 'NextAuth.js',
    author: 'Balázs Orbán',
    license: 'ISC',
    url: 'https://github.com/nextauthjs/next-auth/blob/main/LICENSE',
  },
  {
    name: 'Tailwind CSS',
    author: 'Tailwind Labs, Inc.',
    license: 'MIT',
    url: 'https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE',
  },
  {
    name: 'TypeScript',
    author: 'Microsoft Corporation',
    license: 'Apache 2.0',
    url: 'https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt',
  },
  {
    name: 'bcryptjs',
    author: 'Daniel Wirtz',
    license: 'MIT',
    url: 'https://github.com/dcodeIO/bcrypt.js/blob/master/LICENSE',
  },
  {
    name: 'Turbo',
    author: 'Vercel, Inc.',
    license: 'MIT',
    url: 'https://github.com/vercel/turbo/blob/main/LICENSE',
  },
]

const LICENSE_COLORS: Record<string, string> = {
  'MIT': 'var(--gold)',
  'Apache 2.0': '#60a5fa',
  'ISC': '#a78bfa',
}

export default function LicensesPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Legal"
        title="Open Source"
        titleGold="Licenses."
        description="Marketing OS is built on the shoulders of great open source software. Here are the third-party libraries and their licenses."
      />

      <section style={{
        maxWidth: '900px', margin: '0 auto',
        padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {LICENSES.map((lib, i) => (
            <div key={lib.name} className="animate-fade-up" style={{
              animationDelay: `${i * 40}ms`,
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '0.75rem',
              padding: 'clamp(0.85rem,1.6vw,1.1rem) clamp(1rem,2vw,1.4rem)',
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.92rem)', color: 'var(--text-primary)' }}>
                  {lib.name}
                </p>
                <p style={{ fontSize: 'clamp(0.62rem,0.92vw,0.72rem)', color: 'var(--text-muted)' }}>
                  {lib.author}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  fontSize: 'clamp(0.48rem,0.75vw,0.56rem)',
                  letterSpacing: '0.1em',
                  padding: '0.2em 0.65em', borderRadius: '2em',
                  color: LICENSE_COLORS[lib.license] ?? 'var(--text-muted)',
                  background: 'var(--surface-3)',
                  border: '1px solid var(--border)',
                }}>
                  {lib.license}
                </span>
                <a
                  href={lib.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 'clamp(0.6rem,0.9vw,0.7rem)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)' }}
                >
                  View ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 'clamp(3rem,6vw,5rem)',
          padding: 'clamp(1.25rem,2.5vw,1.75rem)',
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
        }}>
          <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            The Marketing OS platform itself is proprietary software. All rights reserved. For licensing inquiries, contact{' '}
            <a href="mailto:legal@marketingos.in" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
              legal@marketingos.in
            </a>
          </p>
        </div>
      </section>
    </MarketingLayout>
  )
}
