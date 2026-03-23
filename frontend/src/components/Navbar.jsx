import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  const navLinks = [
    ['/', 'Home'],
    ['/hospitals', 'Hospitals'],
    ['/doctors', 'Doctors'],
    ['/services', 'Services'],
    ['/about', 'About'],
    ['/contact', 'Contact'],
  ]

  return (
    <header style={{
      background: 'linear-gradient(135deg, #1565c0 0%, #1a73e8 60%, #1e88e5 100%)',
      color: 'white',
      padding: '0.9rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 200,
      boxShadow: '0 2px 24px rgba(13,71,161,0.25)',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          color: 'white', textDecoration: 'none',
          fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 700,
          flexShrink: 0,
        }}>
          <span style={{
            width: 36, height: 36, background: 'rgba(255,255,255,0.2)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <i className="fas fa-hospital" style={{ color: '#ffeb3b', fontSize: '1rem' }}></i>
          </span>
          MediConnect
        </Link>

        {/* Nav Links (desktop) */}
        <nav style={{ display: 'flex' }}>
          <ul style={{ display: 'flex', listStyle: 'none', gap: 4, margin: 0 }}>
            {navLinks.map(([path, label]) => (
              <li key={path}>
                <Link to={path} style={{
                  color: isActive(path) ? 'white' : 'rgba(255,255,255,0.82)',
                  textDecoration: 'none',
                  fontWeight: isActive(path) ? 700 : 500,
                  fontSize: '0.92rem',
                  padding: '6px 12px',
                  borderRadius: 8,
                  background: isActive(path) ? 'rgba(255,255,255,0.18)' : 'transparent',
                  transition: 'all 0.2s',
                  display: 'block',
                }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{
                display: 'flex', alignItems: 'center', gap: 8,
                color: 'white', textDecoration: 'none',
                background: 'rgba(255,255,255,0.18)',
                padding: '7px 16px', borderRadius: 50,
                fontWeight: 600, fontSize: '0.9rem',
                border: '1.5px solid rgba(255,255,255,0.35)',
                transition: 'all 0.2s',
              }}>
                <span style={{
                  width: 26, height: 26, background: 'rgba(255,255,255,0.3)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.85rem',
                }}>
                  {user.full_name[0].toUpperCase()}
                </span>
                {user.full_name.split(' ')[0]}
              </Link>
              <button onClick={handleLogout} style={{
                background: 'rgba(244,67,54,0.85)',
                border: 'none', color: 'white',
                padding: '7px 14px', borderRadius: 50,
                fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer',
                fontFamily: 'var(--font-main)',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.2s',
              }}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ fontSize: '0.88rem', padding: '7px 16px' }}>
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
              <Link to="/register" className="btn btn-white" style={{ fontSize: '0.88rem', padding: '7px 16px' }}>
                <i className="fas fa-user-plus"></i> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
