import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './moviesSlice'
import appReducer from './appSlice'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    app: appReducer,
  },
})
