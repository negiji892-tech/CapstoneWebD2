import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrending, fetchByCategory, fetchTVShows } from '../redux/moviesSlice'
import HeroBanner from '../components/HeroBanner'
import MovieRow from '../components/MovieRow'
import MovieCard from '../components/MovieCard'

export default function Home() {
  const dispatch = useDispatch()
  const { trending, nowPlaying, popular, topRated, tvShows, continueWatching, loading } = useSelector(s => s.movies)

  useEffect(() => {
    dispatch(fetchTrending())
    dispatch(fetchByCategory('now_playing'))
    dispatch(fetchByCategory('popular'))
    dispatch(fetchByCategory('top_rated'))
    dispatch(fetchTVShows())
  }, [dispatch])

  if (loading && trending.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px', height: '50px', border: '4px solid var(--border)',
            borderTop: '4px solid var(--accent)', borderRadius: '50%',
            animation: 'spin 1s linear infinite', margin: '0 auto 16px',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: 'var(--text2)' }}>Loading StreamVibe...</p>
        </div>
      </div>
    )
  }

  if (!loading && trending.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</p>
          <p style={{ color: 'var(--text2)', marginBottom: '1rem' }}>Could not load movies. Please check your internet.</p>
          <button onClick={() => { dispatch(fetchTrending()); dispatch(fetchByCategory('now_playing')); dispatch(fetchByCategory('popular')); dispatch(fetchByCategory('top_rated')); dispatch(fetchTVShows()); }}
            style={{ background: 'var(--accent)', border: 'none', borderRadius: '8px', padding: '10px 24px', color: '#fff', fontWeight: '600' }}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <HeroBanner movie={trending[0]} />

      {/* Continue Watching */}
      {continueWatching.length > 0 && (
        <section style={{ marginBottom: '2.5rem', padding: '0 2rem' }}>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', letterSpacing: '1px', marginBottom: '1rem' }}>
            Continue Watching
          </h2>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
            {continueWatching.map(movie => (
              <div key={movie.id} style={{ position: 'relative', flexShrink: 0 }}>
                <MovieCard movie={movie} />
                {/* Progress Bar */}
                <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px', margin: '4px 0 0' }}>
                  <div style={{
                    height: '100%', background: 'var(--accent)',
                    width: `${Math.floor(Math.random() * 60 + 20)}%`,
                    borderRadius: '2px',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <MovieRow title="🔥 Trending This Week" movies={trending} />
      <MovieRow title="🎬 Now Playing" movies={nowPlaying} />
      <MovieRow title="⭐ Top Rated" movies={topRated} />
      <MovieRow title="📺 Popular TV Shows" movies={tvShows} />
      <MovieRow title="🎥 Popular Movies" movies={popular} />
    </div>
  )
}
