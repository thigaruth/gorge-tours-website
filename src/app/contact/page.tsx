import type { Metadata } from 'next'
import ContactPanel from '@/components/home/ContactPanel'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Contact Safari Planner | Gorge Safari Co.',
  description: 'Contact our safari planners to shape a Kenya itinerary for your dates, style, and budget.',
}

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-[linear-gradient(180deg,rgba(240,235,218,0.95),rgba(229,221,194,0.72))] py-14">
        <div className="container">
          <Badge variant="secondary" className="rounded-full">
            Planner Contact
          </Badge>
          <h1 className="mt-4 text-5xl font-semibold">Talk directly with a safari itinerary specialist.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Share your travel goals, timing, and comfort profile. We will map a practical route and advise on best wildlife windows.
          </p>
        </div>
      </section>

      <ContactPanel />
    </>
  )
}
