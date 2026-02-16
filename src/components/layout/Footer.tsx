export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-[linear-gradient(180deg,rgba(36,57,39,0.96),rgba(16,31,24,1))] text-stone-100">
      <div className="container grid gap-10 py-14 md:grid-cols-3">
        <section>
          <p className="text-sm uppercase tracking-[0.24em] text-stone-300">Gorge Safari Co.</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-200/90">
            Bespoke Kenya safari itineraries powered by disciplined logistics, experienced guides, and a design-forward client
            experience.
          </p>
        </section>

        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-300">Reach Us</p>
          <ul className="mt-4 space-y-2 text-sm text-stone-100/90">
            <li>+254 700 123 456</li>
            <li>hello@gorgesafari.co</li>
            <li>Nairobi, Kenya</li>
            <li>Mon-Sat: 08:00 - 19:00 EAT</li>
          </ul>
        </section>

        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-300">Top Routes</p>
          <ul className="mt-4 space-y-2 text-sm text-stone-100/90">
            <li>Maasai Mara Migration Circuit</li>
            <li>Amboseli Elephant Panorama</li>
            <li>Samburu Rare Species Trail</li>
            <li>Laikipia Conservancy Week</li>
          </ul>
        </section>
      </div>
    </footer>
  )
}
