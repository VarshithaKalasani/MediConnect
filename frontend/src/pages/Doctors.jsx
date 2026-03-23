import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api/client'
import DoctorCard from '../components/DoctorCard'
import toast from 'react-hot-toast'

const SPECIALTIES = [
  'All', 'Cardiologist', 'Dermatologist', 'Neurologist',
  'Orthopedic Surgeon', 'Pediatrician', 'Gynecologist',
  'Oncologist', 'Gastroenterologist', 'Urologist',
]

export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('All')
  const [searchParams] = useSearchParams()

  const hospitalId = searchParams.get('hospital_id')
  const hospitalName = searchParams.get('hospital')
  const initialSpecialty = searchParams.get('specialty')

  useEffect(() => {
    const spec = initialSpecialty || 'All'
    setSpecialty(spec)
    fetchDoctors({ specialty: spec === 'All' ? '' : spec })
  }, [])

  const fetchDoctors = async (params = {}) => {
    setLoading(true)
    try {
      const q = {}
      if (hospitalId) q.hospital_id = hospitalId
      if (params.specialty !== undefined ? params.specialty : (specialty !== 'All' ? specialty : ''))
        q.specialty = params.specialty !== undefined ? params.specialty : specialty
      if (params.search !== undefined ? params.search : search)
        q.search = params.search !== undefined ? params.search : search
      const { data } = await api.get('/doctors', { params: q })
      setDoctors(data)
    } catch {
      toast.error('Failed to load doctors')
    } finally {
      setLoading(false)
    }
  }

  const handleSpecialty = (spec) => {
    setSpecialty(spec)
    fetchDoctors({ specialty: spec === 'All' ? '' : spec, search })
  }

  const handleSearch = () => fetchDoctors({ specialty: specialty === 'All' ? '' : specialty, search })

  return (
    <div>
      <div className="page-title">
        <h1>{hospitalName ? `Doctors at ${decodeURIComponent(hospitalName)}` : 'Find the Right Doctor'}</h1>
        <p>Browse our network of verified doctors with various specializations</p>
      </div>

      <div className="container" style={{ paddingTop: '2rem' }}>
        {/* Search + Filters */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          {/* Search row */}
          <div style={{ display: 'flex', gap: 10, marginBottom: '1.2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
              <i className="fas fa-search" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)', fontSize: '0.85rem' }}></i>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Search doctors by name..."
                style={{ width: '100%', padding: '11px 12px 11px 36px', border: '1.5px solid #dde3ec', borderRadius: 10, fontFamily: 'var(--font-main)', fontSize: '0.95rem' }}
              />
            </div>
            <button onClick={handleSearch} className="btn btn-primary" style={{ borderRadius: 10 }}>
              <i className="fas fa-search"></i> Search
            </button>
            {hospitalId && (
              <a href="/doctors" style={{ padding: '11px 16px', border: '1.5px solid var(--light-gray)', borderRadius: 10, background: 'white', color: 'var(--gray)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                <i className="fas fa-times"></i> Clear Hospital
              </a>
            )}
          </div>

          {/* Specialty pills */}
          <div>
            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--gray)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Filter by Specialty</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SPECIALTIES.map(s => (
                <button key={s} onClick={() => handleSpecialty(s)} style={{
                  padding: '7px 16px', borderRadius: 50, cursor: 'pointer',
                  fontFamily: 'var(--font-main)', fontSize: '0.85rem', fontWeight: 600,
                  border: `1.5px solid ${specialty === s ? 'var(--primary)' : '#dde3ec'}`,
                  background: specialty === s ? 'var(--primary)' : 'white',
                  color: specialty === s ? 'white' : 'var(--dark)',
                  transition: 'all 0.18s',
                }}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="loader-wrap">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading doctors...</p>
          </div>
        ) : doctors.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-user-md"></i>
            <h3 style={{ marginBottom: 8 }}>No doctors found</h3>
            <p>Try a different specialty or search term.</p>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--gray)', marginBottom: '1.2rem', fontSize: '0.92rem' }}>
              Showing <strong style={{ color: 'var(--dark)' }}>{doctors.length}</strong> doctors
              {specialty !== 'All' && <> · <span style={{ color: 'var(--primary)' }}>{specialty}</span></>}
            </p>
            <div className="grid-3">
              {doctors.map(d => <DoctorCard key={d.id} doctor={d} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
