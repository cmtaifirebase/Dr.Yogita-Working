"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function HealthTipsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const healthTips = [
    {
      title: "Desk Stretches",
      description: "Simple stretches you can do at your desk to prevent stiffness and pain.",
      image: "/placeholder.svg?height=400&width=600&query=person stretching at desk",
    },
    {
      title: "Proper Sleeping Posture",
      description: "How to position your body for better sleep and less morning pain.",
      image: "/placeholder.svg?height=400&width=600&query=proper sleeping posture illustration",
    },
    {
      title: "Hydration & Pain",
      description: "The surprising connection between hydration and chronic pain management.",
      image: "/placeholder.svg?height=400&width=600&query=person drinking water",
    },
    {
      title: "5-Minute Relief",
      description: "Quick exercises for immediate relief from neck and shoulder tension.",
      image: "/placeholder.svg?height=400&width=600&query=neck stretching exercise",
    },
    {
      title: "Ergonomic Setup",
      description: "Creating the perfect ergonomic workspace to prevent injuries.",
      image: "/placeholder.svg?height=400&width=600&query=ergonomic desk setup",
    },
  ]

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = 300

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Health Tips Reel</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Practical advice and quick tips to help you maintain optimal health in your daily life.
          </p>
        </motion.div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {healthTips.map((tip, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-80 md:w-96 px-4 snap-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-pink-100 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={tip.image || "/placeholder.svg"}
                      alt={tip.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{tip.title}</h3>
                    <p className="text-gray-600">{tip.description}</p>
                    <Button variant="link" className="text-pink-500 p-0 mt-2 hover:text-pink-600">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md border-pink-100 z-10 hidden md:flex"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-5 w-5 text-pink-500" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md border-pink-100 z-10 hidden md:flex"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-5 w-5 text-pink-500" />
          </Button>
        </div>
      </div>
    </section>
  )
}
