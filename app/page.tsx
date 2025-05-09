import HeroSection from "@/components/hero-section"
import MeetDrYogita from "@/components/meet-dr-yogita"
import ServicesSection from "@/components/services-section"
import EbookSection from "@/components/ebook-section"
import TestimonialsSection from "@/components/testimonials-section"
import HealthTipsSection from "@/components/health-tips-section"
import FooterSection from "@/components/footer-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-rose-50/30">
      <HeroSection />
      <MeetDrYogita />
      <ServicesSection />
      <EbookSection />
      <TestimonialsSection />
      <HealthTipsSection />
      <FooterSection />
    </main>
  )
}
