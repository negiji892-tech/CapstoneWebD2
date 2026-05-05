import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchMovies, clearSearch } from '../redux/moviesSlice'
import MovieCard from '../components/MovieCard'

// Debounce hook
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

export default function Search() {
  const dispatch = useDispatch()
  const { searchResults, searchLoading } = useSelector(s => s.movies)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery.trim().length > 2) {
      dispatch(searchMovies(debouncedQuery))
    } else {
      dispatch(clearSearch())
    }
  }, [debouncedQuery, dispatch])

  const filtered = searchResults.filter(m => m.poster_path)

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', marginBottom: '1.5rem' }}>
        Search
      </h1>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '2rem', maxWidth: '600px' }}>
        <span style={{
          position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
          fontSize: '1.2rem', color: 'var(--text2)',
        }}>🔍</span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search movies, TV shows..."
          style={{
            width: '100%', padding: '14px 16px 14px 48px',
            background: 'var(--card)', border: '2px solid var(--border)',
            borderRadius: '12px', color: 'var(--text)', fontSize: '1rem',
            outline: 'none', transition: 'border-color 0.2s',
            fontFamily: 'Outfit, sans-serif',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        {query && (
          <button onClick={() => { setQuery(''); dispatch(clearSearch()) }} style={{
            position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', color: 'var(--text2)', fontSize: '1.2rem',
          }}>✕</button>
        )}
      </div>

      {/* Loading */}
      {searchLoading && (
        <p style={{ color: 'var(--text2)', marginBottom: '1rem' }}>Searching...</p>
      )}

      {/* Results */}
      {filtered.length > 0 && (
        <>
          <p style={{ color: 'var(--text2)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            Found {filtered.length} results for "{debouncedQuery}"
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
            gap: '16px',
          }}>
            {filtered.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {!searchLoading && query.length > 2 && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text2)' }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</p>
          <p>No results found for "{query}"</p>
        </div>
      )}

      {/* Initial State */}
      {query.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text2)' }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
          <p>Search for your favorite movies or TV shows</p>
        </div>
      )}
    </div>
  )
}
