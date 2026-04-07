import { MapPin, Phone, MessageCircle, Instagram, Mail } from 'lucide-react'
import { useHistory } from 'react-router-dom'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: '143 Brgy. Mangga, Anonas. Quezon City, Philippines',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '63+ 954-634-3353',
    link: 'tel:+639546343353',
  },
  {
    icon: MessageCircle,
    label: 'Facebook Messenger',
    value: 'EverGroveManila',
    link: 'https://m.me/EverGroveManila',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@evergrove_manila',
    link: 'https://instagram.com/evergrove_manila',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'evergrove_manila@gmail.com',
    link: 'mailto:evergrove_manila@gmail.com',
  },
]

const ContactPage: React.FC = () => {
  const history = useHistory()

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-foreground font-serif text-5xl sm:text-6xl font-bold mb-4 animate-fade-in-up">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg animate-fade-in-up stagger-1">
            We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className="nature-card bg-card rounded-2xl p-6 border border-border flex items-start gap-4 hover:border-primary/30 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <info.icon size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{info.label}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => history.push('/message')}
              className="px-12 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 text-lg"
            >
              Send Us a Message
            </button>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center text-foreground mb-8">
            Visit Our Location
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] bg-card border border-border flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin size={48} className="mx-auto mb-4 text-primary" />
              <p className="text-lg font-semibold mb-2">143 Brgy. Mangga, Anonas</p>
              <p>Quezon City, Philippines</p>
              <p className="text-sm mt-4">Map integration coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-8">
            Opening Hours
          </h2>
          <div className="bg-card rounded-2xl p-8 border border-border inline-block">
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between gap-12">
                <span className="text-foreground font-medium">Monday - Friday</span>
                <span className="text-primary font-semibold">7:00 AM - 10:00 PM</span>
              </div>
              <div className="flex items-center justify-between gap-12">
                <span className="text-foreground font-medium">Saturday - Sunday</span>
                <span className="text-primary font-semibold">8:00 AM - 10:00 PM</span>
              </div>
              <div className="flex items-center justify-between gap-12">
                <span className="text-foreground font-medium">Holidays</span>
                <span className="text-muted-foreground">Varies</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
