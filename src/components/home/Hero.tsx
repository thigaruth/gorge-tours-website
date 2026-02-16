import { ArrowRight, ShieldCheck, Timer, MapPinned } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-stone-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(227,190,107,0.25),transparent_35%),radial-gradient(circle_at_85%_40%,rgba(132,164,120,0.23),transparent_40%)]" />
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full border border-white/10" />
      <div className="absolute -right-24 bottom-8 h-96 w-96 rounded-full border border-white/10" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-sand-300">Kenya Safari Systems, Rebuilt</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
          Precision safari planning with a backend that actually keeps up.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-stone-300 md:text-lg">
          End-to-end itinerary architecture, dynamic package logic, and booking operations designed for high confidence execution.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#book"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sand-300 px-6 py-3 font-semibold text-ink-950 transition-transform hover:scale-[1.02]"
          >
            Request a Quote
            <ArrowRight size={18} />
          </a>
          <a
            href="#packages"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold text-stone-100 transition-colors hover:bg-white/10"
          >
            Explore Packages
          </a>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <ShieldCheck className="text-sand-300" size={18} />
            <p className="mt-2 text-sm font-semibold">Operational certainty</p>
            <p className="mt-1 text-sm text-stone-300">Validated flows from package selection to booking intake.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <Timer className="text-sand-300" size={18} />
            <p className="mt-2 text-sm font-semibold">Fast quote turnaround</p>
            <p className="mt-1 text-sm text-stone-300">Live quote estimation and rapid dispatch by itinerary specialists.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <MapPinned className="text-sand-300" size={18} />
            <p className="mt-2 text-sm font-semibold">Deep destination coverage</p>
            <p className="mt-1 text-sm text-stone-300">From flagship reserves to low-density conservancy circuits.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
