import Link from 'next/link'
import Image from 'next/image'
import { searchListings } from '@brisvora/api'
import { formatPrice } from '@brisvora/shared'
import { auth } from '@/auth'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustSection from '@/components/TrustSection'
import ProblemSection from '@/components/ProblemSection'
import SolutionSection from '@/components/SolutionSection'
import EcosystemSection from '@/components/EcosystemSection'
import GrowthDashboardSection from '@/components/GrowthDashboardSection'
import SolutionsSection from '@/components/SolutionsSection'
import IntegrationsSection from '@/components/IntegrationsSection'
import CustomerSuccessSection from '@/components/CustomerSuccessSection'
import PricingSection from '@/components/PricingSection'
import FaqSection from '@/components/FaqSection'
import FinalCtaSection from '@/components/FinalCtaSection'
import Footer from '@/components/Footer'
import HoverCard from '@/components/HoverCard'

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
    <div style={{ background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      <Hero isLoggedIn={!!session?.user} />

      <TrustSection />

      <ProblemSection />

      <SolutionSection />

      <EcosystemSection />

      <GrowthDashboardSection />

      <SolutionsSection />

      <IntegrationsSection />

      <CustomerSuccessSection />

      <PricingSection />

      <FaqSection />

      <FinalCtaSection />

      {/* ── PREMIUM SEARCH BAR ── */}
      <section style={{
        background: 'var(--surface-1)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '24px 0',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <form method="GET">
            <div className="search-grid" style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
              gap: '8px', alignItems: 'center',
            }}>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '16px', top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)', fontSize: '1rem',
                  pointerEvents: 'none', zIndex: 1,
                }}>⌕</span>
                <input name="city" defaultValue={sp.city} placeholder="Search city or location..."
                  className="input-modern"
                  style={{ paddingLeft: '42px', paddingTop: '16px', paddingBottom: '16px' }} />
              </div>
              <select name="type" defaultValue={sp.type} className="input-modern" style={{ cursor: 'pointer', paddingTop: '16px', paddingBottom: '16px' }}>
                <option value="">All Types</option>
                <option value="APARTMENT">Apartment</option>
                <option value="HOUSE">House</option>
                <option value="VILLA">Villa</option>
                <option value="PLOT">Plot</option>
                <option value="COMMERCIAL">Commercial</option>
              </select>
              <select name="bedrooms" defaultValue={sp.bedrooms} className="input-modern" style={{ cursor: 'pointer', paddingTop: '16px', paddingBottom: '16px' }}>
                <option value="">Any BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
              <input name="minPrice" defaultValue={sp.minPrice} placeholder="Min price (₹)" type="number"
                className="input-modern"
                style={{ paddingTop: '16px', paddingBottom: '16px' }} />
              <button type="submit" className="btn-primary" style={{ padding: '16px 28px', fontSize: '0.72rem' }}>
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 1.5rem' }}>
        {/* Section header */}
        <div className="animate-fade-up" style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: '40px', flexWrap: 'wrap', gap: '16px',
        }}>
          <div>
            <span className="section-label">
              {hasFilters ? 'Search Results' : 'Featured Properties'}
            </span>
            <div className="gold-divider" />
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
              color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1.2,
            }}>
              {listings.length > 0
                ? `${listings.length} premium ${listings.length === 1 ? 'property' : 'properties'}`
                : 'No properties found'}
            </h2>
          </div>
          {hasFilters && (
            <HoverCard
              href="/"
              style={{
                fontSize: '0.78rem', color: 'var(--text-muted)',
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
                borderBottom: '1px solid transparent',
                transition: 'all 0.2s',
                padding: '4px 0',
              }}
              hoverStyle={{ color: 'var(--text-primary)', borderBottomColor: 'var(--gold)' }}
            >
              ✕ Clear filters
            </HoverCard>
          )}
        </div>

        {listings.length === 0 ? (
          <div className="animate-scale-in" style={{
            textAlign: 'center', padding: '100px 40px',
            background: 'var(--surface-2)', borderRadius: 'var(--radius-2xl)',
            border: '1px solid var(--border)',
          }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'var(--surface-3)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', fontSize: '2rem',
            }}>
              🏠
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>No listings yet</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Be the first to list a property</p>
            <Link href={session?.user ? '/dashboard/listings/new' : '/register'} className="btn-primary">
              Create Listing
            </Link>
          </div>
        ) : (
          <div className="listings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {listings.map((p: SearchListing, idx: number) => (
              <Link key={p.id} href={`/property/${p.slug}`}
                className="card-property animate-fade-up"
                style={{ animationDelay: `${Math.min(idx * 80 + 50, 500)}ms` }}>

                {/* Image */}
                <div style={{ position: 'relative', height: '240px', background: 'var(--surface-3)', overflow: 'hidden' }}>
                  {p.images[0] ? (
                    <Image src={p.images[0].url} alt={p.title} fill
                      className="card-img"
                      style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: '2.5rem', opacity: 0.3 }}>🏠</div>
                  )}
                  <div className="card-img-overlay" />

                  {/* Type badge */}
                  <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
                    <span style={{
                      fontSize: '0.6rem', letterSpacing: '0.1em', color: '#fff',
                      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      padding: '4px 12px', borderRadius: '30px',
                      textTransform: 'uppercase',
                    }}>
                      {p.type}
                    </span>
                  </div>

                  {/* Price overlay */}
                  <div style={{ position: 'absolute', bottom: '14px', left: '16px', zIndex: 2 }}>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#fff', fontWeight: 400, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                      {formatPrice(p.price)}
                    </p>
                  </div>

                  {/* Views */}
                  <div style={{ position: 'absolute', bottom: '16px', right: '14px', zIndex: 2 }}>
                    <span style={{
                      fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)',
                      background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)',
                      padding: '2px 10px', borderRadius: '30px',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                      👁 {p.analytics?.viewCount ?? 0}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '18px 18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: 'var(--gold)', fontFamily: "'Cinzel', serif",
                    }}>
                      {p.city}
                    </span>
                    <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{p.type}</span>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: '1.05rem',
                    color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1.3,
                    marginBottom: '14px',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {p.title}
                  </h3>
                  {(p.bedrooms || p.bathrooms) && (
                    <div style={{ display: 'flex', gap: '16px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                      {p.bedrooms && (
                        <span style={{
                          fontSize: '0.75rem', color: 'var(--text-muted)',
                          display: 'flex', alignItems: 'center', gap: '6px',
                        }}>
                          <span style={{ opacity: 0.6 }}>🛏</span>
                          {p.bedrooms} Bed
                        </span>
                      )}
                      {p.bathrooms && (
                        <span style={{
                          fontSize: '0.75rem', color: 'var(--text-muted)',
                          display: 'flex', alignItems: 'center', gap: '6px',
                        }}>
                          <span style={{ opacity: 0.6 }}>🚿</span>
                          {p.bathrooms} Bath
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
      <section style={{
        background: 'var(--surface-1)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '100px 0',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-50%', left: '-20%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-50%', right: '-20%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="section-label">How It Works</span>
            <div className="gold-divider" style={{ margin: '0 auto 20px' }} />
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1.2,
            }}>
              Three simple steps to<br />
              <span style={{ color: 'var(--gold)' }}>your premium listing</span>
            </h2>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px',
          }}>
            {[
              { step: '01', title: 'Send a message', desc: 'Message our WhatsApp bot with property details — address, price, type, photos. Any format, any language.', icon: '💬', color: '#25D366' },
              { step: '02', title: 'AI crafts your listing', desc: 'Claude AI extracts every detail and writes a professional, SEO-optimized property description in seconds.', icon: '✨', color: 'var(--gold)' },
              { step: '03', title: 'Share & get leads', desc: 'Get a stunning listing page with a shareable link. Buyers contact you directly via WhatsApp or enquiry form.', icon: '🔗', color: 'var(--gold-light)' },
            ].map((item) => (
              <div key={item.step} className="card-glass animate-fade-up"
                style={{
                  padding: '36px 28px 32px',
                  textAlign: 'center',
                  animationDelay: `${parseInt(item.step) * 100}ms`,
                }}>
                {/* Icon */}
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', fontSize: '1.6rem',
                }}>
                  {item.icon}
                </div>
                <div style={{
                  fontSize: '0.6rem', letterSpacing: '0.2em',
                  color: 'var(--gold)', fontFamily: "'Cinzel', serif",
                  marginBottom: '12px',
                }}>
                  STEP {item.step}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontSize: '1.15rem',
                  color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 400,
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '300px', margin: '0 auto' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}