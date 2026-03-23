import { Link } from 'react-router-dom'

export default function Footer() {
  const socialIcons = ['facebook-f', 'twitter', 'instagram', 'linkedin-in']
  const quickLinks = [['/', 'Home'], ['/hospitals', 'Hospitals'], ['/doctors', 'Doctors'], ['/services', 'Services'], ['/about', 'About Us']]
  const serviceLinks = [['Doctor Appointments'], ['Health Checkups'], ['Online Consultations'], ['Medical Records'], ['Emergency Services']]

  return (
    <footer style={{ background: '#1b2b38', color: 'white', padding: '3.5rem 0 0', marginTop: 'auto' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 40, marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              color: 'white', textDecoration: 'none',
              fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700,
              marginBottom: 16,
            }}>
              <i className="fas fa-hospital" style={{ color: '#ffeb3b' }}></i>
              MediConnect
            </Link>
            <p style={{ color: '#90a4ae', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: 20 }}>
              Book doctor appointments easily. Find verified healthcare providers near you, any time.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socialIcons.map(icon => (
                <a key={icon} href="#" style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#90a4ae', fontSize: '0.85rem',
                  transition: 'all 0.2s', textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#90a4ae' }}>
                  <i className={`fab fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 18, color: 'white', textTransform: 'uppercase', letterSpacing: 1 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none' }}>
              {quickLinks.map(([path, label]) => (
                <li key={path} style={{ marginBottom: 11 }}>
                  <Link to={path} style={{ color: '#90a4ae', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'white'}
                    onMouseLeave={e => e.target.style.color = '#90a4ae'}>
                    <i className="fas fa-chevron-right" style={{ fontSize: '0.65rem', marginRight: 8, color: 'var(--primary)' }}></i>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 18, color: 'white', textTransform: 'uppercase', letterSpacing: 1 }}>Services</h4>
            <ul style={{ listStyle: 'none' }}>
              {serviceLinks.map(([label]) => (
                <li key={label} style={{ marginBottom: 11 }}>
                  <Link to="/services" style={{ color: '#90a4ae', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'white'}
                    onMouseLeave={e => e.target.style.color = '#90a4ae'}>
                    <i className="fas fa-chevron-right" style={{ fontSize: '0.65rem', marginRight: 8, color: 'var(--primary)' }}></i>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 18, color: 'white', textTransform: 'uppercase', letterSpacing: 1 }}>Contact Us</h4>
            <ul style={{ listStyle: 'none' }}>
              {[
                ['fa-map-marker-alt', 'Hitech City, Hyderabad, Telangana 500081'],
                ['fa-phone-alt', '+91 9998887771 / 9998887772'],
                ['fa-envelope', 'info@mediconnect.com'],
                ['fa-clock', 'Mon–Fri: 8AM–8PM | Sat: 9AM–6PM'],
              ].map(([icon, text]) => (
                <li key={text} style={{ marginBottom: 13, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <i className={`fas ${icon}`} style={{ color: 'var(--primary)', marginTop: 3, flexShrink: 0, fontSize: '0.85rem' }}></i>
                  <span style={{ color: '#90a4ae', fontSize: '0.88rem', lineHeight: 1.5 }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1.4rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ color: '#607d8b', fontSize: '0.87rem' }}>
            © 2025 MediConnect. All rights reserved. Designed for better healthcare.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <a key={item} href="#" style={{ color: '#607d8b', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = '#607d8b'}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
