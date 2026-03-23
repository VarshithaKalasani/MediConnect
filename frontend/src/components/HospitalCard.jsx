import { useNavigate } from 'react-router-dom'

export default function HospitalCard({ hospital }) {
  const navigate = useNavigate()

  return (
    <div className="card fade-in">
      {/* Image area */}
      <div style={{
        height: 170,
        background: `linear-gradient(145deg, ${hospital.image_color}dd, ${hospital.image_color})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '3.5rem', color: 'rgba(255,255,255,0.9)',
        position: 'relative',
      }}>
        <i className="fas fa-hospital"></i>

        {/* Rating badge */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(255,255,255,0.97)',
          borderRadius: 20, padding: '4px 11px',
          fontSize: '0.78rem', fontWeight: 700,
          color: '#263238',
          display: 'flex', alignItems: 'center', gap: 5,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>
          <i className="fas fa-star" style={{ color: '#f59e0b' }}></i>
          {hospital.rating}
          <span style={{ color: '#90a4ae', fontWeight: 400 }}>({hospital.total_reviews?.toLocaleString()})</span>
        </div>

        {/* Location pill */}
        <div style={{
          position: 'absolute', bottom: 12, right: 12,
          background: 'rgba(0,0,0,0.45)',
          borderRadius: 20, padding: '3px 10px',
          fontSize: '0.75rem', color: 'rgba(255,255,255,0.95)',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <i className="fas fa-map-marker-alt"></i>
          {hospital.location}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.3rem' }}>
        <h3 style={{ marginBottom: 6, fontSize: '1.15rem', fontWeight: 700 }}>{hospital.name}</h3>
        <p style={{ color: 'var(--gray)', fontSize: '0.87rem', marginBottom: 12, lineHeight: 1.55 }}>{hospital.description}</p>

        <div style={{ display: 'flex', gap: 18, color: 'var(--gray)', fontSize: '0.83rem', marginBottom: 13 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="fas fa-user-md" style={{ color: 'var(--primary)' }}></i>
            {hospital.doctor_count}+ Doctors
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="fas fa-phone" style={{ color: 'var(--primary)' }}></i>
            {hospital.phone || 'Available'}
          </span>
        </div>

        {/* Feature tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {(hospital.features || []).map(f => (
            <span key={f} className="feature-tag">{f}</span>
          ))}
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', borderRadius: 10, padding: '11px' }}
          onClick={() => navigate(`/doctors?hospital_id=${hospital.id}&hospital=${encodeURIComponent(hospital.name)}`)}
        >
          <i className="fas fa-user-md"></i> View Doctors
        </button>
      </div>
    </div>
  )
}
