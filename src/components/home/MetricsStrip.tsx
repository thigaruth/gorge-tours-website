import { Card, CardContent } from '@/components/ui/card'
import Reveal from '@/components/ui/reveal'

type Props = {
  destinations: number
  packages: number
  avgPrice: number
  contactRequests: number
}

export default function MetricsStrip({ destinations, packages, avgPrice, contactRequests }: Props) {
  return (
    <section className="container -mt-4 pb-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal delay={0.03}>
          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="p-5">
              <p className="text-3xl font-semibold">{destinations}</p>
              <p className="mt-1 text-sm text-muted-foreground">Safari destinations</p>
            </CardContent>
          </Card>
        </Reveal>
        <Reveal delay={0.06}>
          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="p-5">
              <p className="text-3xl font-semibold">{packages}</p>
              <p className="mt-1 text-sm text-muted-foreground">Curated packages</p>
            </CardContent>
          </Card>
        </Reveal>
        <Reveal delay={0.09}>
          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="p-5">
              <p className="text-3xl font-semibold">${avgPrice}</p>
              <p className="mt-1 text-sm text-muted-foreground">Average base rate</p>
            </CardContent>
          </Card>
        </Reveal>
        <Reveal delay={0.12}>
          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="p-5">
              <p className="text-3xl font-semibold">{contactRequests}</p>
              <p className="mt-1 text-sm text-muted-foreground">Live consultation requests</p>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
