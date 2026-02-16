'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Calendar, Users, MapPin } from 'lucide-react'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroRef.current && contentRef.current) {
      // Parallax effect on hero image
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 200,
        ease: 'none',
      })

      // Fade in hero content
      gsap.from(contentRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      })
    }
  }, [])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        ref={heroRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover Kenya's
            <span className="block text-primary-300">Wild Heart</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience authentic safari adventures with expert guides. From the Maasai Mara to Amboseli's elephants, your dream journey awaits.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
            >
              <MapPin className="w-8 h-8 text-primary-300 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">12+</p>
              <p className="text-sm text-white/80">Destinations</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
            >
              <Users className="w-8 h-8 text-primary-300 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">500+</p>
              <p className="text-sm text-white/80">Happy Travelers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
            >
              <Calendar className="w-8 h-8 text-primary-300 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">10+</p>
              <p className="text-sm text-white/80">Years Experience</p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/destinations"
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-2xl hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Explore Safaris</span>
            </Link>

            <Link
              href="/itinerary-builder"
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all border-2 border-white/30 hover:border-white/50"
            >
              Plan Your Trip
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-10 h-10 text-white" />
        </motion.button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  )
}

export default HeroSection
