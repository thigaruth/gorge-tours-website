'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Clock, Star } from 'lucide-react'

const destinations = [
  {
    name: 'Maasai Mara',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801',
    description: 'Witness the Great Migration and Big Five',
    duration: '3-5 days',
    rating: 4.9,
    link: '/destinations/maasai-mara'
  },
  {
    name: 'Amboseli',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44',
    description: 'Elephants with Mt. Kilimanjaro backdrop',
    duration: '2-3 days',
    rating: 4.8,
    link: '/destinations/amboseli'
  },
  {
    name: 'Samburu',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615',
    description: 'Unique wildlife in Northern Kenya',
    duration: '3-4 days',
    rating: 4.7,
    link: '/destinations/samburu'
  },
  {
    name: 'Lake Nakuru',
    image: 'https://images.unsplash.com/photo-1602643244732-d49ebc39a16c',
    description: 'Flamingos and rhino sanctuary',
    duration: '1-2 days',
    rating: 4.6,
    link: '/destinations/lake-nakuru'
  }
]

const FeaturedDestinations = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-safari-sand/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-gradient">Destinations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore Kenya's most iconic safari destinations with expert guides
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={dest.link}>
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg image-hover-zoom">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${dest.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{dest.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{dest.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-display text-2xl font-bold mb-2">{dest.name}</h3>
                    <p className="text-sm text-white/90 mb-3">{dest.description}</p>
                    
                    <div className="flex items-center text-sm text-white/80">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{dest.duration}</span>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <span className="bg-primary-500 text-white px-6 py-3 rounded-full font-semibold">
                      Explore Safari
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/destinations"
            className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg"
          >
            View All Destinations
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedDestinations
