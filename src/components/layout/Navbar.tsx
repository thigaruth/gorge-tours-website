'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Trees } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/#destinations', label: 'Destinations' },
  { href: '/#experiences', label: 'Experiences' },
  { href: '/booking', label: 'Booking' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-lg">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="rounded-full bg-primary/15 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Trees size={18} />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground">Gorge Tours</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/booking"
          className="hidden h-9 items-center rounded-full bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 md:inline-flex"
        >
          Plan My Safari
        </Link>

        <button
          type="button"
          className="rounded-lg border border-border p-2 text-foreground md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={cn('border-t border-border bg-card px-4 py-3 md:hidden', open ? 'block' : 'hidden')}>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
