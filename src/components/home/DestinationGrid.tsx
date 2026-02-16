import { Destination } from '@/lib/types'

type Props = {
  destinations: Destination[]
}

export default function DestinationGrid({ destinations }: Props) {
  return (
    <section id="destinations" className="bg-stone-50 py-16">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="text-3xl font-semibold text-ink-950 md:text-4xl">Destination Intelligence</h2>
        <p className="mt-3 max-w-2xl text-stone-700">
          Every route is mapped with seasonality, wildlife density, and logistics in mind.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {destinations.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-3xl border border-black/10 bg-white">
              <div
                className="h-56 w-full bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.45)), url(${item.heroImage})` }}
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-ink-950">{item.name}</h3>
                    <p className="text-sm text-stone-600">{item.region}</p>
                  </div>
                  <p className="rounded-full bg-ink-950 px-3 py-1 text-xs font-medium text-stone-100">
                    Wildlife {item.wildlifeIndex}/100
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-stone-700">{item.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <span key={highlight} className="rounded-full bg-sand-100 px-3 py-1 text-xs text-stone-800">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
