import type { Metadata } from 'next'
import BookingPanel from '@/components/home/BookingPanel'
import { Badge } from '@/components/ui/badge'
import { tourService } from '@/lib/services/tour-service'

export const metadata: Metadata = {
  title: 'Book Your Safari | Gorge Safari Co.',
  description: 'Build a custom Kenya safari itinerary and submit a booking request with detailed preferences.',
}

export default function BookingPage() {
  const destinations = tourService.getDestinations()
  const featuredPackages = tourService.getFeaturedPackages()

  return (
    <>
      <section className="border-b border-border/60 bg-[linear-gradient(180deg,rgba(245,238,220,0.95),rgba(232,220,186,0.74))] py-14">
        <div className="container">
          <Badge variant="secondary" className="rounded-full">
            Booking Studio
          </Badge>
          <h1 className="mt-4 text-5xl font-semibold">Design your safari and request a precise quote.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Configure route, budget, lodging style, add-ons, and communication preferences. Our planners respond with a detailed
            itinerary and availability path.
          </p>
        </div>
      </section>

      <BookingPanel
        destinationOptions={destinations.map((item) => ({ id: item.id, name: item.name }))}
        packageOptions={featuredPackages.map((item) => ({
          id: item.id,
          title: item.title,
          destinationName: item.destinationName,
          destinationId: item.destinationId,
          style: item.style,
          durationDays: item.durationDays,
          basePriceUsd: item.basePriceUsd,
        }))}
      />
    </>
  )
}
