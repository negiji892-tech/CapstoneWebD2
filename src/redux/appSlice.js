import { createSlice } from '@reduxjs/toolkit'

const profiles = [
  { id: 1, name: 'User 1', avatar: '🎬', color: '#e50914' },
  { id: 2, name: 'User 2', avatar: '🎭', color: '#ff6b35' },
  { id: 3, name: 'Kids', avatar: '🧒', color: '#4ecdc4' },
]

const appSlice = createSlice({
  name: 'app',
  initialState: {
    darkMode: true,
    activeProfile: profiles[0],
    profiles,
    genre: 'All',
  },
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
      document.body.classList.toggle('light', !state.darkMode)
    },
    setActiveProfile(state, action) {
      state.activeProfile = action.payload
    },
    setGenre(state, action) {
      state.genre = action.payload
    }
  }
})

export const { toggleDarkMode, setActiveProfile, setGenre } = appSlice.actions
export default appSlice.reducer
