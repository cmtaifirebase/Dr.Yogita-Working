"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Linkedin } from "lucide-react"
import Image from "next/image"

export default function BlogPostAuthor() {
  return (
    <section className="py-12 bg-rose-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-pink-100 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-gradient-to-br from-pink-100 to-blue-50 p-6 flex items-center justify-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                      <Image
                        src="/dr-yogita-headshot.png"
                        alt="Dr. Yogita"
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Dr. Yogita</h3>
                    <p className="text-pink-500 font-medium mb-4">Physiotherapist & Wellness Expert</p>
                    <p className="text-gray-600 mb-4">
                      Dr. Yogita brings over 22 years of experience in physiotherapy and holistic wellness. She combines
                      traditional techniques with modern approaches to help patients achieve optimal health and
                      well-being.
                    </p>
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="icon" className="rounded-full border-pink-200">
                        <Instagram className="h-4 w-4 text-pink-500" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full border-pink-200">
                        <Facebook className="h-4 w-4 text-pink-500" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full border-pink-200">
                        <Linkedin className="h-4 w-4 text-pink-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
