import { useSelector, useDispatch } from 'react-redux'
import { setActiveProfile } from '../redux/appSlice'
import { useNavigate } from 'react-router-dom'

export default function ProfileSelect() {
  const { profiles, activeProfile } = useSelector(s => s.app)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSelect = (profile) => {
    dispatch(setActiveProfile(profile))
    navigate('/')
  }

  return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '2rem',
    }}>
      <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        Who's Watching?
      </h1>
      <p style={{ color: 'var(--text2)', marginBottom: '3rem' }}>
        Select your profile to continue
      </p>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {profiles.map(profile => (
          <button
            key={profile.id}
            onClick={() => handleSelect(profile)}
            style={{
              background: 'var(--card)',
              border: `3px solid ${activeProfile.id === profile.id ? profile.color : 'var(--border)'}`,
              borderRadius: '16px', padding: '2rem',
              cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '12px',
              minWidth: '140px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.borderColor = profile.color
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.borderColor = activeProfile.id === profile.id ? profile.color : 'var(--border)'
            }}
          >
            <div style={{
              width: '70px', height: '70px', borderRadius: '50%',
              background: profile.color, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem',
            }}>
              {profile.avatar}
            </div>
            <span style={{ fontWeight: '600', color: 'var(--text)', fontSize: '1rem' }}>
              {profile.name}
            </span>
            {activeProfile.id === profile.id && (
              <span style={{
                background: profile.color, borderRadius: '20px',
                padding: '2px 12px', fontSize: '0.75rem', color: '#fff', fontWeight: '600',
              }}>
                Active
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
