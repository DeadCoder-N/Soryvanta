'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'

export default function DocLink({
  href,
  label,
  className,
  style,
}: {
  href: string
  label: string
  className?: string
  style?: CSSProperties
}) {
  const isButton = !!className

  return (
    <Link
      href={href}
      className={className}
      style={
        isButton
          ? { padding: '0.85rem 1.75rem', fontSize: '0.8rem', ...style }
          : {
              fontSize: 'clamp(0.68rem,1vw,0.78rem)',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              transition: 'color 0.2s',
              ...style,
            }
      }
      onMouseEnter={e => {
        e.currentTarget.style.color = isButton ? '' : 'var(--gold)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = isButton ? '' : 'var(--text-secondary)'
      }}
    >
      {!isButton && <span style={{ opacity: 0.4, fontSize: '0.6em' }}>→</span>}
      {label}
    </Link>
  )
}
