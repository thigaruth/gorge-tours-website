export type TravelStyle = 'luxury' | 'family' | 'photography' | 'adventure'

export type BudgetRange = 'economy' | 'comfort' | 'premium' | 'ultra_luxury'

export type LodgingLevel = 'standard' | 'boutique' | 'luxury_tented' | 'ultra_luxury_lodge'

export type AddOn =
  | 'hot_air_balloon'
  | 'night_game_drive'
  | 'cultural_visit'
  | 'photography_masterclass'
  | 'bush_breakfast'

export type ContactChannel = 'email' | 'phone' | 'whatsapp'

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
  destinationId: string
  travelStyle: TravelStyle
  startDate: string
  flexibleDates: boolean
  durationDays: number
  budgetRange: BudgetRange
  lodgingLevel: LodgingLevel
  addOns: AddOn[]
  specialRequests?: string
  preferredContact: ContactChannel
  agreeToTerms: boolean
  marketingOptIn: boolean
}

export type BookingRecord = BookingRequest & {
  id: string
  status: 'pending' | 'confirmed' | 'cancelled'
  quoteUsd: number
  createdAt: string
}

export type ContactRequest = {
  fullName: string
  email: string
  phone?: string
  subject: string
  message: string
  travelers?: number
  travelMonth?: string
  budgetRange?: BudgetRange
  preferredContact: ContactChannel
  newsletterOptIn: boolean
}

export type ContactRecord = ContactRequest & {
  id: string
  createdAt: string
}
