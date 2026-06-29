'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      style={{
        width: '100%', textAlign: 'left', padding: '10px 12px',
        fontSize: '0.78rem', color: 'var(--ink-muted)',
        background: 'none', border: 'none', cursor: 'pointer',
        letterSpacing: '0.04em', transition: 'color 0.15s',
      }}
      className="hover:text-[var(--ink)]">
      Sign out
    </button>
  )
}
