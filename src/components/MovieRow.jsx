import { useRef } from 'react'
import MovieCard from './MovieCard'

export default function MovieRow({ title, movies }) {
  const rowRef = useRef()

  const scroll = (dir) => {
    rowRef.current.scrollBy({ left: dir * 500, behavior: 'smooth' })
  }

  if (!movies || movies.length === 0) return null

  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={{
        fontFamily: 'Bebas Neue', fontSize: '1.5rem',
        letterSpacing: '1px', marginBottom: '1rem',
        paddingLeft: '2rem', color: 'var(--text)',
      }}>
        {title}
      </h2>

      <div style={{ position: 'relative' }}>
        {/* Left Arrow */}
        <button onClick={() => scroll(-1)} style={{
          position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, background: 'rgba(0,0,0,0.7)',
          border: '1px solid var(--border)', borderRadius: '50%',
          width: '40px', height: '40px', color: '#fff', fontSize: '1.2rem',
        }}>‹</button>

        {/* Scrollable Row */}
        <div
          ref={rowRef}
          style={{
            display: 'flex', gap: '12px',
            overflowX: 'auto', padding: '0.5rem 2rem',
            scrollbarWidth: 'none',
          }}
        >
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Right Arrow */}
        <button onClick={() => scroll(1)} style={{
          position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, background: 'rgba(0,0,0,0.7)',
          border: '1px solid var(--border)', borderRadius: '50%',
          width: '40px', height: '40px', color: '#fff', fontSize: '1.2rem',
        }}>›</button>
      </div>
    </section>
  )
}
