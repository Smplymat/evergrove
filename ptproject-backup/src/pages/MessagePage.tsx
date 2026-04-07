import { Send, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const MessagePage: React.FC = () => {
  const history = useHistory()
  const [message, setMessage] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      console.log('Message sent:', message)
      alert('Message sent successfully! We will get back to you soon.')
      setMessage('')
      history.push('/contact')
    }
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[200px] bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
        <div className="text-center">
          <MessageSquare size={48} className="mx-auto mb-4 text-primary" />
          <h1 className="text-foreground font-serif text-5xl sm:text-6xl font-bold mb-2 animate-fade-in-up">
            Send Us a Message
          </h1>
          <p className="text-muted-foreground text-base animate-fade-in-up stagger-1">
            We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Message Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-3xl shadow-xl p-8 md:p-12 border border-border">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2 text-center">
              Write Your Message
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8" />

            <form onSubmit={handleSend} className="space-y-6">
              <div>
                <label className="block text-foreground font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here... Tell us about your inquiry, feedback, or any questions you have."
                  rows={10}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  required
                />
                <p className="text-muted-foreground text-sm mt-2">
                  {message.length} / 1000 characters
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                SEND MESSAGE
              </button>
            </form>

            <p className="text-center text-muted-foreground text-sm mt-6">
              We typically respond within 24 hours during business days.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
            Other Ways to Reach Us
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <MessageSquare size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-muted-foreground text-sm">63+ 954-634-3353</p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <MessageSquare size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">evergrove_manila@gmail.com</p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <MessageSquare size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Social Media</h3>
              <p className="text-muted-foreground text-sm">@evergrove_manila</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MessagePage
