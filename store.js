import { configureStore } from '@reduxjs/toolkit'
import savedHackathonsReducer from './savedHackathonsSlice.js'

// The store combines the small saved-hackathons feature.
export const store = configureStore({
  reducer: {
    savedHackathons: savedHackathonsReducer,
  },
})
