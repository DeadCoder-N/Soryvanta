import type { Metadata } from 'next'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Privacy Policy — Marketing OS',
  description: 'How Marketing OS collects, uses, and protects your personal information.',
}

const SECTIONS = [
  {
    title: 'Information We Collect',
    content: `We collect information you provide directly to us when you create an account, use our services, or contact us for support. This includes your name, email address, phone number, business details, and any content you upload or generate through the platform.

We also collect usage data automatically, including pages visited, features used, device information, IP address, and browser type. This helps us improve the platform and provide a better experience.`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use the information we collect to provide, maintain, and improve our services. This includes processing your account registration, generating AI-powered pages and content, sending transactional emails and notifications, providing customer support, and analyzing usage patterns to improve the platform.

We do not sell your personal information to third parties. We do not use your data to train AI models without your explicit consent.`,
  },
  {
    title: 'Data Storage and Security',
    content: `Your data is stored on secure cloud infrastructure hosted on AWS and Supabase. We use industry-standard encryption for data in transit (TLS 1.3) and at rest. Access to your data is restricted to authorized personnel only.

We retain your data for as long as your account is active. You may request deletion of your account and associated data at any time by contacting us.`,
  },
  {
    title: 'Third-Party Services',
    content: `We use trusted third-party services to operate the platform, including Supabase for database hosting, Cloudinary for image storage, AiSensy for WhatsApp messaging, and Anthropic for AI content generation. Each of these providers has their own privacy policies and data handling practices.

We only share the minimum data necessary for these services to function.`,
  },
  {
    title: 'Cookies',
    content: `We use cookies and similar tracking technologies to maintain your session, remember your preferences, and analyze platform usage. You can control cookie settings through your browser. Disabling cookies may affect some platform functionality.

For full details on our cookie usage, see our Cookie Policy.`,
  },
  {
    title: 'Your Rights',
    content: `You have the right to access, correct, or delete your personal data at any time. You may also request a copy of your data in a portable format. To exercise any of these rights, contact us at privacy@marketingos.in.

If you are located in the European Union, you have additional rights under GDPR including the right to object to processing and the right to lodge a complaint with a supervisory authority.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through a notice on the platform. Your continued use of Marketing OS after changes take effect constitutes your acceptance of the updated policy.`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Legal"
        title="Privacy"
        titleGold="Policy."
        description="Last updated: July 2026. This policy explains how Marketing OS Technologies collects, uses, and protects your information."
      />

      <section style={{
        maxWidth: '800px', margin: '0 auto',
        padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem,4vw,3rem)' }}>
          {SECTIONS.map((section, i) => (
            <div key={section.title} className="animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1rem,1.6vw,1.2rem)',
                color: 'var(--text-primary)', fontWeight: 400,
                marginBottom: 'clamp(0.75rem,1.4vw,1rem)',
              }}>
                {section.title}
              </h2>
              {section.content.split('\n\n').map((para, j) => (
                <p key={j} style={{
                  fontSize: 'clamp(0.75rem,1.1vw,0.85rem)',
                  color: 'var(--text-secondary)', lineHeight: 1.8,
                  marginBottom: j < section.content.split('\n\n').length - 1 ? '1rem' : 0,
                }}>
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 'clamp(3rem,6vw,5rem)',
          padding: 'clamp(1.25rem,2.5vw,1.75rem)',
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
        }}>
          <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Questions about this policy? Contact us at{' '}
            <a href="mailto:privacy@marketingos.in" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
              privacy@marketingos.in
            </a>
            {' '}or write to Marketing OS Technologies, India.
          </p>
        </div>
      </section>
    </MarketingLayout>
  )
}
