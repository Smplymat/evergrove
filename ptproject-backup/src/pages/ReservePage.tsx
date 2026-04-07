import { Calendar, User, Phone, Mail, Clock, Users } from 'lucide-react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const spaces = [
  'The Canopy Commons',
  'The Banyan Hall',
  'Palm Pod',
  'The Grove Lounge',
  'The Study Grove',
]

const timeSlots = [
  '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
]

const ReservePage: React.FC = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    space: '',
    guests: '1',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Reservation submitted:', formData)
    alert('Reservation submitted successfully! We will contact you shortly.')
    history.push('/')
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[200px] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-foreground font-serif text-5xl sm:text-6xl font-bold mb-2 animate-fade-in-up">
            Reserve Your Space
          </h1>
          <p className="text-muted-foreground text-base animate-fade-in-up stagger-1">
            Book your perfect workspace today
          </p>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-3xl shadow-xl p-8 md:p-12 border border-border">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2 text-center">
              Reservation Details
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8" />

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-foreground font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-foreground font-medium mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="+63 XXX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Space Selection */}
              <div>
                <label className="block text-foreground font-medium mb-2">Select Space</label>
                <select
                  value={formData.space}
                  onChange={(e) => setFormData({ ...formData, space: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                >
                  <option value="">Choose a space...</option>
                  {spaces.map((space) => (
                    <option key={space} value={space}>
                      {space}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-foreground font-medium mb-2">Date</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-2">Time</label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    >
                      <option value="">Select time...</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-foreground font-medium mb-2">Number of Guests</label>
                <div className="relative">
                  <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 mt-8"
              >
                RESERVE NOW
              </button>
            </form>

            <p className="text-center text-muted-foreground text-sm mt-6">
              We'll contact you within 24 hours to confirm your reservation.
            </p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            Need Help?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Have questions about your reservation? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => history.push('/contact')}
              className="px-8 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-all"
            >
              Contact Us
            </button>
            <button
              onClick={() => history.push('/pricing')}
              className="px-8 py-3 border border-border text-foreground rounded-xl font-semibold hover:bg-muted/50 transition-all"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ReservePage
