import { TourPackage } from '@/lib/types'

type PackageWithDestination = TourPackage & { destinationName: string }

type Props = {
  packages: PackageWithDestination[]
}

export default function PackageShowcase({ packages }: Props) {
  return (
    <section id="packages" className="bg-ink-950 py-16 text-stone-100">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="text-3xl font-semibold md:text-4xl">Package Engine</h2>
        <p className="mt-3 max-w-2xl text-stone-300">
          Structured offerings with explicit style, occupancy limits, and pricing baseline.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {packages.map((item) => (
            <article key={item.id} className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-sand-300">{item.style}</p>
              <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-stone-300">{item.destinationName}</p>
              <p className="mt-4 text-3xl font-semibold text-sand-300">${item.basePriceUsd}</p>
              <p className="text-xs text-stone-400">Per traveler base rate</p>

              <ul className="mt-4 space-y-2 text-sm text-stone-300">
                {item.includes.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between text-xs text-stone-400">
                <span>{item.durationDays} days</span>
                <span>Max {item.maxGuests} guests</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
