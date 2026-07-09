'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// GA4 gtag type declaration
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// GA4 measurement ID (replace with your actual ID)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Track page views
function usePageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return
    if (typeof window.gtag === 'undefined') return

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
    })
  }, [pathname, searchParams])
}

// Web Vitals reporter — sends Core Web Vitals to GA4
function reportWebVitals(metric: any) {
  if (!GA_MEASUREMENT_ID || typeof window.gtag === 'undefined') return

  const { name, delta, value, id } = metric
  window.gtag('event', name, {
    event_category: 'Web Vitals',
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    metric_id: id,
    metric_value: value,
    metric_delta: delta,
    non_interaction: true,
  })
}

// Fire a custom GA4 event
export function fireAnalyticsEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window.gtag === 'undefined') return
  window.gtag('event', action, params)
}

export default function Analytics() {
  usePageView()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Dynamically import web-vitals to avoid bundle impact
    import('web-vitals').then((mod: any) => {
      const { onLCP, onINP, onCLS, onFCP, onTTFB } = mod
      onLCP(reportWebVitals)
      onINP(reportWebVitals)
      onCLS(reportWebVitals)
      onFCP(reportWebVitals)
      onTTFB(reportWebVitals)
    }).catch(() => {
      // web-vitals not installed yet — that's fine
    })
  }, [])

  return null
}