'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

// ── Icons ─────────────────────────────────────────────────────────
const IcoSearch = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)
const IcoChevron = ({ open }: { open: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
    style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IcoBuilding = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M1.5 6L6.5 1.5 11.5 6v5.5a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M4.5 12V8h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
)
const IcoTrash = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M2 3.5h9M5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M10.5 3.5l-.7 7a.5.5 0 01-.5.5H3.7a.5.5 0 01-.5-.5l-.7-7"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IcoUser = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <circle cx="6.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M1.5 12c0-2.761 2.239-4 5-4s5 1.239 5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const IcoExternal = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M4.5 2H2a.5.5 0 00-.5.5v7a.5.5 0 00.5.5h7a.5.5 0 00.5-.5V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M6.5 1.5H9.5v3M9.5 1.5L5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IcoShield = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M6.5 1.5L11 3.5v3c0 2.8-2 4.8-4.5 5.5C4 11.3 2 9.3 2 6.5v-3l4.5-2z"
      stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
)
const IcoArrowUp = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 9.5V2.5M2.5 6L6 2.5 9.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IcoArrowDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 2.5v7M2.5 6L6 9.5 9.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ── Types ─────────────────────────────────────────────────────────
type UserListing = {
  id: string; title: string; city: string; price: number
  status: string; type: string; slug: string
  analytics?: { viewCount: number } | null
  _count?: { leads: number }
}
type User = {
  id: string; name: string | null; email: string; phone: string | null
  role: string; plan: string | null; createdAt: string
  _count: { properties: number }
}

// ── Constants ─────────────────────────────────────────────────────
const ROLE_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  SUPER_ADMIN: { bg: 'rgba(239,68,68,0.1)',   color: '#f87171',               border: 'rgba(239,68,68,0.22)' },
  ADMIN:       { bg: 'rgba(201,168,76,0.12)', color: 'var(--gold-light)',     border: 'var(--gold-border)' },
  BROKER:      { bg: 'var(--surface-3)',       color: 'var(--text-secondary)', border: 'var(--border)' },
}
const PLAN_COLOR: Record<string, string> = {
  STARTER: 'var(--text-muted)', PROFESSIONAL: '#60a5fa',
  BUSINESS: '#a78bfa',          ENTERPRISE: 'var(--gold)',
}
const STATUS_COLOR: Record<string, string> = {
  ACTIVE: '#4ade80', SOLD: 'var(--gold)', RENTED: '#a78bfa', INACTIVE: 'var(--text-muted)',
}
const TYPE_PATH: Record<string, string> = {
  APARTMENT: 'apartment', VILLA: 'villa', PLOT: 'plot', COMMERCIAL: 'commercial',
}

function formatPrice(p: number) {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(1)} Cr`
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)} L`
  return `₹${p.toLocaleString('en-IN')}`
}

