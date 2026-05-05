import { useSelector, useDispatch } from 'react-redux'
import { removeFromWatchlist } from '../redux/moviesSlice'
import { useNavigate } from 'react-router-dom'

const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

export default function Watchlist() {
  const { watchlist } = useSelector(s => s.movies)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        My List
      </h1>
      <p style={{ color: 'var(--text2)', marginBottom: '2rem' }}>
        {watchlist.length} {watchlist.length === 1 ? 'title' : 'titles'} saved
      </p>

      {watchlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text2)' }}>
          <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Your list is empty</p>
          <p>Click the + button on any movie to save it here</p>
          <button onClick={() => navigate('/')} style={{
            marginTop: '1.5rem', background: 'var(--accent)',
            border: 'none', borderRadius: '8px',
            padding: '10px 24px', color: '#fff', fontWeight: '600',
          }}>
            Browse Movies
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {watchlist.map(movie => {
            const title = movie.title || movie.name
            const poster = movie.poster_path
              ? `${IMG_BASE}${movie.poster_path}`
              : 'https://via.placeholder.com/60x90/1a1a26/e50914?text=?'

            return (
              <div
                key={movie.id}
                style={{
                  display: 'flex', gap: '16px', alignItems: 'center',
                  background: 'var(--card)', borderRadius: '12px',
                  padding: '12px', border: '1px solid var(--border)',
                  cursor: 'pointer', transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img
                  src={poster} alt={title}
                  style={{ width: '60px', height: '90px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: '600', marginBottom: '4px' }}>{title}</h3>
                  <p style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '4px' }}>
                    {(movie.release_date || movie.first_air_date || '').slice(0, 4)}
                  </p>
                  <p style={{ color: '#ffd700', fontSize: '0.85rem' }}>
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </p>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); dispatch(removeFromWatchlist(movie.id)) }}
                  style={{
                    background: 'rgba(229,9,20,0.15)', border: '1px solid var(--accent)',
                    borderRadius: '8px', padding: '8px 14px',
                    color: 'var(--accent)', fontSize: '0.85rem',
                    flexShrink: 0,
                  }}
                >
                  Remove
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
