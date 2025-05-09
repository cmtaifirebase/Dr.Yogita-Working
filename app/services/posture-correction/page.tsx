import { getServiceBySlug } from "@/lib/services"
import ServiceDetailHero from "@/components/services/service-detail-hero"
import ServiceBenefits from "@/components/services/service-benefits"
import ServiceProcess from "@/components/services/service-process"
import ServiceFAQ from "@/components/services/service-faq"
import RelatedServices from "@/components/services/related-services"
import ServiceCTA from "@/components/services/service-cta"
import FooterSection from "@/components/footer-section"

export const metadata = {
  title: "Posture Correction | Dr. Yogita Physiotherapy",
  description:
    "Our posture correction program addresses the underlying causes of poor posture, from muscle imbalances to daily habits.",
}

export default function PostureCorrectionPage() {
  const service = getServiceBySlug("posture-correction")

  if (!service) {
    return <div>Service not found</div>
  }

  return (
    <main className="min-h-screen bg-rose-50/30 pt-20">
      <ServiceDetailHero service={service} />
      <ServiceBenefits service={service} />
      <ServiceProcess service={service} />
      <ServiceFAQ service={service} />
      <RelatedServices currentSlug="posture-correction" />
      <ServiceCTA />
      <FooterSection />
    </main>
  )
}
