import { useState } from 'react'
import BookingModal from './BookingModal'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function DoctorCard({ doctor }) {
  const [showModal, setShowModal] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleBook = () => {
    if (!user) { navigate('/login'); return }
    setShowModal(true)
  }

  return (
    <>
      <div className="card fade-in" style={{ textAlign: 'center' }}>
        {/* Avatar area */}
        <div style={{
          height: 155,
          background: `linear-gradient(145deg, ${doctor.image_color}cc, ${doctor.image_color})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '3.2rem', color: 'rgba(255,255,255,0.9)',
          position: 'relative',
        }}>
          <i className="fas fa-user-md"></i>

          {/* Rating */}
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(255,255,255,0.97)',
            borderRadius: 20, padding: '4px 10px',
            fontSize: '0.77rem', fontWeight: 700,
            color: '#263238',
            display: 'flex', alignItems: 'center', gap: 4,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }}>
            <i className="fas fa-star" style={{ color: '#f59e0b' }}></i>
            {doctor.rating}
          </div>

          {/* Exp badge */}
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(0,0,0,0.4)',
            borderRadius: 20, padding: '3px 10px',
            fontSize: '0.73rem', color: 'rgba(255,255,255,0.9)',
          }}>
            {doctor.experience_years}yr exp
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.25rem' }}>
          <h3 style={{ marginBottom: 3, fontSize: '1.08rem', fontWeight: 700 }}>{doctor.name}</h3>
          <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: 8 }}>
            {doctor.specialty}
          </p>
          <p style={{ color: 'var(--gray)', fontSize: '0.84rem', marginBottom: 12, lineHeight: 1.5 }}>
            {doctor.description}
          </p>

          {/* Hospital */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, color: 'var(--gray)', fontSize: '0.8rem', marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <i className="fas fa-hospital" style={{ color: 'var(--primary)' }}></i>
              {doctor.hospital_name}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <i className="fas fa-map-marker-alt" style={{ color: 'var(--primary)' }}></i>
              {doctor.hospital_location}
            </span>
          </div>

          {/* Features */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center', marginBottom: 14 }}>
            {(doctor.features || []).map(f => (
              <span key={f} className="feature-tag">{f}</span>
            ))}
          </div>

          {/* Fee + Book */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0', borderTop: '1px solid #f0f4f8', marginBottom: 14,
          }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--gray)' }}>
              <i className="fas fa-calendar-alt" style={{ color: 'var(--primary)', marginRight: 5 }}></i>
              {(doctor.available_days || []).slice(0, 3).join(', ')}
              {(doctor.available_days || []).length > 3 ? '...' : ''}
            </span>
            <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.05rem' }}>
              ₹{doctor.consultation_fee}
            </span>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', borderRadius: 10, padding: '11px' }}
            onClick={handleBook}
          >
            <i className="fas fa-calendar-check"></i> Book Appointment
          </button>
        </div>
      </div>

      {showModal && (
        <BookingModal doctor={doctor} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
