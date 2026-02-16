import { Destination } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  destinations: Destination[]
}

export default function DestinationGrid({ destinations }: Props) {
  return (
    <section id="destinations" className="py-14">
      <div className="container">
        <Badge variant="secondary" className="rounded-full px-3 py-1">
          Iconic Landscapes
        </Badge>
        <h2 className="mt-4 text-4xl font-semibold">Choose the wilderness vibe you want.</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          From migration drama to quiet conservancy elegance, each destination is tuned for different traveler energy and styles.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {destinations.map((item) => (
            <Card key={item.id} className="overflow-hidden border-border/70 bg-card/80 shadow-safari">
              <div
                className="h-56 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(16,31,24,0.2), rgba(16,31,24,0.65)), url(${item.heroImage})`,
                }}
              />
              <CardContent className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.region}</p>
                  </div>
                  <Badge variant="outline" className="whitespace-nowrap">
                    Wildlife {item.wildlifeIndex}/100
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <Badge key={highlight} variant="secondary" className="rounded-full bg-secondary/70">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
