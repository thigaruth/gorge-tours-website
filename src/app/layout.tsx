import type { Metadata } from 'next'
import { Inter, Montserrat, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/chat/ChatWidget'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Gorge Tours and Travel | Kenya Safari Experts',
  description: 'Experience authentic Kenya safari adventures with The Gorge Tours and Travel. Expert-guided tours to Maasai Mara, Amboseli, Samburu & more. Book your dream safari today!',
  keywords: 'Kenya safari, Maasai Mara tours, Amboseli safari, Samburu safari, Kenya wildlife tours, safari packages Kenya',
  authors: [{ name: 'The Gorge Tours and Travel' }],
  openGraph: {
    title: 'The Gorge Tours and Travel | Kenya Safari Experts',
    description: 'Experience authentic Kenya safari adventures with expert guides',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
