'use client'

import HeroSection from '@/components/home/HeroSection'
import FeaturedDestinations from '@/components/home/FeaturedDestinations'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import PopularPackages from '@/components/home/PopularPackages'
import Testimonials from '@/components/home/Testimonials'
import CallToAction from '@/components/home/CallToAction'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedDestinations />
      <WhyChooseUs />
      <PopularPackages />
      <Testimonials />
      <CallToAction />
    </>
  )
}
