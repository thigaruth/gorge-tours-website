export type TravelStyle = 'luxury' | 'family' | 'photography' | 'adventure'

export type Destination = {
  id: string
  name: string
  region: string
  highlights: string[]
  bestMonths: string[]
  heroImage: string
  summary: string
  wildlifeIndex: number
}

export type TourPackage = {
  id: string
  title: string
  destinationId: string
  style: TravelStyle
  durationDays: number
  basePriceUsd: number
  maxGuests: number
  includes: string[]
  featured: boolean
}

export type Testimonial = {
  id: string
  traveler: string
  country: string
  rating: number
  quote: string
}

export type BookingRequest = {
  fullName: string
  email: string
  phone: string
  travelers: number
  packageId: string
  startDate: string
  notes?: string
}

export type BookingRecord = BookingRequest & {
  id: string
  status: 'pending' | 'confirmed' | 'cancelled'
  quoteUsd: number
  createdAt: string
}
