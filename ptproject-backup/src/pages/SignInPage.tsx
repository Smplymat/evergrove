import { Mail, Lock, ArrowLeft, Facebook } from 'lucide-react'
import { useHistory } from 'react-router-dom'

const SignInPage: React.FC = () => {
  const history = useHistory()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign in logic here
    history.push('/')
  }

  return (
    <div className="min-h-screen auth-bg flex items-center justify-center p-4">
      <button
        onClick={() => history.goBack()}
        className="fixed top-6 left-6 w-12 h-12 rounded-full glass-dark flex items-center justify-center hover:bg-white/20 transition-all z-50"
      >
        <ArrowLeft size={20} className="text-amber-100" />
      </button>

      <div className="w-full max-w-5xl">
        {/* Welcome Text */}
        <h1 className="text-center text-amber-100 font-serif text-5xl sm:text-6xl font-bold mb-12 animate-fade-in-up">
          Welcome Back!
        </h1>

        {/* Sign In Panel */}
        <div className="glass-dark rounded-3xl p-8 md:p-12 animate-scale-in">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Section - Form */}
            <div>
              <h2 className="text-amber-100 font-serif text-2xl font-bold mb-6">Sign In</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-amber-100/80 text-sm mb-2">Email or Username</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-100/50" />
                    <input
                      type="text"
                      placeholder="Enter your email"
                      className="glass-input w-full pl-12 pr-4 py-3 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-amber-100/80 text-sm mb-2">Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-100/50" />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="glass-input w-full pl-12 pr-4 py-3 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="text-right">
                  <a href="#" className="text-amber-300 text-sm hover:text-amber-200 transition-colors">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105"
                >
                  Sign In
                </button>
              </form>
            </div>

            {/* Divider */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-px h-full bg-amber-100/20" />
            </div>
            <div className="md:hidden">
              <div className="h-px w-full bg-amber-100/20" />
            </div>

            {/* Right Section - Social Login */}
            <div className="flex flex-col justify-center">
              <h3 className="text-amber-100 font-serif text-xl font-bold mb-6 text-center md:text-left">
                Or Sign In With
              </h3>
              
              <div className="space-y-3">
                <button className="w-full py-3 px-4 bg-[#1877F2] text-white rounded-xl font-semibold hover:bg-[#1877F2]/90 transition-all flex items-center justify-center gap-2">
                  <Facebook size={20} />
                  Continue with Facebook
                </button>
                
                <button className="w-full py-3 px-4 bg-white text-gray-800 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div className="mt-8 text-center text-amber-100/70 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={() => history.push('/signup')}
                  className="text-amber-300 font-semibold hover:text-amber-200 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
