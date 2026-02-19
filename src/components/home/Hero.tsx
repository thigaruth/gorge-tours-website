import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Reveal from '@/components/ui/reveal'
import { Compass, Sparkles, ShieldCheck } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 -z-20 safari-grid opacity-40" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_15%,rgba(178,119,51,0.2),transparent_45%),radial-gradient(circle_at_88%_25%,rgba(53,91,56,0.22),transparent_45%),linear-gradient(180deg,rgba(247,241,225,0.96),rgba(236,224,191,0.72))]" />
      <div className="container grid gap-12 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24">
        <div>
          <Reveal>
            <Badge variant="outline" className="rounded-full border-primary/45 bg-primary/10 px-3 py-1 text-primary">
              Kenya Safari Specialists
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-5xl font-semibold leading-tight text-foreground md:text-7xl">
              Venture into the wild with journeys shaped like cinema.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              We craft performance-grade safari itineraries with premium lodges, dependable logistics, and guides who know where the
              story is happening each day.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#book">
                <Button size="lg" className="shadow-safari">
                  Build Your Safari
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" size="lg">
                  Talk to Your Planner
                </Button>
              </a>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-border/70 bg-card/80 p-4 backdrop-blur">
                <Compass size={18} className="text-primary" />
                <p className="mt-2 text-sm font-semibold">Route Precision</p>
                <p className="mt-1 text-xs text-muted-foreground">Seasonal movement planning and travel-time optimization.</p>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="rounded-2xl border border-border/70 bg-card/80 p-4 backdrop-blur">
                <ShieldCheck size={18} className="text-primary" />
                <p className="mt-2 text-sm font-semibold">Operational Certainty</p>
                <p className="mt-1 text-xs text-muted-foreground">Clear confirmations, backups, and guided handovers.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="rounded-2xl border border-border/70 bg-card/80 p-4 backdrop-blur">
                <Sparkles size={18} className="text-primary" />
                <p className="mt-2 text-sm font-semibold">Cinematic Experience</p>
                <p className="mt-1 text-xs text-muted-foreground">Signature moments: balloon dawns, golden-hour drives, bush dining.</p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="relative" delay={0.2} y={24}>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-accent/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-safari">
            <div
              className="h-[420px] bg-cover bg-center dune-mask"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, rgba(12, 21, 19, 0.1), rgba(12, 21, 19, 0.62)), url(https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1880&auto=format&fit=crop)',
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-stone-100">
              <p className="text-xs uppercase tracking-[0.25em] text-stone-200">Next Departure Window</p>
              <p className="mt-2 text-2xl font-semibold">July - October Migration Prime</p>
              <p className="mt-2 text-sm text-stone-200/90">Maasai Mara, private guides, sunrise traverses, curated camp set.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
