import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api/client'
import HospitalCard from '../components/HospitalCard'
import toast from 'react-hot-toast'

const LOCATIONS = ['', 'Hyderabad', 'Khammam', 'Secunderabad', 'Warangal', 'Vizag']
const RATINGS = [{ label: 'Any Rating', value: '' }, { label: '4.5+', value: '4.5' }, { label: '4.0+', value: '4.0' }, { label: '3.5+', value: '3.5' }]

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [minRating, setMinRating] = useState('')
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const loc = searchParams.get('location') || ''
    setLocation(loc)
    fetchHospitals({ location: loc })
  }, [])

  const fetchHospitals = async (params = {}) => {
    setLoading(true)
    try {
      const q = {}
      if (params.location ?? location) q.location = params.location ?? location
      if (params.search ?? search) q.search = params.search ?? search
      if (params.min_rating ?? minRating) q.min_rating = params.min_rating ?? minRating
      const { data } = await api.get('/hospitals', { params: q })
      setHospitals(data)
    } catch {
      toast.error('Failed to load hospitals')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => fetchHospitals({ location, search, min_rating: minRating })

  const handleReset = () => {
    setSearch(''); setLocation(''); setMinRating('')
    fetchHospitals({ location: '', search: '', min_rating: '' })
  }

  return (
    <div>
      <div className="page-title">
        <h1>Find the Best Hospitals</h1>
        <p>Browse our network of trusted hospitals with verified doctors and modern facilities</p>
      </div>

      <div className="container" style={{ paddingTop: '2rem' }}>
        {/* Filters */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: '2 1 220px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6, color: 'var(--gray)' }}>SEARCH</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-search" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)', fontSize: '0.85rem' }}></i>
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Search hospitals..."
                  style={{ width: '100%', padding: '11px 12px 11px 36px', border: '1.5px solid #dde3ec', borderRadius: 10, fontFamily: 'var(--font-main)', fontSize: '0.95rem' }}
                />
              </div>
            </div>

            <div style={{ flex: '1 1 160px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6, color: 'var(--gray)' }}>LOCATION</label>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #dde3ec', borderRadius: 10, fontFamily: 'var(--font-main)', fontSize: '0.95rem', background: 'white', color: 'var(--dark)' }}>
                <option value="">All Locations</option>
                {LOCATIONS.filter(Boolean).map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div style={{ flex: '1 1 140px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6, color: 'var(--gray)' }}>MIN RATING</label>
              <select value={minRating} onChange={e => setMinRating(e.target.value)}
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #dde3ec', borderRadius: 10, fontFamily: 'var(--font-main)', fontSize: '0.95rem', background: 'white', color: 'var(--dark)' }}>
                {RATINGS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleSearch} className="btn btn-primary" style={{ borderRadius: 10, padding: '11px 22px', whiteSpace: 'nowrap' }}>
                <i className="fas fa-filter"></i> Apply
              </button>
              <button onClick={handleReset} style={{ padding: '11px 16px', border: '1.5px solid var(--light-gray)', borderRadius: 10, background: 'white', cursor: 'pointer', fontFamily: 'var(--font-main)', color: 'var(--gray)', fontWeight: 600, fontSize: '0.9rem' }}>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="loader-wrap">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading hospitals...</p>
          </div>
        ) : hospitals.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-hospital"></i>
            <h3 style={{ marginBottom: 8 }}>No hospitals found</h3>
            <p>Try adjusting your filters or search a different location.</p>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--gray)', marginBottom: '1.2rem', fontSize: '0.92rem' }}>
              Showing <strong style={{ color: 'var(--dark)' }}>{hospitals.length}</strong> hospitals
            </p>
            <div className="grid-3">
              {hospitals.map(h => <HospitalCard key={h.id} hospital={h} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
