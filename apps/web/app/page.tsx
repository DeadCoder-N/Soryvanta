import { auth } from '@/auth'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustSection from '@/components/TrustSection'
import ProblemSection from '@/components/ProblemSection'
import SolutionSection from '@/components/SolutionSection'
import EcosystemSection from '@/components/EcosystemSection'
import GrowthDashboardSection from '@/components/GrowthDashboardSection'
import SolutionsSection from '@/components/SolutionsSection'
import IntegrationsSection from '@/components/IntegrationsSection'
import CustomerSuccessSection from '@/components/CustomerSuccessSection'
import PricingSection from '@/components/PricingSection'
import FaqSection from '@/components/FaqSection'
import FinalCtaSection from '@/components/FinalCtaSection'
import Footer from '@/components/Footer'

export default async function HomePage() {
  const session = await auth()

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <Hero isLoggedIn={!!session?.user} />
      <TrustSection />
      <ProblemSection />
      <SolutionSection />
      <EcosystemSection />
      <GrowthDashboardSection />
      <SolutionsSection />
      <IntegrationsSection />
      <CustomerSuccessSection />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
    </div>
  )
}
