import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TourPackage } from '@/lib/types'

type PackageWithDestination = TourPackage & { destinationName: string }

type Props = {
  packages: PackageWithDestination[]
}

export default function PackageShowcase({ packages }: Props) {
  return (
    <section id="experiences" className="border-y border-border/60 bg-[linear-gradient(180deg,rgba(20,34,28,0.98),rgba(16,28,23,0.98))] py-16 text-stone-100">
      <div className="container">
        <Badge variant="outline" className="border-stone-300/40 bg-stone-200/10 text-stone-100">
          Signature Experiences
        </Badge>
        <h2 className="mt-4 text-4xl font-semibold">Safari packages engineered for different traveler profiles.</h2>
        <p className="mt-3 max-w-2xl text-stone-300">
          Mix comfort level, adventure appetite, and photography goals with transparent inclusions and durations.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {packages.map((item) => (
            <Card key={item.id} className="border-stone-200/15 bg-stone-100/5 text-stone-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="rounded-full bg-primary/80 text-primary-foreground">{item.style}</Badge>
                  <span className="text-xs uppercase tracking-[0.16em] text-stone-300">{item.durationDays} days</span>
                </div>
                <CardTitle className="pt-2 text-2xl">{item.title}</CardTitle>
                <p className="text-sm text-stone-300">{item.destinationName}</p>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-amber-200">${item.basePriceUsd}</p>
                <p className="text-xs text-stone-300">Base per traveler</p>
                <ul className="mt-4 space-y-1 text-sm text-stone-200">
                  {item.includes.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
