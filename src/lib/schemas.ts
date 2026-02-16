import { z } from 'zod'

export const travelStyles = ['luxury', 'family', 'photography', 'adventure'] as const
export const budgetRanges = ['economy', 'comfort', 'premium', 'ultra_luxury'] as const
export const lodgingLevels = ['standard', 'boutique', 'luxury_tented', 'ultra_luxury_lodge'] as const
export const addOns = [
  'hot_air_balloon',
  'night_game_drive',
  'cultural_visit',
  'photography_masterclass',
  'bush_breakfast',
] as const
export const contactChannels = ['email', 'phone', 'whatsapp'] as const

export const packageQuerySchema = z.object({
  style: z.enum(travelStyles).optional(),
  featured: z
    .string()
    .transform((value) => value === 'true')
    .optional(),
  destinationId: z.string().min(1).optional(),
})

export const destinationQuerySchema = z.object({
  q: z.string().min(1).max(60).optional(),
})

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/

export const bookingRequestSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  travelers: z.number().int().min(1).max(12),
  packageId: z.string().min(1),
  destinationId: z.string().min(1),
  travelStyle: z.enum(travelStyles),
  startDate: z.string().regex(isoDatePattern, 'Expected ISO date format: YYYY-MM-DD'),
  flexibleDates: z.boolean(),
  durationDays: z.number().int().min(2).max(21),
  budgetRange: z.enum(budgetRanges),
  lodgingLevel: z.enum(lodgingLevels),
  addOns: z.array(z.enum(addOns)).max(5),
  specialRequests: z.string().max(700).optional(),
  preferredContact: z.enum(contactChannels),
  agreeToTerms: z.literal(true),
  marketingOptIn: z.boolean(),
})

export const bookingBodySchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  travelers: z.union([z.number(), z.string()]),
  packageId: z.string(),
  destinationId: z.string(),
  travelStyle: z.string(),
  startDate: z.string(),
  flexibleDates: z.union([z.boolean(), z.string()]),
  durationDays: z.union([z.number(), z.string()]),
  budgetRange: z.string(),
  lodgingLevel: z.string(),
  addOns: z.array(z.string()).optional(),
  specialRequests: z.string().optional(),
  preferredContact: z.string(),
  agreeToTerms: z.union([z.boolean(), z.string()]),
  marketingOptIn: z.union([z.boolean(), z.string()]),
})

export const contactRequestSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(30).optional(),
  subject: z.string().min(4).max(100),
  message: z.string().min(20).max(1200),
  travelers: z.number().int().min(1).max(20).optional(),
  travelMonth: z.string().max(30).optional(),
  budgetRange: z.enum(budgetRanges).optional(),
  preferredContact: z.enum(contactChannels),
  newsletterOptIn: z.boolean(),
})

export const contactBodySchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  subject: z.string(),
  message: z.string(),
  travelers: z.union([z.number(), z.string()]).optional(),
  travelMonth: z.string().optional(),
  budgetRange: z.string().optional(),
  preferredContact: z.string(),
  newsletterOptIn: z.union([z.boolean(), z.string()]),
})
