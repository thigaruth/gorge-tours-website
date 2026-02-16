type Props = {
  destinations: number
  packages: number
  avgPrice: number
}

export default function MetricsStrip({ destinations, packages, avgPrice }: Props) {
  return (
    <section className="bg-stone-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 py-8 sm:grid-cols-3">
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <p className="text-3xl font-semibold text-ink-950">{destinations}</p>
          <p className="text-sm text-stone-600">Priority destinations</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <p className="text-3xl font-semibold text-ink-950">{packages}</p>
          <p className="text-sm text-stone-600">Curated package templates</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <p className="text-3xl font-semibold text-ink-950">${avgPrice}</p>
          <p className="text-sm text-stone-600">Average base package price (USD)</p>
        </div>
      </div>
    </section>
  )
}
