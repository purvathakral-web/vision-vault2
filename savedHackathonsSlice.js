import { createSlice } from '@reduxjs/toolkit'

// Redux stores only the hackathon IDs saved by the student.
const savedHackathonsSlice = createSlice({
  name: 'savedHackathons',
  initialState: [],
  reducers: {
    saveHackathon: (state, action) => {
      if (!state.includes(action.payload)) state.push(action.payload)
    },
    removeHackathon: (state, action) => state.filter((id) => id !== action.payload),
  },
})

export const { saveHackathon, removeHackathon } = savedHackathonsSlice.actions
export default savedHackathonsSlice.reducer
