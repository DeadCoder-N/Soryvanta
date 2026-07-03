'use client'

import { useState, useEffect, useCallback } from 'react'

const roleColor: Record<string, { bg: string; color: string }> = {
  SUPER_ADMIN: { bg: 'rgba(239,68,68,0.12)', color: '#f87171' },
  ADMIN:       { bg: 'var(--gold-dim)', color: 'var(--gold-light)' },
  BROKER:      { bg: 'var(--surface-3)', color: 'var(--text-secondary)' },
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [myRole, setMyRole] = useState('')

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set('search', search)
    if (roleFilter) params.set('role', roleFilter)
    const res = await fetch(`/api/admin/users?${params}`)
    if (res.ok) {
      const data = await res.json()
      setUsers(data.users)
      setTotal(data.total)
      setPages(data.pages)
    }
    setLoading(false)
  }, [page, search, roleFilter])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  // Get current user's role from session
  useEffect(() => {
    fetch('/api/auth/session').then(r => r.json()).then(s => setMyRole(s?.user?.role ?? ''))
  }, [])

  async function changeRole(userId: string, role: string) {
    setActionLoading(userId + role)
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role }),
    })
    await fetchUsers()
    setActionLoading(null)
  }

  async function deleteUser(userId: string, email: string) {
    if (!confirm(`Delete user ${email}? This cannot be undone.`)) return
    setActionLoading(userId + 'del')
    await fetch('/api/admin/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
    await fetchUsers()
    setActionLoading(null)
  }

  const isSuperAdmin = myRole === 'SUPER_ADMIN'

  return (
    <div>
      <div className="animate-fade-up" style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '4px' }}>
          Users
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{total} total users</p>
      </div>

      {/* Filters */}
      <div className="animate-fade-up delay-100" style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          className="input-modern"
          style={{ maxWidth: '280px' }}
          placeholder="Search by email or name..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
        />
        <select className="input-modern" style={{ maxWidth: '160px', cursor: 'pointer' }}
          value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1) }}>
          <option value="">All Roles</option>
          <option value="BROKER">Broker</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPER_ADMIN">Super Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="animate-fade-up delay-200" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', minWidth: '640px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
                  {['User', 'Phone', 'Role', 'Properties', 'Joined', isSuperAdmin ? 'Actions' : ''].map(h => (
                    <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u: any) => {
                  const rc = roleColor[u.role] ?? roleColor.BROKER
                  return (
                    <tr key={u.id} className="table-row" style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <p style={{ color: 'var(--text-primary)', marginBottom: '2px' }}>{u.name ?? '—'}</p>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{u.email}</p>
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{u.phone ?? '—'}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 600, padding: '4px 10px', borderRadius: '999px', background: rc.bg, color: rc.color }}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{u._count.properties}</td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        {new Date(u.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      {isSuperAdmin && (
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {u.role !== 'ADMIN' && (
                              <button className="btn-ghost" style={{ padding: '5px 10px', fontSize: '0.68rem' }}
                                disabled={!!actionLoading}
                                onClick={() => changeRole(u.id, 'ADMIN')}>
                                {actionLoading === u.id + 'ADMIN' ? '...' : '→ Admin'}
                              </button>
                            )}
                            {u.role !== 'BROKER' && (
                              <button className="btn-ghost" style={{ padding: '5px 10px', fontSize: '0.68rem' }}
                                disabled={!!actionLoading}
                                onClick={() => changeRole(u.id, 'BROKER')}>
                                {actionLoading === u.id + 'BROKER' ? '...' : '→ Broker'}
                              </button>
                            )}
                            {u.role !== 'SUPER_ADMIN' && (
                              <button className="btn-ghost" style={{ padding: '5px 10px', fontSize: '0.68rem', color: '#f87171' }}
                                disabled={!!actionLoading}
                                onClick={() => changeRole(u.id, 'SUPER_ADMIN')}>
                                {actionLoading === u.id + 'SUPER_ADMIN' ? '...' : '→ Super Admin'}
                              </button>
                            )}
                            <button style={{ padding: '5px 10px', fontSize: '0.68rem', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                              disabled={!!actionLoading}
                              onClick={() => deleteUser(u.id, u.email)}>
                              {actionLoading === u.id + 'del' ? '...' : 'Delete'}
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button className="btn-ghost" style={{ padding: '6px 14px', fontSize: '0.78rem' }}
              disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Page {page} of {pages}</span>
            <button className="btn-ghost" style={{ padding: '6px 14px', fontSize: '0.78rem' }}
              disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next →</button>
          </div>
        )}
      </div>
    </div>
  )
}
