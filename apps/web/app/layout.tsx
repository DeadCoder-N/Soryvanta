import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import Providers from '@/components/Providers'
import './globals.css'

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
    default: 'Brisvora — AI-Powered Luxury Property Listings India | Find Premium Real Estate',
    template: '%s | Brisvora',
  },
  description: 'India\'s premier AI-powered property listing platform. Brokers send WhatsApp messages, AI generates professional listings with SEO-optimized pages. Find apartments, villas, and commercial properties in Mumbai, Delhi, Bangalore.',
  keywords: ['property listings India', 'AI real estate', 'WhatsApp property listings', 'premium property Mumbai', 'luxury apartments India', 'real estate broker platform', 'Brisvora', 'property search', 'commercial property India', 'villa listings'],
  authors: [{ name: 'Brisvora' }],
  creator: 'Brisvora',
  publisher: 'Brisvora',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://brisvora.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://brisvora.vercel.app',
    siteName: 'Brisvora',
    title: 'Brisvora — AI-Powered Luxury Property Listings India',
    description: 'Turn WhatsApp messages into professional property listings instantly. Find premium properties in Mumbai, Delhi, Bangalore and across India.',
    images: [
      {
        url: 'https://brisvora.vercel.app/Brisvora.png',
        width: 1200,
        height: 630,
        alt: 'Brisvora - AI Property Listings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brisvora — AI-Powered Luxury Property Listings India',
    description: 'Turn WhatsApp messages into professional property listings instantly.',
    images: ['https://brisvora.vercel.app/Brisvora.png'],
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
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Brisvora',
  url: 'https://brisvora.vercel.app',
  logo: 'https://brisvora.vercel.app/Brisvora.png',
  description: 'AI-powered luxury property listing platform for Indian real estate brokers.',
  foundingDate: '2026',
  sameAs: [
    'https://twitter.com/brisvora',
    'https://linkedin.com/company/brisvora',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@brisvora.in',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Brisvora',
  url: 'https://brisvora.vercel.app',
  description: 'India\'s premier AI-powered property listing platform.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://brisvora.vercel.app?city={search_term_string}&type={search_term_string}&bedrooms={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
