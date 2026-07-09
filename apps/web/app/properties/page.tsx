import Link from 'next/link'
import Image from 'next/image'
import { searchListings } from '@brisvora/api'
import { formatPrice } from '@brisvora/shared'
import { auth } from '@/auth'
import Navbar from '@/components/Navbar'
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

export const metadata = {
  title: 'Properties — Brisvora',
  description: 'Browse AI-powered real estate listings. Search by city, type, BHK and price.',
}

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
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

      {/* ── Page Header ── */}
      <section style={{
        background: 'var(--surface-1)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(5rem,10vw,8rem) 0 clamp(2rem,4vw,3rem)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>
          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(0.5rem,0.85vw,0.58rem)',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--gold)',
          }}>
            Browse Listings
          </span>
          <div className="gold-divider" style={{ margin: '0.75rem 0 1rem' }} />
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem,3.5vw,2.8rem)',
            color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1.15,
            marginBottom: '0.5rem',
          }}>
            Premium Properties
          </h1>
          <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.95rem)', color: 'var(--text-secondary)' }}>
            AI-powered listings from verified brokers across India.
          </p>
        </div>
      </section>

      {/* ── Search Bar ── */}
      <section style={{
        background: 'var(--surface-1)',
        borderBottom: '1px solid var(--border)',
        padding: '20px 0',
        position: 'sticky', top: 'clamp(64px,8vw,80px)', zIndex: 10,
        backdropFilter: 'blur(16px)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>
          <form method="GET">
            <div className="prop-search-grid" style={{
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
                  style={{ paddingLeft: '42px', paddingTop: '14px', paddingBottom: '14px' }} />
              </div>
              <select name="type" defaultValue={sp.type} className="input-modern" style={{ cursor: 'pointer', paddingTop: '14px', paddingBottom: '14px' }}>
                <option value="">All Types</option>
                <option value="APARTMENT">Apartment</option>
                <option value="HOUSE">House</option>
                <option value="VILLA">Villa</option>
                <option value="PLOT">Plot</option>
                <option value="COMMERCIAL">Commercial</option>
              </select>
              <select name="bedrooms" defaultValue={sp.bedrooms} className="input-modern" style={{ cursor: 'pointer', paddingTop: '14px', paddingBottom: '14px' }}>
                <option value="">Any BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
              <input name="minPrice" defaultValue={sp.minPrice} placeholder="Min price (₹)" type="number"
                className="input-modern"
                style={{ paddingTop: '14px', paddingBottom: '14px' }} />
              <button type="submit" className="btn-primary" style={{ padding: '14px 24px', fontSize: '0.72rem' }}>
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── Listings ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(2.5rem,5vw,4rem) clamp(1.25rem,4vw,2.5rem)' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: '32px', flexWrap: 'wrap', gap: '16px',
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.2rem,2vw,1.6rem)',
              color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1.2,
            }}>
              {hasFilters ? 'Search Results' : 'All Properties'} —{' '}
              <span style={{ color: 'var(--gold)' }}>
                {listings.length} {listings.length === 1 ? 'property' : 'properties'}
              </span>
            </h2>
          </div>
          {hasFilters && (
            <HoverCard
              href="/properties"
              style={{
                fontSize: '0.78rem', color: 'var(--text-muted)',
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
                borderBottom: '1px solid transparent', transition: 'all 0.2s', padding: '4px 0',
              }}
              hoverStyle={{ color: 'var(--text-primary)', borderBottomColor: 'var(--gold)' }}
            >
              ✕ Clear filters
            </HoverCard>
          )}
        </div>

        {listings.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '100px 40px',
            background: 'var(--surface-2)', borderRadius: 'var(--radius-2xl)',
            border: '1px solid var(--border)',
          }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'var(--surface-3)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', fontSize: '2rem',
            }}>🏠</div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              No listings found
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              {hasFilters ? 'Try adjusting your filters.' : 'Be the first to list a property.'}
            </p>
            <Link href={session?.user ? '/dashboard/listings/new' : '/register'} className="btn-primary">
              Create Listing
            </Link>
          </div>
        ) : (
          <div className="prop-listings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {listings.map((p: SearchListing, idx: number) => (
              <Link key={p.id} href={`/property/${p.slug}`}
                className="card-property animate-fade-up"
                style={{ animationDelay: `${Math.min(idx * 80 + 50, 500)}ms` }}>
                <div style={{ position: 'relative', height: '240px', background: 'var(--surface-3)', overflow: 'hidden' }}>
                  {p.images[0] ? (
                    <Image src={p.images[0].url} alt={p.title} fill
                      className="card-img" style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: '2.5rem', opacity: 0.3 }}>🏠</div>
                  )}
                  <div className="card-img-overlay" />
                  <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
                    <span style={{
                      fontSize: '0.6rem', letterSpacing: '0.1em', color: '#fff',
                      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      padding: '4px 12px', borderRadius: '30px', textTransform: 'uppercase',
                    }}>{p.type}</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '14px', left: '16px', zIndex: 2 }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#fff', fontWeight: 400, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                      {formatPrice(p.price)}
                    </p>
                  </div>
                  <div style={{ position: 'absolute', bottom: '16px', right: '14px', zIndex: 2 }}>
                    <span style={{
                      fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)',
                      background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)',
                      padding: '2px 10px', borderRadius: '30px',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>👁 {p.analytics?.viewCount ?? 0}</span>
                  </div>
                </div>
                <div style={{ padding: '18px 18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: "'Cinzel', serif" }}>{p.city}</span>
                    <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{p.type}</span>
                  </div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif", fontSize: '1.05rem',
                    color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1.3,
                    marginBottom: '14px',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>{p.title}</h3>
                  {(p.bedrooms || p.bathrooms) && (
                    <div style={{ display: 'flex', gap: '16px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                      {p.bedrooms && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ opacity: 0.6 }}>🛏</span>{p.bedrooms} Bed
                        </span>
                      )}
                      {p.bathrooms && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ opacity: 0.6 }}>🚿</span>{p.bathrooms} Bath
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

      <style>{`
        @media (max-width: 1024px) {
          .prop-listings-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 640px) {
          .prop-search-grid { grid-template-columns: 1fr !important; }
          .prop-listings-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </div>
  )
}
