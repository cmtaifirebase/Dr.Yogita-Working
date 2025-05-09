"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Play, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FooterSection from "@/components/footer-section"

// Sample program data
const programs = [
  {
    id: 1,
    title: "Back Pain Relief Program",
    description: "A comprehensive program designed to alleviate back pain through targeted exercises and techniques.",
    price: 1499,
    duration: "35 min",
    image: "/programs/back-pain-program.jpg",
    slug: "back-pain-relief",
  },
  {
    id: 2,
    title: "Posture Correction Program",
    description: "Improve your posture and prevent related pain with this specialized exercise and awareness program.",
    price: 1299,
    duration: "40 min",
    image: "/programs/posture-program.jpg",
    slug: "posture-correction",
  },
  {
    id: 3,
    title: "Neck & Shoulder Pain Relief",
    description:
      "Target tension and pain in the neck and shoulders with effective stretches and strengthening exercises.",
    price: 1399,
    duration: "32 min",
    image: "/programs/neck-shoulder-program.jpg",
    slug: "neck-shoulder-relief",
  },
  {
    id: 4,
    title: "Core Strengthening Program",
    description: "Build a strong and stable core to support your spine and improve overall physical function.",
    price: 1599,
    duration: "45 min",
    image: "/programs/core-program.jpg",
    slug: "core-strengthening",
  },
  {
    id: 5,
    title: "Office Worker Wellness Program",
    description: "Combat the effects of prolonged sitting with exercises designed specifically for desk workers.",
    price: 1199,
    duration: "30 min",
    image: "/programs/office-wellness-program.jpg",
    slug: "office-wellness",
  },
  {
    id: 6,
    title: "Sports Injury Prevention",
    description: "Learn techniques to prevent common sports injuries and enhance your athletic performance.",
    price: 1699,
    duration: "38 min",
    image: "/programs/sports-injury-program.jpg",
    slug: "sports-injury-prevention",
  },
  {
    id: 7,
    title: "Senior Mobility & Balance",
    description: "Improve stability, mobility, and confidence with exercises designed specifically for seniors.",
    price: 1299,
    duration: "35 min",
    image: "/programs/senior-mobility-program.jpg",
    slug: "senior-mobility",
  },
  {
    id: 8,
    title: "Post-Pregnancy Recovery",
    description: "Safely rebuild strength and address common postpartum physical challenges.",
    price: 1599,
    duration: "40 min",
    image: "/programs/post-pregnancy-program.jpg",
    slug: "post-pregnancy-recovery",
  },
  {
    id: 9,
    title: "Knee Pain Management",
    description: "Reduce knee pain and improve joint function with targeted exercises and techniques.",
    price: 1399,
    duration: "33 min",
    image: "/programs/knee-pain-program.jpg",
    slug: "knee-pain-management",
  },
  {
    id: 10,
    title: "Stress Relief & Relaxation",
    description: "Combine gentle movement with breathing techniques to reduce stress and promote relaxation.",
    price: 1199,
    duration: "30 min",
    image: "/programs/stress-relief-program.jpg",
    slug: "stress-relief",
  },
  {
    id: 11,
    title: "Hip Mobility Program",
    description: "Improve hip flexibility and strength to enhance movement and reduce discomfort.",
    price: 1299,
    duration: "35 min",
    image: "/programs/hip-mobility-program.jpg",
    slug: "hip-mobility",
  },
  {
    id: 12,
    title: "Full Body Flexibility",
    description: "Enhance overall flexibility and range of motion with this comprehensive stretching program.",
    price: 1499,
    duration: "42 min",
    image: "/programs/flexibility-program.jpg",
    slug: "full-body-flexibility",
  },
]

export default function ProgramsClientPage() {
  return (
    <main className="min-h-screen bg-rose-50/30 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-pink-50 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('/programs/programs-pattern.png')] opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Physiotherapy Programs</h1>
              <p className="text-xl text-gray-600 mb-8">
                Expert-designed video programs to help you recover, strengthen, and improve your physical wellbeing from
                the comfort of your home.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="#program-list">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md font-medium flex items-center">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Explore Programs
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Purchase a Program</h3>
              <p className="text-gray-600">
                Choose a program that addresses your specific needs and complete the purchase process.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Receive on WhatsApp</h3>
              <p className="text-gray-600">
                The full program video will be sent directly to your WhatsApp for easy access.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Follow Along</h3>
              <p className="text-gray-600">Follow the expert guidance in the video at your own pace and convenience.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section id="program-list" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Programs</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Each program is designed by Dr. Yogita and her team of expert physiotherapists to address specific
              conditions and goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-pink-500 text-white px-3 py-1 rounded-tr-lg flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{program.duration}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-pink-500">₹{program.price}</span>
                    <Link href={`/programs/${program.slug}`}>
                      <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium flex items-center">
                        <ShoppingCart className="mr-1 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-pink-100 to-blue-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src="/indian-woman-professional-headshot.png"
                    alt="Testimonial"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Priya Sharma</h4>
                  <p className="text-gray-500 text-sm">Back Pain Relief Program</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The back pain program has been a game-changer for me. After just two weeks of following the exercises,
                my chronic back pain has significantly reduced. The instructions are clear and easy to follow."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src="/indian-man-headshot.png"
                    alt="Testimonial"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Rahul Patel</h4>
                  <p className="text-gray-500 text-sm">Office Worker Wellness Program</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As someone who sits at a desk all day, this program has been invaluable. The exercises are quick but
                effective, and I've noticed a significant improvement in my posture and reduction in neck pain.
                Receiving it directly on WhatsApp makes it so convenient."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image
                    src="/indian-yoga-instructor-headshot.png"
                    alt="Testimonial"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Ananya Gupta</h4>
                  <p className="text-gray-500 text-sm">Post-Pregnancy Recovery</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The post-pregnancy program helped me regain my strength safely. Dr. Yogita's guidance is clear and
                reassuring. I appreciate how the exercises gradually increase in intensity, making it perfect for new
                moms."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">How do I access the program after purchase?</h3>
              <p className="text-gray-600">
                After completing your purchase, you'll receive the full program video directly on your WhatsApp within
                24 hours. You'll also receive an email confirmation with details.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Can I view the program on multiple devices?</h3>
              <p className="text-gray-600">
                Yes, once you receive the video on WhatsApp, you can save it to your device and view it on any
                compatible device. You can also request the video to be sent to a different WhatsApp number if needed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Are these programs suitable for beginners?</h3>
              <p className="text-gray-600">
                Yes, all our programs are designed with clear instructions and modifications for different fitness
                levels. Each exercise is demonstrated with proper form and technique guidance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">How long do I have access to the program?</h3>
              <p className="text-gray-600">
                Once you receive the video, it's yours to keep permanently. There are no subscription fees or time
                limitations on access.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Can I get a refund if the program doesn't work for me?
              </h3>
              <p className="text-gray-600">
                Due to the digital nature of our programs, we do not offer refunds once the video has been delivered.
                However, we're happy to provide guidance or answer questions to help you get the most out of your
                program.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
