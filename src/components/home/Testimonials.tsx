import { Testimonial } from '@/lib/types'

type Props = {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: Props) {
  return (
    <section id="reviews" className="bg-stone-100 py-16">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="text-3xl font-semibold text-ink-950 md:text-4xl">Traveler Feedback</h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.id} className="rounded-3xl border border-black/10 bg-white p-5">
              <p className="text-sm leading-relaxed text-stone-700">"{item.quote}"</p>
              <p className="mt-4 text-sm font-semibold text-ink-950">{item.traveler}</p>
              <p className="text-xs text-stone-500">{item.country}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
