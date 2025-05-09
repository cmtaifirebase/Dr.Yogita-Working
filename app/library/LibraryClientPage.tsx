"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ShoppingCart, Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import FooterSection from "@/components/footer-section"

// Sample e-book data
const ebooks = [
  {
    id: 1,
    title: "The Complete Guide to Back Pain Relief",
    description: "Learn about the causes of back pain and effective strategies for prevention and management.",
    price: 299,
    pages: 45,
    image: "/library/back-pain-ebook.png",
    category: "Pain Management",
    slug: "back-pain-relief-guide",
  },
  {
    id: 2,
    title: "Posture Correction: A Comprehensive Approach",
    description: "Understand the importance of good posture and learn practical techniques for improvement.",
    price: 249,
    pages: 38,
    image: "/library/posture-ebook.png",
    category: "Posture & Alignment",
    slug: "posture-correction-guide",
  },
  {
    id: 3,
    title: "Exercise Therapy for Joint Health",
    description: "A collection of targeted exercises to maintain and improve joint mobility and function.",
    price: 349,
    pages: 52,
    image: "/library/joint-health-ebook.png",
    category: "Exercise Therapy",
    slug: "joint-health-exercises",
  },
  {
    id: 4,
    title: "Recovery Strategies for Athletes",
    description: "Optimize your recovery process with evidence-based techniques for better performance.",
    price: 399,
    pages: 60,
    image: "/library/athlete-recovery-ebook.png",
    category: "Sports Rehabilitation",
    slug: "athlete-recovery-strategies",
  },
  {
    id: 5,
    title: "Ergonomics for Work-From-Home Professionals",
    description: "Set up an ergonomic home office and develop habits to prevent pain and discomfort.",
    price: 249,
    pages: 35,
    image: "/library/ergonomics-ebook.png",
    category: "Ergonomics",
    slug: "wfh-ergonomics-guide",
  },
  {
    id: 6,
    title: "Stretching Routines for Daily Wellness",
    description: "Simple yet effective stretching routines to incorporate into your daily life for better flexibility.",
    price: 199,
    pages: 30,
    image: "/library/stretching-ebook.png",
    category: "Exercise Therapy",
    slug: "daily-stretching-routines",
  },
  {
    id: 7,
    title: "Managing Chronic Pain: A Holistic Approach",
    description: "Comprehensive strategies for managing chronic pain beyond medication.",
    price: 349,
    pages: 55,
    image: "/library/chronic-pain-ebook.png",
    category: "Pain Management",
    slug: "chronic-pain-management",
  },
  {
    id: 8,
    title: "Pregnancy and Postpartum Exercise Guide",
    description: "Safe and effective exercises for women during pregnancy and after childbirth.",
    price: 299,
    pages: 48,
    image: "/library/pregnancy-exercise-ebook.png",
    category: "Women's Health",
    slug: "pregnancy-postpartum-exercises",
  },
  {
    id: 9,
    title: "Strength Training for Seniors",
    description: "Age-appropriate strength training exercises to maintain muscle mass and independence.",
    price: 249,
    pages: 40,
    image: "/library/senior-strength-ebook.png",
    category: "Geriatric Care",
    slug: "senior-strength-training",
  },
]

// Get unique categories
const categories = Array.from(new Set(ebooks.map((ebook) => ebook.category)))

export default function LibraryClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedEbook, setSelectedEbook] = useState<(typeof ebooks)[0] | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  // Filter ebooks based on search query and selected category
  const filteredEbooks = ebooks.filter((ebook) => {
    const matchesSearch =
      ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ebook.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? ebook.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category)
  }

  const handleBuyClick = (ebook: (typeof ebooks)[0]) => {
    setSelectedEbook(ebook)
    setIsPaymentModalOpen(true)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsPaymentModalOpen(false)
    setIsThankYouModalOpen(true)
    // In a real implementation, you would process the payment here
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const closeThankYouModal = () => {
    setIsThankYouModalOpen(false)
    setSelectedEbook(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
    })
  }

  return (
    <>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/library/library-hero-bg.png"
            alt="E-Book Library"
            fill
            className="object-cover brightness-[0.7] filter"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/40 to-blue-900/40 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              E-Book Library
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Explore our collection of expert-written e-books on physiotherapy, wellness, and recovery. Download
              instantly and start your journey to better health today.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-rose-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-pink-100">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="w-full md:w-1/2">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                      Search E-Books
                    </label>
                    <div className="relative">
                      <Input
                        id="search"
                        type="text"
                        placeholder="Search by title or keyword..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border-pink-200 focus:border-pink-400 pr-10"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Search className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryClick(category)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedCategory === category
                              ? "bg-pink-500 text-white"
                              : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                          } transition-colors`}
                        >
                          {category}
                        </button>
                      ))}
                      {selectedCategory && (
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center"
                        >
                          Clear <X className="ml-1 h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEbooks.length > 0 ? (
              filteredEbooks.map((ebook, index) => (
                <motion.div
                  key={ebook.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-pink-100 hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={ebook.image || "/placeholder.svg"}
                        alt={ebook.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                        ₹{ebook.price}
                      </div>
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <div className="mb-2">
                        <span className="inline-block bg-pink-50 text-pink-600 text-xs px-2.5 py-1 rounded-full">
                          {ebook.category}
                        </span>
                        <span className="inline-block bg-gray-50 text-gray-600 text-xs px-2.5 py-1 rounded-full ml-2">
                          {ebook.pages} pages
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{ebook.title}</h3>
                      <p className="text-gray-600 mb-6 flex-grow">{ebook.description}</p>
                      <Button
                        onClick={() => handleBuyClick(ebook)}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No E-Books Found</h3>
                  <p className="text-gray-500">
                    We couldn't find any e-books matching your search criteria. Please try different keywords or clear
                    your filters.
                  </p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              {selectedEbook && (
                <div className="text-sm text-gray-500">
                  {selectedEbook.title} - ₹{selectedEbook.price}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePaymentSubmit} className="space-y-4 mt-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="pt-4 border-t border-gray-200">
              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                Pay ₹{selectedEbook?.price}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Thank You Modal */}
      <Dialog open={isThankYouModalOpen} onOpenChange={setIsThankYouModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thank You for Your Purchase!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-gray-700">
              Your e-book has been sent to your email and WhatsApp number. You can also download it directly using the
              button below.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Payment Successful</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Transaction ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                </div>
              </div>
            </div>
            <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white" onClick={closeThankYouModal}>
              <Download className="mr-2 h-4 w-4" />
              Download E-Book
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <FooterSection />
    </>
  )
}
