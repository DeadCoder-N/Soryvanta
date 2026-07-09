'use client'

import { useEffect, useRef } from 'react'

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      started.current = true
      import('../mocks/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'bypass',
          serviceWorker: { url: '/mockServiceWorker.js' },
        }).catch(() => {
          // MSW already started — ignore
        })
      })
    }
  }, [])

  return <>{children}</>
}