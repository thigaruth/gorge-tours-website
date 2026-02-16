import { destinations, testimonials, tourPackages } from '@/lib/data'
import {
  BookingRecord,
  BookingRequest,
  ContactRecord,
  ContactRequest,
  Destination,
  TourPackage,
  TravelStyle,
} from '@/lib/types'

const bookings: BookingRecord[] = []
const contacts: ContactRecord[] = []

function findDestination(destinationId: string): Destination | undefined {
  return destinations.find((item) => item.id === destinationId)
}

function booleanFromInput(value: boolean | string): boolean {
  if (typeof value === 'boolean') return value
  return value === 'true' || value === 'on'
}

function computeQuote(input: BookingRequest, basePriceUsd: number): number {
  const budgetMultiplier = {
    economy: 0.92,
    comfort: 1,
    premium: 1.18,
    ultra_luxury: 1.48,
  }[input.budgetRange]

  const lodgingMultiplier = {
    standard: 0.95,
    boutique: 1,
    luxury_tented: 1.2,
    ultra_luxury_lodge: 1.45,
  }[input.lodgingLevel]

  const addOnCost = input.addOns.length * 160
  const durationAdjustment = input.durationDays > 5 ? 1 + (input.durationDays - 5) * 0.09 : 1
  const groupDiscount = input.travelers >= 4 ? 0.94 : 1

  return Math.round(
    basePriceUsd * input.travelers * budgetMultiplier * lodgingMultiplier * durationAdjustment * groupDiscount +
      addOnCost,
  )
}

export const tourService = {
  normalizeBookingBody(input: {
    fullName: string
    email: string
    phone: string
    travelers: number | string
    packageId: string
    destinationId: string
    travelStyle: string
    startDate: string
    flexibleDates: boolean | string
    durationDays: number | string
    budgetRange: string
    lodgingLevel: string
    addOns?: string[]
    specialRequests?: string
    preferredContact: string
    agreeToTerms: boolean | string
    marketingOptIn: boolean | string
  }) {
    return {
      ...input,
      travelers: Number(input.travelers),
      durationDays: Number(input.durationDays),
      flexibleDates: booleanFromInput(input.flexibleDates),
      addOns: input.addOns ?? [],
      agreeToTerms: booleanFromInput(input.agreeToTerms),
      marketingOptIn: booleanFromInput(input.marketingOptIn),
    }
  },

  normalizeContactBody(input: {
    fullName: string
    email: string
    phone?: string
    subject: string
    message: string
    travelers?: number | string
    travelMonth?: string
    budgetRange?: string
    preferredContact: string
    newsletterOptIn: boolean | string
  }) {
    return {
      ...input,
      travelers: input.travelers !== undefined ? Number(input.travelers) : undefined,
      newsletterOptIn: booleanFromInput(input.newsletterOptIn),
    }
  },

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

    if (selectedPackage.destinationId !== input.destinationId) {
      throw new Error('Selected destination does not match selected package.')
    }

    const record: BookingRecord = {
      ...input,
      id: `bk_${Date.now().toString(36)}`,
      status: 'pending',
      quoteUsd: computeQuote(input, selectedPackage.basePriceUsd),
      createdAt: new Date().toISOString(),
    }

    bookings.push(record)
    return record
  },

  getBooking(id: string): BookingRecord | null {
    return bookings.find((item) => item.id === id) ?? null
  },

  createContactRequest(input: ContactRequest): ContactRecord {
    const record: ContactRecord = {
      ...input,
      id: `ct_${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
    }

    contacts.push(record)
    return record
  },

  getContactRequest(id: string): ContactRecord | null {
    return contacts.find((item) => item.id === id) ?? null
  },

  getOperationalSnapshot() {
    return {
      destinations: destinations.length,
      packages: tourPackages.length,
      pendingBookings: bookings.filter((item) => item.status === 'pending').length,
      contactRequests: contacts.length,
      avgPackagePriceUsd: Math.round(
        tourPackages.reduce((total, item) => total + item.basePriceUsd, 0) / tourPackages.length,
      ),
    }
  },
}