// ── UserListings — expanded sub-row ──────────────────────────────
function UserListings({ userId }: { userId: string }) {
  const [listings, setListings] = useState<UserListing[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    fetch(`/api/admin/users/${userId}/listings`)
      .then(r => r.ok ? r.json() : [])
      .then(d => { setListings(Array.isArray(d) ? d : d.listings ?? []); setLoading(false) })
  }, [userId])

  if (loading) return (
    <div style={{ padding: '16px 24px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
      Loading listings...
    </div>
  )
  if (!listings.length) return (
    <div style={{ padding: '16px 24px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
      No listings yet.
    </div>
  )

  return (
    <div>
      {/* Sub-header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 70px 70px 90px',
        gap: '8px', padding: '8px 24px',
        fontSize: '0.58rem', color: 'var(--text-muted)',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        background: 'var(--surface-1)', borderBottom: '1px solid var(--border)',
      }}>
        {['Title', 'City', 'Price', 'Status', 'Views', 'Leads', ''].map(h => (
          <span key={h}>{h}</span>
        ))}
      </div>

      {listings.map(l => {
        const path = `/${TYPE_PATH[l.type] ?? 'property'}/${l.slug}`
        return (
          <div key={l.id} style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 70px 70px 90px',
            gap: '8px', padding: '10px 24px',
            alignItems: 'center',
            background: 'var(--surface-1)',
            borderBottom: '1px solid var(--border)',
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface-1)')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', minWidth: 0 }}>
              <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}><IcoBuilding /></span>
              <span style={{
                fontSize: '0.78rem', color: 'var(--text-primary)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{l.title}</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{l.city}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
              {formatPrice(l.price)}
            </span>
            <span style={{
              fontSize: '0.6rem', fontWeight: 500, padding: '2px 8px',
              borderRadius: '999px', background: 'var(--surface-3)',
              color: STATUS_COLOR[l.status] ?? 'var(--text-muted)',
              border: '1px solid var(--border)', display: 'inline-block',
            }}>{l.status}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {l.analytics?.viewCount ?? 0}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {l._count?.leads ?? 0}
            </span>
            <Link href={path} target="_blank" style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              fontSize: '0.65rem', color: 'var(--text-muted)',
              textDecoration: 'none', transition: 'color 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <IcoExternal /> View
            </Link>
          </div>
        )
      })}
    </div>
  )
}

// ── HoverActions — floats on row hover ───────────────────────────
function HoverActions({ user, actionLoading, onRole, onPlan, onDelete }: {
  user: User
  actionLoading: string | null
  onRole: (id: string, role: string) => void
  onPlan: (id: string, plan: string) => void
  onDelete: (id: string, email: string) => void
}) {
  const busy = !!actionLoading

  const btnBase: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    padding: '5px 10px', borderRadius: 'var(--radius-md)',
    fontSize: '0.65rem', fontWeight: 500, cursor: busy ? 'not-allowed' : 'pointer',
    border: '1px solid var(--border)', background: 'var(--surface-3)',
    color: 'var(--text-secondary)', transition: 'all 0.15s',
    opacity: busy ? 0.5 : 1, whiteSpace: 'nowrap',
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap',
    }}>
      {/* Promote / Demote role */}
      {user.role === 'BROKER' && (
        <button style={{ ...btnBase, color: 'var(--gold)', borderColor: 'var(--gold-border)', background: 'var(--gold-dim)' }}
          disabled={busy} onClick={() => onRole(user.id, 'ADMIN')}>
          <IcoArrowUp />
          {actionLoading === user.id + 'ADMIN' ? '...' : 'Make Admin'}
        </button>
      )}
      {user.role === 'ADMIN' && (
        <>
          <button style={{ ...btnBase, color: '#f87171', borderColor: 'rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.08)' }}
            disabled={busy} onClick={() => onRole(user.id, 'SUPER_ADMIN')}>
            <IcoShield />
            {actionLoading === user.id + 'SUPER_ADMIN' ? '...' : 'Make Super'}
          </button>
          <button style={{ ...btnBase }}
            disabled={busy} onClick={() => onRole(user.id, 'BROKER')}>
            <IcoArrowDown />
            {actionLoading === user.id + 'BROKER' ? '...' : 'Demote'}
          </button>
        </>
      )}
      {user.role === 'SUPER_ADMIN' && (
        <button style={{ ...btnBase }}
          disabled={busy} onClick={() => onRole(user.id, 'ADMIN')}>
          <IcoArrowDown />
          {actionLoading === user.id + 'ADMIN' ? '...' : 'Demote to Admin'}
        </button>
      )}

      {/* Plan selector */}
      <select
        value={user.plan ?? 'STARTER'}
        disabled={busy}
        onChange={e => onPlan(user.id, e.target.value)}
        style={{
          background: 'var(--surface-3)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', padding: '5px 8px',
          fontSize: '0.65rem', color: PLAN_COLOR[user.plan ?? 'STARTER'],
          cursor: busy ? 'not-allowed' : 'pointer', outline: 'none',
        }}
      >
        <option value="STARTER">Starter</option>
        <option value="PROFESSIONAL">Professional</option>
        <option value="BUSINESS">Business</option>
        <option value="ENTERPRISE">Enterprise</option>
      </select>

      {/* Delete */}
      <button style={{
        ...btnBase,
        color: '#f87171', borderColor: 'rgba(239,68,68,0.22)',
        background: 'rgba(239,68,68,0.08)',
      }}
        disabled={busy} onClick={() => onDelete(user.id, user.email)}>
        <IcoTrash />
        {actionLoading === user.id + 'del' ? '...' : 'Delete'}
      </button>
    </div>
  )
}

// ── UserRow ───────────────────────────────────────────────────────
function UserRow({ user, actionLoading, expanded, onToggle, onRole, onPlan, onDelete }: {
  user: User
  actionLoading: string | null
  expanded: boolean
  onToggle: () => void
  onRole: (id: string, role: string) => void
  onPlan: (id: string, plan: string) => void
  onDelete: (id: string, email: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const rs = ROLE_STYLE[user.role] ?? ROLE_STYLE.BROKER

  return (
    <>
      <tr
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderBottom: expanded ? 'none' : '1px solid var(--border)',
          background: hovered || expanded ? 'var(--surface-3)' : 'transparent',
          transition: 'background 0.15s',
        }}
      >
        {/* User identity */}
        <td style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 0' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
              background: 'var(--surface-4)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600,
            }}>
              {user.email[0].toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '2px', fontWeight: 500 }}>
                {user.name ?? '—'}
              </p>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
                {user.email}
              </p>
            </div>
          </div>
        </td>

        {/* Phone */}
        <td style={{ padding: '14px 16px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          {user.phone ?? '—'}
        </td>

        {/* Role badge */}
        <td style={{ padding: '14px 16px' }}>
          <span style={{
            fontSize: '0.6rem', fontWeight: 600, padding: '3px 10px',
            borderRadius: '999px', letterSpacing: '0.06em',
            background: rs.bg, color: rs.color, border: `1px solid ${rs.border}`,
          }}>
            {user.role}
          </span>
        </td>

        {/* Plan */}
        <td style={{ padding: '14px 16px' }}>
          <span style={{
            fontSize: '0.68rem', color: PLAN_COLOR[user.plan ?? 'STARTER'],
            fontWeight: 500,
          }}>
            {user.plan ?? 'STARTER'}
          </span>
        </td>

        {/* Listings count */}
        <td style={{ padding: '14px 16px' }}>
          <span style={{
            fontFamily: 'var(--font-serif)', fontSize: '1.1rem',
            color: user._count.properties > 0 ? 'var(--text-primary)' : 'var(--text-muted)',
          }}>
            {user._count.properties}
          </span>
        </td>

        {/* Joined */}
        <td style={{ padding: '14px 16px', fontSize: '0.68rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          {new Date(user.createdAt).toLocaleDateString('en-IN')}
        </td>

        {/* Actions — visible on hover */}
        <td style={{ padding: '14px 16px', minWidth: '320px' }}>
          <div style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.18s, transform 0.18s',
            pointerEvents: hovered ? 'auto' : 'none',
          }}>
            <HoverActions
              user={user}
              actionLoading={actionLoading}
              onRole={onRole}
              onPlan={onPlan}
              onDelete={onDelete}
            />
          </div>
        </td>

        {/* Expand toggle */}
        <td style={{ padding: '14px 12px', textAlign: 'center' }}>
          {user._count.properties > 0 && (
            <button
              onClick={onToggle}
              style={{
                background: expanded ? 'var(--gold-dim)' : 'var(--surface-3)',
                border: `1px solid ${expanded ? 'var(--gold-border)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-md)', padding: '5px 8px',
                cursor: 'pointer', color: expanded ? 'var(--gold)' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.62rem',
                transition: 'all 0.15s',
              }}
              title={expanded ? 'Collapse' : 'View listings'}
            >
              <IcoBuilding />
              <IcoChevron open={expanded} />
            </button>
          )}
        </td>
      </tr>

      {/* Expanded listings sub-table */}
      {expanded && (
        <tr style={{ borderBottom: '1px solid var(--border)' }}>
          <td colSpan={8} style={{ padding: 0, background: 'var(--surface-1)' }}>
            <UserListings userId={user.id} />
          </td>
        </tr>
      )}
    </>
  )
}

// ── Main Page ─────────────────────────────────────────────────────
export default function AdminUsersPage() {
  const [users, setUsers]                 = useState<User[]>([])
  const [total, setTotal]                 = useState(0)
  const [page, setPage]                   = useState(1)
  const [pages, setPages]                 = useState(1)
  const [search, setSearch]               = useState('')
  const [roleFilter, setRoleFilter]       = useState('')
  const [loading, setLoading]             = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [expanded, setExpanded]           = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search)     params.set('search', search)
    if (roleFilter) params.set('role', roleFilter)
    const res = await fetch(`/api/admin/users?${params}`)
    if (res.ok) {
      const data = await res.json()
      setUsers(data.users); setTotal(data.total); setPages(data.pages)
    }
    setLoading(false)
  }, [page, search, roleFilter])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  async function changeRole(userId: string, role: string) {
    setActionLoading(userId + role)
    await fetch('/api/admin/users', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role }),
    })
    await fetchUsers()
    setActionLoading(null)
  }

  async function changePlan(userId: string, plan: string) {
    setActionLoading(userId + 'plan' + plan)
    await fetch('/api/admin/users', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, plan }),
    })
    await fetchUsers()
    setActionLoading(null)
  }

  async function deleteUser(userId: string, email: string) {
    if (!confirm(`Delete ${email}? This cannot be undone.`)) return
    setActionLoading(userId + 'del')
    await fetch('/api/admin/users', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
    await fetchUsers()
    setActionLoading(null)
  }

  const thStyle: React.CSSProperties = {
    padding: '11px 16px', textAlign: 'left',
    fontSize: '0.6rem', color: 'var(--text-muted)',
    letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
    fontFamily: "'Cinzel', serif",
  }

  return (
    <div>
      {/* Header */}
      <div className="animate-fade-up" style={{ marginBottom: '28px' }}>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.58rem', color: 'var(--gold)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '6px' }}>
          User Management
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.5vw,1.8rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '4px' }}>
          Users
        </h1>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{total} total users</p>
      </div>

      {/* Filters */}
      <div className="animate-fade-up delay-100" style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', maxWidth: '280px', flex: 1 }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
            <IcoSearch />
          </span>
          <input className="input-modern" style={{ paddingLeft: '34px' }}
            placeholder="Search by name or email..."
            value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        </div>
        <select className="input-modern" style={{ maxWidth: '160px', cursor: 'pointer' }}
          value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1) }}>
          <option value="">All Roles</option>
          <option value="BROKER">Broker</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPER_ADMIN">Super Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="animate-fade-up delay-200" style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      }}>
        {loading ? (
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <div style={{ width: '24px', height: '24px', border: '2px solid var(--border)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>No users found</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
                  <th style={thStyle}>User</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Plan</th>
                  <th style={thStyle}>Listings</th>
                  <th style={thStyle}>Joined</th>
                  <th style={{ ...thStyle, minWidth: '320px' }}>Actions (hover)</th>
                  <th style={{ ...thStyle, width: '48px' }}></th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <UserRow
                    key={u.id}
                    user={u}
                    actionLoading={actionLoading}
                    expanded={expanded === u.id}
                    onToggle={() => setExpanded(expanded === u.id ? null : u.id)}
                    onRole={changeRole}
                    onPlan={changePlan}
                    onDelete={deleteUser}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div style={{
            padding: '14px 20px', borderTop: '1px solid var(--border)',
            display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {total} users · Page {page} of {pages}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button className="btn-ghost" style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
              <button className="btn-ghost" style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
