'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import dynamic from 'next/dynamic'
import type { Session } from 'next-auth'

// Lazy-load MSWProvider — tree-shaken in production, only loaded in dev
const MSWProvider = dynamic(
  () => import('@/src/mocks/MSWProvider').then((m) => ({ default: m.MSWProvider })),
  { ssr: false },
)

export default function Providers({ children, session }: { children: React.ReactNode; session?: Session | null }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
      <SessionProvider session={session}>
        {process.env.NODE_ENV === 'development' ? (
          <MSWProvider>{children}</MSWProvider>
        ) : (
          children
        )}
      </SessionProvider>
    </ThemeProvider>
  )
}