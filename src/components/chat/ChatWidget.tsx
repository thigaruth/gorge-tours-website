'use client'

import { MessageCircle } from 'lucide-react'

export default function ChatWidget() {
  return (
    <a
      href="https://wa.me/254700123456"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-safari transition-transform hover:scale-105"
    >
      <MessageCircle size={18} />
      Safari Concierge
    </a>
  )
}
