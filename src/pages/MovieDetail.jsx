import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieDetail, addToWatchlist, removeFromWatchlist, addToContinueWatching } from '../redux/moviesSlice'

const IMG_BASE = 'https://image.tmdb.org/t/p/w500'
const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original'

export default function MovieDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedMovie: movie, loading, watchlist } = useSelector(s => s.movies)
  const isInList = watchlist.some(m => m.id === movie?.id)

  useEffect(() => {
    dispatch(fetchMovieDetail(id))
  }, [id, dispatch])

  if (loading || !movie) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <p style={{ color: 'var(--text2)' }}>Loading...</p>
      </div>
    )
  }

  const trailer = movie.videos?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  const hours = Math.floor((movie.runtime || 0) / 60)
  const mins = (movie.runtime || 0) % 60

  return (
    <div>
      {/* Backdrop */}
      <div style={{ position: 'relative', height: '450px', overflow: 'hidden' }}>
        {movie.backdrop_path && (
          <img
            src={`${BACKDROP_BASE}${movie.backdrop_path}`} alt={movie.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, var(--bg) 0%, transparent 50%)',
        }} />
        <button onClick={() => navigate(-1)} style={{
          position: 'absolute', top: '20px', left: '20px',
          background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border)',
          borderRadius: '8px', padding: '8px 16px', color: '#fff',
        }}>
          ← Back
        </button>
      </div>

      {/* Details */}
      <div style={{ padding: '0 2rem 3rem', marginTop: '-80px', position: 'relative' }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Poster */}
          {movie.poster_path && (
            <img
              src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title}
              style={{ width: '200px', height: '300px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0,
                boxShadow: '0 10px 40px rgba(0,0,0,0.6)' }}
            />
          )}

          {/* Info */}
          <div style={{ flex: 1, minWidth: '250px', paddingTop: '60px' }}>
            <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '2.8rem', lineHeight: '1', marginBottom: '12px' }}>
              {movie.title || movie.name}
            </h1>

            {/* Meta */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px', fontSize: '0.9rem', color: 'var(--text2)' }}>
              <span style={{ color: '#ffd700' }}>⭐ {movie.vote_average?.toFixed(1)}</span>
              <span>{(movie.release_date || '').slice(0, 4)}</span>
              {movie.runtime > 0 && <span>🕐 {hours}h {mins}m</span>}
              <span style={{ border: '1px solid var(--border)', borderRadius: '4px', padding: '0 6px' }}>HD</span>
            </div>

            {/* Genres */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {movie.genres?.map(g => (
                <span key={g.id} style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: '20px', padding: '4px 12px', fontSize: '0.8rem', color: 'var(--text2)',
                }}>
                  {g.name}
                </span>
              ))}
            </div>

            <p style={{ color: 'var(--text2)', lineHeight: '1.7', marginBottom: '24px', maxWidth: '600px' }}>
              {movie.overview}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {trailer ? (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank" rel="noreferrer"
                  onClick={() => dispatch(addToContinueWatching(movie))}
                  style={{
                    background: 'var(--accent)', borderRadius: '8px',
                    padding: '12px 28px', color: '#fff', fontWeight: '700', fontSize: '1rem',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}
                >
                  ▶ Watch Trailer
                </a>
              ) : (
                <button onClick={() => dispatch(addToContinueWatching(movie))} style={{
                  background: 'var(--accent)', border: 'none', borderRadius: '8px',
                  padding: '12px 28px', color: '#fff', fontWeight: '700', fontSize: '1rem',
                }}>
                  ▶ Play
                </button>
              )}

              <button
                onClick={() => isInList ? dispatch(removeFromWatchlist(movie.id)) : dispatch(addToWatchlist(movie))}
                style={{
                  background: isInList ? 'rgba(229,9,20,0.15)' : 'var(--card)',
                  border: `1px solid ${isInList ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: '8px', padding: '12px 24px',
                  color: isInList ? 'var(--accent)' : 'var(--text)', fontWeight: '600',
                }}
              >
                {isInList ? '✓ In My List' : '+ My List'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'flex', gap: '16px', flexWrap: 'wrap',
          marginTop: '2.5rem', paddingTop: '2rem',
          borderTop: '1px solid var(--border)',
        }}>
          {[
            { label: 'Popularity', value: Math.round(movie.popularity || 0).toLocaleString() },
            { label: 'Vote Count', value: (movie.vote_count || 0).toLocaleString() },
            { label: 'Budget', value: movie.budget > 0 ? `$${(movie.budget / 1e6).toFixed(1)}M` : 'N/A' },
            { label: 'Revenue', value: movie.revenue > 0 ? `$${(movie.revenue / 1e6).toFixed(1)}M` : 'N/A' },
            { label: 'Status', value: movie.status || 'N/A' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: '10px', padding: '16px 20px', flex: '1', minWidth: '120px',
            }}>
              <p style={{ color: 'var(--text2)', fontSize: '0.8rem', marginBottom: '4px' }}>{stat.label}</p>
              <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
