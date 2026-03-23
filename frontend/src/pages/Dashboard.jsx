import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const STATUS_CONFIG = {
  confirmed: { color: '#4caf50', bg: '#e8f5e9', label: 'Confirmed' },
  pending:   { color: '#ff9800', bg: '#fff3e0', label: 'Pending' },
  cancelled: { color: '#f44336', bg: '#fce4ec', label: 'Cancelled' },
}

function StatCard({ icon, count, label, color }) {
  return (
    <div className="card" style={{ padding: '1.4rem', textAlign: 'center' }}>
      <div style={{ width: 52, height: 52, borderRadius: '50%', background: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
        <i className={`fas ${icon} fa-lg`} style={{ color }}></i>
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 800, color, lineHeight: 1 }}>{count}</div>
      <div style={{ color: 'var(--gray)', fontSize: '0.85rem', marginTop: 4 }}>{label}</div>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('upcoming')

  useEffect(() => { fetchAppointments() }, [])

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/appointments/my')
      setAppointments(data)
    } catch {
      toast.error('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  const cancelAppointment = async (id) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return
    try {
      await api.delete(`/appointments/${id}`)
      toast.success('Appointment cancelled')
      fetchAppointments()
    } catch {
      toast.error('Failed to cancel appointment')
    }
  }

  const today = new Date().toISOString().split('T')[0]
  const upcoming = appointments.filter(a => a.status !== 'cancelled' && a.appointment_date >= today)
  const past     = appointments.filter(a => a.status === 'cancelled' || a.appointment_date < today)
  const displayed = activeTab === 'upcoming' ? upcoming : past

  const stats = [
    { icon: 'fa-calendar-alt', count: appointments.length, label: 'Total Bookings', color: '#1a73e8' },
    { icon: 'fa-clock',        count: upcoming.length,     label: 'Upcoming',       color: '#4caf50' },
    { icon: 'fa-check-circle', count: past.filter(a => a.status !== 'cancelled').length, label: 'Completed', color: '#ff9800' },
    { icon: 'fa-times-circle', count: appointments.filter(a => a.status === 'cancelled').length, label: 'Cancelled', color: '#f44336' },
  ]

  return (
    <div>
      <div className="page-title">
        <h1>My Dashboard</h1>
        <p>Welcome back, <strong>{user?.full_name}</strong> 👋</p>
      </div>

      <div className="container" style={{ padding: '2.5rem 20px' }}>
        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: '2rem' }}>
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Profile + Quick Actions */}
        <div className="grid-2" style={{ marginBottom: '2rem', gap: 20 }}>
          {/* Profile */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1.2rem', fontSize: '1.2rem', color: 'var(--primary-dark)' }}>
              <i className="fas fa-user-circle" style={{ marginRight: 10, color: 'var(--primary)' }}></i>
              Profile Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['fa-user', 'Full Name', user?.full_name],
                ['fa-envelope', 'Email', user?.email],
                ['fa-phone', 'Phone', user?.phone],
                ['fa-at', 'Username', `@${user?.username}`],
              ].map(([icon, label, value]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#f8fbff', borderRadius: 10 }}>
                  <div style={{ width: 34, height: 34, background: '#e3f2fd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className={`fas ${icon}`} style={{ color: 'var(--primary)', fontSize: '0.85rem' }}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray)', fontWeight: 600 }}>{label}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1.2rem', fontSize: '1.2rem', color: 'var(--primary-dark)' }}>
              <i className="fas fa-bolt" style={{ marginRight: 10, color: 'var(--primary)' }}></i>
              Quick Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: 'fa-search', label: 'Find a Doctor', sub: 'Browse by specialty', to: '/doctors', color: '#e3f2fd' },
                { icon: 'fa-hospital', label: 'Explore Hospitals', sub: 'View all hospitals', to: '/hospitals', color: '#e8f5e9' },
                { icon: 'fa-stethoscope', label: 'Our Services', sub: 'What we offer', to: '/services', color: '#fff3e0' },
                { icon: 'fa-phone-alt', label: 'Emergency Help', sub: 'Call 108 anytime', to: '/contact', color: '#fce4ec' },
              ].map(({ icon, label, sub, to, color }) => (
                <Link key={label} to={to} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
                  background: '#f8fbff', borderRadius: 11, textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
                  onMouseLeave={e => e.currentTarget.style.background = '#f8fbff'}>
                  <div style={{ width: 38, height: 38, background: color, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className={`fas ${icon}`} style={{ color: 'var(--primary)', fontSize: '0.9rem' }}></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--dark)', fontSize: '0.92rem' }}>{label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{sub}</div>
                  </div>
                  <i className="fas fa-chevron-right" style={{ marginLeft: 'auto', color: 'var(--light-gray)', fontSize: '0.8rem' }}></i>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 12 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary-dark)' }}>
              <i className="fas fa-calendar-alt" style={{ marginRight: 10, color: 'var(--primary)' }}></i>
              My Appointments
            </h3>
            <Link to="/doctors" className="btn btn-primary" style={{ fontSize: '0.88rem', padding: '8px 18px' }}>
              <i className="fas fa-plus"></i> New Appointment
            </Link>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, marginBottom: '1.5rem', background: '#f0f4f8', borderRadius: 10, padding: 4, width: 'fit-content' }}>
            {[['upcoming', 'Upcoming', upcoming.length], ['past', 'Past', past.length]].map(([tab, label, count]) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.88rem',
                background: activeTab === tab ? 'white' : 'transparent',
                color: activeTab === tab ? 'var(--primary-dark)' : 'var(--gray)',
                boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 7,
              }}>
                {label}
                <span style={{ background: activeTab === tab ? 'var(--primary)' : 'var(--light-gray)', color: activeTab === tab ? 'white' : 'var(--gray)', borderRadius: 20, padding: '1px 8px', fontSize: '0.75rem' }}>
                  {count}
                </span>
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loader-wrap"><i className="fas fa-spinner fa-spin"></i><p>Loading...</p></div>
          ) : displayed.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-calendar-times"></i>
              <h4 style={{ marginBottom: 8, color: 'var(--dark)' }}>
                {activeTab === 'upcoming' ? 'No upcoming appointments' : 'No past appointments'}
              </h4>
              <p style={{ fontSize: '0.9rem' }}>
                {activeTab === 'upcoming' && <Link to="/doctors" style={{ color: 'var(--primary)', fontWeight: 600 }}>Book an appointment now →</Link>}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {displayed.map(a => {
                const cfg = STATUS_CONFIG[a.status] || STATUS_CONFIG.pending
                const isUpcomingAppt = a.status === 'confirmed' && a.appointment_date >= today
                return (
                  <div key={a.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexWrap: 'wrap', gap: 12,
                    padding: '1.1rem 1.3rem', borderRadius: 12,
                    border: '1.5px solid #eef2f7',
                    background: 'white',
                    transition: 'border-color 0.2s',
                  }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <i className="fas fa-user-md" style={{ color: 'var(--primary)' }}></i>
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.97rem' }}>{a.doctor_name}</div>
                          <div style={{ color: 'var(--primary)', fontSize: '0.82rem', fontWeight: 600 }}>{a.doctor_specialty}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--gray)', display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 6, marginLeft: 50 }}>
                        <span><i className="fas fa-hospital" style={{ marginRight: 5, color: 'var(--primary)' }}></i>{a.hospital_name}</span>
                        <span><i className="fas fa-calendar" style={{ marginRight: 5, color: 'var(--primary)' }}></i>{a.appointment_date}</span>
                        <span><i className="fas fa-clock" style={{ marginRight: 5, color: 'var(--primary)' }}></i>{a.appointment_time}</span>
                      </div>
                      {a.notes && (
                        <div style={{ marginTop: 6, marginLeft: 50, fontSize: '0.8rem', color: 'var(--gray)', fontStyle: 'italic' }}>
                          "{a.notes}"
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{
                        padding: '5px 14px', borderRadius: 20,
                        fontSize: '0.8rem', fontWeight: 700,
                        background: cfg.bg, color: cfg.color,
                      }}>
                        {cfg.label}
                      </span>
                      {isUpcomingAppt && (
                        <button
                          onClick={() => cancelAppointment(a.id)}
                          style={{
                            padding: '6px 14px', borderRadius: 8,
                            border: '1.5px solid #f44336', background: 'white',
                            color: '#f44336', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700,
                            fontFamily: 'var(--font-main)', transition: 'all 0.2s',
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
