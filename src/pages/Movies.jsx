import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchByCategory } from '../redux/moviesSlice'
import MovieCard from '../components/MovieCard'

const GENRES = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller']

const GENRE_IDS = {
  'Action': 28, 'Comedy': 35, 'Drama': 18,
  'Horror': 27, 'Romance': 10749, 'Sci-Fi': 878, 'Thriller': 53
}

export default function Movies() {
  const dispatch = useDispatch()
  const { popular, topRated, nowPlaying } = useSelector(s => s.movies)
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [sortBy, setSortBy] = useState('popular')

  useEffect(() => {
    dispatch(fetchByCategory('popular'))
    dispatch(fetchByCategory('top_rated'))
    dispatch(fetchByCategory('now_playing'))
  }, [dispatch])

  const allMovies = sortBy === 'popular' ? popular
    : sortBy === 'top_rated' ? topRated
    : nowPlaying

  const filtered = selectedGenre === 'All'
    ? allMovies
    : allMovies.filter(m => m.genre_ids?.includes(GENRE_IDS[selectedGenre]))

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', marginBottom: '1.5rem' }}>
        Movies
      </h1>

      {/* Filters Row */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Genre Filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {GENRES.map(g => (
            <button key={g} onClick={() => setSelectedGenre(g)} style={{
              background: selectedGenre === g ? 'var(--accent)' : 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '20px', padding: '6px 16px',
              color: selectedGenre === g ? '#fff' : 'var(--text2)',
              fontSize: '0.85rem', fontWeight: '500',
              transition: 'all 0.2s',
            }}>
              {g}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '8px 14px',
            color: 'var(--text)', fontSize: '0.85rem',
            marginLeft: 'auto',
          }}
        >
          <option value="popular">Sort: Popular</option>
          <option value="top_rated">Sort: Top Rated</option>
          <option value="now_playing">Sort: Now Playing</option>
        </select>
      </div>

      {/* Results Count */}
      <p style={{ color: 'var(--text2)', marginBottom: '1rem', fontSize: '0.9rem' }}>
        Showing {filtered.length} movies
      </p>

      {/* Movies Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
        gap: '16px',
      }}>
        {filtered.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text2)' }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</p>
          <p>No movies found for this genre. Try another!</p>
        </div>
      )}
    </div>
  )
}
