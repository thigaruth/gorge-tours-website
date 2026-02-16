'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const contactSchema = z.object({
  fullName: z.string().min(2, 'Enter your name.'),
  email: z.string().email('Enter a valid email.'),
  phone: z.string().optional(),
  subject: z.string().min(4, 'Please add a subject.'),
  message: z.string().min(20, 'Please provide enough context (20+ chars).'),
  travelers: z.preprocess(
    (value) => (value === '' || value === undefined ? undefined : value),
    z.coerce.number().int().min(1).max(20).optional(),
  ),
  travelMonth: z.string().optional(),
  budgetRange: z.enum(['economy', 'comfort', 'premium', 'ultra_luxury']).optional(),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
  newsletterOptIn: z.boolean(),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPanel() {
  const [submitState, setSubmitState] = useState<{ loading: boolean; success: string | null; error: string | null }>({
    loading: false,
    success: null,
    error: null,
  })

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      travelers: undefined,
      travelMonth: '',
      budgetRange: 'comfort',
      preferredContact: 'email',
      newsletterOptIn: true,
    },
  })

  async function onSubmit(values: ContactFormValues) {
    setSubmitState({ loading: true, success: null, error: null })

    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })

    const json = await response.json().catch(() => ({}))

    if (!response.ok) {
      setSubmitState({ loading: false, success: null, error: json?.error ?? 'Unable to send your message.' })
      return
    }

    setSubmitState({
      loading: false,
      success: `Message sent. Reference: ${json?.data?.id ?? 'pending'}. A planner will respond shortly.`,
      error: null,
    })
    form.reset()
  }

  return (
    <section id="contact" className="py-16">
      <div className="container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="border-border/70 bg-card/80">
          <CardHeader>
            <Badge variant="secondary" className="w-fit rounded-full">
              Contact Planner
            </Badge>
            <CardTitle>Need help shaping the ideal route?</CardTitle>
            <CardDescription>
              Share timeline, traveler profile, and preferences. We can tailor migration windows, family pacing, or photography goals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              For urgent requests, call <span className="font-semibold text-foreground">+254 700 123 456</span>.
            </p>
            <p>
              We reply within <span className="font-semibold text-foreground">2 business hours</span> during East Africa time.
            </p>
            <p>Multi-country add-ons (Kenya + Tanzania) can be scoped in this form.</p>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/90">
          <CardContent className="p-6">
            <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="contactName">Full name</Label>
                <Input id="contactName" {...form.register('fullName')} />
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.fullName?.message}</p>
              </div>

              <div>
                <Label htmlFor="contactEmail">Email</Label>
                <Input id="contactEmail" type="email" {...form.register('email')} />
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.email?.message}</p>
              </div>

              <div>
                <Label htmlFor="contactPhone">Phone (optional)</Label>
                <Input id="contactPhone" {...form.register('phone')} />
              </div>

              <div>
                <Label htmlFor="preferredContact">Preferred channel</Label>
                <Select id="preferredContact" {...form.register('preferredContact')}>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="whatsapp">WhatsApp</option>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Example: Family safari in August" {...form.register('subject')} />
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.subject?.message}</p>
              </div>

              <div>
                <Label htmlFor="travelMonth">Preferred month</Label>
                <Input id="travelMonth" placeholder="August 2026" {...form.register('travelMonth')} />
              </div>

              <div>
                <Label htmlFor="travelers">Travelers</Label>
                <Input id="travelers" type="number" min={1} max={20} {...form.register('travelers')} />
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.travelers?.message}</p>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="budgetRange">Budget range (optional)</Label>
                <Select id="budgetRange" {...form.register('budgetRange')}>
                  <option value="economy">Economy</option>
                  <option value="comfort">Comfort</option>
                  <option value="premium">Premium</option>
                  <option value="ultra_luxury">Ultra Luxury</option>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} placeholder="Tell us your interests, accommodation style, and any must-have sightings." {...form.register('message')} />
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.message?.message}</p>
              </div>

              <label className="flex items-center gap-2 text-sm md:col-span-2">
                <input type="checkbox" {...form.register('newsletterOptIn')} className="h-4 w-4 rounded border-input" />
                Send me insider safari newsletters and route insights.
              </label>

              <Button type="submit" size="lg" className="md:col-span-2" disabled={submitState.loading}>
                {submitState.loading ? 'Sending...' : 'Send Message'}
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
