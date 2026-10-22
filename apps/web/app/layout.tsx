import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import Providers from '@/components/Providers'
import { auth } from '@/auth'
import './globals.css'

// Canonical site host. Reads CANONICAL_URL (preferred) or NEXTAUTH_URL from the
// deployment environment. Never hard-code a former-brand hostname here.
const CANONICAL_HOST =
  process.env.CANONICAL_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000'
const canonicalUrl = CANONICAL_HOST.replace(/\/$/, '')

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'Marketing OS — AI-Powered Luxury Property Listings India | Find Premium Real Estate',
    template: '%s | Marketing OS',
  },
  description: 'India\'s premier AI-powered property listing platform. Brokers send WhatsApp messages, AI generates professional listings with SEO-optimized pages. Find apartments, villas, and commercial properties in Mumbai, Delhi, Bangalore.',
  keywords: ['property listings India', 'AI real estate', 'WhatsApp property listings', 'premium property Mumbai', 'luxury apartments India', 'real estate broker platform', 'Marketing OS', 'property search', 'commercial property India', 'villa listings'],
  authors: [{ name: 'Marketing OS' }],
  creator: 'Marketing OS',
  publisher: 'Marketing OS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(canonicalUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: canonicalUrl,
    siteName: 'Marketing OS',
    title: 'Marketing OS — AI-Powered Luxury Property Listings India',
    description: 'Turn WhatsApp messages into professional property listings instantly. Find premium properties in Mumbai, Delhi, Bangalore and across India.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing OS — AI-Powered Luxury Property Listings India',
    description: 'Turn WhatsApp messages into professional property listings instantly.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  verification: {
    google: 'YNk-8h8-mk-a2Rm-5M9CTiVBuC8mCxwQoqI1RmVCcHo',
  },
  other: {
    'application/ld+json': JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Marketing OS',
        url: canonicalUrl,
        description: 'AI-powered luxury property listing platform for Indian real estate brokers.',
        foundingDate: '2026',
        sameAs: ['https://twitter.com/marketingos', 'https://linkedin.com/company/marketingos'],
        contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'support@marketingos.in' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Marketing OS',
        url: canonicalUrl,
        description: "India's premier AI-powered property listing platform.",
        potentialAction: {
          '@type': 'SearchAction',
          target: `${canonicalUrl}?city={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ]),
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}
