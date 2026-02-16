import { Card, CardContent } from '@/components/ui/card'

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
        <Card className="bg-card/80 backdrop-blur">
          <CardContent className="p-5">
            <p className="text-3xl font-semibold">{destinations}</p>
            <p className="mt-1 text-sm text-muted-foreground">Safari destinations</p>
          </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur">
          <CardContent className="p-5">
            <p className="text-3xl font-semibold">{packages}</p>
            <p className="mt-1 text-sm text-muted-foreground">Curated packages</p>
          </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur">
          <CardContent className="p-5">
            <p className="text-3xl font-semibold">${avgPrice}</p>
            <p className="mt-1 text-sm text-muted-foreground">Average base rate</p>
          </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur">
          <CardContent className="p-5">
            <p className="text-3xl font-semibold">{contactRequests}</p>
            <p className="mt-1 text-sm text-muted-foreground">Live consultation requests</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
