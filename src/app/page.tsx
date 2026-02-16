import BookingPanel from '@/components/home/BookingPanel'
import DestinationGrid from '@/components/home/DestinationGrid'
import Hero from '@/components/home/Hero'
import MetricsStrip from '@/components/home/MetricsStrip'
import PackageShowcase from '@/components/home/PackageShowcase'
import Testimonials from '@/components/home/Testimonials'
import { tourService } from '@/lib/services/tour-service'

export default function HomePage() {
  const destinations = tourService.getDestinations()
  const featuredPackages = tourService.getFeaturedPackages()
  const testimonials = tourService.getTestimonials()
  const ops = tourService.getOperationalSnapshot()

  return (
    <>
      <Hero />
      <MetricsStrip destinations={ops.destinations} packages={ops.packages} avgPrice={ops.avgPackagePriceUsd} />
      <DestinationGrid destinations={destinations} />
      <PackageShowcase packages={featuredPackages} />
      <Testimonials testimonials={testimonials} />
      <BookingPanel
        packageOptions={featuredPackages.map((item) => ({
          id: item.id,
          title: item.title,
          destinationName: item.destinationName,
        }))}
      />
    </>
  )
}
