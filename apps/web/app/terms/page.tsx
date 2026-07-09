import type { Metadata } from 'next'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Terms of Service — Brisvora',
  description: 'The terms and conditions governing your use of the Brisvora platform.',
}

const SECTIONS = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing or using Brisvora, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you may not use the platform.

These terms apply to all users of Brisvora, including free trial users, paid subscribers, and administrators.`,
  },
  {
    title: 'Use of the Platform',
    content: `You may use Brisvora only for lawful purposes and in accordance with these terms. You agree not to use the platform to generate, publish, or distribute content that is illegal, fraudulent, misleading, defamatory, or harmful.

You are responsible for all activity that occurs under your account. You must keep your login credentials secure and notify us immediately of any unauthorized access.`,
  },
  {
    title: 'Subscriptions and Billing',
    content: `Brisvora offers paid subscription plans billed monthly or annually. By subscribing, you authorize us to charge your payment method on a recurring basis. All fees are non-refundable except as required by law or as stated in our refund policy.

You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. You will retain access to paid features until the period ends.`,
  },
  {
    title: 'Intellectual Property',
    content: `Brisvora and its original content, features, and functionality are owned by Brisvora Technologies and are protected by intellectual property laws. You may not copy, modify, distribute, or reverse-engineer any part of the platform without our written permission.

Content you create using Brisvora — including AI-generated pages, listings, and copy — belongs to you. You grant Brisvora a limited license to host and serve this content as part of the platform.`,
  },
  {
    title: 'AI-Generated Content',
    content: `Brisvora uses AI to generate content on your behalf. You are responsible for reviewing and approving all AI-generated content before publishing. Brisvora does not guarantee the accuracy, completeness, or suitability of AI-generated content for any specific purpose.

You must not use AI-generated content to deceive, mislead, or harm others.`,
  },
  {
    title: 'Limitation of Liability',
    content: `To the maximum extent permitted by law, Brisvora Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.

Our total liability to you for any claim arising from these terms or your use of Brisvora shall not exceed the amount you paid us in the three months preceding the claim.`,
  },
  {
    title: 'Termination',
    content: `We reserve the right to suspend or terminate your account at any time if you violate these terms, engage in fraudulent activity, or use the platform in a way that harms other users or Brisvora.

You may terminate your account at any time by contacting support. Upon termination, your data will be retained for 30 days before permanent deletion.`,
  },
  {
    title: 'Governing Law',
    content: `These terms are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of India.`,
  },
]

export default function TermsPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Legal"
        title="Terms of"
        titleGold="Service."
        description="Last updated: July 2026. Please read these terms carefully before using the Brisvora platform."
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
            Questions about these terms? Contact us at{' '}
            <a href="mailto:legal@brisvora.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
              legal@brisvora.com
            </a>
          </p>
        </div>
      </section>
    </MarketingLayout>
  )
}
