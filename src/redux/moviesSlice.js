import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_KEY = 'aff72cf8f9063abea47a5d6171988f65'
const BASE_URL = 'https://api.themoviedb.org/3'

// Fetch trending movies
export const fetchTrending = createAsyncThunk('movies/fetchTrending', async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
  return res.data.results
})

// Fetch movies by category
export const fetchByCategory = createAsyncThunk('movies/fetchByCategory', async (category) => {
  const res = await axios.get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`)
  return { category, data: res.data.results }
})

// Fetch TV shows
export const fetchTVShows = createAsyncThunk('movies/fetchTVShows', async () => {
  const res = await axios.get(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`)
  return res.data.results
})

// Search movies
export const searchMovies = createAsyncThunk('movies/searchMovies', async (query) => {
  const res = await axios.get(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`)
  return res.data.results
})

// Fetch movie details
export const fetchMovieDetail = createAsyncThunk('movies/fetchMovieDetail', async (id) => {
  const [detail, videos] = await Promise.all([
    axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`),
    axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
  ])
  return { ...detail.data, videos: videos.data.results }
})

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    trending: [],
    nowPlaying: [],
    popular: [],
    topRated: [],
    tvShows: [],
    searchResults: [],
    selectedMovie: null,
    watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]'),
    continueWatching: JSON.parse(localStorage.getItem('continueWatching') || '[]'),
    loading: false,
    searchLoading: false,
    error: null,
  },
  reducers: {
    addToWatchlist(state, action) {
      const exists = state.watchlist.find(m => m.id === action.payload.id)
      if (!exists) {
        state.watchlist.push(action.payload)
        localStorage.setItem('watchlist', JSON.stringify(state.watchlist))
      }
    },
    removeFromWatchlist(state, action) {
      state.watchlist = state.watchlist.filter(m => m.id !== action.payload)
      localStorage.setItem('watchlist', JSON.stringify(state.watchlist))
    },
    addToContinueWatching(state, action) {
      const exists = state.continueWatching.find(m => m.id === action.payload.id)
      if (!exists) {
        state.continueWatching.unshift(action.payload)
        if (state.continueWatching.length > 6) state.continueWatching.pop()
        localStorage.setItem('continueWatching', JSON.stringify(state.continueWatching))
      }
    },
    clearSearch(state) {
      state.searchResults = []
    },
    clearSelectedMovie(state) {
      state.selectedMovie = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => { state.loading = true })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.loading = false
        state.trending = action.payload
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        const { category, data } = action.payload
        if (category === 'now_playing') state.nowPlaying = data
        if (category === 'popular') state.popular = data
        if (category === 'top_rated') state.topRated = data
      })
      .addCase(fetchTVShows.fulfilled, (state, action) => {
        state.tvShows = action.payload
      })
      .addCase(searchMovies.pending, (state) => { state.searchLoading = true })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchLoading = false
        state.searchResults = action.payload
      })
      .addCase(fetchMovieDetail.pending, (state) => { state.loading = true })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false
        state.selectedMovie = action.payload
      })
  }
})

export const { addToWatchlist, removeFromWatchlist, addToContinueWatching, clearSearch, clearSelectedMovie } = moviesSlice.actions
export default moviesSlice.reducer
