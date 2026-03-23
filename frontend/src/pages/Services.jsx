import { Link } from 'react-router-dom'

const SERVICES = [
  {
    icon: 'fa-calendar-check', title: 'Doctor Appointments', color: '#e3f2fd', iconColor: '#1a73e8',
    desc: 'Book appointments with top specialists instantly, 24/7 from anywhere.',
    features: ['Instant confirmation', 'SMS & email reminders', 'Easy reschedule or cancel', 'Multiple payment options'],
  },
  {
    icon: 'fa-stethoscope', title: 'Health Checkups', color: '#e8f5e9', iconColor: '#4caf50',
    desc: 'Comprehensive health packages designed for preventive care and early detection.',
    features: ['Customized health packages', 'Home sample collection', 'Detailed lab reports', 'Doctor consultation included'],
  },
  {
    icon: 'fa-video', title: 'Online Consultations', color: '#fff8e1', iconColor: '#ff9800',
    desc: 'Consult with verified doctors virtually from the comfort of your home.',
    features: ['Secure HD video calls', 'Digital prescription delivery', '24/7 availability', 'Medical records access'],
  },
  {
    icon: 'fa-file-medical-alt', title: 'Medical Records', color: '#e0f7fa', iconColor: '#009688',
    desc: 'Access and manage your health records securely in one place, anytime.',
    features: ['Digital health profile', 'Lab report storage', 'Share securely with doctors', 'Full appointment history'],
  },
  {
    icon: 'fa-ambulance', title: 'Emergency Services', color: '#fce4ec', iconColor: '#f44336',
    desc: 'Immediate medical assistance during emergencies via our hospital network.',
    features: ['24/7 emergency care', 'Ambulance coordination', 'Priority doctor access', 'Critical care units'],
  },
  {
    icon: 'fa-pills', title: 'Medicine Delivery', color: '#f3e5f5', iconColor: '#9c27b0',
    desc: 'Get your prescribed medicines delivered to your doorstep within hours.',
    features: ['Authentic certified medicines', 'Express doorstep delivery', 'Exclusive discounts', 'Real-time order tracking'],
  },
]

export default function Services() {
  return (
    <div>
      <div className="page-title">
        <h1>Our Healthcare Services</h1>
        <p>Comprehensive medical services designed to meet all your healthcare needs</p>
      </div>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {SERVICES.map(({ icon, title, color, iconColor, desc, features }) => (
              <div key={title} className="card" style={{ padding: '2rem' }}>
                <div style={{ width: 72, height: 72, background: color, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', fontSize: '1.9rem', color: iconColor }}>
                  <i className={`fas ${icon}`}></i>
                </div>
                <h3 style={{ marginBottom: 10, fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>{title}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.9rem', marginBottom: 16, lineHeight: 1.6 }}>{desc}</p>
                <ul style={{ listStyle: 'none', marginBottom: 20 }}>
                  {features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8, fontSize: '0.87rem', color: 'var(--dark)' }}>
                      <i className="fas fa-check-circle" style={{ color: iconColor, fontSize: '0.8rem', flexShrink: 0 }}></i>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/doctors" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', borderRadius: 10, padding: '10px' }}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* Emergency Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #c62828, #f44336)',
            borderRadius: 18, padding: '3rem', textAlign: 'center',
            marginTop: '3.5rem', color: 'white', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
            <div style={{ position: 'absolute', bottom: '-40px', left: '-20px', width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem', fontSize: '1.8rem' }}>
                <i className="fas fa-ambulance"></i>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.8rem' }}>
                24/7 Emergency Medical Help
              </h2>
              <p style={{ opacity: 0.9, marginBottom: '1.8rem', maxWidth: 600, margin: '0 auto 1.8rem', fontSize: '1.02rem' }}>
                Facing a medical emergency? Our network is available around the clock. Don't wait — get help immediately.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="tel:108" style={{ background: 'white', color: '#c62828', padding: '12px 28px', borderRadius: 50, fontWeight: 800, textDecoration: 'none', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className="fas fa-phone-alt"></i> Call 108 — Emergency
                </a>
                <Link to="/contact" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '12px 28px', borderRadius: 50, fontWeight: 700, textDecoration: 'none', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid rgba(255,255,255,0.4)' }}>
                  <i className="fas fa-headset"></i> Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
