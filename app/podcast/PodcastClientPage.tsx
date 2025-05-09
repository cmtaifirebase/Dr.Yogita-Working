"use client"
import { motion } from "framer-motion"
import { Play, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import FooterSection from "@/components/footer-section"

export default function PodcastClientPage() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
      <section className="relative h-screen w-full">
        <Image src="/podcast-cover.png" alt="Podcast Cover" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-10 left-10 z-10">
          <h1 className="text-4xl font-bold text-white">The Dr. Yogita Show</h1>
          <p className="text-lg text-gray-300">Insights on physiotherapy, wellness, and health.</p>
        </div>
      </section>

      <section className="container mx-auto mt-12 mb-24 px-4">
        <h2 className="mb-8 text-3xl font-semibold">Latest Episodes</h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Episode Card 1 */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-md">
            <Image
              src="/episode-1.png"
              alt="Episode 1"
              width={500}
              height={300}
              className="rounded-t-lg object-cover"
            />
            <div className="p-5">
              <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                Episode 1: Understanding Back Pain
              </h3>
              <p className="mb-3 font-normal text-gray-700">
                Dr. Yogita discusses the common causes of back pain and effective physiotherapy treatments.
              </p>
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>October 26, 2023</span>
                <Clock className="h-4 w-4" />
                <span>35 min</span>
              </div>
              <Button className="w-full">
                <Play className="mr-2 h-4 w-4" />
                Listen Now
              </Button>
            </div>
          </div>

          {/* Episode Card 2 */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-md">
            <Image
              src="/episode-2.png"
              alt="Episode 2"
              width={500}
              height={300}
              className="rounded-t-lg object-cover"
            />
            <div className="p-5">
              <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                Episode 2: The Role of Physiotherapy in Sports Injuries
              </h3>
              <p className="mb-3 font-normal text-gray-700">
                Explore how physiotherapy aids in the recovery and prevention of sports-related injuries.
              </p>
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>November 5, 2023</span>
                <Clock className="h-4 w-4" />
                <span>42 min</span>
              </div>
              <Button className="w-full">
                <Play className="mr-2 h-4 w-4" />
                Listen Now
              </Button>
            </div>
          </div>

          {/* Episode Card 3 */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-md">
            <Image
              src="/episode-3.png"
              alt="Episode 3"
              width={500}
              height={300}
              className="rounded-t-lg object-cover"
            />
            <div className="p-5">
              <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                Episode 3: Wellness and Posture Correction
              </h3>
              <p className="mb-3 font-normal text-gray-700">
                Learn about the importance of good posture and exercises for overall wellness.
              </p>
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>November 12, 2023</span>
                <Clock className="h-4 w-4" />
                <span>38 min</span>
              </div>
              <Button className="w-full">
                <Play className="mr-2 h-4 w-4" />
                Listen Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </motion.main>
  )
}
