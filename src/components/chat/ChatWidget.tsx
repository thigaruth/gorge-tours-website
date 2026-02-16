'use client'

import { MessageCircle } from 'lucide-react'

export default function ChatWidget() {
  return (
    <a
      href="mailto:bookings@gorgetours.travel"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-sand-400 px-4 py-3 text-sm font-semibold text-ink-950 shadow-xl transition-transform hover:scale-105"
    >
      <MessageCircle size={18} />
      Ask an Expert
    </a>
  )
}
