'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: '#destinations', label: 'Destinations' },
  { href: '#packages', label: 'Packages' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#book', label: 'Book' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-ink-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 text-stone-100">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          GORGE TOURS
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-sand-300">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#book"
          className="hidden rounded-full border border-sand-300/70 px-4 py-2 text-sm font-medium transition-colors hover:bg-sand-300 hover:text-ink-950 md:inline-block"
        >
          Build Itinerary
        </a>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink-950 px-5 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-3 text-sm text-stone-100">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-1 transition-colors hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
