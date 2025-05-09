"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Heart, ThumbsUp } from "lucide-react"
import Image from "next/image"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      age: "24",
      image: "/indian-woman-professional-headshot.png",
      quote:
        "After years of back pain from desk work, Dr. Yogita's treatment plan gave me relief in just 3 weeks. Her approach is thorough and personalized.",
      reaction: <Heart className="h-5 w-5 text-pink-500" />,
    },
    {
      name: "Rahul Mehta",
      age: "28",
      image: "/indian-man-headshot.png",
      quote:
        "The online therapy sessions were incredibly convenient and effective. Dr. Yogita's expertise shines through even in virtual consultations.",
      reaction: <ThumbsUp className="h-5 w-5 text-blue-500" />,
    },
    {
      name: "Ananya Patel",
      age: "29",
      image: "/indian-yoga-instructor-headshot.png",
      quote:
        "As someone who understands body mechanics, I can say Dr. Yogita's knowledge is exceptional. She helped me recover from a shoulder injury that other therapists couldn't fix.",
      reaction: <Star className="h-5 w-5 text-yellow-500" />,
    },
  ]

  const [current, setCurrent] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1)
  }

  useEffect(() => {
    // Auto-advance slides
    timeoutRef.current = setTimeout(nextSlide, 5000)
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [current])

  return (
    <section className="py-20 bg-rose-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Real Testimonials</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our patients who have experienced the transformative power of our physiotherapy services.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="border-pink-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div>
                          <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                              <p className="text-sm text-gray-500">Age {testimonial.age}</p>
                            </div>
                            <motion.div whileHover={{ scale: 1.2 }} className="p-2 bg-white rounded-full shadow-sm">
                              {testimonial.reaction}
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 bg-white shadow-md border-pink-100 z-10"
            onClick={() => {
              prevSlide()
              if (timeoutRef.current) clearTimeout(timeoutRef.current)
              timeoutRef.current = setTimeout(nextSlide, 5000)
            }}
          >
            <ChevronLeft className="h-5 w-5 text-pink-500" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 bg-white shadow-md border-pink-100 z-10"
            onClick={() => {
              nextSlide()
              if (timeoutRef.current) clearTimeout(timeoutRef.current)
              timeoutRef.current = setTimeout(nextSlide, 5000)
            }}
          >
            <ChevronRight className="h-5 w-5 text-pink-500" />
          </Button>
        </div>
      </div>
    </section>
  )
}
