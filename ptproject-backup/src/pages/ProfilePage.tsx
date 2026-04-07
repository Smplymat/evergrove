import {
  User,
  MapPin,
  ClipboardList,
  Heart,
  CreditCard,
  Bell,
  HelpCircle,
  Star,
  Settings,
  LogOut,
  Edit2,
  Calendar,
  ArrowLeft,
} from 'lucide-react'
import { useHistory } from 'react-router-dom'

const menuItems = [
  { icon: User, label: 'Personal Info', path: '/personal-info', color: 'bg-blue-500' },
  { icon: MapPin, label: 'Addresses', path: '/addresses', color: 'bg-green-500' },
  { icon: ClipboardList, label: 'Track Reservation', path: '/track-reservation', color: 'bg-purple-500' },
  { icon: Heart, label: 'Favorites', path: '/favorite', color: 'bg-red-500' },
  { icon: CreditCard, label: 'Payment Method', path: '/payment-method', color: 'bg-yellow-500' },
  { icon: Bell, label: 'Notifications', path: '/notification', color: 'bg-orange-500' },
  { icon: HelpCircle, label: 'FAQ', path: '/faq', color: 'bg-cyan-500' },
  { icon: Star, label: 'User Reviews', path: '/user-review', color: 'bg-amber-500' },
  { icon: Settings, label: 'Settings', path: '/settings', color: 'bg-gray-500' },
]

const ProfilePage: React.FC = () => {
  const history = useHistory()

  const handleSignOut = () => {
    console.log('Signing out...')
    history.push('/signin')
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header Bar */}
      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => history.goBack()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <h1 className="font-serif text-2xl font-bold text-foreground">My Profile</h1>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-colors">
              <Calendar size={20} className="text-muted-foreground" />
            </button>
            <button className="w-10 h-10 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-colors">
              <Bell size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* User Info Card */}
          <div className="bg-card rounded-3xl shadow-lg p-8 border border-border mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all">
                  <Edit2 size={16} />
                </button>
              </div>

              {/* User Details */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <h2 className="font-serif text-3xl font-bold text-foreground">
                    Tem Ba Dela Cruz
                  </h2>
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    <Edit2 size={18} />
                  </button>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "Mistakes are proof that you are trying"
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    <span className="text-foreground/80">Quezon City, Philippines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    <span className="text-foreground/80">Member since 2024</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 md:gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-xs text-muted-foreground">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">8</div>
                  <div className="text-xs text-muted-foreground">Favorites</div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => history.push(item.path)}
                className="nature-card bg-card rounded-2xl p-6 border border-border hover:border-primary/30 flex items-center gap-4 text-left transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} bg-opacity-10 flex items-center justify-center flex-shrink-0`}>
                  <item.icon size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.label}</h3>
                </div>
                <div className="text-muted-foreground">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Sign Out Button */}
          <div className="text-center">
            <button
              onClick={handleSignOut}
              className="px-8 py-3 bg-destructive text-destructive-foreground rounded-xl font-semibold hover:bg-destructive/90 transition-all inline-flex items-center gap-2"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
