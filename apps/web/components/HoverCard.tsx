'use client'

import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

interface HoverCardProps {
  href: string
  children: ReactNode
  className?: string
  style?: CSSProperties
  hoverStyle?: CSSProperties
}

export default function HoverCard({ href, children, className, style, hoverStyle }: HoverCardProps) {
  const base = style ?? {}
  const hover: CSSProperties = hoverStyle ?? {
    borderColor: 'var(--gold-border)',
    transform: 'translateY(-4px)',
    boxShadow: 'var(--shadow-gold)',
  }

  return (
    <Link
      href={href}
      className={className}
      style={base}
      onMouseEnter={e => {
        Object.assign(e.currentTarget.style, hover)
      }}
      onMouseLeave={e => {
        Object.keys(hover).forEach(k => {
          (e.currentTarget.style as Record<string, string>)[k] = (base as Record<string, string>)[k] ?? ''
        })
      }}
    >
      {children}
    </Link>
  )
}
