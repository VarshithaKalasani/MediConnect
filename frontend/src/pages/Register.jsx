import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const FIELDS = [
  { key: 'full_name',  label: 'Full Name',       type: 'text',     placeholder: 'Dr. Ramesh Babu',       icon: 'fa-user' },
  { key: 'email',      label: 'Email Address',    type: 'email',    placeholder: 'you@example.com',       icon: 'fa-envelope' },
  { key: 'phone',      label: 'Phone Number',     type: 'tel',      placeholder: '+91 9999999999',        icon: 'fa-phone' },
  { key: 'username',   label: 'Username',         type: 'text',     placeholder: 'Choose a username',     icon: 'fa-at' },
]

export default function Register() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', username: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    if (!/^\d{10,}$/.test(form.phone.replace(/[\s\+\-]/g, ''))) { toast.error('Please enter a valid phone number'); return }

    setLoading(true)
    try {
      await register({ full_name: form.full_name, email: form.email, phone: form.phone, username: form.username, password: form.password })
      toast.success('Account created! Welcome to MediConnect 🎉')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3
  const strengthColors = ['#e0e0e0', '#f44336', '#ff9800', '#4caf50']
  const strengthLabels = ['', 'Weak', 'Medium', 'Strong']

  return (
    <div style={{
      minHeight: '80vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '2rem',
      background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fe 100%)',
    }}>
      <div style={{ width: '100%', maxWidth: 500 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 68, height: 68, background: 'linear-gradient(135deg, #4caf50, #2e7d32)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(76,175,80,0.3)' }}>
            <i className="fas fa-user-plus" style={{ color: 'white', fontSize: '1.6rem' }}></i>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-dark)', fontSize: '2rem', marginBottom: 6 }}>Create Account</h1>
          <p style={{ color: 'var(--gray)' }}>Join MediConnect and start booking appointments</p>
        </div>

        <div className="card" style={{ padding: '2.2rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              {FIELDS.map(({ key, label, type, placeholder, icon }) => (
                <div className="form-group" key={key} style={{ gridColumn: key === 'full_name' || key === 'email' ? 'auto' : 'auto' }}>
                  <label>{label}</label>
                  <div style={{ position: 'relative' }}>
                    <i className={`fas ${icon}`} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)', fontSize: '0.85rem' }}></i>
                    <input type={type} placeholder={placeholder} value={form[key]} onChange={set(key)} required style={{ paddingLeft: 38 }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-lock" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)', fontSize: '0.85rem' }}></i>
                <input type={showPw ? 'text' : 'password'} placeholder="Min. 6 characters" value={form.password} onChange={set('password')} required style={{ paddingLeft: 38, paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray)' }}>
                  <i className={`fas ${showPw ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {/* Strength indicator */}
              {form.password && (
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= strength ? strengthColors[strength] : '#e0e0e0', transition: 'background 0.3s' }} />
                  ))}
                  <span style={{ fontSize: '0.75rem', color: strengthColors[strength], fontWeight: 600, minWidth: 50 }}>{strengthLabels[strength]}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-lock" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)', fontSize: '0.85rem' }}></i>
                <input type="password" placeholder="Repeat your password" value={form.confirm} onChange={set('confirm')} required style={{ paddingLeft: 38, borderColor: form.confirm && form.confirm !== form.password ? '#f44336' : undefined }} />
              </div>
              {form.confirm && form.confirm !== form.password && (
                <p style={{ color: '#f44336', fontSize: '0.8rem', marginTop: 4 }}>
                  <i className="fas fa-exclamation-circle" style={{ marginRight: 4 }}></i>Passwords don't match
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', borderRadius: 11, padding: '14px', fontSize: '1rem', marginTop: 4 }}
            >
              {loading
                ? <><i className="fas fa-spinner fa-spin"></i> Creating Account...</>
                : <><i className="fas fa-user-plus"></i> Create Account</>
              }
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f0f4f8' }}>
            <p style={{ color: 'var(--gray)', fontSize: '0.92rem' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
                Sign in →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
