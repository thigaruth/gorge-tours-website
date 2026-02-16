'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Enter a valid email address.'),
  phone: z.string().min(6, 'Phone number is required.'),
  travelers: z.coerce.number().min(1).max(12),
  packageId: z.string().min(1, 'Please select a package.'),
  destinationId: z.string().min(1, 'Please select a destination.'),
  travelStyle: z.enum(['luxury', 'family', 'photography', 'adventure']),
  startDate: z.string().min(1, 'Select a start date.'),
  flexibleDates: z.boolean(),
  durationDays: z.coerce.number().min(2).max(21),
  budgetRange: z.enum(['economy', 'comfort', 'premium', 'ultra_luxury']),
  lodgingLevel: z.enum(['standard', 'boutique', 'luxury_tented', 'ultra_luxury_lodge']),
  addOns: z.array(z.string()).default([]),
  specialRequests: z.string().max(700).optional(),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
  agreeToTerms: z.boolean().refine((value) => value === true, 'You need to accept terms to continue.'),
  marketingOptIn: z.boolean(),
})

type BookingFormValues = z.infer<typeof bookingSchema>

type PackageOption = {
  id: string
  title: string
  destinationName: string
  destinationId: string
  style: 'luxury' | 'family' | 'photography' | 'adventure'
  durationDays: number
  basePriceUsd: number
}

type DestinationOption = {
  id: string
  name: string
}

type Props = {
  packageOptions: PackageOption[]
  destinationOptions: DestinationOption[]
}

const addOnChoices = [
  { id: 'hot_air_balloon', label: 'Hot-air balloon sunrise' },
  { id: 'night_game_drive', label: 'Night game drive' },
  { id: 'cultural_visit', label: 'Maasai cultural visit' },
  { id: 'photography_masterclass', label: 'Photography masterclass' },
  { id: 'bush_breakfast', label: 'Private bush breakfast' },
]

