'use client'

interface SearchBarProps {
  city?: string
  type?: string
  bedrooms?: string
  minPrice?: string
}

export default function SearchBar({ city, type, bedrooms, minPrice }: SearchBarProps) {
  return (
    <form method="GET">
      <div className="search-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '2px' }}>
        <input
          name="city"
          defaultValue={city}
          placeholder="City or location..."
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--warm-white)',
            padding: '14px 18px',
            fontSize: '0.85rem',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          className="placeholder:text-white/30"
          onFocus={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.11)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)' }}
          onBlur={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
        />
        <select name="type" defaultValue={type}
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: type ? 'var(--warm-white)' : 'rgba(255,255,255,0.35)',
            padding: '14px 16px',
            fontSize: '0.85rem',
            transition: 'background 0.2s',
            cursor: 'pointer',
          }}>
          <option value="">Type</option>
          <option value="APARTMENT">Apartment</option>
          <option value="HOUSE">House</option>
          <option value="VILLA">Villa</option>
          <option value="PLOT">Plot</option>
          <option value="COMMERCIAL">Commercial</option>
        </select>
        <select name="bedrooms" defaultValue={bedrooms}
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: bedrooms ? 'var(--warm-white)' : 'rgba(255,255,255,0.35)',
            padding: '14px 16px',
            fontSize: '0.85rem',
            transition: 'background 0.2s',
            cursor: 'pointer',
          }}>
          <option value="">BHK</option>
          <option value="1">1 BHK</option>
          <option value="2">2 BHK</option>
          <option value="3">3 BHK</option>
          <option value="4">4+ BHK</option>
        </select>
        <input
          name="minPrice"
          defaultValue={minPrice}
          placeholder="Min price"
          type="number"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--warm-white)',
            padding: '14px 16px',
            fontSize: '0.85rem',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          className="placeholder:text-white/30"
        />
        <button type="submit"
          className="btn-press"
          style={{
            background: 'var(--logo-gold)', color: 'var(--warm-white)',
            fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase',
            padding: '14px 24px', cursor: 'pointer', border: 'none', whiteSpace: 'nowrap',
          }}>
          Search
        </button>
      </div>
    </form>
  )
}
