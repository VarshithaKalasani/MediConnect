import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const STATS = [
  ['50,000+', 'Happy Patients', 'fa-users'],
  ['2,000+', 'Verified Doctors', 'fa-user-md'],
  ['500+', 'Partner Hospitals', 'fa-hospital'],
  ['4.8★', 'Average Rating', 'fa-star'],
]

const FEATURES = [
  { icon: 'fa-calendar-check', title: 'Easy Appointment Booking', desc: 'Book with top doctors in just a few clicks, 24/7 from anywhere.', color: '#e3f2fd' },
  { icon: 'fa-stethoscope', title: 'Verified Doctors', desc: 'All doctors are credentialed and experienced in their specialties.', color: '#e8f5e9' },
  { icon: 'fa-bell', title: 'Instant Notifications', desc: 'Get SMS and email reminders for your upcoming appointments.', color: '#fff8e1' },
  { icon: 'fa-shield-alt', title: 'Secure & Private', desc: 'Your health data is encrypted and always protected.', color: '#fce4ec' },
  { icon: 'fa-video', title: 'Online Consultations', desc: 'Consult doctors virtually from the comfort of your home.', color: '#f3e5f5' },
  { icon: 'fa-file-medical', title: 'Digital Records', desc: 'Access and manage your health records securely anytime.', color: '#e0f7fa' },
]

const STEPS = [
  ['1', 'fa-map-marker-alt', 'Select Location', 'Enter your city to find hospitals near you.'],
  ['2', 'fa-hospital', 'Choose Hospital', 'Browse trusted hospitals and pick one.'],
  ['3', 'fa-user-md', 'Pick a Doctor', 'View available doctors and specialties.'],
  ['4', 'fa-calendar-alt', 'Book Your Slot', 'Choose a time slot and confirm instantly.'],
]

export default function Home() {
  const [city, setCity] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (city.trim()) navigate(`/hospitals?location=${encodeURIComponent(city.trim())}`)
    else navigate('/hospitals')
  }

  return (
    <div>
      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 35%, #1a73e8 70%, #1e88e5 100%)',
        color: 'white', padding: '5.5rem 0 4.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-40px', width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 50, padding: '6px 18px', fontSize: '0.82rem', fontWeight: 600, letterSpacing: 1, marginBottom: 20, textTransform: 'uppercase' }}>
            <i className="fas fa-check-circle" style={{ color: '#69f0ae' }}></i>
            Trusted by 50,000+ patients across Telangana
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.4rem)', lineHeight: 1.18, marginBottom: '1.1rem' }}>
            Book Doctor Appointments<br />
            <em style={{ color: '#bbdefb' }}>in Minutes</em>
          </h1>

          <p style={{ fontSize: '1.1rem', opacity: 0.88, maxWidth: 600, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Find verified doctors and top hospitals near you. Instant booking, real-time confirmation — healthcare made simple.
          </p>

          {/* Search box */}
          <div style={{
            background: 'white', maxWidth: 620, margin: '0 auto',
            padding: '14px 14px 14px 20px',
            borderRadius: 16, display: 'flex', gap: 10,
            boxShadow: '0 16px 50px rgba(0,0,0,0.25)',
            alignItems: 'center',
          }}>
            <i className="fas fa-map-marker-alt" style={{ color: 'var(--primary)', fontSize: '1.1rem', flexShrink: 0 }}></i>
            <input
              value={city} onChange={e => setCity(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Enter your city (e.g. Hyderabad)…"
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1rem', fontFamily: 'var(--font-main)', color: 'var(--dark)', background: 'transparent' }}
            />
            <button onClick={handleSearch} className="btn btn-primary" style={{ borderRadius: 10, padding: '11px 22px', flexShrink: 0 }}>
              <i className="fas fa-search"></i> Find Hospitals
            </button>
          </div>

          {/* Quick links */}
          <div style={{ marginTop: '1.8rem', display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Cardiologist', 'Dermatologist', 'Pediatrician', 'Orthopedic'].map(s => (
              <button key={s} onClick={() => navigate(`/doctors?specialty=${s}`)} style={{
                background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.3)',
                color: 'white', padding: '6px 16px', borderRadius: 50, fontSize: '0.83rem',
                fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-main)',
                transition: 'all 0.2s',
              }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ background: 'white', padding: '2rem 0', borderBottom: '1px solid #f0f4f8' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
            {STATS.map(([num, label, icon]) => (
              <div key={label} style={{ textAlign: 'center', padding: '0 10px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{num}</div>
                <div style={{ color: 'var(--gray)', fontSize: '0.87rem', marginTop: 5, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                  <i className={`fas ${icon}`} style={{ color: 'var(--primary)', fontSize: '0.8rem' }}></i>{label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section" style={{ background: '#f8fbff' }}>
        <div className="container">
          <div className="section-title">
            <h2>Why Choose MediConnect?</h2>
            <p>We make healthcare accessible and convenient for everyone, everywhere.</p>
          </div>
          <div className="grid-3">
            {FEATURES.map(({ icon, title, desc, color }) => (
              <div key={title} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ width: 68, height: 68, background: color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.1rem', fontSize: '1.7rem', color: 'var(--primary)' }}>
                  <i className={`fas ${icon}`}></i>
                </div>
                <h3 style={{ marginBottom: 10, fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>{title}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.9rem', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-title">
            <h2>How It Works</h2>
            <p>Book your appointment in just 4 simple steps</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 22, flexWrap: 'wrap', position: 'relative' }}>
            {STEPS.map(([num, icon, title, desc], i) => (
              <div key={num} className="card" style={{ padding: '2rem 1.5rem', textAlign: 'center', maxWidth: 230, flex: '1 1 190px', position: 'relative' }}>
                <div style={{
                  position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
                  width: 36, height: 36, background: 'var(--primary)', color: 'white',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '0.95rem', boxShadow: '0 4px 14px rgba(26,115,232,0.35)',
                }}>{num}</div>
                <div style={{ marginTop: 10 }}>
                  <i className={`fas ${icon} fa-2x`} style={{ color: 'var(--primary)', marginBottom: 14 }}></i>
                  <h4 style={{ marginBottom: 8, fontWeight: 700 }}>{title}</h4>
                  <p style={{ color: 'var(--gray)', fontSize: '0.87rem', lineHeight: 1.55 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0d47a1, #1a73e8)',
        color: 'white', padding: '4.5rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '1rem' }}>
            Ready to Book Your Appointment?
          </h2>
          <p style={{ opacity: 0.88, marginBottom: '2rem', fontSize: '1.05rem', maxWidth: 560, margin: '0 auto 2rem' }}>
            Join thousands of patients who trust MediConnect for all their healthcare needs.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-white" style={{ fontSize: '1rem', padding: '12px 28px' }}>
              <i className="fas fa-user-plus"></i> Get Started Free
            </Link>
            <Link to="/doctors" className="btn btn-outline" style={{ fontSize: '1rem', padding: '12px 28px' }}>
              <i className="fas fa-search"></i> Find a Doctor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
