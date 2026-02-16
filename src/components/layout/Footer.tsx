export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-stone-900 text-stone-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold tracking-wide">The Gorge Tours & Travel</p>
          <p className="mt-3 text-sm leading-relaxed text-stone-300">
            Performance-focused safari planning across Kenya. Reliable logistics, experienced guides, and tailored routes.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-300">
            <li>+254 700 123 456</li>
            <li>bookings@gorgetours.travel</li>
            <li>Nairobi, Kenya</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">Coverage</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-300">
            <li>Maasai Mara</li>
            <li>Amboseli</li>
            <li>Samburu</li>
            <li>Laikipia Conservancies</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
