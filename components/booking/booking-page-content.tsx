"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { BookingCalendar } from "@/components/booking/booking-calendar"
import { BookingForm } from "@/components/booking/booking-form"
import { BookingSummary } from "@/components/booking/booking-summary"
import { BookingServiceSelector } from "@/components/booking/booking-service-selector"
import { useBooking } from "@/contexts/booking-context"
// Assuming Service type is exported from your services file, e.g.:
// export interface Service { id: string; name: string; slug: string; /* ...other properties */ }
import { getServiceBySlug, Service } from "@/lib/services"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookingPageContent() {
  const { selectedDate, selectedTime, selectedService, setSelectedService } = useBooking()
  const [step, setStep] = useState(1)
  const [initialServiceSlug, setInitialServiceSlug] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once component mounts on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Effect to get service slug from URL, only runs on client
  useEffect(() => {
    if (isClient) {
      const params = new URLSearchParams(window.location.search)
      const slugFromUrl = params.get("service")
      if (slugFromUrl) {
        setInitialServiceSlug(slugFromUrl)
      }
    }
  }, [isClient]) // Re-run if isClient changes (though it only changes once)

  // Effect to set the service in context based on the slug from URL
  // useCallback for setSelectedService is good practice if it's passed as a prop or used in deps,
  // though setters from useState are stable. Assuming useBooking might provide a memoized setter.
  const stableSetSelectedService = useCallback(setSelectedService, [setSelectedService]);

  useEffect(() => {
    if (initialServiceSlug && stableSetSelectedService) {
      const service = getServiceBySlug(initialServiceSlug)
      if (service) {
        stableSetSelectedService(service as Service) // Cast if necessary, or ensure getServiceBySlug returns typed Service
      } else {
        console.warn(`Service with slug "${initialServiceSlug}" not found.`)
        // Optionally, clear the selected service if slug is invalid
        // stableSetSelectedService(null);
      }
    }
  }, [initialServiceSlug, stableSetSelectedService])

  const steps = [
    { number: 1, title: "Select Service" },
    { number: 2, title: "Choose Date & Time" },
    { number: 3, title: "Your Information" },
  ]

  const nextStep = () => {
    if (step === 1 && !selectedService) return
    if (step === 2 && (!selectedDate || !selectedTime)) return
    setStep((prev) => Math.min(prev + 1, steps.length))
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Book Your Appointment</h1>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule your physiotherapy session with Dr. Yogita. Choose from available dates and times for your
            treatment.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Steps indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-center">
              {steps.map((s, i) => (
                <div key={s.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      step >= s.number ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-500"
                    } transition-colors duration-300`}
                  >
                    {step > s.number ? <Check className="h-5 w-5" /> : s.number}
                  </div>
                  <div className="hidden sm:block ml-3 mr-10"> {/* Consistent margin */}
                    <p className={`text-sm font-medium ${step >= s.number ? "text-gray-800" : "text-gray-400"}`}>
                      {s.title}
                    </p>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`hidden sm:block w-20 h-1 ${i < steps.length - 1 ? "mr-10" : ""} ${
                        step > s.number ? "bg-pink-500" : "bg-gray-200"
                      } transition-colors duration-300`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-pink-100">
            <div className="p-6 md:p-8">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <BookingServiceSelector />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <BookingCalendar />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <BookingForm />
                    </div>
                    <div>
                      <BookingSummary />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="px-6 md:px-8 py-4 bg-gray-50 border-t border-pink-100 flex justify-between items-center">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-pink-200 text-pink-700 hover:bg-pink-50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              {step < steps.length && (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                  disabled={(step === 1 && !selectedService) || (step === 2 && (!selectedDate || !selectedTime))}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              {/* Note: A "Submit" button for step 3 would typically be part of BookingForm */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
