import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDarkMode } from '../redux/appSlice'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { darkMode, activeProfile } = useSelector(s => s.app)

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/movies', label: 'Movies' },
    { to: '/tvshows', label: 'TV Shows' },
    { to: '/search', label: 'Search' },
    { to: '/watchlist', label: 'My List' },
  ]

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,15,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '64px',
    }}>
      {/* Logo */}
      <Link to="/" style={{
        fontFamily: 'Bebas Neue', fontSize: '1.8rem',
        color: 'var(--accent)', letterSpacing: '2px',
      }}>
        StreamVibe
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {navLinks.map(link => (
          <Link key={link.to} to={link.to} style={{
            color: location.pathname === link.to ? 'var(--accent)' : 'var(--text2)',
            fontWeight: location.pathname === link.to ? '600' : '400',
            fontSize: '0.95rem',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--text)'}
            onMouseLeave={e => e.target.style.color = location.pathname === link.to ? 'var(--accent)' : 'var(--text2)'}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right Side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Dark Mode Toggle */}
        <button onClick={() => dispatch(toggleDarkMode())} style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: '20px', padding: '6px 14px',
          color: 'var(--text)', fontSize: '0.85rem',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* Profile */}
        <button onClick={() => navigate('/profiles')} style={{
          background: activeProfile.color,
          border: 'none', borderRadius: '50%',
          width: '38px', height: '38px',
          fontSize: '1.1rem', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          {activeProfile.avatar}
        </button>
      </div>
    </nav>
  )
}
