import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToWatchlist, addToContinueWatching } from '../redux/moviesSlice'

const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original'

export default function HeroBanner({ movie }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!movie) return null

  const title = movie.title || movie.name
  const backdrop = movie.backdrop_path
    ? `${BACKDROP_BASE}${movie.backdrop_path}`
    : null
  const overview = movie.overview?.slice(0, 180) + '...'
  const rating = movie.vote_average?.toFixed(1)

  const handlePlay = () => {
    dispatch(addToContinueWatching(movie))
    navigate(`/movie/${movie.id}`)
  }

  return (
    <div style={{
      position: 'relative', height: '560px',
      overflow: 'hidden', marginBottom: '2rem',
    }}>
      {/* Background Image */}
      {backdrop && (
        <img
          src={backdrop} alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
        />
      )}

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(10,10,15,0.95) 35%, transparent 70%), linear-gradient(to top, var(--bg) 0%, transparent 40%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', bottom: '80px', left: '2rem',
        maxWidth: '500px',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'var(--accent)', borderRadius: '4px',
          padding: '3px 10px', marginBottom: '12px',
          fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px',
        }}>
          🔥 TRENDING
        </div>

        <h1 style={{
          fontFamily: 'Bebas Neue', fontSize: '3.5rem',
          lineHeight: '1', marginBottom: '12px',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        }}>
          {title}
        </h1>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ color: '#ffd700', fontSize: '0.9rem' }}>⭐ {rating}</span>
          <span style={{ color: 'var(--text2)', fontSize: '0.85rem' }}>
            {(movie.release_date || '').slice(0, 4)}
          </span>
          <span style={{
            border: '1px solid var(--text2)', borderRadius: '4px',
            padding: '1px 8px', fontSize: '0.75rem', color: 'var(--text2)',
          }}>HD</span>
        </div>

        <p style={{
          color: 'var(--text2)', fontSize: '0.95rem',
          lineHeight: '1.6', marginBottom: '20px',
        }}>
          {overview}
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handlePlay} style={{
            background: 'var(--accent)', border: 'none',
            borderRadius: '8px', padding: '12px 28px',
            color: '#fff', fontWeight: '700', fontSize: '1rem',
            display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'background 0.2s',
          }}>
            ▶ Play Now
          </button>
          <button onClick={() => dispatch(addToWatchlist(movie))} style={{
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(4px)',
            borderRadius: '8px', padding: '12px 24px',
            color: '#fff', fontWeight: '600', fontSize: '1rem',
          }}>
            + My List
          </button>
        </div>
      </div>
    </div>
  )
}
