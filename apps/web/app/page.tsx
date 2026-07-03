import Link from 'next/link'
import Image from 'next/image'
import { searchListings } from '@brisvora/api'
import { formatPrice } from '@brisvora/shared'
import { auth } from '@/auth'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface SearchParams {
  city?: string; minPrice?: string; maxPrice?: string
  type?: string; bedrooms?: string; page?: string
}
type SearchListing = {
  id: string; slug: string; title: string; city: string; price: number
  type: string; bedrooms: number | null; bathrooms: number | null
  images: Array<{ url: string }>; analytics: { viewCount: number } | null
}

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams
  const session = await auth()
  const listings = await searchListings({
    city: sp.city,
    minPrice: sp.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
    type: sp.type,
    bedrooms: sp.bedrooms ? Number(sp.bedrooms) : undefined,
    page: sp.page ? Number(sp.page) : 1,
  }).catch(() => [] as SearchListing[])
  const hasFilters = sp.city || sp.type || sp.bedrooms || sp.minPrice || sp.maxPrice

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', padding: '80px 0 72px', overflow: 'hidden' }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(201,150,14,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

            <div>
              {/* Pill badge */}
              <div className="animate-fade-up" style={{ marginBottom: '24px' }}>
                <span className="badge badge-gold">
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', animation: 'pulse-dot 2s infinite' }} />
                  AI-Powered · WhatsApp Native
                </span>
              </div>

              <h1 className="animate-fade-up delay-100" style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.1, fontWeight: 400,
                marginBottom: '24px',
              }}>
                Property listings<br />
                <span style={{ color: 'var(--gold)' }}>built by AI,</span><br />
                shared in minutes
              </h1>

              <p className="animate-fade-up delay-200" style={{
                fontSize: '1rem', color: 'var(--text-secondary)',
                lineHeight: 1.75, marginBottom: '36px', maxWidth: '420px',
              }}>
                Send property details via WhatsApp. Our AI generates a professional, SEO-optimized listing page instantly — no forms, no hassle.
              </p>

              <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link href={session?.user ? '/dashboard' : '/register'} className="btn-primary" style={{ padding: '13px 28px', fontSize: '0.85rem' }}>
                  {session?.user ? 'Go to Dashboard' : 'Start for Free'}
                </Link>
                <Link href="/" className="btn-secondary" style={{ padding: '13px 28px', fontSize: '0.85rem' }}>
                  Browse Properties
                </Link>
              </div>
            </div>

            {/* Stats panel */}
            <div className="animate-fade-up delay-200">
              <div style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: '32px',
                boxShadow: 'var(--shadow-md)',
              }}>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
                  Platform Stats
                </p>
                <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                  {[
                    { num: '2 min', label: 'Avg. listing time' },
                    { num: 'AI', label: 'Auto-generated' },
                    { num: '100%', label: 'WhatsApp native' },
                  ].map((s) => (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--gold)', fontWeight: 400, marginBottom: '4px' }}>{s.num}</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--border)', marginTop: '28px', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'Send WhatsApp message with property details',
                    'AI generates title, description & SEO tags',
                    'Get shareable listing URL instantly',
                  ].map((step, i) => (
                    <div key={step} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '22px', height: '22px', borderRadius: '50%',
                        background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, fontSize: '0.65rem', color: 'var(--gold)', fontWeight: 600,
                      }}>
                        {i + 1}
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, paddingTop: '2px' }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH ── */}
      <section style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <form method="GET">
            <div className="search-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '8px', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.9rem', pointerEvents: 'none' }}>⌕</span>
                <input name="city" defaultValue={sp.city} placeholder="Search city or location..."
                  className="input-modern"
                  style={{ paddingLeft: '38px' }} />
              </div>
              <select name="type" defaultValue={sp.type} className="input-modern" style={{ cursor: 'pointer' }}>
                <option value="">All Types</option>
                <option value="APARTMENT">Apartment</option>
                <option value="HOUSE">House</option>
                <option value="VILLA">Villa</option>
                <option value="PLOT">Plot</option>
                <option value="COMMERCIAL">Commercial</option>
              </select>
              <select name="bedrooms" defaultValue={sp.bedrooms} className="input-modern" style={{ cursor: 'pointer' }}>
                <option value="">Any BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
              <input name="minPrice" defaultValue={sp.minPrice} placeholder="Min price (₹)" type="number"
                className="input-modern" />
              <button type="submit" className="btn-primary" style={{ padding: '12px 24px' }}>
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── LISTINGS ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 1.5rem' }}>
        <div className="animate-fade-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
              {hasFilters ? 'Search Results' : 'Featured Properties'}
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 400 }}>
              {listings.length > 0 ? `${listings.length} Properties` : 'No Properties Found'}
            </h2>
          </div>
          {hasFilters && (
            <Link href="/" className="btn-ghost">
              ✕ Clear filters
            </Link>
          )}
        </div>

        {listings.length === 0 ? (
          <div className="animate-fade-in" style={{
            textAlign: 'center', padding: '80px 0',
            background: 'var(--surface-2)', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.3 }}>🏠</div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>No listings found</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="listings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {listings.map((p: SearchListing, idx: number) => (
              <Link key={p.id} href={`/property/${p.slug}`}
                className={`card-property animate-fade-up delay-${Math.min(idx * 50 + 50, 400)}`}>

                {/* Image */}
                <div style={{ position: 'relative', height: '220px', background: 'var(--surface-3)', overflow: 'hidden' }}>
                  {p.images[0] ? (
                    <Image src={p.images[0].url} alt={p.title} fill
                      className="card-img"
                      style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: '2rem', opacity: 0.3 }}>🏠</div>
                  )}
                  {/* Gradient overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />

                  {/* Type badge */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span className="badge badge-muted" style={{ backdropFilter: 'blur(8px)', background: 'rgba(15,14,11,0.7)' }}>
                      {p.type}
                    </span>
                  </div>

                  {/* Price overlay */}
                  <div style={{ position: 'absolute', bottom: '12px', left: '14px' }}>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#fff', fontWeight: 400 }}>
                      {formatPrice(p.price)}
                    </p>
                  </div>

                  {/* Views */}
                  <div style={{ position: 'absolute', bottom: '14px', right: '12px' }}>
                    <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)' }}>
                      {p.analytics?.viewCount ?? 0} views
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '16px' }}>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {p.city}
                  </p>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: '1rem',
                    color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1.4,
                    marginBottom: '12px',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {p.title}
                  </h3>
                  {(p.bedrooms || p.bathrooms) && (
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {p.bedrooms && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>🛏</span> {p.bedrooms} Bed
                        </span>
                      )}
                      {p.bathrooms && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>🚿</span> {p.bathrooms} Bath
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)', padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '16px', display: 'inline-flex' }}>How it works</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--text-primary)', fontWeight: 400 }}>
              From WhatsApp to live listing<br />
              <span style={{ color: 'var(--gold)' }}>in under 2 minutes</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { step: '01', title: 'Send a message', desc: 'Message our WhatsApp bot with property details — address, price, type, photos. Any format works.', icon: '💬' },
              { step: '02', title: 'AI generates listing', desc: 'Claude AI extracts all details and writes a professional, SEO-optimized property description instantly.', icon: '✨' },
              { step: '03', title: 'Share the URL', desc: 'Get a beautiful listing page with a shareable link. Buyers can contact you directly via WhatsApp or form.', icon: '🔗' },
            ].map((item) => (
              <div key={item.step} className="card animate-fade-up" style={{ padding: '28px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{item.icon}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: '8px' }}>STEP {item.step}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '10px', fontWeight: 400 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-muted" style={{ marginBottom: '16px', display: 'inline-flex' }}>FAQ</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 400 }}>
              Common questions
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: 'What is Brisvora?', a: "India's first AI-powered property listing platform. Brokers send property details via WhatsApp, and AI instantly generates a professional, SEO-optimized listing page." },
              { q: 'How do I create a listing?', a: 'Register, link your WhatsApp number in your profile, then message our bot with property details. Your listing goes live in under 2 minutes.' },
              { q: 'Which cities are supported?', a: 'All major Indian cities — Mumbai, Delhi, Bangalore, Pune, Hyderabad, Chennai, Kolkata, Jaipur, Ahmedabad, Noida, Gurgaon and more.' },
              { q: 'Is it free for brokers?', a: 'Yes! Creating and sharing listings is completely free.' },
              { q: 'How do buyers contact me?', a: 'Every listing has a WhatsApp chat button and enquiry form. All leads are tracked in your broker dashboard.' },
            ].map((faq) => (
              <div key={faq.q} className="faq-item" style={{
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '20px 24px',
                transition: 'border-color 0.2s',
              }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '8px' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)', padding: '80px 0' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '16px' }}>
            <span className="badge badge-gold">For Brokers</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '16px' }}>
            List properties in<br />
            <span style={{ color: 'var(--gold)' }}>minutes, not hours</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '36px' }}>
            No technical knowledge required. Just send a WhatsApp message and let AI do the rest.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={session?.user ? '/dashboard' : '/register'} className="btn-primary" style={{ padding: '14px 32px', fontSize: '0.9rem' }}>
              {session?.user ? 'Go to Dashboard' : 'Get Started Free'}
            </Link>
            {!session?.user && (
              <Link href="/login" className="btn-secondary" style={{ padding: '14px 32px', fontSize: '0.9rem' }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
