'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { Session } from 'next-auth'

export default function Providers({ children, session }: { children: React.ReactNode; session?: Session | null }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </ThemeProvider>
  )
}
