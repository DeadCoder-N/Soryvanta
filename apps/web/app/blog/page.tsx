import type { Metadata } from 'next'
import MarketingLayout from '@/components/MarketingLayout'
import HoverCard from '@/components/HoverCard'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Blog — AI, Growth & Business Insights',
  description: 'Insights on AI, WhatsApp automation, SEO, and business growth from the Marketing OS team.',
}

const POSTS = [
  {
    category: 'AI & Automation',
    title: 'How AI is Transforming Real Estate Marketing in India',
    desc: 'Property brokers who adopt AI-powered listing tools are closing deals 3x faster. Here\'s what\'s changing and how to stay ahead.',
    date: 'July 2026',
    readTime: '5 min read',
    href: '/blog',
  },
  {
    category: 'WhatsApp',
    title: 'Why WhatsApp is the Most Powerful Sales Channel for Indian Businesses',
    desc: 'With 500M+ users in India, WhatsApp is where your customers already are. Here\'s how to turn it into your best sales tool.',
    date: 'July 2026',
    readTime: '4 min read',
    href: '/blog',
  },
  {
    category: 'SEO',
    title: 'Local SEO for Small Businesses: The Complete 2026 Guide',
    desc: 'Ranking on Google for local searches is the highest-ROI marketing activity for most businesses. Here\'s exactly how to do it.',
    date: 'June 2026',
    readTime: '8 min read',
    href: '/blog',
  },
  {
    category: 'Growth',
    title: 'The One-Person Business Stack: Run Everything with AI',
    desc: 'How solo entrepreneurs and small teams are using AI tools to operate like companies 10x their size.',
    date: 'June 2026',
    readTime: '6 min read',
    href: '/blog',
  },
  {
    category: 'Product',
    title: 'Introducing Marketing OS: AI-Powered Growth for Every Business',
    desc: 'We built Marketing OS because we saw how much time small business owners waste on tasks AI can handle in seconds.',
    date: 'June 2026',
    readTime: '3 min read',
    href: '/blog',
  },
  {
    category: 'AI & Automation',
    title: 'Lead Management in 2026: Why Manual CRMs Are Dying',
    desc: 'AI-powered lead management captures, scores, and follows up with leads automatically. Here\'s why the old way no longer works.',
    date: 'May 2026',
    readTime: '5 min read',
    href: '/blog',
  },
]

const CATEGORIES = ['All', 'AI & Automation', 'WhatsApp', 'SEO', 'Growth', 'Product']

export default function BlogPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Blog"
        title="Insights on AI, Growth"
        titleGold="& Business Automation."
        description="Practical insights on AI, WhatsApp automation, SEO, and growing your business in the age of intelligent tools."
      />

      {/* Category filter */}
      <div style={{
        background: 'var(--surface-1)', borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(1rem,2vw,1.5rem) 0',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 clamp(1.25rem,4vw,2.5rem)',
          display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
        }}>
          {CATEGORIES.map((cat, i) => (
            <button key={cat} style={{
              padding: 'clamp(0.4rem,0.8vw,0.55rem) clamp(0.85rem,1.6vw,1.1rem)',
              background: i === 0 ? 'linear-gradient(135deg, var(--gold), var(--gold-light))' : 'var(--surface-2)',
              border: `1px solid ${i === 0 ? 'var(--gold-border)' : 'var(--border)'}`,
              borderRadius: '2em',
              cursor: 'pointer',
              fontSize: 'clamp(0.62rem,0.95vw,0.72rem)',
              color: i === 0 ? '#000' : 'var(--text-secondary)',
              fontWeight: i === 0 ? 600 : 400,
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <section style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px,30vw,380px), 1fr))',
          gap: 'clamp(1rem,2vw,1.5rem)',
        }}>
          {POSTS.map((post, i) => (
            <HoverCard key={post.title} href={post.href}
              className="animate-fade-up"
              style={{
                animationDelay: `${i * 60}ms`,
                display: 'flex', flexDirection: 'column',
                padding: 'clamp(1.25rem,2.5vw,1.75rem)',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                textDecoration: 'none',
                transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <span style={{
                display: 'inline-block',
                fontSize: 'clamp(0.5rem,0.78vw,0.58rem)',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--gold)', fontFamily: "'Cinzel', serif",
                marginBottom: 'clamp(0.65rem,1.2vw,0.9rem)',
              }}>
                {post.category}
              </span>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(0.95rem,1.5vw,1.1rem)',
                color: 'var(--text-primary)', fontWeight: 400,
                lineHeight: 1.3, marginBottom: '0.6rem', flex: 1,
              }}>
                {post.title}
              </h3>
              <p style={{
                fontSize: 'clamp(0.7rem,1.05vw,0.8rem)',
                color: 'var(--text-muted)', lineHeight: 1.65,
                marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)',
              }}>
                {post.desc}
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: 'clamp(0.65rem,1.2vw,0.9rem)',
                borderTop: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: 'clamp(0.6rem,0.9vw,0.7rem)', color: 'var(--text-muted)' }}>{post.date}</span>
                <span style={{ fontSize: 'clamp(0.6rem,0.9vw,0.7rem)', color: 'var(--text-muted)' }}>{post.readTime}</span>
              </div>
            </HoverCard>
          ))}
        </div>
      </section>
    </MarketingLayout>
  )
}
