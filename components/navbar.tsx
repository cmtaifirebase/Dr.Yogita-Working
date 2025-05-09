"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Calendar, ChevronDown, ChevronRight } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleMobileServices = () => setMobileServicesOpen(!mobileServicesOpen)

  const servicesList = [
    { name: "Physiotherapy", href: "/services/physiotherapy", type: "offline" },
    { name: "Rehabilitation", href: "/services/rehabilitation", type: "offline" },
    { name: "Manual Therapy", href: "/services/manual-therapy", type: "offline" },
    { name: "Dry Needling", href: "/services/dry-needling", type: "offline" },
    { name: "Electrotherapy", href: "/services/electrotherapy", type: "offline" },
    { name: "Sports Physio", href: "/services/sports-physio", type: "offline" },
    { name: "Pediatric Physio", href: "/services/pediatric-physio", type: "online" },
    { name: "Geriatric Physio", href: "/services/geriatric-physio", type: "online" },
    { name: "Pre/Post Natal Physio", href: "/services/prenatal-postnatal-physio", type: "online" },
    { name: "Postural Correction", href: "/services/posture-correction", type: "online" },
  ]

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Podcast", href: "/podcast" },
    { name: "Programs", href: "/programs" },
    { name: "Shop", href: "/shop" },
    { name: "Library", href: "/library" },
    { name: "Nutrition", href: "/nutrition" },
    { name: "Gift", href: "/gift" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/Logo.png" alt="Dr. Yogita Physiotherapy" width={50} height={50} className="mr-3 rounded-lg" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">Dr. Yogita</h1>
            <p className="text-xs text-pink-600">Physiotherapy Clinic</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.slice(0, 2).map((link) => (
            <Link key={link.name} href={link.href} className={`px-3 py-2 ${isScrolled ? "text-gray-700 hover:text-pink-600" : "text-black hover:text-pink-200"} transition-colors rounded-md text-sm font-medium`}>
              {link.name}
            </Link>
          ))}

          {/* Services Dropdown */}
          <div className="relative" onMouseEnter={() => setServicesDropdownOpen(true)} onMouseLeave={() => setServicesDropdownOpen(false)}>
            <button
              className={`flex items-center px-3 py-2 text-sm font-medium transition ${isScrolled ? "text-gray-700 hover:text-pink-600" : "text-black hover:text-pink-200"}`}
            >
              Services
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>

            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50"
                >
                  <div className="py-1">
                    <Link href="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-medium">
                      All Services
                    </Link>
                    <div className="border-t my-1" />
                    {["online", "offline"].map((type) => (
                      <div key={type} className="group relative">
                        <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 cursor-pointer">
                          {type.charAt(0).toUpperCase() + type.slice(1)} Services
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <div className="absolute top-0 left-full w-56 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-200 z-50">
                          <div className="py-1">
                            {servicesList
                              .filter((s) => s.type === type)
                              .map((service) => (
                                <Link
                                  key={service.name}
                                  href={service.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                                >
                                  {service.name}
                                </Link>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(2).map((link) => (
            <Link key={link.name} href={link.href} className={`px-3 py-2 ${isScrolled ? "text-gray-700 hover:text-pink-600" : "text-black hover:text-pink-200"} transition-colors rounded-md text-sm font-medium`}>
              {link.name}
            </Link>
          ))}

          <Link href="/booking" className={`px-3 py-2 ${isScrolled ? "text-gray-700 hover:text-pink-600" : "text-black hover:text-pink-200"} transition-colors rounded-md text-sm font-medium`}>
            <Calendar className="mr-1 h-4 w-4" />
            Book Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700 hover:text-pink-600">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t mt-2">
            <div className="px-4 py-3 space-y-3">
              {navLinks.slice(0, 2).map((link) => (
                <Link key={link.name} href={link.href} className="block px-3 py-2 rounded-md text-gray-700 hover:text-pink-600 hover:bg-pink-50" onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>
              ))}

              <div>
                <button onClick={toggleMobileServices} className="w-full flex justify-between items-center px-3 py-2 rounded-md text-gray-700 hover:text-pink-600 hover:bg-pink-50">
                  <span>Services</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-90" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="pl-4 mt-1 space-y-2">
                      <Link href="/services" className="block px-3 py-2 rounded-md text-gray-700 hover:text-pink-600 hover:bg-pink-50" onClick={() => setIsOpen(false)}>
                        All Services
                      </Link>
                      {servicesList.map((service) => (
                        <Link key={service.name} href={service.href} className="block px-3 py-2 rounded-md text-gray-700 hover:text-pink-600 hover:bg-pink-50" onClick={() => setIsOpen(false)}>
                          {service.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(2).map((link) => (
                <Link key={link.name} href={link.href} className="block px-3 py-2 rounded-md text-gray-700 hover:text-pink-600 hover:bg-pink-50" onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>
              ))}

              <Link href="/booking" className="block bg-pink-500 hover:bg-pink-600 text-white text-center px-4 py-2 rounded-md text-sm font-medium" onClick={() => setIsOpen(false)}>
                <Calendar className="inline-block mr-1 h-4 w-4" />
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
