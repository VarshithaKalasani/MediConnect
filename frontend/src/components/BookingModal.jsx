import { useState } from 'react'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
]

export default function BookingModal({ doctor, onClose }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  // Min date = today
  const today = new Date().toISOString().split('T')[0]
  // Max date = 60 days from now
  const maxDate = new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0]

  const handleBook = async () => {
    if (!user) { navigate('/login'); return }
    if (!date) { toast.error('Please select a date'); return }
    if (!time) { toast.error('Please select a time slot'); return }

    setLoading(true)
    try {
      await api.post('/appointments', {
        doctor_id: doctor.id,
        hospital_id: doctor.hospital_id,
        appointment_date: date,
        appointment_time: time,
        notes: notes.trim() || null,
      })
      toast.success('🎉 Appointment booked successfully!')
      onClose()
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Booking failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(15,25,40,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white', borderRadius: 18, padding: '2rem',
          width: '100%', maxWidth: 500,
          boxShadow: '0 24px 70px rgba(0,0,0,0.22)',
          animation: 'fadeInUp 0.3s ease',
          maxHeight: '90vh', overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-dark)', fontSize: '1.55rem', marginBottom: 4 }}>
              Book Appointment
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--dark)' }}>{doctor.name}</strong> · {doctor.specialty}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#f0f4f8', border: 'none', borderRadius: '50%',
              width: 34, height: 34, cursor: 'pointer', fontSize: '1rem',
              color: 'var(--gray)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >✕</button>
        </div>

        {/* Doctor Info Card */}
        <div style={{
          background: 'linear-gradient(135deg, #f0f7ff, #e8f4fe)',
          borderRadius: 12, padding: '1rem 1.2rem',
          marginBottom: '1.5rem',
          border: '1px solid #dbeafe',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--gray)', marginBottom: 3 }}>
                <i className="fas fa-hospital" style={{ color: 'var(--primary)', marginRight: 6 }}></i>
                {doctor.hospital_name} · {doctor.hospital_location}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--gray)' }}>
                <i className="fas fa-clock" style={{ color: 'var(--primary)', marginRight: 6 }}></i>
                Available: {(doctor.available_days || []).join(', ')}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>Consultation Fee</div>
              <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.3rem' }}>₹{doctor.consultation_fee}</div>
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="form-group">
          <label><i className="fas fa-calendar" style={{ color: 'var(--primary)', marginRight: 7 }}></i>Appointment Date</label>
          <input type="date" value={date} min={today} max={maxDate} onChange={e => setDate(e.target.value)} />
        </div>

        {/* Time Slots */}
        <div className="form-group">
          <label><i className="fas fa-clock" style={{ color: 'var(--primary)', marginRight: 7 }}></i>Select Time Slot</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
            {TIME_SLOTS.map(t => (
              <button
                key={t}
                onClick={() => setTime(t)}
                type="button"
                style={{
                  padding: '8px 14px', borderRadius: 9,
                  border: `1.5px solid ${time === t ? 'var(--primary)' : '#dde3ec'}`,
                  background: time === t ? 'var(--primary)' : 'white',
                  color: time === t ? 'white' : 'var(--dark)',
                  cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                  fontFamily: 'var(--font-main)',
                  transition: 'all 0.15s',
                }}
              >{t}</button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="form-group">
          <label><i className="fas fa-notes-medical" style={{ color: 'var(--primary)', marginRight: 7 }}></i>Notes <span style={{ color: 'var(--gray)', fontWeight: 400 }}>(optional)</span></label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={2}
            placeholder="Describe your symptoms or any special requests..."
          />
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: '13px', borderRadius: 10,
              border: '1.5px solid var(--light-gray)',
              background: 'white', cursor: 'pointer',
              fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.95rem',
              color: 'var(--gray)',
            }}
          >Cancel</button>
          <button
            onClick={handleBook}
            disabled={loading}
            className="btn btn-primary"
            style={{ flex: 2, justifyContent: 'center', borderRadius: 10, padding: '13px', fontSize: '0.98rem' }}
          >
            {loading
              ? <><i className="fas fa-spinner fa-spin"></i> Booking...</>
              : <><i className="fas fa-calendar-check"></i> Confirm Appointment</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}
