import ServicePageTemplate from "@/components/services/service-page-template"
import FooterSection from "@/components/footer-section"

export const metadata = {
  title: "Physiotherapy Services | Dr. Yogita Physiotherapy",
  description: "Expert physiotherapy services to help you recover, rehabilitate, and improve your quality of life.",
}

export default function PhysiotherapyPage() {
  return (
    <main className="min-h-screen">
      <ServicePageTemplate
        title="Physiotherapy"
        description="Our comprehensive physiotherapy services are designed to assess, diagnose, and treat a wide range of conditions affecting the musculoskeletal system."
        image="/services/physiotherapy-service.jpg"
        benefits={[
          "Relief from acute and chronic pain",
          "Improved mobility and function",
          "Enhanced strength and flexibility",
          "Faster recovery from injuries",
          "Prevention of future injuries",
          "Personalized treatment plans",
        ]}
        longDescription={`
          <p>Physiotherapy is a healthcare profession that focuses on developing, maintaining, and restoring maximum movement and functional ability throughout the lifespan. It involves the assessment, diagnosis, and treatment of a wide range of conditions and disabilities that affect the physical function of adults and children.</p>
          
          <p>At Dr. Yogita Physiotherapy Clinic, our expert physiotherapists use evidence-based techniques to help you recover from injury, reduce pain, and improve your overall quality of life. We take a holistic approach to treatment, considering not just the symptoms but the underlying causes of your condition.</p>
          
          <p>Our physiotherapy services include manual therapy, therapeutic exercises, electrotherapy, and education on posture and movement patterns. We work closely with each patient to develop a personalized treatment plan that addresses their specific needs and goals.</p>
          
          <p>Whether you're recovering from surgery, managing a chronic condition, or seeking to improve your physical performance, our physiotherapy services can help you achieve optimal health and wellness.</p>
        `}
        process={[
          {
            title: "Initial Assessment",
            description:
              "We begin with a thorough evaluation of your condition, medical history, and lifestyle factors to understand your unique needs and goals.",
          },
          {
            title: "Diagnosis",
            description:
              "Based on the assessment, we identify the root causes of your symptoms and develop a clear understanding of your condition.",
          },
          {
            title: "Treatment Plan",
            description:
              "We create a personalized treatment plan that combines various techniques and approaches to address your specific needs.",
          },
          {
            title: "Active Treatment",
            description:
              "Through a combination of hands-on therapy, exercises, and modalities, we work to relieve pain, improve function, and promote healing.",
          },
          {
            title: "Education & Prevention",
            description:
              "We provide guidance on proper body mechanics, home exercises, and lifestyle modifications to prevent future issues and maintain long-term health.",
          },
        ]}
      />
      <FooterSection />
    </main>
  )
}
