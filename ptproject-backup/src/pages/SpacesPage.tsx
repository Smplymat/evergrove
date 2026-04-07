import { Wifi, Users, Coffee, Monitor, Wind, Lock, Volume2, Lightbulb } from 'lucide-react'
import { useHistory } from 'react-router-dom'

const spaces = [
  {
    id: 1,
    title: 'The Canopy Commons',
    tagline: 'Open & Collaborative Work Area',
    description: 'A vibrant open space designed for collaboration and creativity. High ceilings and ample natural light create an inspiring environment perfect for teams and individuals alike.',
    capacity: '8-15 guests',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
    features: [
      { icon: Wifi, text: 'High-speed Wi-Fi' },
      { icon: Users, text: 'Comfortable seating' },
      { icon: Lightbulb, text: 'Natural lighting' },
      { icon: Coffee, text: 'Access to cafe' },
      { icon: Monitor, text: 'Whiteboard' },
      { icon: Monitor, text: 'Free projector/screen (HDMI)' },
    ]
  },
  {
    id: 2,
    title: 'The Banyan Hall',
    tagline: 'Seminar & Workshop Space',
    description: 'Inspired by the strength and wisdom of the banyan tree, this spacious hall is perfect for seminars, workshops, and large gatherings.',
    capacity: '20-30 guests',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    features: [
      { icon: Wifi, text: 'High-speed Wi-Fi' },
      { icon: Monitor, text: 'Projector and screen' },
      { icon: Monitor, text: 'Whiteboard' },
      { icon: Volume2, text: 'Sound system' },
      { icon: Wind, text: 'Air conditioning' },
      { icon: Coffee, text: 'Access to cafe' },
    ]
  },
  {
    id: 3,
    title: 'Palm Pod',
    tagline: '4-6 Pax Private Work Room',
    description: 'A cozy and private workspace ideal for small teams or focused individual work. Surrounded by greenery to keep your mind fresh and productive.',
    capacity: '4-6 guests',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
    features: [
      { icon: Wifi, text: 'High-speed Wi-Fi' },
      { icon: Lock, text: 'Private entrance' },
      { icon: Monitor, text: 'Whiteboard' },
      { icon: Wind, text: 'Air conditioning' },
      { icon: Lightbulb, text: 'Natural views' },
      { icon: Coffee, text: 'Access to cafe' },
    ]
  },
  {
    id: 4,
    title: 'The Grove Lounge',
    tagline: 'Relaxation & Networking Area',
    description: 'Step into a serene oasis where comfort meets style. Perfect for informal meetings or unwinding after a productive day. Surrounded by lush greenery for a calming atmosphere.',
    capacity: 'Open seating',
    image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800',
    features: [
      { icon: Users, text: 'Plush seating' },
      { icon: Users, text: 'High-top cocktail tables' },
      { icon: Lightbulb, text: 'Ambient lighting' },
      { icon: Volume2, text: 'Background music' },
      { icon: Coffee, text: 'Coffee and tea station' },
      { icon: Monitor, text: 'Bookshelf lounge' },
    ]
  },
  {
    id: 5,
    title: 'The Study Grove',
    tagline: 'Quiet Study & Focus Zone',
    description: 'A dedicated environment designed for deep work and concentration. Minimal distractions and maximum productivity.',
    capacity: 'Individual pods',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    features: [
      { icon: Lock, text: 'Individual study pods' },
      { icon: Volume2, text: 'Soundproof partitions' },
      { icon: Lightbulb, text: 'Adjustable lighting' },
      { icon: Users, text: 'Ergonomic seating' },
      { icon: Monitor, text: 'Power outlets at each desk' },
      { icon: Lock, text: 'Personal lockers' },
    ]
  },
]

const SpacesPage: React.FC = () => {
  const history = useHistory()

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] hero-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white font-serif text-5xl sm:text-6xl font-bold mb-4 animate-fade-in-up">
            Explore Our Spaces
          </h1>
          <p className="text-amber-100/80 text-sm tracking-[0.3em] uppercase animate-fade-in-up stagger-1">
            Scroll to see more
          </p>
        </div>
      </section>

      {/* Spaces List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          {spaces.map((space, index) => (
            <div
              key={space.id}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="rounded-2xl overflow-hidden shadow-lg nature-card">
                  <img
                    src={space.image}
                    alt={space.title}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Details */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  {space.title}
                </h2>
                <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-4">
                  {space.tagline}
                </p>
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                  {space.description}
                </p>
                <p className="text-foreground font-semibold mb-6">
                  Capacity: {space.capacity}
                </p>

                {/* Features */}
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {space.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon size={16} className="text-primary" />
                      </div>
                      {feature.text}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => history.push('/reserve')}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105"
                >
                  Reserve Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to book your perfect space?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Choose the space that fits your needs and reserve it today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => history.push('/reserve')}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105"
            >
              Reserve a Space
            </button>
            <button
              onClick={() => history.push('/pricing')}
              className="px-8 py-4 border border-border text-foreground rounded-xl font-semibold hover:bg-muted/50 transition-all"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SpacesPage
