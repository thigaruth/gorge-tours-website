import { z } from 'zod'

export const travelStyles = ['luxury', 'family', 'photography', 'adventure'] as const

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
  startDate: z.string().regex(isoDatePattern, 'Expected ISO date format: YYYY-MM-DD'),
  notes: z.string().max(500).optional(),
})

export const bookingBodySchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  travelers: z.union([z.number(), z.string()]),
  packageId: z.string(),
  startDate: z.string(),
  notes: z.string().optional(),
})
