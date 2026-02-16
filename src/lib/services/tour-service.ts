import { destinations, testimonials, tourPackages } from '@/lib/data'
import { BookingRecord, BookingRequest, Destination, TourPackage, TravelStyle } from '@/lib/types'

const bookings: BookingRecord[] = []

function findDestination(destinationId: string): Destination | undefined {
  return destinations.find((item) => item.id === destinationId)
}

function computeQuote(basePriceUsd: number, travelers: number): number {
  const volumeDiscount = travelers >= 4 ? 0.92 : 1
  return Math.round(basePriceUsd * travelers * volumeDiscount)
}

export const tourService = {
  getDestinations(search?: string): Destination[] {
    if (!search) return destinations

    const query = search.toLowerCase()
    return destinations.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.region.toLowerCase().includes(query) ||
        item.highlights.some((highlight) => highlight.toLowerCase().includes(query)),
    )
  },

  getPackages(filters?: {
    style?: TravelStyle
    featured?: boolean
    destinationId?: string
  }): Array<TourPackage & { destinationName: string }> {
    return tourPackages
      .filter((item) => (filters?.style ? item.style === filters.style : true))
      .filter((item) => (typeof filters?.featured === 'boolean' ? item.featured === filters.featured : true))
      .filter((item) => (filters?.destinationId ? item.destinationId === filters.destinationId : true))
      .map((item) => ({
        ...item,
        destinationName: findDestination(item.destinationId)?.name ?? 'Unknown',
      }))
  },

  getFeaturedPackages() {
    return this.getPackages({ featured: true })
  },

  getTestimonials() {
    return testimonials
  },

  createBooking(input: BookingRequest): BookingRecord {
    const selectedPackage = tourPackages.find((item) => item.id === input.packageId)
    if (!selectedPackage) {
      throw new Error('Selected package does not exist.')
    }

    const record: BookingRecord = {
      ...input,
      id: `bk_${Date.now().toString(36)}`,
      status: 'pending',
      quoteUsd: computeQuote(selectedPackage.basePriceUsd, input.travelers),
      createdAt: new Date().toISOString(),
    }

    bookings.push(record)
    return record
  },

  getBooking(id: string): BookingRecord | null {
    return bookings.find((item) => item.id === id) ?? null
  },

  getOperationalSnapshot() {
    return {
      destinations: destinations.length,
      packages: tourPackages.length,
      pendingBookings: bookings.filter((item) => item.status === 'pending').length,
      avgPackagePriceUsd: Math.round(
        tourPackages.reduce((total, item) => total + item.basePriceUsd, 0) / tourPackages.length,
      ),
    }
  },
}
