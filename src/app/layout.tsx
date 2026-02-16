import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/chat/ChatWidget'

export const metadata: Metadata = {
  title: 'The Gorge Tours & Travel | Safari Journeys Across Kenya',
  description:
    'Luxury and custom safari journeys through Kenya with seamless planning, reliable operations, and unforgettable wildlife experiences.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="overflow-x-clip">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
