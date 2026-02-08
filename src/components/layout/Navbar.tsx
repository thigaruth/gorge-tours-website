'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const destinations = [
    { name: 'Maasai Mara', href: '/destinations/maasai-mara' },
    { name: 'Amboseli', href: '/destinations/amboseli' },
    { name: 'Samburu', href: '/destinations/samburu' },
    { name: 'Lake Nakuru', href: '/destinations/lake-nakuru' },
    { name: 'Tsavo', href: '/destinations/tsavo' },
  ]

  const safaris = [
    { name: 'Luxury Safaris', href: '/safaris/luxury' },
    { name: 'Group Safaris', href: '/safaris/group' },
    { name: 'Family Safaris', href: '/safaris/family' },
    { name: 'Photography Safaris', href: '/safaris/photography' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-32 h-16 md:w-40 md:h-20">
              <Image
                src="/logo.png"
                alt="The Gorge Tours and Travel"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-300'
              }`}
            >
              Home
            </Link>

            {/* Destinations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('destinations')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center space-x-1 font-medium transition-colors ${
                  isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-300'
                }`}
              >
                <span>Destinations</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'destinations' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-lg overflow-hidden"
                  >
                    {destinations.map((dest) => (
                      <Link
                        key={dest.href}
                        href={dest.href}
                        className="block px-6 py-3 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {dest.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Safaris Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('safaris')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center space-x-1 font-medium transition-colors ${
                  isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-300'
                }`}
              >
                <span>Safari Types</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'safaris' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-lg overflow-hidden"
                  >
                    {safaris.map((safari) => (
                      <Link
                        key={safari.href}
                        href={safari.href}
                        className="block px-6 py-3 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {safari.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/itinerary-builder"
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-300'
              }`}
            >
              Plan Your Safari
            </Link>

            <Link
              href="/blog"
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-300'
              }`}
            >
              Blog
            </Link>

            <Link
              href="/about"
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-300'
              }`}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-300'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+254700000000"
              className={`flex items-center space-x-2 transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-300'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+254 700 000 000</span>
            </a>

            <Link
              href="/booking"
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full font-medium transition-all hover:shadow-lg"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <div className="px-4 py-2 space-y-2">
                <Link
                  href="/"
                  className="block py-3 text-gray-700 hover:text-primary-600 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>

                <div className="border-t pt-2">
                  <div className="text-sm font-semibold text-gray-500 mb-2">Destinations</div>
                  {destinations.map((dest) => (
                    <Link
                      key={dest.href}
                      href={dest.href}
                      className="block py-2 pl-4 text-gray-700 hover:text-primary-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {dest.name}
                    </Link>
                  ))}
                </div>

                <div className="border-t pt-2">
                  <div className="text-sm font-semibold text-gray-500 mb-2">Safari Types</div>
                  {safaris.map((safari) => (
                    <Link
                      key={safari.href}
                      href={safari.href}
                      className="block py-2 pl-4 text-gray-700 hover:text-primary-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {safari.name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/itinerary-builder"
                  className="block py-3 text-gray-700 hover:text-primary-600 font-medium border-t"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Plan Your Safari
                </Link>

                <Link
                  href="/blog"
                  className="block py-3 text-gray-700 hover:text-primary-600 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>

                <Link
                  href="/about"
                  className="block py-3 text-gray-700 hover:text-primary-600 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>

                <Link
                  href="/contact"
                  className="block py-3 text-gray-700 hover:text-primary-600 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>

                <div className="border-t pt-4 pb-2">
                  <Link
                    href="/booking"
                    className="block text-center bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-medium transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Book Your Safari
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