function formatStyle(value: string) {
  return value.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function BookingPanel({ packageOptions, destinationOptions }: Props) {
  const [submitState, setSubmitState] = useState<{ loading: boolean; success: string | null; error: string | null }>({
    loading: false,
    success: null,
    error: null,
  })

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      travelers: 2,
      packageId: '',
      destinationId: '',
      travelStyle: 'luxury',
      startDate: '',
      flexibleDates: false,
      durationDays: 5,
      budgetRange: 'comfort',
      lodgingLevel: 'boutique',
      addOns: [],
      specialRequests: '',
      preferredContact: 'email',
      agreeToTerms: false,
      marketingOptIn: false,
    },
  })

  const packageId = form.watch('packageId')
  const travelers = form.watch('travelers') || 1
  const budgetRange = form.watch('budgetRange')

  const selectedPackage = useMemo(
    () => packageOptions.find((item) => item.id === packageId),
    [packageId, packageOptions],
  )

  useEffect(() => {
    if (!selectedPackage) return

    form.setValue('destinationId', selectedPackage.destinationId)
    form.setValue('travelStyle', selectedPackage.style)
    form.setValue('durationDays', selectedPackage.durationDays)
  }, [form, selectedPackage])

  const estimate = useMemo(() => {
    if (!selectedPackage) return null

    const budgetMultiplier = {
      economy: 0.92,
      comfort: 1,
      premium: 1.18,
      ultra_luxury: 1.48,
    }[budgetRange]

    const projected = Math.round(selectedPackage.basePriceUsd * travelers * budgetMultiplier)
    return {
      min: Math.round(projected * 0.9),
      max: Math.round(projected * 1.18),
    }
  }, [travelers, budgetRange, selectedPackage])

  async function onSubmit(values: BookingFormValues) {
    setSubmitState({ loading: true, success: null, error: null })

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })

    const json = await response.json().catch(() => ({}))

    if (!response.ok) {
      setSubmitState({ loading: false, success: null, error: json?.error ?? 'Unable to submit booking request.' })
      return
    }

    setSubmitState({
      loading: false,
      success: `Your safari request is in. Booking ID: ${json?.data?.id ?? 'pending'}. Quote: $${json?.data?.quoteUsd ?? 'TBD'}`,
      error: null,
    })
    form.reset()
  }

  return (
    <section id="book" className="border-y border-border/60 bg-[linear-gradient(180deg,rgba(245,238,220,0.9),rgba(234,220,180,0.75))] py-16">
      <div className="container grid gap-8 lg:grid-cols-[1fr_1.15fr]">
        <Card className="h-fit border-border/70 bg-card/85 backdrop-blur">
          <CardHeader>
            <Badge variant="secondary" className="w-fit rounded-full">
              Booking Engine
            </Badge>
            <CardTitle>Craft your safari itinerary.</CardTitle>
            <CardDescription>
              Choose destination, trip profile, comfort level, and enhancement add-ons. We return a precise quote and availability path.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {estimate ? (
              <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm text-foreground">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Estimated Range</p>
                <p className="mt-2 text-3xl font-semibold text-primary">
                  ${estimate.min.toLocaleString()} - ${estimate.max.toLocaleString()}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">Final quote depends on lodge availability and selected add-ons.</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Select a package to preview your projected budget range.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/90">
          <CardContent className="p-6">
            <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" {...form.register('fullName')} />
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.fullName?.message}</p>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register('email')} />
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.email?.message}</p>
              </div>

              <div>
                <Label htmlFor="phone">Phone / WhatsApp</Label>
                <Input id="phone" {...form.register('phone')} />
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.phone?.message}</p>
              </div>

              <div>
                <Label htmlFor="travelers">Travelers</Label>
                <Input id="travelers" type="number" min={1} max={12} {...form.register('travelers')} />
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.travelers?.message}</p>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="packageId">Package</Label>
                <Select id="packageId" {...form.register('packageId')}>
                  <option value="">Select package</option>
                  {packageOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title} - {item.destinationName}
                    </option>
                  ))}
                </Select>
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.packageId?.message}</p>
              </div>

              <div>
                <Label htmlFor="destinationId">Destination</Label>
                <Select id="destinationId" {...form.register('destinationId')}>
                  <option value="">Select destination</option>
                  {destinationOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.destinationId?.message}</p>
              </div>

              <div>
                <Label htmlFor="travelStyle">Travel style</Label>
                <Select id="travelStyle" {...form.register('travelStyle')}>
                  {['luxury', 'family', 'photography', 'adventure'].map((style) => (
                    <option key={style} value={style}>
                      {formatStyle(style)}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="startDate">Preferred start date</Label>
                <Input id="startDate" type="date" {...form.register('startDate')} />
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.startDate?.message}</p>
              </div>

              <div>
                <Label htmlFor="durationDays">Trip duration (days)</Label>
                <Input id="durationDays" type="number" min={2} max={21} {...form.register('durationDays')} />
              </div>

              <div>
                <Label htmlFor="budgetRange">Budget range</Label>
                <Select id="budgetRange" {...form.register('budgetRange')}>
                  <option value="economy">Economy</option>
                  <option value="comfort">Comfort</option>
                  <option value="premium">Premium</option>
                  <option value="ultra_luxury">Ultra Luxury</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="lodgingLevel">Lodging level</Label>
                <Select id="lodgingLevel" {...form.register('lodgingLevel')}>
                  <option value="standard">Standard</option>
                  <option value="boutique">Boutique</option>
                  <option value="luxury_tented">Luxury Tented</option>
                  <option value="ultra_luxury_lodge">Ultra Luxury Lodge</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="preferredContact">Preferred contact</Label>
                <Select id="preferredContact" {...form.register('preferredContact')}>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="whatsapp">WhatsApp</option>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label>Add-ons</Label>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {addOnChoices.map((choice) => {
                    const checked = form.watch('addOns').includes(choice.id)
                    return (
                      <label key={choice.id} className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(event) => {
                            const values = form.getValues('addOns')
                            if (event.target.checked) {
                              form.setValue('addOns', [...values, choice.id], { shouldValidate: true })
                            } else {
                              form.setValue(
                                'addOns',
                                values.filter((value) => value !== choice.id),
                                { shouldValidate: true },
                              )
                            }
                          }}
                          className="h-4 w-4 rounded border-input"
                        />
                        {choice.label}
                      </label>
                    )
                  })}
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="specialRequests">Special requests</Label>
                <Textarea id="specialRequests" rows={4} placeholder="Dietary preferences, anniversary planning, flight windows, or accessibility notes." {...form.register('specialRequests')} />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...form.register('flexibleDates')} className="h-4 w-4 rounded border-input" />
                  My travel dates are flexible by ±5 days.
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...form.register('marketingOptIn')} className="h-4 w-4 rounded border-input" />
                  Send me seasonal safari deals and migration alerts.
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...form.register('agreeToTerms')} className="h-4 w-4 rounded border-input" />
                  I agree to booking terms and data processing policy.
                </label>
                <p className="text-xs text-destructive">{form.formState.errors.agreeToTerms?.message}</p>
              </div>

              <Button type="submit" size="lg" className="md:col-span-2" disabled={submitState.loading}>
                {submitState.loading ? 'Submitting Request...' : 'Submit Booking Request'}
              </Button>

              {submitState.success && <p className="text-sm text-emerald-700 md:col-span-2">{submitState.success}</p>}
              {submitState.error && <p className="text-sm text-destructive md:col-span-2">{submitState.error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
