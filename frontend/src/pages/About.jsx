const TEAM = [
  { name: 'Dr. Arjun Reddy', role: 'Founder & CEO', desc: 'Former healthcare executive with 15+ years in medical technology and patient care systems.', color: '#bbdefb', initials: 'AR' },
  { name: 'Priya Sharma', role: 'Chief Medical Officer', desc: 'Renowned physician with deep expertise in healthcare management and clinical excellence.', color: '#ffcdd2', initials: 'PS' },
  { name: 'Rahul Kapoor', role: 'Chief Technology Officer', desc: 'Full-stack engineer and architect passionate about tech solutions that improve lives.', color: '#c8e6c9', initials: 'RK' },
  { name: 'Anjali Patel', role: 'Head of Operations', desc: 'Operations specialist laser-focused on delivering seamless patient experiences at scale.', color: '#ffe0b2', initials: 'AP' },
]

const MISSIONS = [
  { icon: 'fa-heartbeat', title: 'Patient Care First', desc: 'Every decision we make centers around patient well-being and delivering the care people deserve.', color: '#e3f2fd', iconColor: '#1a73e8' },
  { icon: 'fa-hand-holding-heart', title: 'Universal Accessibility', desc: 'We believe quality healthcare should reach everyone, regardless of location or background.', color: '#e8f5e9', iconColor: '#4caf50' },
  { icon: 'fa-lightbulb', title: 'Continuous Innovation', desc: 'We relentlessly improve our platform with the latest technology to serve patients better.', color: '#fff8e1', iconColor: '#ff9800' },
]

export default function About() {
  return (
    <div>
      <div className="page-title">
        <h1>About MediConnect</h1>
        <p>Learn about our mission to make quality healthcare accessible and convenient for everyone</p>
      </div>

      {/* About section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 50 }}>
            <div>
              <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 14 }}>Our Story</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.1rem', color: 'var(--primary-dark)', marginBottom: '1.2rem', lineHeight: 1.25 }}>
                We're Revolutionizing Healthcare Access
              </h2>
              <p style={{ color: 'var(--gray)', marginBottom: '1.2rem', lineHeight: 1.75 }}>
                MediConnect was founded in 2020 with a simple yet powerful mission: to make quality healthcare accessible to everyone across India. We recognized the daily struggles people face — navigating hospital queues, finding the right specialist, or even knowing where to start.
              </p>
              <p style={{ color: 'var(--gray)', marginBottom: '2rem', lineHeight: 1.75 }}>
                Our platform bridges the gap between patients and verified doctors, making it effortless to book appointments, consult online, and manage health records — all in one trusted place.
              </p>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[['50,000+', 'Happy Patients'], ['2,000+', 'Verified Doctors'], ['500+', 'Hospitals']].map(([num, label]) => (
                  <div key={label} className="card" style={{ padding: '1.2rem', textAlign: 'center', background: '#f8fbff' }}>
                    <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{num}</div>
                    <div style={{ color: 'var(--gray)', fontSize: '0.8rem', marginTop: 5 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div style={{ position: 'relative' }}>
              <div style={{
                background: 'linear-gradient(135deg, #1a73e8, #0d47a1)',
                borderRadius: 20, padding: '3rem', color: 'white', textAlign: 'center',
                boxShadow: '0 20px 60px rgba(26,115,232,0.3)',
              }}>
                <i className="fas fa-hospital-alt" style={{ fontSize: '5rem', opacity: 0.9, marginBottom: '1.5rem', display: 'block' }}></i>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '0.7rem' }}>Founded in 2020</h3>
                <p style={{ opacity: 0.88, lineHeight: 1.65 }}>Started in Hyderabad, now serving patients across Telangana and Andhra Pradesh with a mission to expand nationwide.</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                  {['Hyderabad', 'Khammam', 'Warangal', 'Secunderabad'].map(city => (
                    <span key={city} style={{ background: 'rgba(255,255,255,0.18)', padding: '4px 14px', borderRadius: 20, fontSize: '0.82rem', fontWeight: 600 }}>{city}</span>
                  ))}
                </div>
              </div>
              {/* Decorative dot */}
              <div style={{ position: 'absolute', top: -16, right: -16, width: 80, height: 80, borderRadius: '50%', background: 'rgba(26,115,232,0.12)', zIndex: -1 }} />
              <div style={{ position: 'absolute', bottom: -20, left: -20, width: 60, height: 60, borderRadius: '50%', background: 'rgba(76,175,80,0.12)', zIndex: -1 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section" style={{ background: '#f8fbff' }}>
        <div className="container">
          <div className="section-title">
            <h2>Our Mission & Values</h2>
            <p>The principles that drive everything we do at MediConnect</p>
          </div>
          <div className="grid-3">
            {MISSIONS.map(({ icon, title, desc, color, iconColor }) => (
              <div key={title} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ width: 76, height: 76, background: color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem', fontSize: '2rem', color: iconColor }}>
                  <i className={`fas ${icon}`}></i>
                </div>
                <h3 style={{ marginBottom: 12, fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>{title}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-title">
            <h2>Our Leadership Team</h2>
            <p>Meet the passionate people driving MediConnect's mission forward</p>
          </div>
          <div className="grid-4">
            {TEAM.map(({ name, role, desc, color, initials }) => (
              <div key={name} className="card" style={{ textAlign: 'center' }}>
                <div style={{ height: 160, background: `linear-gradient(135deg, ${color}cc, ${color})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.85)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-dark)', fontFamily: 'var(--font-display)' }}>
                    {initials}
                  </div>
                </div>
                <div style={{ padding: '1.3rem' }}>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: 4 }}>{name}</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: 10 }}>{role}</p>
                  <p style={{ color: 'var(--gray)', fontSize: '0.84rem', lineHeight: 1.6, marginBottom: 14 }}>{desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                    {['fa-linkedin-in', 'fa-twitter', 'fa-envelope'].map(icon => (
                      <a key={icon} href="#" style={{ width: 34, height: 34, background: '#f0f4f8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '0.82rem', textDecoration: 'none', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white' }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#f0f4f8'; e.currentTarget.style.color = 'var(--primary)' }}>
                        <i className={`fab ${icon}`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
