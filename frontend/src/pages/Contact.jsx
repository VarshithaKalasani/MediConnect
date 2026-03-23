import { useState } from 'react'
import toast from 'react-hot-toast'

const CONTACT_ITEMS = [
  { icon: 'fa-map-marker-alt', title: 'Our Location', lines: ['Hitech City, Hyderabad', 'Telangana 500081, India'], color: '#e3f2fd', iconColor: '#1a73e8' },
  { icon: 'fa-phone-alt',      title: 'Phone Numbers', lines: ['+91 9998887771', '+91 9998887772'],              color: '#e8f5e9', iconColor: '#4caf50' },
  { icon: 'fa-envelope',       title: 'Email Address', lines: ['info@mediconnect.com', 'support@mediconnect.com'], color: '#fff8e1', iconColor: '#ff9800' },
  { icon: 'fa-clock',          title: 'Working Hours', lines: ['Mon–Fri: 8AM – 8PM', 'Sat: 9AM – 6PM, Sun: 10AM – 4PM'], color: '#fce4ec', iconColor: '#f44336' },
]

const SUBJECTS = ['General Inquiry', 'Appointment Issue', 'Technical Support', 'Billing Question', 'Feedback', 'Partnership', 'Other']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)
    setTimeout(() => {
      toast.success('Message sent! We\'ll get back to you within 24 hours. 📬')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setLoading(false)
    }, 1200)
  }

  return (
    <div>
      <div className="page-title">
        <h1>Get In Touch</h1>
        <p>We're here to help with any questions or concerns about our services</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 36, alignItems: 'start' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-dark)', fontSize: '1.7rem', marginBottom: '0.7rem' }}>Contact Information</h2>
              <p style={{ color: 'var(--gray)', marginBottom: '2rem', lineHeight: 1.7 }}>
                Feel free to reach out for any inquiries. Our team typically responds within a few hours on business days.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: '2rem' }}>
                {CONTACT_ITEMS.map(({ icon, title, lines, color, iconColor }) => (
                  <div key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 50, height: 50, background: color, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.15rem', color: iconColor }}>
                      <i className={`fas ${icon}`}></i>
                    </div>
                    <div>
                      <h4 style={{ marginBottom: 3, fontSize: '0.95rem', color: 'var(--dark)' }}>{title}</h4>
                      {lines.map(line => <p key={line} style={{ color: 'var(--gray)', fontSize: '0.88rem', lineHeight: 1.6 }}>{line}</p>)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: 14, color: 'var(--dark)' }}>Follow Us</h4>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[['fa-facebook-f', '#1877f2'], ['fa-twitter', '#1da1f2'], ['fa-instagram', '#e1306c'], ['fa-linkedin-in', '#0a66c2']].map(([icon, hoverColor]) => (
                    <a key={icon} href="#" style={{ width: 44, height: 44, background: '#f0f4f8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray)', fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = hoverColor; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#f0f4f8'; e.currentTarget.style.color = 'var(--gray)'; e.currentTarget.style.transform = 'none' }}>
                      <i className={`fab ${icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card" style={{ padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-dark)', fontSize: '1.6rem', marginBottom: '1.5rem' }}>Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid-2" style={{ gap: '0 16px' }}>
                  <div className="form-group">
                    <label>Full Name <span style={{ color: '#f44336' }}>*</span></label>
                    <input type="text" placeholder="Your name" value={form.name} onChange={set('name')} required />
                  </div>
                  <div className="form-group">
                    <label>Email Address <span style={{ color: '#f44336' }}>*</span></label>
                    <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+91 9999999999" value={form.phone} onChange={set('phone')} />
                </div>

                <div className="form-group">
                  <label>Subject <span style={{ color: '#f44336' }}>*</span></label>
                  <select value={form.subject} onChange={set('subject')} required>
                    <option value="">Select a subject...</option>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>Message <span style={{ color: '#f44336' }}>*</span></label>
                  <textarea rows={5} placeholder="Write your message here..." value={form.message} onChange={set('message')} required style={{ minHeight: 130 }} />
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', borderRadius: 11, padding: '14px', fontSize: '1rem' }}>
                  {loading
                    ? <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                    : <><i className="fas fa-paper-plane"></i> Send Message</>
                  }
                </button>
              </form>
            </div>
          </div>

          {/* Map embed */}
          <div style={{ marginTop: '3rem', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--card-shadow)', height: 380 }}>
            <iframe
              title="MediConnect Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15220.70697897752!2d78.37489206977538!3d17.447900999999998!2m3!1f0!2f0!3f0!4m5!3m4!1m0!1m0!5e0!3m2!1sen!2sin!4v1661235763723!5m2!1sen!2sin"
              width="100%" height="100%" style={{ border: 'none' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
