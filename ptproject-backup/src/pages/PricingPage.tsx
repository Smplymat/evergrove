import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

interface PricingSpace {
  id: number
  title: string
  subtitle: string
  image: string
  rates: { label: string; price: string }[]
}

const pricingSpaces: PricingSpace[] = [
  {
    id: 1,
    title: 'The Canopy Commons',
    subtitle: '8-15 Pax Open Collaborative Area',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
    rates: [
      { label: 'Hourly (Weekdays)', price: '₱1,200' },
      { label: 'Hourly (Weekends)', price: '₱1,400' },
      { label: '4-hour block', price: '₱5,500' },
      { label: 'Whole day (8 hrs)', price: '₱10,000' },
    ]
  },
  {
    id: 2,
    title: 'The Banyan Hall',
    subtitle: '20-30 Pax Seminar & Workshop Space',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    rates: [
      { label: 'Hourly (Weekdays)', price: '₱2,000' },
      { label: 'Hourly (Weekends)', price: '₱2,500' },
      { label: '4-hour block', price: '₱8,000' },
      { label: 'Whole day (8 hrs)', price: '₱15,000' },
    ]
  },
  {
    id: 3,
    title: 'Palm Pod',
    subtitle: '4-6 Pax Private Work Room',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
    rates: [
      { label: 'Hourly (Weekdays)', price: '₱800' },
      { label: 'Hourly (Weekends)', price: '₱1,000' },
      { label: '4-hour block', price: '₱3,000' },
      { label: 'Whole day (8 hrs)', price: '₱5,500' },
    ]
  },
  {
    id: 4,
    title: 'The Grove Lounge',
    subtitle: 'Relaxation & Networking Area',
    image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800',
    rates: [
      { label: 'Hourly (Weekdays)', price: '₱500' },
      { label: 'Hourly (Weekends)', price: '₱600' },
      { label: '4-hour block', price: '₱1,800' },
      { label: 'Whole day (8 hrs)', price: '₱3,500' },
    ]
  },
  {
    id: 5,
    title: 'The Study Grove',
    subtitle: 'Quiet Study & Focus Zone',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    rates: [
      { label: 'Hourly (Weekdays)', price: '₱300' },
      { label: 'Hourly (Weekends)', price: '₱400' },
      { label: '4-hour block', price: '₱1,200' },
      { label: 'Whole day (8 hrs)', price: '₱2,000' },
    ]
  },
]

const PricingPage: React.FC = () => {
  const history = useHistory()
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === pricingSpaces.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? pricingSpaces.length - 1 : prev - 1))
  }

  const currentSpace = pricingSpaces[currentIndex]

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[200px] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-foreground font-serif text-5xl sm:text-6xl font-bold mb-2 animate-fade-in-up">
            Pricing Plans
          </h1>
          <p className="text-muted-foreground text-base animate-fade-in-up stagger-1">
            Flexible rates for every need
          </p>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Main Card */}
            <div className="bg-card rounded-3xl shadow-xl overflow-hidden border border-border">
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative h-[300px] md:h-auto">
                  <img
                    src={currentSpace.image}
                    alt={currentSpace.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Details */}
                <div className="p-8 md:p-10">
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                    {currentSpace.title}
                  </h2>
                  <p className="text-primary text-sm font-medium tracking-[0.1em] uppercase mb-6">
                    {currentSpace.subtitle}
                  </p>

                  <div className="space-y-4 mb-8">
                    <h3 className="font-semibold text-foreground text-lg mb-4">Rates:</h3>
                    {currentSpace.rates.map((rate, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-3 border-b border-border last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check size={12} className="text-primary" />
                          </div>
                          <span className="text-foreground/80 text-sm">{rate.label}</span>
                        </div>
                        <span className="font-bold text-primary text-lg">{rate.price}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => history.push('/spaces')}
                    className="w-full px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-all mb-3"
                  >
                    See Details
                  </button>
                  <button
                    onClick={() => history.push('/reserve')}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105"
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {pricingSpaces.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-border hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Spaces Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
            All Spaces at a Glance
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingSpaces.map((space) => (
              <div
                key={space.id}
                className="nature-card bg-card rounded-2xl overflow-hidden border border-border cursor-pointer"
                onClick={() => setCurrentIndex(space.id - 1)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                    {space.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{space.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Starting from</span>
                    <span className="font-bold text-primary text-lg">
                      {space.rates[0].price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PricingPage
