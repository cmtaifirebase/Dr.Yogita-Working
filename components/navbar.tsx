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
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleServicesDropdown = () => {
    setServicesDropdownOpen(!servicesDropdownOpen)
  }

  const toggleMobileServices = () => {
    setMobileServicesOpen(!mobileServicesOpen)
  }

  const servicesList = [
    { name: "Physiotherapy", href: "/services/physiotherapy" },
    { name: "Rehabilitation", href: "/services/rehabilitation" },
    { name: "Manual Therapy", href: "/services/manual-therapy" },
    { name: "Dry Needling", href: "/services/dry-needling" },
    { name: "Electrotherapy", href: "/services/electrotherapy" },
    { name: "Pediatric Physio", href: "/services/pediatric-physio" },
    { name: "Geriatric Physio", href: "/services/geriatric-physio" },
    { name: "Sports Physio", href: "/services/sports-physio" },
    { name: "Pre/Post Natal Physio", href: "/services/prenatal-postnatal-physio" },
    { name: "Postural Correction", href: "/services/posture-correction" },
  ]

  // Restored About in navLinks
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Podcast", href: "/podcast" },
    { name: "Programs", href: "/programs" },
    { name: "Shop", href: "/shop" },
    { name: "Library", href: "/library" },
    { name: "Nutrition", href: "/nutrition" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo.png"
              alt="Dr. Yogita Physiotherapy"
              width={50}
              height={10}
              className="mr-3"
              style={{borderRadius:"8px"}}
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Dr. Yogita</h1>
              <p className="text-xs text-pink-600">Physiotherapy Clinic</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-3 py-2 text-gray-700 hover:text-pink-600 transition-colors rounded-md text-sm font-medium"
            >
              Home
            </Link>
            {/* Restored About link */}
            <Link
              href="/about"
              className="px-3 py-2 text-gray-700 hover:text-pink-600 transition-colors rounded-md text-sm font-medium"
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                className="px-3 py-2 text-gray-700 hover:text-pink-600 transition-colors rounded-md text-sm font-medium flex items-center"
                onClick={toggleServicesDropdown}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {/* Services Dropdown Menu */}
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg z-50"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <div className="py-1 max-h-[70vh] overflow-y-auto">
                      <Link
                        href="/services"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-medium"
                      >
                        All Services
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      {servicesList.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-gray-700 hover:text-pink-600 transition-colors rounded-md text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/booking"
              className="ml-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <Calendar className="mr-1 h-4 w-4" />
              Book Now
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-pink-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t mt-2"
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="px-3 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                {/* Restored About link in mobile menu */}
                <Link
                  href="/about"
                  className="px-3 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>

                {/* Mobile Services Dropdown */}
                <div>
                  <button
                    className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors rounded-md"
                    onClick={toggleMobileServices}
                  >
                    <span>Services</span>
                    <ChevronRight className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-90" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 mt-1 space-y-2"
                      >
                        <Link
                          href="/services"
                          className="block px-3 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors rounded-md font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          All Services
                        </Link>
                        {servicesList.map((service) => (
                          <Link
                            key={service.name}
                            href={service.href}
                            className="block px-3 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors rounded-md"
                            onClick={() => setIsOpen(false)}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {navLinks.slice(2).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-3 py-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                <Link
                  href="/booking"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Calendar className="mr-1 h-4 w-4" />
                  Book Now
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
