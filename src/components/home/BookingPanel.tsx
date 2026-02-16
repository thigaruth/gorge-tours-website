'use client'

import { FormEvent, useState } from 'react'

type PackageOption = {
  id: string
  title: string
  destinationName: string
}

type Props = {
  packageOptions: PackageOption[]
}

type SubmissionState = {
  loading: boolean
  successMessage: string | null
  errorMessage: string | null
}

export default function BookingPanel({ packageOptions }: Props) {
  const [state, setState] = useState<SubmissionState>({
    loading: false,
    successMessage: null,
    errorMessage: null,
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState({ loading: true, successMessage: null, errorMessage: null })

    const formData = new FormData(event.currentTarget)
    const payload = {
      fullName: String(formData.get('fullName') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      travelers: Number(formData.get('travelers') ?? 1),
      packageId: String(formData.get('packageId') ?? ''),
      startDate: String(formData.get('startDate') ?? ''),
      notes: String(formData.get('notes') ?? ''),
    }

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const json = await response.json().catch(() => ({}))

    if (!response.ok) {
      setState({
        loading: false,
        successMessage: null,
        errorMessage: json?.error ?? 'Unable to submit booking request',
      })
      return
    }

    setState({
      loading: false,
      successMessage: `Request received. Booking ID: ${json?.data?.id ?? 'pending'}`,
      errorMessage: null,
    })
    event.currentTarget.reset()
  }

  return (
    <section id="book" className="bg-ink-950 py-16 text-stone-100">
      <div className="mx-auto max-w-4xl px-5">
        <h2 className="text-3xl font-semibold md:text-4xl">Build Your Itinerary</h2>
        <p className="mt-3 text-stone-300">Submit your preferences and get a detailed quote with route recommendations.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 rounded-3xl border border-white/15 bg-white/5 p-6 md:grid-cols-2">
          <input name="fullName" required placeholder="Full name" className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-sand-300" />
          <input type="email" name="email" required placeholder="Email" className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-sand-300" />
          <input name="phone" required placeholder="Phone" className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-sand-300" />
          <input type="number" name="travelers" min={1} max={12} defaultValue={2} className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-sand-300" />
          <select name="packageId" required className="rounded-xl border border-white/20 bg-ink-900 px-4 py-3 text-sm outline-none focus:border-sand-300 md:col-span-2">
            <option value="">Select a package</option>
            {packageOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} - {item.destinationName}
              </option>
            ))}
          </select>
          <input type="date" name="startDate" required className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-sand-300 md:col-span-2" />
          <textarea name="notes" rows={4} placeholder="Preferences, budget, flight details, or special requests" className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-sand-300 md:col-span-2" />

          <button
            type="submit"
            disabled={state.loading}
            className="rounded-full bg-sand-300 px-5 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-sand-200 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          >
            {state.loading ? 'Submitting...' : 'Submit Booking Request'}
          </button>

          {state.successMessage && <p className="text-sm text-emerald-300 md:col-span-2">{state.successMessage}</p>}
          {state.errorMessage && <p className="text-sm text-red-300 md:col-span-2">{state.errorMessage}</p>}
        </form>
      </div>
    </section>
  )
}
