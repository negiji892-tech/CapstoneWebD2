import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWatchlist, removeFromWatchlist, clearSelectedMovie } from '../redux/moviesSlice'

const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

export default function MovieCard({ movie }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const watchlist = useSelector(s => s.movies.watchlist)
  const isInList = watchlist.some(m => m.id === movie.id)

  const handleClick = () => {
    dispatch(clearSelectedMovie())
    navigate(`/movie/${movie.id}`)
  }
  const title = movie.title || movie.name || 'Unknown'
  const poster = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : 'https://via.placeholder.com/300x450/1a1a26/e50914?text=No+Image'
  const rating = movie.vote_average?.toFixed(1) || 'N/A'

  const handleWatchlist = (e) => {
    e.stopPropagation()
    if (isInList) dispatch(removeFromWatchlist(movie.id))
    else dispatch(addToWatchlist(movie))
  }

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'relative', cursor: 'pointer',
        borderRadius: '10px', overflow: 'hidden',
        background: 'var(--card)',
        transition: 'transform 0.25s, box-shadow 0.25s',
        flexShrink: 0, width: '160px',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.05)'
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(229,9,20,0.3)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <img src={poster} alt={title} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />

      {/* Rating Badge */}
      <div style={{
        position: 'absolute', top: '8px', left: '8px',
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
        borderRadius: '6px', padding: '2px 8px',
        fontSize: '0.75rem', fontWeight: '600', color: '#ffd700',
      }}>
        ⭐ {rating}
      </div>

      {/* Watchlist Button */}
      <button
        onClick={handleWatchlist}
        style={{
          position: 'absolute', top: '8px', right: '8px',
          background: isInList ? 'var(--accent)' : 'rgba(0,0,0,0.7)',
          border: '1px solid var(--accent)',
          borderRadius: '50%', width: '30px', height: '30px',
          color: '#fff', fontSize: '1rem', lineHeight: '1',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {isInList ? '✓' : '+'}
      </button>

      {/* Title */}
      <div style={{ padding: '10px' }}>
        <p style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text)', lineHeight: '1.3' }}>
          {title.length > 22 ? title.slice(0, 22) + '…' : title}
        </p>
        <p style={{ fontSize: '0.72rem', color: 'var(--text2)', marginTop: '3px' }}>
          {(movie.release_date || movie.first_air_date || '').slice(0, 4)}
        </p>
      </div>
    </div>
  )
}
