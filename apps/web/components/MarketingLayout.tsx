import Navbar from './Navbar'
import Footer from './Footer'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
