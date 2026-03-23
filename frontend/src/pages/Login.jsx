import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const [form, setForm] = useState({ email_or_phone: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email_or_phone || !form.password) { toast.error('Please fill in all fields'); return }
    setLoading(true)
    try {
      await login(form.email_or_phone, form.password)
      toast.success('Welcome back! 👋')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '80vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '2rem',
      background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fe 100%)',
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 68, height: 68, background: 'linear-gradient(135deg, #1a73e8, #0d47a1)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(26,115,232,0.3)' }}>
            <i className="fas fa-hospital" style={{ color: 'white', fontSize: '1.6rem' }}></i>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-dark)', fontSize: '2rem', marginBottom: 6 }}>Welcome Back</h1>
          <p style={{ color: 'var(--gray)' }}>Sign in to your MediConnect account</p>
        </div>

        <div className="card" style={{ padding: '2.2rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email or Phone Number</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-user" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)', fontSize: '0.88rem' }}></i>
                <input
                  type="text"
                  placeholder="Enter email or phone..."
                  value={form.email_or_phone}
                  onChange={set('email_or_phone')}
                  required
                  style={{ paddingLeft: 40 }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <i className="fas fa-lock" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)', fontSize: '0.88rem' }}></i>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password..."
                  value={form.password}
                  onChange={set('password')}
                  required
                  style={{ paddingLeft: 40, paddingRight: 44 }}
                />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray)' }}>
                  <i className={`fas ${showPw ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', borderRadius: 11, padding: '14px', fontSize: '1rem', marginTop: 4 }}
            >
              {loading
                ? <><i className="fas fa-spinner fa-spin"></i> Signing in...</>
                : <><i className="fas fa-sign-in-alt"></i> Sign In</>
              }
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f0f4f8' }}>
            <p style={{ color: 'var(--gray)', fontSize: '0.92rem' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
                Register now →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
