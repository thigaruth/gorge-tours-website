import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Reveal from '@/components/ui/reveal'
import { Testimonial } from '@/lib/types'

type Props = {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: Props) {
  return (
    <section className="py-16">
      <div className="container">
        <Reveal>
          <Badge variant="secondary" className="rounded-full">
            Guest Stories
          </Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 text-4xl font-semibold">What travelers remember most.</h2>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.id} delay={0.05 * index}>
              <Card className="border-border/70 bg-card/80">
                <CardContent className="p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">"{item.quote}"</p>
                  <p className="mt-4 text-sm font-semibold">{item.traveler}</p>
                  <p className="text-xs uppercase tracking-[0.13em] text-muted-foreground">{item.country}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
