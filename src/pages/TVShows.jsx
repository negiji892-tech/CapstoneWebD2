import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTVShows } from '../redux/moviesSlice'
import MovieCard from '../components/MovieCard'

export default function TVShows() {
  const dispatch = useDispatch()
  const { tvShows, loading } = useSelector(s => s.movies)

  useEffect(() => {
    dispatch(fetchTVShows())
  }, [dispatch])

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        TV Shows
      </h1>
      <p style={{ color: 'var(--text2)', marginBottom: '2rem' }}>
        Trending TV shows this week
      </p>

      {loading ? (
        <p style={{ color: 'var(--text2)' }}>Loading...</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
          gap: '16px',
        }}>
          {tvShows.map(show => (
            <MovieCard key={show.id} movie={show} />
          ))}
        </div>
      )}
    </div>
  )
}
