"use client"

import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FooterSection from "@/components/footer-section"

// Sample nutrition plans data
const nutritionPlans = [
  {
    id: 1,
    title: "Anti-Inflammatory Diet Plan",
    description:
      "A comprehensive diet plan to reduce inflammation and support recovery from injuries and chronic pain.",
    price: 499,
    pages: 25,
    image: "/nutrition/anti-inflammatory-diet.jpg",
    category: "Pain Management",
    slug: "anti-inflammatory-diet",
  },
  {
    id: 2,
    title: "Joint Health Nutrition Guide",
    description: "Foods and nutrients that support joint health, reduce pain, and improve mobility.",
    price: 399,
    pages: 20,
    image: "/nutrition/joint-health-nutrition.jpg",
    category: "Joint Health",
    slug: "joint-health-nutrition",
  },
  {
    id: 3,
    title: "Sports Recovery Meal Plan",
    description:
      "Optimize your recovery with proper nutrition timing and food choices for athletes and active individuals.",
    price: 599,
    pages: 30,
    image: "/nutrition/sports-recovery-nutrition.jpg",
    category: "Sports Nutrition",
    slug: "sports-recovery-nutrition",
  },
  {
    id: 4,
    title: "Bone Strength Nutrition Guide",
    description: "Essential nutrients and meal plans to support bone density and prevent osteoporosis.",
    price: 449,
    pages: 22,
    image: "/nutrition/bone-strength-nutrition.jpg",
    category: "Bone Health",
    slug: "bone-strength-nutrition",
  },
]

const NutritionClientPage = () => {
  return (
    <>
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="text-4xl font-bold text-center text-gray-800 mb-8"
          >
            Nourish Your Body, Enhance Your Healing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="text-lg text-center text-gray-600 mb-12"
          >
            Discover our range of nutrition plans designed to support your physiotherapy treatment and overall
            well-being.
          </motion.p>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-between mb-8 gap-2"
          >
            <div className="flex bg-gray-100 rounded-full px-4 py-2 w-full md:w-auto">
              <Search className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Search nutrition plans..."
                className="bg-transparent border-none outline-none w-full"
              />
            </div>

            <Button variant="outline" className="gap-2">
              <Filter className="mr-2" size={20} />
              Filter
            </Button>
          </motion.div>

          {/* Nutrition Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nutritionPlans.map((plan) => (
              <motion.div
                key={plan.id}
                className="rounded-lg shadow-md overflow-hidden bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + plan.id * 0.1 }}
              >
                <Image
                  src={plan.image || "/placeholder.svg"}
                  alt={plan.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-xl text-gray-800 mb-2">{plan.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">₹{plan.price}</span>
                    <Link href={`/nutrition/${plan.slug}`}>
                      <Button>Learn More</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <FooterSection />
    </>
  )
}

export default NutritionClientPage
